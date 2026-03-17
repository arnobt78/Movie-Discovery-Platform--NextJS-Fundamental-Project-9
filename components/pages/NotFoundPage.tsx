"use client";

/**
 * NotFoundPage - 404 page client component.
 */
import Image from "next/image";
import { motion } from "framer-motion";
import { RippleLink } from "@/components/ui/RippleLink";
import { useTitle } from "@/hooks/useTitle";

export function NotFoundPage() {
  useTitle("Page Not Found");
  return (
    <main>
      <section className="flex flex-col justify-center px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center my-4"
        >
          <p className="text-7xl text-gray-700 font-bold my-10 dark:text-white">
            404, Oops!
          </p>
          <div className="max-w-lg">
            <Image
              src="/images/pagenotfound.png"
              alt="404 Page Not Found"
              width={512}
              height={384}
              className="rounded"
            />
          </div>
        </motion.div>
        <div className="flex justify-center my-4">
          <RippleLink
            href="/"
            className="w-64 text-xl text-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg px-5 py-2.5 mr-2 mb-2 font-medium block"
          >
            Back To Cinemate
          </RippleLink>
        </div>
      </section>
    </main>
  );
}
