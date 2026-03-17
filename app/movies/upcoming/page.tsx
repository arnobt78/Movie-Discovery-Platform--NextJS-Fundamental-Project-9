/**
 * Upcoming movies - SSR fetches upcoming, passes to MovieListPage.
 */
import { fetchMovies, enrichMoviesWithRuntime } from "@/lib/tmdb";
import { MovieListPage } from "@/components/pages/MovieListPage";

export const metadata = {
  title: "Upcoming",
};

export default async function UpcomingPage() {
  const movies = await enrichMoviesWithRuntime(
    await fetchMovies("movie/upcoming")
  );
  return <MovieListPage movies={movies} title="Upcoming" />;
}
