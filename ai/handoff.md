# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-03

---

## Delta

- **PR #183** opened: `feat/portfolio-v2-jedi-migration` — Portfolio V2 preservation-first JEDI migration.
- **JEDI v0.1.0** published to GitHub Packages (`@jon4ohio/jedi-*`); release tagged [jedi-v0.1.0](https://github.com/jon4ohio/jedi/releases/tag/jedi-v0.1.0).
- Portfolio consumes via **npm aliases** (`@jedi/*` → `npm:@jon4ohio/jedi-*@0.1.0`); imports unchanged.
- **QA:** `npm run build`, `CI=true npm run test:a11y` — 9/9 pass; local browser preview verified (webpack dev).
- **Vercel blocker:** project needs `NPM_TOKEN` (GitHub PAT, `read:packages`) for PR preview build.

## Horizon

1. Set Vercel `NPM_TOKEN` and confirm PR #183 preview URL.
2. Merge PR → production deploy → **observation window (2–4 weeks)** before V2.1 planning.
3. Side-by-side visual QA vs johnohio.vercel.app.

## Next

- Configure Vercel env `NPM_TOKEN` for `jon-ohio-portfolio`.
- Reviewer smoke test on preview: nav, routes, theme, ⌘K, playground invisibility.

## Blocked

- Vercel PR preview until `NPM_TOKEN` is set on the project.

## Branch / PR

- **Branch:** `feat/portfolio-v2-jedi-migration`
- **PR:** https://github.com/jon4ohio/jon-ohio-portfolio/pull/183
- **JEDI:** `main` on `jon4ohio/jedi` through `f63912d`; [jedi-v0.1.0](https://github.com/jon4ohio/jedi/releases/tag/jedi-v0.1.0)

## Session coordination

See `ai/session-arbitration.md`.

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-07-03 | Turbopack could not resolve `file:` `@jedi/*` siblings | Implementation | Monorepo-adjacent packages outside turbopack root | `next build --webpack` for V2.0 |

---

## Pointers

- ADR-075: `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
- ADR-077: `docs/adrs/ADR-077-knowledge-graph-model.md`
- Plan: `.cursor/plans/portfolio_v2_preservation_bac27d55.plan.md` (do not edit)
