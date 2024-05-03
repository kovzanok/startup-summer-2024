"use client";

import { Box, Flex, Title } from "@mantine/core";
import { Suspense } from "react";

import { RatedMoviesList } from "./_components/rated-movies-list";
import { SearchForm } from "./_components/search-form";

export default function RatedMoviesPage() {
  return (
    <Box px={{ lg: 90, xs: 20, base: 10 }} py={{ lg: 40, xs: 20, base: 10 }}>
      <Suspense>
        <Flex
          direction={{ base: "column", xs: "row" }}
          gap={10}
          mb={{ md: 40, base: 10 }}
          justify="space-between"
          align="center"
        >
          <Title
            order={2}
            fz={{ base: 24, md: 32 }}
            ta={{ base: "center", xs: "left" }}
          >
            Rated movies
          </Title>
          <SearchForm />
        </Flex>
        <RatedMoviesList />
      </Suspense>
    </Box>
  );
}
