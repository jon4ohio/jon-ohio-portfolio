# ADR-069: Evidence review experience

## Status

**Status:** Accepted
**Date:** 2026-06-26
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` — flagship case studies (SeamKit, FetsProza, SeamlessHiring).

Case studies present annotated evidence screenshots inline. Reviewers (hiring managers, recruiters, product leaders) sometimes need to inspect fine detail — UI labels, token values, workshop sticky notes — without leaving the narrative or opening assets in a new tab.

Prior behaviour: evidence images were static inline `<img>` elements with no inspect path except opening the raw file URL.

**In scope:** Evidence review for flagship case study figures — `AnnotatedFigure` static PNGs, SeamKit brand block, FigJam loading snapshot.
**Out of scope:** Homepage/work listing cards (`AssetImage`), hero/next-read `imageOnly` figures, live FigJam iframe, prev/next gallery navigation, annotation show/hide toggle.

## Decision Drivers

- Narrative-first — inline figures must remain understandable without opening any overlay.
- Inspectable proof — interested readers can examine evidence without breaking reading flow.
- Editorial consistency — same interaction across flagship projects; clarity over visual novelty.
- Thin client boundary — `AnnotatedFigure` stays a Server Component; evidence primitives are isolated client components.

## Options Considered

### Option A: Open image in new tab only (status quo)

- **Description:** Keep inline images; rely on browser “open image in new tab” or static file links.
- **Pros:** Zero JS; no modal complexity.
- **Cons:** Leaves the case study; no contextual header (title/caption); invisible affordance; poor mobile UX.
- **Effort:** Low
- **Notes:** Rejected — breaks narrative and offers no editorial framing.

### Option B: Evidence review overlay (chosen)

- **Description:** `EvidenceImage` primitive on inspectable figures; `EvidenceReviewOverlay` dialog with title, description, backdrop fade, focus return. `↗ Inspect` affordance on hover/focus. Scoped to case study evidence only.
- **Pros:** Stays on page; reuses figure labels; accessible keyboard path; extensible `children` API for future evidence types.
- **Cons:** Adds client JS on evidence figures; second image layer in overlay (same `src` v1).
- **Effort:** Medium
- **Notes:** `components/case-study/evidence/` namespace leaves room for `EvidenceVideo`, `EvidencePrototype`, `EvidenceDiagram`.

### Option C: Full-screen image gallery with prev/next

- **Description:** Lightbox with navigation between all figures on the page.
- **Pros:** Fast browsing across evidence set.
- **Cons:** Gallery mental model conflicts with narrative spine; higher implementation cost; encourages skipping prose.
- **Effort:** High
- **Notes:** Deferred — overlay API architected for future navigation without building arrows in v1.

## Decision

**Evidence should be inspectable without interrupting the narrative.**

Implement `EvidenceImage` + `EvidenceReviewOverlay` under `components/case-study/evidence/`. Wire into `AnnotatedFigure` static frames (`reviewable` default `!imageOnly`), FigJam loading snapshot (`disabled` when iframe active), and SeamKit brand block.

**Editorial rule:** Images must be understandable at inline size. The review overlay exists to inspect detail, not to reveal information that is otherwise unreadable.

**Success criteria:**

- Reviewers can inspect evidence without leaving the case study.
- The narrative remains understandable without opening any overlay.
- Evidence review feels consistent across all flagship projects.
- The interaction adds clarity rather than visual novelty.

## Consequences

### Positive

- Evidence inspection is a first-class editorial capability, not an ad-hoc lightbox.
- Figure title and caption carry into the overlay header — context preserved when opening multiple images.
- Focus returns to the triggering figure on close — reviewers stay oriented on long case studies.
- Extension points (`priority`, `context`, overlay `children`) support richer evidence types without API redesign.

### Negative / Trade-offs

- Client hydration on every reviewable evidence figure.
- Overlay shows same-resolution `src` as inline image in v1 (no dedicated hi-res asset yet).
- `priority` prop is documented but no-op until a future pass.

### Operational Impact

- QA: `/work/seamkit` figures 02–09, brand block, FigJam snapshot; keyboard Enter/Escape; focus return; warm/light/dark themes.
- Spot-check other flagship routes using `AnnotatedFigure` evidence.
- **Migration / rollback:** Remove `EvidenceImage` imports; restore plain `<img>` in `StaticImageFrame`, `FigJamEmbedFrame`, brand block.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Reviewers treat overlay as required to understand story | Med | Med | Editorial rule in ADR + caption-first `AnnotatedFigure` copy; QA inline readability | John Ohio | Stakeholder feedback on case studies |
| Focus trap or scroll jump on overlay close | Low | Med | `returnFocusRef` on trigger; body scroll lock only while open | John Ohio | a11y spot-check per flagship migration |

## Review Schedule

- **Next review:** After next flagship case study migration or Q4 2026
- **Review owner:** John Ohio

## Related ADRs

- [ADR-064](./ADR-064-annotated-figure-inline-caption.md) — figure label/caption inline; overlay reuses same strings
- [ADR-065](./ADR-065-seamkit-figjam-live-embed.md) — live FigJam out of scope; loading snapshot reviewable
- [ADR-068](./ADR-068-figjam-embed-loading-placeholder.md) — FigJam snapshot layer wired through `EvidenceImage`

## References

- [`components/case-study/evidence/EvidenceImage.tsx`](../../components/case-study/evidence/EvidenceImage.tsx)
- [`components/case-study/evidence/EvidenceReviewOverlay.tsx`](../../components/case-study/evidence/EvidenceReviewOverlay.tsx)
- [`components/case-study/AnnotatedFigure.tsx`](../../components/case-study/AnnotatedFigure.tsx)
- Plan: evidence review experience (Evidence capability model)
