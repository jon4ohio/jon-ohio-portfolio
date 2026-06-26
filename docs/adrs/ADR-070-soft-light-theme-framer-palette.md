# ADR-070: Soft light theme (Framer-inspired palette, warm removal)

## Status
**Status:** Accepted
**Date:** 2026-06-26
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None (narrows ADR-007 warm/light split; warm theme removed)

## Context

The portfolio previously shipped three themes (`light`, `warm`, `dark`). The warm theme (sand/coral) was the SSR default. A Framer portfolio case study ([Godspower Ehioze — leave case study](https://ehiozegodspowerebiowei.framer.website/leave-case-study)) demonstrates a calming light aesthetic: off-white sage canvas, pastel section fills, lavender image chrome, and forest-green emphasis bands.

The product direction is to **retire warm**, make **light** the single calming light experience, and adopt sage/lavender/forest accents with subtle gradients. Dark mode remains unchanged in structure (slate + violet).

**In scope:** theme count reduction, light decision-token palette, gradient token wiring, warm → light migration, docs.
**Out of scope:** serif display typography, Figma variable re-sync, layout restructure.

## Decision Drivers

- Light mode must feel soft and calming (not clinical pure-white + cool grey).
- Theme system must stay token-driven with no component theme branching.
- WCAG AA for muted text on sage canvas and forest emphasis labels.
- Stored `warm` preferences must not break after deploy.

## Options Considered

### Option A: Retune light only; keep warm as alternate light palette
- **Description:** Update `:root[data-theme="light"]` with Framer pastels; leave warm for users who prefer coral/sand.
- **Pros:** No migration risk; two light aesthetics.
- **Cons:** Maintains dual light palettes and confused naming; contradicts product goal to optimize one calming light theme.
- **Effort:** Medium
- **Notes:** Rejected per owner direction.

### Option B: Remove warm; rebuild light with sage/lavender/forest + gradient wiring (chosen)
- **Description:** Two themes (`light`, `dark`); light uses new primitives and gradient decision tokens; migrate stored `warm` to `light`.
- **Pros:** Single light identity; aligns with reference; gradient tokens finally consumed in canvas, metrics, image chrome.
- **Cons:** Users on warm see visual change; sand/coral brand association removed from light.
- **Effort:** Medium
- **Notes:** Time-of-day default becomes light 06:00–18:00, dark otherwise.

## Decision

**We will use Option B because the site needs one calming light palette aligned with the Framer reference, and maintaining warm duplicates effort without serving the new visual direction.**

Implementation: new sage/cream/lavender/forest primitives; `:root, :root[data-theme="light"]` decision block; `--jop-fill-impact-gradient` and `--asset-chrome-gradient`; body canvas wash; warm migration in `coerceTheme` and `ThemeScript`.

## Consequences

### Positive
- Cohesive soft light experience with visible but subtle gradients on canvas, metrics, and image frames.
- Simpler theme toggle (Light / Dark) and time-of-day logic.
- Token architecture unchanged — components keep using `--fg`, `--surface`, etc.

### Negative / Trade-offs
- Warm/coral visual identity removed; returning users may notice a palette shift (mitigated by `warm` → `light` migration).
- Figma file still lists `warm` mode until design sync — code is source of truth until updated.

### Operational Impact
- Contributors edit light tokens only in `app/globals.css` light block.
- **Migration / rollback:** Revert ADR-070 commit; re-add warm block and three-theme toggle if needed.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Muted sage text fails contrast on impact-gradient badges | Low | Med | Pin `--jop-text-muted` to sage-80; axe in CI on light | John Ohio | Metric badge style change |
| Dark theme regression from shared alias edits | Low | Med | Keep dark block isolated; add `--jop-fill-impact-gradient` slate variant | John Ohio | Any dark token edit |

## Review Schedule

- **Next review:** 2026-12-26 or next major visual refresh
- **Review owner:** John Ohio

## Related ADRs

- ADR-007 — theme naming; warm/light split superseded for theme count
- ADR-011 — surface-hover pattern retained; warm-specific rationale historical only
- ADR-023 — Figma MCP handoff; update Figma modes to light/dark

## References

- [Framer reference — leave case study](https://ehiozegodspowerebiowei.framer.website/leave-case-study)
- [`app/globals.css`](../app/globals.css) — token implementation
- [`docs/theme-tokens.md`](../theme-tokens.md)
