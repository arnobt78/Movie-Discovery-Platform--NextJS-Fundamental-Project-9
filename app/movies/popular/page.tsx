/**
 * Route: /movies/popular — paginated list via MovieListPage.
 */
import { fetchMoviesPage, enrichMoviesWithRuntime } from "@/lib/tmdb";
import { MovieListPage } from "@/components/pages/MovieListPage";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata = {
  title: "Popular",
};

export default async function PopularPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const data = await fetchMoviesPage("movie/popular", currentPage);
  const movies = await enrichMoviesWithRuntime(data.results ?? []);
  const totalPages = Math.max(1, data.total_pages ?? 1);

  return (
    <MovieListPage
      movies={movies}
      title="Popular"
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/movies/popular"
    />
  );
}
