import {
  Card,
  Flex,
  Image,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import { MouseEventHandler, useCallback } from "react";

import posterPlaceholder from "@/../public/poster-placeholder.png";
import { Genre, Movie, RatedMovie } from "@/shared/types";
import { MovieInfo, RatingButton } from "@/shared/ui";

type MovieCardProps = Movie & {
  genres: Genre[] | undefined;
  isGenresLoading: boolean;
  userRating?: number;
  openRateModal: (movie: RatedMovie) => void;
};

export function MovieCard({
  genres,
  isGenresLoading,
  userRating,
  openRateModal,
  title,
  release_date,
  vote_average,
  vote_count,
  id,
  genre_ids,
  poster_path,
}: MovieCardProps) {
  const theme = useMantineTheme();
  const handleMovieRate: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.preventDefault();
      openRateModal({
        id,
        poster_path,
        title,
        release_date,
        vote_average,
        vote_count,
        genre_ids,
        rating: userRating || 0,
      });
    },
    [
      id,
      poster_path,
      title,
      release_date,
      vote_count,
      vote_average,
      genre_ids,
      openRateModal,
      userRating,
    ],
  );

  return (
    <Link style={{ textDecoration: "none" }} href={`/${id}`}>
      <Card p={24}>
        <Flex columnGap={16}>
          <Image
            style={{ border: `1px solid ${theme.colors.slate[3]}` }}
            component={NextImage}
            w={120}
            width={120}
            h={170}
            height={170}
            src={`${process.env.NEXT_PUBLIC_IMAGE_SRC}/w185${poster_path}`}
            fallbackSrc={posterPlaceholder.src}
            alt={title}
            priority
          />
          <Flex maw={263} flex={1} direction="column" justify="space-between">
            <MovieInfo
              title={title}
              release_date={release_date}
              vote_average={vote_average}
              vote_count={vote_count}
            />
            <Flex columnGap={8} wrap="wrap">
              <Text c={theme.colors.slate[1]}>Genres</Text>
              {isGenresLoading ? (
                <Flex columnGap={4}>
                  <Skeleton width="70px" h={25} />
                  <Skeleton width="50px" h={25} />
                  <Skeleton width="60px" h={25} />
                </Flex>
              ) : (
                <Text>
                  {genres
                    ?.filter(g => genre_ids.includes(g.id))
                    .slice(0, 3)
                    .map(({ name }) => name)
                    .join(", ")}
                </Text>
              )}
            </Flex>
          </Flex>
          <RatingButton userRating={userRating} onClick={handleMovieRate} />
        </Flex>
      </Card>
    </Link>
  );
}
