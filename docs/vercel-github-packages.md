# Vercel + GitHub Packages (JEDI)

Portfolio installs `@jedi/*` via npm aliases to `@jon4ohio/jedi-*` on GitHub Packages.

## Required: `NPM_TOKEN` on Vercel

1. Create a GitHub **fine-grained PAT** or classic PAT with **`read:packages`** scope.
2. In [Vercel → project → Settings → Environment Variables](https://vercel.com/jon4ohios-projects/project-pxf41/settings/environment-variables), add:

   | Name | Value | Environments |
   |------|-------|--------------|
   | `NPM_TOKEN` | Your GitHub PAT | Production, Preview, Development |

3. Redeploy PR #183 (empty commit or “Redeploy” in Vercel dashboard).

`scripts/vercel-install.mjs` runs on install: sets `npm.pkg.github.com` auth and runs `npm install` from `package.json` aliases.

## Policy

> GitHub Packages is an implementation detail of JEDI v0.x. The public package identity remains `@jedi/*`. Distribution mechanisms may change without requiring application import changes.

## Local dev

```bash
export NPM_TOKEN=$(gh auth token)   # requires gh auth refresh -s read:packages
npm install
npm run dev   # uses webpack (--webpack in package.json)
```

Without `read:packages` on your gh token, keep a sibling `../jedi` clone for local `npm install` (lockfile may resolve to file paths).
