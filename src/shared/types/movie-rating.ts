import { Movie } from "./movie";

export type RatedMovie = Pick<
  Movie,
  | "title"
  | "id"
  | "release_date"
  | "vote_average"
  | "vote_count"
  | "poster_path"
  | "genre_ids"
> & { rating?: number };
