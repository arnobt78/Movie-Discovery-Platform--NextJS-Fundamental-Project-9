/**
 * TMDB API client - all data fetching for movies, persons, collections.
 * Uses env: TMDB_API_KEY (server) or NEXT_PUBLIC_TMDB_API_KEY (client).
 * Base: https://api.themoviedb.org/3
 */

import type {
  Movie,
  MovieDetail,
  TmdbListResponse,
  MovieCredits,
  MovieVideosResponse,
  Video,
  Genre,
  GenreListResponse,
  TmdbDiscoverParams,
  WatchProvidersResponse,
  ReviewsResponse,
  Person,
  PersonMovieCreditsResponse,
  Collection,
} from "@/types/movie";

const API_BASE = "https://api.themoviedb.org/3";

// Prefer server key; fallback to public for client-side usage.
function getApiKey(): string {
  const key = process.env.TMDB_API_KEY ?? process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";
  return key;
}

/** Generic list fetcher: e.g. fetchMovies("movie/popular") or fetchMovies("search/movie", "query"). */
export async function fetchMovies(
  apiPath: string,
  query?: string
): Promise<Movie[]> {
  const key = getApiKey();
  if (!key) return [];
  const params = new URLSearchParams({ api_key: key });
  if (query) params.set("query", query);
  const url = `${API_BASE}/${apiPath}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json: TmdbListResponse = await res.json();
  return json.results ?? [];
}

export async function fetchMovieById(id: string): Promise<MovieDetail | null> {
  const key = getApiKey();
  if (!key) return null;
  const url = `${API_BASE}/movie/${id}?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json: MovieDetail = await res.json();
  return json;
}

export async function fetchMovieCredits(id: string): Promise<MovieCredits | null> {
  const key = getApiKey();
  if (!key) return null;
  const url = `${API_BASE}/movie/${id}/credits?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

/** Returns only YouTube Trailers and Teasers for embedding. */
export async function fetchMovieVideos(id: string): Promise<Video[]> {
  const key = getApiKey();
  if (!key) return [];
  const url = `${API_BASE}/movie/${id}/videos?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json: MovieVideosResponse = await res.json();
  const trailers = (json.results ?? []).filter(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );
  return trailers;
}

export async function fetchSimilarMovies(id: string): Promise<Movie[]> {
  const key = getApiKey();
  if (!key) return [];
  const url = `${API_BASE}/movie/${id}/similar?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json: TmdbListResponse = await res.json();
  return json.results ?? [];
}

export async function fetchRecommendations(id: string): Promise<Movie[]> {
  const key = getApiKey();
  if (!key) return [];
  const url = `${API_BASE}/movie/${id}/recommendations?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json: TmdbListResponse = await res.json();
  return json.results ?? [];
}

export async function fetchWatchProviders(id: string): Promise<WatchProvidersResponse | null> {
  const key = getApiKey();
  if (!key) return null;
  const url = `${API_BASE}/movie/${id}/watch/providers?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchReviews(id: string): Promise<ReviewsResponse | null> {
  const key = getApiKey();
  if (!key) return null;
  const url = `${API_BASE}/movie/${id}/reviews?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchPersonById(id: string): Promise<Person | null> {
  const key = getApiKey();
  if (!key) return null;
  const url = `${API_BASE}/person/${id}?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchPersonMovieCredits(
  id: string
): Promise<PersonMovieCreditsResponse | null> {
  const key = getApiKey();
  if (!key) return null;
  const url = `${API_BASE}/person/${id}/movie_credits?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchCollectionById(id: string): Promise<Collection | null> {
  const key = getApiKey();
  if (!key) return null;
  const url = `${API_BASE}/collection/${id}?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchTrendingMovies(
  timeWindow: "day" | "week"
): Promise<Movie[]> {
  const key = getApiKey();
  if (!key) return [];
  const url = `${API_BASE}/trending/movie/${timeWindow}?api_key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json: TmdbListResponse = await res.json();
  return json.results ?? [];
}

export async function fetchDiscoverMovies(
  params: TmdbDiscoverParams
): Promise<Movie[]> {
  const key = getApiKey();
  if (!key) return [];
  const searchParams = new URLSearchParams({ api_key: key });
  if (params.genre_id != null) searchParams.set("with_genres", String(params.genre_id));
  if (params.primary_release_year != null)
    searchParams.set("primary_release_year", String(params.primary_release_year));
  if (params.sort_by) searchParams.set("sort_by", params.sort_by);
  if (params.page != null) searchParams.set("page", String(params.page));
  const url = `${API_BASE}/discover/movie?${searchParams.toString()}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json: TmdbListResponse = await res.json();
  return json.results ?? [];
}

export async function fetchGenres(): Promise<Genre[]> {
  const key = getApiKey();
  if (!key) return [];
  const url = `${API_BASE}/genre/movie/list?api_key=${key}&language=en`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json: GenreListResponse = await res.json();
  return json.genres ?? [];
}

/**
 * Enriches movie list with runtime from detail API (list endpoints don't return runtime).
 * Fetches details in parallel for up to 20 movies.
 */
export async function enrichMoviesWithRuntime(movies: Movie[]): Promise<Movie[]> {
  if (movies.length === 0) return [];
  const limit = Math.min(movies.length, 20);
  const toEnrich = movies.slice(0, limit);
  const details = await Promise.all(
    toEnrich.map((m) => fetchMovieById(String(m.id)))
  );
  return movies.map((m, i) => {
    if (i < limit && details[i]?.runtime != null) {
      return { ...m, runtime: details[i]!.runtime };
    }
    return m;
  });
}
