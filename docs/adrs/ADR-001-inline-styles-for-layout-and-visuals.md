# ADR-001: Inline styles for layout and visuals

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Draft
**Date:** 2026-04-07
**Decision Maker(s):** Unknown (required before Accepted)
**Supersedes:** None

## Context

This is the `jon-ohio-portfolio` website, built with Next.js (App Router) and deployed on Vercel. We need a consistent approach to styling pages and components so that future edits remain visually consistent and fast to implement.

The repo already uses inline `style` props for layout and most visual styling, while Tailwind is present only for a small set of animation utility classes. This ADR documents that convention so it stays stable over time.

**In scope:** layout and visual styling approach for pages/components in this repo
**Out of scope:** component architecture, data layer decisions, design tokens/theming system

## Decision Drivers

- Maintain a consistent styling convention across the portfolio
- Minimize cognitive overhead for small content/layout edits
- Avoid mixing multiple styling paradigms for structural layout

## Options Considered

### Option A: Inline `style` props for layout/visuals (Tailwind only for animations)
- **Description:** Use React `style` props for layout and visual styling. Use Tailwind only for pre-defined animation utility classes (e.g. `animate-fade-up`, `delay-*`) defined in `app/globals.css`.
- **Pros:**
  - Enforces a single, explicit styling approach for layout
  - Makes intent obvious at the component level (no hunting for class composition)
  - Reduces pressure to introduce broader Tailwind usage over time
- **Cons:**
  - More verbose than utility classes for some patterns
  - Harder to share/compose repeated style patterns without additional abstraction
- **Effort:** Low
- **Notes:** Matches current repo convention.

### Option B: Tailwind utility classes for most styling (including layout)
- **Description:** Use Tailwind classes for layout/visual styling and reserve inline styles for exceptional cases.
- **Pros:**
  - Fast iteration for many common layout patterns
  - Consistent primitives and responsive utilities
- **Cons:**
  - Conflicts with the repo’s established inline-style convention
  - Increases risk of mixed paradigms and inconsistent styling
- **Effort:** Medium
- **Notes:** Would require systematic refactors to align existing components.

## Decision

**We will use Option A because it preserves the repo’s established styling convention and prevents mixing paradigms for structural layout.**

Tailwind will remain limited to the animation utilities already used by the site. This directly supports the drivers of maintaining consistency and minimizing overhead for small edits.

## Consequences

### Positive
- Styling changes remain localized and explicit in the components being edited
- Lower chance of stylistic drift from inconsistent class usage

### Negative / Trade-offs
- Some repeated styles may be duplicated across files (mitigation: extract shared constants/components only when repetition becomes painful)

### Operational Impact
- Onboarding: contributors should follow the inline-style convention for layout/visuals
- **Migration / rollback:** If we later adopt Tailwind for layout, create a new ADR that supersedes this one and migrate incrementally file-by-file.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Inline-style duplication makes future edits slower | Med | Med | Introduce small shared style helpers/components when duplication becomes frequent | Maintainer | When the same layout styles are copied across ≥3 pages/components |

## Review Schedule

- **Next review:** 2026-07-01
- **Review owner:** Maintainer

## Related ADRs

- ADR-002 — relationship: constrains (styling decisions should not require changing data approach)

## References

- `CLAUDE.md` (Architecture → Styling)
- `app/globals.css`

