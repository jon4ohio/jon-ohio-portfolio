# ADR-002: Static in-repo data for case studies

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Draft
**Date:** 2026-04-07
**Decision Maker(s):** Unknown (required before Accepted)
**Supersedes:** None

## Context

This is the `jon-ohio-portfolio` website. The site needs a maintainable way to store and render case study/project content for routes like `/work` and `/work/[slug]`.

The repo currently stores all project/case study metadata in `lib/projects.ts` as a typed array with small helper functions. This ADR documents that decision and the boundaries: this site does not use a database, CMS, or API for content.

**In scope:** where case study/project content lives and how it is accessed by the app
**Out of scope:** visual design of case studies, routing structure, deployment platform

## Decision Drivers

- Keep the site simple to maintain (no backend/services required)
- Fast edits for content updates (single-file workflow)
- Predictable build/runtime behavior on Vercel

## Options Considered

### Option A: Static typed array in `lib/projects.ts`
- **Description:** Store case studies/projects in a static typed array in the repo. Expose access only through `Project` + `getProject(slug)` + `getFeaturedProjects()` helpers.
- **Pros:**
  - Very low operational complexity (no external services)
  - Simple edit flow and easy local preview
  - Type safety for content fields
- **Cons:**
  - Content updates require a code change + deploy
  - Not ideal for non-technical editors or high-frequency publishing
- **Effort:** Low
- **Notes:** Matches current repo implementation and tooling constraints.

### Option B: Headless CMS (e.g., Contentful/Sanity) + build-time fetch
- **Description:** Store case studies in a CMS, fetch at build time (or ISR) and render pages from remote content.
- **Pros:**
  - Non-technical editing and publishing workflows
  - Better content modeling and media management
- **Cons:**
  - Adds ongoing operational complexity and vendor dependency
  - More moving parts to debug (auth, webhooks, previews)
- **Effort:** High
- **Notes:** Requires new infrastructure and migration of existing content.

## Decision

**We will use Option A because the site’s current scope favors simplicity and predictable builds over editor tooling.**

All case studies/projects will remain in-repo, and access should go through the existing helper functions to keep the data layer consistent.

## Consequences

### Positive
- No CMS costs or maintenance burden
- Very straightforward local development and deployment

### Negative / Trade-offs
- Editing content requires git/GitHub usage (mitigation: document the workflow and keep the file structure stable)

### Operational Impact
- Contributors edit `lib/projects.ts` for case studies/projects
- **Migration / rollback:** If a CMS becomes necessary, create a new ADR that supersedes this one and migrate content gradually, keeping `lib/projects.ts` as a fallback during rollout.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Content editing becomes too technical and slows updates | Med | Med | Provide clear docs + consider CMS migration if updates become frequent or multiple editors need access | Maintainer | When updates are needed weekly or more, or when multiple non-dev editors are involved |

## Review Schedule

- **Next review:** 2026-07-01
- **Review owner:** Maintainer

## Related ADRs

- ADR-001 — relationship: depends on (data rendering should align with the styling convention used in components/pages)

## References

- `CLAUDE.md` (Architecture → Data layer)
- `lib/projects.ts`

