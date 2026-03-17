/**
 * Trending movies - SSR fetches day and week, passes to TrendingPage.
 */
import { fetchTrendingMovies, enrichMoviesWithRuntime } from "@/lib/tmdb";
import { TrendingPage } from "@/components/pages/TrendingPage";

export const metadata = {
  title: "Trending",
};

export default async function TrendingRoute() {
  const [dayRaw, weekRaw] = await Promise.all([
    fetchTrendingMovies("day"),
    fetchTrendingMovies("week"),
  ]);

  const [dayMovies, weekMovies] = await Promise.all([
    enrichMoviesWithRuntime(dayRaw),
    enrichMoviesWithRuntime(weekRaw),
  ]);

  return (
    <TrendingPage dayMovies={dayMovies} weekMovies={weekMovies} />
  );
}
