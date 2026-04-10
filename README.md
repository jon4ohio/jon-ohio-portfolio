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

## Theme system (code-level)

The site supports three themes through CSS custom properties:

- `light`
- `warm` (default fallback)
- `dark`

Theme is applied on the root `<html data-theme="...">` and persisted with `localStorage`.

- Pre-hydration initialization: `components/ThemeScript.tsx`
- Runtime control UI: `components/ThemeToggle.tsx` (rendered in `components/Nav.tsx`)
- Token source: `app/globals.css` and `docs/theme-tokens.md`
