"use client";

/**
 * MovieListPage - grid of movies with optional URL-based pagination.
 * Responsive card grid.
 */
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/ui/MovieCard";
import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";
import { Pagination } from "@/components/ui/Pagination";
import { useTitle } from "@/hooks/useTitle";

interface MovieListPageProps {
  movies: Movie[];
  title: string;
  isLoading?: boolean;
  /** When set, shows pagination; basePath e.g. /movies/popular */
  currentPage?: number;
  totalPages?: number;
  basePath?: string;
  /** Query string to preserve when changing page (e.g. discover genre&sort). */
  preserveQuery?: string;
}

export function MovieListPage({
  movies,
  title,
  isLoading,
  currentPage = 1,
  totalPages,
  basePath,
  preserveQuery,
}: MovieListPageProps) {
  useTitle(title);
  if (isLoading) {
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

  const showPagination = basePath != null && totalPages != null && totalPages > 1;

  return (
    <section className="max-w-9xl mx-auto py-7">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {},
        }}
      >
        {movies.slice(0, 8).map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </motion.div>
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={basePath}
          preserveQuery={preserveQuery}
        />
      )}
    </section>
  );
}
