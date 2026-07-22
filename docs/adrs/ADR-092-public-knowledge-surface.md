# ADR-092: Public Knowledge Surface Independent of Implementation Repository

## Status
**Status:** Accepted  
**Date:** 2026-07-22  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  
**Amends:** ADR-086 / ADR-090 GitHub-as-docs funnel assumptions; related to ADR-091

## Context

ADR-091 separated portfolio judgment (`/work/anchor`) from product adoption (`/anchor`). The product page still sent “Learn” and documentation CTAs to GitHub blob URLs. That kept the implementation repository in the primary user journey and blocked a coherent path to treating the repo as an implementation workspace (including a future private-repo option).

**In scope:** Principle that public knowledge is a first-class surface; minimum Why / What / How responsibilities; `/anchor/docs` as the How surface; GitHub demotion from the primary journey.  
**Out of scope:** Making `jon4ohio/anchor` private; multi-route docs IA; full Experience migration; separate docs domain.

## Decision Drivers

- Public knowledge must remain available if the implementation repository becomes private or reorganized.
- Organize public knowledge by user responsibilities, not repository artifacts (README, ADR numbers, file paths).
- Promote only after repetition — do not invent six documentation routes by anticipation.
- Product introduces adoption; Documentation owns adoption (no permanent Getting Started duplication).

## Options Considered

### Option A: Keep GitHub as documentation host
- **Description:** Continue linking Learn / Docs to repository trees and blobs.
- **Pros:** Zero new pages; source of truth stays in one git tree.
- **Cons:** Primary journey depends on public GitHub; repository layout remains the product interface.
- **Effort:** Low
- **Notes:** Rejected — conflicts with Capability/runtime evolution and readiness for private implementation.

### Option B: Multi-route Knowledge Surface (`/start`, `/concepts`, …)
- **Description:** Ship six documentation routes under `/anchor` immediately.
- **Pros:** Clean IA sketch; room to grow.
- **Cons:** Speculative boundaries; maintenance load before demand.
- **Effort:** High
- **Notes:** Rejected for v1 — promote sections only when they acquire independent responsibility.

### Option C: Minimum How surface at `/anchor/docs` *(chosen)*
- **Description:** Establish Why / What / How. Ship a single `/anchor/docs` page with in-page sections (Getting Started, Concepts, Architecture, Reference). Retarget product and case-study docs links there. Demote GitHub from primary CTAs.
- **Pros:** Satisfies independence principle; earned responsibilities only; flexible for later promotion.
- **Cons:** Thin content initially; must avoid duplicating install walkthrough on product and docs.
- **Effort:** Medium
- **Notes:** Chosen.

## Decision

**We will use Option C.**

**Principles (invariants):**

1. Public knowledge is a first-class product surface independent of the implementation repository.
2. Public knowledge is organized by user responsibilities rather than repository artifacts.

**Minimum stable public responsibilities:**

| Responsibility | Surface |
|---|---|
| Why | `/work/anchor` |
| What | `/anchor` |
| How | `/anchor/docs` |

**Ownership:** Product introduces adoption; Documentation owns adoption. `/anchor/docs` is the canonical Getting Started.

**Promotion rule:** Promote a docs section to its own route only when it acquires an independent responsibility (distinct audience/task), not because of page length.

**Release criterion:** A first-time adopter can successfully discover, understand, install, initialize, and begin using Anchor without visiting GitHub (tightened by [ADR-093](ADR-093-product-surface-independent-of-implementation-workspace.md)). Only then is making the implementation repository private an implementation/collaboration decision rather than a product decision.

## Consequences

### Positive
- Documentation becomes the public interface for How.
- GitHub can leave the primary journey while the repo remains public.
- Future private-repo choice does not break the product experience.

### Negative / Trade-offs
- Public docs content must be maintained on the portfolio product surface (thin at first).
- Risk of Getting Started drift between product intro and docs — mitigated by ownership rule.

### Operational Impact
- Implement `/anchor/docs`, shared Product/Docs chrome, retarget Learn/Docs CTAs.
- **Migration / rollback:** Restore GitHub Learn links; remove `/anchor/docs`; supersede this ADR.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Product and Docs both grow full install guides | Med | Med | Ownership sentence in ADR; product Getting Started is intro + link only | Owner | Duplicate install steps reported |
| Thin docs feel unfinished vs GitHub Experience | Med | Low | Label maturity; incremental content; Evidence Window honesty | Owner | Adopter feedback that docs are insufficient |

## Review Schedule

- **Next review:** After first independent adopter path, or three months from Accept date  
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-091 — depends on: portfolio/product surface split
- ADR-093 — follow-up: product surface independent of implementation workspace (journey criterion + releases SOT)
- ADR-086 / ADR-090 — amends: GitHub-primary documentation funnel
- ADR-001 / ADR-007 — constrain: inline styles and page-local dark tokens under `/anchor`

## References

- Plan: Knowledge Surface v1 — minimum earned surface (2026-07-22)
- Implementation: `app/anchor/docs/page.tsx`, `app/anchor/layout.tsx`, `lib/anchorDocsContent.ts`
- Runtime: https://www.npmjs.com/package/@jon4ohio/anchor-runtime
