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
  const search = useMemo(
    () => searchParams.get("search") || "",
    [searchParams],
  );
  const filteredMovies = useMemo(
    () =>
      ratedMovies.filter(({ title }) =>
        title.toLowerCase().includes(search.toLowerCase()),
      ),
    [ratedMovies, search],
  );
  const chunkedMovieList = useMemo(
    () => chunk(filteredMovies, 4),
    [filteredMovies],
  );
  useEffect(() => {
    if (isPageLoading) {
      setIsPageLoading(false);
    }
    if (
      !isLoading &&
      chunkedMovieList.length !== 0 &&
      !chunkedMovieList[page - 1] &&
      chunkedMovieList[page - 2]
    ) {
      updateSearchParams("page", page - 1);
      setIsPageLoading(true);
    }
  }, [chunkedMovieList, page, isLoading, setIsPageLoading, isPageLoading]);

  return (
    <MovieList
      rateMovie={rateMovie}
      ratedMovies={ratedMovies}
      total={chunkedMovieList.length}
      isLoading={isLoading || isPageLoading}
      movieList={chunkedMovieList[page - 1]}
      isRatingList
    />
  );
}
