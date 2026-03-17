"use client";

/**
 * MovieCard - displays a movie with poster, title, overview.
 * Uses shadcn Card, framer-motion for entrance animation.
 */
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { Card, CardHeader } from "@/components/ui/Card";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMAGE = "/images/backup.png";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const { id, original_title, overview, poster_path } = movie;
  const image = poster_path ? `${IMAGE_BASE}/${poster_path}` : FALLBACK_IMAGE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="w-full sm:w-auto"
    >
      <Card className="max-w-sm m-3 overflow-hidden">
        <Link href={`/movie/${id}`}>
          <div className="relative w-full aspect-[2/3] bg-gray-200 dark:bg-gray-700">
            <Image
              src={image}
              alt={original_title}
              fill
              className="object-cover rounded-t-lg"
              sizes="(max-width: 640px) 100vw, 384px"
              unoptimized={!poster_path}
            />
          </div>
        </Link>
        <CardHeader>
          <Link href={`/movie/${id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
              {original_title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
            {overview}
          </p>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
