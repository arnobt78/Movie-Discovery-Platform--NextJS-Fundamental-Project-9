/**
 * Root loading - home page replica (Hero + sections).
 * Movie list routes use app/movies/loading.tsx.
 */
import { HomePageSkeleton } from "@/components/ui/HomePageSkeleton";

export default function Loading() {
  return <HomePageSkeleton />;
}
