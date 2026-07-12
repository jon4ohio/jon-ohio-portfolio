# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-12

---

## Delta

- **Anchor AI entry-layer alignment:** `AGENTS.md` is now the canonical AI dispatch layer, `CLAUDE.md` is reduced to a thin adapter, `ai/session-arbitration.md` is a local path map only, and Entry now states canonical locations explicitly. Figma MCP setup relocated to `docs/figma-jop-structure.md` §6; §7 styling backlink retargeted to CONTRIBUTING / ADR-001.
- **Adoption Refresh (Anchor v0.2):** Contracts already satisfied; closed hygiene gaps — Cursor adapter tracked at `.cursor/rules/anchor-session-arbitration.mdc`, declared Operational ADR implementation pinned to v1.0.0, gitignore exception for that rule only. ADR corpus unchanged.
- **Implementation declarations in Entry:** Decision Records → Operational ADR; Session Coordination → Anchor Session Arbitration + adapters; Handoff path. Stops AI reverse-engineering ADR approach from local templates alone.
- **Theme switcher (Astryx-style):** Single sun/moon icon in nav — shows destination theme with hover tooltip; persistent in mobile header beside hamburger (removed from menu footer).
- **Field note published (ADR-082):** *Design Doesn't End in Figma Anymore* live at `/notes/design-doesnt-end-in-figma` — typed content in `lib/fieldNotes.ts`, placeholder figures, homepage Writing + `/thinking` Field notes discovery.
- **PR realignment:** Closed 15 stale/conflicted open PRs; consolidated work on `realign/cleanup` off `main`.
- **Rivva flagship shipped (ADR-080):** `/work/rivva` complete — 9-chapter case study, evidence assets, `workInProgress: false`. Listing/homepage/about copy aligned to [`lib/rivvaContent.ts`](lib/rivvaContent.ts).
- **Work → Case Studies (label-only IA):** Primary nav, footer, search, case study back links, breadcrumb schema, and 404 CTA relabeled to **Case Studies**; `/work` URLs unchanged. `/work` index hero refreshed (label, H1, body).
- **`/leadership` retired (ADR-079):** Route deleted; nav/footer/sitemap/search/graph/a11y references removed. Leadership thesis staged as forthcoming homepage Writing entry ("Scaling design as a system, not a service").
- **Footer aligned with primary nav:** Thinking and Leadership footer links removed → Case Studies · About.
- **Placeholder cleanup:** Homepage Writing shows linked entries only; `/work`, search, sitemap, and graph exclude case studies whose primary preview is still under `_placeholders/`.
- **ADR-079 accepted;** ADR-041 superseded. ADR-078 reserved for JEDI removal.

## Horizon

1. **Observation window (2–4 weeks)** — use portfolio in hiring/networking; defer V2.1 until evidence-driven priorities emerge.

## Next

- **Swap field note images:** Drop assets in `public/images/notes-ai/` (workflow, Nia, Smart Ranking, Anchor repo) — placeholders ship until then.
- **Publish leadership essay:** When live, add URL/platform/date to homepage Writing (`app/page.tsx`) as a linked row.
- **Replace placeholder case-study assets:** SeamlessAI, ClearPrice, ABMS, Workforce Ecosystem, BluAlliance still use `_placeholders/` — add real art or keep hidden from listings.

## Blocked

- None.

## Branch / PR

- **Branch:** `cursor/declare-implementations`
- **Production:** https://johnohio.vercel.app
- **Observation start:** 2026-07-03
- **ADR impact:** none (reason: Anchor instrument/adapter hygiene; no architecture change)

## Session coordination

See `ai/session-arbitration.md`.

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-07-04 | `dev:clean` broke preview (Turbopack) | Implementation | missing `--webpack` on dev:clean | aligned dev:clean + preview scripts |
| 2026-07-08 | Many open PRs with merge conflicts | Session continuity | long-lived branches + parallel IA edits | closed stale PRs; `realign/cleanup` off main |
| 2026-07-10 | Entry declared Cursor adapter but file missing | Session Coordination | `.cursor` fully gitignored; rule never installed | tracked `.cursor/rules/anchor-session-arbitration.mdc` + gitignore exception |
| 2026-07-10 | Adoption Refresh ownership pass | Project Entry | CLAUDE mixes expertise with project guidance | acceptable — session state stays in Handoff; Spec/Skill/Playbook still deferred |
| 2026-07-12 | AI entry layer drifted into duplicate project documentation | Session Coordination | `CLAUDE.md` and related entry files accumulated overlapping facts instead of routing to canonical owners | made `AGENTS.md` canonical dispatch; reduced `CLAUDE.md` to adapter; slimmed session-arbitration instrument; clarified Entry |

---

## Pointers

- Entry: `docs/project/entry.md` (Operational ADR @ v1.0.0; session adapters)
- Cursor adapter: `.cursor/rules/anchor-session-arbitration.mdc`
- ADR-082: `docs/adrs/ADR-082-on-site-field-notes-route.md`
- ADR-080: `docs/adrs/ADR-080-rivva-flagship-case-study-finalized.md`
- ADR-079: `docs/adrs/ADR-079-retire-leadership-route-essay-relocation.md`
- ADR-078: `docs/adrs/ADR-078-remove-jedi-astryx-from-portfolio.md`
- ADR-075: `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
