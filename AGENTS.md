<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Session coordination (Anchor)

Before substantive work, read `ai/session-arbitration.md` and resolve **responsibility** before gathering context. Do not reconstruct project state from git when Handoff or a named ADR answers the question.

## AI entry point

This file is a dispatch layer, not an authoritative project document. Canonical contracts own durable truth.

Start every session in this order:

1. Read `ai/session-arbitration.md`.
2. Read `docs/project/entry.md`.
3. Read `ai/handoff.md` if you are continuing existing work.

Then route by responsibility, not filename:

| Question type | Owner |
|---------------|-------|
| What is this project? | `docs/project/entry.md` |
| What changed recently, what is next, what branch is active? | `ai/handoff.md` |
| Why was a decision made? | Named ADR in `docs/adrs/` |
| What governs this implementation slice? | The relevant project doc under `docs/` and the repository implementation |
| How do I run common project commands? | `README.md`, `CONTRIBUTING.md`, `package.json` |
| What are the non-obvious environment caveats? | This file |

Do not duplicate durable project knowledge here.

## Cursor Cloud specific instructions

Standard commands live in `README.md` / `CONTRIBUTING.md` / `package.json` — use those. Notes below are only the non-obvious caveats.

- **Dev server:** Run `npm run dev` (http://localhost:3000). If port 3000 is occupied, use `npm run dev:clean`.
- **a11y tests (`tests/a11y`, Playwright):** `npm run test:a11y:ci` builds and runs against a production `next start`; `npm run test:a11y` reuses an already-running server (e.g. `npm run dev`). Results differ between dev and prod builds because some assertions depend on client hydration timing (notably the mobile-menu and theme-toggle tests) — prefer the `:ci` (production) flow for a trustworthy signal.
- **Pre-existing a11y failure:** the suite currently reports a serious `color-contrast` violation on the theme-toggle active segment in light mode (white text on light bg). This is unrelated to environment setup and the a11y suite is **not** wired into CI. Only `.github/workflows/adr-gate.yml` runs in CI. Don't treat this failure as caused by your change unless you touched `components/ThemeToggle.tsx` / theme tokens.
- **ADR gate:** Per `CONTRIBUTING.md`, "major" pushes require an ADR change in `docs/adrs/` (or an explicit `ADR impact: none` note). Humans install the enforcing pre-push hook via `npm run hooks:install`; CI enforces it on PRs via `adr-gate.yml`.
