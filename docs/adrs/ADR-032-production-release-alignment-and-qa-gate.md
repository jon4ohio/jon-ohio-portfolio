# ADR-032: Production release alignment and post-deploy QA gate

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted  
**Date:** 2026-04-13  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

This portfolio ships as a static Next.js site on Vercel. Feature work (taxonomy, grouped `/work`, metadata, hero, and case study data) can land on integration branches while **production** continues to serve an older deployment until that branch is merged into the **Vercel production branch** (typically `main`) and a successful deploy completes. Stakeholders may otherwise misread “live site still shows X” as a content bug when the repository already contains the fix.

ADR-031 locked the **work taxonomy and homepage curation** model; ADR-010 and ADR-024 govern **hero metrics** copy and evidence hierarchy. None of those ADRs replace a **release** step: production truth is “what Vercel last built from the production branch,” not “latest local branch.”

**In scope:** Declaring the release path from integration branch → production-tracked branch → Vercel deploy; defining a minimal **post-deploy QA** checklist for the surfaces most affected by recent ADRs; reaffirming **canonical homepage metric labels** in code.  
**Out of scope:** Vercel project settings, custom domains, preview vs production branch configuration (operational detail outside the repo); changing metric values or case study claims without a new ADR or data edit.  

## Decision Drivers

- **Single source of truth:** Git `main` (or the configured production branch) must be the contract for what visitors see in production.  
- **Faster closure:** Separate “not deployed yet” from “wrong in source” to avoid duplicate fix work.  
- **Evidence alignment:** Homepage metrics and grouped work index must match ADR-010 / ADR-024 / ADR-031 after deploy.  
- **Regressions:** Orchestrated portfolio long-form blocks (`systemEvolution`, `systemImpact`, `keyInsight`) must render after data changes (ADR-026–030).  

## Options Considered

### Option A: Treat production as implicitly synced with every local branch
- **Description:** Assume `johnohio.vercel.app` always reflects the latest feature branch without an explicit merge-to-production step.
- **Pros:** No release discipline overhead.  
- **Cons:** False; production tracks a specific branch/commit. Creates repeated “fix” cycles and QA noise.  
- **Effort:** N/A (inaccurate model).  
- **Notes:** Rejected.

### Option B: Explicit merge to production branch + redeploy + documented post-deploy QA (chosen)
- **Description:** When a batch of ADR-backed changes is ready, **merge the integration branch into the Vercel production-tracked branch** (here: `main`), push, wait for Vercel build success, then run a short browser QA pass on production.
- **Pros:** Aligns visitor-facing site with repo; clear handoff; checklist catches render/schema issues.  
- **Cons:** Requires merge discipline; brief window where preview and production differ.  
- **Effort:** Low per release.  
- **Notes:** Complements ADR-008 (decision log on major pushes).  

## Decision

**We will use Option B.** Shipping user-visible changes that are already merged on a feature branch is **complete only after** those commits are merged into **`main`** (or the branch Vercel uses for production) and production has deployed successfully. **Post-deploy QA** on production shall include: homepage hero + metrics strip, homepage Selected Systems (three groups, two projects each), `/work` grouped sections and ordering, and `/work/orchestrated-portfolio` body sections (including long-form narrative blocks). **Canonical homepage metric labels** for the Seamkit-attributed rows remain **`Token insertions`** (value `2.49m`) and **`Teams onboarded`** (value `12`), with optional UI suffix **`(Seamkit)`** as implemented in [`app/page.tsx`](../../app/page.tsx) per ADR-024.

## Consequences

### Positive
- Clear ownership of “done”: merge + green deploy + spot-check.  
- Reduces duplicate tickets for already-fixed copy when production lags.  
- QA checklist aligns with ADR-031 grouped index and orchestrated-portfolio narrative ADRs.  

### Negative / Trade-offs
- Production may lag feature branches; communicators must name the commit or branch when sharing “what’s live.”  
- **Mitigation:** Prefer merging to `main` in small batches when ADR-backed work is ready to show.  

### Operational Impact
- Maintainer merges integration branch → `main`, verifies Vercel deployment, runs checklist.  
- **Migration / rollback:** Revert or redeploy prior production deployment in Vercel if a bad release ships; source rollback via `git revert` on `main`.  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Production deploy succeeds but stale CDN/browser cache shows old hero or title | Low | Med | Hard-refresh or incognito; confirm `main` SHA matches Vercel deployment; recheck after cache TTL | Maintainer | After each production deploy affecting layout or metadata |
| Long-form case study fields fail to render due to template/data mismatch | Low | High | Post-deploy open `/work/orchestrated-portfolio` and scroll full narrative; run `npm run build` before merge | Maintainer | Any change to `Project` shape or `[slug]/page.tsx` |

## AI-Specific Considerations

N/A — release and QA process only.

## Review Schedule

- **Next review:** 2026-07-13 or after the next major case-study or routing change (whichever comes first).  
- **Review owner:** John Ohio (Owner/Maintainer)  

## Related ADRs

- [ADR-031 — Work taxonomy consolidation and grouped index](./ADR-031-work-taxonomy-consolidation-and-grouped-index.md) — depends on / constrains: grouped `/work` and homepage curation.  
- [ADR-010 — Homepage hero and metrics evidence hierarchy](./ADR-010-homepage-hero-and-metrics-evidence-hierarchy.md) — metrics strip intent.  
- [ADR-024 — Site copy, metadata, and About alignment](./ADR-024-site-copy-metadata-and-about-alignment.md) — title and metric label alignment.  
- [ADR-008 — ADR update gate for major pushes](./ADR-008-adr-update-gate-for-major-pushes.md) — governance on significant pushes.  
- [ADR-026 — Orchestrated portfolio narrative refresh](./ADR-026-orchestrated-portfolio-case-study-narrative-refresh.md) — body content source.  

## References

- [`app/page.tsx`](../../app/page.tsx) — homepage `heroMetrics` and Selected Systems `systemGroups`.  
- [`app/work/page.tsx`](../../app/work/page.tsx) — grouped work index.  
- [`lib/projects.ts`](../../lib/projects.ts) — `Project.category` and orchestrated-portfolio narrative fields.  
- [ADR-031](./ADR-031-work-taxonomy-consolidation-and-grouped-index.md) — taxonomy and editorial split homepage vs `/work`.  
