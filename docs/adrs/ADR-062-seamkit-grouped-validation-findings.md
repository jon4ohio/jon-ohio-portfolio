# ADR-062: SeamKit grouped validation findings block

## Status

**Status:** Accepted
**Date:** 2026-06-26
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` — SeamKit flagship case study (`app/work/seamkit/page.tsx`).

Section `#validation` (02 Evidence) presents four audit findings via a local `DecisionBlocks` helper. Each finding was rendered as its own bordered card with a repeated **Finding** eyebrow label — four identical labels for one logical evidence group. That repetition added noise without information and worked against the narrative polish goal of higher signal-to-noise in the Evidence chapter.

**In scope:** Presentation of `validationFindings` in `DecisionBlocks` on the SeamKit page only.
**Out of scope:** Finding copy, tension cards, `AnnotatedFigure` decision notes, extracting `DecisionBlocks` to shared components, other case studies.

## Decision Drivers

- Signal-to-noise: one label per evidence group, not per bullet.
- Consistency with grouped outcome tiers (`OutcomeCards` — one category label, multiple items inside).
- No change to stats, narrative, or chapter IA (ADR-061).

## Options Considered

### Option A: Keep per-item Finding cards

- **Description:** Leave four separate cards, each with its own **Finding** label.
- **Pros:** No code change; each stat visually isolated.
- **Cons:** Repeated label reads like four separate sections; scans slower on mobile.
- **Effort:** Low
- **Notes:** Status quo before ADR-062.

### Option B: Single grouped findings container (chosen)

- **Description:** One bordered surface block with a single **Finding** label and a bulleted list of four items inside.
- **Pros:** Clear grouping; matches OutcomeCards pattern; faster scan; label appears once.
- **Cons:** Slightly less vertical separation between stats than four cards.
- **Effort:** Low
- **Notes:** Middle-dot list matches non-Decision notes in `AnnotatedFigure`.

## Decision

**We will group SeamKit validation findings in one labeled container instead of four duplicate-labeled cards.**

The outer card keeps the existing left-border + surface styling; items use middle-dot prefixes inside a single `<ul>`.

## Consequences

### Positive

- Evidence section reads as one audit finding group with four observations.
- Aligns with signal-to-noise editorial pass on SeamKit narrative.
- `DecisionBlocks` gains empty-array guard and index-based keys for stability.

### Negative / Trade-offs

- Less visual separation between individual stats than four stacked cards.

### Operational Impact

- **Migration / rollback:** Revert `DecisionBlocks` in `app/work/seamkit/page.tsx` to per-item card map.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Grouped block feels dense on very small viewports | Low | Low | Section padding and list gap unchanged; spot-check ≤640px before merge | John Ohio | SeamKit layout refresh |

## Review Schedule

- **Next review:** Next SeamKit case study editorial pass
- **Review owner:** John Ohio

## Related ADRs

- ADR-061 — depends on: executive evidence narrative and validation section structure; presentation of findings amended (stats and copy unchanged)

## References

- `app/work/seamkit/page.tsx` — `DecisionBlocks`, `validationFindings`
- `components/case-study/OutcomeCards.tsx` — grouped category + items pattern
- `components/case-study/AnnotatedFigure.tsx` — middle-dot list for non-Decision notes
- ADR-061 — SeamKit executive evidence narrative
