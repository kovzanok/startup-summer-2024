"use client";

import { Box, useMantineTheme } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import { fetcher } from "@/shared/lib";
import { DiscoverMovieRes } from "@/shared/types";
import { MovieList } from "@/widgets/movie-list";

export default function Home() {
  const searchParams = useSearchParams();
  const { data: movieRes, isLoading } = useSWR<DiscoverMovieRes>(
    `/discover/movie?${searchParams.toString()}`,
    fetcher,
  );

  const theme = useMantineTheme();
  return (
    <Box px={90} bg={theme.colors.gray[0]}>
      <MovieList
        total={movieRes?.total_pages}
        movieList={movieRes?.results}
        isLoading={isLoading}
      />
    </Box>
  );
}
