# ADR-096: Anchor Essay on Medium (Off Product Chrome)

## Status
**Status:** Accepted  
**Date:** 2026-07-26  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  
**Amends:** ADR-094 (Articles chrome + Argument surface); related to ADR-092, ADR-095

## Context

ADR-094 added `/anchor/articles` as the product essay surface and placed Articles in Anchor chrome between Home and Docs. That kept the core argument next to the product page, but it also made the product nav compete with How (Docs) and Why (case study), and duplicated a long essay that already publishes well on Medium.

The product homepage now needs a thin “Read the article” affordance without owning an essay CMS. Portfolio Writing already lists external essays (Medium, Substack).

**In scope:** Remove Articles from Anchor product chrome; retarget homepage essay link to Medium; redirect old `/anchor/articles` routes; surface the essay from portfolio writing.  
**Out of scope:** Rewriting Medium content; changing Docs or case-study IA; meta-repo methodology.

## Decision Drivers

- Product chrome should stay adoption-shaped: Home, Docs, Case study.
- Essay discovery belongs with portfolio writing / Medium, not Anchor nav.
- Existing `/anchor/articles` URLs must not soft-404.

## Options Considered

### Option A: Keep `/anchor/articles` in chrome (status quo)
- **Description:** Leave ADR-094 Articles chrome and routes.
- **Pros:** First-party essay URL under `/anchor`.
- **Cons:** Product nav denser; essay CMS maintenance; overlaps Medium.
- **Effort:** Low
- **Notes:** Rejected.

### Option B: Medium + portfolio writing; redirect old routes *(chosen)*
- **Description:** Drop Articles from chrome. Homepage “Read the article →” opens Medium. Permanent redirects from `/anchor/articles` and the slug. Add essay to portfolio writing lists. Delete `app/anchor/articles/**`.
- **Pros:** Matches writing channel; thinner product chrome; preserves inbound links.
- **Cons:** Leaves product site for essay reading — mitigated by external CTA + redirects.
- **Effort:** Low
- **Notes:** Chosen.

### Option C: Move essay under `/thinking` only (no Medium)
- **Description:** Host essay as an internal portfolio note.
- **Pros:** First-party URL on portfolio.
- **Cons:** Duplicate of published Medium piece; wrong channel for this essay.
- **Effort:** Medium
- **Notes:** Rejected.

## Decision

**We will use Option B.**

**Chrome (amending ADR-094):** Home → Docs → Case study.

**Argument surface (amending ADR-094 / ADR-092 table):** the core Anchor essay lives on Medium and is discoverable via portfolio Writing (`/thinking`, homepage Writing). Product homepage may link out; it does not host Articles routes.

**Canonical Medium URL:**  
`https://medium.com/@jon4ohio/projects-become-harder-to-understand-before-they-become-harder-to-code-a49540c19de5`

**Redirects:** `/anchor/articles` and `/anchor/articles/projects-become-harder-to-understand-before-they-become-harder-to-code` → Medium URL (permanent).

## Consequences

### Positive
- Product chrome matches adoption jobs; essay lives where writing already lives.
- Inbound article links keep working via redirects.

### Negative / Trade-offs
- Essay UX is Medium’s, not product chrome — acceptable for long-form argument.

### Operational Impact
- Implement chrome, redirects, delete articles routes, sitemap/search/content-index, writing lists.
- **Migration / rollback:** Restore Articles chrome + routes via superseding ADR; remove redirects.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Medium URL or paywall friction | Low | Med | Keep free public link; homepage CTA still works if Medium is down via case study / Docs path | Owner | Broken Medium link reports |

## Review Schedule

- **Next review:** If a second Anchor essay needs a first-party product home, or three months from Accept date  
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-094 — amends: removes Articles from product chrome; Argument surface → Medium / portfolio writing
- ADR-092 — amends: Argument responsibility no longer `/anchor/articles`
- ADR-095 — related: homepage mechanism spine; essay CTA may be external

## References

- Implementation: `app/anchor/AnchorProductChrome.tsx`, `app/anchor/page.tsx`, `next.config.ts`, `lib/thinking.ts`, `app/thinking/page.tsx`, `app/page.tsx`
- Prior: [ADR-094](ADR-094-anchor-phase-one-articles-and-narrative.md)
