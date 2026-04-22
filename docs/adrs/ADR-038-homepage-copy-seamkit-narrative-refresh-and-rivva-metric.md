# ADR-038: Homepage copy refresh, Seamkit narrative update, and Rivva Product Hunt metric

## Status

**Status:** Proposed  
**Date:** 2026-04-22  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

This is the `jon-ohio-portfolio` website. Case study content is stored in-repo in `lib/projects.ts` (ADR-002). The homepage (`app/page.tsx`) includes an impact metrics strip, an ownership list with curated blurbs, and a “range” card for Rivva.

A content pass is needed to:

- Refresh the four core ownership blurbs and the `/work` listing summaries for Seamkit, SeamlessHiring 2.0, FetsProza, and IBEDC.
- Replace the Seamkit `/work/seamkit` narrative with a staff-level story that foregrounds adoption risk, governance, and explicit trade-offs.
- Surface Rivva’s Product Hunt validation on the homepage metrics strip while keeping Rivva positioned as an **AI scheduling** product (not a news product).

**In scope:** copy updates in `lib/projects.ts` and `app/page.tsx` that do not change routing or the `Project` schema.  
**Out of scope:** CMS migration, new case study layout components, new image assets (beyond referencing a planned diagram in prose).

## Decision Drivers

- Keep the static data model (`lib/projects.ts`) and existing page templates (ADR-002).
- Improve narrative clarity for staff-level ownership (Seamkit).
- Keep Rivva’s product domain consistent across homepage + `/work/rivva`.
- Preserve scan-friendly homepage metrics (short value + explanatory label).

## Options Considered

### Option A: Update only `/work` summaries (leave homepage blurbs unchanged)

- **Description:** Change `summary` fields only; keep homepage ownership blurbs as-is.
- **Pros:**
  - Smallest diff surface
  - Lowest risk of homepage tone drift
- **Cons:**
  - Homepage and `/work` can diverge in positioning language
  - Misses the explicit homepage refresh intent
- **Effort:** Low
- **Notes:** Harder to keep “single source of truth” feeling across surfaces.

### Option B: Update `/work` summaries **and** homepage curated blurbs + metrics strip

- **Description:** Update `summary` for the four core projects, refresh homepage ownership blurbs, extend Seamkit narrative fields, add Rivva Product Hunt proof to the homepage metrics strip, and align Rivva listing copy while keeping “AI Scheduling Platform”.
- **Pros:**
  - Consistent story across homepage and `/work`
  - Adds a high-signal external validation metric without changing Rivva’s domain
- **Cons:**
  - Requires maintaining two curated surfaces (`ownershipBlurbBySlug` + `projects`)
  - Seamkit narrative is long; must still map cleanly to existing case study section labels
- **Effort:** Medium
- **Notes:** Seamkit narrative is split across `context` / `problem` / `action` / `impact` because `/work/[slug]` renders fixed section headings.

## Decision

**We will use Option B because the goal is a coherent recruiter-facing story on `/` and `/work`, and Rivva’s proof should be visible without reframing the product category.**

Concretely:

- Update the four project `summary` strings in `lib/projects.ts`.
- Replace Seamkit’s longform fields with the refreshed narrative (including explicit trade-offs), distributed across `context`, `problem`, `action`, and `impact` to match the existing case study renderer.
- Add a fifth homepage metric for Rivva’s Product Hunt placement (first week).
- Refresh homepage ownership blurbs and the Rivva “range” card copy while keeping Rivva as **AI Scheduling Platform**.

## Consequences

### Positive

- Homepage ownership blurbs match the updated positioning language.
- `/work` cards reflect the same summaries (shared `summary` field).
- Seamkit reads as an adoption + governance story, not only a component library story.

### Negative / Trade-offs

- Homepage blurbs are not automatically derived from `summary` (mitigation: keep blurbs short and mirror `summary` intent; update both when repositioning).

### Operational Impact

- Future copy edits may need to touch both `lib/projects.ts` and `app/page.tsx` for homepage-specific blurbs.
- **Migration / rollback:** revert the touched strings in `lib/projects.ts` and `app/page.tsx`.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Seamkit narrative length hurts readability in fixed “Context/Problem/Approach/Outcomes” sections | Med | Med | Keep paragraphs tight; split content across sections intentionally; follow with a visual diagram asset later if needed | Maintainer | Recruiter feedback or bounce on `/work/seamkit` |

## Review Schedule

- **Next review:** Next homepage positioning pass or when Rivva case study assets expand
- **Review owner:** Maintainer

## Related ADRs

- ADR-002 — relationship: constrains (static `lib/projects.ts` data model)
- ADR-010 — relationship: related (homepage metrics evidence hierarchy)

## References

- `lib/projects.ts`
- `app/page.tsx`
- `app/work/[slug]/page.tsx`
