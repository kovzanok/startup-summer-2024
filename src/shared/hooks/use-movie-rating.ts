import { useLocalStorage } from "@mantine/hooks";
import { useCallback, useState } from "react";

import { RatedMovie } from "../types";

export const useMovieRating = (): [
  RatedMovie[],
  (movieRating: RatedMovie) => void,
  { isLoading: boolean },
] => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesRating, setMoviesRating] = useLocalStorage<RatedMovie[]>({
    key: "savedMoviesRating",
    deserialize(value) {
      try {
        return value ? JSON.parse(value) : [];
      } catch {
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    defaultValue: [],
  });

  const rateMovie = useCallback(
    (rating: RatedMovie) => {
      const ratedMovie = moviesRating.find(m => m.id === rating.id);
      if (ratedMovie) {
        const filteredRating = moviesRating.filter(m => m.id !== ratedMovie.id);
        if (rating.rating === 0) {
          setMoviesRating([...filteredRating]);
        } else {
          setMoviesRating([...filteredRating, rating]);
        }
      } else {
        setMoviesRating([...moviesRating, rating]);
      }
    },
    [moviesRating, setMoviesRating],
  );

  return [moviesRating, rateMovie, { isLoading }];
};
