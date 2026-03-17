/**
 * Root layout - SSR layout for the entire app.
 * Theme: cookie for SSR (no flash on refresh), script for first visit.
 */
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GenresProvider } from "@/components/providers/GenresProvider";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const SITE_URL = "https://latest-movie.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cinemate MoviePedia – Discover Movies, Trending & Popular Films",
    template: "%s | Cinemate MoviePedia",
  },
  description:
    "Discover and explore movies with Cinemate MoviePedia. Browse trending, popular, top-rated, and upcoming films. Search movies, view cast, ratings, trailers, and detailed information powered by TMDB API.",
  keywords: [
    "movies",
    "movie discovery",
    "Cinemate",
    "TMDB",
    "trending movies",
    "popular films",
    "movie search",
    "film database",
    "movie ratings",
    "Next.js",
    "React",
  ],
  authors: [
    {
      name: "Arnob Mahmud",
      url: "https://www.arnobmahmud.com",
    },
  ],
  creator: "Arnob Mahmud",
  publisher: "Arnob Mahmud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Cinemate MoviePedia",
    title: "Cinemate MoviePedia – Discover Movies, Trending & Popular Films",
    description:
      "Discover and explore movies. Browse trending, popular, top-rated films. Search movies, view cast, ratings, and trailers.",
    images: [
      {
        url: "/favicon.ico",
        width: 48,
        height: 48,
        alt: "Cinemate MoviePedia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cinemate MoviePedia – Discover Movies",
    description: "Discover trending, popular, and top-rated movies. Search films and view detailed info.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "entertainment",
};

const THEME_SCRIPT = `(function(){
  var c=document.cookie.match(/theme=(dark|light)/);
  var v=c?c[1]==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;
  try{var s=localStorage.getItem('darkMode');if(s!==null)v=JSON.parse(s);}catch(e){}
  if(v){document.documentElement.classList.add('dark');document.cookie='theme=dark;path=/;max-age=31536000';}
  else{document.documentElement.classList.remove('dark');document.cookie='theme=light;path=/;max-age=31536000';}
})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  const isDark = themeCookie?.value === "dark";
  const htmlClass = [
    outfit.variable,
    dmSans.variable,
    isDark ? "dark" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <html lang="en" suppressHydrationWarning className={htmlClass}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-white dark:bg-darkbg antialiased font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <GenresProvider>
          <div className="max-w-9xl mx-auto w-full px-4 sm:px-6 min-h-[90vh] flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
          </GenresProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
