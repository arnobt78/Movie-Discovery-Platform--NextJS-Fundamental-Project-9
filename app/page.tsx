/**
 * Home page - Server component that fetches trending, now_playing, and top_rated
 * from TMDB, then enriches lists with runtime and renders section components.
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
  // Fetch three lists in parallel (TMDB list endpoints don't return runtime).
  const [trendingRaw, nowPlayingRaw, topRatedRaw] = await Promise.all([
    fetchTrendingMovies("day"),
    fetchMovies("movie/now_playing"),
    fetchMovies("movie/top_rated"),
  ]);

  // Enrich with runtime by fetching movie details for first N items per list.
  const [trending, nowPlaying, topRated] = await Promise.all([
    enrichMoviesWithRuntime(trendingRaw),
    enrichMoviesWithRuntime(nowPlayingRaw),
    enrichMoviesWithRuntime(topRatedRaw),
  ]);

  // Hero uses first "now playing" movie, or first trending if none.
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
