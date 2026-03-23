/**
 * Person detail route: /person/[id]
 * Server component: fetches person details and movie_credits (cast + crew) in parallel.
 */
import { notFound } from "next/navigation";
import {
  fetchPersonById,
  fetchPersonMovieCredits,
} from "@/lib/tmdb";
import { PersonDetailPage } from "@/components/pages/PersonDetailPage";

export const runtime = "nodejs";
export const revalidate = 600;

interface PersonPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PersonPageProps) {
  const { id } = await params;
  const person = await fetchPersonById(id);
  return {
    title: person?.name ?? "Person",
  };
}

export default async function PersonRoute({ params }: PersonPageProps) {
  const { id } = await params;
  const [person, credits] = await Promise.all([
    fetchPersonById(id),
    fetchPersonMovieCredits(id),
  ]);

  if (!person) {
    notFound();
  }

  return (
    <PersonDetailPage
      person={person}
      movieCredits={credits}
    />
  );
}
