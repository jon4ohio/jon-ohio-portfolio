# ADR-030: Orchestrated portfolio — system diagram as PNG raster

## Status

**Status:** Accepted  
**Date:** 2026-04-13  
**Decision Maker(s):** Jon Ohio (Product Design Lead)  
**Supersedes:** None

## Context

The `orchestrated-portfolio` case study used `system-diagram.svg` for the multi-agent system illustration. A finalized **PNG export** matches the designed visual (colors, labels, legend) and aligns with other screenshot evidence assets in the same case study.

**In scope:** Replace `public/assets/work/orchestrated-portfolio/system-diagram.svg` with `system-diagram.png`; update [`lib/projects.ts`](../../lib/projects.ts) `thumbnails[1]` and first `assets.blocks` image.  
**Out of scope:** Vector source workflow; other projects.

## Decision Drivers

- Visual parity with the approved diagram export  
- Consistent raster evidence set (PNG) in this case study  
- Correct intrinsic dimensions in `ImageAsset` metadata  

## Decision

**Ship the system diagram as `system-diagram.png` (1024×768, real PNG bytes) and remove the SVG from the public asset path.**

## Consequences

### Positive

- Pixel-accurate match to the final design artifact  

### Negative / Trade-offs

- Raster does not scale infinitely like SVG; acceptable at current display sizes  

### Operational Impact

- **Migration / rollback:** Restore `system-diagram.svg` and prior `lib/projects.ts` paths if needed.  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Mislabeled export (JPEG bytes with `.png`) | Low | High | `file` + `sips` before commit | Product Design Lead | Any new diagram export |

## Review Schedule

- **Next review:** Next case study asset refresh  
- **Review owner:** Product Design Lead  

## Related ADRs

- ADR-028 — relationship: complements (PNG evidence set)  
- ADR-002 — relationship: constrains (`lib/projects.ts` data)  

## References

- `public/assets/work/orchestrated-portfolio/system-diagram.png`  
- [`lib/projects.ts`](../../lib/projects.ts) — `orchestrated-portfolio`  
