# ADR-027: Orchestrated portfolio case study — evidence screenshots and governance proof

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted
**Date:** 2026-04-13
**Decision Maker(s):** Jon Ohio (Product Design Lead)
**Supersedes:** None

## Context

The `orchestrated-portfolio` case study describes independent review and governance as part of the multi-tool system. During implementation, two pieces of “live evidence” were captured:

- An independent review tool flagged a real asset encoding mismatch on a PR (JPEG bytes committed under a `.png` filename).
- The ADR governance gate (ADR-008) blocked a PR because a major change shipped without an ADR update.

This evidence strengthens credibility, but it must be incorporated without turning the case study into a log dump and without introducing asset-format drift (filename extensions must match encoded bytes).

**In scope:** adding screenshot assets and captions to the `orchestrated-portfolio` case study and tightening `systemImpact` to include a concrete ADR gate enforcement example.  
**Out of scope:** broader work-index visuals, other case studies’ assets, changing ADR-008 policy scope.

## Decision Drivers

- Evidence should be **specific and verifiable**, not hypothetical
- Case study visuals must stay **lightweight** and readable on the page
- Asset formats must remain **internally consistent** (encoded bytes match file extensions)

## Options Considered

### Option A: Keep evidence only in copy (no screenshots)
- **Description:** Mention review/governance evidence in text only.
- **Pros:** Minimal assets; simplest maintenance.
- **Cons:** Lower credibility; “system worked” reads as claim rather than proof.
- **Effort:** Low
- **Notes:** Works best when visuals are not yet built out.

### Option B: Add the screenshots as case study assets with captions (chosen)
- **Description:** Store the PR screenshots under `public/assets/work/orchestrated-portfolio/` and reference them as `blocks` with concise captions; add one sentence in `systemImpact` describing ADR-008 blocking a PR.
- **Pros:** Concrete proof at the point of claim; reinforces the narrative; improves the case study’s “systems thinking” credibility.
- **Cons:** Adds more assets to maintain; screenshots can age as tooling/UI changes.
- **Effort:** Low
- **Notes:** Keep filenames accurate to their encoding (`.jpg` for JPEG). Prefer wide blocks with plain treatment.

## Decision

**We will use Option B because the case study benefits from real proof, and the maintenance cost is manageable when assets are stored with correct encodings and captions stay short.**

## Consequences

### Positive
- Case study claims about review and governance are backed by observable evidence
- Stronger alignment between narrative and build reality

### Negative / Trade-offs
- Screenshots may become visually outdated as GitHub UI and CI presentations change

### Operational Impact
- **Migration / rollback:** Remove the screenshot `blocks` and delete the assets; revert the `systemImpact` sentence if needed.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Screenshot evidence becomes stale or confusing over time | Med | Low | Treat as optional proof; refresh screenshots during major workflow/tooling changes | Product Design Lead | Next major tooling change or annual portfolio refresh |

## Review Schedule

- **Next review:** Next major portfolio refresh or when the multi-tool workflow changes
- **Review owner:** Product Design Lead

## Related ADRs

- ADR-002 — relationship: constrains (static `lib/projects.ts` data)
- ADR-008 — relationship: depends on (governance gate enforced and referenced)
- ADR-022 — relationship: constrains (preview image + aligned thumbnails convention)
- ADR-026 — relationship: complements (narrative refresh now backed by proof)

## References

- [`lib/projects.ts`](../../lib/projects.ts) — `orchestrated-portfolio`
- `public/assets/work/orchestrated-portfolio/codex-review.jpg`
- `public/assets/work/orchestrated-portfolio/adr-gate.jpg`
