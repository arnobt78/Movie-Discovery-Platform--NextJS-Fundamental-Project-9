"use client";

/**
 * useDiscoverParams - reads genre, year, sort from URL searchParams.
 * Keeps discover page in sync with URL for shareable/bookmarkable filter state.
 */
import { useSearchParams } from "next/navigation";

export function useDiscoverParams() {
  const searchParams = useSearchParams();
  const genreId = searchParams.get("genre")
    ? Number(searchParams.get("genre"))
    : null;
  const year = searchParams.get("year")
    ? Number(searchParams.get("year"))
    : null;
  const sort = searchParams.get("sort") ?? "popularity.desc";
  return { genreId, year, sort };
}
