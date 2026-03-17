/**
 * Movie detail page - SSR fetches movie, credits, videos, similar.
 */
import { notFound } from "next/navigation";
import {
  fetchMovieById,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchSimilarMovies,
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
  const [movie, credits, videos, similar] = await Promise.all([
    fetchMovieById(id),
    fetchMovieCredits(id),
    fetchMovieVideos(id),
    fetchSimilarMovies(id),
  ]);

  if (!movie) {
    notFound();
  }

  return (
    <MovieDetailPage
      movie={movie}
      credits={credits}
      videos={videos}
      similarMovies={similar}
    />
  );
}
