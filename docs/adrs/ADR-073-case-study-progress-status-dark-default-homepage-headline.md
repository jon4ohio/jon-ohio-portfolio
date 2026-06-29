# ADR-073: Case study progress status, dark default theme, and homepage systems headline

## Status

**Status:** Accepted  
**Date:** 2026-06-29  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None (narrows time-of-day theme fallback described in ADR-070 consequences)

## Context

Three portfolio UX decisions shipped together on branch `cursor/wip-badge-95593` (PRs #178–#179):

1. **Case study maturity** — Only seamkit, seamless-hiring, and fetsproza are flagship-complete; eight other projects in `lib/projects.ts` remain draft-quality case studies but stay discoverable on `/work` and the homepage.
2. **Theme default** — ADR-070 made light the calming palette and used time-of-day fallback (light 06:00–18:00, dark otherwise) for visitors without a stored preference. Product direction shifted to **dark as the static default** for first load.
3. **Homepage systems band** — The “Systems I've Shaped” `h2` read long and abstract; a tighter thesis line was needed.

**In scope:** `Project.workInProgress`, `WorkInProgressBadge`, theme default in `components/theme.ts` / `ThemeScript` / `layout.tsx` / `globals.css` `:root` selectors, homepage `h2` in `app/page.tsx`, `docs/theme-tokens.md` default note.  
**Out of scope:** Blocking routes to WIP case studies, changing `featured` flags or homepage `ownershipItems` membership, renaming `workInProgress` field, PrevNextNav labels.

## Decision Drivers

- Visitors must understand which case studies are still being written without hiding incomplete work.
- Status label must be distinct from orange category `tags` (not mixed into SEO keywords).
- First-time visitors should see dark mode unless they chose light or toggle later.
- Homepage systems headline must state the thesis in one scannable line.
- Badge must stay subordinate to listing meta (compact 8px chip, muted border).

## Options Considered

### Option A: Add “Case study in progress” to each project `tags` array

- **Description:** Append a string tag alongside Fintech, HRTech, etc.
- **Pros:** No new field or component.
- **Cons:** Pollutes category chips and metadata keywords; status mixed with domain tags.
- **Effort:** Low  
- **Notes:** Rejected.

### Option B: `workInProgress` boolean + shared status badge (chosen for status)

- **Description:** `workInProgress` on `Project`; `WorkInProgressBadge` on `/work`, homepage ownership rows, `[slug]` heroes, and flagship `CaseHero` via `FlagshipOpener`.
- **Pros:** Semantic data; one component; label “Case study in progress” is explicit; pages remain linkable.
- **Cons:** Extra field on every project entry; badge copy is long at 8px (acceptable at meta scale).
- **Effort:** Low  
- **Notes:** Published trio: `workInProgress: false`. Eight others: `true`.

### Option C: Keep time-of-day theme fallback

- **Description:** Retain `getTimeOfDayDefaultTheme()` from pre–dark-default branch.
- **Pros:** Adapts to visitor clock without explicit choice.
- **Cons:** Daytime first load is light despite dark-first product direction; duplicates logic in `ThemeScript`.
- **Effort:** Low  
- **Notes:** Rejected for theme default.

### Option D: Static dark default (chosen for theme)

- **Description:** `DEFAULT_THEME = "dark"`; remove time-of-day helper; `ThemeScript` fallback `"dark"`; SSR `data-theme="dark"`; bare `:root` shares dark decision tokens (`:root, :root[data-theme="dark"]`).
- **Pros:** Predictable first impression; aligns with slate portfolio chrome; stored `jop-theme` still wins.
- **Cons:** Daytime visitors without a saved preference get dark until they toggle.
- **Effort:** Low  
- **Notes:** `viewport.themeColor` remains OS-preference-based (browser chrome only).

### Option E: Homepage headline options

- **Description:** Keep *I operate at the system level — designing structures that scale across products, teams, and organizations.* vs shorten to *I design systems that scale.*
- **Pros (E-short):** Scannable; matches About/positioning voice; fits 720px band without wrap fatigue.
- **Cons (E-short):** Less explicit about teams/organizations scope.
- **Effort:** Low  
- **Notes:** **E-short chosen.**

## Decision

**We will use Option B for case study status, Option D for theme default, and the short homepage headline (Option E)** because recruiters need honest maturity signals, the site should default to dark for new visitors, and the systems band needs a single clear thesis.

**Case study status:** `workInProgress?: boolean` on `Project`. Label **Case study in progress** in `components/WorkInProgressBadge.tsx` (8px, `inline-flex` centered, `1px 4px` padding). Render when `workInProgress` is true on work index, homepage ownership list, generic case study hero, and flagship openers (ibedc, blualliance, workforce-ecosystem).

**Theme:** Static dark default; `coerceTheme` and `ThemeScript` fall back to `DEFAULT_THEME`; light tokens only on `[data-theme="light"]`.

**Homepage:** `app/page.tsx` systems `h2` → *I design systems that scale.*

## Consequences

### Positive

- Incomplete case studies are honest without 404 or nav removal.
- Dark-first load matches current visual direction; toggle persistence unchanged.
- Homepage systems section reads faster; badge styling stays below category tag prominence.

### Negative / Trade-offs

- Long badge copy at 8px may be hard to read for low-vision users — mitigated by full title on case study page and unchanged link targets.
- Dark default overrides daytime ambient-light expectation for users without `localStorage` preference.

### Operational Impact

- New projects: set `workInProgress` explicitly when adding to `lib/projects.ts`; flip to `false` when a case study is flagship-complete.
- Theme edits: keep `ThemeScript` fallback aligned with `DEFAULT_THEME` in `components/theme.ts`.
- **Migration / rollback:** Revert field + badge usages; restore time-of-day in `theme.ts` / `ThemeScript`; swap `:root` selector grouping back to light.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| WIP flag not cleared when a case study ships | Med | Med | Checklist on flagship publish: set `workInProgress: false` for seamkit / seamless-hiring / fetsproza pattern | John Ohio | Each new flagship case study go-live |
| ThemeScript and `DEFAULT_THEME` drift | Low | High | Comment in `ThemeScript` references `DEFAULT_THEME`; single constant in `theme.ts` | John Ohio | Any theme default change |

## Review Schedule

- **Next review:** 2026-12-29 or when the next case study moves from WIP to published.  
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-002 — Static in-repo data for case studies](./ADR-002-static-in-repo-data-for-case-studies.md) — `Project` shape and `lib/projects.ts`.
- [ADR-007 — Theme naming and contrast hardening](./ADR-007-theme-naming-and-contrast-hardening.md) — two-theme model.
- [ADR-070 — Soft light theme](./ADR-070-soft-light-theme-framer-palette.md) — light palette; time-of-day fallback superseded for default behavior by this ADR.
- [ADR-036 — Homepage featured case studies](./ADR-036-homepage-featured-case-studies-over-taxonomy.md) — ownership / systems band context.
- [ADR-072 — About narrative refresh](./ADR-072-about-narrative-refresh-and-decoupled-headline.md) — complementary “systems that scale” voice.

## References

- [`lib/projects.ts`](../../lib/projects.ts) — `workInProgress` flags
- [`components/WorkInProgressBadge.tsx`](../../components/WorkInProgressBadge.tsx)
- [`components/theme.ts`](../../components/theme.ts), [`components/ThemeScript.tsx`](../../components/ThemeScript.tsx)
- [`docs/theme-tokens.md`](../theme-tokens.md)
- PRs #178, #179 — `cursor/wip-badge-95593`
