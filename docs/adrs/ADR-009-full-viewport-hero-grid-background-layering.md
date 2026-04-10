# ADR-009: Full-viewport hero grid background layering

## Status
**Status:** Accepted
**Date:** 2026-04-10
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

The hero includes an animated perspective grid rendered on a canvas. The previous structure placed the canvas and radial overlay inside a max-width content section, which visually clamped the grid to the content column instead of the viewport.

The requested behavior is for the grid and overlay to behave as background layers that span the full viewport width, while hero text and CTAs remain constrained and readable.

**In scope:** Hero layout structure and layering model for full-viewport background rendering with constrained foreground content.
**Out of scope:** Changing hero copy, CTA destinations, wave math model, or global page layout outside the Hero component.

## Decision Drivers

- Background treatment must span viewport width while content remains constrained to `maxWidth: 1120`.
- Hero content readability and interaction must be preserved (`pointerEvents: none` for background layers, correct z-index order).
- The solution must align with existing inline-style and component-local implementation conventions.

## Options Considered

### Option A: Full-width outer wrapper with constrained inner content section (chosen)
- **Description:** Use a full-width outer wrapper for grid canvas + radial overlay, then render existing hero content in an inner centered section with `maxWidth: 1120`.
- **Pros:** Clean layering model, predictable full-bleed background behavior, preserves current content layout and responsiveness.
- **Cons:** Adds one structural container level in `Hero.tsx`.
- **Effort:** Low
- **Notes:** Keeps background and foreground concerns explicitly separated.

### Option B: Keep current max-width section and fake full-bleed via negative offsets
- **Description:** Retain the current constrained section and attempt viewport coverage using absolute positioning hacks (negative left/right or transform offsets).
- **Pros:** Fewer structural changes.
- **Cons:** Fragile across breakpoints, harder to reason about clipping and overflow, increases maintenance complexity.
- **Effort:** Medium
- **Notes:** Rejected due to long-term maintainability and predictable responsiveness concerns.

## Decision

**We will use Option A because it satisfies full-viewport background requirements while preserving constrained hero content and clear layering semantics.**

The hero now uses a full-width outer wrapper for background rendering and an inner constrained section for text/CTAs. This approach directly supports the viewport-span requirement, keeps interaction behavior safe with non-interactive background layers, and remains consistent with the project's inline-style structure.

## Consequences

### Positive
- Grid canvas and overlay render across the viewport width as intended.
- Hero copy and CTAs remain in the existing centered, readable layout.
- Layering behavior is explicit and easier to maintain.

### Negative / Trade-offs
- Slight increase in JSX nesting for Hero layout structure.

### Operational Impact
- Future hero background effects should be added to the full-width wrapper layer, not the constrained content section.
- **Migration / rollback:** rollback by moving `GridCanvas` and overlay back into the constrained section and removing the outer wrapper if full-viewport behavior is no longer desired.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Future edits accidentally place new background effects inside the constrained section, reintroducing width clamping | Med | Med | Keep layering conventions documented in ADR and review Hero structure during UI changes | Maintainer | Any future Hero layout/background refactor |

## Review Schedule

- **Next review:** 2026-07-10
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-001 — constrains styling approach via inline styles.
- ADR-003 — informs responsive layout expectations.

## References

- `components/Hero.tsx`
- `components/ThemeToggle.tsx` (hydration-safe theme initialization: SSR-stable default + deferred client sync)
- `components/ThemeScript.tsx` (pre-hydration `data-theme` bootstrap)
- `docs/adrs/index.md`
