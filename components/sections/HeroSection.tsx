"use client";

/**
 * HeroSection - auto-sliding hero: backdrop, poster, title, overview, "View Details" link.
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Movie } from "@/types/movie";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const FALLBACK = "/images/backup.png";
const SLIDE_INTERVAL_MS = 5500;

interface HeroSectionProps {
  movies: Movie[];
}

export function HeroSection({ movies }: HeroSectionProps) {
  const [index, setIndex] = useState(0);
  const movie = movies[index] ?? movies[0];

  useEffect(() => {
    if (movies.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % movies.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [movies.length]);

  if (!movie) return null;

  const backdrop = movie.backdrop_path
    ? `${IMAGE_BASE}/${movie.backdrop_path}`
    : null;
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : FALLBACK;

  return (
    <section className="relative w-full aspect-[21/9] min-h-[200px] sm:min-h-[280px] rounded-xl overflow-hidden mb-8">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {backdrop && (
            <Image
              src={backdrop}
              alt=""
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized
            />
          )}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 flex items-center p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`poster-${movie.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
          </AnimatePresence>
          <div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${movie.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-2xl sm:text-4xl font-bold font-display text-white"
              >
                {movie.original_title}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={`overview-${movie.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
                className="mt-2 text-sm sm:text-base text-gray-200 line-clamp-2"
              >
                {movie.overview}
              </motion.p>
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              <Link
                href={`/movie/${movie.id}`}
                className="inline-block mt-4 px-6 py-2.5 bg-sky-900 hover:bg-sky-800 text-white font-medium rounded-lg transition-colors"
              >
                View Details
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      {movies.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {movies.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
