import {
  ActionIcon,
  Card,
  Flex,
  Skeleton,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import posterPlaceholderSrc from "@/../public/poster-placeholder.png";
import StartIcon from "@/../public/star.svg";
import { Genre, Movie } from "@/shared/types";

type MovieCardProps = Movie & {
  genres: Genre[] | undefined;
  isGenresLoading: boolean;
};

export function MovieCard({
  id,
  genre_ids,
  poster_path,
  title,
  release_date,
  vote_average,
  vote_count,
  genres,
  isGenresLoading,
}: MovieCardProps) {
  const theme = useMantineTheme();
  return (
    <Link style={{ textDecoration: "none" }} href={`/${id}`}>
      <Card p={24}>
        <Flex columnGap={16}>
          <Image
            width={120}
            height={170}
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : posterPlaceholderSrc
            }
            alt={title}
          />
          <Flex maw={263} flex={1} direction="column" rowGap={8}>
            <Title
              order={3}
              fz={20}
              lh="24px"
              fw={600}
              c={theme.colors.purple[2]}
            >
              {title}
            </Title>
            <Text lh="20px" c={theme.colors.gray[1]}>
              {new Date(release_date).getFullYear()}
            </Text>
            <Flex align="center" columnGap={4}>
              <StartIcon color={theme.colors.yellow[0]} />
              <Text fw={600} lh="20px">
                {vote_average.toFixed(1)}
              </Text>
              <Text c={theme.colors.gray[1]} ml={4}>
                ({vote_count})
              </Text>
            </Flex>
            <Flex mt="auto" columnGap={8} wrap="wrap">
              <Text c={theme.colors.gray[1]}>Genres</Text>
              <Text>
                {isGenresLoading && (
                  <Flex columnGap={4}>
                    <Skeleton width="70px" h={25} />
                    <Skeleton width="50px" h={25} />
                    <Skeleton width="60px" h={25} />
                  </Flex>
                )}
                {genres
                  ?.filter(g => genre_ids.includes(g.id))
                  .slice(0, 3)
                  .map(({ name }) => name)
                  .join(", ")}
              </Text>
            </Flex>
          </Flex>
          <ActionIcon ml="auto" variant="transparent">
            <StartIcon color={theme.colors.gray[2]} />
          </ActionIcon>
        </Flex>
      </Card>
    </Link>
  );
}
