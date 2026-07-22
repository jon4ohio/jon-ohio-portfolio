# ADR-093: Product Surface Independent of Implementation Workspace

## Status
**Status:** Accepted  
**Date:** 2026-07-22  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  
**Amends:** ADR-092 (tightens the private-repo release criterion to a full public journey); related to ADR-091

## Context

ADR-091 separated portfolio judgment (`/work/anchor`) from product adoption (`/anchor`). ADR-092 established `/anchor/docs` as the public How surface and demoted GitHub from the primary journey.

The product experience has continued to mature: runtime-centric onboarding, install-then-adopt messaging, and a published npm package. The remaining ambiguity is whether GitHub remains part of the *product* or only the *engineering workspace*. Treating “make the repo private” as the decision would be too narrow — the real claim is about independence of surfaces.

**In scope:** Product vs implementation layers; docs IA including Build (with Anchor) and public Release Notes; journey acceptance criterion for when GitHub may leave the public path.  
**Out of scope:** Flipping GitHub visibility in this ADR; renaming the implementation repository; extracting a turborepo `apps/` layout; `anchor.dev` DNS or an `anchor-dev` organization.

## Decision Drivers

- A first-time adopter must be able to discover, understand, install, initialize, and begin using Anchor without visiting GitHub.
- The product name is Anchor; the repository is an implementation workspace — renaming is optional churn unless another repo needs the `anchor` name.
- Release notes for users must survive a private implementation repository (GitHub Releases would not).
- Promote docs routes only when a section acquires an independent responsibility (ADR-092 promotion rule).
- Capabilities over copies — keep portfolio and Anchor product in one frontend codebase until branding cadence requires otherwise.

## Options Considered

### Option A: Keep GitHub as co-equal product surface
- **Description:** README, Experience trees, and GitHub Releases remain primary for onboarding and release communication.
- **Pros:** Single source for engineering and marketing.
- **Cons:** Product journey depends on repository visibility and layout; private-repo becomes a product break.
- **Effort:** Low
- **Notes:** Rejected — conflicts with ADR-091/092 progression.

### Option B: Empty public GitHub repo for README-only discovery
- **Description:** Hollow public repo pointing at docs; real code private.
- **Pros:** Familiar GitHub discovery URL.
- **Cons:** Feels incomplete (“where’s the code?”); duplicates the product site.
- **Effort:** Medium
- **Notes:** Rejected — incoherent public story.

### Option C: Product surface independent of implementation workspace *(chosen)*
- **Description:** Canonical public surface is website + documentation + npm. The implementation repository is an engineering workspace (may remain public or become private later without changing the decision). Public release notes live at `/anchor/docs/releases`. Build docs answer “how do I build *with* Anchor?”
- **Pros:** Matches Stage 2 separation patterns; survives private engine; clear adopter journey.
- **Cons:** Docs must stay complete enough that GitHub is optional.
- **Effort:** Medium
- **Notes:** Chosen.

## Decision

**We will use Option C.**

**Decision statement:** The product surface is independent of the implementation workspace.

**Layers:**

| Layer | Responsibility | Surface |
|-------|----------------|---------|
| Public Experience | Discover, understand, build with Anchor | `/anchor`, `/anchor/docs`, `/anchor/docs/releases` |
| Stable Runtime | Installable distribution | `@jon4ohio/anchor-runtime` (npm) |
| Implementation workspace | Source, prompts, experiments, internal ADRs | `jon4ohio/anchor` (engineering; visibility is a consequence) |

**Journey criterion:** A first-time adopter can successfully discover, understand, install, initialize, and begin using Anchor without visiting GitHub.

**Build docs:** Answer “How do I build *with* Anchor?” — not “How do I build the Anchor engine?”

**Release notes:** `/anchor/docs/releases` is the public source of truth. GitHub Releases are an engineering artifact.

**Rename:** Do not rename the implementation repository solely for clarity. Rename (e.g. to `anchor-engine`) only if another repository needs the `anchor` name.

## Consequences

### Positive
- Completes the ADR-091 → ADR-092 progression: GitHub is no longer required as a product surface.
- Private-repo (or multi-repo / `anchor.dev` / org) remains compatible with the same decision.
- Release communication survives repository visibility changes.

### Negative / Trade-offs
- Public How content must be maintained on the portfolio product surface.
- Engineering GitHub Releases and public release notes can drift without a publish checklist.

### Operational Impact
- Expand `/anchor/docs` with Build; ship `/anchor/docs/releases`; retarget Anchor README primary CTAs to the product site.
- **Migration / rollback:** Supersede with an ADR restoring GitHub as primary How; remove Build/Releases routes if abandoned.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Docs incomplete → adopters still hit GitHub | Med | High | Journey criterion checklist before private cutover | Owner | Adopter reports needing GitHub for onboarding |
| Build section leaks implementation detail | Low | Med | Editorial rule: build *with*, never build *the engine* | Owner | Prompt/source paths appear in Build |

## Review Schedule

- **Next review:** When evaluating private-repo cutover, or three months from Accept date  
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-091 — depends on: portfolio/product surface split
- ADR-092 — amends: private-repo criterion → full public journey; How surface remains `/anchor/docs`
- ADR-086 — constrains: chrome-free `/anchor` host

## References

- Plan: Product surface independent of implementation workspace (2026-07-22)
- Product: https://johnohio.vercel.app/anchor
- Docs: https://johnohio.vercel.app/anchor/docs
- Runtime: https://www.npmjs.com/package/@jon4ohio/anchor-runtime
