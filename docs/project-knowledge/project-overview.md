# Project overview — jon-ohio-portfolio

## Purpose

**jon-ohio-portfolio** is a static, marketing-style portfolio site for **John Ohio** (Senior Product Designer). It showcases positioning (product systems, DesignOps, AI UX), leadership narrative, and detailed case studies with metrics. Primary goals: credibility with hiring teams, clear contact path, and SEO-friendly case study depth.

## Repository structure

| Attribute | Value |
|-----------|--------|
| **Type** | Monolith — single Next.js application |
| **Primary language** | TypeScript |
| **UI framework** | React 19 (Server Components by default) |
| **Meta-framework** | Next.js 16 App Router |
| **Styling** | Inline `style` props + CSS custom properties in `app/globals.css`; Tailwind limited to animation utilities |
| **Content** | Static typed data in `lib/projects.ts` (no CMS, DB, or runtime API) |
| **Hosting** | Vercel (see `vercel.json`) |

## Executive summary

The app is a **fully static** portfolio: pages are Server Components except `components/Nav.tsx` (client: pathname + mobile menu). Case study routes are pre-rendered via `generateStaticParams`. Discovery and sharing are supported through `metadata`, JSON-LD, `robots.ts`, and `sitemap.ts`.

## Tech stack summary

| Category | Technology | Version (package.json) |
|----------|------------|-------------------------|
| Runtime | Node (local dev / Vercel build) | — |
| Framework | Next.js | 16.2.2 |
| UI | React / react-dom | 19.2.4 |
| Language | TypeScript | ^5 |
| CSS | Tailwind CSS (utilities only) | ^4 |
| Analytics (deps) | @vercel/analytics, @vercel/speed-insights | ^2.x |
| Lint | ESLint + eslint-config-next | 9 / 16.2.2 |

## Architecture classification

- **Pattern:** Layered App Router — `app/` routes, shared `components/`, domain data in `lib/`.
- **Data:** File-based “CMS” — single `projects` array and helpers (`getProject`, `getFeaturedProjects`).
- **Rendering:** SSG for `/work/[slug]`; marketing pages static.

## Related documentation

- [Architecture](./architecture.md)
- [Source tree](./source-tree-analysis.md)
- [Development guide](./development-guide.md)
- [Deployment](./deployment-guide.md)
- [Data models](./data-models.md)
- [API surface](./api-contracts.md)
- [Component inventory](./component-inventory.md)
- [Master index](./index.md)

## Governance

Architecture decisions are recorded under `docs/adrs/` (see ADR index in-repo).
