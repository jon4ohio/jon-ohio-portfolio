# ADR-034: Mobile nav menu closes on route change

## Status
**Status:** Accepted  
**Date:** 2026-04-13  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

The mobile navigation tray in [`components/Nav.tsx`](../../components/Nav.tsx) has two existing close paths:

1. **Explicit link tap** — each `<Link>` in the tray carries `onClick={() => setMenuOpen(false)}`.  
2. **Escape key** — a `keydown` listener (active only while `menuOpen` is `true`) calls `setMenuOpen(false)`.

Neither path handles **browser history traversal** (back/forward buttons) or other programmatic navigation that changes the URL without going through the mobile menu links. Because `Nav` lives in the root layout and is never unmounted between route changes, `menuOpen` state persists across navigations. A user who opens the tray and then navigates via the browser back button is left with the tray stuck open over the new page.

`usePathname()` is already imported and used in `Nav` to compute the active link highlight, so the current `pathname` value is available at no additional cost.

**In scope:** Adding a `useEffect` that resets `menuOpen` to `false` whenever `pathname` changes.  
**Out of scope:** Changing the tray's appearance, animation, or any other close path.

## Decision Drivers

- **Correctness:** The menu should never obscure page content after navigation, regardless of how the navigation was triggered.  
- **Minimal surface area:** The fix touches a single effect; no new state, no new imports.  
- **Consistency:** Aligns the back-button path with the existing link-tap and Escape paths.

## Options Considered

### Option A: Do nothing; rely on explicit link taps (status quo)
- **Description:** Keep the two existing close paths; accept that back/forward traversal leaves the tray open.  
- **Pros:** Zero code change.  
- **Cons:** Known UX breakage on any browser-history navigation while the tray is open.  
- **Effort:** None  
- **Notes:** Rejected.

### Option B: `useEffect` keyed on `pathname` (chosen)
- **Description:** Add `useEffect(() => { setMenuOpen(false); }, [pathname]);` in `Nav`. Fires once on mount (harmless — menu starts closed) and on every subsequent route change.  
- **Pros:** Covers all navigation sources; reuses already-available `pathname`; three lines of code.  
- **Cons:** None material.  
- **Effort:** Trivial  
- **Notes:** Accepted.

## Decision

**We will use Option B.** A single `useEffect` keyed on `pathname` closes the mobile tray on every route change, covering browser history traversal that bypasses the explicit link `onClick` handlers.

## Consequences

### Positive
- Mobile tray never blocks page content after any form of navigation.
- No new dependencies or state introduced.

### Negative / Trade-offs
- None.

### Operational Impact
- Future changes to mobile nav must preserve the `pathname` dependency or replicate the close behaviour by another means.
- **Migration / rollback:** Revert the four-line diff in `components/Nav.tsx`; no data migration.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Effect fires during SSR | None | None | `usePathname` is client-only; `Nav` is already `'use client'` | N/A | N/A |

## AI-Specific Considerations

N/A

## Review Schedule

- **Next review:** 2026-10-13 or when Nav is significantly refactored.  
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-015 — Mobile navigation full-height tray with bottom-pinned actions](./ADR-015-mobile-nav-full-height-tray-and-footer-actions.md)  
- [ADR-016 — Mobile nav link column layout and vertical footer actions](./ADR-016-mobile-nav-link-stack-and-vertical-footer.md)  
- [ADR-017 — Mobile navigation accessibility, touch targets, and viewport hardening](./ADR-017-mobile-nav-accessibility-and-viewport-hardening.md)  

## References

- [`components/Nav.tsx`](../../components/Nav.tsx) — `menuOpen` state, `pathname` hook, and close effects.
