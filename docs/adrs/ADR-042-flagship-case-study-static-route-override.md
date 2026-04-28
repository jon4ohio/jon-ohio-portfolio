# ADR-042: Flagship case study via static route override

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Proposed
**Date:** 2026-04-28
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` (Next.js App Router portfolio deployed on Vercel).

The shared case study renderer at `app/work/[slug]/page.tsx` provides a consistent baseline for most projects (hero, metric chips, role/scope, narrative sections, asset blocks). For **SeamlessHiring 2.0**, we needed a flagship case-study architecture: sticky chapter navigation, a five-phase evidence spine, captioned figures with decision notes, an accordion decision log, and outcomes/unlocks sections — without changing the baseline template or the `Project` data model in `lib/projects.ts`.

Constraints:
- Must not modify `lib/projects.ts` (data shape remains stable across the site).
- Must not break or fork the shared dynamic `[slug]` renderer for other case studies.
- Must preserve the repo’s styling conventions (inline styles + existing CSS variables and a small set of global grid utilities).

**In scope:** How the SeamlessHiring case study is routed and rendered, and the reusable components used to compose it.
**Out of scope:** Migrating all case studies to the flagship structure; changing the global theme/token system; changing the `Project` interface or data model.

## Decision Drivers

- Maintain **stability of the shared case study template** for all other slugs.
- Enable a **flagship narrative structure** that exceeds the baseline template capabilities.
- Keep implementation **theme-safe** (warm/light/dark) via existing CSS variables.
- Ensure the approach is **reusable** for future flagship case studies (e.g. Seamkit, ClearPrice, FetsProza) without forcing immediate migration.
- Keep changes **low-risk and localized** (routing override + new components).

## Options Considered

### Option A: Static route override for the SeamlessHiring slug (chosen)
- **Description:** Add `app/work/seamless-hiring/page.tsx` as a static route that takes precedence over `app/work/[slug]/page.tsx` for this slug. Compose the flagship page from new, prop-driven components under `components/case-study/`.
- **Pros:**
  - Zero changes to `lib/projects.ts` and the shared `[slug]` template.
  - Fully custom layout for the flagship narrative without affecting other pages.
  - Components can be reused by future flagship case studies incrementally.
- **Cons:** Duplicates some content already present in `lib/projects.ts` for this slug; introduces a second rendering path for a single case study.
  - **Effort:** Medium
  - **Notes:** Requires careful adherence to token and layout conventions so the override still “feels like the site.”

### Option B: Extend the shared `[slug]` template with a “flagship mode”
- **Description:** Add a richer schema to `Project` and modify `app/work/[slug]/page.tsx` to conditionally render either baseline or flagship layouts.
- **Pros:**
  - Single rendering path; avoids duplicated content.
  - Enables gradual migration under one template.
- **Cons:** Higher risk: touches shared rendering logic; increases complexity of the shared route; forces data-model decisions in `lib/projects.ts` now.
  - **Effort:** High
  - **Notes:** Harder to keep changes localized; requires more regression coverage.

## Decision

**We will use Option A (static route override) because it delivers the flagship case-study architecture while keeping the shared `[slug]` template and `lib/projects.ts` stable.**

This aligns with the drivers of localized change, low risk, and incremental reuse: we can adopt the same component set for other flagship case studies over time without requiring a global schema change upfront.

## Consequences

### Positive
- SeamlessHiring gains a flagship, chaptered, evidence-driven narrative structure without destabilizing other case studies.
- The new `components/case-study/*` primitives become a reusable template for future flagship pages.

### Negative / Trade-offs
- Some duplication of copy and metrics between `lib/projects.ts` and the override page.
  - **Mitigation:** Treat the override as the source of truth for the flagship page; optionally reconcile `lib/projects.ts` later as a follow-up if needed.

### Operational Impact
- Onboarding: new contributors must know that `/work/seamless-hiring` is rendered by a static route.
- Maintenance: changes to the flagship structure occur in `components/case-study/*` and `app/work/seamless-hiring/page.tsx`.
- **Migration / rollback:** Remove `app/work/seamless-hiring/page.tsx` to fall back to the shared `[slug]` renderer immediately.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| The override diverges visually/behaviorally from site conventions over time | Med | Med | Enforce token usage via `var(--*)`, reuse existing layout bands (1240/760), keep page-scoped CSS minimal | Design/Engineering owner | Any future flagship adoption or major theme change |

## Review Schedule

- **Next review:** When adding the next flagship case study (Seamkit or ClearPrice)
- **Review owner:** John Ohio

## Related ADRs

- ADR-001 — constrains: inline styles for layout and visuals
- ADR-002 — constrains: static in-repo data for case studies
- ADR-006 — constrains: dual-brand theme token system
- ADR-020 — depends on: `AssetImage` aspect-box treatment patterns

## References

- `app/work/[slug]/page.tsx`
- `app/work/seamless-hiring/page.tsx`
- `components/case-study/*`
- `app/globals.css`

