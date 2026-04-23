# ADR-040: Homepage metrics strip (4 items) and ownership copy precision refresh

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Proposed
**Date:** 2026-04-23
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

This is the `jon-ohio-portfolio` website. The homepage (`app/page.tsx`) includes a compact “Impact across products, systems, and operations” metrics strip (`heroMetrics`) and a curated “What I own” section (`ownershipItems`) rendered using the shared `/work` row UI (ADR-039).

The homepage metrics and ownership descriptions need a copy-only update with strict rendering constraints: exactly four metrics, a consistent one-line value, and labels that stay readable across breakpoints without causing layout regressions.

**In scope:** homepage metrics strip item list and copy; homepage ownership one-word headline change; homepage ownership card description copy; minimal CSS adjustments to enforce the specified rendering constraints using existing class names.  
**Out of scope:** layout restructure, new components, section reordering, changing links/hrefs, changing design tokens or typography scale, altering case study metadata (tags/metrics) sourced from `lib/projects.ts`.

## Decision Drivers

- Copy must reflect current proof points (saved cost, satisfaction increase, design system onboarding, Rivva Product Hunt rank)
- Exactly four metrics with consistent visual hierarchy (value dominant, label secondary)
- Preserve existing layout and class names; avoid redesign
- Maintain responsive readability (desktop clamp, mobile wrap) without overflow regressions

## Options Considered

### Option A: Copy-only updates in `app/page.tsx` (no CSS)
- **Description:** Replace the `heroMetrics` array and `ownershipItems` descriptions; leave CSS unchanged.
- **Pros:**
  - Minimal surface area of change
  - Lowest regression risk in CSS
- **Cons:**
  - No guarantee of equal-height cards
  - No guarantee labels stay within 2 lines on desktop
  - Higher risk of layout issues with longer labels across breakpoints
- **Effort:** Low
- **Notes:** Relies on incidental current behavior rather than enforced constraints.

### Option B: Copy updates + minimal CSS constraints on existing classes
- **Description:** Replace the `heroMetrics` array and ownership copy, and add minimal CSS rules to enforce one-line values, 2-line labels on desktop, and equal-height metric cards without introducing new components.
- **Pros:**
  - Enforces the rendering rules explicitly
  - Keeps the current structure and class names intact
  - Improves resilience to future copy edits
- **Cons:**
  - Adds CSS behavior (line clamp) that must be checked across browsers
  - Slightly increases coupling between homepage copy length and CSS constraints
- **Effort:** Low
- **Notes:** Uses `-webkit-line-clamp` for a pragmatic 2-line clamp at desktop sizes.

## Decision

**We will use Option B because the homepage requires strict rendering rules (exactly 4 items, consistent one-line values, 2-line labels on desktop, and equal-height cards) while preserving the existing layout and class names.**

This keeps the update a precision copy/UI adjustment (not a redesign), and prevents copy changes from causing accidental layout regressions at common breakpoints.

## Consequences

### Positive
- Metrics strip shows exactly four proof points with consistent visual hierarchy
- Value and label rendering rules are enforced across breakpoints
- Ownership section copy is updated without changing titles/tags/metrics/hrefs

### Negative / Trade-offs
- Desktop 2-line clamp can truncate long labels; exact wording must stay within constraints or accept ellipsis

### Operational Impact
- Future metrics/copy updates must respect clamp limits and one-line value constraints.
- **Migration / rollback:** revert `heroMetrics`/`ownershipItems` strings and remove the added CSS clamp rules if truncation becomes undesirable.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Desktop label clamp truncates future copy unexpectedly | Med | Low/Med | Keep labels intentionally short; verify at desktop + mobile during copy edits; adjust wording before shipping | Maintainer | Any future homepage copy pass touching metrics |

## Review Schedule

- **Next review:** Next homepage copy pass or after any reported truncation/regression on the metrics strip
- **Review owner:** Maintainer

## Related ADRs

- ADR-010 — relationship: related (homepage hero/metrics evidence hierarchy)
- ADR-036 — relationship: related (homepage curation changes)
- ADR-038 — relationship: related (homepage metrics and ownership copy refresh)
- ADR-039 — relationship: depends on (ownership rows reuse `/work` row UI)

## References

- `app/page.tsx`
- `app/globals.css`

