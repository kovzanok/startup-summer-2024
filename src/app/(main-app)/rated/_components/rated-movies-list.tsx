import { useSearchParams } from "next/navigation";
import { useContext, useMemo } from "react";

import { RatingContext, RatingContextValue } from "@/shared/context";
import { chunk } from "@/shared/lib";
import { MovieList } from "@/widgets/movie-list";

export function RatedMoviesList() {
  const searchParams = useSearchParams();
  const page = useMemo(
    () => Number(searchParams.get("page")) || 1,
    [searchParams],
  );
  const [ratedMovies, rateMovie, { isLoading }] = useContext(
    RatingContext,
  ) as RatingContextValue;
  const chunkedMovieList = useMemo(() => chunk(ratedMovies, 4), [ratedMovies]);
  return (
    <MovieList
      rateMovie={rateMovie}
      ratedMovies={ratedMovies}
      total={Math.ceil(ratedMovies.length / 4)}
      isLoading={isLoading}
      movieList={chunkedMovieList[page - 1]}
      isRatingList
    />
  );
}
