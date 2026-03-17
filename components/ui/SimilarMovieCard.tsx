"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";

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
      <Link href={`/movie/${movie.id}`}>
        <div className="rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-[2/3] hover:ring-2 hover:ring-blue-500 transition-all">
          <Image
            src={image}
            alt={movie.original_title}
            width={144}
            height={216}
            className="object-cover w-full h-full"
            unoptimized={!movie.poster_path}
          />
        </div>
        <p className="mt-1 text-xs font-medium text-gray-900 dark:text-white truncate">
          {movie.original_title}
        </p>
      </Link>
    </motion.div>
  );
}
