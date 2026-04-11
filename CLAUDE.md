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
- Middleware is replaced by optional root-level `proxy.ts` when you need request interception; this repo has not added one yet.
- All pages are Server Components. `'use client'` only appears in `components/Nav.tsx` (needs `usePathname`) — add it to components when hooks require it, never to pages.

### Data layer
All project/case study data lives in **`lib/projects.ts`** as a static typed array — no database, no CMS, no API calls. Adding or editing case studies means editing this file. The `Project` interface, `getProject(slug)`, and `getFeaturedProjects()` helpers are the only data access points.

**Primary preview image (listing card + case study hero):** Use `getPrimaryPreviewImage(assets)` everywhere — it returns `hero` when set, otherwise `thumbnails[0]`. When both `hero` and `thumbnails` exist, set **`thumbnails[0]` to the same `ImageAsset` as `hero`** (same `src`, dimensions, alt), matching the IBEDC pattern. Optional second slot `thumbnails[1]` is for an extra asset only; the UI reads the primary via the helper. Placeholders: use `placeholderHero` for both `hero` and `thumbnails[0]`.

### Routing
| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Homepage with hero, metrics strip, featured work |
| `/work` | `app/work/page.tsx` | Full project list |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | Case study; uses `generateStaticParams` for SSG |
| `/about` | `app/about/page.tsx` | |
| `/leadership` | `app/leadership/page.tsx` | |
| `/robots.txt` | `app/robots.ts` | Auto-generated via Next.js Metadata API |
| `/sitemap.xml` | `app/sitemap.ts` | Auto-generated via Next.js Metadata API |

### Styling
All layout and visual styles use **inline `style` props** — not Tailwind classes. Tailwind is only used for the `animate-fade-up` / `delay-*` utility classes defined in `app/globals.css`. Do not introduce Tailwind for structural layout; maintain the inline-style convention.

`globals.css` defines CSS custom properties (`--bg`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border`, `--accent`, `--surface`) — prefer `var(--fg)` etc. in inline styles over hardcoded hex values.

### Layout
`app/layout.tsx` wraps every page with `<Nav />` and `<Footer />` from `components/`. Pages apply `paddingTop: 56` to account for the fixed nav height. Max content width is `1240px` centered with `margin: "0 auto"`.

### Path alias
`@/` resolves to the project root — use for all cross-directory imports (e.g. `@/lib/projects`, `@/components/Nav`).

## Figma MCP (optional)

Use the **official Figma MCP** (`plugin-figma-figma` in Cursor) for a two-way loop in chat: read tools pull design context from Figma; write/capture tools push or edit the canvas. The **Figma desktop MCP** is mainly read + Code Connect — use the official server for `use_figma` and `generate_figma_design`. If `whoami` succeeds, the session is authenticated.

### Site URLs (for capture into Figma)

With `npm run dev`, pass the **full URL including path** to tools like `generate_figma_design`:

| Use | URL pattern |
|-----|-------------|
| Local base | `http://localhost:3000` |
| Homepage | `http://localhost:3000/` |
| Work index | `http://localhost:3000/work` |
| Case study | `http://localhost:3000/work/<slug>` (slug from `lib/projects.ts`) |
| Other pages | `http://localhost:3000/about`, `/leadership` |

For production capture, use the deployed origin instead of localhost.

### Figma file URLs (for MCP tools)

From `https://www.figma.com/design/{fileKey}/...?node-id=1-2`:

- **`fileKey`** — first path segment after `/design/` (use branch key as `fileKey` for branch URLs).
- **`nodeId`** — convert `node-id` by replacing the hyphen between numbers with a colon (e.g. `1-2` → `1:2`).

### Which flow to use

| Goal | Tools / approach |
|------|------------------|
| Import a running page into Figma (pixel capture) | `generate_figma_design` (poll `captureId` until complete); target `newFile`, `existingFile` + `fileKey`, or `clipboard` |
| Build or edit frames with the team design system | `search_design_system` + `use_figma` (load the `figma-use` skill before `use_figma` when available) |
| Implement or align code with a Figma frame | `get_design_context` + adapt output to this repo (inline styles, `lib/projects.ts`) |
| Map components ↔ code | Code Connect tools (`get_code_connect_map`, `add_code_connect_map`, etc.) |

### Figma file hygiene (auto layout, JOP tokens, naming)

When editing or building frames in Figma for this site, follow **[`docs/figma-jop-structure.md`](docs/figma-jop-structure.md)** — auto layout defaults, **JOP** variable paths aligned with `--jop-*` in [`app/globals.css`](app/globals.css), atomic **Atom / Mol / Org / Section / Page** naming, and section frame naming. Shorthand **JOS** in design discussions means the same JOP token system. After **`get_design_context`** (Figma → code), follow **§7 Figma MCP → site** in that doc and [ADR-023](docs/adrs/ADR-023-figma-mcp-handoff-jop-tokens.md) so implementations stay on **`var(--jop-…)`**, not pasted hex.
