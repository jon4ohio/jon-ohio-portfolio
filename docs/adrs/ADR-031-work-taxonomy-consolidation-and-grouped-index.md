# ADR-031: Work taxonomy consolidation and grouped index

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Superseded by ADR-037  
**Date:** 2026-04-13  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

Project taxonomy in this portfolio is expressed as `Project.category` in [`lib/projects.ts`](../../lib/projects.ts) and is surfaced across the site: `/work` rows, `/work/[slug]` hero labels, and JSON-LD schema `about` on case study pages. The existing taxonomy mixed dimensions (phase vs capability vs domain) and created multiple single-project categories, reducing navigational value and diluting the positioning language already used on the homepage (“how systems evolve”).

The `/work` page had grown into a flat list where per-row category labels functioned as decoration rather than navigation. The homepage “Selected Systems” is a positioning surface, not an index; it should encourage deeper exploration without duplicating `/work`.

**In scope:** Canonical category strings in `Project.category`; grouping/navigation for `/work`; homepage “Selected Systems” category headings and curated inclusion/exclusion; downstream schema alignment via `Project.category`.  
**Out of scope:** Changing `Project` data shape beyond category values; new CMS/data source (ADR-002); changing case study route structure; new filtering UI beyond section grouping.  

## Decision Drivers

- **Single source of truth:** `Project.category` must be the literal strings used everywhere (UI + schema), avoiding mapping layers.  
- **Navigability at scale:** `/work` must remain scannable as the project count grows beyond 10 (targeting 12–14+).  
- **Positioning alignment:** Category headings should match the “systems evolve” arc already used on the homepage (structure → scale → intelligence).  
- **Editorial intent:** Homepage is a teaser surface; it should not replace `/work` as the full index.  
- **Consistency:** Homepage and `/work` should share the same grouping language to avoid an “unfinished” feel.  

## Options Considered

### Option A: Keep current categories and flat `/work` list
- **Description:** Leave `Project.category` as-is (mixed taxonomy, singletons) and keep `/work` a single list with per-row category labels.
- **Pros:**
  - No refactor risk; minimal change surface
  - Preserves current scan pattern at 10 items
- **Cons:**
  - Taxonomy remains inconsistent and non-parallel
  - Singletons fragment the page and weaken information scent
  - `/work` becomes harder to navigate as the list grows
- **Effort:** Low
- **Notes:** Rejected due to taxonomy drift and future scalability.

### Option B: Consolidate to four “Systems” categories and group `/work` into sections (chosen)
- **Description:** Normalize `Project.category` to four parallel buckets and render `/work` as a grouped index with section headings. Curate the homepage “Selected Systems” to show only 3 lifecycle stages (Structured/Scalable/Intelligent) with two projects each, and omit `0→1 Systems` from homepage while keeping it on `/work`.
- **Pros:**
  - Consistent, parallel mental model across all content surfaces
  - Section headings provide real navigation and self-selection
  - Homepage communicates maturity/scale first without becoming an index
  - Schema remains aligned automatically via the data field
- **Cons:**
  - Requires careful ordering and numbering rules to preserve the “01–10” volume cue
  - Editorial curation for homepage picks is manual and must be maintained over time
- **Effort:** Medium
- **Notes:** Requires migrating existing project category strings.

## Decision

**We will use Option B because it maximizes navigability and positioning coherence while keeping taxonomy as a single source of truth.**

`Project.category` will use exactly these literal strings everywhere: **Structured Systems**, **Scalable Systems**, **Intelligent Systems**, **0→1 Systems**. The `/work` page will be grouped into these four sections with continuous global numbering. The homepage “Selected Systems” will feature only **Structured/Scalable/Intelligent** (two projects each) with a clear **“View all →”** path to `/work`, leaving `0→1 Systems` discoverable on `/work` only.

## Consequences

### Positive
- Clear and parallel taxonomy improves scan comprehension and reduces cognitive load.
- `/work` becomes a navigable index that scales with additional projects.
- Homepage reinforces the “systems evolve” positioning without overwhelming with a full archive.
- JSON-LD `about` remains consistent with UI without additional wiring.

### Negative / Trade-offs
- Homepage curation requires periodic updates to keep “top 2” per category representative.
- Category reclassification may slightly change how returning visitors mentally bucket older work.

### Operational Impact
- **Maintenance:** Category strings must remain one of the four literals; adding new projects should assign one of these categories (or trigger a new ADR if taxonomy must change). Homepage picks are managed via an explicit slug list in `app/page.tsx`.
- **Migration / rollback:** Revert `Project.category` values and restore flat `/work` list rendering; homepage can revert to previous `systemGroups` definitions.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Category creep (new one-off categories reintroduced) | Med | Med | Treat the 4 literals as a gate; require a new ADR before adding a fifth category | Maintainer | New project that doesn’t clearly fit one bucket |
| Homepage curation drifts from strongest work as portfolio grows | Med | Med | Keep picks in one constant list; review quarterly or when adding a new flagship case study | Maintainer | Adding a new “featured” case study |
| Global numbering implementation becomes unstable if `/work` is later made a Client Component | Low | Low | Keep `/work` as a Server Component; if client-side, compute indexes from derived data rather than mutating counters | Maintainer | Refactor that introduces `'use client'` in `/work` |

## Review Schedule

- **Next review:** 2026-07-01 or when total projects ≥ 14  
- **Review owner:** Maintainer  

## Related ADRs

- ADR-002 — constrains: case study data remains static in `lib/projects.ts`
- ADR-018 — related: homepage Selected Systems grouped presentation and entry-point parity
- ADR-024 — related: homepage positioning language and metadata alignment

## References

- [`lib/projects.ts`](../../lib/projects.ts) — `Project.category` single source of truth
- [`app/work/page.tsx`](../../app/work/page.tsx) — grouped `/work` sections + global numbering
- [`app/page.tsx`](../../app/page.tsx) — curated homepage “Selected Systems” (3 categories only)
