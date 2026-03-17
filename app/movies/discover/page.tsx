/**
 * Discover movies - SSR fetches with searchParams, passes to DiscoverPage.
 */
import { fetchDiscoverMovies, fetchGenres, enrichMoviesWithRuntime } from "@/lib/tmdb";
import { DiscoverPage } from "@/components/pages/DiscoverPage";

interface DiscoverPageProps {
  searchParams: Promise<{ genre?: string; year?: string; sort?: string }>;
}

export const metadata = {
  title: "Discover",
};

export default async function DiscoverRoute({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;
  const genreId = params.genre ? Number(params.genre) : undefined;
  const year = params.year ? Number(params.year) : undefined;
  const sort = params.sort ?? "popularity.desc";

  const [moviesRaw, genres] = await Promise.all([
    fetchDiscoverMovies({
      genre_id: genreId,
      primary_release_year: year,
      sort_by: sort,
    }),
    fetchGenres(),
  ]);

  const movies = await enrichMoviesWithRuntime(moviesRaw);

  return <DiscoverPage initialMovies={movies} genres={genres} />;
}
