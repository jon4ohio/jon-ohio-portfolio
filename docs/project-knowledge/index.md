# Project documentation index

**BMad document-project output** — primary entry for AI-assisted work on this brownfield repo.

## Project overview

| Field | Value |
|-------|--------|
| **Name** | jon-ohio-portfolio |
| **Type** | Monolith — Next.js 16 App Router (project type: **web**) |
| **Primary language** | TypeScript |
| **Architecture** | Static portfolio; file-backed content in `lib/projects.ts` |

## Quick reference

| Item | Detail |
|------|--------|
| **Tech stack** | Next.js 16.2.2, React 19.2.4, TypeScript 5, Tailwind v4 (utilities only) |
| **Entry** | `app/layout.tsx` |
| **Content** | `lib/projects.ts` |
| **Client JS** | `components/Nav.tsx` only (by convention) |

## Generated documentation

- [Project overview](./project-overview.md)
- [Architecture](./architecture.md)
- [Source tree analysis](./source-tree-analysis.md)
- [Component inventory](./component-inventory.md)
- [Development guide](./development-guide.md)
- [Deployment guide](./deployment-guide.md)
- [API contracts](./api-contracts.md) — *no HTTP API in repo; external/contact surfaces only*
- [Data models](./data-models.md) — *TypeScript domain model + static `projects` array*

## Existing documentation (repository)

- [README.md](../../README.md) — install, commands, content editing
- [CLAUDE.md](../../CLAUDE.md) — AI/contributor architecture notes
- [ADR index](../../docs/adrs/index.md) — accepted architecture decisions

## Getting started

1. `npm ci && npm run dev` — local preview at `http://localhost:3000`
2. Edit case studies in `lib/projects.ts`
3. Run `npm run lint` and `npm run build` before shipping

## Brownfield PRD pointer

When planning site changes, attach this file or `./project-overview.md` plus `./architecture.md` as context.

## Workflow state

See [project-scan-report.json](./project-scan-report.json) for scan metadata, mode, and completed steps.
