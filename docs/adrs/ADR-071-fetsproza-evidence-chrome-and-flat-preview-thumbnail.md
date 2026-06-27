# ADR-071: FetsProza evidence shader chrome and flat preview thumbnail

## Status

**Status:** Accepted
**Date:** 2026-06-27
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` — FetsProza flagship case study and `/work` listing cards.

Figma frame `29737:53418` defines a **shader asset container**: clip box (`29737:53463`), lavender gradient Header (`29737:53895`), and animated GIF media (`29737:53896`). Case study hero and decision blocks need live chrome around GIF evidence; listing cards need a **static** composite that matches the same frame without double CSS insets or layout drift.

Prior behaviour: listing used inner-media poster PNG inside live `PreviewChromeFrame`; dark mode remapped evidence chrome to teal/violet accent gradient; Figma GIF frame in the thumbnail was not pinned.

**In scope:** FetsProza evidence chrome, listing thumbnail asset pipeline, shared listing preview component, Figma GIF/pull/compose scripts.
**Out of scope:** Replacing case study hero GIF with static PNG; neutral shader variant theming; removing `PreviewChromeFrame` type (unused after FetsProza `previewFlat`).

## Decision Drivers

- Case study evidence must match Figma shader geometry (clip + Header bleed + media inset).
- Listing thumbnail must show the full Figma container snapshot — no live CSS inset on top of baked chrome.
- Dark mode must keep **light lavender** on live evidence chrome (not theme accent teal/violet).
- Thumbnail GIF media slot must show **frame 3** of `preview-hero.gif` without changing `ProjectAssets` layout fields.
- Asset refresh must be scriptable from Figma (`export:figma-assets`, `pull:figma-gifs`, `compose:preview-hero`).

## Options Considered

### Option A: Live CSS chrome on listing cards (poster + PreviewChromeFrame)

- **Description:** Keep `preview-hero-poster.png` (imageRef) inside `PreviewChromeFrame` on `/` and `/work`.
- **Pros:** Animated feel possible; reuses case study chrome component.
- **Cons:** Double chrome vs Figma snapshot; poster is inner media only; hover/layout quirks; dark mode accent bleed.
- **Effort:** Low (status quo)
- **Notes:** Rejected after visual review.

### Option B: Flat Figma container snapshot + live chrome on case study only (chosen)

- **Description:** Export `29737:53463` → `preview-hero.png`; set `previewFlat: true` on FetsProza `ProjectAssets`; `ProjectListingPreview` renders native aspect, borderless `AssetImage`; case study uses `EvidenceChrome` + `EvidenceGif`; post-compose GIF frame 3 into media rect via `compose-preview-hero-frame.mjs`.
- **Pros:** Listing matches Figma; case study keeps animated GIF; layout data unchanged; reproducible asset pipeline.
- **Cons:** Thumbnail is static; compose step required after export/GIF pull; frame index must stay in sync with editorial intent.
- **Effort:** Medium
- **Notes:** Theme-invariant `--jop-asset-chrome-lavender-*` tokens pin live chrome lavender in dark mode.

### Option C: Full animated GIF on listing cards

- **Description:** Use `preview-hero.gif` in listing `AssetImage`.
- **Pros:** Motion on index.
- **Cons:** Performance and distraction on dense lists; inconsistent with other project cards; autoplay a11y concerns.
- **Effort:** Low
- **Notes:** Rejected — listings stay static per ADR-022 card parity pattern.

## Decision

**We will use Option B because listing cards need a flat Figma-faithful snapshot while the case study retains live shader chrome and GIF evidence, with frame 3 composited into the thumbnail media slot without altering layout attributes.**

Implementation highlights:

- `EvidenceChrome` + `shaderAssetGeometry.ts` — Figma ratios, no padded inset ring; media negative bottom margin bleed.
- `previewFlat` on `ProjectAssets`; `ProjectListingPreview` shared by `/` and `/work`.
- FetsProza `hero` / `thumbnails[0]` → `preview-hero.png` (2384×1343); `composePreview` in `figma-asset-map.json` (frame 3, media rect 79/65/1034/618 @ 1192×671).
- `--jop-asset-chrome-lavender-gradient` at `:root`; `--asset-chrome-gradient` aliases fixed lavender.
- `pull-figma-gifs.mjs` for gifRef assets; `compose-preview-hero-frame.mjs` for thumbnail frame composite.

## Consequences

### Positive

- Listing and Figma container snapshot align; no double lavender inset on cards.
- Case study hero/decision GIFs use consistent shader chrome in light and dark.
- Thumbnail media frame is editorially pinned (frame 3) and reproducible from scripts.
- Shared `ProjectListingPreview` reduces drift between homepage and work index.

### Negative / Trade-offs

- Three-step asset refresh for FetsProza preview (export → pull GIFs → compose).
- `PreviewChromeFrame` remains in repo but unused until another project needs live listing chrome.
- Non-FetsProza `AssetImage` aspect boxes still use theme-linked chrome gradient (lavender in dark — acceptable side effect).

### Operational Impact

- **Refresh:** `npm run export:figma-assets fetsproza && npm run pull:figma-gifs fetsproza && npm run compose:preview-hero fetsproza`
- **QA:** `/work` and `/` FetsProza card (flat snapshot, hover zoom only); `/work/fetsproza` hero GIF + decisions in light/dark; `npm run build`
- **Migration / rollback:** Restore poster + `previewChrome` in `lib/projects.ts`; remove compose step; revert lavender token aliases.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Compose script drifts from Figma media rect after frame reorg | Med | Med | Document rect in `figma-asset-map.json`; re-run compose after export | John Ohio | Figma node `29737:53896` moves |
| GIF page index changes when asset re-exported | Low | Med | `composePreview.frame` explicit; verify with sharp metadata after pull | John Ohio | New `preview-hero.gif` upload |

## Review Schedule

- **Next review:** After next FetsProza Figma frame reorg or Q4 2026
- **Review owner:** John Ohio

## Related ADRs

- [ADR-022](./ADR-022-primary-preview-hero-and-aligned-thumbnails.md) — primary preview resolver; hero/thumbnails[0] parity
- [ADR-023](./ADR-023-figma-mcp-handoff-jop-tokens.md) — Figma export map and asset pipeline
- [ADR-057](./ADR-057-fetsproza-operator-first-evidence-spine-and-narrative-reframe.md) — FetsProza evidence spine
- [ADR-069](./ADR-069-evidence-review-experience.md) — evidence inspect overlay (orthogonal)
- [ADR-070](./ADR-070-soft-light-theme-framer-palette.md) — lavender primitives source for fixed chrome tokens

## References

- Figma: [Container snapshot `29737:53463`](https://www.figma.com/design/HNS3VdAyubm38nx5aYVZOR/Portfolio_-John-Ohio?node-id=29737-53463)
- [`components/case-study/EvidenceChrome.tsx`](../../components/case-study/EvidenceChrome.tsx)
- [`components/ProjectListingPreview.tsx`](../../components/ProjectListingPreview.tsx)
- [`scripts/compose-preview-hero-frame.mjs`](../../scripts/compose-preview-hero-frame.mjs)
- [`scripts/pull-figma-gifs.mjs`](../../scripts/pull-figma-gifs.mjs)
