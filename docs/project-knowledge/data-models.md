# Data models

This project does **not** use a database. The “data model” is the TypeScript types and static array in `lib/projects.ts`.

## Core types

| Type | Role |
|------|------|
| `Project` | One portfolio case study: identity (`slug`, `title`), narrative (`context`, `problem`, `action`, `impact`), `metrics`, `tags`, `featured`, optional `assets` |
| `ImageAsset` | `src`, `alt`, dimensions, optional `caption` |
| `CaseStudyBlock` | Discriminated union: `image` \| `gallery` \| `callout` |
| `ProjectAssets` | Optional `thumbnails`, `hero`, ordered `blocks` for case study body |

## Storage

- **Location:** `export const projects: Project[]`
- **Cardinality:** Nine case studies (count of `slug` entries) as of the documentation scan.
- **Access:** `getProject(slug)`, `getFeaturedProjects()` — used by pages and `generateStaticParams`.

## Relationships

- **Project → blocks:** `assets.blocks?: CaseStudyBlock[]` drives `BlockRenderer` in `app/work/[slug]/page.tsx`.
- **No foreign keys** — flat list keyed by `slug`.

## Migrations

N/A. Schema changes are TypeScript refactors and content edits in the same file.

## References

- Source: `lib/projects.ts`
- ADR: `docs/adrs/ADR-002-static-in-repo-data-for-case-studies.md` (title may vary; see `docs/adrs/index.md`)
