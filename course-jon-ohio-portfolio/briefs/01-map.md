# Module 1: The Map of the Machine

### Teaching Arc
- **Metaphor:** A documentary crew's floor plan of a TV studio — you see the set (the portfolio), but the brief shows all the rooms, crew, and cables that make the broadcast happen.
- **Opening hook:** "You visit johnohio.design and see a clean portfolio. Under the hood, 11 TypeScript files run in about 50ms to build that page from scratch — every single time."
- **Key insight:** A Next.js App Router site is a machine with five distinct parts: the data layer (lib/), the pages (app/), the UI pieces (components/), the assets (public/), and the global wiring (layout + globals.css). Every change you ever make will land in one of these five buckets.
- **"Why should I care?":** If you know the five buckets, you can always tell an AI coding agent *exactly* where to look. "Change the nav" → components/Nav.tsx. "Add a project" → lib/projects.ts. No more "just fix it" prompts.

### Code Snippets (pre-extracted)

File: app/layout.tsx (lines 129-168)
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="warm" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <a href="#main" className="skip-link">Skip to main content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
```

File: app/sitemap.ts (lines 11-28)
```ts
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();
  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/thinking`, lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    ...projects.map((p) => ({
      url: `${baseUrl}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
```

### Interactive Elements

- [x] **Code↔English translation** — use the layout.tsx snippet above. Left: code. Right: plain-English line-by-line.
- [x] **Data flow animation** — The "page load" journey. Actors: Browser, Next.js, layout.tsx, page.tsx, HTML Response. Steps:
  1. Browser sends a request to johnohio.design (highlight Browser)
  2. Next.js receives it and picks the right page file (highlight Next.js)
  3. layout.tsx wraps everything: Nav + main slot + Footer (highlight layout.tsx)
  4. The matching page.tsx fills the main slot (highlight page.tsx)
  5. Finished HTML flies back to the browser (packet: page.tsx → Browser)
- [x] **Quiz** — 3 scenario questions. All "where would you look?" style:
  Q1: "You want to change the nav links. Which file?" (options: lib/projects.ts / components/Nav.tsx / app/layout.tsx / app/globals.css). Correct: components/Nav.tsx
  Q2: "You want to add a new case study to the /work page. Which file holds the project data?" Correct: lib/projects.ts
  Q3: "The footer shows wrong contact info. Where do you look?" (options: app/layout.tsx / components/Footer.tsx / lib/projects.ts / app/page.tsx). Correct: components/Footer.tsx
- [x] **Visual file tree** — show the folder structure with colour-coded buckets: lib/ (teal), app/ (amber), components/ (plum), public/ (green), config files (gray)
- [x] **Pattern cards** — Five "buckets" as icon+label cards: Data Layer, Pages & Routes, UI Pieces, Static Assets, Global Wiring

### Reference Files to Read
- `references/interactive-elements.md` → "Data Flow / Message Flow Animation", "Multiple-Choice Quizzes", "Visual File Tree", "Pattern/Feature Cards", "Code ↔ English Translation Blocks"
- `references/content-philosophy.md` → always include
- `references/gotchas.md` → always include

### Connections
- **Previous module:** none — this is the opener
- **Next module:** Module 2 — How Pages Find Their Place (routing deep-dive)
- **Tone/style notes:** Accent is teal (#2A7B9B). Actor colors: Browser = actor-1 (teal), Next.js = actor-2 (plum), layout.tsx = actor-3 (amber), page.tsx = actor-4 (forest). Module 1 uses --color-bg (off-white). Course title: "Inside John Ohio's Portfolio". Module number: 01.
