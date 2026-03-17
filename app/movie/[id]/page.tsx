/**
 * Movie detail page - SSR fetches movie, credits, videos, similar.
 */
import { notFound } from "next/navigation";
import {
  fetchMovieById,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchSimilarMovies,
  fetchRecommendations,
  fetchWatchProviders,
  fetchReviews,
  fetchCollectionById,
} from "@/lib/tmdb";
import { MovieDetailPage } from "@/components/pages/MovieDetailPage";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await fetchMovieById(id);
  return {
    title: movie?.title ?? "Movie",
  };
}

export default async function MovieRoute({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await fetchMovieById(id);

  if (!movie) {
    notFound();
  }

  const [
    credits,
    videos,
    similar,
    recommendations,
    watchProviders,
    reviews,
    collection,
  ] = await Promise.all([
    fetchMovieCredits(id),
    fetchMovieVideos(id),
    fetchSimilarMovies(id),
    fetchRecommendations(id),
    fetchWatchProviders(id),
    fetchReviews(id),
    movie.belongs_to_collection
      ? fetchCollectionById(String(movie.belongs_to_collection.id))
      : Promise.resolve(null),
  ]);

  return (
    <MovieDetailPage
      movie={movie}
      credits={credits}
      videos={videos}
      similarMovies={similar}
      recommendations={recommendations ?? []}
      watchProviders={watchProviders}
      reviews={reviews?.results ?? []}
      collection={collection}
    />
  );
}
