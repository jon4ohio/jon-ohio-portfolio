# ADR-065: SeamKit FigJam live embed for Evidence Figure 01

## Status

**Status:** Accepted
**Date:** 2026-06-26
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` — SeamKit flagship case study (`app/work/seamkit/page.tsx`), Evidence section `#validation`.

Figure 01 previously showed a static PNG (`block-research-figjam.png`) of the collaborative Design Jam UI audit on FigJam. The snapshot includes FigJam’s lavender workspace margin around the white board. A live embed of the same board (`etsjuf6BXGRbrGWIiI1Aqb`) was available with public link-share.

**In scope:** Figure 01 embed + violet chrome wrapper; `AnnotatedFigure` embed props; theme tokens for FigJam chrome; static PNG fallback link and `<noscript>` image.
**Out of scope:** Other SeamKit figures, iframe `onError` client detection, removing PNG from `lib/projects.ts` blocks.

## Decision Drivers

- Interactive workshop proof — recruiters and hiring managers can pan/zoom the real board.
- Visual continuity — lavender margin must match the static snapshot aesthetic on warm/light/dark themes.
- Resilience — static PNG remains as fallback if embed is blocked or JavaScript is disabled.
- Minimal component surface — extend shared `AnnotatedFigure` rather than a one-off page block.

## Options Considered

### Option A: Keep static PNG only

- **Description:** Continue using `block-research-figjam.png` via `imageSrc`.
- **Pros:** Fast load; no Figma dependency; works offline.
- **Cons:** No interactivity; “snapshot” undersells a live collaborative session.
- **Effort:** Low
- **Notes:** Status quo before ADR-065.

### Option B: Live FigJam embed with violet chrome + PNG fallback (chosen)

- **Description:** `embedSrc` to Figma board iframe; `embedChrome="figjam"` applies `--figjam-embed-*` tokens; fallback link and noscript image to static PNG.
- **Pros:** Live evidence; theme-aware lavender frame; graceful degradation.
- **Cons:** Heavier runtime; depends on Figma availability and board link permissions.
- **Effort:** Medium
- **Notes:** Server Component — no client hook required.

### Option C: Link out to FigJam only (no embed)

- **Description:** Caption + external link; no inline iframe.
- **Pros:** Lightest page weight.
- **Cons:** Breaks in-page evidence flow; extra click for reviewers.
- **Effort:** Low
- **Notes:** Rejected.

## Decision

**We will replace Evidence Figure 01’s primary display with a live FigJam embed wrapped in theme-aware violet chrome, keeping the static PNG as noscript and “View static snapshot” fallback.**

`AnnotatedFigure` gains optional `embedSrc`, `embedChrome`, `fallbackImageSrc`, and `embedBoardHref` props. FigJam chrome uses `--jop-figjam-embed-bg` and `--jop-figjam-embed-border` per theme in `app/globals.css`.

## Consequences

### Positive

- Evidence section shows an explorable workshop artifact without leaving the case study.
- Lavender margin preserved via JOP violet primitives (ADR-023 aligned).
- Shared embed pattern available for future case studies if needed.

### Negative / Trade-offs

- Page weight and third-party script load increase for `/work/seamkit`.
- Board must stay link-shareable; permission changes break the embed for anonymous visitors.

### Operational Impact

- Verify FigJam share settings before each major deploy touching Evidence.
- **Migration / rollback:** Revert Figure 01 to `imageSrc` only and remove embed props; tokens can remain unused.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Board permissions tightened to org-only | Med | High | Keep “Anyone with link can view”; retain static snapshot fallback link | John Ohio | Embed shows login wall in QA |
| Violet chrome clashes on dark theme | Low | Low | Dark tokens use `color-mix` on violet-100 + slate-10 | John Ohio | Theme toggle QA on `#validation` |

## Review Schedule

- **Next review:** Next SeamKit evidence update or FigJam board archival
- **Review owner:** John Ohio

## Related ADRs

- [ADR-061](./ADR-061-seamkit-executive-evidence-narrative.md) — Evidence section narrative
- [ADR-064](./ADR-064-annotated-figure-inline-caption.md) — Figure caption layout
- [ADR-023](./ADR-023-figma-mcp-handoff-jop-tokens.md) — JOP token usage

## References

- [`components/case-study/AnnotatedFigure.tsx`](../../components/case-study/AnnotatedFigure.tsx)
- [`app/work/seamkit/page.tsx`](../../app/work/seamkit/page.tsx) — `#validation` Figure 01
- [`app/globals.css`](../../app/globals.css) — `--jop-figjam-embed-*` tokens
- FigJam board: `https://www.figma.com/board/etsjuf6BXGRbrGWIiI1Aqb/Design-Jam---DS-Components`
