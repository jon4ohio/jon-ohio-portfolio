# ADR-094: Anchor Phase 1 Articles Surface and Project-Understanding Narrative

## Status
**Status:** Accepted (amended by ADR-095, ADR-096)  
**Date:** 2026-07-25  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  
**Amends:** ADR-091 (product homepage spine/copy); ADR-092 (adds Articles as a public knowledge responsibility); related to ADR-093  
**Amended by:** [ADR-095](ADR-095-anchor-homepage-mechanism-spine.md) (homepage mechanism spine); [ADR-096](ADR-096-anchor-essay-on-medium.md) (Articles leave product chrome; essay on Medium / portfolio writing)

## Context

ADR-091–093 established portfolio/product separation, a minimum How surface at `/anchor/docs`, and independence of the product surface from the implementation workspace. The live `/anchor` product page still mixed adoption CTAs with a denser Learn/How framing, and public chrome still implied source-browsing / open-source trust signals that conflict with treating GitHub as an engineering workspace.

Phase 1 source cleanup needs a durable home for the core argument (“projects become harder to understand before they become harder to code”) without stuffing essays into Docs or the case study, and needs the product homepage to lead with project understanding rather than repository discovery.

**In scope:** `/anchor/articles` as a public essay surface; product homepage narrative spine and trust/source claim scoping; chrome nav order for Home / Articles / Docs / Case study.  
**Out of scope:** Making the implementation repository private; multi-article CMS; changing `/work/anchor` case-study judgment narrative; docs IA beyond chrome labels and footer trust copy.

## Decision Drivers

- Essays arguing *why* project understanding matters must not compete with Docs (How) or the portfolio case study (Why hire).
- Product homepage succeeds when a reader can state the problem and take a first step without browsing source.
- Public trust copy must not claim open-source / browse-the-source when the product journey is website + docs + npm (ADR-093).
- Promote a new route only when it has an independent responsibility (ADR-092 promotion rule).

## Options Considered

### Option A: Keep essays inside `/anchor/docs` or the product page
- **Description:** Publish the core argument as a docs section or long homepage block; no `/anchor/articles` routes.
- **Pros:** Fewer routes; reuses existing How surface.
- **Cons:** Mixes persuasive essay with procedural How; bloated product page; violates one-responsibility-per-surface.
- **Effort:** Low
- **Notes:** Rejected — Docs owns adoption procedure; essays are a distinct audience/task.

### Option B: Host essays only on the portfolio Writing / field-notes surface
- **Description:** Publish under `/notes` or homepage Writing with portfolio chrome.
- **Pros:** Reuses existing writing infrastructure.
- **Cons:** Portfolio chrome and hire-signal context undercut product adoption; essays would not sit beside Docs/Product in Anchor chrome.
- **Effort:** Medium
- **Notes:** Rejected — product argument belongs on the product surface.

### Option C: Dedicated `/anchor/articles` surface + Phase 1 narrative cleanup *(chosen)*
- **Description:** Add `/anchor/articles` (index + article routes) for standalone product essays. Restructure `/anchor` to a Home → Problem → Proof → Start spine with project-understanding framing. Scope public trust/source claims (e.g. “Runtime on npm”; no MIT/open-source browse claims on product docs chrome). Expose Articles in Anchor product chrome between Home and Docs.
- **Pros:** Clear responsibility split; matches ADR-092 promotion rule; aligns public claims with ADR-093 layers.
- **Cons:** Another route family to maintain; article index starts thin.
- **Effort:** Medium
- **Notes:** Chosen for Phase 1.

## Decision

**We will use Option C.**

**Public knowledge responsibilities (amending ADR-092 table):**

| Responsibility | Surface |
|---|---|
| Why (hire / judgment) | `/work/anchor` |
| What (product) | `/anchor` |
| Argument (essays) | `/anchor/articles` |
| How (adoption) | `/anchor/docs` (+ `/anchor/docs/releases`) |

**Product homepage spine:** Home → Problem → Proof → Start. Lead with project understanding and continuity; keep install/start practical; link to the core article and Docs rather than embedding the full essay.

**Trust / source claims:** Public Anchor product and docs chrome must not present open-source browsing or MIT-license marketing as the primary trust signal. Prefer runtime/distribution signals (npm) consistent with ADR-093.

**Chrome:** Anchor product chrome order is Home → Articles → Docs → Case study.

## Consequences

### Positive
- Core product argument has a durable URL without diluting Docs or the case study.
- Product homepage and public claims match the independent product-surface story.
- Future essays can land under `/anchor/articles` without inventing a CMS.

### Negative / Trade-offs
- Thin article index until more essays exist — mitigated by a strong first article and index copy that sets expectation.
- Product spine copy will drift from older ADR-091 spine wording — this ADR is the amendment.

### Operational Impact
- Implement `app/anchor/articles/**`, update chrome/search/sitemap/content-index, rewrite `/anchor` narrative, and retarget docs footer trust line.
- **Migration / rollback:** Remove `/anchor/articles` routes and chrome link; restore prior homepage spine via superseding ADR; restore prior trust copy if product strategy reverses.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Articles and Docs blur (essay vs How) | Med | Med | Keep articles argument-only; Docs own install/concepts; chrome labels stay distinct | Owner | Docs page acquires long essay sections or articles grow procedure steps |
| Thin articles index looks unfinished | Med | Low | Ship one strong core article; index frames “start with the premise” | Owner | Adopter feedback that Articles feels empty |

## Review Schedule

- **Next review:** After a second article ships, or three months from Accept date  
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-091 — amends: product homepage spine/copy for Phase 1
- ADR-092 — amends: adds Articles responsibility; promotion rule applied
- ADR-093 — constrains: product surface independent of implementation workspace; trust/source claims
- ADR-086 — constrains: chrome-free `/anchor` host
- ADR-095 — amended by: homepage mechanism spine (No magic); Articles unchanged (further amended by ADR-096)
- ADR-096 — amended by: Articles leave product chrome; essay on Medium / portfolio writing

## References

- Implementation: `app/anchor/page.tsx`, `app/anchor/articles/`, `app/anchor/AnchorProductChrome.tsx`
- Implementation PR (merged without ADR file): https://github.com/jon4ohio/jon-ohio-portfolio/pull/217
- Prior decisions: [ADR-091](ADR-091-portfolio-product-surface-separation.md), [ADR-092](ADR-092-public-knowledge-surface.md), [ADR-093](ADR-093-product-surface-independent-of-implementation-workspace.md)
