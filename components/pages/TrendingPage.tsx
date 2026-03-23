"use client";

/**
 * TrendingPage - trending movies with day/week tabs and pagination.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/ui/MovieCard";
import { Pagination } from "@/components/ui/Pagination";
import { useTitle } from "@/hooks/useTitle";

interface TrendingPageProps {
  movies: Movie[];
  window: "day" | "week";
  currentPage: number;
  totalPages: number;
  basePath: string;
  preserveQuery: string;
}

export function TrendingPage({
  movies,
  window,
  currentPage,
  totalPages,
  basePath,
  preserveQuery,
}: TrendingPageProps) {
  useTitle("Trending");

  return (
    <section className="max-w-9xl mx-auto py-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-4 mb-6"
      >
        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
          Trending Movies
        </h1>
        <div className="flex gap-2">
          <Link
            href="/movies/trending?window=day&page=1"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              window === "day"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Today
          </Link>
          <Link
            href="/movies/trending?window=week&page=1"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              window === "week"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            This Week
          </Link>
        </div>
      </motion.div>
      <motion.div
        key={`${window}-${currentPage}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {movies.slice(0, 8).map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </motion.div>
      {totalPages > 1 && (
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
