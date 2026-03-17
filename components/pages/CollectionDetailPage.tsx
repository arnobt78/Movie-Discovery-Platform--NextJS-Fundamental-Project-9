"use client";

/**
 * CollectionDetailPage - collection name, overview, and grid of parts (movies in series).
 */
import { motion } from "framer-motion";
import type { Collection } from "@/types/movie";
import { SimilarMovieCard } from "@/components/ui/SimilarMovieCard";
import { useTitle } from "@/hooks/useTitle";

interface CollectionDetailPageProps {
  collection: Collection;
}

export function CollectionDetailPage({ collection }: CollectionDetailPageProps) {
  useTitle(collection.name);

  return (
    <section className="w-full py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold font-display my-3 text-gray-900 dark:text-white">
          {collection.name}
        </h1>
        {collection.overview && (
          <p className="my-4 text-gray-700 dark:text-gray-300 max-w-3xl">
            {collection.overview}
          </p>
        )}
      </motion.div>

      {collection.parts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            Movies
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {collection.parts.map((part, i) => (
              <SimilarMovieCard
                key={part.id}
                movie={{
                  id: part.id,
                  original_title: part.title ?? part.original_title ?? "",
                  overview: part.overview ?? "",
                  poster_path: part.poster_path,
                  backdrop_path: part.backdrop_path,
                  vote_average: part.vote_average,
                  release_date: part.release_date,
                }}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
