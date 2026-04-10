# ADR-006: Dual brand theme token system (legacy + claude)

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Superseded by ADR-007
**Date:** 2026-04-10
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

The portfolio moved to Claude brand colors, but the previous site palette still needs to remain available for fast rollback and future multi-theme support. The project already relies on semantic CSS variables (`--bg`, `--fg`, `--border`, etc.) consumed by inline style props across pages/components.

Changing semantic tokens in-place to a single palette makes rollback dependent on git history and creates friction for future brand experiments. A stable approach is needed that preserves both palettes in code while keeping component usage unchanged.

**In scope:** color token architecture for preserving and switching between `legacy` and `claude` palettes at code level via root theme attribute.
**Out of scope:** user-facing theme toggle UI, typography changes, spacing/layout changes, animation changes.

## Decision Drivers

- Must preserve prior brand colors in source control as active, runnable tokens (not archive-only).
- Must keep component code stable by continuing semantic token usage.
- Must support low-risk, one-line default theme switching at code level.
- Must minimize regression risk by avoiding broad component rewrites.

## Options Considered

### Option A: Dual palette + semantic mapping by theme scope
- **Description:** Define `--legacy-*` and `--claude-*` palette tokens, then map existing semantic tokens in `:root[data-theme="..."]` scopes. Keep components consuming semantic tokens only. Set active default in layout.
- **Pros:** preserves both palettes in code; keeps component interfaces unchanged; enables instant default switch; supports future UI toggle.
- **Cons:** increases token count and requires disciplined token maintenance.
- **Effort:** Medium
- **Notes:** Works with existing inline-style architecture and avoids churn in page components.

### Option B: Single active palette and rely on git revert for old colors
- **Description:** Keep only one semantic token set active and recover old colors from git history when needed.
- **Pros:** smallest immediate code change.
- **Cons:** no first-class multi-theme support; slower rollback; higher chance of accidental token drift; weak foundation for future theme controls.
- **Effort:** Low
- **Notes:** Feasible but operationally brittle for iterative brand work.

## Decision

**We will use Option A because it preserves both brand palettes in the codebase while keeping all current component semantics stable.**

The implementation keeps semantic token names unchanged for compatibility, introduces two palette namespaces, and switches mappings through `data-theme` on the root document. This satisfies rollback speed, future extensibility, and low-regression delivery.

## Consequences

### Positive
- Both `legacy` and `claude` brand colors remain available and versioned in the codebase.
- Default theme can be changed in one place without touching component files.
- Existing pages/components continue to work through unchanged semantic tokens.

### Negative / Trade-offs
- Token maintenance complexity increases because there are now two palette namespaces.
- A few theme-aware overlay/backdrop variables must be maintained alongside semantic text/border/surface tokens.

### Operational Impact
- Developers should add or modify colors through palette namespaces, then map through semantic tokens.
- README now includes code-level switching instructions for default theme.
- **Migration / rollback:** revert to prior visual identity by changing the root default theme from `claude` to `legacy` in layout.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Semantic token mappings diverge between `legacy` and `claude`, causing inconsistent contrast in one theme | Med | Med | Keep a single semantic mapping block per theme and verify both themes during PR checks by temporarily switching `activeTheme` | Maintainer | Any token changes in `app/globals.css` or root theme logic |

## Review Schedule

- **Next review:** 2026-07-10
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-001 — constrains inline styling approach that consumes semantic tokens.
- ADR-005 — extends prior color-token normalization work with multi-theme architecture.
- ADR-007 — supersedes naming and accessibility refinements for theme tokens.

## References

- `app/globals.css`
- `app/layout.tsx`
- `README.md`
- `docs/adrs/ADR-001-inline-styles-for-layout-and-visuals.md`
- `docs/adrs/ADR-005-audit-driven-ux-a11y-polish.md`
