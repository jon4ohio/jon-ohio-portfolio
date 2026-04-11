# ADR-022: Primary preview image — `hero` first, aligned `thumbnails[0]`, shared resolver

## Status

**Status:** Accepted  
**Date:** 2026-04-11  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** [ADR-021](ADR-021-case-study-lead-image-thumbnail-cover.md) (asset resolution order only; see Consequences)

## Context

The portfolio shows a **primary preview image** on the homepage Selected Systems list ([`app/page.tsx`](../../app/page.tsx)), the work index ([`app/work/page.tsx`](../../app/work/page.tsx)), and as the **lead image** on case study pages ([`app/work/[slug]/page.tsx`](../../app/work/[slug]/page.tsx)). [`ProjectAssets`](../../lib/projects.ts) exposes both **`hero`** and **`thumbnails`** (tuple). Previously, [ADR-021](ADR-021-case-study-lead-image-thumbnail-cover.md) resolved the case study lead as **`thumbnails[0]` first**, then **`hero`**, while listings used **`thumbnails[0]`** only — so when **`hero`** differed from **`thumbnails[0]`**, the case study header and cards showed **different art**. The desired product rule (already used for IBEDC) is **one canonical file** for both the listing preview and the case study lead when **`hero`** is present.

**In scope:** Which `ImageAsset` is the single “primary preview” for all three surfaces; data authoring convention; exported helper in [`lib/projects.ts`](../../lib/projects.ts); documentation in [`CLAUDE.md`](../../CLAUDE.md)  
**Out of scope:** Open Graph images, changing the `Project` / `ProjectAssets` TypeScript shape, `blocks` content, [`AssetImage`](../../components/AssetImage.tsx) aspect and `object-fit` behaviour (covered by ADR-020 and unchanged here)

## Decision Drivers

- **Preview parity:** Homepage, `/work`, and `/work/[slug]` must show the **same** primary image for a project when **`hero`** is defined  
- **Single resolution rule:** One function for all call sites to prevent future drift  
- **Data honesty:** When both **`hero`** and **`thumbnails`** exist, **`thumbnails[0]`** should reference the **same** pixels and metadata as **`hero`** (IBEDC / `case-cover` pattern)  
- **Backward compatibility:** Projects with only **`thumbnails[0]`** (no **`hero`**) still resolve to that thumbnail  

## Options Considered

### Option A: `getPrimaryPreviewImage(assets)` — `hero ?? thumbnails[0]`, aligned data

- **Description:** Export **`getPrimaryPreviewImage`** from [`lib/projects.ts`](../../lib/projects.ts) returning **`assets?.hero ?? assets?.thumbnails?.[0]`**. Use it on the homepage, work index, and case study lead. Document in **`CLAUDE.md`** that when both fields exist, **`thumbnails[0]`** must match **`hero`**. Align existing project rows so the first tuple entry duplicates **`hero`** where applicable; use **`placeholderHero`** for both **`hero`** and **`thumbnails[0]`** on placeholder case studies.
- **Pros:** One resolver; **`hero`** remains the semantic “case study header” asset; listings and lead stay locked; grep-friendly data  
- **Cons:** **Duplicate** `ImageAsset` fields in static data when both **`hero`** and **`thumbnails[0]`** are set (maintenance must keep them in sync)  
- **Effort:** Low  
- **Notes:** Supersedes ADR-021’s **thumbnail-first** resolution for the lead image; **16:9 `AssetImage` lead treatment** from ADR-021 remains in the case study page  

### Option B: Thumbnail-only — drop **`hero`** from content and use **`thumbnails[0]`** everywhere

- **Description:** Remove **`hero`** from [`lib/projects.ts`](../../lib/projects.ts) entries and use only the first thumbnail as the lead.
- **Pros:** No duplicate fields  
- **Cons:** Loses explicit **`hero`** semantics for exports and mental model; requires a schema and content migration  
- **Effort:** Medium  
- **Notes:** Rejected to avoid breaking the existing **`hero`** field and ADR-002’s incremental content style  

### Option C: Documentation-only — keep divergent fields, ask authors to “keep them the same”

- **Description:** No code change; rely on manual QA.
- **Pros:** No implementation  
- **Cons:** **No enforcement**; homepage and case study already used different rules under the old ADR-021 ordering  
- **Effort:** None  
- **Notes:** Rejected  

## Decision

**We will use Option A:** the **primary preview image** for homepage Selected Systems, **`/work`**, and the case study **lead** is **`getPrimaryPreviewImage(project.assets)`**, i.e. **`hero`** when set, otherwise **`thumbnails[0]`**. When both **`hero`** and **`thumbnails`** are present, **`thumbnails[0]`** is authored as the **same** `ImageAsset` as **`hero`** (see IBEDC). The case study lead continues to use **`AssetImage`** with **`aspectCover="16 / 9"`** and **`aspectFit="cover"`** as established for the wide editorial frame ([ADR-021](ADR-021-case-study-lead-image-thumbnail-cover.md) framing; [ADR-020](ADR-020-assetimage-aspect-box-adaptive-object-fit.md) component behaviour).

## Consequences

### Positive

- **One** resolution rule across all entry points; no split between “listing thumb” and “case study lead” when **`hero`** exists  
- **`hero`** remains the canonical header asset name for authors and tooling  
- Future case studies are guided by **`CLAUDE.md`** and JSDoc on **`ProjectAssets`**  

### Negative / Trade-offs

- **Intentional duplication** of **`ImageAsset`** in **`thumbnails[0]`** and **`hero`** when both exist — mitigated by documenting “copy **`hero`** into the first thumbnail slot” and by **`hero`** winning at runtime if they ever drift  

### Operational Impact

- **Maintenance:** Add or change **`getPrimaryPreviewImage`** call sites only when introducing new surfaces that show a project card or lead; update [`CLAUDE.md`](../../CLAUDE.md) if authoring rules change  
- **Migration / rollback:** Revert the three page files to use **`thumbnails[0]`** only for listings and restore ADR-021’s inline **`thumb ?? hero`** on the case study page; remove **`getPrimaryPreviewImage`**  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| **`thumbnails[0]`** and **`hero`** diverge in [`lib/projects.ts`](../../lib/projects.ts) (different **`src`**) while both are set, confusing anyone reading raw data | Med | Low | **`CLAUDE.md`** + JSDoc require parity; **`getPrimaryPreviewImage`** still returns **`hero`** first so the **site** stays correct until data is fixed | Maintainer | New case study PR that adds **`assets`** |

## Review Schedule

- **Next review:** 2026-07-01  
- **Review owner:** Maintainer  

## Related ADRs

- [ADR-021](ADR-021-case-study-lead-image-thumbnail-cover.md) — **superseded** for **which asset** drives the lead; **still relevant** for **16:9** lead framing and **`aspectFit="cover"`** on the case study page  
- [ADR-018](ADR-018-homepage-selected-systems-thumbnails.md) — homepage thumbnails; **read “primary preview”** per this ADR (implementation uses **`getPrimaryPreviewImage`**, not raw **`thumbnails[0]`** alone)  
- [ADR-002](ADR-002-static-in-repo-data-for-case-studies.md) — static [`lib/projects.ts`](../../lib/projects.ts) data shape unchanged  
- [ADR-020](ADR-020-assetimage-aspect-box-adaptive-object-fit.md) — **`AssetImage`** behaviour for listing vs lead aspects  

## References

- [`lib/projects.ts`](../../lib/projects.ts) — **`getPrimaryPreviewImage`**, **`ProjectAssets`** JSDoc  
- [`CLAUDE.md`](../../CLAUDE.md) — Data layer: primary preview authoring rules  
- [`app/page.tsx`](../../app/page.tsx), [`app/work/page.tsx`](../../app/work/page.tsx), [`app/work/[slug]/page.tsx`](../../app/work/[slug]/page.tsx) — **`getPrimaryPreviewImage`** usage  
