/**
 * Search page - SSR reads searchParams.q, fetches results, passes to SearchPage.
 */
import { fetchMovies, enrichMoviesWithRuntime } from "@/lib/tmdb";
import { SearchPage } from "@/components/pages/SearchPage";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchRoute({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : null;
  const moviesRaw = query ? await fetchMovies("search/movie", query) : [];
  const movies = await enrichMoviesWithRuntime(moviesRaw);

  return <SearchPage movies={movies} query={query} />;
}
