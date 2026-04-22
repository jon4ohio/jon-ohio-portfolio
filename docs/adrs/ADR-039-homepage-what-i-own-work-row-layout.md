# ADR-039: Homepage “What I own” uses `/work` case study row layout (no S/N) and folds in Rivva

## Status

**Status:** Proposed  
**Date:** 2026-04-22  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

This is the `jon-ohio-portfolio` website. The `/work` index uses a consistent “case study row” layout (`work-list-stack` / `work-list-row`) with thumbnail preview, metadata row, title/subtitle, summary body, metric badges, tags, and a trailing arrow.

The homepage (`app/page.tsx`) previously used a different layout for the **What I own** section and duplicated Rivva in a separate **Selected work and experiments** section.

**In scope:** homepage layout + information architecture for the ownership section; remove redundant homepage section.  
**Out of scope:** changing `/work` grouping/categories, changing `Project` schema, broad redesign of global CSS (a small modifier on existing `work-list-*` rules is in scope to keep no-index rows from inheriting the index column grid).

## Decision Drivers

- Visual parity between homepage ownership and `/work` scan patterns (recruiter-first)
- Reduce duplicated Rivva storytelling surfaces on `/`
- Keep curated homepage copy for title/subtitle/body while reusing canonical project metadata (company/period/metrics/tags/assets)

## Options Considered

### Option A: Keep bespoke homepage ownership layout

- **Description:** Retain the two-column `grid-systems-group` ownership layout; optionally link to case studies.
- **Pros:**
  - Less JSX duplication vs `/work`
  - Distinct homepage rhythm vs index page
- **Cons:**
  - Ownership and `/work` diverge visually and structurally
  - Rivva ends up “special-cased” outside the same card system
- **Effort:** Low
- **Notes:** Harder to communicate “same case study system” across routes.

### Option B: Reuse `/work` row structure on homepage (minus serial numbering) and remove the extra Rivva section

- **Description:** Render homepage ownership rows using the same DOM/classes as `/work`, omit `work-list-idx`, include Rivva as the 5th row, delete the separate “Selected work and experiments” section.
- **Pros:**
  - Strong consistency between `/` and `/work`
  - Rivva is treated like other flagship work (same card affordances)
  - Removes redundant homepage surface area
- **Cons:**
  - Some markup duplication between `app/work/page.tsx` and `app/page.tsx` unless extracted to a component
  - Homepage body copy must be explicitly curated (cannot silently rely on `Project.summary` if it differs)
- **Effort:** Medium
- **Notes:** If duplication becomes painful, extract a shared `WorkCaseStudyRow` component in a follow-up.

## Decision

**We will use Option B because the goal is a single, consistent case study row language across the homepage ownership section and `/work`, while eliminating the extra Rivva-only section.**

Homepage rows reuse `/work`’s row structure and asset preview behavior, omit serial numbering, include Rivva as the fifth ownership project, and remove the separate “Selected work and experiments” block.

Because `.work-list-item` is a two-column grid (`work-list-idx` + `work-list-row`), homepage rows add **`work-list-item--no-idx`** on the outer item so the case study link spans the full width at desktop, tablet, and mobile (no squeezed first column).

## Consequences

### Positive

- Homepage ownership reads as the same “system” as `/work` (thumbnail + metrics + tags)
- Rivva is integrated without a second narrative container on `/`

### Negative / Trade-offs

- Duplicated row markup across pages until a shared component is introduced

### Operational Impact

- When updating ownership copy, edit the homepage curated fields **and** keep `/work` summaries aligned if parity is desired.
- **Migration / rollback:** revert `app/page.tsx` ownership section and restore the removed section if needed.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Homepage curated copy diverges from `Project.summary` on `/work` | Med | Med | Treat homepage copy as intentional; align `lib/projects.ts` summaries when drift is undesirable | Maintainer | After any major repositioning pass |

## Review Schedule

- **Next review:** After the next homepage IA pass or when extracting shared row component
- **Review owner:** Maintainer

## Related ADRs

- ADR-002 — relationship: constrains (static `lib/projects.ts` data model)
- ADR-004 — relationship: constrains (shared `work-list-*` layout classes)
- ADR-038 — relationship: related (homepage copy + Rivva proof-point decisions)

## References

- `app/page.tsx`
- `app/work/page.tsx`
