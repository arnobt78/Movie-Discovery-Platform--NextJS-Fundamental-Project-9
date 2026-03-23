"use client";

/**
 * MovieDetailPage - client component for single movie detail.
 * Receives all data from SSR parent (app/movie/[id]/page). Renders poster, meta,
 * cast (links to /person/[id]), trailers, similar, recommendations, watch providers,
 * reviews, and collection section when applicable.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import type {
  MovieDetail,
  MovieCredits,
  Video,
  Movie,
  WatchProvidersResponse,
  WatchProvidersByCountry,
  Review,
  Collection,
} from "@/types/movie";
import { Badge } from "@/components/ui/Badge";
import { CastCard } from "@/components/ui/CastCard";
import { VideoCard } from "@/components/ui/VideoCard";
import { SimilarMovieCard } from "@/components/ui/SimilarMovieCard";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { ReelWithArrows } from "@/components/ui/ReelWithArrows";
import { useTitle } from "@/hooks/useTitle";
import { SafeImage } from "@/components/ui/SafeImage";

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

const IMAGE_BASE_PROVIDER = "https://image.tmdb.org/t/p/original";

/** Renders stream/rent/buy providers for a region (e.g. US); includes JustWatch attribution. */
function WatchProvidersSection({
  providers,
}: {
  providers: WatchProvidersByCountry;
}) {
  const hasAny =
    (providers.flatrate?.length ?? 0) > 0 ||
    (providers.rent?.length ?? 0) > 0 ||
    (providers.buy?.length ?? 0) > 0;
  if (!hasAny) return null;

  const ProviderList = ({
    items,
    label,
  }: {
    items: { logo_path: string | null; provider_name: string; provider_id?: number }[];
    label: string;
  }) =>
    items.length > 0 ? (
      <div className="mb-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {label}:{" "}
        </span>
        <span className="flex flex-wrap gap-2 mt-1">
          {items.map((p) => (
            <span
              key={p.provider_id ?? p.provider_name}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
            >
              {p.logo_path ? (
                <SafeImage
                  src={`${IMAGE_BASE_PROVIDER}${p.logo_path}`}
                  alt={p.provider_name}
                  width={24}
                  height={24}
                  className="rounded object-contain"
                />
              ) : null}
              {p.provider_name}
            </span>
          ))}
        </span>
      </div>
    ) : null;

  return (
    <div className="my-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <p className="font-bold text-gray-700 dark:text-gray-300 mb-2">
        Where to Watch
      </p>
      <ProviderList
        items={providers.flatrate ?? []}
        label="Stream"
      />
      <ProviderList items={providers.rent ?? []} label="Rent" />
      <ProviderList items={providers.buy ?? []} label="Buy" />
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Data from{" "}
        <a
          href="https://www.justwatch.com"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          JustWatch
        </a>
      </p>
    </div>
  );
}

interface MovieDetailPageProps {
  movie: MovieDetail;
  credits: MovieCredits | null;
  videos: Video[];
  similarMovies: Movie[];
  recommendations: Movie[];
  watchProviders: WatchProvidersResponse | null;
  reviews: Review[];
  collection: Collection | null;
}

export function MovieDetailPage({
  movie,
  credits,
  videos,
  similarMovies,
  recommendations,
  watchProviders,
  reviews,
  collection,
}: MovieDetailPageProps) {
  useTitle(movie.title);
  const image = movie.poster_path
    ? `${IMAGE_BASE}/${movie.poster_path}`
    : FALLBACK_IMAGE;

  const directors =
    credits?.crew.filter((c) => c.job === "Director") ?? [];
  const topCast = credits?.cast.slice(0, 10) ?? [];

  return (
    <section className="w-full py-5">
      <div className="flex justify-around flex-wrap gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-sm flex-shrink-0 relative"
        >
          <BookmarkButton
            movie={{
              id: movie.id,
              original_title: movie.original_title ?? movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              overview: movie.overview,
              backdrop_path: movie.backdrop_path,
              vote_average: movie.vote_average,
              genre_ids: movie.genre_ids ?? movie.genres?.map((g) => g.id),
              runtime: movie.runtime,
            }}
          />
          <SafeImage
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
            <div className="my-7 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="outline" className="p-2">
                  {genre.name}
                </Badge>
              ))}
            </div>
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
                {directors.map((d, i) => (
                  <span key={d.id}>
                    {i > 0 && ", "}
                    <Link
                      href={`/person/${d.id}`}
                      prefetch={false}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {d.name}
                    </Link>
                  </span>
                ))}
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
          {watchProviders?.results?.US && (
            <WatchProvidersSection providers={watchProviders.results.US} />
          )}
          {movie.belongs_to_collection && (
            <p className="my-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Collection:
              </span>{" "}
              <Link
                href={`/collection/${movie.belongs_to_collection.id}`}
                prefetch={false}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {movie.belongs_to_collection.name}
              </Link>
            </p>
          )}
        </motion.div>
      </div>

      {collection && collection.parts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.18 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            {collection.name} Collection
          </h2>
          <ReelWithArrows>
            {[...collection.parts, ...collection.parts].map((part, i) => (
              <SimilarMovieCard
                key={`${part.id}-${i}`}
                movie={{
                  id: part.id,
                  original_title: part.title ?? part.original_title ?? "",
                  overview: part.overview ?? "",
                  poster_path: part.poster_path,
                  backdrop_path: part.backdrop_path,
                  vote_average: part.vote_average,
                  release_date: part.release_date,
                }}
                index={i % collection.parts.length}
              />
            ))}
          </ReelWithArrows>
        </motion.div>
      )}

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
          <ReelWithArrows>
            {[...topCast, ...topCast].map((c, i) => (
              <CastCard key={`cast-${c.id}-${i}`} cast={c} index={i % topCast.length} />
            ))}
          </ReelWithArrows>
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
          <ReelWithArrows>
            {(() => {
              const list = similarMovies.slice(0, 10);
              return [...list, ...list].map((m, i) => (
                <SimilarMovieCard key={`similar-${m.id}-${i}`} movie={m} index={i % list.length} />
              ));
            })()}
          </ReelWithArrows>
        </motion.div>
      )}

      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            Recommendations
          </h2>
          <ReelWithArrows>
            {(() => {
              const list = recommendations.slice(0, 10);
              return [...list, ...list].map((m, i) => (
                <SimilarMovieCard key={`rec-${m.id}-${i}`} movie={m} index={i % list.length} />
              ));
            })()}
          </ReelWithArrows>
        </motion.div>
      )}

      {reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            Reviews
          </h2>
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div
                key={review.id}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {review.author}
                  </span>
                  {review.author_details?.rating != null && (
                    <span className="text-sm text-yellow-600 dark:text-yellow-400">
                      ★ {review.author_details.rating}/10
                    </span>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
