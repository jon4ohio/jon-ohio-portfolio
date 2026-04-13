# ADR-026: Orchestrated portfolio case study — narrative refresh

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted
**Date:** 2026-04-13
**Decision Maker(s):** Jon Ohio (Product Design Lead)
**Supersedes:** ADR-025

## Context

The `orchestrated-portfolio` case study was already positioned as a system-and-orchestration story, but the copy still read partially as a tooling inventory and partially as third‑person “process documentation.” The case study needs a clearer through-line: **a first‑person account of orchestration** that communicates judgment, sequencing, and system design — while keeping the card subtitle short and legible in the `/work` grid.

**In scope:** `summary`, `role`, `scope`, `problem`, `action`, `impact`, `systemEvolution`, `systemImpact`, `keyInsight`, and the card `subtitle` for `orchestrated-portfolio` in [`lib/projects.ts`](../../lib/projects.ts).  
**Out of scope:** Image assets and rendering behaviour; other projects’ copy; routing.

## Decision Drivers

- Copy must read as **owned judgment** (first person) rather than a press release or tool list
- Card subtitle must be **short, scannable**, and not rely on jargon to carry meaning
- Preserve the “system built the site” thesis without over-claiming technical authorship

## Options Considered

### Option A: Keep the prior system-inventory framing
- **Description:** Maintain the previous wording focused on roles/tools/layers, with minimal edits.
- **Pros:** Already accurate; low churn.
- **Cons:** Reads like documentation more than a story; spreads attention across mechanisms instead of judgment; subtitle is longer and more technical than other cards.
- **Effort:** Low
- **Notes:** Would likely require iterative micro-edits later anyway.

### Option B: Refresh the narrative into first-person orchestration with a shorter subtitle
- **Description:** Re-write the case study sections as a first-person orchestration story (constraints → role partitioning → shared memory → continuous deployment → bidirectional design loop) and shorten the card subtitle to “From agents to production.”
- **Pros:** Stronger voice; clearer through-line; subtitle matches card scan patterns; highlights DesignOps judgment and sequencing.
- **Cons:** Requires more copy change at once; risks over-tightening nuance if not verified against the actual build history.
- **Effort:** Medium
- **Notes:** Keep facts stable; use the repository’s decision log as the grounding source.

## Decision

**We will use Option B because the case study must foreground judgment and orchestration, and the card subtitle must stay short and scannable.**

This refresh shifts the `orchestrated-portfolio` narrative to first person and tightens the card subtitle to align with the rest of the work grid.

## Consequences

### Positive
- A single through-line: system design as the lever that made shipping possible
- Improved readability and scanability on `/work` while keeping the detail in the body sections

### Negative / Trade-offs
- Larger diff in one pass increases the cost of “undoing” individual phrasing choices

### Operational Impact
- **Migration / rollback:** Revert the affected `orchestrated-portfolio` fields in `lib/projects.ts`, and restore ADR-025’s decision as current by superseding this ADR.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Copy implies technical implementation ownership beyond reality | Low | Med | Keep claims bounded (“system built it”, “judgment was mine”); verify phrasing against commit history | Product Design Lead | Before public sharing / portfolio launch |

## Review Schedule

- **Next review:** Next case study polish pass or after feedback from first external readers
- **Review owner:** Product Design Lead

## Related ADRs

- ADR-002 — relationship: constrains (static `lib/projects.ts` data layer)
- ADR-008 — relationship: depends on (decision log as governance mechanism)
- ADR-022 — relationship: constrains (primary preview image + aligned thumbnails convention)
- ADR-025 — relationship: supersedes

## References

- [`lib/projects.ts`](../../lib/projects.ts) — `orchestrated-portfolio`
