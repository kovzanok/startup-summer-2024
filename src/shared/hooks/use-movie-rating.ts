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
      const ratedMovieIndex = moviesRating.findIndex(m => m.id === rating.id);
      if (ratedMovieIndex !== -1) {
        if (rating.rating === 0) {
          setMoviesRating([
            ...moviesRating.filter(
              m => m.id !== moviesRating[ratedMovieIndex].id,
            ),
          ]);
        } else {
          setMoviesRating([
            ...moviesRating.slice(0, ratedMovieIndex),
            rating,
            ...moviesRating.slice(ratedMovieIndex + 1),
          ]);
        }
      } else {
        setMoviesRating([...moviesRating, rating]);
      }
    },
    [moviesRating, setMoviesRating],
  );

  return [moviesRating, rateMovie, { isLoading }];
};
