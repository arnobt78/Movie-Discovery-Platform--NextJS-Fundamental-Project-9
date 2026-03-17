/**
 * Discover page loading - replica of DiscoverPage (title, filters, grid).
 */
import { Skeleton } from "@/components/ui/Skeleton";
import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";

export default function DiscoverLoading() {
  return (
    <section className="max-w-9xl mx-auto py-7">
      <Skeleton className="h-9 w-48 mb-6" />
      <div className="flex flex-wrap gap-4 mb-6">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
