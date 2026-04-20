# ADR-037: Work index — recruiter-scan flat case study list

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted
**Date:** 2026-04-20
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** ADR-031, ADR-033

## Context

Project: **jon-ohio-portfolio** (Next.js App Router portfolio).

The `/work` page previously used a taxonomy-driven grouped index (ADR-031) with section headings and category framing. The immediate goal of this refactor is **recruiter scanning**: make the page and its primary flagship case study (SeamlessHiring) scannable in under 30 seconds, with **impact surfaced first** and narrative framed as **product → problem → outcome**.

The change is intentionally **not a visual redesign**. It is a content + structure refactor: remove taxonomy and grouped rendering logic on `/work`, standardize each row into a high-signal “card” with a consistent hierarchy, and introduce a bespoke, recruiter-optimized SeamlessHiring case study layout at `/work/seamless-hiring`.

**In scope:** `/work` index structure and copy; reusable `CaseStudyRow` component for consistent row hierarchy; project data slice used for index rows; SeamlessHiring case study structure and visual placement rules.
**Out of scope:** Site-wide redesign; changing data storage model (ADR-002); adding filtering/search UI; rewriting every case study page to the new strict structure.

## Decision Drivers

- **Recruiter scan speed < 10 seconds** on `/work` (find strongest projects + outcomes immediately).
- **Outcome-first framing** (metrics and product change visible without reading long paragraphs).
- **No taxonomy framing** (remove “systems categories” and grouped sections from the index).
- **Consistency and reuse** (standardized row hierarchy via a shared component).
- **Low visual risk** (retain existing layout conventions: inline styles and existing work row CSS hooks).

## Options Considered

### Option A: Keep taxonomy/grouped `/work` index (ADR-031/033)
- **Description:** Maintain grouped rendering and category headings; keep existing row structure.
- **Pros:**
  - Stable navigation affordance for larger archives
  - Keeps category-based positioning language intact
- **Cons:**
  - Category framing slows recruiter scanning and competes with outcome-first messaging
  - Adds cognitive overhead before the reader sees measurable impact
- **Effort:** Low
- **Notes:** Rejected for the current recruiter-optimization goal.

### Option B: Flat, ordered, high-signal list with standardized row hierarchy (chosen)
- **Description:** Render `/work` as a single continuous list, manually ordered to surface flagship work first. Each row follows a consistent hierarchy: title, subtitle, one-line summary, 2–3 metrics, and role line. Remove taxonomy labels and grouped rendering logic.
- **Pros:**
  - Fast scan: key outcomes and responsibility are visible immediately
  - Stronger editorial control: flagship projects reliably appear first
  - Easier reuse across homepage and future “featured subset” surfaces
- **Cons:**
  - Loses category section navigation within `/work`
  - Requires manual ordering maintenance as projects are added
- **Effort:** Medium
- **Notes:** Preserve existing `Project` schema for other pages while adding an index-friendly slice.

## Decision

**We will use Option B because it best satisfies recruiter scan speed and outcome-first framing while keeping implementation risk low.**

`/work` will be a flat, ordered list driven by a standardized row component. SeamlessHiring will use a bespoke page layout to meet the strict “impact first + decisive narrative + disciplined visuals” requirements without forcing a rewrite of the generic `/work/[slug]` template.

## Consequences

### Positive
- `/work` becomes a high-signal case study index with consistent hierarchy per row.
- Recruiters see measurable impact and senior ownership immediately.
- The row component is reusable for homepage and other curation surfaces.

### Negative / Trade-offs
- Category/group navigation is removed from `/work`.
- Manual ordering must be maintained as new projects are added.

### Operational Impact
- **Maintenance:** Keep an explicit ordered slug list for the flagship sequence; new projects append automatically.
- **Migration / rollback:** Revert `/work` to grouped rendering and restore taxonomy headings; remove the bespoke SeamlessHiring override page to fall back to `/work/[slug]`.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Flat list becomes noisy as project count grows | Med | Med | Introduce a “Featured first + archive” split or lightweight filters only if scan speed degrades | Maintainer | Projects ≥ 14 or `/work` scan feels slow |

## Review Schedule

- **Next review:** 2026-07-01 or when projects ≥ 14
- **Review owner:** Maintainer

## Related ADRs

- ADR-002 — constrains: case study data remains static in `lib/projects.ts`
- ADR-031 — superseded by: this ADR removes grouped taxonomy rendering on `/work`
- ADR-033 — superseded by: this ADR replaces the grouped row chrome decision with standardized row hierarchy
- ADR-036 — related: homepage already moved to featured case studies over taxonomy

## References

- `app/work/page.tsx` — flat ordered `/work` list rendering
- `components/CaseStudyRow.tsx` — standardized case study row hierarchy
- `app/work/seamless-hiring/page.tsx` — recruiter-optimized SeamlessHiring structure

