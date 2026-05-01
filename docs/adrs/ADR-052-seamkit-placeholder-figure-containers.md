# ADR-052: SeamKit case study placeholder figure containers

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Draft
**Date:** 2026-05-01
**Decision Maker(s):** Unknown (required before Accepted)
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` (Next.js portfolio site).

The SeamKit case study (`/work/seamkit`) needs to remove placeholder SVG figures (`/assets/work/_placeholders/hero.svg`) while real evidence screenshots are being prepared. Removing those images should not introduce new “fake” visuals or default placeholders that imply proof where none exists.

At the same time, the page must preserve narrative structure and reading rhythm: captions and decision notes remain valuable even when the supporting artifact image is not yet available.

**In scope:** How missing case-study figures are represented on the SeamKit case study page while awaiting real artifacts.
**Out of scope:** Token architecture, governance model details, or the long-term asset pipeline for screenshots/PDF hosting.

## Decision Drivers

- Maintain high proof density by avoiding placeholder “fake evidence” imagery.
- Preserve layout rhythm and avoid large collapses/visual jumps when images are temporarily absent.
- Align with the case-study evidence system and inline-style conventions in this repo.

## Options Considered

### Option A: Keep placeholder SVG images
- **Description:** Continue rendering the existing placeholder SVG assets for missing figures.
- **Pros:**
  - Keeps layout stable with minimal implementation changes.
- **Cons:**
  - Placeholder imagery reduces credibility and can be misread as “real evidence.”
  - Conflicts with the “empty space is better than placeholder SVG” rule for proof-driven case studies.
- **Effort:** Low
- **Notes:** Disallowed for SeamKit case study content upgrade.

### Option B: Remove images entirely (no replacement)
- **Description:** Remove figure images and allow the layout to collapse to caption/notes only.
- **Pros:**
  - No risk of placeholder visuals.
  - Simplest content truthfulness.
- **Cons:**
  - Layout can feel overly text-dense; weaker reading cadence in long evidence sections.
  - Sudden shifts when images are later reintroduced.
- **Effort:** Low
- **Notes:** Works but reduces scannability.

### Option C: Use non-image placeholder containers (dashed frame)
- **Description:** Replace missing images with a neutral container (no SVG/image) that preserves spacing and indicates an incoming artifact, while keeping caption + decision notes intact.
- **Pros:**
  - Maintains layout rhythm without implying real evidence.
  - Clear “visual incoming” affordance; easy swap-in when artifacts are ready.
  - Avoids default component placeholders that can read as “designed evidence.”
- **Cons:**
  - Adds minor UI chrome that must be consistently removed/replaced later.
- **Effort:** Low
- **Notes:** Implemented as inline-styled containers to match repo conventions.

## Decision

**We will use Option C because it preserves reading rhythm while avoiding placeholder imagery that undermines proof density.**

Missing-figure slots will render a neutral dashed-frame container, and the associated caption + decision notes will remain visible as plain prose/list elements.

## Consequences

### Positive
- Captions and decision notes stay readable in the correct narrative position.
- The page avoids placeholder SVGs that reduce credibility.

### Negative / Trade-offs
- Placeholder containers require later replacement or removal when real artifacts are available.

### Operational Impact
- Contributors can ship copy and evidence structure before final screenshots are ready.
- **Migration / rollback:** When real images are ready, replace the placeholder container with the real `<img>`/`AnnotatedFigure` rendering. Rollback is deleting the container and returning to image-less layout.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Placeholder containers remain in production too long and become accepted as “final” | Med | Med | Track as a follow-up content task; replace containers with real artifacts before final case study publish gate | Maintainer | When SeamKit artifacts (Figma analytics, governance, system health) are ready |

## Review Schedule

- **Next review:** Before publishing final SeamKit evidence screenshots
- **Review owner:** Maintainer

## Related ADRs

- N/A — no known relationships.

## References

- `app/work/seamkit/page.tsx`
- Brief: “SeamKit — Final Content Edit Brief” (chat instruction)

