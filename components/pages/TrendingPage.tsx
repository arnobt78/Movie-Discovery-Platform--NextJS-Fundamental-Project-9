"use client";

/**
 * TrendingPage - trending movies with day/week toggle.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/ui/MovieCard";
import { RippleButton } from "@/components/ui/RippleButton";

interface TrendingPageProps {
  dayMovies: Movie[];
  weekMovies: Movie[];
}

export function TrendingPage({ dayMovies, weekMovies }: TrendingPageProps) {
  const [window, setWindow] = useState<"day" | "week">("day");
  const movies = window === "day" ? dayMovies : weekMovies;

  return (
    <section className="max-w-7xl mx-auto py-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-4 mb-6"
      >
        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
          Trending Movies
        </h1>
        <div className="flex gap-2">
          <RippleButton
            type="button"
            onClick={() => setWindow("day")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              window === "day"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Today
          </RippleButton>
          <RippleButton
            type="button"
            onClick={() => setWindow("week")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              window === "week"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            This Week
          </RippleButton>
        </div>
      </motion.div>
      <motion.div
        key={window}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex justify-start flex-wrap other:justify-evenly gap-4"
      >
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
