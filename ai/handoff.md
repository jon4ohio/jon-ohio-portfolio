# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-16

---

## Delta

- **Work catalog responsive regression fixed (ADR-086):** Compact “Other Work” copy now stays in the content column at ≤640px instead of collapsing into the 28px arrow track; featured thumbnail tracks cap at 45% before their variant max so the body no longer collapses immediately above the mobile breakpoint. Added a Playwright geometry regression check at 390px and 641px.
- **Case-study card thumbs restored (ADR-022 sync):** Listing `hero` / `thumbnails[0]` for Rivva, SeamlessHiring, and FetsProza now match each case-study page hero (`rivva-hero.png`, `preview-hero-media.png`, `preview-hero.gif`); SeamlessHiring + FetsProza use evidence chrome on cards instead of `previewFlat`. Featured/home list rows stack thumb full-width above copy at ≤640px so thumbs stay visible on mobile.
- **Anchor case study (ADR-085 / Setup C):** `/work/anchor` five-moment editorial page shipped from drop-in — page-local ink/teal + scoped Newsreader / Source Sans 3 / IBM Plex Mono; problem-first catalog copy; chain preview SVG; primary CTAs → GitHub. Portfolio tells the story; repo remains proof. Not a seven-contract docs homepage.
- **Hero secondary outline softened:** “Learn more about me” ghost CTA uses `var(--border)` instead of `var(--fg)` so it reads below the filled primary.
- **Nav CTA + hero positioning + availability:** Nav **Get in touch ↗** is a text link (desktop + mobile); hero eyebrow → Enterprise UX; domains → Enterprise SaaS · Financial Infrastructure · Systems Design · AI; availability micro-line removed from hero, shown on About intro + home Contact footer (`availabilityLine` / `aboutCredibilityLine`).
- **Ghost About CTA + Experience timeline:** Home secondary “Learn more about me →” is an outline (ghost) button; `PageCrumbHeader` keeps ← Back and breadcrumbs on one row; About restores **Experience** timeline from `aboutTimeline` (after How I Think).
- **WorkListRow card grid reverted:** Removed ≤1024px 1b image-top / metrics-footer / 2-up tablet treatment; featured case-study rows use the horizontal list layout at all viewports again.
- **Marketing chrome / IA tweak (ADR-084 follow-on):** Evening Claude Design handoff — desktop nav is logo + theme + **Get in touch** (mobile keeps Case Studies · About); `PageCrumbHeader` adds subtle ← Back + `Home / …` breadcrumbs on Work / About / Writing / Contact / Rivva; home hero CTAs (**Case studies →** + **Learn more about me →**), Rivva selected-work row aligned with siblings (no dashed/badge), **View more case studies →**; `design-export/` refreshed from v2 zip (pptx excluded).
- **Marketing-shell redesign (ADR-084):** Implemented Claude Design handoff (`design-export/create-the-design/`) into production App Router — Home / Work / About / Writing (`/thinking`) / new `/contact`; nav CTA routes to contact; footer adds Writing + Contact; shared `WorkListRow` (1a list + metric pills; Rivva dashed highlight); Results band uses grouped 1d treatment; Rivva hero/copy/assets aligned to handoff while keeping ADR-083 rail chapters. Dual theme + fonts preserved (tokens map; no dark-only prototype CSS).
- **Case-study editorial redesign (ADR-083):** All 7 case studies de-densified toward the johnetokhana.com/rivva editorial template — pill chips/boxed decision notes/tension cards flattened, `pairFigures` side-by-side option on `EvidenceModule`, `SectionDivider` promoted to shared component, seamkit rewired off hand-duplicated JSX onto the real kit, loose figures wrapped into sections (seamless-hiring, fetsproza), chapter/anchor numbering aligned on ibedc/fetsproza/seamkit/workforce-ecosystem/blualliance, 96px chapter rhythm everywhere incl. Rivva. Prose kept verbatim. **Sticky title rail:** every numbered section now pins its eyebrow+title left (`RailSection`, `EvidenceModule layout="rail"`) while prose + full-column-width figures scroll right; `body` overflow-x changed `hidden`→`clip` (hidden silently breaks `position: sticky`).
- **Anchor AI entry-layer alignment:** `AGENTS.md` is now the canonical AI dispatch layer, `CLAUDE.md` is reduced to a thin adapter, `ai/session-arbitration.md` is a local path map only, and Entry now states canonical locations explicitly. Figma MCP setup relocated to `docs/figma-jop-structure.md` §6; §7 styling backlink retargeted to CONTRIBUTING / ADR-001.
- **Adoption Refresh (Anchor v0.2):** Contracts already satisfied; closed hygiene gaps — Cursor adapter tracked at `.cursor/rules/anchor-session-arbitration.mdc`, declared Operational ADR implementation pinned to v1.0.0, gitignore exception for that rule only. ADR corpus unchanged.
- **Implementation declarations in Entry:** Decision Records → Operational ADR; Session Coordination → Anchor Session Arbitration + adapters; Handoff path. Stops AI reverse-engineering ADR approach from local templates alone.
- **Theme switcher (Astryx-style):** Single sun/moon icon in nav — shows destination theme with hover tooltip; persistent in mobile header beside hamburger (removed from menu footer).
- **Field note published (ADR-082):** *Design Doesn't End in Figma Anymore* live at `/notes/design-doesnt-end-in-figma` — typed content in `lib/fieldNotes.ts`, placeholder figures, homepage Writing + `/thinking` Field notes discovery.
- **PR realignment:** Closed 15 stale/conflicted open PRs; consolidated work on `realign/cleanup` off `main`.
- **Rivva flagship shipped (ADR-080):** `/work/rivva` complete — 9-chapter case study, evidence assets, `workInProgress: false`. Listing/homepage/about copy aligned to [`lib/rivvaContent.ts`](lib/rivvaContent.ts).
- **Work → Case Studies (label-only IA):** Primary nav, footer, search, case study back links, breadcrumb schema, and 404 CTA relabeled to **Case Studies**; `/work` URLs unchanged. `/work` index hero refreshed (label, H1, body).
- **`/leadership` retired (ADR-079):** Route deleted; nav/footer/sitemap/search/graph/a11y references removed. Leadership thesis staged as forthcoming homepage Writing entry ("Scaling design as a system, not a service").
- **Footer aligned with primary nav:** Thinking and Leadership footer links removed → Case Studies · About · Writing · Contact (ADR-084).
- **Placeholder cleanup:** Homepage Writing shows linked entries only; `/work`, search, sitemap, and graph exclude case studies whose primary preview is still under `_placeholders/`.
- **ADR-079 accepted;** ADR-041 superseded. ADR-078 reserved for JEDI removal.

## Horizon

1. **Observation window (2–4 weeks)** — use portfolio in hiring/networking; defer V2.1 until evidence-driven priorities emerge.

## Next

- **Light-theme pass on marketing shell:** Confirm handoff-mapped tokens hold contrast on `/`, `/work`, `/about`, `/contact` (ADR-084 risk).
- **Swap field note images:** Drop assets in `public/images/notes-ai/` (workflow, Nia, Smart Ranking, Anchor repo) — placeholders ship until then.
- **Publish leadership essay:** When live, add URL/platform/date to homepage Writing (`app/page.tsx`) as a linked row.
- **Replace placeholder case-study assets:** SeamlessAI, ClearPrice, ABMS, Workforce Ecosystem, BluAlliance still use `_placeholders/` — add real art or keep hidden from listings.

## Blocked

- None.

## Branch / PR

- **Branch:** `cursor/critical-correctness-bugs-b342`
- **Production:** https://johnohio.vercel.app
- **Observation start:** 2026-07-03
- **ADR impact:** ADR-086 (responsive work catalog track constraints); refines ADR-084.

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
| 2026-07-14 | Claude Design MCP unavailable in Cursor | Implementation | harness only exposes Vercel import needing claudeusercontent.com URL | used local handoff zip → `design-export/` |

---

## Pointers

- Entry: `docs/project/entry.md` (Operational ADR @ v1.0.0; session adapters)
- Cursor adapter: `.cursor/rules/anchor-session-arbitration.mdc`
- Design handoff reference: `design-export/create-the-design/`
- ADR-085: `docs/adrs/ADR-085-anchor-case-study-setup-c-portfolio-host.md`
- ADR-084: `docs/adrs/ADR-084-portfolio-marketing-shell-claude-design.md`
- ADR-083: `docs/adrs/ADR-083-case-study-editorial-redesign.md`
- ADR-082: `docs/adrs/ADR-082-on-site-field-notes-route.md`
- ADR-080: `docs/adrs/ADR-080-rivva-flagship-case-study-finalized.md`
- ADR-079: `docs/adrs/ADR-079-retire-leadership-route-essay-relocation.md`
- ADR-078: `docs/adrs/ADR-078-remove-jedi-astryx-from-portfolio.md`
- ADR-075: `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
