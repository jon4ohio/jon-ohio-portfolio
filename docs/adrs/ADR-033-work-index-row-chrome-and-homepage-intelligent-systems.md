# ADR-033: Work index row chrome and homepage Intelligent Systems curation

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted  
**Date:** 2026-04-13  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

The `/work` index lists case studies in grouped sections (ADR-031). Rows were implemented as a single `<Link>` spanning **index number + thumbnail + body + arrow**, which caused (1) **hover background** to include the left index column, (2) **stacked borders** (category header `border-bottom` plus each row `border-top`), and (3) no **rounded** hover affordance on the interactive block. Separately, the homepage **Selected Systems** “Intelligent Systems” pair still featured **SeamlessAI** even though the **Agentic Portfolio** (`orchestrated-portfolio`) case study better matches the current positioning narrative (ADR-026–030).

**In scope:** Markup/CSS for `/work` rows (`.work-list-item` wrapper, index outside `<Link>`, separators, hover/focus chrome); homepage `systemGroups` slug curation for Intelligent Systems; Open Graph copy on `/work` metadata where it lists example projects.  
**Out of scope:** Changing `Project` records in `lib/projects.ts`; new routes; making the entire row (including index) one clickable `<a>`.  

## Decision Drivers

- **Clear affordance:** Hover and keyboard focus should apply only to the **navigable** block, not to decorative row numbers.  
- **Visual clarity:** One horizontal rule between rows without **double lines** under category headings.  
- **Consistency:** Homepage Intelligent Systems teaser should align with the **orchestrated portfolio** story already shipped as a case study.  
- **Accessibility:** Visible focus on the link; row index remains readable text (not inside the link’s accessible name).  

## Options Considered

### Option A: Keep single full-width `<Link>` and accept shared hover
- **Description:** Leave index inside the link; tweak borders only.  
- **Pros:** Simplest DOM; largest click target.  
- **Cons:** Hover includes index; does not meet the requested interaction model.  
- **Effort:** Low  
- **Notes:** Rejected.  

### Option B: Index outside `<Link>`, item-level borders, rounded link hover, curated homepage slugs (chosen)
- **Description:** Wrap each row in `.work-list-item` with the **index** in a sibling `<span>`, `<Link class="work-list-row">` containing thumb + body + arrow only. Use **`border-bottom`** on `.work-list-item` (last child in section without bottom border) instead of `border-top` on links. Style `.work-list-row` with **`border-radius: 12px`**, horizontal padding, and existing `var(--surface-hover)` on `:hover` / `:focus-visible`. Update [`app/page.tsx`](../../app/page.tsx) Intelligent Systems slugs to **`orchestrated-portfolio`** and **`rivva`**. Refresh [`app/work/page.tsx`](../../app/work/page.tsx) Open Graph description to mention Agentic Portfolio instead of SeamlessAI where appropriate.  
- **Pros:** Matches requested UX; removes double-rule stacking; reinforces orchestrated-portfolio on the homepage.  
- **Cons:** Slightly more DOM; responsive CSS must target `.work-list-item` + `.work-list-row` (replaces old four-column grid on the link alone).  
- **Effort:** Medium  
- **Notes:** Tablet/mobile grid rules moved from four-column to three-column inner grid plus outer two-column layout.  

## Decision

**We will use Option B.** List indices on `/work` are **non-link** siblings; **hover, background, and focus ring** apply only to `.work-list-row`. **Row separators** use **bottom borders** on `.work-list-item` with **no** redundant spacer `div` after each group. Homepage **Intelligent Systems** Selected Systems row uses **`orchestrated-portfolio`** and **`rivva`**.  

## Consequences

### Positive
- Clearer perceived click/hover target; index reads as static numbering.  
- Cleaner separators between category heading and first row.  
- Homepage highlights Agentic Portfolio alongside Rivva.  

### Negative / Trade-offs
- Click target is the link block only (not the index); acceptable for the stated goal.  
- **Mitigation:** Generous link padding and clear card hover.  

### Operational Impact
- Future `/work` layout changes must update [`app/globals.css`](../../app/globals.css) `.work-list-item` / `.work-list-row` and [`app/work/page.tsx`](../../app/work/page.tsx) together.  
- **Migration / rollback:** Revert TSX/CSS commits; no data migration.  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Mobile grid regression (thumb/body/arrow order) | Low | Med | Test `/work` at ≤640px and ≤900px after any layout edit; keep `npm run build` in PR checklist | Maintainer | Changes to `.work-list-*` CSS or `AssetImage` in work index |
| Focus ring clipped by `overflow` on a parent | Low | Low | Avoid `overflow: hidden` on new wrappers around `.work-list-row`; use `border-radius` + `box-shadow` for focus | Maintainer | New section wrappers on `/work` |

## AI-Specific Considerations

N/A  

## Review Schedule

- **Next review:** 2026-10-13 or when `/work` or Selected Systems layout is redesigned.  
- **Review owner:** John Ohio (Owner/Maintainer)  

## Related ADRs

- [ADR-004 — Shared metric-badge CSS, work index grid, and local preview](./ADR-004-shared-metric-badges-work-grid-cursor-preview.md) — original work list hooks.  
- [ADR-031 — Work taxonomy consolidation and grouped index](./ADR-031-work-taxonomy-consolidation-and-grouped-index.md) — homepage vs `/work` editorial split.  

## References

- [`app/work/page.tsx`](../../app/work/page.tsx) — `work-list-stack`, `work-list-item`, `work-list-row` structure.  
- [`app/globals.css`](../../app/globals.css) — `.work-list-item`, `.work-list-row`, responsive rules.  
- [`app/page.tsx`](../../app/page.tsx) — `systemGroups` for Selected Systems.  
