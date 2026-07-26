# ADR-095: Anchor Homepage Mechanism Spine (No Magic)

## Status
**Status:** Accepted  
**Date:** 2026-07-26  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  
**Amends:** ADR-094 (product homepage spine/copy); related to ADR-091, ADR-093

## Context

ADR-094 established `/anchor` as Home → Problem → Proof → Start with project-understanding framing, and `/anchor/articles` as the essay surface. The live Proof section still presented styled `<pre>` blocks as “real init output,” and the hero still led with “Continue instead of reconstruct” / “coordination protocol” language rather than the frozen definition and core insight.

Product positioning clarified that `anchor init` declares conventional paths in `.anchor/config.json` (it does not discover project files), and that the distinctive claim is the map — not a generated documentation tree. The portfolio now has a real `.anchor/config.json` from `anchor init`, mapping to existing Entry and Handoff files.

**In scope:** `/anchor` homepage section order, labels, and No-magic evidence framing; Try It wording for `anchor init`.  
**Out of scope:** Articles routes or chrome (ADR-094); case-study narrative (`/work/anchor`); runtime discovery behavior; meta-repo methodology layout.

## Decision Drivers

- Homepage must communicate the mechanism (map to durable docs) without implying adaptive path discovery.
- Proof must show real project artifacts, not styled mockups.
- Identity diagram (“Continue Instead of Reconstruct”) is a Problem asset, separate from No-magic mechanism evidence.
- Articles remain the essay surface; do not fold philosophy into the product page.

## Options Considered

### Option A: Keep ADR-094 four-beat spine; only swap Proof assets
- **Description:** Leave Home → Problem → Proof → Start; replace `<pre>` with screenshots only.
- **Pros:** Minimal IA change.
- **Cons:** Misses Approach/Principles; “Proof” label still implies artifact theater over mechanism.
- **Effort:** Low
- **Notes:** Insufficient for the frozen brief.

### Option B: Expand homepage to mechanism spine *(chosen)*
- **Description:** Home → Problem → Approach → No magic (`#proof`) → Try it (`#start`) → Principles. Hero uses core insight + frozen definition. No magic is two panels (conceptual map + real portfolio overlay). Try It states that init *declares* where durable docs should live.
- **Pros:** Matches product story; stable `#proof` / `#start` anchors; Articles untouched.
- **Cons:** Longer page — mitigated by two-minute scroll discipline and compact sections.
- **Effort:** Medium
- **Notes:** Chosen.

### Option C: Move mechanism deep-dive entirely to Docs
- **Description:** Homepage stays four-beat; Docs owns map explanation and evidence.
- **Pros:** Shorter homepage.
- **Cons:** Skeptical reader’s first check (“is this real?”) stays weak on the product page.
- **Effort:** Low
- **Notes:** Rejected — Proof gap is the highest-priority homepage fix.

## Decision

**We will use Option B.**

**Product homepage spine (amending ADR-094):** Home → Problem → Approach → No magic → Try it → Principles. Keep section ids `proof` and `start` for stable anchors; surface labels are “No magic” and “Try it.”

**Hero (2026-07-26 amendment):** H1 is the identity phrase “Continue instead of reconstruct.”; the core insight remains Problem H2; definition stays the hero subhead.

**No magic framing:** How it works (conceptual illustration, labeled Conceptual in-image) + What that looks like (real portfolio `.anchor/config.json` beside mapped Entry/Handoff). Evidence caption: plain files, no hidden memory, no cloud service, no lock-in.

**Try It wording:** `anchor init` creates a small `.anchor/config.json` that *declares* where the project’s durable documentation should live; it does not duplicate or replace it. Keep existing MCP/host scoping (no cross-tool auto-discovery promise).

**Articles:** unchanged (ADR-094).

## Consequences

### Positive
- Homepage claim, evidence, and init behavior tell the same story.
- Identity diagram and mechanism illustration stay at distinct abstraction levels.

### Negative / Trade-offs
- Slightly longer scroll — mitigated by short Approach/Principles and compact panels.

### Operational Impact
- Implement in `app/anchor/page.tsx`; assets under `public/anchor/`; commit portfolio `.anchor/config.json`.
- **Migration / rollback:** Revert page + assets; restore ADR-094 four-beat copy via superseding ADR if needed.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Evidence SVG drifts from real config | Med | Med | Regenerate evidence asset when `.anchor/config.json` map changes | Owner | Config map edit or init schema change |

## Review Schedule

- **Next review:** After next public runtime bump that changes init output shape, or three months from Accept date  
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-094 — amends: homepage spine/copy; Articles untouched
- ADR-091 — constrains: product vs case-study surfaces
- ADR-093 — constrains: npm/docs trust signals; no open-source browse claims

## References

- Implementation: `app/anchor/page.tsx`, `public/anchor/`, `.anchor/config.json`
- Runtime init: `@jon4ohio/anchor-runtime` `anchor init` (hardcoded default map)
- Prior: [ADR-094](ADR-094-anchor-phase-one-articles-and-narrative.md)
