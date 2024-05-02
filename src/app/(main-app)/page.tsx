"use client";

import { Box, Title } from "@mantine/core";
import { Suspense } from "react";

import { DiscoverMovieList } from "./_component/discover-movie-list";
import { FilterForm } from "./_component/filter-form";
import { SortSelect } from "./_component/sort-select";

export default function Home() {
  return (
    <Box px={{ base: 90, lg: 40 }} pt={41} pb={82}>
      <Title order={2} fz={32} fw={700}>
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
