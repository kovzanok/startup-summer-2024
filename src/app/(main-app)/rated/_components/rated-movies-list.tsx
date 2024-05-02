import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";

import { RatingContext, RatingContextValue } from "@/shared/context";
import { useUpdateSearchParams } from "@/shared/hooks";
import { chunk } from "@/shared/lib";
import { MovieList } from "@/widgets/movie-list";

export function RatedMoviesList() {
  const searchParams = useSearchParams();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const updateSearchParams = useUpdateSearchParams();
  const page = useMemo(
    () => Number(searchParams.get("page")) || 1,
    [searchParams],
  );
  const [ratedMovies, rateMovie, { isLoading }] = useContext(
    RatingContext,
  ) as RatingContextValue;
  const chunkedMovieList = useMemo(() => chunk(ratedMovies, 4), [ratedMovies]);
  useEffect(() => {
    if (isPageLoading) {
      setIsPageLoading(false);
    }
    if (
      !isLoading &&
      chunkedMovieList.length !== 0 &&
      !chunkedMovieList[page - 1]
    ) {
      updateSearchParams("page", page - 1);
      setIsPageLoading(true);
    }
  }, [chunkedMovieList, page, isLoading, setIsPageLoading, isPageLoading]);

  return (
    <MovieList
      rateMovie={rateMovie}
      ratedMovies={ratedMovies}
      total={Math.ceil(ratedMovies.length / 4)}
      isLoading={isLoading || isPageLoading}
      movieList={chunkedMovieList[page - 1]}
      isRatingList
    />
  );
}
