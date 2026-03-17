/**
 * HomePageSkeleton - replica of home page layout (Hero, Trending, Now Playing, Top Rated).
 */
import { Skeleton } from "@/components/ui/Skeleton";
import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";

export function HomePageSkeleton() {
  return (
    <div className="w-full max-w-9xl mx-auto py-7">
      {/* Hero */}
      <Skeleton className="w-full aspect-[21/9] min-h-[200px] sm:min-h-[280px] rounded-xl mb-8" />

      {/* Trending row */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex-shrink-0 w-32 sm:w-36">
              <Skeleton className="w-full aspect-[2/3] rounded-lg" />
              <Skeleton className="h-3 w-full mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Now Playing grid */}
      <div className="mb-12">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Top Rated grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
