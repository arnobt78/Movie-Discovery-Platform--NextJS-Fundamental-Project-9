"use client";

/**
 * TrendingSection - horizontal scroll of first 10 trending movies + "See all" to /movies/trending.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { SimilarMovieCard } from "@/components/ui/SimilarMovieCard";

interface TrendingSectionProps {
  movies: Movie[];
}

export function TrendingSection({ movies }: TrendingSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
          Trending Now
        </h2>
        <Link
          href="/movies/trending"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          See all
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {movies.slice(0, 10).map((movie, i) => (
          <SimilarMovieCard key={movie.id} movie={movie} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
