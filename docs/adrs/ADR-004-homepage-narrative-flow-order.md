# ADR-004: Homepage narrative flow order and System Model bridge copy

## Status

**Status:** Accepted  
**Date:** 2026-04-08  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

Homepage messaging is intentionally typography-led and section based. Multiple edits to Hero, metrics, positioning, and System Model copy introduced drift in section sequence and transition language.

Without a stable narrative order, visitors can encounter framework content before context, reducing clarity of the story arc.

## Decision

The homepage section order is fixed as:

1. Hero
2. Metrics Strip
3. Positioning
4. System Model
5. Selected Systems

The System Model remains the same structural component and acts as the bridge between positioning and portfolio evidence.

System Model copy constraints:
- Title: `How systems evolve`
- Intro: `Most products don't fail at the interface level — they fail at the system level. This is how systems evolve.`
- Stages remain: `Fragmented → Structured → Scalable → Intelligent`
- Bridge line: `These systems exist across different stages — here are the systems I've built.`

## Consequences

### Positive
- Clear top-of-page narrative: credibility → thinking → framework → proof
- Reduced content churn risk by documenting exact ordering and bridge language
- Maintains existing UI system (no redesign required)

### Trade-offs
- Section order changes now require ADR updates if narrative intent changes
- Copy in this section is less flexible without explicit decision updates

## Related ADRs

- ADR-001: Inline styles for layout and visuals
- ADR-003: Responsive layout via CSS utility classes in `globals.css`
