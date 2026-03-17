/**
 * Route: /movies/genre/[id] — movies filtered by genre; metadata uses genre name.
 */
import { notFound } from "next/navigation";
import { fetchDiscoverMovies, fetchGenres, enrichMoviesWithRuntime } from "@/lib/tmdb";
import { GenrePage } from "@/components/pages/GenrePage";

interface GenreRouteProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: GenreRouteProps) {
  const { id } = await params;
  const genres = await fetchGenres();
  const genre = genres.find((g) => g.id === Number(id));
  return {
    title: genre?.name ?? "Genre",
  };
}

export default async function GenreRoute({ params }: GenreRouteProps) {
  const { id } = await params;
  const genreId = Number(id);
  const [moviesRaw, genres] = await Promise.all([
    fetchDiscoverMovies({ genre_id: genreId }),
    fetchGenres(),
  ]);

  const genre = genres.find((g) => g.id === genreId);
  if (!genre) notFound();

  const movies = await enrichMoviesWithRuntime(moviesRaw);

  return <GenrePage movies={movies} genreName={genre.name} />;
}
