# ADR-025: Orchestrated portfolio case study — card title and subtitle

## Status

**Status:** Superseded by ADR-026  
**Date:** 2026-04-13  
**Decision Maker(s):** Jon Ohio (Product Design Lead)  
**Supersedes:** None

## Context

The `orchestrated-portfolio` case study used a long title (“I Didn’t Code My Portfolio. I Orchestrated It.”) that emphasised absence of manual coding over the system insight (orchestration, agentic delivery). Work index and Selected Systems cards follow the pattern **short title + one-line subtitle** (as on other projects).

**In scope:** `title` and `subtitle` on the `orchestrated-portfolio` entry in [`lib/projects.ts`](../../lib/projects.ts).  
**Out of scope:** Case study body copy, hero/thumbnail assets (still placeholders until a separate change), routing.

## Decision Drivers

- Card scanability on `/work` and homepage Selected Systems  
- Alignment with positioning vocabulary (agentic, AI-native, production)  
- Avoid repeating “agentic” in title and subtitle while keeping both legible alone  

## Options Considered

### Option A: Keep the provocative long title

- **Pros:** Memorable hook.  
- **Cons:** Two sentences doing one job; “didn’t code” reads as flex vs method.  
- **Effort:** None  

### Option B: Short title + descriptive subtitle

- **Description:** **Agentic Portfolio** + subtitle **AI-native workflow, from agents to production**.  
- **Pros:** Matches other cards; subtitle carries method and outcome arc.  
- **Cons:** “Agentic” may need occasional explanation for some audiences (mitigated by case study body).  
- **Effort:** Low  

## Decision

**We will use Option B.**

The case study card displays **Agentic Portfolio** with subtitle **AI-native workflow, from agents to production**.

## Consequences

### Positive

- Consistent listing pattern with SeamlessHiring, Seamkit, etc.  
- Subtitle communicates journey without keyword stacking.  

### Negative / Trade-offs

- Shorter title is less unique in search; slug and body remain the canonical story.  

### Operational Impact

- **Migration / rollback:** Revert `title`/`subtitle` in `lib/projects.ts` for `orchestrated-portfolio`.  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Subtitle wraps on narrow cards | Low | Low | Case study pages use full width; if needed shorten to one clause | Product Design Lead | Visual QA on mobile work index |

## Review Schedule

- **Next review:** Next major case study content pass or when hero asset is added  
- **Review owner:** Product Design Lead  

## Related ADRs

- ADR-002 — relationship: constrains (static `lib/projects.ts` data)  
- ADR-022 — relationship: constrains (primary preview image when assets are updated)  
- ADR-026 — relationship: superseded by  

## References

- [`lib/projects.ts`](../../lib/projects.ts) — `orchestrated-portfolio`  
