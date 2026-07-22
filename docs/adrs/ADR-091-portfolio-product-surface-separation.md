# ADR-091: Portfolio/Product Surface Separation (Anchor)

## Status
**Status:** Accepted  
**Date:** 2026-07-22  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** ADR-087  
**Amends:** ADR-090 (product homepage spine only; visual identity from ADR-086/088 remains)

## Context

ADR-087 made `/anchor` the sole public Anchor surface and permanently redirected `/work/anchor` to the product landing. That reduced dual-narrative maintenance while Anchor was still mostly an evolving concept.

The runtime now ships (`@jon4ohio/anchor-runtime`), the product narrative has matured, and a long-form portfolio case study exists to demonstrate systems judgment. Keeping listings pointed at the product landing conflates two jobs: hire-signal storytelling and product adoption.

**In scope:** Surface responsibilities and success metrics; canonical portfolio route; listing hrefs; product site treated as an external destination from the portfolio’s perspective; product homepage spine for `/anchor`.  
**Out of scope:** Anchor meta-repo contracts; hosted docs outside GitHub; redesigning unrelated case studies.

## Decision Drivers

- Case study succeeds when a reader says: “I’d like to work with this engineer.”
- Product site succeeds when a reader says: “I’d like to try this product.”
- One owner per truth on this site: portfolio chrome stays on the case study; adoption CTAs leave to the product site.
- Eliminate narrative duplication (no five-shift history on `/anchor`; no install walkthrough as the case study climax).

## Options Considered

### Option A: Keep ADR-087 sole surface (`/anchor` only)
- **Description:** Listings continue to open the chrome-free landing; no `/work/anchor` case study.
- **Pros:** One URL to maintain.
- **Cons:** Product page cannot optimize for adoption while also carrying hire-signal depth; case study judgment narrative has no canonical portfolio home.
- **Effort:** Low
- **Notes:** Rejected — wrong success metric for portfolio listings.

### Option B: Portfolio/Product Surface Separation *(chosen)*
- **Description:** `/work/anchor` is the canonical portfolio case study; `/anchor` is the Anchor product website. Listings, neighbors, and reading chrome stay on the case study. Product card + Explore CTA link out to `/anchor` as an external product destination (same domain, different product).
- **Pros:** Clear responsibilities; complementary CTAs; matches mature product presentation.
- **Cons:** Two surfaces to keep in sync at the link layer (not the narrative layer).
- **Effort:** Medium
- **Notes:** Product site spine: Hero → How it works → Getting Started → Learn → Why (link to case study).

### Option C: Replace `/anchor` with the case study only
- **Description:** Single long-form page at `/anchor` with portfolio chrome removed or mixed.
- **Pros:** One URL.
- **Cons:** Mixes hire narrative with adoption; breaks chrome-free product evaluation.
- **Effort:** Medium
- **Notes:** Rejected — collapses two products into one page.

## Decision

**We will use Option B** because Decision Drivers require separate success metrics and one owner per truth across surfaces.

Operating rules:

1. Canonical portfolio entry for Anchor is `/work/anchor` (case study rail + shell chrome).
2. `getProjectHref("anchor")` → `/work/anchor`.
3. `/anchor` is the product website: adoption-first; no five-shift design history.
4. Case study includes a small Product card near the hero and an Explore Anchor CTA at the end; Website href is `/anchor`.
5. Remove the permanent redirect from `/work/anchor` to `/anchor`.
6. Prev/next neighbors and reading progress stay inside `/work/*` only.

## Consequences

### Positive
- Listings open a judgment narrative suited to hiring managers.
- Product site can stay short and install-first.
- Surfaces reinforce each other without duplicating copy.

### Negative / Trade-offs
- Two routes to maintain at the link/CTA layer.
- Visitors who bookmarked `/anchor` as “the story” need the Why → case study link.

### Operational Impact
- Restore `app/work/anchor/`; add `lib/anchorCaseStudyContent.ts`; rewrite `app/anchor/page.tsx` spine; update `next.config.ts` and `lib/projects.ts`.
- **Migration / rollback:** Re-add redirect; point `getProjectHref` at `/anchor`; supersede this ADR.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Product and case study drift into retelling the same story | Med | Med | ADR ownership: case study = shifts/judgment; `/anchor` = adoption only; review on copy PRs | Owner | Duplicate section reported twice |
| Listing visitors expect install-first page | Low | Low | Product card near hero; Explore CTA; clear Website label | Owner | Feedback that “how do I install?” is hard to find |

## Review Schedule

- **Next review:** After Evidence Window close on Anchor meta-repo, or three months from Accept date
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-087 — superseded by this ADR
- ADR-086 — depends on: `/anchor` chrome-free host remains
- ADR-090 — amended: four-beat Problem/Framework/Adopt spine replaced by product homepage spine
- ADR-092 — follow-up: public Knowledge Surface at `/anchor/docs` (How)
- ADR-083 — constrains: editorial rail grammar for `/work/anchor`
- ADR-001 / ADR-007 — constrain: inline styles and page-local dark tokens on `/anchor`

## References

- Plan: Portfolio/Product Surface Separation (2026-07-22)
- Implementation: `app/work/anchor/page.tsx`, `lib/anchorCaseStudyContent.ts`, `app/anchor/page.tsx`, `lib/projects.ts` (`getProjectHref`), `next.config.ts`
- Anchor repository: https://github.com/jon4ohio/anchor
- Runtime: https://www.npmjs.com/package/@jon4ohio/anchor-runtime
