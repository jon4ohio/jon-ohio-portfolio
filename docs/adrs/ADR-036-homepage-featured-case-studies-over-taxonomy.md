# ADR-036: Homepage featured case studies over taxonomy

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted
**Date:** 2026-04-20
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** ADR-018

## Context

Project: **jon-ohio-portfolio** (Next.js App Router portfolio site).

The homepage previously framed “Selected Works” through a **systems taxonomy** (Structured / Scalable / Intelligent) and a “How systems evolve” narrative (“Fragmented → Intelligent”). While accurate to the author’s systems-thinking positioning, the framing increased cognitive load for first-time visitors who are primarily trying to assess a **product designer** via clear case-study proof.

We need the homepage to prioritise **scan-friendly case studies** (3–4), with the full catalogue living on `/work`, and keep the “systems thinking” positioning as supporting language rather than a taxonomy visitors must parse upfront.

**In scope:** Homepage (`/`) structure, copy, and work presentation for featured items; removal of homepage taxonomy framing; CTA and hero alignment.
**Out of scope:** `/work` taxonomy/grouping (ADR-031), case study detail page structure (`/work/[slug]`), changes to the `Project` data model (ADR-002).

## Decision Drivers

- **Low cognitive load:** Visitors should immediately see a small set of high-signal case studies without learning a taxonomy first.
- **Case study prominence:** Make featured projects visually “primary” (thumbnail + body + metrics + tags) and consistent with `/work`.
- **Single source of truth:** Homepage featured case studies must be rendered from `lib/projects.ts` (ADR-002), not duplicated data.
- **Consistency with existing UI:** Reuse `/work` row structure and styling to reduce drift (ADR-004, ADR-033).
- **Positioning without preamble:** Keep “systems thinking” as a supporting lens, but let case studies prove it.

## Options Considered

### Option A: Featured case studies on homepage using `/work` row structure (chosen)
- **Description:** Replace homepage taxonomy groups with **four featured case study rows** reusing `.work-list-*` UI (thumb, company/period, title, subtitle, short summary, bold metrics, tags, arrow). Keep a “How I design for scale” section to communicate systems thinking without category headers.
- **Pros:**
  - Highest scan clarity and immediate portfolio proof
  - Reuses proven `/work` UI and CSS (less maintenance drift)
  - Uses `lib/projects.ts` as the single source of truth
- **Cons:**
  - Loses the explicit “systems category” framing on the homepage
  - Requires careful metric/copy selection to avoid mismatches with case study data
- **Effort:** Medium
- **Notes:** Keep `/work` as the place where taxonomy can exist (ADR-031), while `/` becomes a curated preview.

### Option B: Keep taxonomy but “rename categories” to friendlier labels
- **Description:** Retain grouped sections but rename Structured/Scalable/Intelligent into more visitor-friendly group names.
- **Pros:**
  - Keeps explicit taxonomy as a differentiator
  - Minimal layout change
- **Cons:**
  - Still front-loads classification; visitors must interpret grouping before seeing proof
  - Risks continuing confusion even with renamed labels
- **Effort:** Low
- **Notes:** Rejected for not addressing the core “case studies must be primary” requirement.

## Decision

**We will use Option A because it reduces cognitive load and makes case-study proof the primary homepage content while preserving systems-thinking positioning via copy (not taxonomy).**

The homepage now features **four** case studies using the same visual structure as `/work`, with a clear “View all” path to the full list. Systems-thinking language remains in the hero and “How I design for scale” section, without forcing visitors through category headers.

## Consequences

### Positive
- Homepage communicates value through **immediate case-study evidence**.
- Featured work presentation matches `/work` for consistency and maintenance.
- Reduced confusion from category labels and the “systems evolution” narrative on first visit.

### Negative / Trade-offs
- The homepage no longer teaches the Structured/Scalable/Intelligent taxonomy explicitly.
  - **Mitigation:** Keep systems-thinking language in hero + scale section; preserve taxonomy on `/work` if needed.

### Operational Impact
- Homepage featured set is curated by slugs and rendered from `lib/projects.ts`.
- **Migration / rollback:** Revert homepage section to taxonomy groups and restore SystemModel + leadership CTA if the new structure underperforms.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Homepage “Key outcomes” metrics drift from canonical case-study metrics | Med | Med | Keep hero strip limited and periodically align with `lib/projects.ts` updates; treat homepage as curated highlights rather than exhaustive truth | Maintainer | Any edit to `projects[].metrics` for featured slugs |
| Reduced differentiation if systems framing becomes too subtle | Low | Med | Ensure case studies include system-level sections where relevant (`systemEvolution`, `systemImpact`, `keyInsight`) and keep “How I design for scale” copy crisp | Maintainer | Recruiter/user feedback: “What do you mean by systems thinking?” |
| Featured selection becomes stale | Med | Low | Review featured slugs quarterly or after major new case study | Maintainer | New flagship case study shipped |

## Review Schedule

- **Next review:** 2026-07-20
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-002 — depends on: single in-repo source of truth for case studies (`lib/projects.ts`).
- ADR-004 — depends on: shared work-row / metric-badge styling.
- ADR-033 — depends on: `/work` row chrome reused by homepage rows.
- ADR-031 — constrains: `/work` taxonomy and grouped index remain available for the full catalogue.
- ADR-018 — superseded: homepage “Selected Systems” thumbnail approach no longer applies after taxonomy removal.

## References

- `app/page.tsx` — homepage featured case studies and updated copy.
- `app/work/page.tsx` — reference structure for `.work-list-*` rows.
- `lib/projects.ts` — canonical case-study source of truth and featured selection support.
