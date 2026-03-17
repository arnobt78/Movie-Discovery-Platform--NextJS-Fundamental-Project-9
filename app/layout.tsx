/**
 * Root layout - SSR layout for the entire app.
 * Wraps all pages with max-w-9xl responsive container.
 * Mobile: w-full stack; sm+: desktop layout.
 */
import type { Metadata } from "next";
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
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export const metadata: Metadata = {
  title: {
    default: "Cinemate",
    template: "%s | Cinemate",
  },
  description: "Discover movies - browse popular, top rated, and upcoming films",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-white dark:bg-darkbg antialiased font-sans">
        <ThemeProvider>
          <div className="max-w-9xl mx-auto w-full px-4 sm:px-6 min-h-[90vh] flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
