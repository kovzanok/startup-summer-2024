"use client";

import { Box, useMantineTheme } from "@mantine/core";
import { Suspense } from "react";

import { DiscoverMovieList } from "./_component/discover-movie-list";

export default function Home() {
  const theme = useMantineTheme();
  return (
    <Box px={90} bg={theme.colors.gray[0]}>
      <Suspense>
        <DiscoverMovieList />
      </Suspense>
    </Box>
  );
}
