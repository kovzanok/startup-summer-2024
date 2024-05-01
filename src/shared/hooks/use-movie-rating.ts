import { useLocalStorage } from "@mantine/hooks";
import { useCallback } from "react";

import { MovieRating } from "../types";

export const useMovieRating = (): [
  MovieRating[],
  (movieRating: MovieRating) => void,
] => {
  const [moviesRating, setMoviesRating] = useLocalStorage<MovieRating[]>({
    key: "savedMoviesRating",
    deserialize(value) {
      try {
        return value ? JSON.parse(value) : [];
      } catch {
        return [];
      }
    },
    defaultValue: [],
  });

  const rateMovie = useCallback(
    (rating: MovieRating) => {
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

  return [moviesRating, rateMovie];
};
