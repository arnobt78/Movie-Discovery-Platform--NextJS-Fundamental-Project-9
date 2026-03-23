"use client";

/**
 * TopRatedPreviewSection - up to 4 top-rated movies (random order each load) + "See all" link.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/ui/MovieCard";

interface TopRatedPreviewSectionProps {
  movies: Movie[];
}

export function TopRatedPreviewSection({ movies }: TopRatedPreviewSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
          Top Rated
        </h2>
        <Link
          href="/movies/top"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          See all
        </Link>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {},
        }}
      >
        {movies.slice(0, 4).map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </motion.div>
    </motion.section>
  );
}
