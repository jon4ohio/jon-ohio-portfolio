# ADR-029: Orchestrated portfolio — responsive evidence gallery and listing thumb fit

## Status

**Status:** Accepted  
**Date:** 2026-04-13  
**Decision Maker(s):** Jon Ohio (Product Design Lead)  
**Supersedes:** None

## Context

The Agentic Portfolio case study uses a two-up gallery for Codex + ADR gate screenshots. On narrow viewports, side-by-side columns felt cramped. Listing thumbnails for this project appeared over-cropped in the 4:3 work grid when using default `object-fit` behaviour.

**In scope:** [`app/work/[slug]/page.tsx`](../../app/work/[slug]/page.tsx) gallery layout, [`app/globals.css`](../../app/globals.css) utility classes, [`app/work/page.tsx`](../../app/work/page.tsx) and [`app/page.tsx`](../../app/page.tsx) thumb `aspectFit` for `orchestrated-portfolio`, and shortened captions in [`lib/projects.ts`](../../lib/projects.ts).  
**Out of scope:** Global changes to all project thumbnails beyond this slug.

## Decision Drivers

- Mobile readability: stack evidence vertically below 641px  
- Caption scanability: short one-line labels  
- Thumbnail: show full hero frame without aggressive crop for this asset  

## Decision

**Use a responsive 2-column gallery (1 column below 641px), shorten gallery captions, and set `aspectFit="contain"` for `orchestrated-portfolio` previews on `/work` and the homepage Selected Systems row only.**

## Consequences

### Positive

- Better mobile layout for evidence screenshots  
- Less “zoomed” thumb for the orchestrated-portfolio hero in list views  

### Negative / Trade-offs

- `contain` may show letterboxing in the thumb slot for this project  

### Operational Impact

- **Migration / rollback:** Revert the listed files and remove `.case-study-gallery*` rules from `globals.css`.  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Caption ellipsis hides text on very narrow screens | Low | Low | Keep copy short; adjust caption CSS if needed | Product Design Lead | Mobile QA on case study |

## Review Schedule

- **Next review:** Next portfolio visual pass  
- **Review owner:** Product Design Lead  

## Related ADRs

- ADR-028 — relationship: complements (PNG evidence assets)  
- ADR-022 — relationship: constrains (primary preview / thumbnails)  

## References

- [`app/work/[slug]/page.tsx`](../../app/work/[slug]/page.tsx)  
- [`lib/projects.ts`](../../lib/projects.ts) — `orchestrated-portfolio`  
