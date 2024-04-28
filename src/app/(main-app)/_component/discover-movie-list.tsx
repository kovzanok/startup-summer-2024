import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import { fetcher } from "@/shared/lib";
import { DiscoverMovieRes } from "@/shared/types";
import { MovieList } from "@/widgets/movie-list";

export function DiscoverMovieList() {
  const searchParams = useSearchParams();
  const { data: movieRes, isLoading } = useSWR<DiscoverMovieRes>(
    `/discover/movie?${searchParams.toString()}`,
    fetcher,
  );
  return (
    <MovieList
      total={movieRes?.total_pages}
      movieList={movieRes?.results}
      isLoading={isLoading}
    />
  );
}
