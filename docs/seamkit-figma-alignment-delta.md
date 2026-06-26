# SeamKit Figma alignment delta (29713:32162)

**Date:** 2026-06-26  
**Figma frame:** `29713:32162` — [Seamkit — John Ohio — John Ohio](https://www.figma.com/design/HNS3VdAyubm38nx5aYVZOR/Portfolio_-John-Ohio?node-id=29713-32162)  
**Code baseline:** `main` (post PR #158 FigJam embed)

## Section tags

| # | Section | Tag | Action |
|---|---------|-----|--------|
| 1 | Brief | Aligned | None |
| 2 | Evidence | Aligned | None (FigJam embed = code wins vs empty capture iframe) |
| 3 | Transformation | Aligned | None |
| 4 | Tensions | Aligned | None |
| 5 | Layer 01 | Code wins | Keep figure 02–03 captions + decision notes (rasterized in Figma capture) |
| 6 | Layer 02 | Code wins | Keep figure 04 caption + decision notes |
| 7 | Layer 03 | Aligned | None |
| 8 | Layer 04 | Code wins | Keep adoption intro + decision notes under figure 8 |
| 9 | Outcomes | Aligned | None |
| 10 | Reflection | Aligned | None |

## Approved implementation deltas

| Section | Type | Intent | Files | Result |
|---------|------|--------|-------|--------|
| All sections | — | No copy, layout, or IA changes | — | **Shipped as-is** — audit confirmed alignment |
| Evidence art | Asset | Re-export seamkit PNGs from `figma-asset-map.json` | `public/assets/work/seamkit/*` | **Skipped** — source nodes `29654:257*`, `29582:31330`, etc. deleted in Figma reorg; on-disk PNGs from ADR-061 export remain canonical and match capture `29713:32162` |
| Export pipeline | Tooling | Slug-scoped export + no placeholder overwrite on failure | `scripts/export-figma-assets.mjs` | **Shipped** |

`block-system-health-survey.png` remains manual (ADR-063; not in asset map).

## Post-review actions

- Re-map seamkit node IDs in `scripts/figma-asset-map.json` when Section 1 evidence frames are re-published in Figma.
- Optional: re-capture live `/work/seamkit` to Portfolio file after this pass.
