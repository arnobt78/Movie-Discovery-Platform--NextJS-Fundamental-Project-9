/**
 * Route: /movies/top — top rated list via MovieListPage.
 */
import { fetchMovies, enrichMoviesWithRuntime } from "@/lib/tmdb";
import { MovieListPage } from "@/components/pages/MovieListPage";

export const metadata = {
  title: "Top Rated",
};

export default async function TopRatedPage() {
  const movies = await enrichMoviesWithRuntime(
    await fetchMovies("movie/top_rated")
  );
  return <MovieListPage movies={movies} title="Top Rated" />;
}
