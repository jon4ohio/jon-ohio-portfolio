# ADR-073: SeamlessHiring editorial refinement — grouped outcomes, judgment callouts, transformation diagram

## Status
**Status:** Proposed
**Date:** 2026-06-28
**Decision Maker(s):** John Ohio
**Supersedes:** ADR-047 (hero metric presentation on flagship route only)

## Context

The SeamlessHiring flagship case study (`app/work/seamless-hiring/page.tsx`) was structurally sound but read as a project walkthrough rather than a principal-level design narrative. Editorial review identified cognitive load from repeated phase layouts, duplicate metrics, inline decision notes, and a hero that buried the business outcome.

**In scope:** Flagship route copy, section order, new shared components (`JudgmentCallout`, `WorkflowTransformationDiagram`), `CaseHero` `impactGroups`, `MetadataBrief` `engagement` variant, `EvidenceModule` `layoutVariant`, phase asset filenames, sticky chapter nav for this page.
**Out of scope:** Generic `/work/[slug]` renderer, other flagship migrations, SeamlessAI case study.

## Decision Drivers

- Business outcome first — recruiters and hiring managers must grasp value in the first screen.
- Operating-model thinking — show workflow transformation, not only UI screenshots.
- Judgment as differentiator — four inline callouts, not a dedicated judgment chapter.
- Restraint — remove hero product image when transformation diagram + phased evidence suffice.

## Options Considered

### Option A: Copy-only pass on existing layout
- **Pros:** Lowest risk.
- **Cons:** Repeated phase rhythm and metric duplication remain.
- **Effort:** Low

### Option B: Editorial refinement with shared components (chosen)
- **Pros:** Varied phase rhythm, grouped Business/User Outcomes, scope-based brief, signature transformation diagram, strategic decisions folded under Outcomes.
- **Cons:** New components to maintain; phase PNGs are semantic aliases until Figma re-export.
- **Effort:** Medium

## Decision

**We will implement Option B:** grouped hero outcomes, engagement brief variant, workflow transformation diagram, four `JudgmentCallout` placements, varied `EvidenceModule` layouts, strategic decisions accordion below outcome cards, Lasting Impact before testimonial, and standalone operating-model reflection quote.

Hero metrics on the flagship route use **Business Outcomes** / **User Outcomes** groupings including qualitative premium pricing; slug-card `project.metrics` in `lib/projects.ts` remains the listing/OG canonical quantitative set.

## Consequences

### Positive
- Clearer narrative spine: challenge → breakdown → evidence → outcomes (+ decisions) → lasting impact.
- Reusable `WorkflowTransformationDiagram` for future flagships (FetsProza, SeamKit).
- Four memorable judgment moments without callout fatigue.

### Negative / Trade-offs
- Flagship hero metrics diverge visually from work-index pills until readers open the case study.
- Phase asset files are aliases of legacy slides until dedicated Figma crops land.

### Operational Impact
- When replacing phase images, update `scripts/figma-asset-map.json` node IDs and `public/assets/work/seamless-hiring/phase-*.png`.
- **Migration / rollback:** Revert `app/work/seamless-hiring/page.tsx` and remove new components if layout regressions appear.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Phase PNG aliases misrepresent phase content | Med | Med | Re-export from Figma frame 29697:38302 per phase slot | John Ohio | Browser QA on `/work/seamless-hiring` |

## Review Schedule

- **Next review:** After browser editorial pass or Figma phase re-export
- **Review owner:** John Ohio

## Related ADRs

- ADR-044 — Phase V AI narrative boundary preserved
- ADR-045 — superseded for flagship hero metric grouping (listing metrics unchanged)
- ADR-047 — superseded for flagship hero presentation
- ADR-056 — strategic decisions content source unchanged (`seamlessHiringStrategicDecisions.ts`)

## References

- `app/work/seamless-hiring/page.tsx`
- `components/case-study/JudgmentCallout.tsx`
- `components/case-study/WorkflowTransformationDiagram.tsx`
- `scripts/figma-asset-map.json`
