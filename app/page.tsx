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

  const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const topRatedShuffled = shuffle(topRated).slice(0, 4);
  const trendingShuffled = shuffle(trending).slice(0, 10);
  const nowPlayingShuffled = shuffle(nowPlaying).slice(0, 4);

  return (
    <div className="w-full max-w-9xl mx-auto py-7">
      {heroMovies.length > 0 && <HeroSection movies={heroMovies} />}
      <TrendingSection movies={trendingShuffled} />
      <NowPlayingSection movies={nowPlayingShuffled} />
      <TopRatedPreviewSection movies={topRatedShuffled} />
    </div>
  );
}
