export type MovieRating = {
  id: number;
  rating?: number;
};

export type RatedMovie = MovieRating & { title: string };
