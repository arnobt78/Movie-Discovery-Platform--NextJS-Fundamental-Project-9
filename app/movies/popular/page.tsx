/**
 * Popular movies - SSR fetches popular, passes to MovieListPage.
 */
import { fetchMovies } from "@/lib/tmdb";
import { MovieListPage } from "@/components/pages/MovieListPage";

export const metadata = {
  title: "Popular",
};

export default async function PopularPage() {
  const movies = await fetchMovies("movie/popular");
  return <MovieListPage movies={movies} title="Popular" />;
}
