"use client";

/**
 * GenrePage - movies by genre.
 */
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/ui/MovieCard";

interface GenrePageProps {
  movies: Movie[];
  genreName: string;
}

export function GenrePage({ movies, genreName }: GenrePageProps) {
  return (
    <section className="max-w-9xl mx-auto py-7">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold font-display mb-6 text-gray-900 dark:text-white"
      >
        {genreName} Movies
      </motion.h1>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {},
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
