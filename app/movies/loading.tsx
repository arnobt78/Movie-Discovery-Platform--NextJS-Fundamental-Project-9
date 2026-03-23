/**
 * Movies list loading - replica of MovieListPage grid layout.
 */
import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";

export default function MoviesLoading() {
  return (
    <section className="max-w-9xl mx-auto py-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
