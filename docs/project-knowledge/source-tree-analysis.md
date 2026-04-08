# Source tree analysis

**Project root:** `jon-ohio-portfolio` (monolith)

Annotated tree (build/cache dirs omitted):

```text
.
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout: metadata, JSON-LD, Nav, Footer, <main>
│   ├── globals.css           # CSS variables, animation utilities, responsive helpers
│   ├── page.tsx              # Homepage
│   ├── not-found.tsx         # 404
│   ├── robots.ts             # robots.txt (Metadata API)
│   ├── sitemap.ts            # sitemap.xml; lists routes + /work/{slug}
│   ├── about/page.tsx
│   ├── leadership/page.tsx
│   └── work/
│       ├── page.tsx           # Project index
│       └── [slug]/page.tsx    # Case study; generateStaticParams + BlockRenderer
├── components/               # Shared UI (mostly Server Components)
│   ├── Nav.tsx               # CLIENT — pathname, mobile menu
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── SystemModel.tsx
│   ├── SelectedSystems.tsx   # Homepage grouped case study links
│   └── AssetImage.tsx        # next/image + optional device frame
├── lib/
│   └── projects.ts           # Domain: Project[], types, getProject, getFeaturedProjects
├── public/                   # Static assets (e.g. work images under assets/)
├── docs/
│   ├── adrs/                 # Architecture Decision Records
│   └── project-knowledge/    # This documentation set (BMad output)
├── _bmad/bmm/
│   └── config.yaml           # BMad BMM: planning paths + project_knowledge
├── next.config.ts            # Turbopack root guard
├── vercel.json               # Vercel framework/build hints
├── package.json
├── tsconfig.json
├── postcss.config.mjs        # Tailwind v4
└── eslint.config.mjs
```

## Entry points

| Role | Path |
|------|------|
| App bootstrap | `app/layout.tsx` |
| HTTP routes | `app/**/page.tsx`, `app/robots.ts`, `app/sitemap.ts` |
| Domain data | `lib/projects.ts` |
| Client boundary | `components/Nav.tsx` |

## Critical folders

| Folder | Purpose |
|--------|---------|
| `app/` | All routes; Server Components unless file opts into client |
| `components/` | Reusable UI; keep client components rare |
| `lib/` | Typed static content and helpers only |
| `docs/adrs/` | Immutable decision history for styling and content strategy |

## Assets

- **Images:** Served from `public/` (e.g. `/assets/work/...`); case studies reference `ProjectAssets` paths.

## Integration points

**None between multiple deployable parts** — single Next.js app. Optional platform integrations: Vercel Analytics/Speed Insights (packages present; wiring optional).
