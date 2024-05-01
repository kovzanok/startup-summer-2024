import { createContext, useMemo } from "react";

import { useMovieRating } from "../hooks";
import { MovieRating } from "../types";

export const RatingContext = createContext<
  [MovieRating[], (movieRating: MovieRating) => void] | null
>(null);

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [ratedMovies, rateMovie] = useMovieRating();
  const contextValues = useMemo<
    [MovieRating[], (movieRating: MovieRating) => void]
  >(() => [ratedMovies, rateMovie], [rateMovie, ratedMovies]);
  return (
    <RatingContext.Provider value={contextValues}>
      {children}
    </RatingContext.Provider>
  );
}
