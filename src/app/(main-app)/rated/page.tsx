"use client";

import { Box, Flex, Title } from "@mantine/core";
import { Suspense } from "react";

import { RatedMoviesList } from "./_components/rated-movies-list";
import { SearchForm } from "./_components/search-form";

export default function RatedMoviesPage() {
  return (
    <Box px={90} py={40}>
      <Suspense>
        <Flex mb={40} justify="space-between">
          <Title order={2} fz={32}>
            Rated movies
          </Title>
          <SearchForm />
        </Flex>
        <RatedMoviesList />
      </Suspense>
    </Box>
  );
}
