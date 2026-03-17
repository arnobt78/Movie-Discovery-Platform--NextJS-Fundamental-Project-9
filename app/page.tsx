/**
 * Home page - SSR fetches trending, now_playing, top_rated for sections.
 */
import {
  fetchMovies,
  fetchTrendingMovies,
  enrichMoviesWithRuntime,
} from "@/lib/tmdb";
import {
  HeroSection,
  TrendingSection,
  NowPlayingSection,
  TopRatedPreviewSection,
} from "@/components/sections";

export default async function HomePage() {
  const [trendingRaw, nowPlayingRaw, topRatedRaw] = await Promise.all([
    fetchTrendingMovies("day"),
    fetchMovies("movie/now_playing"),
    fetchMovies("movie/top_rated"),
  ]);

  const [trending, nowPlaying, topRated] = await Promise.all([
    enrichMoviesWithRuntime(trendingRaw),
    enrichMoviesWithRuntime(nowPlayingRaw),
    enrichMoviesWithRuntime(topRatedRaw),
  ]);

  const heroMovie = nowPlaying[0] ?? trending[0];

  return (
    <div className="w-full max-w-9xl mx-auto py-7">
      {heroMovie && <HeroSection movie={heroMovie} />}
      <TrendingSection movies={trending} />
      <NowPlayingSection movies={nowPlaying} />
      <TopRatedPreviewSection movies={topRated} />
    </div>
  );
}
