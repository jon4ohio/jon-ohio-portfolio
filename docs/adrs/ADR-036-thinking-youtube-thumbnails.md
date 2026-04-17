# ADR-036: Thinking conversations show YouTube thumbnails

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted
**Date:** 2026-04-17
**Decision Maker(s):** John Ohio (portfolio owner)
**Supersedes:** None

## Context

The portfolio’s `/thinking` page includes a “Conversations → Video” section powered by static data in [`lib/thinking.ts`](../../lib/thinking.ts). Previously, YouTube links were rendered as text-only cards, which made the section visually flat and reduced scan-ability.

The site already follows a pattern of stable, consistent layout and inline styles. For external thumbnails, adding Next.js `next/image` remote configuration is optional overhead when a plain `<img>` provides adequate performance for a small number of items.

**In scope:** Rendering thumbnails for items in `conversationItems` on `/thinking`.
**Out of scope:** OpenGraph images, other pages, or introducing a CMS/data source beyond `lib/thinking.ts`.

## Decision Drivers

- **Scan-ability:** Conversation items should be quickly recognizable at a glance.
- **Low operational overhead:** Avoid additional platform/config maintenance (e.g. Next remote image config) for a small feature.
- **Graceful fallback:** If a custom thumbnail is not provided, derive one for YouTube links.
- **Consistency:** Preserve the existing inline-style + token approach and card styling.

## Options Considered

### Option A: Use derived YouTube thumbnails + optional local overrides (plain `<img>`)
- **Description:** Derive a thumbnail URL from the YouTube video id (`i.ytimg.com/vi/<id>/hqdefault.jpg`) and render it with `<img>` in a fixed 16:9 frame. Allow `thumbnailSrc` to override with a local `/public` asset when desired.
- **Pros:**
  - No Next.js remote image configuration required
  - Works immediately for existing YouTube links
  - Supports bespoke thumbnails without changing rendering logic
- **Cons:**
  - `<img>` does not get Next Image optimization (acceptable for low volume)
- **Effort:** Low
- **Notes:** Keeps implementation localized to `/thinking`.

### Option B: Use `next/image` with remotePatterns for `i.ytimg.com`
- **Description:** Configure Next image optimization for remote YouTube thumbnails and render using `next/image`.
- **Pros:**
  - Built-in image optimization and responsive sizing
- **Cons:**
  - Requires config changes and maintenance for remote patterns/domains
  - More moving parts for a small surface
- **Effort:** Medium
- **Notes:** Consider if the site expands to many remote thumbnails.

## Decision

**We will use Option A because it improves scan-ability with minimal overhead while preserving the repo’s inline-style conventions and enabling a clean fallback path for YouTube links.**

## Consequences

### Positive
- Conversation cards show consistent **16:9** thumbnails, improving visual hierarchy.
- Custom thumbnails can be added per item without UI refactors (`thumbnailSrc`).

### Negative / Trade-offs
- Derived thumbnails depend on YouTube’s thumbnail availability and could change if a video is removed or restricted.
- Using `<img>` trades away Next’s image optimization (mitigated by low item count and lazy-loading).

### Operational Impact
- Authors can add/replace thumbnails by placing assets in `public/` and setting `thumbnailSrc` in `lib/thinking.ts`.
- **Migration / rollback:** Remove thumbnail rendering and helper functions from `app/thinking/page.tsx`; data remains compatible.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| YouTube URL formats change (breaking video id extraction) | Low | Med | Keep extractor tolerant (`watch?v=`, `youtu.be/`, `embed/`, `shorts/`); add a `thumbnailSrc` override when needed | Maintainer | Add a new YouTube link format that fails to thumbnail |

## Review Schedule

- **Next review:** 2027-04-17, or when `/thinking` content format changes (whichever comes first)
- **Review owner:** Portfolio maintainer

## Related ADRs

- N/A — no known relationships.

## References

- [`app/thinking/page.tsx`](../../app/thinking/page.tsx) — YouTube thumbnail derivation + card rendering
- [`lib/thinking.ts`](../../lib/thinking.ts) — `ConversationItem.thumbnailSrc` and `conversationItems`

