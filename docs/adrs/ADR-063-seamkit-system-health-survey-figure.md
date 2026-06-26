# ADR-063: SeamKit system health survey evidence figure

## Status

**Status:** Accepted
**Date:** 2026-06-26
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` — SeamKit flagship case study (`app/work/seamkit/page.tsx`).

Layer 04 (Adoption & system health) showed **behavioral** proof via Figma adoption analytics (`block-adoption-analytics.png`) but **attitudinal** proof — NPS 57, trust sentiment, improvement priorities — appeared only as text in **05 Outcomes** (`57 — NPS (no detractors)`). A cropped Microsoft Forms analysis snapshot (Q9–Q11) was available internally; linking the live Forms URL was rejected (auth walls, token expiry, portfolio self-containment).

**In scope:** One new evidence figure in Layer 04; static asset in `public/assets/work/seamkit/`.
**Out of scope:** Public Forms link, duplicate figure in Outcomes, `lib/projects.ts` blocks gallery, Figma asset-map export.

## Decision Drivers

- Pair behavioral and attitudinal health evidence in the same layer (Intervention already cites “sentiment signals”).
- Prove NPS once in Layer 04; Outcomes tier summarizes without re-displaying the screenshot.
- Caption-only figure (`hideDecisionNotes`) to avoid repeating adoption analytics decision-note pattern.
- Responsive layout must follow existing `.case-study-evidence-row` stack at ≤900px.

## Options Considered

### Option A: Link to Microsoft Forms analysis URL

- **Description:** Inline link to the live survey summary dashboard.
- **Pros:** Always current; no asset maintenance.
- **Cons:** Likely requires org login; `AnalyzerToken` links expire; breaks portfolio self-containment and recruiter access.
- **Effort:** Low
- **Notes:** Rejected.

### Option B: Cropped survey screenshot in Layer 04 (chosen)

- **Description:** Add `block-system-health-survey.png` as `AnnotatedFigure` figure 9 below adoption analytics; caption explains NPS and scale signals.
- **Pros:** Self-contained proof; readable without login; aligns with ADR-061 evidence pattern.
- **Cons:** Static snapshot; manual refresh if survey is re-run.
- **Effort:** Low
- **Notes:** No decision notes under image (caption-only).

### Option C: Duplicate figure in Outcomes System Health tier

- **Description:** Show survey in both Layer 04 and Outcomes.
- **Pros:** High visibility for scanners who skip layers.
- **Cons:** Violates signal-to-noise rule — same proof twice.
- **Effort:** Low
- **Notes:** Rejected.

## Decision

**We will add a caption-only system health survey figure (figure 9) in Layer 04 below adoption analytics, with no public Forms link and no duplicate in Outcomes.**

## Consequences

### Positive

- Layer 04 shows usage analytics + team sentiment in one chapter.
- Outcomes NPS bullet is validated by primary evidence without repeating the image.
- Asset stored as true PNG (1024×671) after source screenshot normalization.

### Negative / Trade-offs

- Survey data is point-in-time; re-capture required after future survey waves.

### Operational Impact

- **Migration / rollback:** Remove figure 9 block and delete `block-system-health-survey.png`.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Tall stacked figures increase Layer 04 scroll on mobile | Low | Low | Existing ≤900px column stack on `.case-study-evidence-row`; images `width: 100%` | John Ohio | SeamKit layout pass |

## Review Schedule

- **Next review:** Next SeamKit evidence or outcomes update
- **Review owner:** John Ohio

## Related ADRs

- ADR-061 — depends on: Layer 04 adoption & health framing
- ADR-062 — related: SeamKit narrative signal-to-noise editorial pass

## References

- `app/work/seamkit/page.tsx` — Layer 04 figure 8–9
- `public/assets/work/seamkit/block-system-health-survey.png`
- `app/globals.css` — `.case-study-evidence-row` responsive stack ≤900px
- ADR-061 — SeamKit executive evidence narrative
