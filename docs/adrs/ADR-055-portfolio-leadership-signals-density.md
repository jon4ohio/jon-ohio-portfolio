# ADR-055: Portfolio leadership signals — brief density without new sections

## Status

**Status:** Accepted  
**Date:** 2026-06-01  
**Decision Maker(s):** John Ohio (Lead Product Designer)  
**Supersedes:** None

## Context

The portfolio is content-rich but scans as execution-heavy: strong case study depth (Seamkit governance, SeamlessHiring phased outcomes) is buried or split across flagship routes vs. `lib/projects.ts`. Recruiters and Staff/Lead reviewers need leadership scale, organizational leverage, and decision authority in the first screen of each case study — without adding routes or long-form sections.

**In scope:** `lib/sitePositioning.ts` as copy source of truth; executive brief schema (`MetadataBrief`); project brief/outcome/summary fields in `lib/projects.ts`; homepage hero and metadata alignment; About credibility line; SeamlessHiring brief canonicalized in data.  
**Out of scope:** New `/leadership` content, new AI route, replacing placeholder seamkit token diagrams in `assets.blocks`.

## Decision Drivers

- Increase information density per pixel — no new nav sections  
- Single source of truth for positioning (hero, About, OG, JSON-LD)  
- Case study cards and `/work/[slug]` must inherit the same brief signals as flagship pages  
- Surface judgment (key decisions) above the fold; governance stays in Responsibility metadata and case study body (no duplicate brief figure)  

## Options Considered

### Option A: Add Leadership and AI sections

- **Description:** New top-level routes with duplicated narrative.  
- **Pros:** Obvious IA for “leadership” and “AI.”  
- **Cons:** More content to maintain; repeats material already in Seamkit and `/leadership`; weaker scan path for hiring managers.  
- **Effort:** Medium  
- **Notes:** Rejected — `/leadership` already exists; signals belong in brief band.

### Option B: Embed signals in executive brief + shared positioning module (chosen)

- **Description:** Extend `MetadataBriefProps` with `keyDecisions`; standardize Role / Team / Responsibility rows (governance in Responsibility + `led`, not a second brief artifact); centralize hero copy in `lib/sitePositioning.ts`.  
- **Pros:** Reuses bento brief; works on generic and flagship routes; copy changes propagate to metadata and cards.  
- **Cons:** Requires accurate team counts and disciplined copy edits in `projects.ts`.  
- **Effort:** Low–Medium  
- **Notes:** SeamlessHiring flagship imports `project.brief` from data to remove dual source of truth.

## Decision

**We will use Option B** because it raises Staff/Lead-readable signals in existing scan paths (hero subhead, brief bento, outcome lead sentences) without expanding site IA.

## Consequences

### Positive

- Hero, About, layout metadata, and JSON-LD share one positioning line  
- Every brief-backed case study exposes Team + Responsibility + optional Key decisions  
- Seamkit brief shows three decision bullets immediately after the bento; governance signal lives in Responsibility row and flagship Layer 3 narrative  
- SeamlessHiring `impact` in `lib/projects.ts` matches flagship STRATEGIC narrative for cards and OG  

### Negative / Trade-offs

- Team headcounts are static strings — must be updated manually when org structure changes  

### Operational Impact

- Future copy changes: edit `lib/sitePositioning.ts` first, then project briefs in `lib/projects.ts`  
- **Migration / rollback:** Revert ADR-055 commit; remove `keyDecisions` prop if brief UI feels crowded on tablet  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Brief bento grows too tall on mobile with Key decisions card | Med | Med | Single card in `.brief-signals` below bento; tablet rules unchanged (ADR-049) | Maintainer | Mobile QA on `/work/seamkit` after brief edits |
| Inflated team counts if copied without verification | Low | High | Source counts from performance/org context; review before next promotion cycle | John Ohio | HR or role change at SeamlessHR |

## Review Schedule

- **Next review:** 2026-09-01 or next major case study publish  
- **Review owner:** John Ohio  

## Related ADRs

- ADR-024 — site copy and metadata alignment (superseded in practice by shared `sitePositioning` module for hero/About)  
- ADR-043 — flagship executive brief bento layout  
- ADR-047 — SeamlessHiring narrative and metrics canonicalization  
- ADR-048 — commercial shift vs. evidence in brief  
- ADR-056 — supersedes brief `keyDecisions` strings with `strategicDecisions`; consolidates SeamlessHiring judgment sections  

## References

- `lib/sitePositioning.ts`  
- `components/case-study/MetadataBrief.tsx`  
- `lib/projects.ts` (seamkit, seamless-hiring, fetsproza, ibedc briefs)  
- `docs/adrs/ADR-024-site-copy-metadata-and-about-alignment.md`
