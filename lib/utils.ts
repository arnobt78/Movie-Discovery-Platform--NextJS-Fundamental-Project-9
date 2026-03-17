import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes safely: clsx for conditionals, twMerge to resolve conflicts (e.g. p-2 vs p-4). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
