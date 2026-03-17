/**
 * API route: GET /api/genres — returns TMDB genre list for filters/dropdowns.
 */
import { fetchGenres } from "@/lib/tmdb";

export async function GET() {
  const genres = await fetchGenres();
  return Response.json({ genres });
}
