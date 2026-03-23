/**
 * Home page - Server component that fetches trending, now_playing, and top_rated
 * from TMDB, then enriches lists with runtime and renders section components.
 * Trending reel uses 10 movies; hero uses 5.
 */
import {
  fetchMovies,
  fetchTrendingMoviesPage,
} from "@/lib/tmdb";
import {
  HeroSection,
  TrendingSection,
  NowPlayingSection,
  TopRatedPreviewSection,
} from "@/components/sections";

export const runtime = "nodejs";
export const revalidate = 600;

export default async function HomePage() {
  const [trendingPage1, nowPlayingRaw, topRatedRaw] = await Promise.all([
    fetchTrendingMoviesPage("day", 1),
    fetchMovies("movie/now_playing"),
    fetchMovies("movie/top_rated"),
  ]);
  const trendingRaw = (trendingPage1.results ?? []).slice(0, 10);

  const trending = trendingRaw;
  const nowPlaying = nowPlayingRaw;
  const topRated = topRatedRaw;

  const seen = new Set<number>();
  const heroMovies = [...nowPlaying, ...trending]
    .filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    })
    .slice(0, 5);

  const topRatedList = topRated.slice(0, 4);
  const trendingList = trending.slice(0, 10);
  const nowPlayingList = nowPlaying.slice(0, 4);

  return (
    <div className="w-full max-w-9xl mx-auto py-7">
      {heroMovies.length > 0 && <HeroSection movies={heroMovies} />}
      <TrendingSection movies={trendingList} />
      <NowPlayingSection movies={nowPlayingList} />
      <TopRatedPreviewSection movies={topRatedList} />
    </div>
  );
}
