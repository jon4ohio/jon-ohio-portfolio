# ADR-046: Enforce a 4pt/8pt spacing grid in code and design handoff

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted
**Date:** 2026-04-29
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

This portfolio uses inline styles for layout and visual spacing, with supporting layout utilities in `app/globals.css`. Over time, spacing values have drifted to off-grid numbers (for example `6px`, `10px`, `18px`, `28px`), which creates inconsistent rhythm and makes future design-to-code handoff less predictable.

The design-side contract in `docs/figma-jop-structure.md` already describes a spacing scale based on `4, 8, 12, 16, 24, 32, 48`. The codebase needs an explicit, enforceable rule to keep implementation aligned with that guidance.

**In scope:** Defining a repository-wide spacing rule for code (`app/` and `components/`), adding an automated check for non-4pt spacing values in spacing properties, and aligning touched spacing in active case-study hero work.
**Out of scope:** Typography scale changes, line-height tuning, motion timing, or replacing all existing spacing values in one migration pass.

## Decision Drivers

- Spacing rhythm must remain visually consistent across pages and breakpoints.
- Design handoff must map to a stable, predictable spacing system.
- New work must prevent incremental drift from raw off-grid spacing values.
- Enforcement must be lightweight and runnable in local workflows.

## Options Considered

### Option A: Document-only rule (no automated checks)
- **Description:** Add a written “4pt/8pt only” rule and rely on manual review to catch violations.
- **Pros:** Lowest implementation effort.
- **Cons:** Drift likely returns; reviewers must inspect every spacing value manually.
- **Effort:** Low
- **Notes:** Rejected due weak enforcement.

### Option B: Add repository spacing checker + apply 4pt base rule (chosen)
- **Description:** Keep the 8pt rhythm for major layout while enforcing a 4pt base unit for spacing properties. Add a script that scans `app/` and `components/` for non-4pt values in spacing properties (`padding*`, `margin*`, `gap`, `rowGap`, `columnGap`) and fails when violations are found.
- **Pros:** Objective enforcement; easy to run locally; reduces future spacing entropy.
- **Cons:** Initial violations may require incremental cleanup; script is regex-based and may need refinement as code patterns evolve.
- **Effort:** Medium
- **Notes:** Implemented via `scripts/check-spacing-grid.mjs` and `npm run check:spacing-grid`.

## Decision

**We will use Option B because it makes spacing consistency enforceable instead of advisory.**

The portfolio adopts a **4pt base grid** for spacing values in code, with an **8pt rhythm preference** for major layout spacing. Any non-zero spacing value in scoped properties must be divisible by 4. A repository script will surface and fail violations, and spacing normalization will continue incrementally as files are touched.

## Consequences

### Positive
- Prevents new off-grid spacing values from entering core UI files.
- Improves visual rhythm consistency across components and pages.
- Strengthens Figma-to-code parity for spacing decisions.

### Negative / Trade-offs
- Existing off-grid values still require phased cleanup.
- **Mitigation:** Enforce for all new edits and clean neighboring violations during normal feature work.

### Operational Impact
- Contributors should run `npm run check:spacing-grid` during local validation for UI changes.
- **Migration / rollback:** If the check proves too noisy, scope can be narrowed temporarily by path while preserving the 4pt rule as policy.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Regex-based checker flags edge-case values or misses uncommon patterns | Med | Med | Refine script patterns and keep checks scoped to spacing properties only | Maintainer | First two weeks of usage or when false positives are reported |
| Team bypasses check in practice and spacing drift persists | Low | High | Include `check:spacing-grid` in routine validation and PR review checklist | Maintainer | Any PR with UI layout edits |

## Review Schedule

- **Next review:** 2026-07-29 or after the next major layout refactor.
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-001 — Inline styles for layout and visuals](./ADR-001-inline-styles-for-layout-and-visuals.md) — constrains implementation style where spacing values are authored.
- [ADR-003 — Responsive layout via CSS utility classes in globals.css](./ADR-003-responsive-layout-via-css-utility-classes.md) — constrains shared layout utility usage.
- [ADR-023 — Figma MCP handoff — map design output to JOP tokens](./ADR-023-figma-mcp-handoff-jop-tokens.md) — depends on consistent design-to-code conventions.

## References

- [`scripts/check-spacing-grid.mjs`](../../scripts/check-spacing-grid.mjs)
- [`package.json`](../../package.json)
- [`components/case-study/CaseHero.tsx`](../../components/case-study/CaseHero.tsx)
- [`docs/figma-jop-structure.md`](../figma-jop-structure.md)
