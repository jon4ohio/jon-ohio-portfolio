# ADR-050: Case study Prev/Next hover uses background fill (not underline)

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Proposed
**Date:** 2026-04-30
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Case study Prev/Next navigation links (`.case-study-nav-link`) originally used an underline hover style targeted at `p:last-child`.

With the introduction of Prev/Next parity that renders both **title + subtitle**, the last paragraph became the subtitle, causing the hover underline to emphasize the subtext rather than providing a clean, consistent interaction affordance.

**In scope:** Hover/focus interaction styling for case study Prev/Next links.
**Out of scope:** Changing the content, layout, or adding thumbnails/cards.

## Decision Drivers

- Avoid emphasizing the subtitle via underline.
- Keep hover affordance subtle and consistent with the site’s “surface wash” interaction pattern.
- Improve hit-area and keyboard focus visibility without adding visual noise.

## Options Considered

### Option A: Keep underline hover
- **Description:** Continue underlining the last line of text on hover.
- **Pros:** Very lightweight styling.
- **Cons:** Underlines the subtitle; feels inconsistent with the rest of the navigation/row hover patterns.
- **Effort:** Low
- **Notes:** Becomes brittle when text structure changes.

### Option B: Background fill hover (chosen)
- **Description:** Apply a subtle background wash on hover/focus to the whole link container.
- **Pros:** Stable regardless of text structure; consistent with row/link hover elsewhere; increases usable hit area.
- **Cons:** Slightly more CSS and spacing.
- **Effort:** Low
- **Notes:** Uses `var(--surface-hover)` token.

## Decision

**We will use a subtle background fill on `.case-study-nav-link` hover/focus and remove underline-on-subtitle behavior.**

## Consequences

### Positive
- Hover state remains clean with title + subtitle.
- Consistent interaction affordance with other hoverable rows on the site.
- Better tap/hover target through light padding.

### Negative / Trade-offs
- Adds padding around the link; spacing must remain visually balanced.

### Operational Impact
- **Migration / rollback:** Reintroduce underline styling if background wash becomes too heavy in a theme.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Background wash feels too heavy in dark theme | Low | Med | Adjust padding/radius or switch to a lighter mix token | John Ohio | Any nav hover restyle or theme token change |

## Review Schedule

- **Next review:** Next case study navigation iteration
- **Review owner:** John Ohio

## Related ADRs

- ADR-049 — depends on: stable navigation patterns on tablet

## References

- `app/globals.css` (hover rules)
- `components/case-study/PrevNextNav.tsx`

