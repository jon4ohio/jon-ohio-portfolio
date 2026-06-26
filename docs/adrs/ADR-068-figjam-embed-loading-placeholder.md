# ADR-068: FigJam embed static snapshot loading placeholder

## Status

**Status:** Accepted
**Date:** 2026-06-26
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` — SeamKit Evidence Figure 01 ([ADR-065](./ADR-065-seamkit-figjam-live-embed.md)).

The live FigJam iframe loads asynchronously and initially shows an empty lavender chrome frame. The static PNG fallback (`block-research-figjam.png`) existed for noscript and “View static snapshot” only — not during the loading interval. Reviewers saw a blank embed region before the board painted.

**In scope:** FigJam embed loading UX for `embedChrome="figjam"` in `AnnotatedFigure`; shared chrome wrapper; softer embed border token.
**Out of scope:** iframe `onError` detection, other embed types, removing static PNG from data.

## Decision Drivers

- Perceived performance — show meaningful content immediately while iframe loads.
- Visual continuity — placeholder is the same snapshot already used for fallback; lavender chrome unchanged.
- Bounded client surface — isolate `'use client'` in `FigJamEmbedFrame`; keep `AnnotatedFigure` as Server Component for other figures.

## Options Considered

### Option A: Bare iframe only (status quo after ADR-065)

- **Description:** Render iframe immediately with no loading layer.
- **Pros:** Simplest markup; no client component.
- **Cons:** Empty chrome flash; poor first paint on slow networks.
- **Effort:** Low
- **Notes:** Rejected after QA on `/work/seamkit#validation`.

### Option B: Static snapshot placeholder until iframe ready (chosen)

- **Description:** `FigJamEmbedFrame` (`'use client'`) stacks snapshot `<img>` and iframe in a 16:9 stage; reveal iframe after `onLoad` + minimum 500ms; 200ms opacity cross-fade. `FigJamChrome` shared with static FigJam images. Border token softened via `color-mix` with `--jop-border-subtle`.
- **Pros:** Immediate visual proof; same asset as fallback; minimum dwell avoids flicker on fast loads.
- **Cons:** Adds client JS; `AnnotatedFigure` imports client child for FigJam embeds only.
- **Effort:** Medium
- **Notes:** `fallbackImageSrc` required for placeholder; noscript path unchanged.

### Option C: Skeleton / spinner in chrome

- **Description:** Animated placeholder without snapshot image.
- **Pros:** No duplicate image layer.
- **Cons:** Loses workshop evidence during load; generic loading pattern.
- **Effort:** Low
- **Notes:** Rejected — snapshot is the intended preview.

## Decision

**We will show the static FigJam snapshot as a loading placeholder inside `FigJamChrome` until the iframe fires `onLoad` and at least 500ms have elapsed, then cross-fade to the live embed.**

Implementation: `components/case-study/FigJamEmbedFrame.tsx` (client), `components/case-study/FigJamChrome.tsx` (shared wrapper), routed from `AnnotatedFigure` when `embedChrome="figjam"` and `embedSrc` are set.

## Consequences

### Positive

- Evidence Figure 01 never presents an empty frame during load.
- Lavender chrome and border tokens stay theme-aware (ADR-023 aligned).
- Client boundary limited to FigJam embed path.

### Negative / Trade-offs

- Small hydration cost for SeamKit validation section only.
- ADR-065 assumed no client hook for embed — superseded in implementation detail by this ADR (embed path only).

### Operational Impact

- QA: verify placeholder → embed transition on warm/cold load; theme toggle on border token.
- **Migration / rollback:** Revert `AnnotatedFigure` to inline iframe + remove `FigJamEmbedFrame`.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Fast iframe load still flashes placeholder | Low | Low | 500ms minimum + 200ms fade; tune constants in `FigJamEmbedFrame` | John Ohio | Stakeholder reports flicker |
| Missing `fallbackImageSrc` shows blank stage | Med | Med | SeamKit page always passes snapshot path; document prop requirement in ADR-065 Related | John Ohio | New embed consumer without fallback |

## Review Schedule

- **Next review:** Second case study adopting FigJam embed
- **Review owner:** John Ohio

## Related ADRs

- [ADR-065](./ADR-065-seamkit-figjam-live-embed.md) — live FigJam embed decision (implementation detail extended here)
- [ADR-023](./ADR-023-figma-mcp-handoff-jop-tokens.md) — `--jop-figjam-embed-*` tokens
- [ADR-064](./ADR-064-annotated-figure-inline-caption.md) — figure caption on embed figures

## References

- [`components/case-study/FigJamEmbedFrame.tsx`](../../components/case-study/FigJamEmbedFrame.tsx)
- [`components/case-study/FigJamChrome.tsx`](../../components/case-study/FigJamChrome.tsx)
- [`components/case-study/AnnotatedFigure.tsx`](../../components/case-study/AnnotatedFigure.tsx)
- [`app/globals.css`](../../app/globals.css) — `--jop-figjam-embed-border`
