"use client";

/**
 * Pagination - URL-based page navigation for list pages (trending, popular, etc.).
 * Preserves existing searchParams when building page links (e.g. discover filters).
 */
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_VISIBLE = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  /** Existing query string to preserve (e.g. "genre=28&sort=popularity.desc"). No leading "?". */
  preserveQuery?: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  preserveQuery,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const query = preserveQuery ? (preserveQuery.startsWith("?") ? preserveQuery.slice(1) : preserveQuery) : "";

  const getHref = (page: number) => {
    const params = query ? new URLSearchParams(query) : new URLSearchParams();
    params.set("page", String(page));
    const q = params.toString();
    return `${basePath}?${q}`;
  };

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE / 2));
  const end = Math.min(totalPages, start + MAX_VISIBLE - 1);
  if (end - start + 1 < MAX_VISIBLE) start = Math.max(1, end - MAX_VISIBLE + 1);
  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);

  const linkClass =
    "min-w-[2.25rem] h-9 px-2 inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700";
  const activeClass = "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700";

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center justify-center gap-2 py-6", className)}
    >
      <Link
        href={getHref(prevPage)}
        className={cn(linkClass, currentPage <= 1 && "pointer-events-none opacity-50")}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="sr-only">Previous</span>
      </Link>
      <div className="flex items-center gap-1">
        {start > 1 && (
          <>
            <Link href={getHref(1)} className={linkClass}>
              1
            </Link>
            {start > 2 && <span className="px-2 text-gray-500 dark:text-gray-400">…</span>}
          </>
        )}
        {pages.map((p) => (
          <Link
            key={p}
            href={getHref(p)}
            className={cn(linkClass, p === currentPage && activeClass)}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Link>
        ))}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-2 text-gray-500 dark:text-gray-400">…</span>}
            <Link href={getHref(totalPages)} className={linkClass}>
              {totalPages}
            </Link>
          </>
        )}
      </div>
      <Link
        href={getHref(nextPage)}
        className={cn(linkClass, currentPage >= totalPages && "pointer-events-none opacity-50")}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className="w-4 h-4" />
        <span className="sr-only">Next</span>
      </Link>
    </nav>
  );
}
