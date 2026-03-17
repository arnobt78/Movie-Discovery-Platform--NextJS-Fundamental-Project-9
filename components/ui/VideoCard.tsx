"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Video } from "@/types/movie";

const THUMB_URL = "https://img.youtube.com/vi";

interface VideoCardProps {
  video: Video;
  index?: number;
}

export function VideoCard({ video, index = 0 }: VideoCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        onClick={() => setShowModal(true)}
        className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 group focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Image
          src={`${THUMB_URL}/${video.key}/mqdefault.jpg`}
          alt={video.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60 group-hover:bg-black/80 transition-colors">
            <Play className="w-4 h-4 text-white ml-1" fill="currentColor" />
          </div>
        </div>
        <p className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white bg-gradient-to-t from-black/80 to-transparent truncate">
          {video.name}
        </p>
      </motion.button>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowModal(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && setShowModal(false)}
          aria-label="Close modal"
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
              title={video.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
