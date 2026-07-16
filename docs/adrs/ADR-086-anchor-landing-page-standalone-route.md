# ADR-086: Anchor framework landing page at `/anchor` (standalone route)

## Status
**Status:** Accepted  
**Date:** 2026-07-16  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

ADR-085 established `/work/anchor` as the portfolio case study for the Anchor framework
(Design Engineering story, editorial, links to GitHub). A separate need exists: a
dedicated product landing page aimed at framework adoption — developers who find
Anchor via a link and want to understand what it is and try it, without wading through
a portfolio case study framing.

**In scope:** A standalone route at `/anchor` within this portfolio, suppressing the
portfolio nav and footer; Hero + 3–4 marketing sections; primary CTA to GitHub repo.  
**Out of scope:** Changing `/work/anchor`; duplicating the case study narrative;
replacing the GitHub repo as the source of framework documentation.

## Decision Drivers

- Adoption CTA flow: direct link → instant product understanding → GitHub click.
- Anchor's visual identity (ink/teal/Newsreader) is already established by the case
  study; the landing page should feel like the same world, not the portfolio shell.
- Portfolio nav and ThemeToggle would undercut the full-bleed dark editorial feel.
- Any structural change must leave existing routes untouched.

## Decision

Introduce two additions:

1. **`components/SiteShell.tsx`** — a `'use client'` wrapper extracted from the root
   layout that conditionally renders Nav, Footer, and CommandPalette based on
   `usePathname()`. Routes matching `/anchor` or `/anchor/*` receive no shell chrome.
   All other routes are unaffected.

2. **`app/anchor/page.tsx`** — a self-contained landing page loading Newsreader,
   Source Sans 3, and IBM Plex Mono via `next/font/google` (same variables as the
   case study). Sections: Hero (full-viewport, bottom-anchored headline), Problem,
   7 Contracts, Adopt. Primary CTA: `https://github.com/jon4ohio/anchor`.

## Consequences

### Positive
- Dedicated adoption surface with no portfolio chrome diluting the message.
- Reuses the Anchor design language already live at `/work/anchor`.
- SiteShell is reusable for future landing pages (add path to the isLanding check).

### Negative / Trade-offs
- One thin `'use client'` component added to the root render tree.
- Two Anchor-themed surfaces to maintain (`/anchor` marketing copy vs `/work/anchor`
  case study claims); keep them directionally aligned but not duplicated.

### Operational Impact
- New file: `components/SiteShell.tsx`
- Modified file: `app/layout.tsx` (SiteShell wraps children instead of Nav/Footer inline)
- New route: `app/anchor/page.tsx`
- **Migration / rollback:** Remove `app/anchor/`, revert `app/layout.tsx` to inline
  Nav/Footer/CommandPalette, delete `SiteShell.tsx`.

## Related ADRs

- ADR-001 — constrains: inline styles for layout/visuals
- ADR-007 — constrains: dual theme on shell; `/anchor` uses page-local dark tokens
- ADR-085 — related: `/work/anchor` case study; visitor flow = `/anchor` → GitHub → `/work/anchor`
