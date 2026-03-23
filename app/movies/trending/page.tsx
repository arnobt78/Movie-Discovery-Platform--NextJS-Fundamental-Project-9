/**
 * Route: /movies/trending — paginated list with day/week window; one window per request.
 */
import { fetchTrendingMoviesPage } from "@/lib/tmdb";
import { TrendingPage } from "@/components/pages/TrendingPage";

export const revalidate = 600;

interface PageProps {
  searchParams: Promise<{ page?: string; window?: string }>;
}

export const metadata = {
  title: "Trending",
};

export default async function TrendingRoute({ searchParams }: PageProps) {
  const params = await searchParams;
  const window = params.window === "week" ? "week" : "day";
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const data = await fetchTrendingMoviesPage(window, currentPage);
  const movies = (data.results ?? []).slice(0, 8);
  const totalPages = Math.max(1, data.total_pages ?? 1);

  return (
    <TrendingPage
      movies={movies}
      window={window}
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/movies/trending"
      preserveQuery={`window=${window}`}
    />
  );
}
