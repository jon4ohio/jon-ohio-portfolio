# Public showcase publish workflow (`jon-ohio-portfolio-showcase`)

This document defines how to push **curated, public-safe** artifacts from this private repo to the public repository [**jon-ohio-portfolio-showcase**](https://github.com/jon4ohio/jon-ohio-portfolio-showcase). It does **not** mirror the full application.

**Sources of truth on the public side:** [`README`](https://github.com/jon4ohio/jon-ohio-portfolio-showcase/blob/main/README.md), [`docs/maintenance-workflow.md`](https://github.com/jon4ohio/jon-ohio-portfolio-showcase/blob/main/docs/maintenance-workflow.md), [`docs/redaction-checklist.md`](https://github.com/jon4ohio/jon-ohio-portfolio-showcase/blob/main/docs/redaction-checklist.md).

---

## 1. Snapshot: `main` on the showcase repo (reference)

As of the last check-in for this workflow doc, **`jon-ohio-portfolio-showcase`** on `main` contained **only** these tracked paths (no app source, no `package.json`):

| Path | Purpose |
|------|---------|
| `README.md` | Public landing copy, receipts, suggested ADR reading order |
| `docs/adrs/index.md` | ADR index table |
| `docs/adrs/ADR-001-*.md` … `ADR-005-*.md` | Subset of ADRs (not the full private set) |
| `docs/aiux-process.md` | AI/UX workflow narrative |
| `docs/maintenance-workflow.md` | When/how to update the showcase |
| `docs/redaction-checklist.md` | Pre-publish safety checklist |
| `snippets/*.md` | Sanitized, non-runnable snippets |

The private repo has **more** ADRs under `docs/adrs/` (e.g. through ADR-023) and extra docs (`docs/theme-tokens.md`, `docs/figma-jop-structure.md`). Those are **optional** to add to the showcase; only copy what you intend to disclose after redaction.

---

## 2. Allowlist (what may exist on the publish branch)

The dedicated branch `publish/showcase` must contain **only** public-facing content. **Top-level** tracked entries must be exactly:

- `README.md`
- `docs/` (see nested allowlist below)
- `snippets/` (optional but expected for pattern illustrations)

### 2.1 Nested allowlist — `docs/`

| Allowed | Notes |
|---------|--------|
| `docs/adrs/**` | ADRs; redact references to private-only paths if needed |
| `docs/aiux-process.md` | Process doc (keep in sync with showcase or copy from public when bootstrapping) |
| `docs/maintenance-workflow.md` | Copied from or aligned with public repo |
| `docs/redaction-checklist.md` | Copied from or aligned with public repo |

**Not** auto-included from the private repo (publish only if you explicitly copy and review):

- `docs/theme-tokens.md`
- `docs/figma-jop-structure.md`

### 2.2 Nested allowlist — `snippets/`

- `snippets/**/*.md` (or other agreed extensions) — must stay **non-runnable**, minimal, and free of case-study copy per public `docs/redaction-checklist.md`.

---

## 3. Denylist (must never appear on `publish/showcase`)

Do **not** commit or push any of the following to the showcase remote:

| Path / pattern | Reason |
|----------------|--------|
| `app/` | Application source |
| `components/` | Application source |
| `lib/**` (especially `lib/projects.ts`) | Case-study data and app logic |
| `public/**` | Site assets; case-study images |
| `node_modules/` | Dependencies |
| `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` | Full app identity |
| `next.config.*`, `tsconfig.json`, `eslint.config.*`, `vercel.json` | Tooling / deployment |
| `.env*` | Secrets |
| `scripts/**` (from private repo) | Internal automation |
| `.github/**` | CI from private repo (showcase may have its own minimal CI later) |
| `docs/adrs/ADR-002-*.md` (example) | Only if you choose not to publish data-model ADRs; evaluate case-by-case |

**Content rules:** follow the public repo’s [`docs/redaction-checklist.md`](https://github.com/jon4ohio/jon-ohio-portfolio-showcase/blob/main/docs/redaction-checklist.md): no case-study narrative dumps, no private client identifiers, no secrets, no private asset URLs.

---

## 4. One-time Git setup

From this repository (`jon-ohio-portfolio`), add the public remote (HTTPS or SSH):

```bash
git remote add showcase https://github.com/jon4ohio/jon-ohio-portfolio-showcase.git
# or: git remote add showcase git@github.com:jon4ohio/jon-ohio-portfolio-showcase.git
```

Verify:

```bash
git remote -v
```

---

## 5. Create or refresh the orphan branch `publish/showcase`

Using an **orphan** branch ensures **no shared Git history** with private `main`, so you cannot accidentally publish old commits.

### First time (empty orphan, then populate)

```bash
git fetch showcase main   # optional: inspect current public tip
git checkout --orphan publish/showcase
git rm -rf .   # clears index + working tree of private app files (confirm you meant to)
```

Copy **only** allowlisted files into the working tree (examples):

- Copy `README.md` from `showcase`’s `main` or write a public-specific README.
- Copy `docs/adrs/index.md` and chosen ADRs from `docs/adrs/` (edit/redact as needed).
- Copy `docs/aiux-process.md`, `docs/maintenance-workflow.md`, `docs/redaction-checklist.md` from the public repo if you do not maintain them in private yet.
- Add or update `snippets/` as needed.

Then:

```bash
git add README.md docs snippets
npm run verify:showcase-publish   # see §7 — must pass before commit
git commit -m "chore(showcase): initial curated public tree"
```

### Ongoing updates (recommended: separate worktree)

Checking out `publish/showcase` in your **main** clone removes `package.json`, `scripts/`, etc. from the working tree. Prefer a **second worktree** so `main` stays usable:

```bash
git worktree add ../jon-ohio-portfolio-showcase-publish publish/showcase
# edit files under ../jon-ohio-portfolio-showcase-publish
cd /path/to/jon-ohio-portfolio
npm run verify:showcase-publish
cd ../jon-ohio-portfolio-showcase-publish
git add -A && git commit -m "docs(showcase): …"
```

If you do edit `publish/showcase` in the same clone, run verification from `main` after committing:

```bash
git checkout main
npm run verify:showcase-publish
```

The verifier always inspects the **`publish/showcase` ref** (not your current checkout), so it works from `main` after you commit on `publish/showcase`.

---

## 6. Push to GitHub (`showcase:main`)

Push **only** the publish branch to the public `main`:

```bash
git push showcase publish/showcase:main
```

If the remote rejects the first push:

```bash
git push -u showcase publish/showcase:main
```

**Do not** run `git push --mirror` from the private repo to `showcase` — that would copy all refs/history and violate the curation model.

---

## 7. Verification before every push

Run the automated tree check **from `main` (or any branch where `package.json` exists)** after committing to `publish/showcase`:

```bash
npm run verify:showcase-publish
```

This runs [`scripts/verify-showcase-publish-tree.mjs`](../scripts/verify-showcase-publish-tree.mjs) against the **`publish/showcase` ref** via `git ls-tree` and fails if any tracked path falls outside the allowlist. If `publish/showcase` does not exist yet, the script exits 0 with a skip message (so local `main` and CI are not blocked).

Override the ref (advanced):

```bash
VERIFY_REF=publish/showcase npm run verify:showcase-publish
```

### Manual checks (redaction)

Use the public checklist verbatim: [redaction-checklist](https://github.com/jon4ohio/jon-ohio-portfolio-showcase/blob/main/docs/redaction-checklist.md). Quick pass:

- [ ] No case-study body copy from `lib/projects.ts` in ADRs/snippets
- [ ] No private image paths under `public/assets/work/`
- [ ] No API keys, tokens, or internal-only URLs
- [ ] `docs/adrs/index.md` matches the set of published ADR files
- [ ] README “Suggested reading order” / receipts point to files that exist on the branch

---

## 8. Relationship to ADR-008 (major pushes)

Private work still follows [`docs/adrs/ADR-008-adr-update-gate-for-major-pushes.md`](./adrs/ADR-008-adr-update-gate-for-major-pushes.md). Publishing to the showcase is **orthogonal**: after decisions are accepted in the private repo, **selectively** copy/redact into `publish/showcase` on its own cadence (per public `maintenance-workflow.md`).

---

## References

- Public: [jon-ohio-portfolio-showcase](https://github.com/jon4ohio/jon-ohio-portfolio-showcase)
- Private ADR index: [`docs/adrs/index.md`](./adrs/index.md)
