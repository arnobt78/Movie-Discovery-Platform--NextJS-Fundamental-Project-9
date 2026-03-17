/**
 * Trending movies - SSR fetches day and week, passes to TrendingPage.
 */
import { fetchTrendingMovies } from "@/lib/tmdb";
import { TrendingPage } from "@/components/pages/TrendingPage";

export const metadata = {
  title: "Trending",
};

export default async function TrendingRoute() {
  const [dayMovies, weekMovies] = await Promise.all([
    fetchTrendingMovies("day"),
    fetchTrendingMovies("week"),
  ]);

  return (
    <TrendingPage dayMovies={dayMovies} weekMovies={weekMovies} />
  );
}
