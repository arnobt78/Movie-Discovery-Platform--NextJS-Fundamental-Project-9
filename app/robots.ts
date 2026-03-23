import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/movies/trending",
          "/movies/popular",
          "/movies/top",
          "/movies/upcoming",
          "/movies/now-playing",
          "/movies/discover",
          "/bookmarks",
          "/search",
        ],
        disallow: ["/movie/", "/person/", "/collection/"],
      },
    ],
  };
}
