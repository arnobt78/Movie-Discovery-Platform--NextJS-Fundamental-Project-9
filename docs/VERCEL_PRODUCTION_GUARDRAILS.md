# Vercel Production Guardrails (Generic, Reusable)

Use this checklist in any Vercel project (Next.js, static sites, APIs, demos, SaaS apps) to reduce surprise usage spikes (bot traffic, crawl storms, image/API abuse) without degrading normal user experience.

---

## 1) Safe Defaults To Enable On Day 1

### Firewall / Bot

- Turn on `Firewall -> Bot Management -> Bot Protection`.
- Turn on `Firewall -> Bot Management -> AI Bots`.
- Keep `Attack Mode` **off** by default (use only during active attack windows).

### Robots / Crawl Scope

- Keep one source of truth for robots policy (prefer App Router `robots.ts` OR `public/robots.txt`, not conflicting rules).
- Disallow deep, high-cardinality routes if SEO is not required (IDs, slugs, search permutations, pagination explosions).
- Allow only intentional indexable sections.

### Caching

- Prefer ISR (`revalidate`) for server-rendered pages and external API fetches.
- Avoid unnecessary `no-store`/`force-dynamic` unless required.
- Cache expensive data reads where possible.

### Images / Media

- Use responsive `sizes` (or equivalent) correctly.
- Avoid oversized remote media transforms.
- Do not mark non-critical media as high priority.
- Keep graceful fallbacks for media failures.
- Prefer a reusable safe-image pattern: try optimized image first, then fallback to native `<img>` when optimization fails or quota is exceeded.
- If optimization quota pressure is high, selectively use unoptimized mode for non-critical remote images.
- Reference implementation: `docs/SAFE_IMAGE_REUSABLE_COMPONENT.md`.

---

## 2) Architecture Rules That Prevent Spikes

### Keep expensive routes bounded

- On expensive routes, fetch only what is needed above the fold.
- Cap list sizes (e.g. top 10/20), do not over-fetch by default.
- Avoid duplicated external API/database calls per request.
- Do not expose unnecessary fields from backend/API responses; return only required keys.
- Avoid N+1 fetch patterns for list/detail compositions.
- Avoid fetching hidden/offscreen sections during initial render unless needed.
- Use pagination/cursor limits to prevent large payload bursts.

### Bot-safe dynamic routing

- High-cardinality dynamic routes should not be freely crawlable unless SEO value is proven.
- If SEO is not required for a route group, use `noindex` + robots disallow.

### Preserve performance for real users

- Do bot filtering at edge/firewall first (not in client code).
- Do not add client-side anti-bot scripts that delay first paint.
- Keep critical rendering path unchanged for browsers.

---

## 3) Monitoring Routine (Free-Tier Friendly)

Use this schedule after every deployment:

- **T+15 min**
  - `Observability -> Edge Requests -> Bot Name`
  - `Observability -> Edge Requests -> Routes`
- **T+1 hour**
  - `Usage -> Edge Requests`
  - `Usage -> Fast Origin Transfer`
  - `Usage -> Fluid Active CPU`
- **Next morning**
  - Compare slope/trend, not only cumulative totals.

What to watch:

- Sudden growth on `/_next/image`
- One bot dominating `Bot Name`
- High 4xx + firewall deny spikes (means attack attempts are being blocked)
- Repeated traffic bursts on one endpoint/path family

---

## 4) Incident Playbook (When Metrics Spike)

1. Confirm top source in `Observability`:
   - by `Project`, `Bot Name`, `Routes`.
2. If bot-driven:
   - Ensure `Bot Protection` and `AI Bots` are ON.
   - Keep `Attack Mode` OFF unless still uncontrollable.
3. If image/media endpoints dominate:
   - Reduce unnecessary transforms first.
   - Verify media usage patterns and page hotspots.
4. If CPU/Origin still high:
   - Reduce heavy route payloads and expensive server work.
   - Tighten crawl exposure of dynamic routes.
   - Trim API response shape and remove unnecessary upstream calls.
5. Re-check at 15/60/180 minutes.

---

## 5) Project-Type Presets

### Static showcase sites

- Bot Protection: ON
- AI Bots: ON
- Robots: restrictive for non-essential routes
- Minimal runtime/API usage where possible

### SSR/API-heavy apps

- Bot Protection: ON
- AI Bots: ON
- Strong ISR strategy (`revalidate`)
- Tight controls on dynamic crawlable paths
- Strict payload caps per request

### API-only backends

- Bot Protection: ON
- AI Bots: ON
- Rate-limit high-cost endpoints
- Cache frequent read endpoints
- Keep expensive operations authenticated where possible

---

## 6) Non-Negotiables

- Never ship conflicting robots policies.
- Never expose unlimited crawl surface on ID-based dynamic routes by default.
- Never launch without basic bot protection on public projects.
- Monitor slope (rate of change), not just totals.
- Prefer staged rollout for security controls; monitor false positives.

---

## 7) Quick Copy Checklist (PR/Launch)

- [ ] Bot Protection ON
- [ ] AI Bots ON
- [ ] Robots policy verified (single source, no conflicts)
- [ ] Dynamic deep routes reviewed for crawl exposure
- [ ] ISR/revalidate set for server routes
- [ ] Expensive routes fetch only required data
- [ ] Media usage reviewed (sizes/priority/transform behavior)
- [ ] Safe image fallback pattern documented/applied where needed (`docs/SAFE_IMAGE_REUSABLE_COMPONENT.md`)
- [ ] API responses minimized (no unnecessary fields, no duplicate calls)
- [ ] T+15m and T+1h observability checks completed
