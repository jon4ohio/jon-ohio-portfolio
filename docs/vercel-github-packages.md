# Vercel + JEDI dependencies

Portfolio imports `@jedi/*` from slim vendored packages at `vendor/jedi-*` (`file:` deps in `package.json`).

GitHub Packages `@jon4ohio/jedi-*` v0.1.0 cannot be consumed via plain `npm install` (published `workspace:*` in `jedi-core`). Until **0.1.1+** is published with pinned deps, the portfolio commits built dist artifacts under `vendor/`.

## Vercel install

[`vercel.json`](../vercel.json) uses standard **`npm ci`**. No custom install script. No `NPM_TOKEN` required.

To refresh vendor packages after a JEDI release:

```bash
git clone --depth 1 --branch jedi-v0.1.0 https://github.com/jon4ohio/jedi.git vendor/jedi
cd vendor/jedi && corepack enable && pnpm install
pnpm -F @astryxdesign/core build && pnpm -F @astryxdesign/theme-gothic build && pnpm -F @astryxdesign/theme-neutral build
pnpm build:jedi
# copy dist + package.json + styles to vendor/jedi-* (see git history for copy script)
rm -rf vendor/jedi vendor/jedi-*/node_modules
npm install && npm run build
```

## Local dev

```bash
npm ci
npm run dev   # webpack (--webpack in package.json)
```

## GitHub Packages (future)

When JEDI **0.1.1+** is published with pinned inter-package deps:

1. Restore npm aliases in `package.json`
2. Regenerate lockfile with `NPM_TOKEN` (`read:packages`)
3. Remove committed `vendor/jedi-*` and use `"installCommand": "npm ci"` only

## Policy

> GitHub Packages is an implementation detail of JEDI v0.x. The public package identity remains `@jedi/*`.
