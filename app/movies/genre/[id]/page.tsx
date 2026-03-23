/**
 * Route: /movies/genre/[id] — paginated movies filtered by genre.
 */
import { notFound } from "next/navigation";
import { fetchDiscoverMoviesPage, fetchGenres } from "@/lib/tmdb";
import { GenrePage } from "@/components/pages/GenrePage";

interface GenreRouteProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: GenreRouteProps) {
  const { id } = await params;
  const genres = await fetchGenres();
  const genre = genres.find((g) => g.id === Number(id));
  return {
    title: genre?.name ?? "Genre",
  };
}

export default async function GenreRoute({ params, searchParams }: GenreRouteProps) {
  const { id } = await params;
  const { page } = await searchParams;
  const genreId = Number(id);
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);

  const [data, genres] = await Promise.all([
    fetchDiscoverMoviesPage({ genre_id: genreId, page: currentPage }),
    fetchGenres(),
  ]);

  const genre = genres.find((g) => g.id === genreId);
  if (!genre) notFound();

  const movies = (data.results ?? []).slice(0, 8);
  const totalPages = Math.max(1, data.total_pages ?? 1);

  return (
    <GenrePage
      movies={movies}
      genreName={genre.name}
      currentPage={currentPage}
      totalPages={totalPages}
      basePath={`/movies/genre/${id}`}
    />
  );
}
