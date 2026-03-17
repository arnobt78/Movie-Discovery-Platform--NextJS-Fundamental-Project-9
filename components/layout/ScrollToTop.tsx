"use client";

/**
 * ScrollToTop - scrolls window to top when pathname changes (e.g. after navigation).
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
