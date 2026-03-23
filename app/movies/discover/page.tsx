/**
 * Route: /movies/discover — filter by genre, year, sort; paginated via URL page.
 */
import { fetchDiscoverMoviesPage, fetchGenres } from "@/lib/tmdb";
import { DiscoverPage } from "@/components/pages/DiscoverPage";

export const revalidate = 600;

interface DiscoverPageProps {
  searchParams: Promise<{ genre?: string; year?: string; sort?: string; page?: string }>;
}

export const metadata = {
  title: "Discover",
};

export default async function DiscoverRoute({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;
  const genreId = params.genre ? Number(params.genre) : undefined;
  const year = params.year ? Number(params.year) : undefined;
  const sort = params.sort ?? "popularity.desc";
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const [data, genres] = await Promise.all([
    fetchDiscoverMoviesPage({
      genre_id: genreId,
      primary_release_year: year,
      sort_by: sort,
      page: currentPage,
    }),
    fetchGenres(),
  ]);

  const movies = (data.results ?? []).slice(0, 8);
  const totalPages = Math.max(1, data.total_pages ?? 1);

  const preserveQuery = new URLSearchParams();
  if (genreId) preserveQuery.set("genre", String(genreId));
  if (year) preserveQuery.set("year", String(year));
  preserveQuery.set("sort", sort);

  return (
    <DiscoverPage
      initialMovies={movies}
      genres={genres}
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/movies/discover"
      preserveQuery={preserveQuery.toString()}
    />
  );
}
