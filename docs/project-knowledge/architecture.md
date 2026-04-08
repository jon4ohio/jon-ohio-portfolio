# Architecture — jon-ohio-portfolio

## Executive summary

Single **Next.js 16** App Router application serving a designer portfolio. Rendering is **static-first**: case studies use `generateStaticParams` and async Server Components. **No backend application API** in this repository; content is compile-time data from `lib/projects.ts`. Client JavaScript is minimized to navigation (`components/Nav.tsx`).

## Technology stack

| Layer | Choice | Notes |
|-------|--------|--------|
| Framework | Next.js 16.2.2 | App Router, Turbopack dev/build per toolchain |
| UI | React 19 | Server Components default; `'use client'` only where hooks required |
| Types | TypeScript 5 | Strict typing for routes and `Project` domain |
| Styling | Inline styles + `globals.css` | ADR-001: layout/visuals via `style` props; tokens as CSS variables |
| Content | Static TS module | ADR-002: no CMS/DB |

## Architecture pattern

**Static site + file-backed domain model**

1. **Presentation:** `app/**/page.tsx` Server Components compose `components/*`.
2. **Domain:** `lib/projects.ts` exports `Project`, `CaseStudyBlock`, helpers `getProject`, `getFeaturedProjects`, and `projects` list.
3. **Cross-cutting:** `app/layout.tsx` sets global metadata, JSON-LD, skip link, `Nav`, `Footer`, and wraps `children` in `<main>`.

## Routing and rendering

| Route | Rendering | Data source |
|-------|-----------|-------------|
| `/` | Static | Homepage sections + featured projects |
| `/work` | Static | `projects` |
| `/work/[slug]` | SSG (`generateStaticParams`) | `getProject(slug)` |
| `/about`, `/leadership` | Static | Page-local copy |
| `/robots.txt`, `/sitemap.xml` | Metadata routes | `projects` + env base URL |

**Next.js 16:** Dynamic route `params` is a **Promise** — pages await `params` before use (see `app/work/[slug]/page.tsx`).

## Data architecture

- **No database.** The “schema” is the TypeScript `Project` interface (slug, narrative fields, optional `assets` with `CaseStudyBlock[]`).
- **Mutations:** None at runtime; content changes require code edits and redeploy.

## API design

- **No `app/api` routes** and no server actions for CRUD.
- **External integrations:** Email `mailto:` and LinkedIn from layout/schema; optional Vercel Analytics packages exist as dependencies but are not mounted in `layout.tsx` (see [api-contracts.md](./api-contracts.md)).

## Component overview

- **Layout / chrome:** `Nav` (client), `Footer`, `Hero`, `SystemModel` (homepage narrative).
- **Media:** `AssetImage` wraps `next/image` with optional “device” chrome.
- **Case study:** `BlockRenderer` is colocated in `app/work/[slug]/page.tsx` (image, gallery, callout blocks).

## Source tree

See [source-tree-analysis.md](./source-tree-analysis.md).

## Development workflow

See [development-guide.md](./development-guide.md).

## Deployment architecture

See [deployment-guide.md](./deployment-guide.md).

## Testing strategy

**No automated test suite** is configured (`CLAUDE.md`). Validation is `npm run lint` and `npm run build`.

## Security and auth

- **No user authentication** in-app.
- **Environment:** `NEXT_PUBLIC_SITE_URL` and `VERCEL_URL` used for canonical URLs and sitemap base.

## References

- `CLAUDE.md` — contributor orientation
- `docs/adrs/` — Accepted decisions (inline styles, static data, etc.)
