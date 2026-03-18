/**
 * Movie detail route: /movie/[id]
 * Server component: fetches movie + credits, videos, similar, recommendations,
 * watch providers, reviews, and collection (if belongs_to_collection) in parallel.
 */
import { notFound } from "next/navigation";
import {
  fetchMovieById,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchSimilarMoviesPage,
  fetchRecommendationsPage,
  fetchWatchProviders,
  fetchReviews,
  fetchCollectionById,
} from "@/lib/tmdb";
import { MovieDetailPage } from "@/components/pages/MovieDetailPage";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

// Next.js uses this for <title> and SEO; params are a Promise in Next 15+.
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

  // Fetch all related data in parallel; similar and recommendations use 2 pages for 30 items each.
  const [
    credits,
    videos,
    similarPage1,
    similarPage2,
    recPage1,
    recPage2,
    watchProviders,
    reviews,
    collection,
  ] = await Promise.all([
    fetchMovieCredits(id),
    fetchMovieVideos(id),
    fetchSimilarMoviesPage(id, 1),
    fetchSimilarMoviesPage(id, 2),
    fetchRecommendationsPage(id, 1),
    fetchRecommendationsPage(id, 2),
    fetchWatchProviders(id),
    fetchReviews(id),
    movie.belongs_to_collection
      ? fetchCollectionById(String(movie.belongs_to_collection.id))
      : Promise.resolve(null),
  ]);

  const similar = [...(similarPage1.results ?? []), ...(similarPage2.results ?? [])].slice(0, 30);
  const recommendations = [...(recPage1.results ?? []), ...(recPage2.results ?? [])].slice(0, 30);

  return (
    <MovieDetailPage
      movie={movie}
      credits={credits}
      videos={videos}
      similarMovies={similar}
      recommendations={recommendations}
      watchProviders={watchProviders}
      reviews={reviews?.results ?? []}
      collection={collection}
    />
  );
}
