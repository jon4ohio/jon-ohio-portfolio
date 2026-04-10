# ADR-007: Theme naming and contrast hardening (warm + light)

## Status
**Status:** Accepted
**Date:** 2026-04-10
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** ADR-006

## Context

ADR-006 introduced a dual-theme token system with `claude` and `legacy` theme names. Follow-up review required two refinements:

1. Theme names should be presentation-oriented (`warm` and `light`) rather than source-brand/internal naming.
2. Several token choices in the warm palette (`fg-muted`, `fg-subtle`, and orange text accents) were below recommended WCAG contrast targets for small text on light backgrounds.

The architecture from ADR-006 remains valid; this ADR narrows and hardens naming and accessibility behavior.

**In scope:** rename theme IDs (`claude` -> `warm`, `legacy` -> `light`), strengthen text/accent contrast tokens, keep semantic token API stable.
**Out of scope:** user-visible theme toggle, typography/layout changes, component structure changes.

## Decision Drivers

- Must keep theme semantics understandable by design intent (`warm` vs `light`).
- Must keep normal-size text and metadata token contrast at accessible levels.
- Must avoid broad component rewrites by preserving semantic token names.

## Options Considered

### Option A: Rename themes and harden contrast tokens (chosen)
- **Description:** Rename root theme IDs to `warm` and `light`; update palette token names accordingly; darken muted/subtle and orange text tokens to meet contrast expectations.
- **Pros:** clearer naming, better readability/accessibility, minimal code churn, keeps ADR-006 architecture.
- **Cons:** requires synchronized updates across CSS, layout, docs, and ADR references.
- **Effort:** Low
- **Notes:** Compatible with all existing semantic token consumers.

### Option B: Keep theme names and only patch problematic text instances
- **Description:** Leave `claude`/`legacy` naming intact and directly adjust low-contrast component styles one by one.
- **Pros:** very localized visual adjustments.
- **Cons:** inconsistent naming remains; accessibility fixes become scattered and brittle.
- **Effort:** Medium
- **Notes:** Weaker long-term maintainability than token-level correction.

## Decision

**We will use Option A because it aligns naming with visual intent and centralizes accessibility improvements at the token layer.**

This keeps component usage stable while making readability improvements systemic and easier to maintain.

## Consequences

### Positive
- Theme naming now reflects UI intent: `warm` and `light`.
- Contrast for muted and accent text improves across pages without component-level rewrites.
- Theme switching remains one-line in layout.

### Negative / Trade-offs
- Documentation and ADR references require updates when naming conventions change.
- Accent colors used for decorative elements remain intentionally less contrast-critical; text accents now use darker mapped values.

### Operational Impact
- New text colors should be introduced through semantic tokens first, not one-off hex in components.
- Theme IDs in layout/docs must stay aligned with `data-theme` scopes.
- **Migration / rollback:** switch `activeTheme` between `warm` and `light` in layout; token mappings handle the rest.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Future token edits regress contrast in one theme | Med | Med | Run contrast checks for primary text/muted/accent token pairs on every theme token change | Maintainer | Any update to `app/globals.css` theme token blocks |

## Review Schedule

- **Next review:** 2026-07-10
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-001 — constrains inline styling approach.
- ADR-005 — prior color-token normalization.
- ADR-006 — superseded by this ADR.

## References

- `app/globals.css`
- `app/layout.tsx`
- `README.md`
- `docs/adrs/ADR-006-dual-brand-theme-token-system.md`
