/**
 * MovieDetailSkeleton - replica of MovieDetailPage layout for loading state.
 * Matches poster, details, trailers, cast, similar sections.
 */
import { Skeleton } from "@/components/ui/Skeleton";

export function MovieDetailSkeleton() {
  return (
    <section className="w-full py-5">
      <div className="flex justify-around flex-wrap gap-6">
        {/* Poster */}
        <div className="max-w-sm flex-shrink-0">
          <Skeleton className="w-full aspect-[2/3] rounded-lg shadow-lg" />
        </div>
        {/* Details */}
        <div className="max-w-2xl flex-1 min-w-0">
          <Skeleton className="h-10 w-3/4 my-3" />
          <Skeleton className="h-5 w-1/2 my-2" />
          <Skeleton className="h-4 w-full my-4" />
          <Skeleton className="h-4 w-full my-1" />
          <Skeleton className="h-4 w-full my-1" />
          <div className="my-7 flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-md" />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-1 w-1 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          <Skeleton className="h-4 w-48 my-2" />
          <Skeleton className="h-4 w-40 my-2" />
          <Skeleton className="h-4 w-32 my-2" />
          <Skeleton className="h-4 w-24 my-4" />
        </div>
      </div>

      {/* Trailers */}
      <div className="mt-12">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="w-full aspect-video rounded-lg" />
          ))}
        </div>
      </div>

      {/* Cast */}
      <div className="mt-12">
        <Skeleton className="h-8 w-24 mb-4" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex-shrink-0 w-24 sm:w-28">
              <Skeleton className="w-full aspect-[2/3] rounded-lg" />
              <Skeleton className="h-3 w-16 mt-1" />
              <Skeleton className="h-3 w-12 mt-0.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Similar */}
      <div className="mt-12">
        <Skeleton className="h-8 w-36 mb-4" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="flex-shrink-0 w-32 sm:w-36">
              <Skeleton className="w-full aspect-[2/3] rounded-lg" />
              <Skeleton className="h-3 w-full mt-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
