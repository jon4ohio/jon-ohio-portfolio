# Deployment guide

## Platform

**Vercel** is the intended host (`vercel.json` sets `framework: nextjs`, `buildCommand`, `installCommand`, `outputDirectory`).

## Build

```bash
npm ci
npm run build
```

Artifacts: Next.js outputs to `.next/`.

## Configuration

| File | Role |
|------|------|
| `vercel.json` | Framework detection, `npm ci`, `npm run build` |
| `next.config.ts` | Turbopack root; no custom rewrites in repo |

## Environment variables

Set in Vercel Project Settings (recommended):

- **`NEXT_PUBLIC_SITE_URL`** — production canonical URL (e.g. `https://your-domain.com`) for Open Graph and `sitemap.xml`.

`VERCEL_URL` is provided automatically on Vercel for preview deployments.

## CI/CD

No `.github/workflows` in this repository snapshot — you can add a workflow that runs `npm ci`, `npm run lint`, and `npm run build` on pull requests.

## Rollback

Use Vercel deployment history to promote a previous deployment or redeploy a known-good Git revision.
