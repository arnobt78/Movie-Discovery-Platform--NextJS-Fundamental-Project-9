/**
 * Trending page loading - replica of TrendingPage (title, day/week toggle, grid).
 */
import { Skeleton } from "@/components/ui/Skeleton";
import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";

export default function TrendingLoading() {
  return (
    <section className="max-w-9xl mx-auto py-7">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Skeleton className="h-9 w-44" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
