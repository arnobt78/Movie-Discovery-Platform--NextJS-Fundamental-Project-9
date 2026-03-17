/**
 * TMDB API response types for movie discovery app.
 */

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
