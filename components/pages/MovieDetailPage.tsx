"use client";

/**
 * MovieDetailPage - client component for single movie detail.
 * Receives movie, credits, videos, similar from SSR parent.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import type {
  MovieDetail,
  MovieCredits,
  Video,
  Movie,
} from "@/types/movie";
import { Badge } from "@/components/ui/Badge";
import { CastCard } from "@/components/ui/CastCard";
import { VideoCard } from "@/components/ui/VideoCard";
import { SimilarMovieCard } from "@/components/ui/SimilarMovieCard";
import { useTitle } from "@/hooks/useTitle";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMAGE = "/images/backup.png";

function formatCurrency(value: number | undefined): string {
  if (value == null || value === 0) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

interface MovieDetailPageProps {
  movie: MovieDetail;
  credits: MovieCredits | null;
  videos: Video[];
  similarMovies: Movie[];
}

export function MovieDetailPage({
  movie,
  credits,
  videos,
  similarMovies,
}: MovieDetailPageProps) {
  useTitle(movie.title);
  const image = movie.poster_path
    ? `${IMAGE_BASE}/${movie.poster_path}`
    : FALLBACK_IMAGE;

  const directors =
    credits?.crew.filter((c) => c.job === "Director") ?? [];
  const topCast = credits?.cast.slice(0, 12) ?? [];

  return (
    <section className="w-full py-5">
      <div className="flex justify-around flex-wrap gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-sm flex-shrink-0"
        >
          <Image
            src={image}
            alt={movie.title}
            width={384}
            height={576}
            className="rounded-lg shadow-lg"
            unoptimized={!movie.poster_path}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="max-w-2xl flex-1 min-w-0"
        >
          <h1 className="text-4xl font-bold font-display my-3 text-center lg:text-left text-gray-900 dark:text-white">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-lg italic text-gray-600 dark:text-gray-400 my-2">
              {movie.tagline}
            </p>
          )}
          <p className="my-4 text-gray-700 dark:text-gray-300">
            {movie.overview}
          </p>
          {movie.genres && movie.genres.length > 0 && (
            <p className="my-7 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="outline" className="p-2">
                  {genre.name}
                </Badge>
              ))}
            </p>
          )}
          <div className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Rating star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="text-gray-900 dark:text-white">
              {movie.vote_average?.toFixed(1) ?? "N/A"}
            </p>
            <span className="w-1 h-1 bg-gray-500 rounded-full dark:bg-gray-400" />
            <span className="text-gray-900 dark:text-white">
              {movie.vote_count} reviews
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4 text-sm">
            <p>
              <span className="font-bold text-gray-700 dark:text-gray-300">Runtime:</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">{movie.runtime ?? "N/A"} min.</span>
            </p>
            <p>
              <span className="font-bold text-gray-700 dark:text-gray-300">Budget:</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">{formatCurrency(movie.budget)}</span>
            </p>
            <p>
              <span className="font-bold text-gray-700 dark:text-gray-300">Revenue:</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">{formatCurrency(movie.revenue)}</span>
            </p>
            <p>
              <span className="font-bold text-gray-700 dark:text-gray-300">Release Date:</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">{movie.release_date ?? "N/A"}</span>
            </p>
          </div>
          {directors.length > 0 && (
            <p className="my-2">
              <span className="font-bold text-gray-700 dark:text-gray-300">Director(s):</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">
                {directors.map((d) => d.name).join(", ")}
              </span>
            </p>
          )}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <p className="my-2">
              <span className="font-bold text-gray-700 dark:text-gray-300">Production:</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">
                {movie.production_companies.map((c) => c.name).join(", ")}
              </span>
            </p>
          )}
          {movie.spoken_languages && movie.spoken_languages.length > 0 && (
            <p className="my-2">
              <span className="font-bold text-gray-700 dark:text-gray-300">Languages:</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">
                {movie.spoken_languages.map((l) => l.english_name).join(", ")}
              </span>
            </p>
          )}
          <p className="my-4">
            <span className="font-bold text-gray-700 dark:text-gray-300">IMDB:</span>{" "}
            {movie.imdb_id ? (
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {movie.imdb_id}
              </a>
            ) : (
              <span className="text-gray-600 dark:text-gray-400">N/A</span>
            )}
          </p>
        </motion.div>
      </div>

      {videos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            Trailers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.slice(0, 6).map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>
        </motion.div>
      )}

      {topCast.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            Cast
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
            {topCast.map((c, i) => (
              <CastCard key={c.id} cast={c} index={i} />
            ))}
          </div>
        </motion.div>
      )}

      {similarMovies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            More Like This
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {similarMovies.slice(0, 12).map((m, i) => (
              <SimilarMovieCard key={m.id} movie={m} index={i} />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
