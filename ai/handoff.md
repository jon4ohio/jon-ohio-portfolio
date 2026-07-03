# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-03

---

## Delta

- **Portfolio V2.0 — Preservation Migration Complete.** PR #184 merged (`c1fd437`); Production verified on [johnohio.vercel.app](https://johnohio.vercel.app).
- **Deploy fix:** Committed slim `vendor/jedi-*` dist packages; `npm ci` on Vercel (removed `vercel-install.mjs` clone/build workaround).
- **Root cause (historical):** GitHub Packages v0.1.0 ships `workspace:*` in `jedi-core`; external npm install fails.
- **Production smoke:** all primary routes 200; `/content-index.json` 200; `/playground` 200 (noindex, absent from sitemap); preservation content intact.

## Horizon

1. **Observation window (2–4 weeks)** — use portfolio in hiring/networking; defer V2.1 until evidence-driven priorities emerge.
2. **JEDI repo (optional):** publish **0.1.1** with pinned deps → restore npm aliases, remove committed vendor, pure `npm ci`.

## Next

- None blocking. Monitor production; collect recruiter/interview feedback.

## Blocked

- None.

## Branch / PR

- **Main:** `c1fd437` — fix: V2 production deploy — vendor JEDI + npm ci (#184)
- **Production:** https://johnohio.vercel.app (V2 live)
- **Observation start:** 2026-07-03

## Session coordination

See `ai/session-arbitration.md`.

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-07-03 | Turbopack could not resolve `@jedi/*` | Implementation | npm aliases outside turbopack root | `next build --webpack` |
| 2026-07-03 | Vercel build missing `@jedi/*` | Implementation | lockfile symlinks + broken GH Packages 0.1.0 | committed vendor + `npm ci` |
| 2026-07-03 | npm ci EUNSUPPORTEDPROTOCOL workspace:* | Implementation | published package metadata | vendor dist in-repo (#184) |

---

## Pointers

- ADR-075: `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
- Vercel + JEDI: `docs/vercel-github-packages.md`
