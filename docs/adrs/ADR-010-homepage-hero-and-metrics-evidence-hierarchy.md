# ADR-010: Homepage Hero and Metrics Evidence Hierarchy

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted
**Date:** 2026-04-10
**Decision Maker(s):** Jon Ohio (Product Design Lead)
**Supersedes:** None

## Context

The homepage hero and metrics strip needed tighter positioning for a senior product design systems narrative. The existing hero copy was close, but required a refined eyebrow, an intentional headline line break, and a cleaner one-sentence subtext. The metrics strip presented strong outcomes but read too much like a design-system demo due to equal visual weight and stronger segmentation than desired.

This decision is needed now to strengthen first-impression credibility for portfolio visitors evaluating leadership-level systems and DesignOps work.

**In scope:** Hero messaging hierarchy, headline line break/scale, and homepage metrics strip copy and visual hierarchy.
**Out of scope:** Case-study page content, project data model changes outside hero metrics, and non-homepage visual redesign.

## Decision Drivers

- First-impression clarity for senior-level systems and DesignOps positioning
- Evidence-first presentation of outcomes over decorative UI treatment
- Alignment with existing inline-style and token-based visual conventions

## Options Considered

### Option A: Keep current structure with copy-only updates
- **Description:** Update eyebrow/subtext/metric wording while preserving existing layout and visual treatment.
- **Pros:** Lowest implementation risk; fast to ship.
- **Cons:** Does not address hierarchy concerns; metrics may still feel like a UI demo.
- **Effort:** Low
- **Notes:** Useful as a stopgap but unlikely to materially change perceived seniority.

### Option B: Full editorial strip with no card segmentation
- **Description:** Remove card-style segmentation and rebuild metrics as a pure editorial row with minimal framing.
- **Pros:** Strong evidence-first signal; reduced UI chrome.
- **Cons:** Higher visual risk; may reduce scanability on smaller breakpoints.
- **Effort:** Medium
- **Notes:** Requires careful responsive tuning and spacing validation.

### Option C: Subtle segmented strip with stronger typographic hierarchy
- **Description:** Keep lightweight segmentation while reducing card prominence; promote value typography and tighten descriptor lines.
- **Pros:** Balances scanability with editorial tone; preserves existing responsive grid behavior with minimal churn.
- **Cons:** Still retains some card semantics; subtlety must be tuned to avoid looking under-designed.
- **Effort:** Low
- **Notes:** Best fit for incremental refinement while retaining existing architecture.

## Decision

**We will use Option C because it best balances evidence-first communication with practical responsiveness and low implementation risk.**

This approach directly improves the top-level narrative (eyebrow, headline break, single-sentence subtext) and upgrades metrics wording/hierarchy while avoiding a disruptive layout rewrite. It satisfies the drivers for first-impression clarity, outcome-led credibility, and alignment with current styling conventions.

## Consequences

### Positive
- Hero message reads more intentional and leadership-focused.
- Metrics communicate outcomes as evidence with clearer wording and hierarchy.

### Negative / Trade-offs
- Segment boundaries still exist, so some card feel remains by design.

### Operational Impact
- Minimal onboarding impact: changes are localized to homepage hero and metrics styles.
- **Migration / rollback:** Revert `components/Hero.tsx`, `app/page.tsx`, and `app/globals.css` to prior wording/styles if metrics subtlety underperforms in review.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Subtle segmentation still reads as cards on some displays | Med | Med | Run desktop/mobile visual review and adjust border contrast/padding one step at a time | Product Design Lead | Feedback from stakeholder review indicates “card/demo” perception persists |

## Review Schedule

- **Next review:** 2026-05-10
- **Review owner:** Product Design Lead

## Related ADRs

- ADR-001 — relationship: constrains (inline-style convention)
- ADR-003 — relationship: constrains (responsive CSS utility classes)
- ADR-004 — relationship: depends on (existing metric presentation patterns)

## References

- `components/Hero.tsx`
- `app/page.tsx`
- `app/globals.css`
- `lib/aboutNarrative.ts`
