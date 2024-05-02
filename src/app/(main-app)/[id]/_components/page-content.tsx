import {
  Breadcrumbs,
  Card,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NextImage from "next/image";
import Link from "next/link";
import { Fragment, useContext, useMemo } from "react";

import posterPlaceholder from "@/../public/poster-placeholder.png";
import companyPlaceholder from "@/../public/production-company-placeholder.png";
import { MovieRatingModal } from "@/features";
import { RatingContext, RatingContextValue } from "@/shared/context";
import { transformMoneyValue, transformRuntime } from "@/shared/lib";
import { MovieDetails } from "@/shared/types";
import { MovieInfo, RatingButton } from "@/shared/ui";

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
  const [opened, { close, open }] = useDisclosure(false);
  const [ratedMovies, rateMovie] = useContext(
    RatingContext,
  ) as RatingContextValue;
  const userRating = useMemo(
    () => ratedMovies.find(m => m.id === id)?.rating,
    [id, ratedMovies],
  );
  const theme = useMantineTheme();
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
        <Card p={24}>
          <Flex direction="column" rowGap={20}>
            <Breadcrumbs
              styles={{
                breadcrumb: {
                  textDecoration: "none",
                  color: theme.colors.purple[2],
                },
              }}
              td="none"
            >
              <Link href="/">Movies</Link>
              <Link href={`/${id}`}>{title}</Link>
            </Breadcrumbs>
            <Flex columnGap={16}>
              <Image
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
              </Flex>
              <RatingButton userRating={userRating} onClick={open} />
            </Flex>
          </Flex>
        </Card>
        <Card p={24}>
          <Title order={4} fz={20} mb={16}>
            Trailer
          </Title>
          {trailer && (
            <iframe
              style={{ borderRadius: "9px" }}
              width="560"
              height="281"
              src={`https://www.youtube.com/embed/${trailer.key}?si=zBvWGCw64AWmBo59`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
          <Divider my={20} />
          <Title order={4} fz={20} mb={16}>
            Description
          </Title>
          <Text>{overview}</Text>
          <Divider my={20} />
          <Title order={4} fz={20} mb={16}>
            Production
          </Title>
          <Flex direction="column" rowGap={12}>
            {production_companies.map(({ id: companyId, name, logo_path }) => (
              <Flex key={companyId} columnGap={8} align="center">
                <Image
                  style={{ border: `1px solid ${theme.colors.slate[3]}` }}
                  component={NextImage}
                  w={40}
                  miw={40}
                  width={40}
                  h={40}
                  height={40}
                  radius="100%"
                  fit="scale-down"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SRC}/w500${logo_path}`}
                  fallbackSrc={companyPlaceholder.src}
                  alt={title}
                />
                <Text fw={700}>{name}</Text>
              </Flex>
            ))}
          </Flex>
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
