# ADR-086: Responsive work catalog track constraints

## Status
**Status:** Accepted  
**Date:** 2026-07-16  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

John Ohio’s portfolio uses shared `WorkListRow` grids for the `/work` catalog. The marketing-shell implementation introduced compact “Other Work” rows and fixed-width featured thumbnail tracks; immediately above the 640px mobile breakpoint, featured copy collapsed to 30px, while at mobile widths compact descriptions were auto-placed into the 28px arrow track.

The catalog must preserve ADR-084’s horizontal desktop treatment and existing per-variant thumbnail maxima without making project copy unreadable at narrow widths. The triggering event was the responsive regression found after the marketing-shell changes in commit `6e2bb18`.

**In scope:** CSS grid placement and track sizing for shared work catalog rows, plus responsive geometry regression coverage.  
**Out of scope:** catalog content, project visibility, thumbnail assets, case-study interior layouts, and redesigning the listing-row visual treatment.

## Decision Drivers

- At a 390px viewport, compact-row descriptions must retain at least 150px of width.
- At a 641px viewport, featured-row bodies must retain at least 150px of width.
- Desktop featured thumbnails must retain their existing 427px maximum, including smaller variant-specific maxima.
- The fix must preserve the stacked featured-row treatment at widths of 640px and below.

## Options Considered

### Option A: Proportional thumbnail cap and explicit compact grid placement
- **Description:** Cap the featured thumbnail track at 45% of the row before applying its existing variant maximum. At the mobile breakpoint, assign compact title, description, and arrow elements to explicit grid cells.
- **Pros:** Preserves the horizontal desktop treatment; retains existing variant maxima; directly fixes both failing grid behaviors with CSS-only changes.
- **Cons:** Adds explicit responsive grid placement rules and relies on modern CSS `min()` support.
- **Effort:** Low
- **Notes:** Chosen. Playwright geometry assertions cover the two regression widths.

### Option B: Stack all work rows at a wider breakpoint
- **Description:** Change featured and compact rows to a single-column layout at tablet widths, avoiding narrow horizontal tracks entirely.
- **Pros:** Simple responsive model; maximizes copy width on small tablets.
- **Cons:** Removes ADR-084’s horizontal row treatment from a broader range of tablet viewports and changes the approved visual behavior beyond the failing widths.
- **Effort:** Low
- **Notes:** Viable but broader than required for the confirmed regression.

## Decision

**We will use Option A because it satisfies the measurable mobile and narrow-width readability drivers while preserving the existing desktop listing treatment.**

The featured thumbnail track is capped at 45% before its existing variant maximum. Compact mobile children receive explicit grid positions so the description cannot be auto-placed into the arrow track.

## Consequences

### Positive
- Work catalog copy remains readable across the mobile breakpoint.
- Existing desktop and variant-specific thumbnail maxima remain intact.
- A focused browser test prevents recurrence of the measured track collapse.

### Negative / Trade-offs
- Responsive track behavior now depends on CSS `min()`; the supported browser set must continue to include that feature.

### Operational Impact
- Responsive catalog changes must preserve the geometry thresholds in `tests/a11y/routes.spec.ts`.
- **Migration / rollback:** Deploy the CSS and test together. Roll back both if supported browsers reject the track declaration, then use Option B as the fallback.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| A supported browser rejects the nested `min()` grid track and drops the declaration | Low | High | Verify the production browser matrix at the next compatibility review; if a supported browser fails, replace the proportional cap with the wider stacking breakpoint from Option B | Owner/Maintainer | Browser compatibility report or catalog layout regression |

## Review Schedule

- **Next review:** 2026-10-16 or the next work catalog responsive-layout change, whichever occurs first
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-003 — constrains: responsive layout remains implemented through shared CSS utility rules.
- ADR-084 — refines: preserves the marketing-shell listing-row treatment while making its responsive tracks readable.

## References

- `app/globals.css`
- `components/WorkListRow.tsx`
- `tests/a11y/routes.spec.ts`
- `docs/adrs/ADR-084-portfolio-marketing-shell-claude-design.md`
