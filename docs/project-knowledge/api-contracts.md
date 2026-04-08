# API contracts

## HTTP API routes

**None.** There is no `app/api/` directory and no Route Handlers exposing REST or GraphQL endpoints in this repository.

## Server actions

No mutating server actions for portfolio content were identified; content is static.

## External surfaces

| Surface | Mechanism |
|---------|-----------|
| Contact | `mailto:jon4ohio@gmail.com` (links in `Nav`, `Footer`) |
| Social | LinkedIn URL in Person JSON-LD (`app/layout.tsx`) |
| SEO | `metadata`, `sitemap.ts`, `robots.ts` |

## Optional analytics

`package.json` includes `@vercel/analytics` and `@vercel/speed-insights`. They are **not** imported in `app/layout.tsx` in the scanned tree — if you need production analytics, add `<Analytics />` and `<SpeedInsights />` per Vercel docs.

## Summary

Treat this repo as a **static site**: the only “contract” consumers rely on is **published HTML routes** and **metadata**, not JSON APIs.
