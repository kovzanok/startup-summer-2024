"use client";

import { Box } from "@mantine/core";
import { redirect, RedirectType } from "next/navigation";
import { useEffect } from "react";
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
  const { data, error } = useSWR<MovieDetails>(`/movie/${id}`, fetcher);
  useEffect(() => {
    if (error) {
      return redirect("/404/not-found", RedirectType.replace);
    }
  }, [error]);

  const content = data ? <PageContent {...data} /> : <PageSkeleton />;

  return (
    <Box py={40} px={180}>
      {content}
    </Box>
  );
}
