# ADR-011: Surface-hover token for perceptible warm-theme hovers

## Status

**Status:** Superseded by ADR-070 (warm theme removed; `--surface-hover` pattern retained)  
**Date:** 2026-04-10  
**Decision Maker(s):** Jon Ohio (Product Design Lead)  
**Supersedes:** None  

## Context

The warm theme maps both canvas and default surface fills to the same sand token (`--jop-bg-canvas` and `--jop-bg-surface`), so `--bg` and `--surface` resolve to identical colors. Several hover rules used `background: var(--surface)` on content that already sits on the canvas (e.g. work index rows and homepage selected-systems project links). In that situation hover produced no visible change, which weakens affordance and accessibility for pointer users.

Homepage hero metrics copy was also refined to attribute two Seamkit DS outcomes explicitly (`tokens used`, `teams onboarded`).

**In scope:** Semantic token for interactive hover wash; CSS hover rules that previously used `--surface` on canvas; homepage `heroMetrics` labels for Seamkit DS attribution.  
**Out of scope:** Redesigning navigation structure, new animation systems, or changing non-hover theme palettes.

## Decision Drivers

- Perceptible hover feedback in the default warm theme without heavy UI chrome  
- Single consistent pattern across themes (light/dark/warm) via existing surface-subtle ramp  
- Minimal code churn: one alias + two rule updates  
- Attribution clarity for DS metrics on the homepage  

## Options Considered

### Option A: Diverge warm `--jop-bg-surface` from canvas globally

- **Description:** Make default surface a distinct token everywhere in warm so `--surface` differs from `--bg` sitewide.  
- **Pros:** Fixes hover “for free” anywhere surface is used.  
- **Cons:** Broad visual shift; may affect many surfaces that intentionally matched canvas; higher regression risk.  
- **Effort:** Medium  
- **Notes:** Harder to reason about and to validate across all pages.  

### Option B: Introduce `--surface-hover` mapped to `--jop-bg-surface-subtle` and use for canvas-level hovers

- **Description:** Add a compatibility alias `--surface-hover` and point row/link hovers at it instead of `--surface`.  
- **Pros:** Surgical fix; uses existing subtle ramp; works in all themes; warm gains clear contrast (sand-10 → sand-40).  
- **Cons:** Another token to remember; hover is slightly stronger than “same as surface” in themes where surface already differs from canvas (acceptable).  
- **Effort:** Low  
- **Notes:** Aligns with nav links already using `--surface-subtle` for active/hover emphasis.  

### Option C: Only underline or color-change on hover (no background)

- **Description:** Remove background hover on rows/links; rely on text color or underline.  
- **Pros:** No surface token issues.  
- **Cons:** Weaker hit targets; diverges from existing row-hover pattern; may not match editorial list affordance.  
- **Effort:** Low  
- **Notes:** Rejected for consistency with existing interaction language.  

## Decision

**We will use Option B because it fixes invisible hovers with minimal blast radius and reuses the established subtle surface ramp.**

`--surface-hover` is defined as `var(--jop-bg-surface-subtle)`. Work list rows and system project links on the homepage use this token for `:hover` background so the wash is always distinct from the canvas in warm, while light and dark themes retain clear, subtle feedback.

## Consequences

### Positive

- Hover states are visible in warm theme for work index rows and selected-systems links.  
- One named semantic makes the intent explicit for future interactive rows.  
- Homepage metrics copy reflects Seamkit DS attribution where intended.  

### Negative / Trade-offs

- In themes where `--surface` already differs from `--bg`, hover uses the subtle ramp (slightly more contrast than before); still within acceptable minimal UI.  

### Operational Impact

- **Onboarding:** Document `--surface-hover` for new list-row or cardless interactive patterns on canvas.  
- **Migration / rollback:** Revert `app/globals.css` and `app/page.tsx` metrics lines; remove `--surface-hover` alias.  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Future hovers use `--surface` on canvas again and repeat the bug | Med | Med | Prefer `--surface-hover` in code review for row-level hovers; grep for `hover` + `--surface` | Product Design Lead | New list or link pattern added without hover QA in warm |

## Review Schedule

- **Next review:** 2026-07-10 or on next major theme token change  
- **Review owner:** Product Design Lead  

## Related ADRs

- ADR-007 — relationship: depends on (theme token structure)  
- ADR-010 — relationship: related (homepage metrics narrative; this ADR updates metric copy detail)  

## References

- `app/globals.css` (`--surface-hover`, `.work-list-row:hover`, `.system-project-link:hover`)  
- `app/page.tsx` (`heroMetrics`)  
