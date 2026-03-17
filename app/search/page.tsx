/**
 * Search page - SSR reads searchParams.q, fetches results, passes to SearchPage.
 */
import { fetchMovies } from "@/lib/tmdb";
import { SearchPage } from "@/components/pages/SearchPage";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchRoute({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : null;
  const movies = query
    ? await fetchMovies("search/movie", query)
    : [];

  return <SearchPage movies={movies} query={query} />;
}
