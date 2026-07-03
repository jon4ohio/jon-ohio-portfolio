# Vercel + JEDI dependencies

Portfolio imports `@jedi/*` from slim vendored packages at `vendor/jedi-*` (built during CI install).

GitHub Packages `@jon4ohio/jedi-*` v0.1.0 cannot be consumed via plain `npm install` (published `workspace:*` in `jedi-core`). Until **0.1.1+** is published with pinned deps, Vercel clones and builds from the public jedi repo.

## Vercel install

[`scripts/vercel-install.mjs`](../scripts/vercel-install.mjs) on every build:

1. Clone [jon4ohio/jedi](https://github.com/jon4ohio/jedi) at **`jedi-v0.1.0`** into `vendor/jedi` (if `vendor/jedi-core/dist` missing)
2. `pnpm install` + build Astryx deps + `pnpm build:jedi`
3. Copy built artifacts to `vendor/jedi-core`, `vendor/jedi-react`, `vendor/jedi-themes`, `vendor/jedi-tokens`; delete full monorepo clone
4. `npm install` in portfolio root

No `NPM_TOKEN` required while the jedi repo is public.

## Local dev

Run the install script once (or keep a sibling `../jedi` clone and use `npm install` after building):

```bash
node scripts/vercel-install.mjs
npm run dev
```

Or manually:

```bash
git clone --depth 1 --branch jedi-v0.1.0 https://github.com/jon4ohio/jedi.git vendor/jedi
cd vendor/jedi && pnpm install && pnpm build:jedi
# then run vercel-install.mjs to copy slim packages
```

Dev server uses webpack (`--webpack` in `package.json`).

## GitHub Packages (future)

When JEDI **0.1.1+** is published with pinned inter-package deps:

1. Restore npm aliases in `package.json`
2. Regenerate lockfile with `NPM_TOKEN` (`read:packages`)
3. Set `"installCommand": "npm ci"` and remove clone/build from `vercel-install.mjs`

## Policy

> GitHub Packages is an implementation detail of JEDI v0.x. The public package identity remains `@jedi/*`.
