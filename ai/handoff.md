# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-03

---

## Delta

- **Portfolio V2.0 shipped to `main`** — PR #183 merged (`075f177`); deploy fix pushed (file: JEDI deps + clone/build install).
- **Root cause:** GitHub Packages v0.1.0 ships `workspace:*` in `jedi-core`; npm registry install fails. Lockfile npm aliases triggered registry resolution on every install.
- **Fix (v2):** `file:vendor/jedi-*` slim packages; install script clones `jedi-v0.1.0`, builds, copies dist only (avoids webpack scanning full monorepo). No `NPM_TOKEN` required.
- **QA:** `npm run build`, `CI=true npm run test:a11y` — 9/9 pass; SeamKit a11y flake fixed (`domcontentloaded`).

## Horizon

1. Confirm Vercel **Production** deployment succeeds after push (watch `/content-index.json` → 200).
2. Post-deploy smoke on [johnohio.vercel.app](https://johnohio.vercel.app).
3. **Observation window (2–4 weeks)** — defer V2.1 until evidence from hiring/networking use.

## Next

- Verify production shows V2 (`/content-index.json`, `/playground` noindex).
- **JEDI repo:** publish **0.1.1** with pinned deps (`write:packages` PAT) → restore npm aliases + `npm ci` on Vercel (remove clone step).

## Blocked

- None (deploy should proceed without NPM_TOKEN).

## Branch / PR

- **Main:** latest deploy-fix commit on `main`
- **Production:** https://johnohio.vercel.app
- **Tag:** Portfolio V2.0 — Preservation Migration Complete (pending production verify)

## Session coordination

See `ai/session-arbitration.md`.

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-07-03 | Turbopack could not resolve `@jedi/*` | Implementation | npm aliases outside turbopack root | `next build --webpack` |
| 2026-07-03 | Vercel build missing `@jedi/*` | Implementation | lockfile file symlinks + broken GH Packages 0.1.0 | file: deps + clone/build install |
| 2026-07-03 | npm ci EUNSUPPORTEDPROTOCOL workspace:* | Implementation | lockfile nested jedi-core + published package metadata | file: package.json + clean lockfile |

---

## Pointers

- ADR-075: `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
- Vercel + JEDI: `docs/vercel-github-packages.md`
