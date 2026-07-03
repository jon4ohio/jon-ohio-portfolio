# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-03

---

## Delta

- **Portfolio V2.0 — Preservation Migration Complete** (code): PR #183 merged to `main` as `075f177`.
- Rebased `feat/portfolio-v2-jedi-migration` onto `origin/main`; ADR index validated (075/077 once, 074 not duplicated).
- Post-rebase validation: `npm ci`, `npm run build`, `CI=true npm run test:a11y` — all pass.
- **Vercel install fix:** `scripts/vercel-install.mjs` now removes stale `file:` `@jedi/*` symlinks and force-installs from GitHub Packages (lockfile still has local paths — tech debt).
- **Preservation QA:** localhost V2 vs johnohio.vercel.app V1 — nav, hero, case study order, leadership/thinking content, editorial rhythm match.

## Horizon

1. **Production deploy:** Add `NPM_TOKEN` (GitHub PAT, `read:packages`) to Vercel **Production** (Preview already set); confirm main deployment succeeds.
2. Post-deploy smoke: `/`, `/work`, `/work/seamkit`, `/leadership`, `/about`, `/thinking`; `/playground` noindex + absent from sitemap; SEO metadata; no console errors.
3. **Observation window (2–4 weeks)** — use portfolio in hiring/networking; defer V2.1 until evidence-driven priorities emerge.

## Next

- Confirm Vercel Production deployment for `075f177` (currently serving pre-V2 build — `/content-index.json` and `/playground` 404).
- Regenerate `package-lock.json` without `../jedi` file refs → revert to `npm ci` and remove `vercel-install.mjs` (follow-up issue).

## Blocked

- Production V2 deploy until `NPM_TOKEN` is on Vercel **Production** environment.

## Branch / PR

- **Main:** `075f177` — Portfolio V2: preservation-first JEDI migration (#183)
- **PR:** https://github.com/jon4ohio/jon-ohio-portfolio/pull/183 (merged)
- **Production:** https://johnohio.vercel.app (V1 cached until deploy completes)
- **JEDI:** [jedi-v0.1.0](https://github.com/jon4ohio/jedi/releases/tag/jedi-v0.1.0)

## Session coordination

See `ai/session-arbitration.md`.

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-07-03 | Turbopack could not resolve `file:` `@jedi/*` siblings | Implementation | Monorepo-adjacent packages outside turbopack root | `next build --webpack` for V2.0 |
| 2026-07-03 | Vercel preview build failed after rebase | Implementation | Lockfile `file:` symlinks for `@jedi/*`; npm install succeeds but modules missing | Force registry install in `vercel-install.mjs` |

---

## Pointers

- ADR-075: `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
- ADR-077: `docs/adrs/ADR-077-knowledge-graph-model.md`
- Vercel + GitHub Packages: `docs/vercel-github-packages.md`
- Plan: `.cursor/plans/portfolio_v2_preservation_bac27d55.plan.md` (do not edit)
