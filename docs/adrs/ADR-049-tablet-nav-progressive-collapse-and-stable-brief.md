# ADR-049: Tablet nav progressive collapse and stable Executive Brief layout

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Proposed
**Date:** 2026-04-30
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

On iPad/tablet widths, the fixed top navigation and the flagship case study Executive Brief (bento grid) entered unstable “mid-states” where:
- The navigation attempted to keep **logo + links + theme toggles + CTA** visible, causing the CTA label and/or brand region to wrap or compress.
- The Executive Brief bento could shrink columns into unreadable widths (including extreme word/character wrapping), making the brief feel broken rather than adaptive.

We already have a robust mobile navigation panel that contains both **links** and **theme toggles**, and a robust mobile Executive Brief layout (`brief-mobile`) that stacks the same content as readable cards.

**In scope:** Tablet/iPad responsive behavior for (1) top navigation content collapse and (2) case-study Executive Brief layout switching.
**Out of scope:** Copy changes, new navigation IA, reworking the bento design for tablet, or adding new components.

## Decision Drivers

- Preserve a stable, readable header: **logo + CTA must not wrap**.
- Use the hamburger panel as the canonical container for **theme toggles** and **collapsed links**.
- Avoid fragile intermediate layouts on iPad/tablet; prefer stable layouts earlier.
- Minimize changes and preserve existing desktop/mobile behavior.

## Options Considered

### Option A: Keep desktop nav + bento through tablet
- **Description:** Retain full desktop header and bento grid down to mobile breakpoints.
- **Pros:** Fewer breakpoint-specific rules.
- **Cons:** Produces cramped/wrapping states on common iPad widths; feels broken rather than responsive.
- **Effort:** Low
- **Notes:** Fails the stability driver.

### Option B: Progressive collapse on tablet (chosen)
- **Description:** Introduce a tablet breakpoint where links/toggles collapse into the hamburger panel; keep CTA stable. Switch Executive Brief to stacked cards on tablet for stability.
- **Pros:** Stable header; readable brief; smoother transition across viewport sizes; leverages existing mobile panel/card patterns.
- **Cons:** Tablet shows a “mobile-style” brief sooner; fewer “desktop” elements visible in the header.
- **Effort:** Low
- **Notes:** Uses the existing mobile menu/footer as the canonical surface for toggles.

## Decision

**We will use progressive collapse at tablet widths: collapse nav links and theme toggles into the hamburger panel at ≤900px, keep the CTA on one line, and render the Executive Brief using stacked cards (not bento) at ≤900px.**

## Consequences

### Positive
- Navigation remains stable and readable on iPad/tablet (no CTA/brand wrapping).
- Executive Brief remains readable (no extreme wrapping or dead space).
- Smoother transitions across desktop → tablet → mobile.

### Negative / Trade-offs
- Tablet loses some “desktop richness” (links/toggles are behind the hamburger sooner).

### Operational Impact
- **Migration / rollback:** Remove the ≤900px nav/brief rules to revert to the previous desktop-through-tablet behavior.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Tablet breakpoint hides too much nav affordance | Med | Med | Keep CTA visible; validate on 768–1024 widths and adjust cutoff if needed | John Ohio | Any nav layout change or new primary nav item |

## Review Schedule

- **Next review:** Next major navigation or flagship layout iteration
- **Review owner:** John Ohio

## Related ADRs

- ADR-016 — depends on: mobile nav tray patterns and footer actions
- ADR-034 — depends on: mobile nav close-on-route-change behavior
- ADR-043 — constrains: Executive Brief layout conventions for flagship case studies

## References

- `components/Nav.tsx`
- `app/globals.css`
- `components/case-study/MetadataBrief.tsx`

