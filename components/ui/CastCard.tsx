"use client";

/**
 * CastCard - cast member photo, name, character; links to /person/[id].
 */
import Link from "next/link";
import { motion } from "framer-motion";
import type { CastMember } from "@/types/movie";
import { SafeImage } from "@/components/ui/SafeImage";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w185";

interface CastCardProps {
  cast: CastMember;
  index?: number;
}

export function CastCard({ cast, index = 0 }: CastCardProps) {
  const image = cast.profile_path
    ? `${IMAGE_BASE}/${cast.profile_path}`
    : "/images/backup.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="flex-shrink-0 w-24 sm:w-28"
    >
      <Link href={`/person/${cast.id}`} prefetch={false}>
        <div className="rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-[2/3] hover:ring-2 hover:ring-blue-500 transition-all">
          <SafeImage
            src={image}
            alt={cast.name}
            width={112}
            height={168}
            className="object-cover w-full h-full"
            unoptimized={!cast.profile_path}
          />
        </div>
        <p className="mt-1 text-xs font-medium text-gray-900 dark:text-white truncate">
          {cast.name}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
          {cast.character}
        </p>
      </Link>
    </motion.div>
  );
}
