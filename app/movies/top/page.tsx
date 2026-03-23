/**
 * Route: /movies/top — paginated top rated list via MovieListPage.
 */
import { fetchMoviesPage } from "@/lib/tmdb";
import { MovieListPage } from "@/components/pages/MovieListPage";

export const revalidate = 600;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata = {
  title: "Top Rated",
};

export default async function TopRatedPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const data = await fetchMoviesPage("movie/top_rated", currentPage);
  const movies = (data.results ?? []).slice(0, 8);
  const totalPages = Math.max(1, data.total_pages ?? 1);

  return (
    <MovieListPage
      movies={movies}
      title="Top Rated"
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/movies/top"
    />
  );
}
