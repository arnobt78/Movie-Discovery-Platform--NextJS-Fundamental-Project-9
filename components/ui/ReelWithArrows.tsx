"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SCROLL_AMOUNT = 320;
const REEL_DURATION = 55;

interface ReelWithArrowsProps {
  children: React.ReactNode;
  className?: string;
  autoScroll?: boolean;
}

export function ReelWithArrows({ children, className, autoScroll = true }: ReelWithArrowsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex-shrink-0 p-2 rounded-full bg-gray-200/90 dark:bg-gray-700/90 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden pb-2 pl-12 pr-12 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {autoScroll ? (
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: REEL_DURATION,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {children}
          </motion.div>
        ) : (
          <div className="flex gap-4 w-max">{children}</div>
        )}
      </div>
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex-shrink-0 p-2 rounded-full bg-gray-200/90 dark:bg-gray-700/90 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
