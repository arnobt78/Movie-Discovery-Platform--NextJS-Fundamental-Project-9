"use client";

/**
 * NowPlayingSection - grid of now-playing movies on home (full list from server).
 */
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/ui/MovieCard";

interface NowPlayingSectionProps {
  movies: Movie[];
}

export function NowPlayingSection({ movies }: NowPlayingSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
        Now Playing
      </h2>
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
    </motion.section>
  );
}
