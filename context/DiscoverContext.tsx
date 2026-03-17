"use client";

/**
 * DiscoverContext - holds genre, year, sort for discover page.
 * Syncs with URL searchParams via useDiscoverParams.
 */
import { createContext, useContext } from "react";

export interface DiscoverState {
  genreId: number | null;
  year: number | null;
  sort: string;
}

const defaultState: DiscoverState = {
  genreId: null,
  year: null,
  sort: "popularity.desc",
};

const DiscoverContext = createContext<DiscoverState>(defaultState);

export function useDiscoverState() {
  return useContext(DiscoverContext);
}
