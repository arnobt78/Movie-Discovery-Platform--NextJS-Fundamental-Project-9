"use client";

/**
 * useFetch - client-side fetch for TMDB list API.
 * Used when data must be fetched on client (e.g. search with dynamic query).
 */
import { useState, useEffect } from "react";
import type { Movie } from "@/types/movie";

const API_BASE = "https://api.themoviedb.org/3";

export function useFetch(
  apiPath: string,
  queryTerm = ""
): { data: Movie[]; isLoading: boolean } {
  const [data, setData] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const key =
    process.env.NEXT_PUBLIC_TMDB_API_KEY ?? process.env.TMDB_API_KEY ?? "";
  const params = new URLSearchParams({ api_key: key });
  if (queryTerm) params.set("query", queryTerm);
  const url = `${API_BASE}/${apiPath}?${params.toString()}`;

  // Abort on unmount so setState isn't called after unmount.
  useEffect(() => {
    if (!key) {
      setData([]);
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json: { results?: Movie[] }) => {
        if (!cancelled) {
          setData(json.results ?? []);
        }
      })
      .catch(() => {
        if (!cancelled) setData([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [url, key]);

  return { data, isLoading };
}
