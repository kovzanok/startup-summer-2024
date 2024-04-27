"use client";

import { Grid } from "@mantine/core";
import React from "react";
import useSWR from "swr";

import { CardSkeleton, MovieCard } from "@/entitites/movie-card";
import { fetcher } from "@/shared/lib";
import { GenreRes, Movie } from "@/shared/types";

type MovieListProps = {
  movieList: Movie[] | undefined;
  isLoading: boolean;
};

export function MovieList({ isLoading, movieList }: MovieListProps) {
  const { data: genres, isLoading: isGenresLoading } = useSWR<GenreRes>(
    "/genre/movie/list",
    fetcher,
  );
  return (
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
  );
}
