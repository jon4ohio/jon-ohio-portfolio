# ADR-018: Homepage Selected Systems project thumbnails

## Status

**Status:** Superseded by ADR-036  
**Date:** 2026-04-11  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

The **Selected Systems** block on the homepage ([`app/page.tsx`](../../app/page.tsx)) lists case studies grouped by lifecycle (`systemGroups` slugs resolved via [`lib/projects.ts`](../../lib/projects.ts)). The **`/work`** index already shows each project’s first thumbnail (`.work-list-thumb`, [`app/work/page.tsx`](../../app/work/page.tsx)) using [`AssetImage`](../../components/AssetImage.tsx) and placeholder-aware alt text. Selected Systems showed title, subtitle, metrics, and arrow only, so the two entry points felt visually inconsistent and gave less scan affordance on the homepage.

**In scope:** Thumbnail presentation and responsive layout for homepage Selected Systems rows; reuse of existing project `assets.thumbnails` data  
**Out of scope:** New asset pipeline, CMS, changing ADR-002 data shape, work index layout changes  

## Decision Drivers

- **Parity:** Homepage and `/work` should present the same primary project preview where data exists  
- **ADR-001 / ADR-003:** Keep structural layout in shared CSS utilities in [`app/globals.css`](../../app/globals.css), not Tailwind  
- **Responsive behaviour:** Narrow desktop thumb column (~120–160px); stack thumb above text at small breakpoints (aligned with `.work-list-*` mobile stacking intent)  
- **Accessibility:** One interactive link per project; meaningful `alt` for real assets; placeholder path uses title-based preview string (same rule as `/work`)  

## Options Considered

### Option A: `AssetImage` + first thumbnail + new `globals.css` row classes

- **Description:** When `p.assets?.thumbnails?.[0]` exists, render `AssetImage` with `aspectCover="4 / 3"` and `sizes` tuned for a narrow column. Wrap row content in `.system-project-link__inner` (flex row), `.system-project-thumb`, and `.system-project-link__body`. At ≤640px, stack column and full-width thumb. Mirror `/work` alt logic for placeholder SVG paths.
- **Pros:** Matches work index semantics; consistent border/radius from `aspectCover`; no data layer changes  
- **Cons:** Thumbnail + alt rules exist in two TSX files (`app/work/page.tsx` and `app/page.tsx`) unless later extracted  
- **Effort:** Low  
- **Notes:** Depends on ADR-004’s precedent for shared layout hooks in `globals.css`  

### Option B: Thumbnails on `/work` only

- **Description:** Leave Selected Systems text-only to keep the homepage lighter.
- **Pros:** Slightly less above-the-fold imagery  
- **Cons:** Inconsistent UX between primary listing surfaces; weaker visual scan on the homepage  
- **Effort:** None  
- **Notes:** Rejected.  

### Option C: Inline-only thumbnail layout (no new classes)

- **Description:** Put all flex/stack rules in `style` props on the homepage only.
- **Pros:** Maximises literal ADR-001 inline usage  
- **Cons:** Duplicates breakpoint behaviour already established for `.work-list-*` and `grid-systems-group`; harder to keep mobile stack consistent  
- **Effort:** Low initially, higher drift risk  
- **Notes:** Rejected in favour of ADR-003 utilities.  

## Decision

**We will use Option A:** add optional thumbnails to Selected Systems using the first `assets.thumbnails` entry, **`AssetImage`** with **`aspectCover="4 / 3"`**, the same placeholder **`alt`** behaviour as [`app/work/page.tsx`](../../app/work/page.tsx), and dedicated classes **`.system-project-link__inner`**, **`.system-project-thumb`**, and **`.system-project-link__body`** in [`app/globals.css`](../../app/globals.css), with a **≤640px** column stack and full-width thumb. Projects without thumbnails render text-only with no empty column.

## Consequences

### Positive

- Homepage Selected Systems aligns visually with the work index’s preview treatment  
- Row height stays stable via fixed aspect ratio on thumbnails  
- Hover affordance (`.system-project-link:hover`) still covers the full row including the image  

### Negative / Trade-offs

- **Duplication:** Alt and `AssetImage` props are maintained in two files until a shared helper is introduced  
- Slightly more visual weight in the homepage section  

### Operational Impact

- **Maintenance:** When changing thumbnail rules (e.g. `sizes`, aspect ratio, placeholder detection), update both **`app/work/page.tsx`** and **`app/page.tsx`** unless extracted to a shared function or component  
- **Migration / rollback:** Remove the `AssetImage` block and related CSS classes; no data migration  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Thumbnail **`alt`** / **`sizes`** / **`aspectCover`** rules drift between **`/work`** and Selected Systems | Med | Med | Document dual call sites in this ADR; when changing one, grep for `AssetImage` + `thumbnails[0]` and align both files (or extract `ProjectThumbnailPreview` in a follow-up) | Maintainer | New case study image conventions or design QA on one surface only |

## Review Schedule

- **Next review:** 2026-07-01  
- **Review owner:** Maintainer  

## Related ADRs

- ADR-001 — constrains: page TSX keeps spacing/typography intent inline; shared layout for thumb row lives in `globals.css`  
- ADR-002 — data source unchanged; uses existing `assets.thumbnails`  
- ADR-003 — new utilities live alongside `.grid-systems-group` and `.work-list-*`  
- ADR-004 — precedent: work index thumbnail column and shared CSS for list affordances  
- ADR-020 — follow-up: default **`aspectFit="auto"`** for **`aspectCover`** (same **`4 / 3`** boxes on `/` and `/work`)  
- ADR-021 — follow-up: case study **`/work/[slug]`** lead uses first thumbnail with **`aspectFit="cover"`** on **16:9** for parity with listings  

## References

- [`app/page.tsx`](../../app/page.tsx) — Selected Systems `system-project-link` + `AssetImage`  
- [`app/globals.css`](../../app/globals.css) — `.system-project-link__inner`, `.system-project-thumb`, `.system-project-link__body`, mobile stack  
- [`app/work/page.tsx`](../../app/work/page.tsx) — reference implementation for first thumbnail + alt rule  
- [`components/AssetImage.tsx`](../../components/AssetImage.tsx) — `aspectCover` thumbnail treatment  
