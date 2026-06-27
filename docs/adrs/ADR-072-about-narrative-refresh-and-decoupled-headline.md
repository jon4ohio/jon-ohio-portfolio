# ADR-072: About page narrative refresh and decoupled headline

## Status

**Status:** Accepted  
**Date:** 2026-06-27  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

The `/about` page narrative had drifted from the portfolio’s current positioning: the About H1 was mechanically tied to the homepage hero (`aboutHeadline = heroHeadline`), the hook read as abstract “system level” framing without concrete proof, and body copy under-weighted flagship outcomes (Seamkit adoption, SeamlessHiring transformation, FetsProza, Rivva, ClearPrice) and the AI-enabled product focus.

A full narrative refresh was requested: a About-specific headline (*Designing systems that scale, from fragmented to intelligent.*), a tighter hook → lead → foundations arc, and a body that names proof with canonical metrics and closes on long-term evolution rather than a screens-vs-systems aphorism.

**In scope:** `lib/sitePositioning.ts` (`aboutHeadline`, `aboutPositioningLine`); `lib/aboutNarrative.ts` (`aboutHookBlocks`, `aboutBodyBlocks`); `app/about/page.tsx` (import `aboutPositioningLine`).  
**Out of scope:** Homepage hero copy, Operating Principles, timeline, community cards, illustration layout (ADR-054), page metadata strings.

## Decision Drivers

- **About-specific voice:** About should tell a fuller proof story than the homepage hero can carry in one line.
- **Evidence over abstraction:** Named projects, adoption metrics (88.9%, ~80% daily usage), and domain breadth (HR, fintech, public services, AI) build recruiter trust.
- **Headline independence:** Homepage hero remains *Designing the systems products and teams run on*; About gets a complementary thesis without forcing mechanical sync.
- **Single source of truth:** Copy lives in `lib/sitePositioning.ts` and `lib/aboutNarrative.ts`, not inline in the page component.

## Options Considered

### Option A: Keep shared headline; patch body paragraphs only

- **Description:** Retain `aboutHeadline = heroHeadline`; replace hook/body strings in `aboutNarrative.ts`.
- **Pros:** Minimal structural change; preserves ADR-012 “often aligned” pattern.
- **Cons:** About H1 cannot express the “fragmented → intelligent” arc; positioning line under About H1 would still mirror hero subcopy awkwardly.
- **Effort:** Low  
- **Notes:** Rejected — headline and subcopy are part of the refresh intent.

### Option B: Decouple About headline and positioning; full hook + body rewrite (chosen)

- **Description:** Add `aboutPositioningLine` in `lib/sitePositioning.ts`; set `aboutHeadline` independently; rewrite `aboutHookBlocks` and `aboutBodyBlocks`; wire About page to `aboutPositioningLine`.
- **Pros:** About tells a complete proof narrative; hero and About can diverge intentionally; metrics and project names are explicit.
- **Cons:** Two headline strings to maintain; editors must update hero and About separately when global thesis changes.
- **Effort:** Low  
- **Notes:** Chosen.

## Decision

**We will use Option B** because **About-specific voice** and **evidence over abstraction** require a dedicated headline, positioning line, and proof-heavy body. About H1 is *Designing systems that scale, from fragmented to intelligent.*; subcopy uses *Lead Product Designer transforming fragmented products into scalable platforms…* Hook frames interface vs system failure → *That's where I work.* → foundations paragraph. Body opens with a complementary challenge frame, five-year scope, Seamkit/SeamlessHR proof, cross-project transformation line (SeamlessHiring, FetsProza, Rivva, ClearPrice), AI-enabled focus, and closing on complexity/scale/evolution. Homepage `heroHeadline` and `positioningLine` are unchanged.

## Consequences

### Positive

- About page reads as a credible leadership narrative with named outcomes and metrics.
- Hero and About can evolve independently without forced headline parity.
- Clear edit surfaces: positioning in `sitePositioning.ts`, narrative blocks in `aboutNarrative.ts`.

### Negative / Trade-offs

- Global thesis changes may require editing two headline exports unless deliberately kept aligned.
- Hook and body both open with “Most products don't fail…” variants — intentional rhythm but slightly redundant; acceptable for section break after illustration band.

### Operational Impact

- Future About copy edits: `lib/aboutNarrative.ts` for hook/body; `lib/sitePositioning.ts` for H1 and positioning subline.
- **Migration / rollback:** Revert the three-file diff; no runtime migration.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Hero and About headlines diverge enough to confuse brand voice | Med | Low | Review both strings together when global positioning changes; cross-link ADR-024/072 in edit checklist | John Ohio | Next positioning refresh |
| Metric strings (88.9%, 80%) drift from case-study source | Low | Med | Keep metrics aligned with Seamkit case study and `lib/projects.ts`; update About when flagship metrics change | John Ohio | Seamkit metrics edit |

## Review Schedule

- **Next review:** 2026-12-27 or next About narrative edit.  
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-024 — Site copy, metadata, and About alignment](./ADR-024-site-copy-metadata-and-about-alignment.md) — constrains metadata/tenure alignment; this ADR narrows About narrative and decouples headline.
- [ADR-012 — Homepage hero headline natural wrap and copy source](./ADR-012-homepage-hero-headline-natural-wrap-and-copy-source.md) — hero copy source; About no longer imports hero headline.
- [ADR-035 — About page label and Operating Principles copy](./ADR-035-about-page-label-and-operating-principles-copy.md)
- [ADR-054 — About intro illustration two-column band](./ADR-054-about-intro-illustration-two-column-band.md)

## References

- [`lib/sitePositioning.ts`](../../lib/sitePositioning.ts) — `aboutHeadline`, `aboutPositioningLine`.  
- [`lib/aboutNarrative.ts`](../../lib/aboutNarrative.ts) — `aboutHookBlocks`, `aboutBodyBlocks`.  
- [`app/about/page.tsx`](../../app/about/page.tsx) — About Me band rendering.
