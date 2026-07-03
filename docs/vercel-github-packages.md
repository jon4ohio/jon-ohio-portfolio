# Vercel + JEDI dependencies

Portfolio imports `@jedi/*` from a sibling [`../jedi`](../jedi) clone via `file:` paths in [`package.json`](../package.json). GitHub Packages `@jon4ohio/jedi-*` v0.1.0 cannot be consumed with plain `npm install` (published `workspace:*` deps) — use clone + build until **0.1.1+** is published with pinned semver.

## Vercel install

[`scripts/vercel-install.mjs`](../scripts/vercel-install.mjs) on every build:

1. Clone [jon4ohio/jedi](https://github.com/jon4ohio/jedi) at **`jedi-v0.1.0`** into `../jedi` if missing or unbuilt
2. `pnpm install` + build Astryx deps + `pnpm build:jedi`
3. `npm install` in the portfolio root

No `NPM_TOKEN` required while the jedi repo is public and the lockfile uses `file:` links.

## Local dev

```bash
git clone https://github.com/jon4ohio/jedi.git ../jedi
cd ../jedi && git checkout jedi-v0.1.0 && pnpm install && pnpm build:jedi
cd ../jon-ohio-portfolio && npm install && npm run dev
```

Dev server uses webpack (`--webpack` in `package.json`).

## GitHub Packages (future)

When JEDI **0.1.1+** is published with pinned inter-package deps:

1. Restore npm aliases in `package.json` (`@jedi/core`: `npm:@jon4ohio/jedi-core@0.1.1`)
2. Regenerate lockfile with `NPM_TOKEN` (`read:packages`)
3. Set `"installCommand": "npm ci"` in [`vercel.json`](../vercel.json) and remove the clone step

## Policy

> GitHub Packages is an implementation detail of JEDI v0.x. The public package identity remains `@jedi/*`.
