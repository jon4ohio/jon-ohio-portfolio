# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-26

---

## Delta

- **Anchor essay → Medium (ADR-096):** Articles removed from Anchor product chrome (Home → Docs → Case study). Homepage “Read the article →” and portfolio Writing point at Medium; `/anchor/articles` routes deleted with permanent redirects. Amends ADR-094.
- **Medium essay on Writing:** *Every Team Thought They Had the Right Button* (Seamkit origin) linked under Design Systems on `/thinking`, homepage Writing band, and `lib/thinking.ts` search/graph catalog (friend URL for member-only read).
- **Anchor homepage mechanism spine (ADR-095):** `/anchor` rewritten to Home→Problem→Approach→No magic→Try it→Principles; identity SVG in Problem; real portfolio `.anchor/config.json` + map targets as No-magic evidence; Try It uses *declares* wording (init does not discover paths). ADR-094 amended; Articles unchanged.
- **Anchor Phase 1 site (PR #217 merged; ADR-094 follow-up):** Phase 1 surface landed on `main` via squash merge; ADR-094 records `/anchor/articles`, homepage spine, and scoped trust/source claims (ADR gate follow-up).
- **Favicon.ico from avatar:** Replaced default Next/Vercel `app/favicon.ico` with multi-size ICO from nav avatar (tab icon was still showing the triangle).
- **Favicon = nav avatar:** Replaced monogram `app/icon.svg` with `app/icon.png` + `app/apple-icon.png` derived from `public/assets/nav/avatar.png` (ADR impact: none).
- **Rivva catalog thumb refresh:** Listing/hero `rivva-hero.png` replaced with composite product shot (desktop calendar + Nia mobile + social proof, 1024×491).
- **Anchor catalog thumb refresh:** Listing/hero preview replaced with navy hero screenshot (`preview-16x9.png`, 1024×533).
- **Anchor hierarchy lightened (ADR-090):** `/anchor` back to four beats (Hero → Problem → Framework → Adoption); Option 1 hero “Continue instead of reconstruct.”; thin Related Work links; Evidence/Explore chapters removed. Supersedes ADR-089 spine.
- **Anchor narrative v1.1 (ADR-089):** Superseded by ADR-090 — longer Evidence/Research/Explore spine retired.
- **Anchor landing polish (#205):** Screenshot thumb for catalog cards; `/anchor` header ← Back + Home / Case Studies / Anchor crumbs.
- **Anchor catalog hygiene (ADR-087 follow-on):** Listing CTA for Anchor is `View Anchor →` (not “case study”); `getCaseStudyNeighbors` skips chrome-free landings so Prev/Next never dumps mid–case-study browse onto `/anchor`.
- **Anchor hero restyle (ADR-088):** `/anchor` navy gradient hero + scroll-spy side nav (renumbered from a colliding draft ADR-087 after #204).
- **Anchor landing replaces case study (ADR-087):** Canonical public URL is `/anchor`. PR **#203** shipped the ADR-086 landing; PR **#204** made it the sole public entry. Home + `/work` rows remain via `getProjectHref` → `/anchor`. Permanent redirect `/work/anchor` → `/anchor`. Case-study package removed; listing thumb SVG retained. ADR-085 superseded.
- **Case-study card thumbs restored (ADR-022 sync):** Listing `hero` / `thumbnails[0]` for Rivva, SeamlessHiring, and FetsProza now match each case-study page hero (`rivva-hero.png`, `preview-hero-media.png`, `preview-hero.gif`); SeamlessHiring + FetsProza use evidence chrome on cards instead of `previewFlat`. Featured/home list rows stack thumb full-width above copy at ≤640px so thumbs stay visible on mobile.
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

- **Branch:** `content/medium-right-button` — Medium Writing entry (*Every Team Thought They Had the Right Button*)
- **Production:** https://johnohio.vercel.app
- **Observation start:** 2026-07-03
- **ADR impact:** none (external Writing link only)

## Session coordination

See `ai/session-arbitration.md`.

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-07-25 | Cloud patch path applied in wrong repo | Session continuity | `/opt/cursor/artifacts/…` is VM-only; instructions run in `operational-adr` | deleted empty remote branch; downloaded artifact via Cursor API; applied on portfolio `#217` |
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
- ADR-090: `docs/adrs/ADR-090-anchor-landing-hierarchy-lightened.md`
- ADR-089: `docs/adrs/ADR-089-anchor-landing-narrative-v1-1.md` (superseded)
- ADR-088: `docs/adrs/ADR-088-anchor-hero-navy-gradient-and-scroll-spy-nav.md`
- ADR-087: `docs/adrs/ADR-087-anchor-landing-replaces-case-study.md`
- ADR-086: `docs/adrs/ADR-086-anchor-landing-page-standalone-route.md`
- ADR-085: `docs/adrs/ADR-085-anchor-case-study-setup-c-portfolio-host.md` (superseded)
- ADR-084: `docs/adrs/ADR-084-portfolio-marketing-shell-claude-design.md`
- ADR-083: `docs/adrs/ADR-083-case-study-editorial-redesign.md`
- ADR-082: `docs/adrs/ADR-082-on-site-field-notes-route.md`
- ADR-080: `docs/adrs/ADR-080-rivva-flagship-case-study-finalized.md`
- ADR-079: `docs/adrs/ADR-079-retire-leadership-route-essay-relocation.md`
- ADR-078: `docs/adrs/ADR-078-remove-jedi-astryx-from-portfolio.md`
- ADR-075: `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
