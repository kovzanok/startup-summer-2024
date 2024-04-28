"use client";

import { Box, useMantineTheme } from "@mantine/core";
import { Suspense } from "react";

import { DiscoverMovieList } from "./_component/discover-movie-list";
import { FilterForm } from "./_component/filter-form";
import { SortSelect } from "./_component/sort-select";

export default function Home() {
  const theme = useMantineTheme();
  return (
    <Box px={90} bg={theme.colors.gray[0]}>
      <Suspense>
        <FilterForm />
        <SortSelect />
        <DiscoverMovieList />
      </Suspense>
    </Box>
  );
}
