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
      total={movieRes?.total_pages}
      movieList={movieRes?.results}
      isLoading={isLoading}
    />
  );
}
