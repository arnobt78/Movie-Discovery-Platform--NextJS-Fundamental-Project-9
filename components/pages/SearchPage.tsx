"use client";

/**
 * SearchPage - client component for search results.
 * Receives movies and query from SSR parent.
 */
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/ui/MovieCard";
import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";
import { useTitle } from "@/hooks/useTitle";

interface SearchPageProps {
  movies: Movie[];
  query: string | null;
  isLoading?: boolean;
}

export function SearchPage({ movies, query, isLoading }: SearchPageProps) {
  useTitle(query ? `Search result for ${query}` : "Search");
  if (isLoading) {
    return (
      <>
        <section className="py-7">
          <p className="text-3xl text-gray-700 dark:text-white">Searching...</p>
        </section>
        <section className="max-w-9xl mx-auto py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </>
    );
  }

  const message =
    !query || query.trim() === ""
      ? "Enter a search term"
      : movies.length === 0
        ? `No result found for '${query}'`
        : `Result for '${query}'`;

  return (
    <>
      <section className="py-7">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl text-gray-700 dark:text-white"
        >
          {message}
        </motion.p>
      </section>
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
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </motion.div>
      </section>
    </>
  );
}
