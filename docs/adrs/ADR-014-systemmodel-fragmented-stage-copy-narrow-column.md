# ADR-014: SystemModel Fragmented stage copy for narrow-column line breaks

## Status

**Status:** Accepted  
**Date:** 2026-04-10  
**Decision Maker(s):** Jon Ohio (Product Design Lead)  
**Supersedes:** None  

## Context

The homepage “How systems evolve” section (`components/SystemModel.tsx`) renders each stage description in a narrow column (`maxWidth: 240`). The Fragmented stage sentence **“Disconnected workflows, inconsistent interfaces, high support load.”** caused an awkward last-line wrap (orphan line) at common viewport widths.

**In scope:** Wording of the Fragmented stage `description` string only.  
**Out of scope:** Other stage copy, grid layout dimensions, typography scale, and theme tokens.

## Decision Drivers

- Reduce typographic orphans in the Fragmented column without widening the column or adding layout complexity  
- Preserve the same three ideas: disconnected workflows, inconsistent experience surfaces, elevated support burden  
- Keep implementation as a static string in the existing `stages` array ([ADR-001](ADR-001-inline-styles-for-layout-and-visuals.md) inline-style pattern unchanged)  

## Options Considered

### Option A: Adjust layout/CSS only

- **Description:** Increase `maxWidth`, tweak `line-height`, or use `text-wrap: balance` / hyphenation so the original sentence wraps more evenly.  
- **Pros:** No copy change; meaning stays in standard prose order.  
- **Cons:** May dilute the intentional narrow column; balance rules vary by browser; still may not fix every breakpoint.  
- **Effort:** Low  
- **Notes:** Risks visual inconsistency with other stage columns.  

### Option B: Rephrase the middle clause for shorter tokens

- **Description:** Replace “inconsistent interfaces” with **“UI/UX inconsistent”** so the line breaks more cleanly in the same column width.  
- **Pros:** Single-string change; no CSS churn; directly targets wrap behavior.  
- **Cons:** Word order is less conventional than “inconsistent UI/UX”; readers may notice editorial compression.  
- **Effort:** Low  
- **Notes:** Semantic intent (inconsistent product/UI experience) remains aligned.  

### Option C: Split with intentional line breaks in markup

- **Description:** Change `description` to `ReactNode` or add a small component that inserts `<br />` at chosen points.  
- **Pros:** Full control over breaks per breakpoint if paired with responsive logic.  
- **Cons:** More code and harder maintenance for one line of marketing copy.  
- **Effort:** Medium  
- **Notes:** Overkill for a portfolio static section.  

## Decision

**We will use Option B because it fixes the orphan-line issue with minimal surface area and keeps the narrow column design intact.**

The phrasing trade-off is acceptable relative to **Narrow-column readability** and **Low layout complexity**; we avoid Option A’s cross-column width drift and Option C’s structural overhead.

## Consequences

### Positive

- Fragmented column reads with fewer awkward wraps on typical desktop widths.  
- No change to component API or CSS grid; only copy in `stages[0].description`.  

### Negative / Trade-offs

- Middle clause is grammatically compressed; may read slightly telegraphic compared to full prose.  

### Operational Impact

- Future edits to stage copy remain localized to `SystemModel.tsx`.  
- **Migration / rollback:** Restore the prior `description` string in `components/SystemModel.tsx` if stakeholder review prefers standard word order over wrap quality.  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| “UI/UX inconsistent” reads as jargon-heavy or awkward to some visitors | Med | Low | Spot-check wrapping at ~320–400px column width and desktop; revert to Option A (CSS tuning) only if feedback is consistently negative | Product Design Lead | Two independent readers flag the middle clause |

## Review Schedule

- **Next review:** 2026-05-10  
- **Review owner:** Product Design Lead  

## Related ADRs

- [ADR-001](ADR-001-inline-styles-for-layout-and-visuals.md) — relationship: constrains (inline styles for layout)  
- [ADR-010](ADR-010-homepage-hero-and-metrics-evidence-hierarchy.md) — relationship: adjacent (homepage narrative; does not govern SystemModel stage strings)  

## References

- `components/SystemModel.tsx` — Fragmented `description` string  
- [ADR-010](ADR-010-homepage-hero-and-metrics-evidence-hierarchy.md) — homepage hero and metrics hierarchy  
