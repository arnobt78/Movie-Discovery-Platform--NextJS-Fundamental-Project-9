"use client";

/**
 * Header - nav bar with logo, search (redirects to /search?q=), theme toggle, nav links.
 * Client component: uses pathname for active link, router for search redirect.
 */
import { useState, FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useBookmarks } from "@/context/BookmarkContext";
import { RippleButton } from "@/components/ui/RippleButton";
import { Clapperboard, Bookmark } from "lucide-react";

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className ?? "w-5 h-5"}
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const SunIcon = () => (
  <svg
    aria-hidden="true"
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/movies/trending", label: "Trending" },
  { href: "/movies/popular", label: "Popular" },
  { href: "/movies/top", label: "Top Rated" },
  { href: "/movies/upcoming", label: "Upcoming" },
  { href: "/movies/now-playing", label: "Now Playing" },
  { href: "/movies/discover", label: "Discover" },
];

export function Header() {
  // Mobile: collapse state for nav + search drawer.
  const [hidden, setHidden] = useState(true);
  const { darkMode, setDarkMode } = useTheme();
  const { count } = useBookmarks();
  const pathname = usePathname();
  const router = useRouter();

  const activeClass =
    "text-base block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white";
  const inActiveClass =
    "text-base block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  // Redirect to /search?q=... instead of client-side fetch so URL is shareable.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = (form.elements.namedItem("search") as HTMLInputElement)
      ?.value;
    form.reset();
    if (query) router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const SearchForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        autoComplete="off"
      />
    </form>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-darkbg">
      <nav className="border-b-2 border-gray-200 px-2 sm:px-0 py-2 dark:border-b-1 dark:border-gray-700">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center">
            <Clapperboard className="mr-2 h-8 w-8 sm:h-9 sm:w-9 text-gray-700 dark:text-white/80" />
            <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-700 dark:text-white/80">
              Cinemate
            </span>
          </Link>

          <div id="mobile-nav" className="flex md:order-2">
            <RippleButton
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center p-2 mr-2 text-xs font-medium text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </RippleButton>
            <Link
              href="/bookmarks"
              className="relative flex items-center justify-center p-2 mr-2 text-xs font-medium text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-4 h-4" strokeWidth={2} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-sky-500 text-white text-xs font-semibold">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            <RippleButton
              type="button"
              onClick={() => setHidden(!hidden)}
              aria-controls="navbar-search"
              aria-expanded={!hidden}
              className="md:hidden text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
            >
              <SearchIcon className="w-4 h-4" />
              <span className="sr-only">Search</span>
            </RippleButton>
            <div className="hidden relative md:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-600 dark:text-gray-400">
                <SearchIcon />
                <span className="sr-only">Search icon</span>
              </div>
              <SearchForm />
            </div>
            <RippleButton
              type="button"
              onClick={() => setHidden(!hidden)}
              aria-controls="navbar-search"
              aria-expanded={!hidden}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon />
            </RippleButton>
          </div>

          <div
            className={`${hidden ? "hidden" : ""} justify-between items-center w-full md:flex md:w-auto md:order-1`}
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-600 dark:text-gray-400">
                <SearchIcon />
              </div>
              <SearchForm />
            </div>
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={
                      (href === "/" ? pathname === "/" : pathname === href)
                        ? activeClass
                        : inActiveClass
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
