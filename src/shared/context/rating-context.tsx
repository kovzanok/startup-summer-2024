import { createContext, useMemo } from "react";

import { useMovieRating } from "../hooks";
import { RatedMovie } from "../types";

export const RatingContext = createContext<RatingContextValue | null>(null);

export type RatingContextValue = [
  RatedMovie[],
  (movieRating: RatedMovie) => void,
  { isLoading: boolean },
];

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [ratedMovies, rateMovie, { isLoading }] = useMovieRating();
  const contextValues = useMemo<RatingContextValue>(
    () => [ratedMovies, rateMovie, { isLoading }],
    [rateMovie, ratedMovies, isLoading],
  );
  return (
    <RatingContext.Provider value={contextValues}>
      {children}
    </RatingContext.Provider>
  );
}
