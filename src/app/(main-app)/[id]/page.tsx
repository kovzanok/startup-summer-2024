"use client";

import { Box } from "@mantine/core";
import useSWR from "swr";

import { fetcher } from "@/shared/lib";
import { MovieDetails } from "@/shared/types/movie";

import { PageContent } from "./_components/page-content";
import { PageSkeleton } from "./_components/page-skeleton";

export default function MoviePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = useSWR<MovieDetails>(`/movie/${id}`, fetcher);

  const content = data ? <PageContent {...data} /> : <PageSkeleton />;

  return (
    <Box py={40} px={180}>
      {content}
    </Box>
  );
}
