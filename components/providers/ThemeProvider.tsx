"use client";

/**
 * ThemeProvider - manages dark mode via class on document.documentElement.
 * Persists preference in localStorage. initialDark from layout (cookie) avoids icon flicker on load.
 */
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextValue {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Server-known theme from cookie so first paint and icon match (no flicker). */
  initialDark?: boolean;
}

export function ThemeProvider({ children, initialDark = false }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState(initialDark);
  const [mounted, setMounted] = useState(false);

  // Sync from DOM/localStorage on mount in case script or another tab changed theme.
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("darkMode");
    const value = stored !== null ? JSON.parse(stored) : document.documentElement.classList.contains("dark");
    setDarkMode((prev) => (value === prev ? prev : value));
  }, []);

  // Persist to localStorage and cookie; root layout reads cookie for SSR.
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.cookie = `theme=${darkMode ? "dark" : "light"};path=/;max-age=31536000`;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, mounted]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
