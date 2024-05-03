import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import useSWR from "swr";

import { RatingContext, RatingContextValue } from "@/shared/context";
import { fetcher } from "@/shared/lib";
import { DiscoverMovieRes } from "@/shared/types";
import { MovieList } from "@/widgets/movie-list";

export function DiscoverMovieList() {
  const searchParams = useSearchParams();
  const { data: movieRes, isLoading } = useSWR<DiscoverMovieRes>(
    `/discover/movie?${searchParams.toString()}`,
    fetcher,
  );
  const [ratedMovies, rateMovie] = useContext(
    RatingContext,
  ) as RatingContextValue;
  return (
    <MovieList
      ratedMovies={ratedMovies}
      rateMovie={rateMovie}
      total={Math.min(500, movieRes?.total_pages || 0)}
      movieList={movieRes?.results}
      isLoading={isLoading}
    />
  );
}
