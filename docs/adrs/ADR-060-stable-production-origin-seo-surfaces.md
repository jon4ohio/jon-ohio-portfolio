# ADR-060: Stable production origin for indexable SEO surfaces

## Status
**Status:** Accepted
**Date:** 2026-06-25
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` (Next.js App Router on Vercel).

`robots.txt` and `sitemap.xml` previously derived the site origin from runtime host values that can differ between preview and production deployments. Preview URLs could leak into sitemap entries or canonical-adjacent metadata, and production lacked a single explicit override for the public domain.

**In scope:** `lib/siteUrl.ts`, `app/robots.ts`, `app/sitemap.ts`, canonical/metadata wiring in `app/layout.tsx`, `.env.example` for `NEXT_PUBLIC_SITE_URL`.
**Out of scope:** Per-page OG image strategy, structured data, analytics.

## Decision Drivers

- Production sitemap and robots must use the **stable public origin** (e.g. custom domain).
- **Preview deployments** must not emit indexable sitemap URLs (`noindex` / disallow).
- Configuration must work locally without Vercel env vars.
- Single helper avoids duplicated origin logic across Metadata API routes.

## Options Considered

### Option A: Inline `VERCEL_URL` in each route file
- **Description:** Keep host detection in `robots.ts` and `sitemap.ts` independently.
- **Pros:** No new module.
- **Cons:** Duplication; easy drift; preview/production bugs recur.
- **Effort:** Low

### Option B: Shared `getSiteUrl()` + `isIndexableDeployment()` (chosen)
- **Description:** Centralize origin resolution with precedence: `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL` (production only) → localhost. Return empty sitemap and `disallow: /` on preview via `VERCEL_ENV === "preview"`.
- **Pros:** One source of truth; explicit production override; preview-safe.
- **Cons:** Requires env discipline in Vercel project settings.
- **Effort:** Low

## Decision

**We will use Option B** because SEO surfaces need deterministic production URLs and preview isolation with minimal ongoing maintenance.

## Consequences

### Positive
- Sitemap and robots URLs match the deployed production domain when `NEXT_PUBLIC_SITE_URL` is set.
- Preview builds do not publish indexable URL lists.
- Layout metadata can share the same origin helper.

### Negative / Trade-offs
- Operators must set `NEXT_PUBLIC_SITE_URL` in production for guaranteed custom-domain URLs if Vercel production host env is absent.

### Operational Impact
- Document `NEXT_PUBLIC_SITE_URL` in `.env.example` and Vercel project env.
- **Migration / rollback:** Revert `lib/siteUrl.ts` and consumers; restore prior inline host logic.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Missing `NEXT_PUBLIC_SITE_URL` on production yields Vercel default hostname in sitemap | Med | Med | Set env in Vercel production; verify `/sitemap.xml` after deploy | John Ohio | Each production promotion |
| Local dev sitemap lists localhost URLs if crawled | Low | Low | Acceptable for dev; production gate uses `isIndexableDeployment` | John Ohio | N/A |

## Review Schedule

- **Next review:** After custom domain change or Vercel project migration
- **Review owner:** John Ohio

## Related ADRs

- ADR-008 — ADR update gate (this change shipped with major push discipline)
- ADR-024 — site copy and metadata alignment

## References

- [`lib/siteUrl.ts`](../../lib/siteUrl.ts)
- [`app/robots.ts`](../../app/robots.ts)
- [`app/sitemap.ts`](../../app/sitemap.ts)
- [`app/layout.tsx`](../../app/layout.tsx)
- [`.env.example`](../../.env.example)
