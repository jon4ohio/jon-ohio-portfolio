# ADR-078: Retire `/leadership` route — essay relocation to homepage Writing

## Status

**Status:** Accepted  
**Date:** 2026-07-07  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None (supersedes [ADR-041](ADR-041-leadership-mobile-philosophy-and-focus-cards.md) in effect)

## Context

The `/leadership` page had become "an article disguised as a page" — the same pattern `/thinking` followed before its primary-nav link was retired. The homepage **Writing** section (Perspectives band on `/`) already surfaces off-site essays and forthcoming pieces; a dedicated nav item duplicated that discovery job.

Because this changes the public information architecture (route table, navigation, discoverability, search index, and documentation), it qualifies as an ADR-triggering architectural decision under [ADR-008](ADR-008-adr-update-gate-for-major-pushes.md).

**In scope:** Delete `/leadership`; remove nav/footer/sitemap/search/graph references; stage leadership thesis as a forthcoming homepage Writing entry; no redirect.  
**Out of scope:** Publishing the essay (platform, URL, date filled when live); removing `/thinking` route (footer link only); editing historical ADR prose that mentions leadership incidentally.

## Decision Drivers

- Homepage Writing already handles essay discovery without a standalone route.
- Primary nav should stay minimal: Home · Work · About.
- Footer nav should match primary nav intent (Work · About).
- No dead or fabricated external links for unpublished essays.
- Search index, sitemap, and knowledge graph must not reference retired routes.
- Architectural changes must be recorded per ADR-008.

## Options Considered

### Option A: Keep `/leadership` as a standalone page

- **Description:** Retain the route and nav link; continue maintaining page copy alongside case-study leadership signals ([ADR-055](ADR-055-portfolio-leadership-signals-density.md)).
- **Pros:** URL stability ([ADR-075](ADR-075-jedi-platform-migration-preservation-first.md)); familiar bookmark for returning visitors.
- **Cons:** Duplicates homepage Writing discovery; "article as page" maintenance burden; nav clutter.
- **Effort:** Low (status quo)
- **Notes:** Rejected — IA drift; ADR-055 rejected adding new leadership sections because `/leadership` already existed; that rationale is now stale.

### Option B: Delete route; surface thesis as forthcoming homepage Writing entry (chosen)

- **Description:** Remove `/leadership` and all internal references; add "Scaling design as a system, not a service" as first item in homepage Writing using the existing forthcoming pattern (plain title, no link until published). Clean 404 for old URL.
- **Pros:** Consistent IA with `/thinking` nav retirement; single discovery surface; production-safe (no placeholder URLs).
- **Cons:** `/leadership` bookmarks 404 until essay publishes elsewhere; transient search-result 404s until re-crawl.
- **Effort:** Medium
- **Notes:** Chosen.

### Option C: 301 redirect `/leadership` → `/`

- **Description:** Delete page but redirect old URL to homepage.
- **Pros:** Soft landing for bookmarks.
- **Cons:** Homepage does not host the essay body; misleading for visitors expecting leadership content.
- **Effort:** Low
- **Notes:** Rejected — clean 404 acceptable; route was never a flagship indexed case.

## Decision

**We will use Option B** because the leadership thesis belongs in the homepage Writing discovery surface, not a standalone route, and unpublished essays must not ship with fabricated links.

- Delete [`app/leadership/page.tsx`](../../app/leadership/page.tsx).
- Nav: Home · Work · About. Footer: Work · About (remove Thinking and Leadership footer links).
- Homepage Writing: insert forthcoming entry first in list.
- Remove `/leadership` from sitemap, search index (`lib/search.ts`), knowledge graph (`topic:leadership` node + edge), a11y route list, and leadership-specific CSS ([ADR-041](ADR-041-leadership-mobile-philosophy-and-focus-cards.md) rules).
- **No redirect** in `next.config.ts`.

## Consequences

### Positive

- Nav and footer aligned; fewer redundant discovery paths.
- Essay staged without production placeholder links.
- Search, sitemap, and graph stay consistent with live routes.

### Negative / Trade-offs

- `/leadership` returns 404; ADR-075 URL-stability note for that path is superseded by this decision.
- Essay publish requires a follow-up edit to homepage Writing (platform, URL, date).

### Operational Impact

- Regenerate `public/content-index.json` via `postbuild` after `lib/search.ts` change.
- **Migration / rollback:** Restore `app/leadership/page.tsx` from git; revert nav/footer/sitemap/search/graph/CSS/docs changes.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Stale `/leadership` references in code or generated JSON | Med | Med | `grep -rn "/leadership" .` excluding `node_modules` and `.next`; verify `content-index.json` on build | Maintainer | Any IA or nav change |
| Essay remains forthcoming indefinitely on homepage | Low | Low | Handoff tracks publish as next actionable; flip to linked row when live | John Ohio | Essay publication |

## Review Schedule

- **Next review:** When essay publishes (platform, URL, date filled in homepage Writing), or 2027-07-07
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-008](ADR-008-adr-update-gate-for-major-pushes.md) — depends on: ADR gate triggered this record
- [ADR-041](ADR-041-leadership-mobile-philosophy-and-focus-cards.md) — supersedes: page-specific mobile CSS moot after route deletion
- [ADR-055](ADR-055-portfolio-leadership-signals-density.md) — constrains: rejected Option A rationale ("`/leadership` already exists") is stale; leadership signals remain in case studies
- [ADR-075](ADR-075-jedi-platform-migration-preservation-first.md) — amends: `/leadership` no longer a stable URL

## References

- [`app/page.tsx`](../../app/page.tsx) — homepage Writing section
- [`components/Nav.tsx`](../../components/Nav.tsx), [`components/Footer.tsx`](../../components/Footer.tsx)
- [`lib/search.ts`](../../lib/search.ts), [`lib/graph.ts`](../../lib/graph.ts), [`app/sitemap.ts`](../../app/sitemap.ts)
- [`ai/handoff.md`](../../ai/handoff.md)
