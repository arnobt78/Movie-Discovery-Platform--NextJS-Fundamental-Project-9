"use client";

/**
 * PersonDetailPage - actor/director profile: photo, bio, acting/director/other credits.
 * Each credit links to /movie/[id]. Data from app/person/[id] route.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import type {
  Person,
  PersonMovieCreditsResponse,
  PersonMovieCredit,
} from "@/types/movie";
import { useTitle } from "@/hooks/useTitle";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { ReelWithArrows } from "@/components/ui/ReelWithArrows";
import { SafeImage } from "@/components/ui/SafeImage";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMAGE = "/images/backup.png";

interface PersonDetailPageProps {
  person: Person;
  movieCredits: PersonMovieCreditsResponse | null;
}

export function PersonDetailPage({
  person,
  movieCredits,
}: PersonDetailPageProps) {
  useTitle(person.name);

  const profileImage = person.profile_path
    ? `${IMAGE_BASE}/${person.profile_path}`
    : FALLBACK_IMAGE;

  const cast = movieCredits?.cast ?? [];
  const crew = movieCredits?.crew ?? [];
  const directors = crew.filter((c) => c.job === "Director");
  const otherCrew = crew.filter((c) => c.job !== "Director");

  return (
    <section className="w-full py-5">
      <div className="flex justify-around flex-wrap gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-sm flex-shrink-0"
        >
          <SafeImage
            src={profileImage}
            alt={person.name}
            width={384}
            height={576}
            className="rounded-lg shadow-lg object-cover aspect-[2/3]"
            unoptimized={!person.profile_path}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="max-w-2xl flex-1 min-w-0"
        >
          <h1 className="text-4xl font-bold font-display my-3 text-center lg:text-left text-gray-900 dark:text-white">
            {person.name}
          </h1>
          {person.known_for_department && (
            <p className="text-lg text-gray-600 dark:text-gray-400 my-2">
              {person.known_for_department}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4 text-sm">
            {person.birthday && (
              <p>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Born:
                </span>{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  {person.birthday}
                  {person.place_of_birth && ` in ${person.place_of_birth}`}
                </span>
              </p>
            )}
            {person.deathday && (
              <p>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Died:
                </span>{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  {person.deathday}
                </span>
              </p>
            )}
          </div>
          {person.biography && (
            <div className="my-4">
              <h2 className="text-xl font-bold font-display mb-2 text-gray-900 dark:text-white">
                Biography
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {person.biography}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {cast.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            Acting
          </h2>
          <ReelWithArrows>
            {[...cast.slice(0, 10), ...cast.slice(0, 10)].map((credit, i) => (
              <PersonMovieCard
                key={`acting-${credit.credit_id ?? credit.id}-${i}`}
                credit={credit}
                index={i % Math.min(cast.length, 10)}
              />
            ))}
          </ReelWithArrows>
        </motion.div>
      )}

      {directors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            Director
          </h2>
          <ReelWithArrows>
            {[...directors.slice(0, 10), ...directors.slice(0, 10)].map((credit, i) => (
              <PersonMovieCard
                key={`dir-${credit.credit_id ?? credit.id}-${i}`}
                credit={credit}
                index={i % Math.min(directors.length, 10)}
              />
            ))}
          </ReelWithArrows>
        </motion.div>
      )}

      {otherCrew.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            Other Credits
          </h2>
          <ReelWithArrows>
            {[...otherCrew.slice(0, 10), ...otherCrew.slice(0, 10)].map((credit, i) => (
              <PersonMovieCard
                key={`crew-${credit.credit_id ?? credit.id}-${credit.job}-${i}`}
                credit={credit}
                index={i % Math.min(otherCrew.length, 10)}
              />
            ))}
          </ReelWithArrows>
        </motion.div>
      )}
    </section>
  );
}

/** Single movie in person's filmography; links to /movie/[id], shows character or job. */
function PersonMovieCard({
  credit,
  index = 0,
}: {
  credit: PersonMovieCredit;
  index?: number;
}) {
  const image = credit.poster_path
    ? `https://image.tmdb.org/t/p/w185/${credit.poster_path}`
    : "/images/backup.png";
  const title = credit.title ?? credit.original_title ?? "Unknown";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex-shrink-0 w-32 sm:w-36"
    >
      <Link href={`/movie/${credit.id}`} prefetch={false} className="relative block">
        <div className="rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-[2/3] hover:ring-2 hover:ring-blue-500 transition-all relative">
          <BookmarkButton
            movie={{
              id: credit.id,
              original_title: credit.original_title ?? credit.title ?? "Unknown",
              poster_path: credit.poster_path,
              release_date: credit.release_date,
              overview: credit.overview,
              backdrop_path: credit.backdrop_path,
              vote_average: credit.vote_average,
            }}
          />
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <SafeImage
              src={image}
              alt={title}
              width={144}
              height={216}
              className="object-cover w-full h-full"
              unoptimized={!credit.poster_path}
            />
          </motion.div>
        </div>
        <p className="mt-1 text-xs font-medium text-gray-900 dark:text-white truncate">
          {title}
        </p>
        {(credit.character ?? credit.job) && (
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
            {credit.character ?? credit.job}
          </p>
        )}
      </Link>
    </motion.div>
  );
}
