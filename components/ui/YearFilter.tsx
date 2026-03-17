"use client";

/** Discover page: year dropdown (last 30 years); value maps to TMDB primary_release_year. */
import { motion } from "framer-motion";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

interface YearFilterProps {
  selected: number | null;
  onSelect: (year: number | null) => void;
}

export function YearFilter({ selected, onSelect }: YearFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <label htmlFor="year-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Year:
      </label>
      <select
        id="year-filter"
        value={selected ?? ""}
        onChange={(e) => onSelect(e.target.value ? Number(e.target.value) : null)}
        className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </motion.div>
  );
}
