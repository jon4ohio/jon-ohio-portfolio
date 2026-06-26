# ADR-067: SeamKit preview hero filename rename for `next/image` cache invalidation

## Status

**Status:** Accepted
**Date:** 2026-06-26
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` — SeamKit primary preview (`lib/projects.ts` `hero` + `thumbnails[0]`).

After replacing `public/assets/work/seamkit/preview-16x9.png` with new 3D hero art, the case study brief hero (`AnnotatedFigure` / plain `<img>`) updated immediately, but homepage and `/work` cards still showed the old bitmap. Those surfaces use [`AssetImage`](../../components/AssetImage.tsx) → `next/image`, which caches optimized output at `/_next/image` keyed by source URL. Same filename after a binary swap does not invalidate that cache.

**In scope:** SeamKit primary preview asset path and Figma export map entry.
**Out of scope:** Global `next/image` cache policy, query-string cache busting, other project slugs.

## Decision Drivers

- Preview parity — [ADR-022](./ADR-022-primary-preview-hero-and-aligned-thumbnails.md) requires the same primary image on cards and case study lead.
- Reliable invalidation — card surfaces must pick up new hero art without manual CDN purge.
- Stable authoring — prefer a semantic filename over perpetual `?v=` query params in static data.

## Options Considered

### Option A: Query-string cache bust (`preview-16x9.png?v=2`)

- **Description:** Append version query to `src` in `lib/projects.ts`; extend `publicAssetExists` to strip query when checking disk.
- **Pros:** Keeps legacy filename; no file rename.
- **Cons:** Query strings in static asset paths; resolver must strip queries; Figma export map still writes `preview-16x9.png`.
- **Effort:** Low
- **Notes:** Rejected for extra resolver complexity and non-semantic URLs.

### Option B: Rename asset file (chosen)

- **Description:** Rename to `preview-hero.png`; update `hero`, `thumbnails[0]`, and `scripts/figma-asset-map.json` `out` field.
- **Pros:** New URL invalidates `next/image` cache; semantic name; no resolver changes.
- **Cons:** One-time path migration; old URL 404s if bookmarked externally.
- **Effort:** Low
- **Notes:** Aligns with `hero` as semantic primary preview per ADR-022.

## Decision

**We will rename SeamKit’s primary preview file from `preview-16x9.png` to `preview-hero.png` and update all in-repo references so `next/image` card surfaces load the new hero art.**

## Consequences

### Positive

- Homepage, `/work`, and case study surfaces resolve the same new bitmap after deploy.
- Filename reflects ADR-022 `hero` semantics rather than aspect-ratio naming alone.

### Negative / Trade-offs

- External links to the old `/assets/work/seamkit/preview-16x9.png` path break — low risk for a portfolio asset.

### Operational Impact

- Future hero swaps: rename again or adopt versioned filenames when binary changes must bust `next/image` cache on cards.
- **Migration / rollback:** Restore `preview-16x9.png` filename and paths in `lib/projects.ts` + asset map.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Figma export script writes stale `out` name | Low | Med | Keep `figma-asset-map.json` `out` in sync with `lib/projects.ts` | John Ohio | Next SeamKit hero re-export |

## Review Schedule

- **Next review:** Next SeamKit hero asset replacement
- **Review owner:** John Ohio

## Related ADRs

- [ADR-022](./ADR-022-primary-preview-hero-and-aligned-thumbnails.md) — primary preview resolution
- [ADR-020](./ADR-020-assetimage-aspect-box-adaptive-object-fit.md) — `AssetImage` / `next/image` on cards

## References

- [`lib/projects.ts`](../../lib/projects.ts) — seamkit `hero` + `thumbnails[0]`
- [`public/assets/work/seamkit/preview-hero.png`](../../public/assets/work/seamkit/preview-hero.png)
- [`scripts/figma-asset-map.json`](../../scripts/figma-asset-map.json)
