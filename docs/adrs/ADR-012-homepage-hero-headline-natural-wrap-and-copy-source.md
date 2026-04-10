# ADR-012: Homepage hero headline natural wrap and decoupled About copy

## Status

**Status:** Accepted  
**Date:** 2026-04-11  
**Decision Maker(s):** Jon Ohio (Product Design Lead)  
**Supersedes:** None  

## Context

Earlier homepage work ([ADR-010](/docs/adrs/ADR-010-homepage-hero-and-metrics-evidence-hierarchy.md)) emphasized hero messaging hierarchy and metrics presentation. The hero `h1` later used span-based line control and breakpoint-driven stacking, which could fight natural wrapping on small viewports and duplicated headline wording relative to the About page.

The About page uses a single narrative string (`aboutHeadline` from [`lib/aboutNarrative.ts`](/Users/mac/Downloads/jon-ohio-portfolio/lib/aboutNarrative.ts)) inside its `h1`. The product question is whether the homepage must import that export for parity or may use an independent string while matching the same *pattern* (one flowing headline).

**In scope:** Hero `h1` structure, typography scale (64px cap), and relationship to About headline copy.  
**Out of scope:** Metrics strip layout (covered by ADR-010), theme tokens (ADR-007, ADR-011), hero canvas animation ([ADR-009](/docs/adrs/ADR-009-full-viewport-hero-grid-background-layering.md)).

## Decision Drivers

- Predictable wrapping across breakpoints without forced line breaks  
- Editorial readability aligned with About (single-line headline *pattern*)  
- Low coupling: homepage and About can evolve copy independently when needed  
- Maintain inline-style convention for Hero ([ADR-001](/docs/adrs/ADR-001-inline-styles-for-layout-and-visuals.md))  

## Options Considered

### Option A: Import `aboutHeadline` into Hero

- **Description:** Single source of truth; `{aboutHeadline}` in both About and Hero.  
- **Pros:** No string drift; one edit updates both.  
- **Cons:** Couples marketing/home hero to narrative module; homepage and About may intentionally diverge later.  
- **Effort:** Low  
- **Notes:** Strong choice if parity is mandatory.  

### Option B: Shared constant in a small `lib/heroCopy.ts`

- **Description:** New module exporting headline string for Hero only; About keeps `aboutHeadline`.  
- **Pros:** Clear separation of concerns.  
- **Cons:** Extra file for one string; still manual sync if copy should match.  
- **Effort:** Low  
- **Notes:** Overkill for current scale.  

### Option C: Literal headline in Hero + natural wrap; About keeps `aboutHeadline`

- **Description:** Hero `h1` contains one text node (inline string) with browser-controlled wrapping; `fontSize` uses `clamp` with **64px** maximum; remove span-specific CSS. About continues to use `aboutHeadline`. Narrative comment documents that both are often aligned but not mechanically linked.  
- **Pros:** Matches About’s structural pattern without importing; minimal code; flexible for future copy differences.  
- **Cons:** Risk of copy drift if only one page is updated.  
- **Effort:** Low  
- **Notes:** Mitigate drift via comment and editorial discipline when changing either line.  

## Decision

**We will use Option C because it preserves a natural editorial headline on the homepage, keeps implementation minimal, and avoids unnecessary coupling to `aboutNarrative` while still allowing intentional alignment when copy changes.**

Hero typography remains inline in [`components/Hero.tsx`](/Users/mac/Downloads/jon-ohio-portfolio/components/Hero.tsx); no `hero-headline-*` utility classes in [`app/globals.css`](/Users/mac/Downloads/jon-ohio-portfolio/app/globals.css).

## Consequences

### Positive

- Headline wraps naturally on narrow screens; no span-driven line forcing.  
- Clear 64px cap keeps hero scale distinct from the About `h1` clamp.  

### Negative / Trade-offs

- Homepage and About headlines can diverge unless both are updated together.  

### Operational Impact

- **Onboarding:** When changing the lead line, check Hero and About (and any OG metadata if applicable).  
- **Migration / rollback:** Restore span markup and `globals.css` rules from version control if a forced two-line layout is required again.  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Copy drift between Hero and About | Med | Low | Narrative comment + PR review when editing either headline | Product Design Lead | User reports inconsistent messaging |

## Review Schedule

- **Next review:** 2026-07-11 or next major homepage copy pass  
- **Review owner:** Product Design Lead  

## Related ADRs

- ADR-001 — constrains (inline styles)  
- ADR-010 — related (earlier hero/metrics hierarchy; headline layout approach refined by this ADR)  
- ADR-003 — constrains (globals.css utilities where used elsewhere)  

## References

- `components/Hero.tsx`  
- `app/about/page.tsx`  
- `lib/aboutNarrative.ts`  
