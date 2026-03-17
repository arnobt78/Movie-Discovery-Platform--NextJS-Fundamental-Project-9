/**
 * Global loading fallback - shown during route transitions.
 */
import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";

export default function Loading() {
  return (
    <section className="max-w-7xl mx-auto py-7">
      <div className="flex justify-start flex-wrap other:justify-evenly">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
