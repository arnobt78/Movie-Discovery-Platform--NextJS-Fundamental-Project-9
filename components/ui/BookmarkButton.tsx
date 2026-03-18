"use client";

import { useBookmarks } from "@/context/BookmarkContext";
import type { BookmarkItem } from "@/context/BookmarkContext";
import { Bookmark, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface BookmarkButtonProps {
  movie: BookmarkItem;
  className?: string;
}

function ToastContent({
  title,
  subtitle,
  variant,
}: {
  title: string;
  subtitle: string;
  variant: "success" | "remove" | "error";
}) {
  const styles =
    variant === "success"
      ? {
          bg: "bg-green-50 dark:bg-green-950/80",
          border: "border-green-500 dark:border-green-600",
          text: "text-green-800 dark:text-green-200",
          iconColor: "text-green-600 dark:text-green-400",
          Icon: CheckCircle2,
        }
      : variant === "remove"
        ? {
            bg: "bg-sky-50 dark:bg-sky-950/80",
            border: "border-sky-500 dark:border-sky-600",
            text: "text-sky-800 dark:text-sky-200",
            iconColor: "text-sky-600 dark:text-sky-400",
            Icon: XCircle,
          }
        : {
            bg: "bg-red-50 dark:bg-red-950/80",
            border: "border-red-500 dark:border-red-600",
            text: "text-red-800 dark:text-red-200",
            iconColor: "text-red-600 dark:text-red-400",
            Icon: AlertCircle,
          };
  const { bg, border, text, iconColor, Icon } = styles;

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border-2 ${border} ${bg} px-4 py-3 shadow-lg min-w-[280px]`}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${border} ${iconColor}`}
      >
        <Icon className="w-5 h-5" strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className={`font-semibold ${text}`}>{title}</p>
        <p className={`text-sm mt-0.5 ${text} opacity-90`}>{subtitle}</p>
      </div>
    </div>
  );
}

export function BookmarkButton({ movie, className = "" }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(movie.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      toggleBookmark(movie);
      if (saved) {
        toast.custom(
          () => (
            <ToastContent
              title={`Your Favourite ${movie.original_title}`}
              subtitle="removed from bookmarks"
              variant="remove"
            />
          ),
          { position: "bottom-right" }
        );
      } else {
        toast.custom(
          () => (
            <ToastContent
              title={`Your Favourite ${movie.original_title}`}
              subtitle="successfully added to bookmarks"
              variant="success"
            />
          ),
          { position: "bottom-right" }
        );
      }
    } catch {
      toast.custom(
        () => (
          <ToastContent
            title="Something went wrong"
            subtitle="Could not update bookmarks"
            variant="error"
          />
        ),
        { position: "bottom-right" }
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? "Remove from bookmarks" : "Add to bookmarks"}
      className={`absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/80 ${className}`}
    >
      <Bookmark
        className="w-5 h-5"
        fill={saved ? "currentColor" : "none"}
        strokeWidth={2}
      />
    </button>
  );
}
