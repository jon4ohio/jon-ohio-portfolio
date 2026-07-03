# ADR-077: Knowledge graph model (Portfolio V2.2)

## Status

**Status:** Accepted  
**Date:** 2026-07-03  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

Portfolio V2.2 adds **cross-linking and discovery** within the existing information architecture ([ADR-075](ADR-075-jedi-platform-migration-preservation-first.md)). Work, Leadership, About, and Thinking remain the top-level nav. Design systems, governance, and leadership content surface as **linked nodes** — not a new `/systems` tree.

**In scope:** `lib/graph.ts` node/edge model, related content UI, `content/` extraction scaffold.  
**Out of scope:** Global navigation restructure; new top-level routes for reorganized content.

## Decision Drivers

- Seed V2.3 search and AI index with structured relationships.
- Preserve URL stability and visitor recognition.
- Keep `lib/projects.ts` as runtime source of truth during incremental extraction.
- Related content must not reorder case study editorial blocks.

## Options Considered

### Option A: New `/systems` navigation tree

- **Description:** Top-level Systems section for design-system content.
- **Pros:** Clear taxonomy for systems work.
- **Cons:** Violates preservation principle; breaks mental model.
- **Effort:** High  
- **Notes:** Rejected (aligned with cancelled ADR-076).

### Option B: In-IA knowledge graph (chosen)

- **Description:** `GraphNode` / `GraphEdge` in `lib/graph.ts`; tag-based edges plus manual curation; `RelatedContent` on case studies; `content/` JSON mirrors for incremental extraction.
- **Pros:** Discovery without IA surgery; composes with V2.3 search.
- **Cons:** Manual edge curation required for high-signal links; dual-write during extraction.
- **Effort:** Medium  
- **Notes:** Chosen.

### Option C: External CMS / headless graph DB

- **Description:** Neo4j or Notion as graph backend.
- **Pros:** Rich querying.
- **Cons:** Operational overhead; conflicts with static in-repo data ([ADR-002](ADR-002-static-in-repo-data-for-case-studies.md)).
- **Effort:** High  
- **Notes:** Rejected for V2.2.

## Decision

**We will use Option B.**

- **`lib/graph.ts`** is the canonical graph API (`getKnowledgeGraph`, `getRelatedProjects`).
- **Edges** combine tag affinity and a small manual set for flagship narratives.
- **`content/`** holds extracted mirrors; `lib/projects.ts` remains authoritative until a follow-up ADR completes migration.
- **UI:** `RelatedContent` renders below case study body, above Prev/Next — no section reordering.

## Consequences

### Positive

- Related discovery within existing routes.
- Structured input for `content-index.json` and command palette (V2.3).
- Clear path to fuller `content/` extraction without nav changes.

### Negative / Trade-offs

- Tag-only edges can produce noisy links — mitigated by manual edges and project-kind filter in `getRelatedProjects`.
- Dual-write maintenance until extraction completes.

### Operational Impact

- When adding a flagship case study, add tags and optional manual edges in `lib/graph.ts`.
- **Migration / rollback:** Remove `RelatedContent` and graph imports; no URL impact.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Tag edges surface weak related links | Med | Low | Filter to `project` kind; cap at 3; curate manual edges | John Ohio | User feedback on Related work |
| `content/` drifts from `lib/projects.ts` | Med | Med | Document dual-write in `content/README.md`; extract metadata only first | John Ohio | First full slug extraction |

## Review Schedule

- **Next review:** After V2.3 search ships or first `content/projects/` full extraction
- **Review owner:** John Ohio

## Related ADRs

- [ADR-075](ADR-075-jedi-platform-migration-preservation-first.md) — preservation-first migration; constrains IA
- [ADR-002](ADR-002-static-in-repo-data-for-case-studies.md) — static in-repo data

## References

- `lib/graph.ts`
- `content/README.md`
- Portfolio V2 preservation plan (V2.2 knowledge phase)
