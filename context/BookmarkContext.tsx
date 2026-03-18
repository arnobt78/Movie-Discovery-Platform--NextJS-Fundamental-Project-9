"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

const STORAGE_KEY = "cinemate-bookmarks";

export interface BookmarkItem {
  id: number;
  original_title: string;
  poster_path: string | null;
  release_date?: string;
  overview?: string;
  backdrop_path?: string | null;
  vote_average?: number;
  genre_ids?: number[];
  runtime?: number;
}

interface BookmarkContextValue {
  bookmarks: BookmarkItem[];
  count: number;
  isBookmarked: (id: number) => boolean;
  toggleBookmark: (movie: BookmarkItem) => void;
}

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

function loadFromStorage(): BookmarkItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BookmarkItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: BookmarkItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBookmarks(loadFromStorage());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveToStorage(bookmarks);
  }, [bookmarks, mounted]);

  const isBookmarked = useCallback(
    (id: number) => bookmarks.some((b) => b.id === id),
    [bookmarks]
  );

  const toggleBookmark = useCallback((movie: BookmarkItem) => {
    const item: BookmarkItem = {
      id: movie.id,
      original_title: movie.original_title,
      poster_path: movie.poster_path ?? null,
      release_date: movie.release_date,
      overview: movie.overview,
      backdrop_path: movie.backdrop_path,
      vote_average: movie.vote_average,
      genre_ids: movie.genre_ids,
      runtime: movie.runtime,
    };
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      if (exists) return prev.filter((b) => b.id !== item.id);
      return [...prev, item];
    });
  }, []);

  const value: BookmarkContextValue = {
    bookmarks,
    count: bookmarks.length,
    isBookmarked,
    toggleBookmark,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks(): BookmarkContextValue {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
}
