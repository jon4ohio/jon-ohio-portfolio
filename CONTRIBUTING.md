## Contributing

## Codebase conventions

- **Styling**: prefer inline `style` props for layout and visual styling. Tailwind utilities are used only for the small animation utilities defined in `app/globals.css`.
- **Data**: project/case-study data lives in `lib/projects.ts`.
- **Next.js App Router**: pages are Server Components by default.

## Development

```bash
npm ci
npm run dev
```

Before opening a PR, run:

```bash
npm run lint
npm run build
```

## ADR gate for major pushes

Per `docs/adrs/ADR-008-adr-update-gate-for-major-pushes.md`, every major push must include an ADR checkpoint.

### What counts as a major push

Any push that changes one or more of:
- architecture or decision-token model
- routing/layout structure
- cross-page interaction behavior
- data model/content source strategy
- operational workflow that affects how the app is built or maintained

### Required before major push

Complete one of these actions:
1. Add a new ADR in `docs/adrs/` and update `docs/adrs/index.md`, or
2. Add a superseding ADR and update supersession metadata/index, or
3. Explicitly state in PR description: `ADR impact: none (reason: <short reason>)`

For any ADR-impacting major push, option 3 is not valid.

### Enforced pre-push hook

Install local hooks once:

```bash
npm run hooks:install
```

The pre-push hook runs:

```bash
npm run check:adr-major-push
```

If a push includes major changes (architecture/theme/layout/interaction/data-model paths) and no ADR file changes in `docs/adrs/`, the push is blocked.

### CI enforcement

GitHub Actions also enforces this gate on pull requests via:

- `.github/workflows/adr-gate.yml`

It runs:

```bash
node scripts/check-adr-major-push.mjs --range <base_sha> <head_sha>
```

This keeps enforcement consistent even if local hooks are not installed.

## Public showcase (`jon-ohio-portfolio-showcase`)

The public repo is a **curated** mirror (ADRs + snippets), not a copy of this codebase. Do not push `main` to it.

- **Workflow:** `docs/showcase-publish.md`
- **Verify tree before push:** `npm run verify:showcase-publish` (validates the `publish/showcase` branch ref)
- **Redaction:** follow the checklist linked from the public repo’s `docs/redaction-checklist.md`

