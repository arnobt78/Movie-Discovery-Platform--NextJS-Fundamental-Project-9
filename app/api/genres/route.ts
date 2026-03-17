/**
 * API route for movie genres list.
 */
import { fetchGenres } from "@/lib/tmdb";

export async function GET() {
  const genres = await fetchGenres();
  return Response.json({ genres });
}
