# ADR-080: Rivva flagship case study finalized — role, narrative, and cross-platform scope updated

## Status

**Status:** Accepted
**Date:** 2026-07-08
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

Rivva shipped as `workInProgress: true` under the ADR-073 status system while the case study narrative still described an earlier framing of the engagement. This change finalizes the case study: sets `workInProgress: false`, rewrites role/scope/context/problem/action/impact/tags in [`lib/projects.ts`](../../lib/projects.ts) to describe the actual contract engagement (Lead Product Designer, Founding Product Team, Contract) and cross-platform scope (web, iOS, Android, the Nia explanation layer), and aligns the homepage ownership blurb ([`app/page.tsx`](../../app/page.tsx)) and About timeline role title ([`lib/aboutNarrative.ts`](../../lib/aboutNarrative.ts)) to match.

Because this touches `lib/projects.ts`, `app/page.tsx`, and a `page.tsx` route (`app/work/rivva/page.tsx`) — all major paths under [ADR-008](ADR-008-adr-update-gate-for-major-pushes.md) — it requires an ADR record. The underlying content work shipped as commits on `cursor/retire-leadership-f653a` before this record was written; this ADR documents that decision as part of merging that branch into `main` (see `ai/handoff.md`).

**In scope:** Rivva narrative rewrite, `workInProgress` flip, homepage ownership blurb sync, About timeline role sync.
**Out of scope:** Any other case study's content; the unrelated `/leadership` retirement and PR-realignment work merged in the same integration.

## Decision Drivers

- Case study copy should describe the actual engagement (contract, founding product team role) rather than a generic founding-team-designer framing.
- `workInProgress` should reflect ship status accurately per the ADR-073 system.
- Homepage ownership blurb and About timeline must stay consistent with the case study's role framing — one person, one story, told the same way everywhere it appears.

## Options Considered

### Option A: Leave Rivva flagged work-in-progress with prior copy

- **Description:** No change.
- **Pros:** No edit required.
- **Cons:** Copy misrepresented the engagement type and scope; WIP badge misrepresented actual ship status.
- **Effort:** None.
- **Notes:** Rejected.

### Option B: Finalize copy and flip `workInProgress` (chosen)

- **Description:** Rewrite role/scope/context/problem/action/impact/tags in `lib/projects.ts`; sync `app/page.tsx` ownership blurb and `lib/aboutNarrative.ts` timeline role; set `workInProgress: false`.
- **Pros:** Accurate, consistent role framing across case study, homepage, and About; WIP badge reflects actual ship status.
- **Cons:** None material.
- **Effort:** Low.
- **Notes:** Chosen.

## Decision

**We will use Option B.** Rivva's case study now reads "Lead Product Designer · Founding Product Team (Contract)" with cross-platform scope framing (web, iOS, Android, Nia explanation layer), `workInProgress: false`. Homepage ownership blurb and About timeline role title updated to match.

## Consequences

### Positive

- Case study, homepage, and About timeline are consistent on Rivva's actual role and scope.
- WIP badge accurately reflects shipped status per the ADR-073 system.

### Negative / Trade-offs

- None material — this is a copy and flag change, not a structural one.

### Operational Impact

- `public/content-index.json` regenerated via `postbuild` (`scripts/generate-content-index.ts`) after this change.
- **Migration / rollback:** Revert the Rivva-specific hunks in `lib/projects.ts`, `app/page.tsx`, and `lib/aboutNarrative.ts`; restore `workInProgress: true`.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Copy drifts from actual engagement terms over time | Low | Low | Treat the case study as source of truth; update alongside any change in engagement status | John Ohio | Engagement status change |

## Review Schedule

- **Next review:** N/A (content-accuracy record); revisit only if engagement terms change.
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-008](ADR-008-adr-update-gate-for-major-pushes.md) — depends on: ADR gate triggered this record
- [ADR-073](ADR-073-case-study-progress-status-dark-default-homepage-headline.md) — amends: `workInProgress` flag flipped per that system
- [ADR-058](ADR-058-canonical-flagship-case-study-template.md) — related: canonical flagship case-study template

## References

- [`lib/projects.ts`](../../lib/projects.ts)
- [`app/page.tsx`](../../app/page.tsx) — homepage ownership blurb
- [`lib/aboutNarrative.ts`](../../lib/aboutNarrative.ts) — About timeline
- [`app/work/rivva/page.tsx`](../../app/work/rivva/page.tsx)
- [`ai/handoff.md`](../../ai/handoff.md)
