"use client";

import { Box, useMantineTheme } from "@mantine/core";
import useSWR from "swr";

import { fetcher } from "@/shared/lib";
import { DiscoverMovieRes } from "@/shared/types";
import { MovieList } from "@/widgets/movie-list";

export default function Home() {
  const { data: movieList, isLoading } = useSWR<DiscoverMovieRes>(
    "/discover/movie",
    fetcher,
  );

  const theme = useMantineTheme();
  return (
    <Box px={90} bg={theme.colors.gray[0]}>
      <MovieList movieList={movieList?.results} isLoading={isLoading} />
    </Box>
  );
}
