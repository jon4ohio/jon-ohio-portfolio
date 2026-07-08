# ADR-082: On-site field notes route (`/notes/[slug]`)

## Status

**Status:** Accepted  
**Date:** 2026-07-08  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

The portfolio documents evolving practice — not only finished case studies. A long-form essay, *Design Doesn't End in Figma Anymore*, describes how the site itself is built with AI-assisted design and implementation. That content belongs **on-site**, not on an external platform.

[ADR-079](ADR-079-retire-leadership-route-essay-relocation.md) retired `/leadership` because that thesis was staged for **external** publication and duplicated nav discovery. Field notes are a distinct category: first-party practice essays hosted in the portfolio, discovered via homepage Writing and `/thinking`, without a primary-nav link.

**In scope:** `/notes/[slug]` route, `lib/fieldNotes.ts` content layer, homepage Writing discovery, search/sitemap/graph wiring, placeholder figures until assets land.  
**Out of scope:** Primary nav changes; markdown/MDX dependency; publishing the separate leadership essay (still forthcoming per ADR-079).

## Decision Drivers

- Practice essays that document the portfolio's own workflow should live on-site.
- Homepage Writing already serves essay discovery without nav clutter (ADR-079 pattern).
- Content must follow existing conventions: typed data in `lib/`, inline styles, Server Components, SSG via `generateStaticParams`.
- Search index, sitemap, and knowledge graph must stay consistent with live routes.
- Image assets may ship later; dashed placeholders are acceptable at launch.

## Options Considered

### Option A: External publication only (Substack / Medium)

- **Description:** Publish the essay off-site; link from homepage Writing like other external writing.
- **Pros:** No new route or maintenance; consistent with ADR-079 external-essay pattern.
- **Cons:** Essay is meta-documentation of this repo — off-site breaks the "portfolio as record of practice" intent.
- **Effort:** Low
- **Notes:** Rejected for this essay category.

### Option B: On-site `/notes/[slug]` without primary-nav link (chosen)

- **Description:** Typed content in `lib/fieldNotes.ts`, dynamic route `app/notes/[slug]/page.tsx`, discovery via homepage Writing (first row) and `/thinking` Field notes band.
- **Pros:** Self-contained; SEO/canonical on portfolio; reuses long-form layout patterns; scalable for future field notes.
- **Cons:** New IA surface to maintain; ADR-079 "no standalone essay routes" needs category distinction.
- **Effort:** Medium
- **Notes:** Chosen.

### Option C: Restore standalone `/leadership`-style top-level route per essay

- **Description:** One route per essay at top level (e.g. `/design-doesnt-end-in-figma`).
- **Pros:** Short URLs.
- **Cons:** Flat route table; harder to scale; revives "article as page" pattern ADR-079 rejected.
- **Effort:** Medium
- **Notes:** Rejected.

## Decision

**We will use Option B** because on-site field notes document portfolio practice in context, and homepage Writing provides discovery without nav bloat.

- Add [`lib/fieldNotes.ts`](../../lib/fieldNotes.ts) and [`app/notes/[slug]/page.tsx`](../../app/notes/[slug]/page.tsx).
- Homepage Writing: first row links internally to `/notes/design-doesnt-end-in-figma`.
- `/thinking`: Field notes band above external Substack writing.
- Wire sitemap, search (`kind: "note"`), knowledge graph, and a11y route list.
- Figures use `AnnotatedFigure` placeholders until files exist under `public/images/notes-ai/`.
- **No** primary-nav item.

## Consequences

### Positive

- Practice documentation lives where it applies — the portfolio itself.
- Scalable pattern for future field notes via `lib/fieldNotes.ts`.
- Discovery aligned with ADR-079 (homepage Writing, no nav link).

### Negative / Trade-offs

- Two essay categories (on-site field notes vs external/forthcoming writing) require maintainer clarity.
- Four figure assets still needed for full visual fidelity.

### Operational Impact

- Add field notes by extending `fieldNotes[]` in `lib/fieldNotes.ts`; `generateStaticParams` picks up new slugs automatically.
- Swap placeholders: drop PNGs in `public/images/notes-ai/` — `AnnotatedFigure` resolves when files exist.
- **Migration / rollback:** Delete `app/notes/` and `lib/fieldNotes.ts`; revert homepage/thinking/search/sitemap/graph changes.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Field notes route table grows without content discipline | Low | Med | One essay per slug; review in handoff before adding notes | John Ohio | Each new field note |
| Placeholder figures linger past asset delivery | Med | Low | Handoff tracks image swap; set `imageSrc` in `lib/fieldNotes.ts` | John Ohio | Asset drop |

## Review Schedule

- **Next review:** When second field note is added, or 2027-07-08
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-079](ADR-079-retire-leadership-route-essay-relocation.md) — constrains: external/forthcoming essays vs on-site field notes are distinct categories
- [ADR-008](ADR-008-adr-update-gate-for-major-pushes.md) — depends on: ADR gate triggered this record
- [ADR-077](ADR-077-knowledge-graph-model.md) — extends: graph includes `note:` nodes

## References

- [`lib/fieldNotes.ts`](../../lib/fieldNotes.ts)
- [`app/notes/[slug]/page.tsx`](../../app/notes/[slug]/page.tsx)
- [`app/page.tsx`](../../app/page.tsx) — homepage Writing
- [`app/thinking/page.tsx`](../../app/thinking/page.tsx) — Field notes band
- Source draft: `notes-ai_2.md` (author workspace)
