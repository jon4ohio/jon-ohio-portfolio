# ADR-083: Case-study editorial redesign (de-densify + composition pass)

## Status

**Status:** Accepted  
**Date:** 2026-07-12  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None (composes with ADR-080/ADR-081 for Rivva)

## Context

The seven published case studies (`seamkit`, `seamless-hiring`, `ibedc`, `fetsproza`, `workforce-ecosystem`, `blualliance`, `rivva`) share a component kit under `components/case-study/`, but the visual language read as dense "enterprise audit decks": bordered pill chips, background-filled decision boxes, and card grids. The target direction — modelled on the johnetokhana.com/rivva case-study template — is leaner and editorial: numbered chapters, generous whitespace, images paired directly with the narrative beat they support, and side-by-side paired screenshots.

Composition had also drifted: `app/work/seamkit/page.tsx` hand-duplicated `TensionCards` and `EvidenceModule` as inline JSX; four pages hand-duplicated the section-divider block; `fetsproza` had figures outside any section; chapter-nav numbering disagreed with in-body eyebrows on `ibedc`; `workforce-ecosystem`/`blualliance` had unanchored Reflection blocks.

**In scope:** shared component restyle, per-page recomposition, chapter/anchor consistency across all 7 case studies.  
**Out of scope:** copy changes (all prose kept verbatim), new visual assets, scroll-mechanics (pinning/parallax), the 4-project fallback `app/work/[slug]/page.tsx` template, `MetadataBrief` bento, `.stats-grid`/`.metric-badge` globals (shared with `/work` index).

## Decision

1. **Editorial de-densify of the shared kit.**
   - `EvidenceModule`: phase pill chip → plain uppercase micro-label with hairline rule.
   - `TensionCards`: bordered/filled cards → open numbered blocks with a hairline top rule.
   - `AnnotatedFigure`: boxed "Decision" note lists → flat text under the micro label.
   - `PhaseTimeline`: 2px active border → 1px; mobile cards → hairline-separated list.
   - Chapter rhythm standardized at `96px` top padding and `96px` gaps between evidence modules.
2. **Side-by-side paired figures.** New opt-in `pairFigures` prop on `EvidenceModule` renders `figure` + `secondaryFigure` as a 2-up equal-width row, collapsing to stacked under 900px (`.case-study-figure-pair` in `app/globals.css`). `EvidenceModule`'s evidence-only figure treatment is now scoped to `decisionLayout="scan"`; passing `reasoning` alone renders a third annotated text block without stripping figure captions/notes.
3. **Composition through the shared kit only.** `seamkit` rewired onto real `TensionCards`/`EvidenceModule`; `SectionDivider` promoted to `components/case-study/SectionDivider.tsx` and all inline duplicates replaced; loose figures wrapped in labelled sections (`seamless-hiring` before-state stack, `fetsproza` orchestration-shift and operational walkthrough).
4. **Chapter/anchor consistency.** Every sticky-nav chapter resolves to a real section id with matching numbering: `fetsproza` gains `05 Walkthrough` (Impact/Reflection renumbered 06/07); `ibedc` body eyebrows realigned to nav (04 Outcomes / 05 Foundations); `seamkit`'s reflection prose moved from `#unlocks` to `#reflection`; `workforce-ecosystem`/`blualliance` Reflection blocks anchored as `05 Reflection` with Unlocks renumbered 06.
5. **Sticky title rail (reference's core scroll structure).** Every numbered section across all 7 case studies uses a pinned left rail: `components/case-study/RailSection.tsx` holds the eyebrow + title at `position: sticky; top: 124px` (clearing header 56 + chapter nav 44) while the body — prose at ~640px measure, then figures at full right-column width (~900px) — scrolls past; the title releases when its section ends. `EvidenceModule` gained `layout="rail"` (replacing all `text-left`/`text-right` and `decisionLayout="scan"` usages); `EvidenceClaimBlock` gained `bare` for rail-body nesting; the rail stacks statically under 900px (`.case-study-rail` in `globals.css`). Enabling this required changing `body { overflow-x: hidden }` to `overflow-x: clip` — `hidden` makes body a scroll container, which silently disables viewport-relative `position: sticky`.

## Consequences

- All seven case studies share one visual grammar; future case studies compose from the kit rather than duplicating JSX.
- `app/notes/[slug]` also renders `AnnotatedFigure`; the flattened note style applies there by design (verified against the field-note figure usage).
- Removed background fills shift contrast responsibility to text-on-canvas tokens; a11y suite must gate new `color-contrast` violations (pre-existing theme-toggle failure excluded).
- Rivva keeps its bespoke seven-section spine (ADR-081) — only rhythm aligned; its `EvidenceClaimBlock`/`RoleMissionBrief` were already editorial.
