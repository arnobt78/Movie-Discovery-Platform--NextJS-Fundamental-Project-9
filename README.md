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

<img width="1200" alt="Screenshot 2024-08-28 at 02 15 28" src="https://github.com/user-attachments/assets/78b99dd4-128c-4873-846d-09fa9925b30a"> <img width="1200" alt="Screenshot 2024-08-28 at 02 16 09" src="https://github.com/user-attachments/assets/02a5af59-2b26-4a56-97a3-b62099492a4b"> <img width="1200" alt="Screenshot 2024-08-28 at 02 16 36" src="https://github.com/user-attachments/assets/c3046cbe-497e-40fe-8d74-2e30c02f1a92">

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

**Movie Discovery Platform** is a movie encyclopedia where users can browse trending and popular films, search by title, filter by genre and year, and view detailed pages for movies, cast/crew (person pages), and collections. Data is fetched from the TMDB API; the app uses Next.js App Router for routing and a mix of server and client components. The codebase is structured for clarity and reuse, making it suitable for beginners and for sharing with others as a reference project.

---

## Features & Functionality

| Feature                                 | Description                                                                                                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home**                                | Hero section, trending, now playing, and top-rated preview sections.                                                                         |
| **Trending / Popular / Top / Upcoming** | Dedicated list pages for each TMDB list endpoint.                                                                                            |
| **Discover**                            | Filter movies by genre, year, and sort order; uses API route and URL search params.                                                          |
| **Search**                              | Client-side search by movie title via TMDB search endpoint.                                                                                  |
| **Movie Detail**                        | Overview, cast, crew, trailers, similar movies, recommendations, watch providers (US), reviews, and collection link/section when applicable. |
| **Person Detail**                       | Actor/director profile with biography and filmography (cast, director, other crew).                                                          |
| **Collection Detail**                   | Movie series page (e.g. Harry Potter, Marvel) listing all parts.                                                                             |
| **Theme**                               | Light/dark mode with cookie persistence and system preference support.                                                                       |
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
│   ├── movies/
│   │   ├── trending/
│   │   ├── popular/
│   │   ├── top/
│   │   ├── upcoming/
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
├── hooks/                       # useTitle, useFetch, useDiscoverParams
├── context/                     # DiscoverContext
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

| Route                | Type         | Description                                                                               |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------- |
| `/`                  | Server       | Home: hero, trending, now playing, top rated.                                             |
| `/movies/trending`   | Server       | Trending movies.                                                                          |
| `/movies/popular`    | Server       | Popular movies.                                                                           |
| `/movies/top`        | Server       | Top rated.                                                                                |
| `/movies/upcoming`   | Server       | Upcoming.                                                                                 |
| `/movies/discover`   | Client + API | Discover with genre/year/sort filters.                                                    |
| `/movies/genre/[id]` | Server       | Movies by genre.                                                                          |
| `/search`            | Client       | Search by query.                                                                          |
| `/movie/[id]`        | Server       | Movie detail (credits, videos, similar, recommendations, providers, reviews, collection). |
| `/person/[id]`       | Server       | Person detail (bio, filmography).                                                         |
| `/collection/[id]`   | Server       | Collection (movie series).                                                                |
| `/api/discover`      | API          | GET; query params: `genre`, `year`, `sort`.                                               |
| `/api/genres`        | API          | GET; returns genre list.                                                                  |

Navigation is handled by Next.js `<Link>` and `useRouter`; the header uses `usePathname()` for active state.

---

## API Layer & TMDB Integration

All TMDB calls live in **`lib/tmdb.ts`**. The API key is read from `TMDB_API_KEY` or `NEXT_PUBLIC_TMDB_API_KEY`. Base URL: `https://api.themoviedb.org/3`.

### Main functions

| Function                           | TMDB endpoint (concept)           | Returns                              |
| ---------------------------------- | --------------------------------- | ------------------------------------ |
| `fetchMovies(path, query?)`        | Generic list / search             | `Movie[]`                            |
| `fetchMovieById(id)`               | `GET /movie/{id}`                 | `MovieDetail \| null`                |
| `fetchMovieCredits(id)`            | `GET /movie/{id}/credits`         | `MovieCredits \| null`               |
| `fetchMovieVideos(id)`             | `GET /movie/{id}/videos`          | `Video[]` (YouTube trailers)         |
| `fetchSimilarMovies(id)`           | `GET /movie/{id}/similar`         | `Movie[]`                            |
| `fetchRecommendations(id)`         | `GET /movie/{id}/recommendations` | `Movie[]`                            |
| `fetchWatchProviders(id)`          | `GET /movie/{id}/watch/providers` | `WatchProvidersResponse \| null`     |
| `fetchReviews(id)`                 | `GET /movie/{id}/reviews`         | `ReviewsResponse \| null`            |
| `fetchPersonById(id)`              | `GET /person/{id}`                | `Person \| null`                     |
| `fetchPersonMovieCredits(id)`      | `GET /person/{id}/movie_credits`  | `PersonMovieCreditsResponse \| null` |
| `fetchCollectionById(id)`          | `GET /collection/{id}`            | `Collection \| null`                 |
| `fetchTrendingMovies(day \| week)` | `GET /trending/movie/{window}`    | `Movie[]`                            |
| `fetchDiscoverMovies(params)`      | `GET /discover/movie`             | `Movie[]`                            |
| `fetchGenres()`                    | `GET /genre/movie/list`           | `Genre[]`                            |
| `enrichMoviesWithRuntime(movies)`  | Batch detail fetch                | `Movie[]` (with runtime)             |

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

- **Header** – Logo, nav links, search form (redirect to `/search?q=...`), theme toggle.
- **Footer** – Links and branding.
- **ScrollToTop** – Button to scroll to top.

### Page components (`components/pages/`)

- **MovieDetailPage** – Full movie detail (poster, meta, cast, trailers, similar, recommendations, watch providers, reviews, collection).
- **PersonDetailPage** – Person bio and filmography (acting, director, other crew).
- **CollectionDetailPage** – Collection name, overview, list of movies.
- **MovieListPage** – Shared list layout for trending/popular/top/upcoming.
- **DiscoverPage** – Filters (genre, year, sort) and grid.
- **SearchPage** – Search input and results.
- **TrendingPage**, **GenrePage**, **NotFoundPage** – Specific list or 404 UI.

### UI components (`components/ui/`)

- **MovieCard** – Poster, title, rating, runtime; links to `/movie/[id]`.
- **SimilarMovieCard** – Smaller card for similar/recommendations/collection; same link.
- **CastCard** – Profile image, name, character; links to `/person/[id]`.
- **VideoCard** – Embedded YouTube trailer.
- **Badge** – Genre/style tags; variants: `default`, `secondary`, `outline`.
- **Card**, **RippleButton**, **RippleLink** – Styled container and buttons.
- **GenreFilter**, **YearFilter**, **SortSelect** – Discover filters.
- **MovieCardSkeleton**, **MovieDetailSkeleton**, **HomePageSkeleton**, **Skeleton** – Loading placeholders.

### How to reuse in another project

1. Copy **`lib/tmdb.ts`** and **`types/movie.ts`** for data and types.
2. Reuse **`components/ui/*`** (e.g. `MovieCard`, `Badge`) by copying the folder and ensuring `@/lib/utils` (e.g. `cn`) and Tailwind are available.
3. Use **`hooks/useTitle`** in any client page that sets `document.title`.
4. Use **`components/providers/ThemeProvider`** if you want the same theme (dark/light) and cookie behavior.

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

`Next.js`, `React`, `TypeScript`, `TMDB API`, `movie discovery`, `App Router`, `server components`, `Tailwind CSS`, `Framer Motion`, `responsive`, `dark mode`, `person page`, `collection`, `watch providers`, `reviews`, `recommendations`, `educational`, `open source`

---

## Conclusion

This project is a complete example of a **Next.js 16** movie app with **React 19** and **TypeScript**: App Router, server/client split, TMDB integration, person and collection pages, and reusable UI. Use it to learn routing, data fetching, env vars, and component structure, or as a base to extend with more TMDB features or your own backend.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You may use, modify, and distribute the code in accordance with the license terms.

---

## Happy Coding! 🎉

This is an **open-source project** — feel free to use, extend, and learn from it.

If you have questions or want to share what you built, you can reach out via GitHub or the portfolio: [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
