# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-08

---

## Delta

- **Work → Case Studies (label-only IA):** Primary nav, footer, search, case study back links, breadcrumb schema, and 404 CTA relabeled to **Case Studies**; `/work` URLs unchanged. `/work` index hero refreshed (label, H1, body).
- **`/leadership` retired (ADR-079):** Route deleted; nav/footer/sitemap/search/graph/a11y references removed. Leadership thesis staged as forthcoming homepage Writing entry ("Scaling design as a system, not a service").
- **Footer aligned with primary nav:** Thinking and Leadership footer links removed → Case Studies · About.
- **ADR-079 accepted;** ADR-041 superseded.

## Horizon

1. **Observation window (2–4 weeks)** — use portfolio in hiring/networking; defer V2.1 until evidence-driven priorities emerge.

## Next

- **Publish leadership essay:** Fill platform, URL, and date in homepage Writing row (`app/page.tsx`); convert forthcoming plain title to linked `<a>` when live. Not a blocker for deploy.

## Blocked

- None.

## Branch / PR

- **Branch:** `cursor/retire-leadership-route`
- **Production:** https://johnohio.vercel.app
- **Observation start:** 2026-07-03

## Session coordination

See `ai/session-arbitration.md`.

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-07-04 | `dev:clean` broke preview (Turbopack) | Implementation | missing `--webpack` on dev:clean | aligned dev:clean + preview scripts |

---

## Pointers

- ADR-079: `docs/adrs/ADR-079-retire-leadership-route-essay-relocation.md`
- ADR-075: `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
