# ADR-041: Leadership page — mobile philosophy typography and focus cards layout

## Status

**Status:** Proposed  
**Date:** 2026-04-24  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

This is the `jon-ohio-portfolio` website. The Leadership page ([`app/leadership/page.tsx`](../../app/leadership/page.tsx)) includes a Philosophy list (“What I believe about design at scale”) and a “Problems I’m Working Through” grid (`.grid-3.leadership-focus-grid`).

On viewports ≤900px, [`app/globals.css`](../../app/globals.css) forces `.leadership-focus-grid` to **two columns** with `!important`, which persists on phones (~338px) and squeezes cards side-by-side. The Philosophy list uses a minimum `clamp` font size that can produce **orphan** line breaks on narrow widths.

**In scope:** responsive CSS and a single hook class on Philosophy `<li>` elements; no copy changes, no section reordering, no new React components.  
**Out of scope:** redesigning the Leadership page, changing `philosophy` / `currentFocus` strings, altering tablet (≤900px) two-column behavior for the focus grid except where ≤640px must override it.

## Decision Drivers

- Readability on mobile: avoid cramped two-column cards on narrow screens
- Reduce typographic orphans in the Philosophy list without rewriting principles
- Preserve existing layout and utilities pattern (grid classes in `globals.css`)

## Options Considered

### Option A: Change only inline styles in `leadership/page.tsx`

- **Description:** Adjust Philosophy `fontSize` clamp in JSX; wrap focus cards in a different layout on small screens.
- **Pros:** All changes visible in one file
- **Cons:** Focus grid is dominated by global `.leadership-focus-grid { … !important }`; inline grid overrides are fragile; duplicating breakpoint logic in JSX fights existing `globals.css` conventions
- **Effort:** Medium  
- **Notes:** Does not align with “decorative styles stay inline; responsive columns in globals” pattern.

### Option B: Extend `globals.css` + minimal class hook on Philosophy items

- **Description:** Add `.leadership-philosophy-item` for `text-wrap: pretty` and a ≤640px font-size override; under ≤640px set `.leadership-focus-grid` to `1fr !important` and reset `:last-child` grid-column from the tablet rule.
- **Pros:** Fixes root cause (`!important` two-column rule leaking into mobile); keeps responsive logic in one place; no new components
- **Cons:** Uses `!important` to override existing `!important` (necessary given current cascade)
- **Effort:** Low  
- **Notes:** `text-wrap: pretty` is progressive enhancement where supported.

## Decision

**We will use Option B because the mobile bug is caused by a global `!important` two-column rule on `.leadership-focus-grid` that outranks the generic `.grid-3` single-column rule at ≤640px, and Philosophy readability is best improved with a narrow-viewport type tweak plus `text-wrap: pretty`.**

## Consequences

### Positive

- Focus cards stack full-width on phones; Philosophy lines wrap more cleanly

### Negative / Trade-offs

- `!important` stacking increases specificity debt; future grid utilities should avoid `!important` where possible

### Operational Impact

- Verify Leadership page at ≤640px after any change to `.leadership-focus-grid` or `.grid-3` responsive rules.  
- **Migration / rollback:** remove the ≤640px `.leadership-focus-grid` overrides and `.leadership-philosophy-item` rules; drop `className` from Philosophy `<li>` if reverting entirely.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| `text-wrap: pretty` unsupported in some browsers leaves only the font-size mitigation | Low | Low | Accept as progressive enhancement; re-check orphans on real devices | Maintainer | Major typography token changes |

## Review Schedule

- **Next review:** After next Leadership page content or layout pass  
- **Review owner:** Maintainer  

## Related ADRs

- ADR-003 — relationship: constrains (responsive layout via `globals.css` utilities)

## References

- [`app/leadership/page.tsx`](../../app/leadership/page.tsx)  
- [`app/globals.css`](../../app/globals.css)  
