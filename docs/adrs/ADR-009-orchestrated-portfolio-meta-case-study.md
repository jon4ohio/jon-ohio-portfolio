# ADR-009: Orchestrated portfolio meta case study (static content + homepage placement)

## Status

**Status:** Accepted  
**Date:** 2026-04-13  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

The portfolio site documents product and systems work through typed case studies in `lib/projects.ts` (see ADR-002). A new narrative case study describes how the site itself was shipped using a multi-agent workflow (orchestration, shared GitHub state, ADRs, Figma MCP, Vercel), with a system diagram as the primary visual.

The decision needed here is how that “meta” story is represented in the same static data model as product case studies, how it is ordered relative to other work, and how it appears on the homepage **Selected Systems** section—which is driven by explicit slug lists, not by the `category` field.

**In scope:** Representation of the orchestrated-portfolio case study in `lib/projects.ts`, asset location under `public/`, homepage `systemGroups` membership, and ordering implications for `/work` and case study next/prev navigation.

**Out of scope:** CMS migration, redesign of the case study page template, or refactoring homepage grouping to be category-driven.

## Decision Drivers

- Keep one consistent content model (`Project`) for all case studies (ADR-002).
- Make the meta case study discoverable on the homepage without inventing a new homepage taxonomy.
- Preserve predictable static generation and no runtime CMS.

## Options Considered

### Option A: Full `Project` entry + `public` asset + homepage slug list update (chosen)

- **Description:** Add a `Project` with slug `orchestrated-portfolio` at **index 0** of `projects[]` so it leads `/work` and sits first in next/prev order from that page. Store the diagram at `public/assets/work/orchestrated-portfolio/system-diagram.svg` and reference it via `assets.blocks` (image). Add `orchestrated-portfolio` to the **Organizational Systems** `systemGroups` entry in `app/page.tsx` (after `seamkit`), since the story is about roles, protocol, and decision memory—not a customer product or “Intelligent Systems” AI product.
- **Pros:** Reuses existing routes and `BlockRenderer`; homepage visibility without new components; single source of truth in `lib/projects.ts`.
- **Cons:** Meta case study competes for attention with client work in the same list; diagram is a large SVG with export-time styling constraints in `<img>` contexts.
- **Effort:** Low
- **Notes:** `featured: true` is set for parity with other flagship entries; homepage “Selected Systems” remains slug-driven, so `systemGroups` must be updated explicitly.

### Option B: Host the narrative off-site only (blog or README link)

- **Description:** Keep the portfolio code-only and link out to a separate write-up.
- **Pros:** No mixing “process” with product case studies in `/work`.
- **Cons:** Splits the story from the site’s IA and SEO; fails the goal of demonstrating the work in context.
- **Effort:** Low
- **Notes:** Rejected for discoverability and consistency with ADR-002.

## Decision

**We will use Option A.** The orchestrated portfolio story is a first-class `Project` with slug `orchestrated-portfolio`, ordered first in `projects[]`, with the system diagram shipped as a static asset and surfaced in the case study body via `assets.blocks`. The homepage lists it under **Organizational Systems** alongside Seamkit by extending `systemGroups` slugs.

## Consequences

### Positive

- One content pipeline for all case studies; `/work/orchestrated-portfolio` is statically generated like other slugs.
- Homepage visibility is explicit and stable (slug list), independent of `category` strings such as “AI-Native Workflow.”

### Negative / Trade-offs

- `/work` index row has no thumbnail unless `assets.thumbnails` is added later (optional polish).
- The diagram SVG may not fully adapt to dark theme without a future asset or inline-SVG pass.

### Operational Impact

- Future edits to copy or metrics: change `lib/projects.ts` and redeploy.
- **Migration / rollback:** Remove the `Project` entry and the slug from `systemGroups`; delete or keep `public/assets/work/orchestrated-portfolio/` as needed.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Stale or orphaned `public` assets if the case study is removed without deleting files | Low | Low | Delete unused paths in the same PR as removal, or document in PR checklist | Maintainer | When removing or renaming the case study |
| Homepage group order (`seamkit` vs `orchestrated-portfolio`) diverges from perceived priority | Med | Low | Reorder slugs in `systemGroups` intentionally; document in ADR or PR | Maintainer | When marketing order should change |

## Review Schedule

- **Next review:** 2026-07-01  
- **Review owner:** Maintainer

## Related ADRs

- ADR-002 — depends on / extends static in-repo case study data model  
- ADR-008 — major pushes should update ADRs; this ADR satisfies that gate for this feature  
- N/A — no other supersession

## References

- `lib/projects.ts` — `orchestrated-portfolio` `Project` definition  
- `app/page.tsx` — `systemGroups` Organizational Systems slugs  
- `public/assets/work/orchestrated-portfolio/system-diagram.svg` — diagram asset  
