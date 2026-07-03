# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-03

---

## Delta

- **Portfolio V2 preservation migration** implemented per frozen plan:
  - **V2.0:** `@jedi/*` wired (`JediRoot`, token bridge, chrome via `@jedi/react`); build uses `--webpack`; ESLint blocks `@astryxdesign/*`.
  - **ADR-075** accepted (JEDI adoption, preservation-first).
  - **V2.1:** `ReadingProgress`, related-content metadata/OG hardening, `ThemeToggle` via JEDI `Button`.
  - **V2.2:** `lib/graph.ts`, `RelatedContent`, `content/` scaffold, **ADR-077** accepted.
  - **V2.3:** `lib/search.ts`, `CommandPalette` (⌘K), `/playground`, `public/content-index.json` (postbuild).
- **JEDI v0.1** published from `jon4ohio/jedi` (`2d74253`, `8408160` — exports, theme CSS wrappers, bridge comment fix).
- **QA:** `npm run build` + `CI=true npm run test:a11y` — 9/9 pass.

## Horizon

1. Visual QA vs production V1 (recognition check).
2. Deploy to Vercel when ready (push + promote).
3. Incremental `content/projects/` extraction; curate `lib/graph.ts` manual edges.
4. JEDI **v0.2** package release (interaction primitives) when upstream Astryx cadence allows.

## Next

- Push portfolio branch and deploy preview.
- Refine `--ax-*` token bridge mappings after side-by-side visual compare with johnohio.vercel.app.
- Turbopack resolution for `@jedi/*` (optional; webpack is the V2.0 build path).

## Blocked

None.

## Branch / PR

- **Branch:** local (Portfolio V2 work — commit/deploy pending maintainer)
- **JEDI:** `main` on `jon4ohio/jedi` through `8408160`

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
