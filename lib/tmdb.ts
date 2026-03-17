/**
 * TMDB API client - fetches movie data.
 * Uses env: TMDB_API_KEY (server) or NEXT_PUBLIC_TMDB_API_KEY (client).
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
} from "@/types/movie";

const API_BASE = "https://api.themoviedb.org/3";

function getApiKey(): string {
  const key = process.env.TMDB_API_KEY ?? process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";
  return key;
}

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
