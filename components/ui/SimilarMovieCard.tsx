"use client";

/**
 * SimilarMovieCard - compact poster + title; used in horizontal lists (similar, recommendations, collection).
 */
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { BookmarkButton } from "@/components/ui/BookmarkButton";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w185";
const FALLBACK = "/images/backup.png";

interface SimilarMovieCardProps {
  movie: Movie;
  index?: number;
}

export function SimilarMovieCard({ movie, index = 0 }: SimilarMovieCardProps) {
  const image = movie.poster_path
    ? `${IMAGE_BASE}/${movie.poster_path}`
    : FALLBACK;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex-shrink-0 w-32 sm:w-36"
    >
      <Link href={`/movie/${movie.id}`} className="relative block">
        <div className="rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-[2/3] hover:ring-2 hover:ring-blue-500 transition-all relative">
          <BookmarkButton
            movie={{
              id: movie.id,
              original_title: movie.original_title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              overview: movie.overview,
              backdrop_path: movie.backdrop_path,
              vote_average: movie.vote_average,
              genre_ids: movie.genre_ids,
              runtime: movie.runtime,
            }}
          />
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={movie.original_title}
              width={144}
              height={216}
              className="object-cover w-full h-full"
              unoptimized={!movie.poster_path}
            />
          </motion.div>
        </div>
        <p className="mt-1 text-xs font-medium text-gray-900 dark:text-white truncate">
          {movie.original_title}
        </p>
      </Link>
    </motion.div>
  );
}
