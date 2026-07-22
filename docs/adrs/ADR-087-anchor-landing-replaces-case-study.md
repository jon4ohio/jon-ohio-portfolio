# ADR-087: Anchor landing at `/anchor` replaces `/work/anchor` case study

## Status
**Status:** Superseded by ADR-091  
**Date:** 2026-07-16  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** ADR-085

## Context

ADR-085 hosted a five-moment editorial case study at `/work/anchor` (Setup C). ADR-086 then added a standalone adoption landing at `/anchor` (no portfolio chrome), intentionally leaving the case study in place — producing two Anchor surfaces to maintain.

The adoption landing now carries the public story. Keeping a separate portfolio case study duplicates narrative, drifts from the GitHub CTA flow, and undercuts the “one memorable entry” goal.

**In scope:** Canonical public URL for Anchor on this site; catalog listing hrefs; permanent redirect from `/work/anchor`; removal of the case-study route package.  
**Out of scope:** Changing Anchor’s contract model or repository docs; redesigning the `/anchor` landing sections; removing Anchor from Case Studies / Selected Work listings.

## Decision Drivers

- Single memorable public entry: `/anchor` → GitHub.
- Keep Anchor discoverable from home and `/work` without portfolio chrome on the destination.
- Preserve SEO/bookmarks via permanent redirect from `/work/anchor`.
- Stop maintaining two Anchor-themed narratives (ADR-086 trade-off).

## Options Considered

### Option A: Keep both routes (ADR-086 coexistence)
- **Description:** Leave `/work/anchor` case study and `/anchor` landing as separate surfaces.
- **Pros:** Catalog rows stay true case-study URLs; adoption and portfolio framing stay distinct.
- **Cons:** Two surfaces to align; visitors hit different stories depending on entry point.
- **Effort:** Low (status quo)
- **Notes:** Rejected — dual-surface cost outweighs framing distinction.

### Option B: Landing replaces case study; listings link to `/anchor`
- **Description:** Delete `app/work/anchor/`; permanent redirect `/work/anchor` → `/anchor`; home and `/work` rows keep Anchor but href `/anchor` via shared `getProjectHref`.
- **Pros:** One public story; listings still discover Anchor; redirect preserves old links.
- **Cons:** Catalog “case study” rows open a chrome-free product landing (IA slightly atypical).
- **Effort:** Low
- **Notes:** Chosen. Listing copy stays problem-first; landing owns product framing.

### Option C: Remove Anchor from catalog; `/anchor` direct-only
- **Description:** Drop home/`/work` rows; only `/anchor` and external links reach the landing.
- **Pros:** Cleanest IA (no case-study row to a non-case-study page).
- **Cons:** Loses Selected Work / Case Studies discovery.
- **Effort:** Low
- **Notes:** Rejected — owner wants listings retained.

## Decision

**We will use Option B** because Decision Drivers require one canonical surface (`/anchor`) while keeping catalog discovery and a permanent redirect for `/work/anchor`.

Operating rules:

- Canonical URL is `/anchor` (ADR-086 route + SiteShell remain).
- Catalog, search, graph, and sitemap use `getProjectHref("anchor")` → `/anchor`.
- `/work/anchor` permanently redirects to `/anchor`.
- Case-study package under `app/work/anchor/` is removed; listing thumb assets under `public/assets/work/anchor/` may remain.

## Consequences

### Positive
- One Anchor narrative and design surface to maintain.
- Listings still surface Anchor on home and `/work`.
- Old `/work/anchor` URLs keep working via 308/301 redirect.

### Negative / Trade-offs
- Featured “case study” rows open a product landing without Nav/Footer — acceptable for this open-source entry.
- ADR-086’s “do not change `/work/anchor`” coexistence rule is superseded for the case-study route (landing + SiteShell stay).

### Operational Impact
- Add `getProjectHref` in `lib/projects.ts`; wire home, `/work`, search, graph, sitemap.
- `next.config.ts` redirect; delete `app/work/anchor/`.
- Exclude `anchor` from `app/work/[slug]` static params / render.
- **Migration / rollback:** Restore case-study route from git; remove redirect; revert href helper; supersede this ADR.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Catalog visitors expect rail-style case study, bounce on product landing | Med | Low | Keep problem-first listing copy; landing hero states value in first viewport; GitHub CTA above the fold | Owner | Bounce/feedback on `/anchor` from portfolio referrals |
| Stale absolute `/work/anchor` links in content-index or third parties | Low | Low | Permanent redirect; regenerate `content-index` / sitemap on deploy | Owner | 404 reports for `/work/anchor` |

## Review Schedule

- **Next review:** After first external adopter signal, or three months from Accept date  
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-085 — superseded by this ADR (Setup C case study at `/work/anchor`)
- ADR-086 — depends on: `/anchor` landing + SiteShell remain the implementation host
- ADR-091 — supersedes this ADR (Portfolio/Product Surface Separation)
- ADR-001 — constrains: inline styles on `/anchor`
- ADR-007 — constrains: page-local dark tokens on `/anchor`; shell theme unchanged

## References

- Implementation: `app/anchor/page.tsx`, `components/SiteShell.tsx`, `lib/projects.ts` (`getProjectHref`), `next.config.ts` redirects
- Prior case study (removed): `app/work/anchor/`
- Anchor repository: https://github.com/jon4ohio/anchor
