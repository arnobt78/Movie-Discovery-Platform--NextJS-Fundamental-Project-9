"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const FALLBACK = "/images/backup.png";

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  const backdrop = movie.backdrop_path
    ? `${IMAGE_BASE}/${movie.backdrop_path}`
    : null;
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : FALLBACK;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full aspect-[21/9] min-h-[200px] sm:min-h-[280px] rounded-xl overflow-hidden mb-8"
    >
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          className="object-cover"
          priority
          unoptimized
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 flex items-center p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden sm:block flex-shrink-0 w-24 aspect-[2/3] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src={poster}
              alt={movie.original_title}
              width={96}
              height={144}
              className="object-cover w-full h-full"
              unoptimized={!movie.poster_path}
            />
          </motion.div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-4xl font-bold font-display text-white"
            >
              {movie.original_title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-sm sm:text-base text-gray-200 line-clamp-2"
            >
              {movie.overview}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={`/movie/${movie.id}`}
                className="inline-block mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                View Details
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
