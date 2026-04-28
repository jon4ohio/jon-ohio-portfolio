# ADR-043: Flagship executive brief bento, before-state artifact, and hero metrics balance

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Proposed
**Date:** 2026-04-28
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` (Next.js App Router portfolio deployed on Vercel).

The SeamlessHiring flagship case study uses a custom page composition (`app/work/seamless-hiring/page.tsx`) and a set of reusable `components/case-study/*` modules. Recent iterations introduced:
- A more structured “Executive Brief” presentation (desktop bento grid; mobile stacked cards) meant to improve scanability without duplicating content.
- A “Before State” artifact immediately after Core Tensions to anchor the tension claims in visual evidence before the five-phase transformation modules.
- A typography/layout pass on hero metrics (homepage and case-study hero) to achieve an editorial, system-consistent balance across breakpoints.

Constraints:
- Must preserve repo styling conventions (inline layout styles; theme-safe via `var(--*)` tokens; minimal global utilities in `app/globals.css`).
- Must remain mobile-first and avoid horizontal overflow.
- Must keep the flagship narrative arc coherent: claim (tensions) → evidence (before-state) → resolution (phase evidence).

**In scope:** Executive Brief layout behavior and breakpoints; insertion of a before-state artifact under Core Tensions; homepage + case-study hero metric typography/layout balance.
**Out of scope:** Rewriting other sections of the flagship case study; changing `lib/projects.ts`; global theme/token system redesign.

## Decision Drivers

- Maintain an **editorial hierarchy** (value-first metrics, readable labels, consistent rhythm).
- Ensure **responsive stability** from mobile → tablet → desktop (no overflow, no awkward column spread).
- Preserve **theme-safe contrast** using existing tokens (`--fg`, `--fg-muted`, `--border`, `--surface`, `--surface-subtle`).
- Strengthen the flagship narrative with **evidence immediately following claims** (before-state artifact after tensions).
- Keep changes localized and reusable across future flagship work.

## Options Considered

### Option A: Keep prior rail-based Project Brief + no before-state artifact
- **Description:** Retain the sticky rail + right-column layout for the brief and proceed directly from tensions into phases/evidence.
- **Pros:**
  - Fewer moving parts and fewer responsive edge cases.
  - No new artifact insertion to tune spacing around.
- **Cons:**
  - Brief scanability is weaker; content density varies by viewport.
  - Tension claims lack immediate visual grounding before the long evidence spine.
- **Effort:** Low
- **Notes:** Leaves narrative “proof gap” between claims and resolution.

### Option B: Executive Brief bento + before-state artifact + metrics balance (chosen)
- **Description:** Use a desktop bento grid and mobile stacked cards for the Executive Brief, insert a before-state `AnnotatedFigure` under Core Tensions, and align hero metric typography/layout across homepage and case-study hero toward an editorial middle ground.
- **Pros:**
  - Stronger scanability and hierarchy across devices.
  - Clearer narrative arc: claims → evidence → resolution.
  - Metrics read as a unified system across the site.
- **Cons:**
  - Requires careful breakpoint tuning (grid wrap/dividers, spacing) to avoid regressions.
  - Introduces additional page content (artifact) that must be maintained and later swapped to a real screenshot.
- **Effort:** Medium
- **Notes:** Requires tablet-specific handling for wrapped metric grids and brief layouts.

## Decision

**We will use Option B because it best supports editorial hierarchy, responsive stability, and the flagship narrative arc (claim → evidence → resolution) while staying within the repo’s inline-style and token constraints.**

This decision prioritizes consistent visual rhythm and proof-forward storytelling without expanding the data model or changing the shared case-study renderer.

## Consequences

### Positive
- Executive Brief becomes scannable and consistent across desktop/tablet/mobile.
- Core Tensions gains immediate visual evidence, improving story credibility before the phase-by-phase fixes.
- Homepage and case-study hero metrics align stylistically, reducing cross-page UI “drift.”

### Negative / Trade-offs
- Additional breakpoint logic is needed (e.g., wrapped grid separators) and must be maintained.
- Before-state artifact may initially render a placeholder until a real screenshot is available.

### Operational Impact
- Contributors must validate at key breakpoints (desktop/tablet/mobile) after brief/metrics edits.
- **Migration / rollback:** Revert to the previous brief layout and remove the before-state block if layout regressions appear; revert `.hero-metrics` changes to fixed columns if adaptive grid introduces unexpected wrapping.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Wrapped metric dividers look misaligned on tablet widths | Med | Med | Use tablet-specific divider strategy (switch vertical rules to row separators) and re-check 768–1024px | John Ohio | Any metrics/CSS change or visual regression report |

## Review Schedule

- **Next review:** When a real SeamlessHiring before-state screenshot is added, or next flagship case-study iteration
- **Review owner:** John Ohio

## Related ADRs

- ADR-042 — depends on: static route override enables the flagship composition surface

## References

- `app/work/seamless-hiring/page.tsx`
- `components/case-study/MetadataBrief.tsx`
- `components/case-study/AnnotatedFigure.tsx`
- `app/globals.css` (`.hero-metrics`, `.brief-bento`, `.brief-mobile`)
- `docs/adrs/ADR-042-flagship-case-study-static-route-override.md`

