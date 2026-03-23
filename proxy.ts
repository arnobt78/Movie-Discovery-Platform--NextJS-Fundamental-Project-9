import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Hit = { count: number; startMs: number };

const WINDOW_MS = 10_000;
const MAX_REQ_PER_WINDOW = 60;
const BLOCKED_UA =
  /(curl|wget|python-requests|httpclient|scrapy|aiohttp|headless|phantom|selenium|playwright|puppeteer|spider|crawler)/i;

const globalStore = globalThis as unknown as {
  __rate_store__?: Map<string, Hit>;
};
const store = globalStore.__rate_store__ ?? new Map<string, Hit>();
if (!globalStore.__rate_store__) globalStore.__rate_store__ = store;

function getClientKey(request: NextRequest): string {
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const ua = request.headers.get("user-agent") ?? "unknown";
  return `${ip}|${ua.slice(0, 120)}`;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const ua = request.headers.get("user-agent") ?? "";
  if (BLOCKED_UA.test(ua)) {
    return new NextResponse("Blocked", { status: 403 });
  }

  const key = getClientKey(request);
  const now = Date.now();
  const hit = store.get(key);

  if (!hit || now - hit.startMs > WINDOW_MS) {
    store.set(key, { count: 1, startMs: now });
    return NextResponse.next();
  }

  hit.count += 1;
  if (hit.count > MAX_REQ_PER_WINDOW) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": "10" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};

