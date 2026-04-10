# ADR-016: Mobile nav link column layout and vertical footer actions

## Status

**Status:** Accepted
**Date:** 2026-04-11
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

The mobile menu tray (ADR-015) rendered primary nav links as adjacent [`Link`](https://nextjs.org/docs/app/api-reference/components/link) components. `Link` resolves to `<a>`, which is **inline** by default; with no whitespace between JSX siblings, labels visually concatenated (e.g. `HomeWorkLeadershipAbout`). Separately, the footer placed `ThemeToggle` and the mail CTA in a **horizontal** row; UX review called for a **vertical** stack and a full-width primary CTA on small screens.

**In scope:** CSS for `.nav-mobile-panel-scroll` and `.nav-mobile-panel-footer`, and inline CTA styles in `Nav.tsx` for the mobile panel only.

**Out of scope:** Desktop nav, ADR-015 full-height tray mechanics (unchanged), focus management, new tokens.

## Decision Drivers

- Nav links must appear as **distinct rows** with predictable tap targets.
- **ADR-001:** structural layout stays in `globals.css` classes; CTA visual styling stays inline in `Nav.tsx`.
- Footer actions: **theme first**, **Get in touch** below, with clear spacing (`gap: 16px`).
- CTA should read as a **primary full-width** control in the mobile footer without stretching the theme radiogroup to full width.

## Options Considered

### Option A: Flex column on scroll + vertical footer + full-width CTA

- **Description:** Set `.nav-mobile-panel-scroll` to `display: flex; flex-direction: column; align-items: stretch` so each link row spans the width. Set `.nav-mobile-panel-footer` to `flex-direction: column`, `align-items: flex-start`, `gap: 16px`. Style the mail anchor as `display: flex; width: 100%; justify-content: center; box-sizing: border-box` so the button spans the tray while the theme toggle keeps intrinsic width.
- **Pros:**
  - Fixes inline link collapse without per-link class noise.
  - Matches common mobile pattern (stacked utilities + full-width primary action).
- **Cons:**
  - ADR-015’s written decision mentioned a horizontal footer row — this ADR documents the superseding layout choice for that row only.
- **Effort:** Low
- **Notes:** Implemented.

### Option B: `display: block` on every mobile `Link` only

- **Description:** Leave scroll region as a block box; add `display: block` or `width: 100%` inline on each mobile link.
- **Pros:**
  - Explicit at the component level.
- **Cons:**
  - Duplicates layout intent across four links; easy to miss when adding routes.
- **Effort:** Low
- **Notes:** Rejected in favor of a single CSS rule on the scroll container.

## Decision

**We will use Option A** — column flex on `.nav-mobile-panel-scroll`, vertical footer with `align-items: flex-start`, and a full-width flex-centered mail CTA.

## Consequences

### Positive

- Nav labels render as four readable rows; no concatenation artifact.
- Theme and contact actions have a clear vertical hierarchy; CTA is easy to tap across the tray width.

### Negative / Trade-offs

- Footer no longer mirrors the desktop horizontal CTA cluster; designers must reference ADR-016 for mobile-specific behavior.

### Operational Impact

- When adding mobile nav links, ensure they remain children of `.nav-mobile-panel-scroll` so column layout applies.
- **Migration / rollback:** Revert the `.nav-mobile-panel-scroll` / `.nav-mobile-panel-footer` blocks in `globals.css` and the mobile mail `a` styles in `Nav.tsx`.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| New mobile-only content is added outside `.nav-mobile-panel-scroll` and loses column layout | Low | Med | Keep mobile nav links inside the scroll region; document in `CLAUDE.md` if needed | Maintainer | New link added to mobile menu |

## Review Schedule

- **Next review:** 2026-07-01 (with ADR-015 / nav review) or when mobile nav IA changes
- **Review owner:** Maintainer

## Related ADRs

- ADR-015 — depends on: full-height tray and bottom-pinned footer region; **ADR-016 amends** the footer action orientation and documents link-column layout.
- ADR-001 — constrains: layout structure in CSS classes, decoration inline.
- ADR-003 — responsive nav rules live in `globals.css` at `≤ 640px`.

## References

- `app/globals.css` — `.nav-mobile-panel-scroll`, `.nav-mobile-panel-footer`
- `components/Nav.tsx` — mobile panel markup and mail CTA styles
- ADR-015 — Mobile navigation full-height tray with bottom-pinned actions
