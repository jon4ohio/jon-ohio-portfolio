# ADR-054: About page intro illustration in a two-column narrative band

## Status
**Status:** Accepted
**Date:** 2026-06-01
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

The `/about` page opened with an "About Me" band where the hook and body narrative were capped at `maxWidth: ~620px` inside the 1240px content container. On desktop this left a large empty column to the right of the text. A hand-illustrated portrait of John Ohio (tools, values, current mission, and selected projects) was available and is a strong personality/brand asset that fits this dead space.

The decision is how to place that illustration beside the About Me narrative on desktop while keeping a clean single-column reading order on mobile, without violating the project's layout conventions (inline styles for structure, responsive behavior via CSS utility classes in `app/globals.css` per ADR-001 and ADR-003).

**In scope:** `app/about/page.tsx` (About Me band layout); the intro illustration asset under `public/assets/about/`.
**Out of scope:** Other About sections (Experience, conviction quote, Operating Principles, Community, press strip); the existing `portrait.svg`; copy changes (governed by ADR-035 / ADR-024).

## Decision Drivers

- **Narrative-weighted split:** The text is the primary content; the illustration is supporting. A 60% / 40% (narrative / illustration) split keeps comfortable body line length while giving the illustration real presence.
- **Responsive behavior in CSS, not inline:** Per ADR-003, breakpoint behavior belongs in `globals.css` utility classes. Inline `grid-template-columns` would override media-query collapse at all widths, breaking the mobile stack — so a dedicated utility class is required.
- **Mobile reading order:** On small screens the narrative must come first and the image stack directly beneath it ("stacked under the about details").
- **Convention fidelity:** No new Tailwind structural classes; inline styles for structure + a CSS utility class for responsiveness (ADR-001, ADR-003).
- **Asset weight:** Repo asset should stay lean; the source PNG was 2.8MB.
- **Image handling consistency:** Reuse the shared `AssetImage` component and its adaptive aspect handling (ADR-020) rather than a raw `<img>`/`next/image`.

## Options Considered

### Option A: Dedicated `.about-intro-grid` utility — 60% narrative / 40% illustration (chosen)
- **Description:** Add a small `.about-intro-grid` utility in `globals.css` (`grid-template-columns: minmax(0, 3fr) minmax(0, 2fr)`, 80px gap → 48px tablet, collapsing to `1fr` at ≤640px). Wrap the hook + body + CTAs in the left column and the illustration in the right. Remove the now-redundant `maxWidth` caps on the text wrappers (the grid column constrains width). Image rendered via `AssetImage` with `position: sticky; top: 80` so it stays in view while the longer text scrolls. Mirrors the existing `.grid-2-lg` pattern but with a narrative-weighted ratio.
- **Pros:** 60/40 keeps comfortable text line length while giving the illustration presence; `3fr`/`2fr` (not `60% 40%`) avoids gap overflow; mobile stack (text → image) and tablet gap are class-driven per ADR-003; sticky adds polish on desktop only.
- **Cons:** Adds one new utility class (three short rules across two breakpoints) rather than reusing `.grid-2-lg`.
- **Effort:** Low
- **Notes:** Requires `AssetImage` `width`/`height` to match the real intrinsic dimensions for correct aspect ratio.

### Option B: Reuse `.grid-2-lg` (50/50) with inline column override for 60/40
- **Description:** Keep `.grid-2-lg` and set `gridTemplateColumns` inline to `3fr 2fr` on the wrapper.
- **Pros:** No new CSS class.
- **Cons:** Inline `grid-template-columns` has higher specificity than the class's media-query rule, so the ≤640px collapse to one column would be defeated — the mobile stack breaks. Would need `!important` hacks or a class anyway.
- **Effort:** Low
- **Rejected** — silently breaks mobile stacking; violates ADR-003 (responsiveness in CSS, not inline).

### Option C: Float / absolute-positioned illustration beside text
- **Description:** Keep single-column text and position the image absolutely/floated into the right gutter.
- **Pros:** No grid restructure.
- **Cons:** Brittle; needs bespoke media queries to unstack; manual mobile reading order; breaks the inline-style + utility-class convention.
- **Effort:** Medium
- **Rejected** — reinvents responsive behavior a grid utility provides cleanly.

### Option C: Full-width illustration above or below the narrative
- **Description:** Place the illustration as a full-bleed band stacked with the text at all breakpoints.
- **Pros:** Simplest markup; no two-column logic.
- **Cons:** Does not use the empty right column on desktop (the actual goal); a full-width detailed illustration dominates the page hierarchy and competes with the headline.
- **Effort:** Low
- **Rejected** — fails the desktop "beside the narrative" requirement.

## Decision

**We will use Option A** — a dedicated `.about-intro-grid` utility (60% narrative / 40% illustration) wrapping the About Me narrative (left) and the intro illustration (right), because it satisfies **Narrative-weighted split**, **Responsive behavior in CSS**, **Mobile reading order**, and **Convention fidelity**. The illustration uses the shared `AssetImage` component (honoring **Image handling consistency**, ADR-020) and is `position: sticky` on desktop; the class's ≤640px rule handles the mobile stack. Per **Asset weight**, the source was resized to 1120px max edge and re-encoded as JPEG quality 86 (2.8MB PNG → ~0.6MB JPEG), consistent with the `.jpg` community/press assets already in `public/assets/about/`.

## Consequences

### Positive
- Fills previously dead desktop whitespace with a high-personality brand asset.
- 60/40 split keeps the narrative as the primary column (~660px at max width) while the illustration reads as a deliberate supporting element.
- Responsive collapse is class-driven (ADR-003); the mobile stack (text → image) needs no inline breakpoint logic.
- Sticky image improves desktop scannability while reading the longer narrative.

### Negative / Trade-offs
- Adds one new utility class (`.about-intro-grid`) rather than reusing `.grid-2-lg`. Mitigation: it mirrors the existing pattern and is colocated with it in `globals.css`.
- JPEG re-encoding is lossy on illustration linework. Mitigation: quality 86 retained crisp edges in preview; Next/Image re-encodes to WebP for delivery regardless of source.

### Operational Impact
- Future About edits: the About Me band is a 60/40 two-column grid (`.about-intro-grid`); new narrative blocks go in the left column.
- The illustration asset lives at `public/assets/about/intro-illustration.jpg`; intrinsic dimensions (1028×1120) are encoded in the `aboutIllustration` asset object in `app/about/page.tsx` and must be updated if the image is replaced.
- **Migration / rollback:** Revert the `app/about/page.tsx` diff (re-add the `maxWidth` caps, drop the grid wrapper) and remove the asset. No data migration.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Sticky image overlaps following band on short-viewport desktop | Low | Low | Sticky is constrained to its grid cell (text column is taller); verified in preview at 1280×900 | John Ohio | Next About layout change |
| Replaced illustration with different aspect ratio distorts layout | Low | Med | `AssetImage` is aspect-aware (ADR-020); update `width`/`height` in `aboutIllustration` when swapping the asset | John Ohio | Asset swap |
| Illustration tone reads informal for enterprise audience | Low | Low | Owner-approved brand choice; revisit if positioning shifts | John Ohio | Brand/positioning review |

## AI-Specific Considerations

N/A — no AI model, prompt, or agent dependency in this layout decision. (The illustration itself is a static brand asset.)

## Review Schedule

- **Next review:** 2026-12-01 or when the About page is next restructured.
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-001 — Inline styles for layout and visuals](./ADR-001-inline-styles-for-layout-and-visuals.md) — constrains styling approach.
- [ADR-003 — Responsive layout via CSS utility classes](./ADR-003-responsive-layout-via-css-utility-classes.md) — governs adding `.about-intro-grid` (responsiveness in CSS, not inline).
- [ADR-020 — AssetImage aspect box adaptive object-fit](./ADR-020-assetimage-aspect-box-adaptive-object-fit.md) — image rendering component.
- [ADR-035 — About page label and Operating Principles copy](./ADR-035-about-page-label-and-operating-principles-copy.md) — prior About page change.

## References

- [`app/about/page.tsx`](../../app/about/page.tsx) — `.about-intro-grid` band and `aboutIllustration` asset object.
- [`app/globals.css`](../../app/globals.css) — `.about-intro-grid` definition (60/40) and ≤640px collapse.
- [`components/AssetImage.tsx`](../../components/AssetImage.tsx) — shared image component.
- `public/assets/about/intro-illustration.jpg` — optimized intro illustration.
