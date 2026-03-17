/**
 * Collection detail page - movie series (e.g., Harry Potter, Marvel).
 */
import { notFound } from "next/navigation";
import { fetchCollectionById } from "@/lib/tmdb";
import { CollectionDetailPage } from "@/components/pages/CollectionDetailPage";

interface CollectionPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { id } = await params;
  const collection = await fetchCollectionById(id);
  return {
    title: collection?.name ?? "Collection",
  };
}

export default async function CollectionRoute({ params }: CollectionPageProps) {
  const { id } = await params;
  const collection = await fetchCollectionById(id);

  if (!collection) {
    notFound();
  }

  return <CollectionDetailPage collection={collection} />;
}
