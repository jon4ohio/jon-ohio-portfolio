# ADR-074: Shared MediaViewTrigger and reviewable generic block assets

## Status

**Status:** Accepted  
**Date:** 2026-06-29  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None (extends ADR-069)

## Context

Project: `jon-ohio-portfolio` — case study evidence and generic block rendering.

[ADR-069](./ADR-069-evidence-review-experience.md) introduced `EvidenceImage` + `EvidenceReviewOverlay` for flagship annotated figures. The overlay trigger logic (open state, keyboard handler, affordance, focus return) was duplicated only inside `EvidenceImage`. Generic case study blocks in `/work/[slug]` still used plain `AssetImage` with no inspect path, and `EvidenceModule` figures on FetsProza omitted review despite sharing the same editorial need.

**In scope:** Extract shared trigger primitive; wire review into `CaseStudyBlockRenderer`, `ReviewableAssetImage`, `EvidenceImage`, and `EvidenceModule` image-only figures; overlay z-index and touch affordance polish.  
**Out of scope:** Hi-res asset variants, gallery prev/next, homepage/work listing cards, hero/next-read `imageOnly` opt-out on FetsProza walkthrough GIF.

## Decision Drivers

- **DRY overlay behaviour** — one trigger implementation for evidence PNGs, GIFs, and `lib/projects.ts` block images.
- **Consistent editorial affordance** — same expand interaction and overlay chrome across flagship and slug-template case studies.
- **Thin composition** — keep page routes as Server Components; client boundary stays in evidence/block primitives.
- **Backward compatibility** — `reviewable={false}` opt-out preserved for figures that must stay static inline.

## Options Considered

### Option A: Leave duplicate trigger logic in each consumer

- **Description:** Copy overlay open/close/focus code into `CaseStudyBlockRenderer` and `EvidenceModule` separately.
- **Pros:** No refactor of `EvidenceImage`.
- **Cons:** Three copies of the same interaction; affordance and a11y drift risk.
- **Effort:** Low  
- **Notes:** Rejected.

### Option B: Extract `MediaViewTrigger` + `ReviewableAssetImage` (chosen)

- **Description:** Move trigger + overlay shell into `MediaViewTrigger`; add `ReviewableAssetImage` wrapping `AssetImage`; refactor `EvidenceImage` to compose `MediaViewTrigger`; extract `CaseStudyBlockRenderer` from `[slug]/page.tsx` as a client module using `ReviewableAssetImage`.
- **Pros:** Single overlay contract; slug-template blocks gain inspect without bespoke code; `EvidenceModule` can opt in with `reviewable={true}`.
- **Cons:** Additional client components; `[slug]/page.tsx` imports a client subtree for block galleries.
- **Effort:** Medium  
- **Notes:** Shared `overlay-media-styles.ts` keeps overlay media sizing consistent.

### Option C: Full lightbox gallery across all page images

- **Description:** Page-level gallery with navigation between every figure.
- **Pros:** Fast cross-figure browsing.
- **Cons:** Conflicts with narrative spine; deferred in ADR-069.
- **Effort:** High  
- **Notes:** Not in scope for this pass.

## Decision

**We will use Option B** because a shared trigger primitive eliminates duplication while extending ADR-069 inspect behaviour to generic block assets without redesigning the overlay API.

- `MediaViewTrigger` owns open state, keyboard activation, affordance (`↗ Expand`), and `EvidenceReviewOverlay` wiring.
- `ReviewableAssetImage` wraps `AssetImage` for `CaseStudyBlock` image/gallery slots (default `reviewable={true}`).
- `EvidenceImage` delegates to `MediaViewTrigger`; overlay media uses shared `overlayMediaStyle`.
- `EvidenceReviewOverlay` z-index raised to **250** so inspect overlays sit above sticky chapter nav.
- Touch devices: `.evidence-image-affordance` at **0.55 opacity** when `hover: none` so affordance remains discoverable without hover.

Affordance aria-label uses **Expand image** (replacing prior **Inspect evidence** string in `MediaViewTrigger`) — clearer for screen-reader users opening a larger view.

## Consequences

### Positive

- Generic slug case studies (`/work/[slug]`) block images are inspectable with caption/alt carried into the overlay.
- FetsProza evidence modules and slug galleries share one overlay implementation with flagship `AnnotatedFigure` figures.
- Future evidence types can compose `MediaViewTrigger` with custom `overlayChildren`.

### Negative / Trade-offs

- Block renderer is a client component — slightly larger JS on slug-template pages with image blocks.
- Overlay still serves same-resolution `src` as inline (hi-res deferred).
- FetsProza operational walkthrough GIF remains non-reviewable by explicit opt-out.

### Operational Impact

- QA: `/work/[slug]` image + gallery blocks; `/work/fetsproza` evidence modules; existing flagship evidence figures; keyboard Enter/Escape; focus return; overlay above chapter nav.
- **Migration / rollback:** Revert `MediaViewTrigger` extraction; restore inline trigger in `EvidenceImage`; swap `ReviewableAssetImage` back to `AssetImage` in `CaseStudyBlockRenderer`.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Client bundle growth on slug pages with many block images | Low | Low | Trigger is one module; images still lazy-loaded via `AssetImage` | John Ohio | Lighthouse review on IBEDC/orchestrated-portfolio |
| Overlay obscured by fixed nav | Med | Med | z-index 250 on `EvidenceReviewOverlay`; spot-check sticky chapter nav | John Ohio | New fixed UI layer added sitewide |

## Review Schedule

- **Next review:** After hi-res evidence assets or gallery navigation is scoped  
- **Review owner:** John Ohio

## Related ADRs

- [ADR-069](./ADR-069-evidence-review-experience.md) — parent evidence review decision; extended, not superseded  
- [ADR-002](./ADR-002-static-in-repo-data-for-case-studies.md) — block data still authored in `lib/projects.ts`  
- [ADR-020](./ADR-020-assetimage-aspect-box-adaptive-object-fit.md) — `ReviewableAssetImage` composes `AssetImage`  
- [ADR-061](./ADR-061-seamkit-executive-evidence-narrative.md) — SeamKit brand figure asset refresh logged separately in delta doc (no IA change)

## References

- [`components/case-study/evidence/MediaViewTrigger.tsx`](../../components/case-study/evidence/MediaViewTrigger.tsx)
- [`components/case-study/ReviewableAssetImage.tsx`](../../components/case-study/ReviewableAssetImage.tsx)
- [`components/case-study/CaseStudyBlockRenderer.tsx`](../../components/case-study/CaseStudyBlockRenderer.tsx)
- [`components/case-study/evidence/EvidenceImage.tsx`](../../components/case-study/evidence/EvidenceImage.tsx)
- [`docs/seamkit-figma-alignment-delta.md`](../seamkit-figma-alignment-delta.md) — Layer 01 brand figure sectional pass (2026-06-29)
