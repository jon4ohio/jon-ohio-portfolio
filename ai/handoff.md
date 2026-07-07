# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-04

---

## Delta

- **Web preview system hardened:** `dev:clean` now uses `--webpack` (parity with `dev`); added `preview:local` / `preview:local:clean`; `.vscode/tasks.json` + `remote.autoForwardPorts`; README/CLAUDE/docs aligned to vendor-first workflow.
- **Preview verification:** local dev + production preview smoke (incl. `/work/rivva` WIP) — all 200; `CI=true npm run test:a11y` — 9/9; production [johnohio.vercel.app](https://johnohio.vercel.app) — all primary routes 200.
- **Production smoke:** all primary routes 200; `/content-index.json` 200.

## Horizon

1. **Observation window (2–4 weeks)** — use portfolio in hiring/networking; defer V2.1 until evidence-driven priorities emerge.

## Next

- None blocking. Monitor production; collect recruiter/interview feedback.

## Blocked

- None.

## Branch / PR

- **Main:** `c1fd437`
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

- ADR-075: `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
