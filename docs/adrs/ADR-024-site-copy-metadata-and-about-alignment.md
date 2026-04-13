# ADR-024: Site copy, metadata, and About alignment (audit pass)

## Status

**Status:** Accepted  
**Date:** 2026-04-13  
**Decision Maker(s):** Jon Ohio (Product Design Lead)  
**Supersedes:** None

## Context

A live-site audit showed drift between browser/tab metadata and on-page positioning (“Product Systems & DesignOps Lead” vs “Product Design Lead”), weak metrics labels for Seamkit outcomes, the core thesis line carrying a trailing “workflows” that weakened the hook, About tenure copy at “4+ years” vs a consistent “five years,” a conviction quote that read generic, and experience timeline ordering that did not match intended descending narrative order.

This decision captures the chosen copy and presentation rules so future edits stay consistent with the portfolio’s senior positioning and evidence hierarchy.

**In scope:** Global and homepage `metadata` titles and descriptions, JSON-LD `jobTitle`, hero and homepage closing headline, `defaultDescription`, homepage metrics strip labels and Seamkit attribution behaviour, About narrative (`aboutNarrative`), community pull quote (`communityPullQuote`), and `aboutTimeline` ordering.  
**Out of scope:** Replacing placeholder project imagery, case-study body rewrites beyond what’s listed, and new routes or CMS.

## Decision Drivers

- Tab title and on-page role must match for trust and recruiter clarity  
- Thesis line must stay short and memorable (no trailing “workflows” on the headline)  
- Tenure and metadata must not contradict each other  
- Metrics strip must name evidence clearly (token insertions, teams onboarded) with optional product attribution on wider viewports  
- Experience list must read in a defensible, current-first order  

## Options Considered

### Option A: Copy-only patch without ADR

- **Description:** Ship string changes in layout, homepage, About data, and CSS without recording a decision.  
- **Pros:** Fastest.  
- **Cons:** Drift recurs; no single reference for “source of truth” on titles and timeline ordering.  
- **Effort:** Low  
- **Notes:** Rejected for governance (see ADR-008).

### Option B: ADR + implementation (documented defaults)

- **Description:** Record the audit outcomes in an ADR and implement in code as specified.  
- **Pros:** Clear rollback narrative; aligns with index and LOG hygiene.  
- **Cons:** One-time doc maintenance.  
- **Effort:** Low  
- **Notes:** Chosen.

## Decision

**We will use Option B.**

Metadata defaults and homepage overrides use **“John Ohio — Product Design Lead”**; `personSchema.jobTitle` matches. The shared thesis ends at **“from fragmented to intelligent”** (no “workflows” on that line). About body uses **“Over the past five years…”** The metrics strip uses **“Token insertions”** and **“Teams onboarded”** with **(Seamkit)** shown only above the mobile metrics breakpoint (hidden at `max-width: 767px`). The conviction quote is replaced with a specific thesis line in `communityPullQuote`. `aboutTimeline` is ordered current-first, then Rivva, then overlapping SeamlessHR / ClearPrice / Fets / The UX Company / Earlier as captured in `lib/aboutNarrative.ts`.

## Consequences

### Positive

- Browser title, OG/Twitter titles, and hero eyebrow align on role.  
- Headline and About lead share one thesis string family.  
- Metrics read as outcomes, not vague “adoption” labels.  

### Negative / Trade-offs

- “Product Design Lead” may need revisiting if the public title changes; metadata must be updated in both `app/layout.tsx` and `app/page.tsx` (homepage override).  

### Operational Impact

- Editors: change thesis in `Hero.tsx`, `lib/aboutNarrative.ts` (`aboutHeadline`), and homepage closing block together; update `defaultDescription` in `app/layout.tsx` when the one-liner changes.  
- **Migration / rollback:** Revert the listed files to the prior commit; no database or env changes.  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Timeline overlaps still confuse readers | Med | Low | Keep array order as documented; add footnote in narrative only if feedback repeats | Product Design Lead | Two independent readers ask about overlap |

## Review Schedule

- **Next review:** 2026-07-13 or next major positioning change  
- **Review owner:** Product Design Lead  

## Related ADRs

- ADR-010 — relationship: constrains (homepage metrics evidence hierarchy)  
- ADR-012 — relationship: constrains (hero headline / About copy coupling)  
- ADR-008 — relationship: constrains (ADR update gate for major pushes)  

## References

- `app/layout.tsx` — `defaultTitle`, `defaultDescription`, `personSchema`  
- `app/page.tsx` — homepage `metadata`, `heroMetrics`, closing headline  
- `components/Hero.tsx` — H1 thesis lines  
- `lib/aboutNarrative.ts` — `aboutHeadline`, body tenure, `aboutTimeline`  
- `lib/communityContribution.ts` — `communityPullQuote`  
- `app/globals.css` — `.hero-metric-seamkit-suffix` under `max-width: 767px`  
