/**
 * API route for discover movies - used by client filter updates.
 */
import { NextRequest } from "next/server";
import { fetchDiscoverMovies } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genreId = searchParams.get("genre")
    ? Number(searchParams.get("genre"))
    : undefined;
  const year = searchParams.get("year")
    ? Number(searchParams.get("year"))
    : undefined;
  const sort = searchParams.get("sort") ?? "popularity.desc";

  const results = await fetchDiscoverMovies({
    genre_id: genreId,
    primary_release_year: year,
    sort_by: sort,
  });

  return Response.json({ results });
}
