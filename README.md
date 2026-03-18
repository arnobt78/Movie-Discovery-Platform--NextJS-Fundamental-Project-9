# Movie Discovery Platform – Next.js, React, TypeScript, TMDB API, TailwindCSS, Framer Motion Fundamental Project 9

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-000000)](https://www.framer.com/motion/)
[![TMDB API](https://img.shields.io/badge/TMDB-API-01b4e4)](https://developer.themoviedb.org/)

A full-stack movie discovery web app built with **Next.js**, **React**, and **TypeScript**, powered by **The Movie Database (TMDB) API**. It demonstrates modern patterns: App Router, server-side rendering, client components, TailwindCSS styling, Framer Motion animations, and reusable UI. Ideal for learning and teaching Next.js, API integration, and component-based architecture.

- **Live Demo:** [https://latest-movie.vercel.app/](https://latest-movie.vercel.app/)

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features & Functionality](#features--functionality)
3. [Tech Stack & Dependencies](#tech-stack--dependencies)
4. [Project Structure](#project-structure)
5. [Setup & Installation](#setup--installation)
6. [Environment Variables](#environment-variables)
7. [Scripts & How to Run](#scripts--how-to-run)
8. [Routes & Pages](#routes--pages)
9. [API Layer & TMDB Integration](#api-layer--tmdb-integration)
10. [Components & Reusability](#components--reusability)
11. [Learning Notes & Code Snippets](#learning-notes--code-snippets)
12. [Keywords](#keywords)
13. [Conclusion](#conclusion)
14. [License](#license)

---

## Project Overview

**Movie Discovery Platform** is a movie encyclopedia where users can browse trending and popular films, search by title, filter by genre and year, save favourites with bookmarks, and view detailed pages for movies, cast/crew (person pages), and collections. Data is fetched from the TMDB API; the app uses Next.js App Router for routing, URL-based pagination on list pages, and a mix of server and client components. The codebase is structured for clarity and reuse, making it suitable for beginners and for sharing with others as a reference project.

---

## Features & Functionality

| Feature                                 | Description                                                                                                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home**                                | Hero slideshow (10 movies), Trending Now reel (30, random each visit), Now Playing grid (20, random), Top Rated grid (20, random). “See all” links to list pages. |
| **Trending / Popular / Top / Upcoming / Now Playing** | Paginated list pages (20 cards per page, URL `?page=`); Trending has day/week tabs. |
| **Discover**                            | Filter by genre, year, sort; paginated; filters preserved when changing page.                                                                |
| **Genre**                               | Paginated movies by genre (`/movies/genre/[id]`).                                                                                            |
| **Search**                              | Search by movie title via TMDB; redirects to `/search?q=...`.                                                                                |
| **Movie Detail**                        | Poster (with bookmark), overview, cast, trailers, similar, recommendations, watch providers (US), reviews, collection. Cast / More Like This / Recommendations reels auto-slide and have left/right arrows. |
| **Person Detail**                       | Bio and filmography (Acting, Director, Other Credits) as auto-sliding reels with left/right arrows.                                         |
| **Collection Detail**                   | Movie series page with reel (auto-slide + arrows).                                                                                           |
| **Bookmarks**                           | Bookmark icon on cards and movie detail poster; navbar bookmark icon with count; `/bookmarks` page; persisted in `localStorage`; toasts (add/remove/error). |
| **Theme**                               | Light/dark mode; cookie + `initialDark` from server to avoid icon flicker.                                                                   |
| **Navbar**                              | Sticky header; nav links (Home, Trending, Popular, Top Rated, Upcoming, Now Playing, Discover); bookmark icon (no “Bookmarks” text link); theme toggle. |
| **Responsive UI**                       | Mobile-friendly layout and navigation.                                                                                                       |

---

## Tech Stack & Dependencies

| Category      | Technology                                           | Purpose                                                         |
| ------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| **Framework** | Next.js 16                                           | App Router, SSR, API routes, file-based routing.                |
| **UI**        | React 19                                             | Components and hooks.                                           |
| **Language**  | TypeScript 5.7                                       | Typed APIs and types in `types/movie.ts`.                       |
| **Styling**   | Tailwind CSS 3.4                                     | Utility-first CSS.                                              |
| **Animation** | Framer Motion 11                                     | Page and list animations.                                       |
| **Icons**     | Lucide React                                         | Header and UI icons.                                            |
| **Utilities** | `clsx`, `tailwind-merge`, `class-variance-authority` | Conditional and variant-based class names (e.g. Badge, Button). |
| **Data**      | TMDB API v3                                          | All movie, person, and collection data.                         |

**Important libraries (short):**

- **Next.js** – React framework with server components, App Router, and API routes.
- **Framer Motion** – Declarative animations (`motion.div`, `initial`, `animate`, `transition`).
- **Tailwind** – Utility classes for layout and theming; dark mode via `dark:`.
- **Lucide React** – Icon set used in Header and buttons.

---

## Project Structure

```bash
movie-discovery/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, theme, Header/Footer)
│   ├── page.tsx                  # Home (trending, now playing, top rated)
│   ├── loading.tsx               # Global loading UI
│   ├── not-found.tsx             # 404 page
│   ├── api/
│   │   ├── discover/route.ts     # GET /api/discover (genre, year, sort)
│   │   └── genres/route.ts       # GET /api/genres
│   ├── movie/[id]/               # Movie detail (SSR)
│   ├── person/[id]/              # Person detail (actor/director)
│   ├── collection/[id]/          # Collection (movie series)
│   ├── bookmarks/                # Saved movies (client list from context)
│   ├── movies/
│   │   ├── trending/
│   │   ├── popular/
│   │   ├── top/
│   │   ├── upcoming/
│   │   ├── now-playing/
│   │   ├── discover/
│   │   └── genre/[id]/
│   └── search/
├── components/
│   ├── layout/                   # Header, Footer, ScrollToTop
│   ├── pages/                    # Page-level components (MovieDetailPage, etc.)
│   ├── sections/                # HeroSection, TrendingSection, etc.
│   ├── ui/                      # Badge, MovieCard, CastCard, VideoCard, etc.
│   └── providers/               # ThemeProvider, GenresProvider
├── lib/
│   ├── tmdb.ts                  # TMDB API client (all fetch helpers)
│   └── utils.ts                 # cn() and helpers
├── hooks/                       # useTitle, useDiscoverParams, usePagination
├── context/                     # BookmarkContext
├── types/
│   └── movie.ts                 # Movie, Person, Collection, API types
├── public/                      # favicon, images
├── .env.example                 # Env template
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Setup & Installation

### Prerequisites

- **Node.js** 18+ (LTS recommended). Download from [nodejs.org](https://nodejs.org/).

### Steps

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd movie-discovery
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment variables (optional for running)**  
   You can run the app without a `.env` file; movie data will not load without a TMDB API key. For full functionality, create a `.env` (or `.env.local`) as described in [Environment Variables](#environment-variables).

4. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

**You do not need any environment variables to start the app.** To actually load data from TMDB, you must set an API key.

| Variable                   | Required       | Description                                                            |
| -------------------------- | -------------- | ---------------------------------------------------------------------- |
| `TMDB_API_KEY`             | Yes (for data) | TMDB API key (server-side). Prefer this for security.                  |
| `NEXT_PUBLIC_TMDB_API_KEY` | Optional       | Same key for client-side fetch if you ever call TMDB from the browser. |
| `NEXT_PUBLIC_SITE_TITLE`   | Optional       | Used in `document.title` (e.g. "Cinemate"). Default used if unset.     |

### How to get a TMDB API key

1. Register or log in at [themoviedb.org](https://www.themoviedb.org/).
2. Go to [API settings](https://www.themoviedb.org/settings/api) and create an API key (e.g. "Developer" type).
3. Copy the key and add it to your project:

Create a file `.env` or `.env.local` in the project root (do not commit real keys):

```env
# Required for movie/person/collection data
TMDB_API_KEY=your-tmdb-api-key-here

# Optional: site name in browser tab
NEXT_PUBLIC_SITE_TITLE=Cinemate
```

You can copy from the provided example:

```bash
cp .env.example .env
# Then edit .env and replace your-tmdb-api-key-here with your key.
```

---

## Scripts & How to Run

| Command         | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `npm run dev`   | Start Next.js dev server (default port 3000).              |
| `npm run build` | Production build.                                          |
| `npm run start` | Run production build (run after `npm run build`).          |
| `npm run lint`  | Run ESLint on app, components, lib, hooks, types, context. |

---

## Routes & Pages

| Route                  | Type   | Description                                                                 |
| ---------------------- | ------ | --------------------------------------------------------------------------- |
| `/`                    | Server | Home: hero (10), Trending reel (30), Now Playing (20), Top Rated (20).    |
| `/movies/trending`     | Server | Trending list; `?page=`, `?window=day|week`; paginated.                      |
| `/movies/popular`      | Server | Popular list; `?page=`; paginated.                                         |
| `/movies/top`          | Server | Top rated; `?page=`; paginated.                                            |
| `/movies/upcoming`     | Server | Upcoming; `?page=`; paginated.                                             |
| `/movies/now-playing`  | Server | Now playing; `?page=`; paginated.                                          |
| `/movies/discover`     | Server | Discover; `?genre`, `?year`, `?sort`, `?page=`; paginated.                 |
| `/movies/genre/[id]`   | Server | By genre; `?page=`; paginated.                                             |
| `/search`              | Client | Search by query.                                                            |
| `/bookmarks`           | Server | Saved movies (client `BookmarkPage` from `BookmarkContext`).                |
| `/movie/[id]`          | Server | Movie detail; reels (Cast, More Like This, Recommendations) with arrows.   |
| `/person/[id]`         | Server | Person detail; reels (Acting, Director, Other Credits) with arrows.       |
| `/collection/[id]`     | Server | Collection; reel with arrows.                                               |
| `/api/discover`        | API    | GET; `genre`, `year`, `sort`.                                               |
| `/api/genres`          | API    | GET; genre list.                                                           |

Navigation uses Next.js `<Link>` and `useRouter`; the header is sticky and uses `usePathname()` for active state.

---

## API Layer & TMDB Integration

All TMDB calls live in **`lib/tmdb.ts`**. The API key is read from `TMDB_API_KEY` or `NEXT_PUBLIC_TMDB_API_KEY`. Base URL: `https://api.themoviedb.org/3`.

### Main functions

| Function                              | TMDB endpoint (concept)           | Returns                              |
| ------------------------------------- | --------------------------------- | ------------------------------------ |
| `fetchMovies(path, query?)`           | Generic list (first page)         | `Movie[]`                            |
| `fetchMoviesPage(path, page, query?)` | List with pagination              | `TmdbListResponse` (results, total_pages) |
| `fetchMovieById(id)`                  | `GET /movie/{id}`                 | `MovieDetail \| null`                |
| `fetchMovieCredits(id)`               | `GET /movie/{id}/credits`         | `MovieCredits \| null`               |
| `fetchMovieVideos(id)`                | `GET /movie/{id}/videos`          | `Video[]` (YouTube trailers)         |
| `fetchSimilarMovies(id, page?)`       | `GET /movie/{id}/similar`         | `Movie[]`                            |
| `fetchSimilarMoviesPage(id, page)`    | Similar with pagination           | `TmdbListResponse`                    |
| `fetchRecommendations(id, page?)`     | `GET /movie/{id}/recommendations` | `Movie[]`                            |
| `fetchRecommendationsPage(id, page)`  | Recommendations with pagination   | `TmdbListResponse`                    |
| `fetchWatchProviders(id)`             | `GET /movie/{id}/watch/providers` | `WatchProvidersResponse \| null`     |
| `fetchReviews(id)`                    | `GET /movie/{id}/reviews`         | `ReviewsResponse \| null`            |
| `fetchPersonById(id)`                 | `GET /person/{id}`                | `Person \| null`                     |
| `fetchPersonMovieCredits(id)`         | `GET /person/{id}/movie_credits`   | `PersonMovieCreditsResponse \| null` |
| `fetchCollectionById(id)`             | `GET /collection/{id}`            | `Collection \| null`                 |
| `fetchTrendingMovies(day \| week)`    | `GET /trending/movie/{window}`    | `Movie[]`                            |
| `fetchTrendingMoviesPage(window, page)` | Trending with pagination        | `TmdbListResponse`                    |
| `fetchDiscoverMovies(params)`        | `GET /discover/movie`             | `Movie[]`                            |
| `fetchDiscoverMoviesPage(params)`    | Discover with pagination          | `TmdbListResponse`                    |
| `fetchGenres()`                       | `GET /genre/movie/list`           | `Genre[]`                            |
| `enrichMoviesWithRuntime(movies)`     | Batch detail fetch                | `Movie[]` (with runtime)              |

### Example: fetching and using data (server component)

```tsx
// app/movie/[id]/page.tsx (simplified)
import { fetchMovieById, fetchMovieCredits } from "@/lib/tmdb";

export default async function MovieRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [movie, credits] = await Promise.all([
    fetchMovieById(id),
    fetchMovieCredits(id),
  ]);
  if (!movie) notFound();
  return <MovieDetailPage movie={movie} credits={credits} />;
}
```

Types for responses are in **`types/movie.ts`** (e.g. `Movie`, `MovieDetail`, `Person`, `Collection`, `Review`, `WatchProvidersResponse`).

---

## Components & Reusability

### Layout

- **Header** – Sticky; logo, nav links (Home, Trending, Popular, Top Rated, Upcoming, Now Playing, Discover), search form (redirect to `/search?q=...`), bookmark icon with count (to `/bookmarks`), theme toggle.
- **Footer** – Links and branding.
- **ScrollToTop** – Button to scroll to top.

### Page components (`components/pages/`)

- **MovieDetailPage** – Full movie detail; poster with bookmark; cast / similar / recommendations reels (auto-slide + arrows via `ReelWithArrows`).
- **PersonDetailPage** – Person bio and filmography reels (Acting, Director, Other Credits) with auto-slide + arrows.
- **CollectionDetailPage** – Collection name, overview, reel with arrows.
- **MovieListPage** – Shared grid + optional `Pagination` for list pages (popular, top, upcoming, now-playing).
- **TrendingPage** – Day/week tabs and paginated grid.
- **DiscoverPage** – Filters (genre, year, sort) and paginated grid.
- **GenrePage** – Paginated grid by genre.
- **BookmarkPage** – Grid of saved movies (from `BookmarkContext`).
- **SearchPage** – Search input and results.
- **NotFoundPage** – 404 UI.

### UI components (`components/ui/`)

- **MovieCard** – Poster (hover zoom), title, rating, runtime, bookmark; links to `/movie/[id]`.
- **SimilarMovieCard** – Smaller card for similar/recommendations/collection; bookmark; links to `/movie/[id]`.
- **CastCard** – Profile image, name, character; links to `/person/[id]`.
- **VideoCard** – Embedded YouTube trailer.
- **BookmarkButton** – Toggle bookmark; toasts (add/remove/error); used on cards and movie detail poster.
- **Pagination** – URL-based prev/next and page numbers; `basePath`, `preserveQuery` for discover/genre.
- **ReelWithArrows** – Horizontal reel with Framer Motion auto-slide and left/right arrow buttons; used on movie/person/collection detail reels.
- **Badge** – Genre/style tags; variants: `default`, `secondary`, `outline`.
- **Card**, **RippleButton**, **RippleLink** – Styled container and buttons.
- **GenreFilter**, **YearFilter**, **SortSelect** – Discover filters.
- **MovieCardSkeleton**, **MovieDetailSkeleton**, **HomePageSkeleton**, **Skeleton** – Loading placeholders.

### Context

- **BookmarkContext** – `useBookmarks()`; `toggleBookmark`, `isBookmarked`, `count`; persists to `localStorage`; wrap app in `BookmarkProvider`.

### How to reuse in another project

1. Copy **`lib/tmdb.ts`** and **`types/movie.ts`** for data and types.
2. Reuse **`components/ui/*`** (e.g. `MovieCard`, `Pagination`, `ReelWithArrows`, `BookmarkButton`) with `@/lib/utils` and Tailwind.
3. Use **`hooks/useTitle`** and **`hooks/usePagination`** (optional) for list pages.
4. Use **`ThemeProvider`** with `initialDark` from server for theme without icon flicker.
5. Use **`BookmarkProvider`** and **`BookmarkButton`** for saved items with toasts (e.g. Sonner).

---

## Learning Notes & Code Snippets

### Server vs client

- **Server components** (default in App Router): no `"use client"`; can `await fetch` and pass data as props. Used in `app/page.tsx`, `app/movie/[id]/page.tsx`, etc.
- **Client components**: add `"use client"` at the top when you need `useState`, `useEffect`, event handlers, or browser APIs. Used in `Header`, `MovieDetailPage`, `DiscoverPage`, etc.

### Setting document title (client)

```tsx
// hooks/useTitle.ts
export function useTitle(title: string | undefined) {
  useEffect(() => {
    if (title) document.title = `${title} | ${SITE_TITLE}`;
  }, [title]);
}
```

Use in a client page: `useTitle(movie.title);`.

### Conditional CSS with `cn` (Tailwind + clsx)

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Example in a component:

```tsx
<div className={cn("base-classes", isActive && "active-classes", className)} />
```

### Framer Motion entrance animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: 0.1 }}
>
  {children}
</motion.div>
```

### Next.js image and TMDB

Posters and backdrops use `https://image.tmdb.org/t/p/{size}/{path}`. `next.config.ts` includes `remotePatterns` for `image.tmdb.org` and `img.youtube.com` so `next/image` works.

---

## Keywords

`Next.js`, `React`, `TypeScript`, `TMDB API`, `movie discovery`, `App Router`, `server components`, `Tailwind CSS`, `Framer Motion`, `pagination`, `bookmarks`, `localStorage`, `sticky navbar`, `reel`, `watch providers`, `reviews`, `recommendations`, `person page`, `collection`, `dark mode`, `responsive`, `educational`, `open source`

---

## Conclusion

This project is a complete example of a **Next.js 16** movie app with **React 19** and **TypeScript**: App Router, server/client split, TMDB integration, URL-based pagination on list pages, bookmarks with localStorage, person and collection pages, detail reels with auto-slide and arrow controls, and reusable UI. Use it to learn routing, data fetching, pagination, context/hooks, env vars, and component structure, or as a base to extend with more TMDB features or your own backend.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You may use, modify, and distribute the code in accordance with the license terms.

---

## Happy Coding! 🎉

This is an **open-source project** — feel free to use, extend, and learn from it.

If you have questions or want to share what you built, you can reach out via GitHub or the portfolio: [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
