"use client";

/**
 * MovieListPage - client component that displays a grid of movies.
 * Receives initial data from SSR parent to avoid flash.
 */
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/ui/MovieCard";
import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";
import { useTitle } from "@/hooks/useTitle";

interface MovieListPageProps {
  movies: Movie[];
  title: string;
  isLoading?: boolean;
}

export function MovieListPage({ movies, title, isLoading }: MovieListPageProps) {
  useTitle(title);
  if (isLoading) {
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

  return (
    <section className="max-w-7xl mx-auto py-7">
      <motion.div
        className="flex justify-start flex-wrap other:justify-evenly"
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
  );
}
