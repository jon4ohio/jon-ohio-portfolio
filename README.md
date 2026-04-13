# jon-ohio-portfolio
John Ohio’s portfolio site.

- **Stack**: Next.js App Router, React, TypeScript
- **Styling convention**: layout is primarily inline `style` props (Tailwind is only used for a small set of animation utility classes in `app/globals.css`)

## Local development

Install dependencies:

```bash
npm ci
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Useful commands

```bash
npm run lint   # eslint
npm run build  # production build
npm run start  # run production server (after build)
npm run hooks:install # install git pre-push hook
```

### Accessibility (automated)

Page-level scans use [Playwright](https://playwright.dev/) and [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) against a production build (same checks as axe in the browser; contrast and other rules are DOM-based heuristics).

1. Install browsers once: `npx playwright install chromium`
2. Build, then run tests (starts `next start` automatically unless a server is already running):

```bash
npm run test:a11y:ci
```

Or: `npm run build && npm run test:a11y`

Failures report **critical** and **serious** WCAG 2 A/AA-tagged violations only; moderate/minor issues may still need manual review.

## Content editing

- **Case studies / projects**: edit `lib/projects.ts`
- **Routes**:
  - `/` → `app/page.tsx`
  - `/work` → `app/work/page.tsx`
  - `/work/[slug]` → `app/work/[slug]/page.tsx`
  - `/about` → `app/about/page.tsx`
  - `/leadership` → `app/leadership/page.tsx`

## Deploying

This repo is configured for Vercel. `vercel.json` uses:

- `installCommand`: `npm ci`
- `buildCommand`: `npm run build`

## Architecture Decision Records (ADRs)

See `docs/adrs/index.md`.

Major-push governance: `docs/adrs/ADR-008-adr-update-gate-for-major-pushes.md`.

## Public showcase repo (curated)

Process-only mirror with sanitized ADRs/snippets — **not** the full app: [jon-ohio-portfolio-showcase](https://github.com/jon4ohio/jon-ohio-portfolio-showcase). Workflow, allowlist, and push commands: `docs/showcase-publish.md`.

## Theme system (code-level)

The site supports three themes through CSS custom properties:

- `light`
- `warm` (default fallback)
- `dark`

Theme is applied on the root `<html data-theme="...">` and persisted with `localStorage`.

- Pre-hydration initialization: `components/ThemeScript.tsx`
- Runtime control UI: `components/ThemeToggle.tsx` (rendered in `components/Nav.tsx`)
- Token source: `app/globals.css` and `docs/theme-tokens.md`
