import { useCallback, useEffect, useState } from "react";

import { MovieRating } from "../types";

export const useMovieRating = (): [
  MovieRating[],
  (movieRating: MovieRating) => void,
] => {
  const [moviesRating, setMoviesRating] = useState<MovieRating[]>([]);
  useEffect(() => {
    try {
      const savedRating = localStorage.getItem("savedMoviesRating");
      if (savedRating) {
        setMoviesRating(JSON.parse(savedRating));
      }
    } catch {
      setMoviesRating([]);
    }
  }, [setMoviesRating]);

  useEffect(() => {
    const saveRating = () => {
      localStorage.setItem("savedMoviesRating", JSON.stringify(moviesRating));
    };
    window.addEventListener("unload", saveRating);

    return () => window.removeEventListener("unload", saveRating);
  }, [moviesRating]);

  const rateMovie = useCallback(
    (rating: MovieRating) => {
      const ratedMovie = moviesRating.find(m => m.id === rating.id);
      if (ratedMovie) {
        if (rating.rating === 0) {
          setMoviesRating([
            ...moviesRating.filter(m => m.id !== ratedMovie.id),
          ]);
        } else {
          setMoviesRating([
            ...moviesRating.filter(m => m.id !== ratedMovie.id),
            rating,
          ]);
        }
      } else {
        setMoviesRating([...moviesRating, rating]);
      }
    },
    [moviesRating, setMoviesRating],
  );

  return [moviesRating, rateMovie];
};
