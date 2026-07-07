# jon-ohio-portfolio

**Start here:** [Project Entry](docs/project/entry.md) — orientation, priorities, and contract index.  
Session continuity: [Handoff](ai/handoff.md).

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

Both `dev` and `build` use **webpack** (`--webpack`) for stability and parity. If port 3000 is in use, run `npm run dev:clean` instead.

## Preview

| Goal | Command | URL |
|------|---------|-----|
| Dev (hot reload) | `npm run dev` | http://localhost:3000 |
| Dev (free port 3000 first) | `npm run dev:clean` | http://localhost:3000 |
| Production-like local | `npm run preview:local` | http://localhost:3000 |
| Production-like (free port first) | `npm run preview:local:clean` | http://localhost:3000 |

**Cursor / VS Code:** Run **Tasks: Run Task → Dev: Next.js** (or start `npm run dev`), then open http://localhost:3000 via the **Ports** view, **Simple Browser: Show** (Command Palette), or your system browser. [`.vscode/settings.json`](.vscode/settings.json) auto-forwards port 3000 and can open the browser when the dev server starts.

**Vercel:** PR previews and production deploy via `npm ci`.

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

The site supports two themes through CSS custom properties:

- `light` (default)
- `dark`

Theme is applied on the root `<html data-theme="...">` and persisted with `localStorage`. Legacy `warm` values migrate to `light`.

- Pre-hydration initialization: `components/ThemeScript.tsx`
- Runtime control UI: `components/ThemeToggle.tsx` (rendered in `components/Nav.tsx`)
- Token source: `app/globals.css` and `docs/theme-tokens.md`
