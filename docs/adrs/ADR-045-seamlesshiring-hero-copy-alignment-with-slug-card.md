# ADR-045: Align SeamlessHiring flagship hero copy with slug-card voice

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted
**Date:** 2026-04-29
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

The portfolio has two surfaces representing SeamlessHiring:
- The shared `/work/[slug]` hero (data-driven from `lib/projects.ts`)
- The flagship static override `/work/seamless-hiring` using `CaseHero`

Recent refinements improved flagship structure and responsiveness, but key copy/metric semantics drifted between the two surfaces:
- Subtitle mismatch (`Recruitment Management System` vs `Recruitment Management System (RMS)`)
- Different abstract voice and emphasis
- Hero metric labels used different semantics (`Support load` vs `Support tickets`, etc.)

This created avoidable inconsistency in narrative rhythm and evidence framing for the same case study.

**In scope:** `CaseHero` prop values in `app/work/seamless-hiring/page.tsx` (subtitle, thesis, abstract, impact labels/order) and the SeamlessHiring card summary in `lib/projects.ts`.
**Out of scope:** Layout/spacing changes; shared `/work/[slug]` renderer; other case studies.

## Decision Drivers

- Preserve a coherent content voice for the same project across two routes.
- Keep flagship structure while aligning key semantics with canonical project copy.
- Improve readability and KPI clarity in hero metrics.
- Make edits low risk (prop-value replacement only).

## Options Considered

### Option A: Keep flagship copy independent from slug-card wording
- **Description:** Continue using separate copy for flagship hero and slug hero.
- **Pros:** Maximum freedom for narrative styling on the flagship page.
- **Cons:** Ongoing drift risk; conflicting terms for the same KPI and subtitle.
- **Effort:** Low
- **Notes:** Requires manual consistency checks each time either surface changes.

### Option B: Align flagship hero props to slug-card semantics (chosen)
- **Description:** Update `CaseHero` props so subtitle and abstract align with slug-card voice and metric labels/order match canonical semantics.
- **Pros:** Consistent voice and KPI semantics; lower cognitive dissonance for readers.
- **Cons:** Slightly reduces freedom to use alternate phrasing in the flagship hero.
- **Effort:** Low
- **Notes:** Keeps flagship layout/rhythm intact while aligning core content.

## Decision

**We will align SeamlessHiring flagship `CaseHero` copy props with slug-card semantics while preserving flagship layout and hierarchy.**

## Consequences

### Positive
- Copy parity across flagship and shared case-study surfaces.
- Cleaner metric interpretation (`Support tickets`, `Application drop-offs`, etc.).
- Reduced editorial maintenance overhead for this project.

### Negative / Trade-offs
- Flagship hero copy becomes more constrained by canonical wording.

### Operational Impact
- Future copy edits should be validated in both `/work/seamless-hiring` and `/work/seamless-hiring` slug-card source semantics.
- **Migration / rollback:** Revert prop replacements in `app/work/seamless-hiring/page.tsx` if narrative differentiation is later preferred.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Future drift between slug-card and flagship wording recurs | Med | Med | Add copy checks in review for subtitle/abstract/metric labels on both surfaces | John Ohio | Any update to SeamlessHiring hero copy or metrics |

## Review Schedule

- **Next review:** Next SeamlessHiring copy revision
- **Review owner:** John Ohio

## Related ADRs

- ADR-042 — depends on: static route override for SeamlessHiring
- ADR-043 — constrains: flagship brief/metrics editorial balance
- ADR-044 — complements: Phase V pilot-review boundary and evidence framing

## References

- `app/work/seamless-hiring/page.tsx`
- `app/work/[slug]/page.tsx`
- `lib/projects.ts`

