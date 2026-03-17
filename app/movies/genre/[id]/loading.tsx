/**
 * Genre page loading - replica of GenrePage (title, grid).
 */
import { Skeleton } from "@/components/ui/Skeleton";
import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";

export default function GenreLoading() {
  return (
    <section className="max-w-9xl mx-auto py-7">
      <Skeleton className="h-9 w-48 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
