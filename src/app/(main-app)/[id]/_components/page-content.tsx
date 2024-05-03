import {
  Box,
  Breadcrumbs,
  Card,
  Divider,
  Flex,
  Grid,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import NextImage from "next/image";
import Link from "next/link";
import { Fragment, useContext, useMemo } from "react";

import posterPlaceholder from "@/../public/poster-placeholder.png";
import { MovieRatingModal } from "@/features";
import { RatingContext, RatingContextValue } from "@/shared/context";
import { transformMoneyValue, transformRuntime } from "@/shared/lib";
import { MovieDetails } from "@/shared/types";
import { MovieInfo, RatingButton } from "@/shared/ui";

import styles from "../styles.module.css";
import { CompaniesList } from "./companies-list";

type PageContentProps = MovieDetails;

export function PageContent({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
  vote_count,
  runtime,
  budget,
  revenue,
  genres,
  videos,
  overview,
  production_companies,
}: PageContentProps) {
  useDocumentTitle(title);
  const theme = useMantineTheme();
  const isMedia = useMediaQuery("(min-width: 620px)");
  const [opened, { close, open }] = useDisclosure(false);
  const [ratedMovies, rateMovie] = useContext(
    RatingContext,
  ) as RatingContextValue;
  const userRating = useMemo(
    () => ratedMovies.find(m => m.id === id)?.rating,
    [id, ratedMovies],
  );
  const movieStats = useMemo(
    () => [
      { name: "Duration", value: transformRuntime(runtime) },
      {
        name: "Premiere",
        value: new Intl.DateTimeFormat("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(release_date)),
      },
      { name: "Budget", value: transformMoneyValue(budget) },
      { name: "Gross worldwide", value: transformMoneyValue(revenue) },
      { name: "Genres", value: genres.map(({ name }) => name).join(", ") },
    ],
    [runtime, release_date, budget, revenue, genres],
  );
  const trailer = useMemo(
    () =>
      videos.results.find(
        ({ official, type }) => official && type === "Trailer",
      ),
    [videos.results],
  );
  return (
    <>
      <Flex direction="column" rowGap={20}>
        <Card p={{ base: 10, xs: 24 }}>
          <Flex direction="column" rowGap={20}>
            <Breadcrumbs
              styles={{
                breadcrumb: {
                  textDecoration: "none",
                  color: theme.colors.purple[2],
                },
              }}
              fz={{ base: 12, xs: 14 }}
              td="none"
            >
              <Link href="/">Movies</Link>
              <Link href={`/${id}`}>{title}</Link>
            </Breadcrumbs>
            <Stack>
              <Flex columnGap={16}>
                <Image
                  className={styles.poster}
                  style={{ border: `1px solid ${theme.colors.slate[3]}` }}
                  component={NextImage}
                  w={250}
                  width={250}
                  h={352}
                  height={352}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SRC}/w500${poster_path}`}
                  fallbackSrc={posterPlaceholder.src}
                  alt={title}
                  priority
                />

                <Flex direction="column" justify="space-between">
                  <MovieInfo
                    title={title}
                    release_date={release_date}
                    vote_average={vote_average}
                    vote_count={vote_count}
                  />
                  {isMedia && (
                    <Grid>
                      {movieStats.map(({ name, value }) => (
                        <Fragment key={name}>
                          <Grid.Col span={4} key={name}>
                            <Text c={theme.colors.slate[1]}>{name}</Text>
                          </Grid.Col>
                          <Grid.Col span={8}>
                            <Text>{value}</Text>
                          </Grid.Col>
                        </Fragment>
                      ))}
                    </Grid>
                  )}
                </Flex>
                <RatingButton userRating={userRating} onClick={open} />
              </Flex>
              {!isMedia && (
                <Flex wrap="wrap" justify="space-evenly" gap={10}>
                  {movieStats.map(({ name, value }) => (
                    <Box key={name}>
                      <Text ta="center" c={theme.colors.slate[1]}>
                        {name}
                      </Text>
                      <Text ta="center">{value}</Text>
                    </Box>
                  ))}
                </Flex>
              )}
            </Stack>
          </Flex>
        </Card>
        <Card p={{ base: 10, xs: 24 }}>
          {trailer && (
            <>
              <Title order={4} fz={20} mb={16}>
                Trailer
              </Title>
              <iframe
                className={styles.trailer}
                style={{ borderRadius: "9px" }}
                width="560"
                height="281"
                src={`https://www.youtube.com/embed/${trailer.key}?si=zBvWGCw64AWmBo59`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <Divider my={20} />
            </>
          )}
          <Title order={4} fz={20} mb={16}>
            Description
          </Title>
          <Text>{overview}</Text>
          {production_companies.length !== 0 && (
            <>
              <Divider my={20} />
              <CompaniesList companies={production_companies} />
            </>
          )}
        </Card>
      </Flex>
      <MovieRatingModal
        onClose={close}
        rateMovie={rateMovie}
        opened={opened}
        movie={{
          title,
          id,
          release_date,
          genre_ids: genres.map(g => g.id),
          vote_average,
          vote_count,
          poster_path,
          rating: userRating,
        }}
      />
    </>
  );
}
