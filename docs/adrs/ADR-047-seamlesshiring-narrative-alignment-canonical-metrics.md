# ADR-047: SeamlessHiring narrative alignment to canonical metrics and system framing

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Proposed
**Date:** 2026-04-30
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` (Next.js App Router portfolio).

The SeamlessHiring flagship case study (`app/work/seamless-hiring/page.tsx`) evolved into a product leadership story (operating system + commercial repositioning). However, the body copy and outcome evidence had drifted across iterations:
- conflicting metrics (e.g. completion and annual pricing references) appearing in different parts of the page
- AI described as a lead claim rather than a Phase V support layer
- outcomes mixing non-canonical operational/commercial claims

To maintain credibility, the case study needs a single canonical metric system and a consistent “system re-architecture” framing across hero, phases, outcomes, and commercial proof.

Constraints:
- Preserve layout, spacing, and component composition.
- Apply changes primarily as copy updates to existing surfaces.
- Keep AI scoped as Phase V support (SeamlessHiring output), not SeamlessAI platform architecture.

**In scope:** Copy and evidence framing inside `app/work/seamless-hiring/page.tsx`; outcome rendering support for a Strategic caption; phase-spine intro subhead.
**Out of scope:** New sections, new components, changes to `lib/projects.ts`, and cross-case-study refactors.

## Decision Drivers

- Use a single canonical metric set across the page (avoid conflicting KPIs).
- Maintain clear cause → effect narrative: system design decisions → reliability/adoption → commercial positioning.
- Keep claims evidence-backed and consistent with the flagship arc.
- Preserve existing layout and typography hierarchy.

## Options Considered

### Option A: Keep current copy and allow metric drift
- **Description:** Make incremental edits without enforcing a canonical metric system.
- **Pros:** Lowest effort; minimal coordination.
- **Cons:** Reduced credibility; readers see conflicting numbers and mixed framing.
- **Effort:** Low
- **Notes:** Drift likely continues as the page iterates.

### Option B: Enforce canonical metric system + system framing (chosen)
- **Description:** Align hero abstract, tensions framing, phase-spine intro, Phase V AI positioning, and outcomes to a canonical set. Move commercial proof into the Strategic outcome card and remove disallowed/conflicting claims globally.
- **Pros:** Consistent evidence; clearer narrative; improved trust in the story.
- **Cons:** Requires careful auditing to avoid reintroducing conflicts.
- **Effort:** Medium
- **Notes:** Adds minimal support in `OutcomeCards` for a Strategic caption.

## Decision

**We will enforce a canonical metric system and consistent system-framing narrative for SeamlessHiring, and we will render commercial proof as a caption inside the Strategic outcome card.**

## Consequences

### Positive
- Single source of truth for metrics used on the page.
- AI remains correctly scoped as Phase V support.
- Commercial repositioning is documented as evidence, not implied.

### Negative / Trade-offs
- Future edits must respect the canonical set; ad-hoc metrics cannot be casually added.

### Operational Impact
- Maintain a “conflict scan” checklist when editing the page (completion %, annual pricing, and other deprecated claims).
- **Migration / rollback:** Revert `OutcomeCards` caption support and restore prior copy if canonicalization is later revised.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Deprecated metrics reappear in future edits | Med | Med | Add a standard grep/checklist in review; keep canonical set documented in this ADR | John Ohio | Any change to SeamlessHiring copy/outcomes |

## Review Schedule

- **Next review:** Next SeamlessHiring narrative revision or when new evidence replaces placeholders
- **Review owner:** John Ohio

## Related ADRs

- ADR-042 — depends on: static route override enables the flagship case study
- ADR-043 — constrains: executive brief and metrics system balance
- ADR-044 — constrains: Phase V pilot-review artifact and AI narrative boundary
- ADR-045 — relates: hero copy alignment with slug-card semantics (earlier iteration)

## References

- `app/work/seamless-hiring/page.tsx`
- `components/case-study/FlagshipSpine.tsx`
- `components/case-study/OutcomeCards.tsx`

