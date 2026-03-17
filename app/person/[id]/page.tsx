/**
 * Person detail page - actor/director profile with filmography.
 */
import { notFound } from "next/navigation";
import {
  fetchPersonById,
  fetchPersonMovieCredits,
} from "@/lib/tmdb";
import { PersonDetailPage } from "@/components/pages/PersonDetailPage";

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
