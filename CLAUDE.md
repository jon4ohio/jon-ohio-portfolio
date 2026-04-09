# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

**Live preview (Cursor / VS Code):** With `npm run dev` running, open http://localhost:3000 — use the **Ports** view to forward/open the app if prompted, **Simple Browser: Show** from the Command Palette, or your system browser. Workspace settings (`.vscode/settings.json`) label port **3000** and request **open browser** on auto-forward when the editor supports it.

No test suite is configured.

## Architecture

**Next.js 16 App Router** portfolio site for John Ohio (product designer). Stack: Next.js 16.2.2, React 19.2.4, Tailwind CSS v4, TypeScript. Deployed on Vercel.

### Key Next.js 16 differences
- `params` in page/layout components is a **`Promise`** — always `await params` before accessing properties.
- Middleware is replaced by `proxy.ts` (none configured yet).
- `'use client'` is absent from all pages — everything is a Server Component.

### Data layer
All project/case study data lives in **`lib/projects.ts`** as a static typed array — no database, no CMS, no API calls. Adding or editing case studies means editing this file. The `Project` interface, `getProject(slug)`, and `getFeaturedProjects()` helpers are the only data access points.

### Routing
| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Homepage with hero, metrics strip, featured work |
| `/work` | `app/work/page.tsx` | Full project list |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | Case study; uses `generateStaticParams` for SSG |
| `/about` | `app/about/page.tsx` | |
| `/leadership` | `app/leadership/page.tsx` | |

### Styling
All layout and visual styles use **inline `style` props** — not Tailwind classes. Tailwind is only used for the `animate-fade-up` / `delay-*` utility classes defined in `app/globals.css`. Do not introduce Tailwind for structural layout; maintain the inline-style convention.

### Layout
`app/layout.tsx` wraps every page with `<Nav />` and `<Footer />` from `components/`. Pages apply `paddingTop: 56` to account for the fixed nav height. Max content width is `1120px` centered with `margin: "0 auto"`.
