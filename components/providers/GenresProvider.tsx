"use client";

/**
 * GenresProvider - fetches and provides genre list for mapping genre_ids to names.
 */
import { createContext, useContext, useEffect, useState } from "react";
import type { Genre } from "@/types/movie";

async function fetchGenres(): Promise<Genre[]> {
  const res = await fetch("/api/genres");
  if (!res.ok) return [];
  const json = await res.json();
  return json.genres ?? [];
}

const GenresContext = createContext<Genre[] | null>(null);

export function GenresProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Genre[] | null>(null);

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  return (
    <GenresContext.Provider value={genres}>
      {children}
    </GenresContext.Provider>
  );
}

export function useGenres() {
  return useContext(GenresContext) ?? [];
}
