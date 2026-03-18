"use client";

import { useSearchParams } from "next/navigation";

/**
 * Returns current page from URL searchParams (default 1).
 * Use with Pagination component; server passes totalPages and basePath.
 */
export function usePagination(): number {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const n = page ? parseInt(page, 10) : 1;
  return Number.isNaN(n) || n < 1 ? 1 : n;
}
