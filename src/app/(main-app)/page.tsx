"use client";

import { Box, Title } from "@mantine/core";
import { Suspense } from "react";

import { DiscoverMovieList } from "./_component/discover-movie-list";
import { FilterForm } from "./_component/filter-form";
import { SortSelect } from "./_component/sort-select";

export default function Home() {
  return (
    <Box
      px={{ lg: 40, xs: 20, base: 10 }}
      pt={{ lg: 41, xs: 20, base: 10 }}
      pb={{ lg: 82, xs: 20, base: 10 }}
    >
      <Title
        order={2}
        fz={{ base: 24, md: 32 }}
        fw={700}
        ta={{ base: "center", xs: "left" }}
      >
        Movies
      </Title>
      <Suspense>
        <FilterForm />
        <SortSelect />
        <DiscoverMovieList />
      </Suspense>
    </Box>
  );
}
