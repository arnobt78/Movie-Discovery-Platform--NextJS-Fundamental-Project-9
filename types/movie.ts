/**
 * TMDB API response types for movie discovery app.
 * Shapes match TMDB v3 responses; used by lib/tmdb and components.
 */

/** List item from /movie/popular, /discover/movie, etc. */
export interface Movie {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  genre_ids?: number[];
  runtime?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetail extends Movie {
  title: string;
  genres?: Genre[];
  runtime?: number;
  budget?: number;
  revenue?: number;
  release_date?: string;
  imdb_id?: string | null;
  tagline?: string | null;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  spoken_languages?: SpokenLanguage[];
  belongs_to_collection?: BelongsToCollection | null;
}

export interface TmdbListResponse {
  results: Movie[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order?: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  name: string;
  official?: boolean;
}

export interface MovieVideosResponse {
  id: number;
  results: Video[];
}

export interface TmdbDiscoverParams {
  genre_id?: number;
  primary_release_year?: number;
  sort_by?: string;
  page?: number;
}

export interface GenreListResponse {
  genres: Genre[];
}

export interface WatchProvider {
  logo_path: string | null;
  provider_id: number;
  provider_name: string;
  display_priority?: number;
}

export interface WatchProvidersByCountry {
  link?: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
}

export interface WatchProvidersResponse {
  id: number;
  results: Record<string, WatchProvidersByCountry>;
}

export interface Review {
  id: string;
  author: string;
  author_details?: {
    name?: string;
    username?: string;
    avatar_path?: string | null;
    rating?: number;
  };
  content: string;
  created_at: string;
  updated_at?: string;
  url?: string;
}

export interface ReviewsResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

/** Person (actor/director) from TMDB. */
export interface Person {
  id: number;
  name: string;
  biography?: string;
  profile_path: string | null;
  birthday?: string | null;
  deathday?: string | null;
  place_of_birth?: string | null;
  known_for_department?: string;
  popularity?: number;
}

/** Movie in person's credits (from movie_credits endpoint). */
export interface PersonMovieCredit {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  character?: string;
  job?: string;
  credit_id?: string;
  order?: number;
}

export interface PersonMovieCreditsResponse {
  id: number;
  cast: PersonMovieCredit[];
  crew: PersonMovieCredit[];
}

/** Collection (movie series) from TMDB. */
export interface CollectionPart {
  id: number;
  title: string;
  original_title?: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
}

export interface Collection {
  id: number;
  name: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  parts: CollectionPart[];
}

/** belongs_to_collection on movie detail. */
export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}
