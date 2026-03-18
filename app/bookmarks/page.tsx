/**
 * Route: /bookmarks — SSR shell; client BookmarkPage reads from BookmarkProvider (localStorage).
 */
import { BookmarkPage } from "@/components/pages/BookmarkPage";

export const metadata = {
  title: "My Bookmarks",
};

export default function BookmarksRoute() {
  return <BookmarkPage />;
}
