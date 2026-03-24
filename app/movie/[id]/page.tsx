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
  fetchCollectionById,
} from "@/lib/tmdb";
import { MovieDetailPage } from "@/components/pages/MovieDetailPage";

export const runtime = "nodejs";
export const revalidate = 600;

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
    recPage1,
    collection,
  ] = await Promise.all([
    fetchMovieCredits(id),
    fetchMovieVideos(id),
    fetchSimilarMoviesPage(id, 1),
    fetchRecommendationsPage(id, 1),
    movie.belongs_to_collection
      ? fetchCollectionById(String(movie.belongs_to_collection.id))
      : Promise.resolve(null),
  ]);

  const similar = (similarPage1.results ?? []).slice(0, 20);
  const recommendations = (recPage1.results ?? []).slice(0, 20);

  return (
    <MovieDetailPage
      movie={movie}
      credits={credits}
      videos={videos}
      similarMovies={similar}
      recommendations={recommendations}
      watchProviders={null}
      reviews={[]}
      collection={collection}
    />
  );
}
