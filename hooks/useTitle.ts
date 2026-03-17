"use client";

/**
 * useTitle - sets document.title. Use in client components for dynamic titles.
 */
import { useEffect } from "react";

const SITE_TITLE =
  process.env.NEXT_PUBLIC_SITE_TITLE ?? "Cinemate";

export function useTitle(title: string | undefined) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${SITE_TITLE}`;
    }
  }, [title]);
}
