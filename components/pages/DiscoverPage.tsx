"use client";

/**
 * DiscoverPage - discover movies with genre, year, sort filters.
 */
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDiscoverParams } from "@/hooks/useDiscoverParams";
import { motion } from "framer-motion";
import type { Movie, Genre } from "@/types/movie";
import { MovieCard } from "@/components/ui/MovieCard";
import { GenreFilter } from "@/components/ui/GenreFilter";
import { YearFilter } from "@/components/ui/YearFilter";
import { SortSelect } from "@/components/ui/SortSelect";

interface DiscoverPageProps {
  initialMovies: Movie[];
  genres: Genre[];
}

const DEFAULT_SORT = "popularity.desc";

export function DiscoverPage({ initialMovies, genres }: DiscoverPageProps) {
  const router = useRouter();
  const { genreId, year, sort } = useDiscoverParams();

  const hasActiveFilters =
    genreId !== null || year !== null || sort !== DEFAULT_SORT;

  const clearFilters = useCallback(() => {
    router.push("/movies/discover");
  }, [router]);

  const updateParams = useCallback(
    (updates: {
      genre?: number | null;
      year?: number | null;
      sort?: string;
    }) => {
      const newGenre = updates.genre !== undefined ? updates.genre : genreId;
      const newYear = updates.year !== undefined ? updates.year : year;
      const newSort = updates.sort ?? sort;
      const p = new URLSearchParams();
      if (newGenre) p.set("genre", String(newGenre));
      if (newYear) p.set("year", String(newYear));
      p.set("sort", newSort);
      const q = p.toString();
      router.push(q ? `/movies/discover?${q}` : "/movies/discover");
    },
    [genreId, year, sort, router],
  );

  return (
    <section className="max-w-9xl mx-auto py-7">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold font-display mb-6 text-gray-900 dark:text-white"
      >
        Discover Movies
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-4 mb-6"
      >
        <GenreFilter
          genres={genres}
          selectedId={genreId}
          onSelect={(id) => updateParams({ genre: id })}
        />
        <YearFilter
          selected={year}
          onSelect={(y) => updateParams({ year: y })}
        />
        <div className="flex items-center gap-2">
          <SortSelect
            value={sort}
            onChange={(v) => updateParams({ sort: v })}
          />
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {},
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {initialMovies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
