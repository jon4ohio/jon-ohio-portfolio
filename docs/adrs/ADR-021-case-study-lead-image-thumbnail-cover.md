# ADR-021: Case study lead image uses first thumbnail with 16:9 cover

## Status

**Status:** Accepted  
**Date:** 2026-04-11  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

Case study pages ([`app/work/[slug]/page.tsx`](../../app/work/[slug]/page.tsx)) show a large lead image after the summary and metric badges. Previously that slot used **`assets.hero`** only. The **work index** and **homepage Selected Systems** (ADR-018) already use **`assets.thumbnails[0]`** as the primary preview, so the case study hero could show a different file than listings. The product goal is **one consistent preview asset** across entry points, with a **stable full-width frame** that **fills** when source aspect ratios differ.

**In scope:** Which `ImageAsset` drives the case study lead image; how it is framed in [`AssetImage`](../../components/AssetImage.tsx)  
**Out of scope:** Open Graph / social images, changing `Project` schema in [`lib/projects.ts`](../../lib/projects.ts), block gallery content below the fold  

## Decision Drivers

- **Listing parity:** Lead visual should match **`/work`** and homepage thumbnails where thumbnails exist (ADR-018)  
- **Predictable layout:** Fixed aspect avoids variable-height jumps between projects  
- **Aspect mismatch:** When thumbnail pixels are not 16:9, **crop via `object-fit: cover`** rather than letterboxing  
- **Backward compatibility:** Projects with thumbnails missing can still show **`assets.hero`**  

## Options Considered

### Option A: First thumbnail preferred, `AssetImage` with `aspectCover="16 / 9"` and `aspectFit="cover"`

- **Description:** Resolve lead image as `assets.thumbnails?.[0] ?? assets.hero`. Render with **`aspectCover`** so the image fills a **16:9** box; **`aspectFit="cover"`** forces cover (no auto-contain). Reuse placeholder **`alt`** rule (path includes `_placeholders` → title-based preview string). Optional **`caption`** from whichever asset is shown.
- **Pros:** Aligns with listing preview; stable hero height; explicit fill behaviour  
- **Cons:** **`assets.hero`** is unused in this slot when thumbnails exist (may duplicate asset maintenance in content until hero is repurposed elsewhere)  
- **Effort:** Low  
- **Notes:** Complements ADR-018; uses same [`AssetImage`](../../components/AssetImage.tsx) patterns  

### Option B: Keep `assets.hero` as the only lead image

- **Description:** Leave case study lead tied to **`hero`**; thumbnails remain for grids only.
- **Pros:** Hero can stay a bespoke wide marketing crop independent of thumb crops  
- **Cons:** **Inconsistent** preview between `/work` / homepage and the case study page  
- **Effort:** None (status quo)  
- **Notes:** Rejected for parity  

### Option C: Thumbnail with intrinsic height (no fixed aspect box)

- **Description:** Use thumbnail as `next/image` width/height proportional scale only (previous plain `AssetImage` path).
- **Pros:** No cropping; full pixel content visible  
- **Cons:** **Does not** meet “fill the container” when ratios differ; variable layout height  
- **Effort:** Low  
- **Notes:** Rejected  

## Decision

**We will use Option A:** the case study **lead image** is **`project.assets.thumbnails[0]`** when present, otherwise **`project.assets.hero`**. It is rendered with **`AssetImage`**, **`aspectCover="16 / 9"`**, **`aspectFit="cover"`**, **`priority`**, and responsive **`sizes`** for the ~1240px content column. Placeholder paths use the same title-based **`alt`** pattern as other thumbnail call sites.

## Consequences

### Positive

- **Consistent** primary preview across `/work`, homepage Selected Systems, and the case study lead  
- **Stable** vertical rhythm for the hero block across projects  
- **Crop-on-mismatch** behaviour is explicit and testable  

### Negative / Trade-offs

- **`hero`** may be **redundant** in the lead slot when thumbnails exist; keep **`hero`** in data if still useful for other surfaces or exports, or remove in a content pass  
- **16:9** may crop portrait-heavy thumbs more aggressively than **4:3** listing thumbs — intentional for wide case study hero  

### Operational Impact

- **Maintenance:** When changing lead framing (aspect ratio or fit), edit **[slug] page** and consider whether **`/work`** / homepage thumb aspects (ADR-018) should be noted in release notes  
- **Migration / rollback:** Restore lead block to **`project.assets.hero`** only and drop **`aspectCover`** props  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| **`hero`** and **`thumbnails[0]`** diverge in art direction, confusing stakeholders who expect “hero” on the case study | Med | Low | Document in this ADR that lead follows **thumbnail first**; use **`hero`** only as fallback or for non-thumbnail projects | Maintainer | Content/design QA on a new case study |

## Review Schedule

- **Next review:** 2026-07-01  
- **Review owner:** Maintainer  

## Related ADRs

- [ADR-002 — Static in-repo data for case studies](ADR-002-static-in-repo-data-for-case-studies.md) — constrains: static **`lib/projects.ts`** data; no schema change  
- [ADR-018 — Homepage Selected Systems project thumbnails](ADR-018-homepage-selected-systems-thumbnails.md) — related: first thumbnail on homepage Selected Systems; same parity goal  
- [ADR-001 — Inline styles for layout and visuals](ADR-001-inline-styles-for-layout-and-visuals.md) — layout/spacing remains inline in page TSX; image framing via **`AssetImage`**  
- [ADR-020 — AssetImage aspect box with adaptive object-fit](ADR-020-assetimage-aspect-box-adaptive-object-fit.md) — defines default **`aspectFit="auto"`**; this ADR **forces `cover`** on the case study lead for a wide editorial frame  

## References

- [`app/work/[slug]/page.tsx`](../../app/work/[slug]/page.tsx) — lead image `thumb ?? hero`, **`aspectCover` / `aspectFit`**  
- [`components/AssetImage.tsx`](../../components/AssetImage.tsx) — **`aspectCover`**, **`aspectFit`**, **`fill`** + **`objectFit`**  
- [`lib/projects.ts`](../../lib/projects.ts) — **`ProjectAssets.thumbnails`**, **`hero`**  
