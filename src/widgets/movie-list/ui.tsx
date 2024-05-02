"use client";

import { Box, Grid } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";

import { CardSkeleton, MovieCard } from "@/entitites/movie-card";
import { MovieRatingModal } from "@/features";
import { fetcher } from "@/shared/lib";
import { GenreRes, Movie, RatedMovie } from "@/shared/types";

import { ListFallback } from "./components/fallback";
import Pagination from "./components/pagination";

type MovieListProps = {
  movieList: Movie[] | undefined;
  ratedMovies: RatedMovie[];
  rateMovie: (movieRating: RatedMovie) => void;
  total: number | undefined;
  isLoading?: boolean;
};

export function MovieList({
  isLoading,
  movieList,
  total,
  rateMovie,
  ratedMovies,
}: MovieListProps) {
  const { data: genres, isLoading: isGenresLoading } = useSWR<GenreRes>(
    "/genre/movie/list",
    fetcher,
  );
  const [selectedMovie, setSelectedMovie] = useState<RatedMovie | null>(null);

  return (
    <>
      <Grid gutter={8}>
        {isLoading &&
          [0, 1, 2, 3].map(i => (
            <Grid.Col key={i} span={6}>
              <CardSkeleton />
            </Grid.Col>
          ))}
        {movieList?.map(movie => (
          <Grid.Col key={movie.id} span={6}>
            <MovieCard
              openRateModal={setSelectedMovie}
              userRating={ratedMovies.find(r => movie.id === r.id)?.rating}
              isGenresLoading={isGenresLoading}
              genres={genres?.genres}
              {...movie}
            />
          </Grid.Col>
        ))}
      </Grid>
      {((!movieList && !isLoading) || movieList?.length === 0) && (
        <ListFallback />
      )}
      {total && movieList?.length !== 0 && (
        <Box mt={24} w="fit-content" ml="auto">
          <Pagination total={total} />
        </Box>
      )}
      <MovieRatingModal
        rateMovie={rateMovie}
        movie={selectedMovie}
        opened={Boolean(selectedMovie)}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
