# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-08

---

## Delta

- **PR realignment:** Closed 15 stale/conflicted open PRs; consolidated work on `realign/cleanup` off `main`.
- **Rivva flagship shipped:** `/work/rivva` complete — 9-chapter case study, evidence assets, `workInProgress: false`. Listing/homepage/about copy aligned to [`lib/rivvaContent.ts`](lib/rivvaContent.ts).
- **Work → Case Studies (label-only IA):** Primary nav, footer, search, case study back links, breadcrumb schema, and 404 CTA relabeled to **Case Studies**; `/work` URLs unchanged. `/work` index hero refreshed (label, H1, body).
- **`/leadership` retired (ADR-079):** Route deleted; nav/footer/sitemap/search/graph/a11y references removed. Leadership thesis staged as forthcoming homepage Writing entry ("Scaling design as a system, not a service").
- **Footer aligned with primary nav:** Thinking and Leadership footer links removed → Case Studies · About.
- **Placeholder cleanup:** Homepage Writing shows linked entries only; `/work`, search, sitemap, and graph exclude case studies whose primary preview is still under `_placeholders/`.
- **ADR-079 accepted;** ADR-041 superseded. ADR-078 reserved for JEDI removal.

## Horizon

1. **Observation window (2–4 weeks)** — use portfolio in hiring/networking; defer V2.1 until evidence-driven priorities emerge.

## Next

- **Publish leadership essay:** When live, add URL/platform/date to homepage Writing (`app/page.tsx`) as a linked row.
- **Replace placeholder case-study assets:** SeamlessAI, ClearPrice, ABMS, Workforce Ecosystem, BluAlliance still use `_placeholders/` — add real art or keep hidden from listings.

## Blocked

- None.

## Branch / PR

- **Branch:** `realign/cleanup`
- **Production:** https://johnohio.vercel.app
- **Observation start:** 2026-07-03

## Session coordination

See `ai/session-arbitration.md`.

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-07-04 | `dev:clean` broke preview (Turbopack) | Implementation | missing `--webpack` on dev:clean | aligned dev:clean + preview scripts |
| 2026-07-08 | Many open PRs with merge conflicts | Session continuity | long-lived branches + parallel IA edits | closed stale PRs; `realign/cleanup` off main |

---

## Pointers

- ADR-079: `docs/adrs/ADR-079-retire-leadership-route-essay-relocation.md`
- ADR-078: `docs/adrs/ADR-078-remove-jedi-astryx-from-portfolio.md`
- ADR-075: `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
