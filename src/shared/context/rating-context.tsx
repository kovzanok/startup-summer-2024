import { createContext, useMemo } from "react";

import { useMovieRating } from "../hooks";
import { RatedMovie } from "../types";

export const RatingContext = createContext<
  [RatedMovie[], (movieRating: RatedMovie) => void] | null
>(null);

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [ratedMovies, rateMovie] = useMovieRating();
  const contextValues = useMemo<
    [RatedMovie[], (movieRating: RatedMovie) => void]
  >(() => [ratedMovies, rateMovie], [rateMovie, ratedMovies]);
  return (
    <RatingContext.Provider value={contextValues}>
      {children}
    </RatingContext.Provider>
  );
}
