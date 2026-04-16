# ADR-035: About page label and Operating Principles copy

## Status
**Status:** Accepted  
**Date:** 2026-04-16  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

Two label / copy issues on the `/about` page required correction:

1. **Page-top eyebrow label** read `"About"` — inconsistent with the nav label "About" but also ambiguous as a section descriptor. The intent is self-referential context-setting, so `"About Me"` is more precise.

2. **Community contribution section** had a duplicate `communitySectionEyebrow` label (`"ABOUT ME"`) rendered immediately above the `<h2>`. This created two consecutive labels before the heading with no structural purpose for the second one — it was vestigial from an earlier layout that has since changed.

3. **Operating Principles copy** — all four principle titles and body texts were wordier than needed. The titles used relative clauses ("should compound", "must reflect") and the bodies contained abstract framing ("The job is to…", "The best design fails if…") rather than direct declarative statements. The revised copy tightens each title to a noun phrase and each body to two plain sentences.

**In scope:** `app/about/page.tsx` (label changes, eyebrow removal); `lib/aboutNarrative.ts` (Operating Principles array).  
**Out of scope:** Page structure, section order, community card content, timeline data.

## Decision Drivers

- **Clarity:** "About Me" signals the self-referential nature of the section immediately; the bare "About" read like a navigation breadcrumb.
- **No redundancy:** Two consecutive `section-label` elements before the community heading added visual noise with no meaning.
- **Copy concision:** Principle bodies should read as convictions, not explanations. Shorter, declarative sentences carry more authority.

## Options Considered

### Option A: Keep "About" as-is, remove duplicate eyebrow only
- **Pros:** Minimal diff.
- **Cons:** "About" still reads as a breadcrumb; the original intent of the eyebrow was "About Me" anyway.
- **Rejected.**

### Option B: "About Me" top label, remove community eyebrow, tighten OP copy (chosen)
- **Description:** Single pass: rename top label; strip community eyebrow + unused import; update four principle entries in `lib/aboutNarrative.ts`.
- **Pros:** Consistent, purposeful labels; cleaner hierarchy; sharper convictions.
- **Cons:** None material.
- **Accepted.**

## Decision

**We use Option B.** Top eyebrow updated to `"About Me"`; `communitySectionEyebrow` paragraph and its import removed from `app/about/page.tsx`; Operating Principles copy updated in `lib/aboutNarrative.ts` as follows:

| # | Old title | New title | Body change |
|---|-----------|-----------|-------------|
| 1 | Systems over screens | Systems over screens | "The interface is a surface…" → "Interfaces are surfaces. Systems define behavior…" |
| 2 | Structure reduces complexity | Structure reduces complexity | "Complexity is unavoidable. The job is…" → "Complexity is inevitable. Structure makes it navigable…" |
| 3 | Decisions should compound | Decisions compound | "Good design decisions… Patterns, tokens…" → "Design decisions create leverage. Systems turn individual choices…" |
| 4 | Design must reflect operational reality | Design reflects operational reality | "The best design fails if it doesn't account for constraints…" → "Design fails when it ignores constraints. Systems must align…" |

## Consequences

### Positive
- Cleaner About page hierarchy — one purposeful eyebrow per section.
- Operating Principles read as convictions, not hedged observations.
- Removes a dead import (`communitySectionEyebrow`).

### Negative / Trade-offs
- None.

### Operational Impact
- If `communitySectionEyebrow` is re-added elsewhere, it must be re-imported.
- Future About copy edits: `lib/aboutNarrative.ts` is the single source for OP copy.
- **Migration / rollback:** Revert the two-file diff; no data migration.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Label "About Me" feels informal in some locales | Low | Low | Review if internationalisation is added | John Ohio | i18n work |

## AI-Specific Considerations

N/A

## Review Schedule

- **Next review:** 2026-10-16 or when About narrative is next revised.  
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-024 — Site copy, metadata, and About alignment](./ADR-024-site-copy-metadata-and-about-alignment.md)

## References

- [`app/about/page.tsx`](../../app/about/page.tsx) — label and eyebrow changes.  
- [`lib/aboutNarrative.ts`](../../lib/aboutNarrative.ts) — Operating Principles array.
