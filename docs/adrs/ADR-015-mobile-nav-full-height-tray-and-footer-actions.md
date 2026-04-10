# ADR-015: Mobile navigation full-height tray with bottom-pinned actions

## Status

**Status:** Accepted
**Date:** 2026-04-11
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

The John Ohio portfolio site (`Nav.tsx`) exposes a hamburger-driven mobile menu at `≤ 640px` (per ADR-003). The initial implementation used a fixed panel below the 56px header with **height driven only by content**, so the tray did not occupy the remaining viewport. Theme switching and the “Get in touch” CTA followed the nav links in document order, which did not match the desired pattern of **primary actions anchored to the bottom** of the menu on small screens.

**In scope:** Mobile-only layout and structure of `#nav-mobile-panel`, its CSS in `globals.css`, and placement of `ThemeToggle` + mail CTA within that tray.

**Out of scope:** Desktop nav, routing, new nav links, focus-trap / modal semantics, or changing the fixed header height.

## Decision Drivers

- Mobile menu should read as a **full sheet** under the persistent header (clear affordance, consistent with common app patterns).
- **Theme toggle and CTA** must remain discoverable and **aligned on one row at the bottom** with intrinsic (auto) sizing, matching the desktop CTA cluster spacing (`gap: 18px`).
- **ADR-001** still applies: structural layout for this feature lives in **CSS classes** in `globals.css`; link/CTA decoration remains inline in `Nav.tsx` where it already lives.
- If nav links grow, the **footer must stay visible** — the link list must scroll independently.

## Options Considered

### Option A: Full-height fixed tray with flex column, scrollable links, footer row

- **Description:** Fix the panel with `top: 56px` and `bottom: 0`, `overflow: hidden` on the panel, an inner column flex wrapper (`flex: 1`, `min-height: 0`), a scrollable region for links (`flex: 1`, `overflow-y: auto`), and a non-shrinking footer row (`flex-shrink: 0`) containing `<ThemeToggle compact />` and the mail CTA in a horizontal flex row (`gap: 18px`). Add `padding-bottom: max(24px, env(safe-area-inset-bottom))` for notched devices. Optional left/right borders clarify the sheet edge.
- **Pros:**
  - Footer stays at the bottom when there are few links; links scroll when the viewport is short.
  - Reuses existing client-side toggle state; no new `"use client"` boundaries.
  - Aligns with ADR-003’s placement of nav responsive rules in `globals.css`.
- **Cons:**
  - More CSS surface area (`.nav-mobile-panel-inner`, `-scroll`, `-footer`) to maintain alongside `Nav.tsx`.
  - Two-level flex (`panel` → `inner` → `scroll` + `footer`) is harder to skim than a flat list.
- **Effort:** Low
- **Notes:** Matches implemented structure in repo.

### Option B: Content-height “dropdown” panel (status quo before ADR-015)

- **Description:** Keep the panel only as tall as its children; stack toggle and CTA below links with margins.
- **Pros:**
  - Minimal CSS; easy to understand.
  - No inner scroll region — entire page scrolls if content is tall.
- **Cons:**
  - Does not fill the screen; actions float mid-tray after links rather than at a stable bottom anchor.
  - On long future link lists, actions could be pushed far down.
- **Effort:** None (already superseded by Option A implementation)
- **Notes:** Rejected for UX goals above.

### Option C: Full-viewport overlay including backdrop + header takeover

- **Description:** Render a full-screen overlay (`inset: 0` or `100dvh`) with optional scrim, moving the close control inside the overlay or duplicating branding.
- **Pros:**
  - Maximum focus on menu content; can pair with focus trap for accessibility.
- **Cons:**
  - Conflicts with keeping the **existing fixed header and hamburger** as the stable close affordance without redesign.
  - Higher implementation and QA cost for a portfolio site scope.
- **Effort:** Medium
- **Notes:** Rejected — unnecessary for current requirements.

## Decision

**We will use Option A** because it satisfies **full-height tray under the header**, **bottom-pinned toggle + CTA on one row**, and **independent scrolling for links** without changing the header architecture or introducing modal-layer complexity.

The implementation uses classes `nav-mobile-panel-inner`, `nav-mobile-panel-scroll`, and `nav-mobile-panel-footer` in `app/globals.css`, with `ThemeToggle` passed `compact` to align with the desktop action cluster.

## Consequences

### Positive

- Mobile menu occupies the full viewport below the 56px header, improving visual clarity and parity with common mobile navigation sheets.
- Theme and contact actions remain at a predictable bottom location; nav links scroll when space is constrained.
- Safe-area padding reduces overlap with iOS home-indicator regions.

### Negative / Trade-offs

- Nav mobile styling is split across several BEM-like class names — contributors must edit both `globals.css` and `Nav.tsx` when changing structure.
- The tray remains a non-modal panel (no backdrop scrim) — acceptable for this scope but differs from some full-screen menu patterns.

### Operational Impact

- When adding mobile-only nav chrome, extend the existing class group in `globals.css` or document why a new pattern is needed.
- **Migration / rollback:** Revert `app/globals.css` nav-mobile-panel rules and the mobile panel JSX in `components/Nav.tsx` to the previous single-column stack; no data or API impact.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Flex `min-height: 0` omission on a future inner wrapper breaks scrolling and clips links | Low | Med | Keep the three-class pattern documented here; do not remove `min-height: 0` from scroll ancestors without retesting | Maintainer | Any refactor of `nav-mobile-panel` markup |
| Dynamic viewport / mobile browser chrome shifts visible height while the menu is open | Low | Low | `bottom: 0` tracks the layout viewport; if reports of clipping appear, evaluate `100dvh`/`min-height` follow-up per ADR-003 risk notes | Maintainer | User report on specific devices |

## Review Schedule

- **Next review:** 2026-07-01 (or when navigation IA or header height changes)
- **Review owner:** Maintainer

## Related ADRs

- ADR-001 — constrains: decorative link/CTA styles remain inline in `Nav.tsx`; new layout structure uses CSS classes.
- ADR-003 — extends: responsive navigation behavior continues to live in `globals.css` at `≤ 640px`; this ADR specifies the mobile tray structure in detail.

## References

- `app/globals.css` — `.nav-mobile-panel`, `.nav-mobile-panel-inner`, `.nav-mobile-panel-scroll`, `.nav-mobile-panel-footer`
- `components/Nav.tsx` — mobile panel markup and `ThemeToggle compact` in footer row
- ADR-003 — Responsive layout via CSS utility classes in globals.css
