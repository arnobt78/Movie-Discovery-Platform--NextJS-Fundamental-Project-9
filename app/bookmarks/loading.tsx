/**
 * Bookmarks loading - 2 rows × 3 cards (same style as /movies/trending, /movies/popular) to avoid footer flash.
 */
import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";

export default function BookmarksLoading() {
  return (
    <section className="max-w-9xl mx-auto py-7">
      <div className="h-9 w-44 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
