# ADR-064: AnnotatedFigure inline figure label and caption

## Status

**Status:** Accepted
**Date:** 2026-06-26
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` — shared case-study figure component (`components/case-study/AnnotatedFigure.tsx`).

Figure captions rendered the index label (`Figure 01`) and italic caption body as stacked block elements (`<span>` then `<p marginTop: 4>`). On SeamKit section `#validation` (FigJam workshop snapshot), the stacked layout read as two separate lines and wasted vertical space under evidence images. The same pattern appears on every flagship case study using `AnnotatedFigure` with a non-empty `caption`.

**In scope:** Caption row layout in `AnnotatedFigure` when `imageOnly` is false.
**Out of scope:** Decision notes block, `imageOnly` mode, `ArtifactPlaceholder`, per-page caption overrides.

## Decision Drivers

- Editorial scan: figure index and caption should read as one caption line (`Figure 01 — …`).
- Consistency: one component change applies to SeamKit, FetsProza, Seamless Hiring, and `EvidenceModule` consumers.
- Accessibility: preserve existing token colors and text sizes (no contrast regression).
- Minimal diff: no new props; empty `caption` still supported.

## Options Considered

### Option A: Keep stacked label + caption

- **Description:** Leave label above caption in separate block elements.
- **Pros:** No change; long captions get clear visual separation from label.
- **Cons:** Repetitive vertical rhythm; label feels orphaned from caption on single-sentence captions.
- **Effort:** Low
- **Notes:** Status quo before ADR-064.

### Option B: Inline label and caption in one paragraph (chosen)

- **Description:** Single `<p>` with uppercase label span, em dash separator, and italic caption span; natural wrap on narrow viewports.
- **Pros:** Matches editorial figure-caption convention; applies globally; decision notes remain stacked below.
- **Cons:** Very long captions wrap mid-line after the dash (acceptable with `lineHeight: 1.6`).
- **Effort:** Low
- **Notes:** Empty `caption` omits dash and caption span (EvidenceModule image-only-adjacent usage).

## Decision

**We will render `AnnotatedFigure` label and caption inline in one paragraph, separated by an em dash, across all case studies.**

Decision notes and optional ADR-style blocks below the caption row are unchanged.

## Consequences

### Positive

- SeamKit validation FigJam figure and all sibling figures scan as unified captions.
- One canonical caption pattern; no per-page layout duplication.

### Negative / Trade-offs

- Long multi-sentence captions share one line flow with the label until wrap — mitigated by readable line height and wrap.

### Operational Impact

- **Migration / rollback:** Revert the caption block in `AnnotatedFigure.tsx` to stacked `span` + `p` if stakeholder review prefers separation.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Wrap awkwardness on very long captions | Low | Low | Spot-check FetsProza figure 0 workflow list caption on mobile | John Ohio | Next flagship figure with paragraph-length caption |

## Review Schedule

- **Next review:** Next major `AnnotatedFigure` API change or caption style fork
- **Review owner:** John Ohio

## Related ADRs

- [ADR-061](ADR-061-seamkit-executive-evidence-narrative.md) — relationship: constrains (SeamKit evidence figures use `AnnotatedFigure`)
- [ADR-043](ADR-043-flagship-brief-bento-before-state-and-metrics-balance.md) — relationship: depends on (introduced `AnnotatedFigure` in flagship stack)
- [ADR-044](ADR-044-phase-v-pilot-review-artifact-and-ai-boundary.md) — relationship: depends on (pilot review figure caption)

## References

- `components/case-study/AnnotatedFigure.tsx` — caption row markup
- `app/work/seamkit/page.tsx` — `#validation` FigJam workshop figure (triggering review)
