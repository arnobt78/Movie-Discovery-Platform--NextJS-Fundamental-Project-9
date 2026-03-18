/**
 * Route: /movies/upcoming — paginated upcoming list via MovieListPage.
 */
import { fetchMoviesPage, enrichMoviesWithRuntime } from "@/lib/tmdb";
import { MovieListPage } from "@/components/pages/MovieListPage";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata = {
  title: "Upcoming",
};

export default async function UpcomingPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const data = await fetchMoviesPage("movie/upcoming", currentPage);
  const movies = await enrichMoviesWithRuntime(data.results ?? []);
  const totalPages = Math.max(1, data.total_pages ?? 1);

  return (
    <MovieListPage
      movies={movies}
      title="Upcoming"
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/movies/upcoming"
    />
  );
}
