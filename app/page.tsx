/**
 * Home page - SSR fetches trending, now_playing, top_rated for sections.
 */
import {
  fetchMovies,
  fetchTrendingMovies,
} from "@/lib/tmdb";
import {
  HeroSection,
  TrendingSection,
  NowPlayingSection,
  TopRatedPreviewSection,
} from "@/components/sections";

export default async function HomePage() {
  const [trending, nowPlaying, topRated] = await Promise.all([
    fetchTrendingMovies("day"),
    fetchMovies("movie/now_playing"),
    fetchMovies("movie/top_rated"),
  ]);

  const heroMovie = nowPlaying[0] ?? trending[0];

  return (
    <div className="w-full max-w-7xl mx-auto py-7">
      {heroMovie && <HeroSection movie={heroMovie} />}
      <TrendingSection movies={trending} />
      <NowPlayingSection movies={nowPlaying} />
      <TopRatedPreviewSection movies={topRated} />
    </div>
  );
}
