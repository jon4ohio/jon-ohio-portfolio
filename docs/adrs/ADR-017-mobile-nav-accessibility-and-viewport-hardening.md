# ADR-017: Mobile navigation accessibility, touch targets, and viewport hardening

## Status

**Status:** Accepted
**Date:** 2026-04-11
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

The mobile menu (`#nav-mobile-panel`, ADR-015–016) uses a frosted overlay, scroll region, and vertical footer. A review pass identified gaps versus common responsive and accessibility expectations: **background scrolling** while the sheet is open, **keyboard Escape** to dismiss, **focusable content** inside a visually hidden panel (`aria-hidden` alone does not remove tab stops), **landmark labeling** for multiple `<nav>` regions, **decorative** hamburger icon bars, explicit **`type="button"`** on the menu control, **touch target** sizing for links and CTA, **scroll chaining** / momentum on iOS, **reduced motion** for open/close transitions, and **safe-area / notched devices** via viewport metadata. Automated axe coverage previously used the default (desktop-sized) viewport only.

**In scope:** `components/Nav.tsx`, `.nav-mobile-panel*` rules in `app/globals.css`, root `viewport` in `app/layout.tsx`, and Playwright axe coverage in `tests/a11y/routes.spec.ts`.

**Out of scope:** Full focus trap inside the open menu, `aria-modal` dialog pattern, or changes to desktop navigation behavior.

## Decision Drivers

- WCAG 2.x: avoid **serious/critical** axe findings; improve keyboard and pointer behavior on small viewports.
- **ADR-013:** maintain automated axe gates; extend coverage to **mobile + menu open** where risk is highest.
- **ADR-001 / ADR-003:** keep structural rules in `globals.css`; avoid Tailwind for layout.
- **No new runtime dependencies** — use platform APIs (`inert`, `env(safe-area-inset-*)`, `viewport-fit`).

## Options Considered

### Option A: Layered hardening (scroll lock, Escape, inert, landmarks, CSS targets, viewport-fit, a11y test)

- **Description:** When the menu is open, set `document.body.style.overflow = "hidden"` (restored on close/unmount). Listen for `Escape` to close. Set **`inert`** on the mobile panel when closed so descendants are not focusable. Use `<nav aria-label="Mobile menu">` for the sheet; **`aria-label="Primary"`** on the header bar nav. Add **`aria-hidden`** on hamburger bars, **`type="button"`** on the toggle. In CSS: **`min-height: 44px`** on mobile nav links and mail CTA, **`-webkit-overflow-scrolling: touch`**, **`overscroll-behavior: contain`**, **`prefers-reduced-motion: reduce`** for panel transition. Set **`viewportFit: "cover"`** on the root viewport export. Add a Playwright test at **390×844** that opens the menu and runs axe.
- **Pros:** Addresses the full checklist without new packages; `inert` is the correct fix for hidden-focusable under `aria-hidden`.
- **Cons:** Body scroll lock can interact with iOS Safari UI chrome in edge cases; no focus trap when open (follow-up if needed).
- **Effort:** Low
- **Notes:** Implemented.

### Option B: Third-party headless-ui / radix for disclosure

- **Description:** Replace custom menu with a library that provides focus trap and ARIA roles.
- **Pros:** Stronger semantics out of the box.
- **Cons:** New dependency, bundle cost, and refactor of `Nav.tsx` for a single menu.
- **Effort:** Medium
- **Notes:** Rejected for this codebase’s static-site scope.

## Decision

**We will use Option A** — incremental platform-native hardening plus one additional axe scenario for mobile menu open.

## Consequences

### Positive

- Users cannot tab into a dismissed menu; Escape and scroll lock match common sheet expectations.
- Touch targets and scroll behavior align with mobile best practices; reduced motion is respected.
- `viewport-fit: cover` aligns full-screen layout with `env(safe-area-inset-*)` already used on the panel.
- CI can catch regressions on the mobile-open path via Playwright + axe.

### Negative / Trade-offs

- **Focus trap** when the menu is open is still not implemented; tab order may leave the sheet (acceptable until a dedicated modal/dialog pattern is chosen).
- Body `overflow: hidden` is a global side effect; must be cleared in the effect cleanup to avoid stuck scroll.

### Operational Impact

- When changing mobile nav markup, preserve **`inert`** when closed, **`aria-label`** on both nav landmarks, and the **axe mobile-open** test.
- **Migration / rollback:** Revert the listed files; no env or data changes.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| `inert` unsupported on very old browsers leaves hidden focusables | Low | Med | Browser support is broad for current audience; monitor analytics | Maintainer | Support tickets for old browsers |
| Duplicate or unclear nav landmarks if labels drift | Low | Low | Keep `Primary` vs `Mobile menu` distinct; axe landmark rules | Maintainer | Nav IA change |

## Review Schedule

- **Next review:** 2026-07-01 with other nav ADRs, or when adding focus trap / modal pattern
- **Review owner:** Maintainer

## Related ADRs

- ADR-001 — layout tokens: structural CSS in `globals.css`
- ADR-003 — responsive nav breakpoint at `≤ 640px`
- ADR-013 — Playwright + axe gates
- ADR-015 — full-height mobile tray
- ADR-016 — column links and vertical footer

## References

- `components/Nav.tsx` — scroll lock, Escape, `inert`, landmarks, hamburger attributes
- `app/globals.css` — mobile panel scroll/footer touch targets, overscroll, reduced motion
- `app/layout.tsx` — `viewportFit: "cover"`
- `tests/a11y/routes.spec.ts` — mobile viewport + open menu axe test
- [MDN: `inert` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert)
- [WCAG 2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) — 44×44 CSS px reference for touch targets
