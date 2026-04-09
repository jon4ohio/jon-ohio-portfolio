# ADR-003: Responsive layout via CSS utility classes in globals.css

## Status

**Status:** Accepted
**Date:** 2026-04-07
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

The portfolio site was initially built desktop-first with fixed grid layouts defined entirely via inline `style` props (per ADR-001). All grid containers used hard-coded `gridTemplateColumns` values (e.g. `"repeat(4, 1fr)"`, `"80px 1fr auto"`) with no responsive breakpoints. On mobile and tablet viewports, multi-column grids overflowed, the navigation bar had no mobile affordance, and dark inset sections had excessive padding on small screens.

A responsive, adaptive experience is required across three breakpoints: mobile (≤ 640 px), tablet (≤ 900 px), and desktop (> 900 px).

**In scope:** responsive grid layouts, navigation mobile menu, dark section padding, work list and case study metric grids
**Out of scope:** design tokens, dark mode, animation behaviour, data layer

## Decision Drivers

- ADR-001 mandates inline `style` props for all layout and visual styling — Tailwind utility classes must not be introduced for structural layout
- Inline styles have higher specificity than CSS classes and cannot be overridden by breakpoint rules without `!important`
- The existing `app/globals.css` already hosts Tailwind animation utilities; it is the appropriate place for additional CSS utilities that are not layout-structural enough to live inline

## Options Considered

### Option A: CSS utility classes in `globals.css` for grid templates only

- **Description:** Extract only the `display: grid` and `grid-template-columns` properties from inline styles into named CSS classes in `globals.css`. All decorative properties (colours, borders, padding, gap, etc.) stay inline. Apply breakpoint overrides at `≤ 900 px` and `≤ 640 px`. Use `!important` narrowly — only for the case study metrics grid, whose column count is set dynamically via an inline template literal and cannot be moved to a class.
- **Pros:**
  - Preserves ADR-001's intent: decoration stays inline, only layout responsiveness moves to CSS
  - Minimal surface area — one file change (`globals.css`) owns all breakpoints
  - Class names are generic and reusable (`.grid-4`, `.grid-2`, `.grid-work-row`, etc.)
  - `!important` usage is isolated and documented
- **Cons:**
  - Splits grid layout across two locations (class for template, inline for gap/overflow/etc.) — requires discipline when editing
  - Does not fully eliminate inline `display: grid` in some cases (by convention, `display` is redundant when the class already sets it)
- **Effort:** Low
- **Notes:** Consistent with the spirit of ADR-001 and the precedent set by animation utilities.

### Option B: Tailwind responsive utilities for all grid layouts

- **Description:** Replace inline grid styles with Tailwind responsive classes (e.g. `grid-cols-4 md:grid-cols-2 sm:grid-cols-1`).
- **Pros:**
  - Industry-standard responsive approach
  - Less CSS to maintain in `globals.css`
- **Cons:**
  - Directly violates ADR-001, which prohibits Tailwind for structural layout
  - Requires systematic refactor of every grid across all pages and components
- **Effort:** Medium–High
- **Notes:** Rejected — would require a new ADR to supersede ADR-001 first.

### Option C: React-based breakpoint hooks (e.g. `useWindowWidth`)

- **Description:** Detect viewport width in JS and conditionally render different column counts.
- **Pros:**
  - Full control from within components
- **Cons:**
  - Adds client-side JS to every page; site is currently 100 % Server Components
  - Causes layout shift (mismatch between SSR and client hydration)
  - Verbose and hard to maintain
- **Effort:** High
- **Notes:** Rejected — violates the Server Component architecture and creates UX regression.

## Decision

**We will use Option A** — responsive grid layout via named CSS utility classes in `globals.css`, extracting only `display`/`grid-template-columns` from inline styles.

Breakpoints:
- `≤ 900 px` (tablet): 4-col → 2-col, 3-col → 2-col
- `≤ 640 px` (mobile): 2-col → 1-col, further simplification of work/metrics grids, reduced dark-section padding

The navigation receives a mobile hamburger menu (`useState` toggle) that hides desktop links below 640 px and shows a full-width slide-down panel — this is the one component already marked `"use client"` so no architecture change is needed.

Heading font sizes already used `clamp()` and required no changes.

## Consequences

### Positive

- All pages render correctly across mobile (375 px), tablet (768 px), and desktop (1280 px)
- Zero new `"use client"` components introduced (Nav was already client)
- Single source of truth for breakpoints: `globals.css`
- Narrow, documented use of `!important` (one rule: `.grid-metrics` on mobile)

### Negative / Trade-offs

- Grid layout is now split: `grid-template-columns` lives in a CSS class; `gap`, `overflow`, `border-radius`, and decorative properties remain inline. Editors must know to look in both places.
- The `.grid-metrics` `!important` override is a semantic compromise — preferred over introducing JS-based column switching for a purely presentational property

### Operational Impact

- New CSS classes added to `globals.css`: `.grid-4`, `.grid-3`, `.grid-2`, `.grid-2-lg`, `.grid-work-row`, `.grid-work-feat`, `.grid-metrics`, `.pad-inset`, `.pad-inset-wide`, `.hide-mobile`, `.next-item`, and nav classes (`.nav-desktop-links`, `.nav-desktop-cta`, `.nav-hamburger`, `.nav-mobile-panel`)
- When adding new multi-column layouts: use the matching `.grid-*` class and keep decorative styles inline
- **Migration / rollback:** If ADR-001 is superseded in favour of Tailwind, the CSS utility classes in `globals.css` should be migrated to Tailwind responsive variants at that time

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Editor adds a new inline `gridTemplateColumns` without a responsive class, breaking mobile | Med | Med | Document the pattern in `CLAUDE.md`; code review checklist item | Maintainer | Any new grid layout added to the site |
| `!important` on `.grid-metrics` conflicts with a future refactor | Low | Low | The rule is isolated to one class; document it here and in `globals.css` | Maintainer | If `grid-metrics` usage expands beyond case study page |

## Review Schedule

- **Next review:** 2026-07-01
- **Review owner:** Maintainer

## Related ADRs

- ADR-001 — constrained by: responsive layout must not use Tailwind for structural styling
- ADR-002 — unaffected: data layer unchanged
- ADR-004 — extends: shared metric-badge classes, work list layout hooks (`.work-list-*`), hero CTA (`.hero-cta`), and workspace port preview for local dev

## References

- `app/globals.css` (responsive utility classes and breakpoints)
- `components/Nav.tsx` (mobile hamburger menu)
- `CLAUDE.md` (Architecture → Styling)
