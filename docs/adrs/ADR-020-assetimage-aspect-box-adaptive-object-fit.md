# ADR-020: AssetImage aspect box with adaptive object-fit

## Status

**Status:** Accepted  
**Date:** 2026-04-10  
**Decision Maker(s):** John Ohio (portfolio owner)  
**Supersedes:** None

## Context

The Next.js portfolio (`jon-ohio-portfolio`) renders project thumbnails on `/`, `/work`, and fixed-ratio imagery elsewhere (e.g. About community cards) via [`components/AssetImage.tsx`](../../components/AssetImage.tsx). Case study assets are typed [`ImageAsset`](../../lib/projects.ts) with intrinsic `width` and `height` per file.

Using **intrinsic dimensions only** for thumbnails makes **row heights and grid rhythm** vary with each PNG. Using a **fixed CSS aspect box** with **`object-fit: cover` everywhere** keeps layout stable but **over-crops** screenshots whose aspect ratio differs strongly from the box (e.g. ultra-wide or very tall captures).

**In scope:** Behavior when `AssetImage` is used with `aspectCover` (fixed `aspect-ratio` wrapper + `next/image` `fill`). The `aspectFit` prop and the default **`auto`** heuristic (cover vs contain from asset vs box ratio). Call sites that pass `aspectCover` today.

**Out of scope:** `treatment="device"` chrome, non-`aspectCover` `AssetImage` usage (intrinsic width/height layout), hero and case-study block images unless they adopt `aspectCover` later.

## Decision Drivers

- **Layout stability:** Thumbnail columns and list rows must not jump in height because of heterogeneous source dimensions.
- **Visual fidelity:** Prefer showing full screenshots when the aspect mismatch is large; prefer edge-to-edge fill when the image already matches the box ratio.
- **Data already present:** `ImageAsset.width` / `height` are available without runtime image probing.
- **Override path:** Design or marketing must be able to force **cover** or **contain** per surface without forking the component.

## Options Considered

### Option A: Fixed aspect box + always `object-fit: cover`

- **Description:** Keep a single aspect ratio per surface (e.g. `4 / 3` for work thumbnails). Always fill the box with `cover` and crop overflow.
- **Pros:** Predictable, dense grids; simplest implementation; no letterboxing.
- **Cons:** Strong aspect mismatch yields heavy cropping and lost UI context in screenshots.
- **Effort:** Low
- **Notes:** Matches an earlier implementation path before adaptive behavior.

### Option B: Fixed aspect box + always `object-fit: contain`

- **Description:** Same fixed box; scale image entirely inside the box with possible empty bands.
- **Pros:** Nothing is cropped; full image always visible.
- **Cons:** Large letterboxing on images that already match the box; can look sparse or uneven banding across a row.
- **Effort:** Low
- **Notes:** Good for “never crop” policy; weaker when ratios already align.

### Option C: Fixed aspect box + `aspectFit="auto"` heuristic + optional overrides

- **Description:** Parse `aspectCover` to a numeric box ratio; compare to `asset.width / asset.height`. Default **`auto`**: if relative aspect delta is **≤ 0.2**, use **`cover`**; otherwise **`contain`**. Expose **`aspectFit`**: `"auto" | "cover" | "contain"`. Use **`background: var(--surface)`** on the wrapper so `contain` letterboxing matches the design system. Keep **`fill`** + single box for responsive behavior.
- **Pros:** Stable layout; contextual fit vs crop; escape hatches without new components.
- **Cons:** Magic number (0.2) requires occasional tuning; `contain` can show more empty space; wrong `width`/`height` in data skews the heuristic.
- **Effort:** Medium
- **Notes:** Implemented in `AssetImage`; threshold is centralized for one-place adjustment.

## Decision

**We will use Option C** because it satisfies **layout stability** and **visual fidelity** together: similar-aspect assets still read as full-bleed thumbnails, while mismatched assets avoid destructive crops. **Override** addresses per-surface exceptions without duplicating markup patterns.

## Consequences

### Positive

- Thumbnail surfaces keep a **consistent aspect frame** across projects.
- **Automatic** reduction of harsh crops when source aspect diverges from the box.
- **`aspectFit`** allows forcing **cover** or **contain** when the heuristic is wrong for a specific asset or page.

### Negative / Trade-offs

- **Heuristic opacity:** Viewers do not see a visible “why cover vs contain” label; behavior follows math unless overridden.
- **Mitigation:** Document the 0.2 rule in this ADR and in code comments; adjust the constant or use `aspectFit` when QA flags a case.

### Operational Impact

- **Onboarding:** Authors updating [`lib/projects.ts`](../../lib/projects.ts) should keep **`width` / `height`** accurate to exported files so **`auto`** stays trustworthy.
- **Migration / rollback:** Revert [`AssetImage.tsx`](../../components/AssetImage.tsx) to a single `objectFit` or remove `aspectFit` prop; call sites unchanged if they only pass `aspectCover`. Rollback loses adaptive behavior only.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| **0.2 threshold** feels wrong for a batch of new exports (too much contain or too much cover) | Med | Med | Change the constant in one place or set `aspectFit="cover"` / `"contain"` on specific `AssetImage` usages after design QA | Maintainer | New asset batch or redesign of `/` or `/work` thumbnails |
| **Stale `width` / `height`** in `ImageAsset` mis-classifies **auto** fit | Low | Med | Regenerate or hand-fix dimensions when replacing images; spot-check in devtools | Maintainer | Image pipeline or export script changes |

## Review Schedule

- **Next review:** 2027-04-10, or when thumbnail aspect policy or export pipeline changes (whichever comes first).
- **Review owner:** Portfolio maintainer

## Related ADRs

- [ADR-018 — Homepage Selected Systems project thumbnails](ADR-018-homepage-selected-systems-thumbnails.md) — constrains: first-thumbnail previews and alignment between `/` and `/work`; this ADR defines **`AssetImage`** behavior for **`aspectCover`** including **`aspectFit`**.
- [ADR-021 — Case study lead image uses first thumbnail with 16:9 cover](ADR-021-case-study-lead-image-thumbnail-cover.md) — related: case study lead **overrides** default **`auto`** with **`aspectFit="cover"`** on a **16:9** box.

## References

- [`components/AssetImage.tsx`](../../components/AssetImage.tsx) — `parseAspectRatioString`, `resolveAspectObjectFit`, `aspectCover`, `aspectFit`
- [`app/page.tsx`](../../app/page.tsx) — Selected Systems thumbnails (`aspectCover="4 / 3"`)
- [`app/work/page.tsx`](../../app/work/page.tsx) — work index thumbnails (`aspectCover="4 / 3"`)
- [`app/about/page.tsx`](../../app/about/page.tsx) — community cards (`aspectCover="16 / 9"`)
- [`lib/projects.ts`](../../lib/projects.ts) — `ImageAsset` shape
