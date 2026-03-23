"use client";

/**
 * TrendingSection - auto-sliding film reel of trending movies; no scrollbar.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { SimilarMovieCard } from "@/components/ui/SimilarMovieCard";

interface TrendingSectionProps {
  movies: Movie[];
}

const REEL_DURATION = 55;

export function TrendingSection({ movies }: TrendingSectionProps) {
  const list = movies.slice(0, 10);
  const duplicated = [...list, ...list];

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
          prefetch={false}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          See all
        </Link>
      </div>
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: REEL_DURATION,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicated.map((movie, i) => (
            <SimilarMovieCard
              key={`${movie.id}-${i}`}
              movie={movie}
              index={i % list.length}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
