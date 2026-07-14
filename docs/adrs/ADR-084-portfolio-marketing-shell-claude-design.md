# ADR-084: Portfolio marketing-shell redesign from Claude Design handoff

## Status
**Status:** Accepted  
**Date:** 2026-07-14  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

A Claude Design project (`Create the design`) produced HTML prototypes for the portfolio marketing shell: Home, Work index, About, Writing, Contact, and a Rivva case-study narrative refresh. The handoff was exported as `Create the design-handoff.zip` and ingested under `design-export/create-the-design/` as a visual/copy source of truth.

The live site already had dual-theme tokens (ADR-007), case-study editorial infrastructure (ADR-083), and a flagship Rivva spine (ADR-080/081). The design prototypes used dark-theme hexes and system fonts as mock medium — not a replacement for the production design system.

**In scope:** shared chrome (nav/footer), marketing routes (`/`, `/work`, `/about`, `/thinking`, `/contact`), marketing copy, listing row patterns (1a + 1d treatments), Rivva hero/copy/asset alignment while keeping the rail chapter kit.  
**Out of scope:** `Variations.dc.html` exploration frames; rewriting non-Rivva case-study chapter bodies; replacing dual-theme with dark-only prototype CSS; shipping prototype HTML as production pages.

## Decision Drivers

- Match the approved Claude Design handoff visually on marketing surfaces without abandoning existing App Router composition.
- Preserve light/dark theme toggle and token system (ADR-007).
- Keep ADR-083 case-study rail kit for interiors; avoid re-densifying chapter components with listing-only metric pills.
- Prefer typed content modules (`lib/rivvaContent.ts`, `lib/sitePositioning.ts`) over pasting prototype markup.
- Add `/contact` as a first-class route matching the handoff IA (nav CTA → contact page).

## Options Considered

### Option A: Pixel-perfect dark-only HTML shell
- **Description:** Render prototype styles almost as-is (fixed hexes, system fonts, dark-only).
- **Pros:** Fastest visual match to the mock.
- **Cons:** Breaks dual theme, fonts, and shared tokens; regresses light mode and a11y.
- **Effort:** Medium
- **Notes:** Incompatible with ADR-007.

### Option B: Rebuild marketing shell in existing React kit mapped to tokens
- **Description:** Recreate the six production screens in Next.js using existing tokens, fonts, and components; map handoff hexes onto dark-theme semantics; keep Rivva on rail chapters.
- **Pros:** Durable, theme-safe, matches repo conventions; retains ADR-083 interiors.
- **Cons:** Requires careful copy/layout translation; not guaranteed byte-identical to prototype.
- **Effort:** Medium–High
- **Notes:** Chosen.

### Option C: Deploy prototype via Vercel Claude Design import only
- **Description:** Host the HTML bundle as a separate preview without integrating into the portfolio repo.
- **Pros:** Quick reviewable artifact.
- **Cons:** Does not update johnetokhana/portfolio production surfaces.
- **Effort:** Low
- **Notes:** Useful as side preview only; rejected as implementation path.

## Decision

**We will use Option B** because Decision Drivers require production integration under the existing token system and case-study kit. Prototype files remain reference under `design-export/`; listing metric pills (treatment 1a) and grouped Results (1d) ship on marketing/listing surfaces only.

## Consequences

### Positive
- Marketing IA matches the handoff: Home · Case Studies · About + Get in touch → `/contact`; Writing in footer and `/thinking`.
- Home/Work share a `WorkListRow` pattern aligned to treatment 1a.
- Rivva narrative and assets refreshed without abandoning sticky chapter nav + rails.

### Negative / Trade-offs
- Light theme is an interpreted adaptation of a dark-first mock — not a second designed light canvas.
- Compact "Other Work" rows may link to projects still using placeholder art until assets land.

### Operational Impact
- Sitemap, search index, and a11y route list include `/contact`.
- **Migration / rollback:** Revert marketing pages + chrome + `lib/rivvaContent.ts` / `lib/sitePositioning.ts`; ADR-083 case-study kit stays intact.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Dark-first mock drifts in light mode contrast | Med | Med | Spot-check light theme on `/`, `/work`, `/about`, `/contact` after ship; fix token aliases before changing component structure | Owner | Next light-mode a11y pass or contrast report |

## Review Schedule

- **Next review:** After two weeks of hiring/networking observation, or on next marketing IA change
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-007 — depends on: dual theme tokens remain the mapping target
- ADR-080 / ADR-081 — constrains: Rivva spine retained; copy/assets refreshed under this ADR
- ADR-083 — constrains: case-study interiors keep editorial rail kit; listing pills do not re-enter chapter components

## References

- `design-export/create-the-design/` — Claude Design handoff prototypes
- `/Users/mac/Downloads/Create the design-handoff.zip` — original export bundle
- `docs/adrs/ADR-083-case-study-editorial-redesign.md`
