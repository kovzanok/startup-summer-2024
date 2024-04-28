"use client";

import { Box, Grid } from "@mantine/core";
import React from "react";
import useSWR from "swr";

import { CardSkeleton, MovieCard } from "@/entitites/movie-card";
import { fetcher } from "@/shared/lib";
import { GenreRes, Movie } from "@/shared/types";

import Pagination from "./components/pagination";

type MovieListProps = {
  movieList: Movie[] | undefined;
  total: number | undefined;
  isLoading: boolean;
};

export function MovieList({ isLoading, movieList, total }: MovieListProps) {
  const { data: genres, isLoading: isGenresLoading } = useSWR<GenreRes>(
    "/genre/movie/list",
    fetcher,
  );
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
              isGenresLoading={isGenresLoading}
              genres={genres?.genres}
              {...movie}
            />
          </Grid.Col>
        ))}
      </Grid>
      {total && (
        <Box mt={24} w="fit-content" ml="auto">
          <Pagination total={total} />
        </Box>
      )}
    </>
  );
}
