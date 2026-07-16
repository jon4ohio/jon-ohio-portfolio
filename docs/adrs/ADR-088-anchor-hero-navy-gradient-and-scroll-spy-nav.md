# ADR-088: Anchor hero navy gradient + scroll-spy side nav

## Status
**Status:** Accepted  
**Date:** 2026-07-16  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

ADR-086 shipped the `/anchor` landing page with a left-aligned, bottom-anchored,
pure-black hero. A reference site (lafys.com) was supplied as a visual target:
navy gradient background with a soft glow, a centered hero with two bordered
buttons, and a fixed right-side vertical navigation that tracks scroll position
across page sections via small diamond markers connected by a line.

**In scope:** Restyle the `/anchor` hero to a navy gradient + glow, center its
content, add a persistent scroll-spy side navigation across the page's four
sections, and give the top-bar GitHub link a bordered pill treatment.  
**Out of scope:** Re-theming the Problem / 7 Contracts / Adopt sections' existing
ink-black background (already shipped under ADR-086); literal color-matching the
reference's orange glow (replaced with Anchor's established teal accent for brand
consistency). Route coexistence with `/work/anchor` is governed by ADR-087 (landing
is the sole public surface).

## Decision Drivers

- Match the reference's structural elements (gradient hero, centered content,
  bordered dual buttons, persistent scroll-tracking side nav) without abandoning
  Anchor's existing teal/ink/Newsreader identity established in ADR-086.
- Side nav must remain keyboard- and screen-reader-accessible (real `<a>` elements,
  visible focus states) — not decorative-only `<div>`s.
- Mobile has no equivalent placement for a vertical text+dot nav; hide it below
  ~880px rather than force an awkward compressed version.

## Decision

- **Hero background:** `linear-gradient(180deg, #050b14 0%, #0a1a2a 55%, #000 100%)`
  base with a `radial-gradient` teal glow overlay (`rgba(61,143,141,0.22)`) centered
  in the upper third — teal instead of the reference's orange, to stay on-brand.
- **Hero content:** centered (was left/bottom-anchored), new copy in the
  reference's rhetorical pattern — a bold claim plus a contrast line about effort:
  *"Coordination without the meetings."* / *"Most teams need a standup to know
  what's current. Anchor needs a markdown file."*
- **New `OutlineBtn` helper** in `app/anchor/page.tsx` — bordered, transparent
  background — used as the secondary hero CTA ("See how it works ↓") alongside
  the existing teal-filled `PrimaryBtn` ("View on GitHub →"), preserving GitHub
  as the visually primary action per the original adoption-funnel brief.
- **New `app/anchor/AnchorSideNav.tsx`** (`'use client'`): a fixed, right-aligned
  nav using `IntersectionObserver` to highlight the section currently in view.
  Items are real anchor links (`href="#id"`) with a click handler that calls
  `scrollIntoView` (respecting `prefers-reduced-motion`), a connecting vertical
  line rendered as a single absolutely-positioned element behind fixed-height
  rows (avoids fragile per-segment line-rotation math), and hidden via media
  query under 880px.
- **Section ids added** for scroll-spy targeting: hero → `id="home"` (already
  first on page), Problem → `id="problem"`, Contracts → already had
  `id="contracts"`, Adopt → `id="adopt"`.
- **Top-bar GitHub link** changed from plain underlined text to a small bordered
  pill, echoing the reference's bordered top-bar button treatment.

## Consequences

### Positive
- Hero now visually distinct from a flat black page — reads as a considered
  product surface with depth (gradient + glow).
- Side nav gives visitors an at-a-glance map of the page and one-click jumps,
  reducing scroll fatigue on a four-section single page.
- `OutlineBtn` is a reusable pattern if more secondary CTAs are added later.

### Negative / Trade-offs
- One additional `'use client'` file (`AnchorSideNav.tsx`) scoped to this route.
- Two Anchor-themed hero copy variants now exist historically (ADR-086's
  "Continue instead of reconstruct" vs this ADR's "Coordination without the
  meetings") — the page metadata title/description were left unchanged since they
  remain accurate taglines independent of the on-page hero copy.

### Operational Impact
- New file: `app/anchor/AnchorSideNav.tsx`
- Modified file: `app/anchor/page.tsx` (hero rework, `OutlineBtn`, section ids,
  side-nav render, top-bar pill)
- **Migration / rollback:** Remove `AnchorSideNav.tsx` and its import/render;
  revert the hero section, top-bar link, and section `id`s in `page.tsx` to their
  ADR-086 state.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Side nav IntersectionObserver mis-highlights on short viewports | Med | Low | Tune rootMargin/threshold in `AnchorSideNav`; hide under 880px | Owner | Reports of wrong active section |

## Related ADRs

- ADR-086 — related: `/anchor` route + SiteShell; this ADR restyles the hero and adds side nav
- ADR-087 — related: `/anchor` is the sole public Anchor surface; `/work/anchor` redirects here

## References

- Implementation: `app/anchor/page.tsx`, `app/anchor/AnchorSideNav.tsx`
- Visual reference (structure only): https://lafys.com
- Anchor repository: https://github.com/jon4ohio/anchor
