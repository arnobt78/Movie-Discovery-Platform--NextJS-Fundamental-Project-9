"use client";

import { motion } from "framer-motion";
import { useBookmarks } from "@/context/BookmarkContext";
import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/ui/MovieCard";
import { useTitle } from "@/hooks/useTitle";

export function BookmarkPage() {
  useTitle("My Bookmarks");
  const { bookmarks } = useBookmarks();

  return (
    <section className="max-w-9xl mx-auto py-7">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold font-display mb-6 text-gray-900 dark:text-white"
      >
        My Bookmarks
      </motion.h1>
      {bookmarks.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 dark:text-gray-400"
        >
          No bookmarks yet. Save movies by clicking the bookmark icon on any
          card.
        </motion.p>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
            hidden: {},
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {bookmarks.map((b, i) => (
            <motion.div
              key={b.id}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
            >
              <MovieCard
                movie={
                  {
                    id: b.id,
                    original_title: b.original_title,
                    overview: b.overview ?? "",
                    poster_path: b.poster_path,
                    backdrop_path: b.backdrop_path,
                    release_date: b.release_date,
                    vote_average: b.vote_average,
                    genre_ids: b.genre_ids,
                    runtime: b.runtime,
                  } as Movie
                }
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
