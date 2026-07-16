# ADR-089: Anchor landing narrative refinement (v1.1)

## Status
**Status:** Accepted  
**Date:** 2026-07-16  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

ADR-086 established the chrome-free `/anchor` adoption landing; ADR-087 made it the sole public surface; ADR-088 restyled the hero (navy gradient) and added scroll-spy side nav. The page still opened with a meeting-coordination claim and closed after adoption with a thin footer — visitors understood “contracts” but left without a clear trust arc (validation → research → repository).

Narrative v1.1 reframes the story: AI sessions lose context; Anchor structures durable sources of truth; evidence and related research justify confidence; the repository remains the primary destination.

**In scope:** Hero / problem / framework copy; Evidence + Related Research + Explore sections; side-nav story labels; CTA hierarchy (GitHub primary, portfolio secondary).  
**Out of scope:** Visual identity (teal/ink/Newsreader, navy hero); SiteShell; catalog listing CTAs; Anchor contract model in the upstream repo; superseding ADR-086/087/088.

## Decision Drivers

- First-time visitors must leave understanding the problem, Anchor’s approach, and enough trust that GitHub is the natural next step.
- Repository remains the primary destination; portfolio provides narrative and evidence only.
- Preserve ADR-086/088 visual identity — copy and section spine only.
- Side nav should narrate the story (Start → Explore), not generic page chrome.

## Options Considered

### Option A: Copy-only refresh within existing four sections
- **Description:** Rewrite hero/problem/framework/adopt strings; keep Home / Problem / Framework / Get Started nav and footer bar.
- **Pros:** Smallest diff; no new section ids.
- **Cons:** No Evidence or Related Research; trust arc and research positioning stay implicit.
- **Effort:** Low
- **Notes:** Rejected — brief requires Evidence + Related Research + Explore.

### Option B: Narrative spine v1.1 (chosen)
- **Description:** Problem/promise hero; framework “source of truth” framing; keep adopt in flow without nav; add Evidence cards, Related Research links, Explore CTA section; retarget spy nav to Start / The Problem / The Framework / Evidence / Explore.
- **Pros:** Matches brief narrative flow; GitHub funnel strengthened at close; research positions Anchor as synthesis.
- **Cons:** Longer page; more scroll-spy targets; Related Research links map to closest existing sources (may need URL swaps later).
- **Effort:** Medium
- **Notes:** Chosen.

### Option C: Full visual redesign with new section chrome
- **Description:** New card system, typography, or color language for Evidence/Explore.
- **Pros:** Stronger visual differentiation of new sections.
- **Cons:** Fights ADR-086/088 identity; out of scope for this brief.
- **Effort:** High
- **Notes:** Rejected — reuse existing card/row patterns.

## Decision

**We will use Option B** because Decision Drivers require a trust arc (Evidence + Related Research) and story-driven nav while keeping the repository as the primary CTA and the existing visual identity intact.

Hero opens with “Every session starts from scratch. / Anchor makes sure your project doesn't.” Problem H2 becomes “Projects accumulate knowledge. / AI sessions rarely do.” Framework H2 becomes “Seven contracts. One source of truth each.” Mid-page GitHub CTA on adopt is removed so Explore owns the close. Related Research links to closest existing Anchor/portfolio sources (ADR-004, coordination POSITION, context POSITION, field note).

## Consequences

### Positive
- Clear problem → approach → trust → repository funnel.
- Side nav labels participate in the story.
- Evidence and research reduce “marketing claim” reading.

### Negative / Trade-offs
- Page length increases; adopt remains in flow but off the spy nav (intentional).
- Related Research destinations are best-effort mappings until dedicated investigation URLs exist.

### Operational Impact
- Modified: `app/anchor/page.tsx` (copy, sections, `navSections`, metadata).
- New ADR only; no new client components required.
- **Migration / rollback:** Revert `page.tsx` to ADR-088 narrative; remove this ADR from index if abandoning v1.1.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Related Research links feel mismatched vs label | Med | Low | Swap hrefs when canonical investigation pages publish; keep labels stable | Owner | Visitor / maintainer feedback on link relevance |

## Related ADRs

- ADR-086 — constrains: standalone `/anchor` identity and GitHub-primary funnel
- ADR-087 — constrains: `/anchor` is sole public Anchor surface
- ADR-088 — constrains: navy hero + scroll-spy side nav pattern (section ids updated, pattern retained)

## References

- Implementation: `app/anchor/page.tsx`
- Anchor repository: https://github.com/jon4ohio/anchor
- Field note (Agentic Development Process link): `/notes/design-doesnt-end-in-figma`
