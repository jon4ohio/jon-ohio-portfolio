# ADR-066: SeamKit Token Studio figure — full evidence column width

## Status

**Status:** Accepted
**Date:** 2026-06-26
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` — SeamKit flagship case study (`app/work/seamkit/page.tsx`), Layer 01 `#layer-1`.

Figure 03 (`block-token-studio.png`, Token Studio variables panel) rendered at ~520px wide while Figure 02 in the same evidence column filled the flex pane (~732px at the 1240px row). `AnnotatedFigure` / `StaticImageFrame` already set `width: 100%`; the bottleneck was a page-level wrapper with `maxWidth: 520`.

**In scope:** Figure 03 wrapper in Layer 01 evidence column.
**Out of scope:** Other SeamKit figures, `AnnotatedFigure` API, asset files, responsive stack behaviour (unchanged).

## Decision Drivers

- Visual parity — adjacent evidence figures in one column should share the same width.
- Minimal diff — remove layout cap rather than add new props or CSS.
- Evidence readability — Token Studio taxonomy screenshot benefits from full column width on desktop.

## Options Considered

### Option A: Keep 520px cap

- **Description:** Leave `maxWidth: 520` on the Figure 03 wrapper.
- **Pros:** No change; narrower image may feel less dense on very wide monitors.
- **Cons:** Misaligned with Figure 02; underuses evidence column; arbitrary cap with no narrative reason.
- **Effort:** Low
- **Notes:** Status quo before ADR-066.

### Option B: Remove wrapper max-width (chosen)

- **Description:** Use `<div style={{ marginTop: 32 }}>` only; image inherits full flex evidence width.
- **Pros:** Matches Figure 02; one-line fix; mobile stack still `width: 100%`.
- **Cons:** Very wide PNG may show more UI chrome at full bleed — acceptable for evidence density.
- **Effort:** Low
- **Notes:** No component or asset changes required.

## Decision

**We will remove the `maxWidth: 520` constraint from the Layer 01 Figure 03 wrapper so `block-token-studio.png` spans the full evidence column width.**

## Consequences

### Positive

- Figure 02 and Figure 03 align at desktop; editorial rhythm in `#layer-1` is consistent.
- No new layout primitives or per-figure props.

### Negative / Trade-offs

- Slightly larger on-screen bitmap at max content width — mitigated by existing responsive column stack ≤900px.

### Operational Impact

- **Migration / rollback:** Restore `maxWidth: 520` on the Figure 03 wrapper in `app/work/seamkit/page.tsx`.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| PNG aspect feels too wide on ultra-wide viewports | Low | Low | Evidence row already capped at 1240px; spot-check `#layer-1` at 1440px | John Ohio | Next Layer 01 figure addition |

## Review Schedule

- **Next review:** Next SeamKit Layer 01 layout change
- **Review owner:** John Ohio

## Related ADRs

- [ADR-061](./ADR-061-seamkit-executive-evidence-narrative.md) — Layer 01 evidence narrative
- [ADR-064](./ADR-064-annotated-figure-inline-caption.md) — `AnnotatedFigure` caption layout

## References

- [`app/work/seamkit/page.tsx`](../../app/work/seamkit/page.tsx) — `#layer-1` Figure 03 wrapper
- [`components/case-study/AnnotatedFigure.tsx`](../../components/case-study/AnnotatedFigure.tsx) — `StaticImageFrame`
