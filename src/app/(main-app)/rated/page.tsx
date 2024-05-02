"use client";

import { Box } from "@mantine/core";
import { Suspense } from "react";

import { RatedMoviesList } from "./_components/rated-movies-list";

export default function RatedMoviesPage() {
  return (
    <Box px={90} py={40}>
      <Suspense>
        <RatedMoviesList />
      </Suspense>
    </Box>
  );
}
