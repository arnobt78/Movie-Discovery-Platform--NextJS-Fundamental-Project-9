"use client";

/**
 * MovieCard - displays a movie with poster, title, overview, important info badges.
 * Uses shadcn Card, Badge, framer-motion for entrance animation.
 */
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Movie } from "@/types/movie";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useGenres } from "@/components/providers/GenresProvider";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMAGE = "/images/backup.png";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const genres = useGenres();
  const {
    id,
    original_title,
    overview,
    poster_path,
    vote_average,
    release_date,
    genre_ids,
    runtime,
  } = movie;
  const image = poster_path ? `${IMAGE_BASE}/${poster_path}` : FALLBACK_IMAGE;
  const year = release_date ? new Date(release_date).getFullYear() : null;
  const rating = vote_average != null ? vote_average.toFixed(1) : null;

  const genreNames =
    genre_ids && genres.length > 0
      ? genre_ids
          .map((gid) => genres.find((g) => g.id === gid)?.name)
          .filter(Boolean)
          .slice(0, 2)
      : [];

  const formatRuntime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="w-full h-full"
    >
      <Card className="h-full max-w-sm overflow-hidden flex flex-col">
        <Link href={`/movie/${id}`} className="flex-shrink-0">
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
        <CardHeader className="flex-1 flex flex-col min-h-0">
          <div className="flex flex-wrap gap-2 mb-2">
            {rating != null && (
              <Badge variant="secondary" className="text-xs">
                ★ {rating}
              </Badge>
            )}
            {year != null && (
              <Badge variant="outline" className="text-xs">
                {year}
              </Badge>
            )}
            {genreNames.map((name) => (
              <Badge key={name} variant="outline" className="text-xs">
                {name}
              </Badge>
            ))}
            {runtime != null && runtime > 0 && (
              <Badge variant="outline" className="text-xs">
                {formatRuntime(runtime)}
              </Badge>
            )}
          </div>
          <Link href={`/movie/${id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline line-clamp-2">
              {original_title}
            </h5>
          </Link>
          <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
            {overview}
          </p>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
