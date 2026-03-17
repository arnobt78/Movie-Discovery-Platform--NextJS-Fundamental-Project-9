"use client";

import { motion } from "framer-motion";
import type { Genre } from "@/types/movie";

interface GenreFilterProps {
  genres: Genre[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export function GenreFilter({ genres, selectedId, onSelect }: GenreFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <motion.button
        type="button"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedId === null
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        All
      </motion.button>
      {genres.map((genre, i) => (
        <motion.button
          key={genre.id}
          type="button"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.02 }}
          onClick={() => onSelect(genre.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedId === genre.id
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {genre.name}
        </motion.button>
      ))}
    </div>
  );
}
