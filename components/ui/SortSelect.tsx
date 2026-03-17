"use client";

/** Discover page: sort dropdown; values match TMDB discover/movie sort_by param. */
import { motion } from "framer-motion";

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "vote_average.desc", label: "Rating" },
  { value: "release_date.desc", label: "Release Date" },
  { value: "title.asc", label: "Title A-Z" },
];

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </motion.div>
  );
}
