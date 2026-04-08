# Development guide

## Prerequisites

- **Node.js** — use an LTS version compatible with Next.js 16 (see Next.js docs for supported range).
- **npm** — lockfile is `package-lock.json`; prefer `npm ci` for clean installs.

## Install

```bash
npm ci
```

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata and sitemap (falls back to `VERCEL_URL` or localhost) |
| `VERCEL_URL` | Set on Vercel; used when `NEXT_PUBLIC_SITE_URL` is unset |

No `.env` file is required for local static viewing; set `NEXT_PUBLIC_SITE_URL` for accurate absolute URLs in production builds.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (default http://localhost:3000) |
| `npm run build` | Production build (Turbopack) |
| `npm run start` | Serve production build locally |
| `npm run lint` | ESLint |

## Editing content

- **Case studies:** Edit `lib/projects.ts` — add or change `Project` objects; ensure `slug` matches URLs.
- **Routes:** `app/` directory; new top-level pages need optional updates to `components/Nav.tsx` and `app/sitemap.ts`.

## Code conventions

- **Pages:** Server Components; avoid `'use client'` on `app/**` pages.
- **Params:** Await `params` in dynamic routes (Next.js 16).
- **Styles:** Inline `style` for layout; Tailwind only for approved utilities in `globals.css` (e.g. `animate-fade-up`).
- **Imports:** Use `@/` path alias to project root.

## Testing

No test runner is configured. Rely on `npm run lint` and `npm run build` before merge.

## Troubleshooting

- **Wrong Turbopack root:** `next.config.ts` sets `turbopack.root` to `__dirname` when multiple lockfiles exist — keep monorepo-style extra lockfiles out of this tree or adjust config.
