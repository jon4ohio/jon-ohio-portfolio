# ADR-081: Rivva case study v2 — seven-section spine and merged decision evidence

## Status

**Status:** Accepted
**Date:** 2026-07-08
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

The Rivva case study at [`app/work/rivva/page.tsx`](../../app/work/rivva/page.tsx) shipped under [ADR-080](ADR-080-rivva-flagship-case-study-finalized.md) with a nine-chapter spine: Opportunity, Challenge, My Role, Key Design Decisions, From Vision to Product, Design in Action, Results, What I Learned, and Design Principle. Decision prose and evidence screenshots were split across three sections, so each artifact was described twice. A v2 editorial draft collapsed the narrative to seven chapters and merged each product decision with its evidence block.

This change touches [`lib/projects.ts`](../../lib/projects.ts), [`lib/rivvaContent.ts`](../../lib/rivvaContent.ts), [`app/work/rivva/page.tsx`](../../app/work/rivva/page.tsx), and shared case-study components — major paths under [ADR-008](ADR-008-adr-update-gate-for-major-pushes.md).

**In scope:** Seven-section IA, v2 copy from editorial draft, unified `rivvaProductDecisions[]`, hero impact metrics grid, `EvidenceClaimBlock` and `RoleMissionBrief` additive props, `lib/projects.ts` listing sync, Decision Architecture diagram deferred from page render.
**Out of scope:** Homepage ownership blurb changes; migrating Rivva to ADR-058 `FlagshipOpener` template; product operating-status copy in Results; deleting `diagram-decision-architecture.svg` or `DecisionArchitectureDiagram.tsx`.

## Decision Drivers

- Each visual must answer a question the copy just raised — no duplicate artifact descriptions across sections.
- Sticky nav must reflect one executive question per chapter (editorial rule from ADR-058 family).
- `workInProgress` tracks **case study write-up maturity** only (ADR-073) — not client product operating status.
- Component extensions must be additive and Rivva-scoped where possible (`EvidenceClaimBlock` is Rivva-only; `RoleMissionBrief` gains optional props).

## Options Considered

### Option A: Keep nine-section spine; patch copy only

- **Description:** Update prose in place without collapsing sections or merging decisions with evidence.
- **Pros:** Smallest structural diff.
- **Cons:** Artifacts still appear twice; nav still lists redundant Decision / Vision / In Action chapters.
- **Effort:** Low
- **Notes:** Rejected — duplicates undermine the v2 editorial intent.

### Option B: Seven-section spine with merged decision + evidence blocks (chosen)

- **Description:** Collapse to Opportunity → Preparing for Launch → My Role → Three Product Decisions → Results → Reflection → Principle. Each decision renders Problem → image + caption → Decision → Outcome once via extended `EvidenceClaimBlock`.
- **Pros:** Single artifact per decision; cleaner nav; matches v2 draft ownership language ("led," "worked closely on").
- **Cons:** Removes standalone Vision and In Action chapters; Decision Architecture diagram not rendered in v2.
- **Effort:** Medium
- **Notes:** Chosen.

## Decision

**We will use Option B** because merged decision evidence eliminates redundant narration and the seven-chapter spine matches the approved v2 draft.

Concretely:

- Rewrite [`lib/rivvaContent.ts`](../../lib/rivvaContent.ts) with v2 copy and `rivvaProductDecisions[]`.
- Restructure [`app/work/rivva/page.tsx`](../../app/work/rivva/page.tsx) to seven sticky-nav chapters; hero uses four-cell impact grid.
- Extend `EvidenceClaimBlock` with optional `decision` prop and Problem / Decision / Outcome micro-labels.
- Make `RoleMissionBrief.mission` optional; add `collaboratedLabel` (Rivva passes "I worked closely on").
- Sync Rivva listing fields and fourth metric in [`lib/projects.ts`](../../lib/projects.ts); keep `workInProgress: false`.
- **Defer** Decision Architecture diagram — not rendered in v2; assets remain for follow-up.
- **Omit** Results closure line about Rivva concluding operations — explicit author choice (2026-07-08 session); orthogonal to `workInProgress`.

## Consequences

### Positive

- Rivva case study reads as design judgment (decisions before evidence) without repeated screenshots.
- `lib/projects.ts` listing copy aligns with v2 narrative for `/work` cards and SEO fallback.
- Additive component props do not affect other flagship routes.

### Negative / Trade-offs

- ADR-080's nine-chapter structure is superseded for page IA — narrative role/scope decisions in ADR-080 remain valid.
- Decision Architecture diagram is invisible until a follow-up pass (fold into Decision One vs. cut vs. standalone).
- ADR-073 "published trio" language (seamkit / seamless-hiring / fetsproza) is stale now that Rivva's case study is also `workInProgress: false`.

### Operational Impact

- `public/content-index.json` regenerates via postbuild after deploy.
- **Migration / rollback:** Revert `lib/rivvaContent.ts`, `app/work/rivva/page.tsx`, component prop changes, and Rivva `lib/projects.ts` hunks; restore nine-section page from git history.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Readers expect product operating-status note omitted from Results | Low | Med | ADR records explicit omit decision; author may add factual closure line in a future copy pass if needed | John Ohio | External press or portfolio audit flags inconsistency |
| Deferred diagram never revisited | Med | Low | Keep SVG and component in repo; note follow-up in ADR-081 Related ADRs | John Ohio | Next Rivva content pass |

## Review Schedule

- **Next review:** Follow-up pass on Decision Architecture diagram disposition, or if Rivva product-history copy needs updating.
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-008](ADR-008-adr-update-gate-for-major-pushes.md) — depends on: ADR gate triggered this record
- [ADR-042](ADR-042-flagship-case-study-static-route-override.md) — related: static route override pattern (Proposed)
- [ADR-058](ADR-058-canonical-flagship-case-study-template.md) — related: editorial one-chapter-one-question rule; Rivva uses bespoke seven-chapter spine
- [ADR-073](ADR-073-case-study-progress-status-dark-default-homepage-headline.md) — constrains: `workInProgress` = case study maturity only
- [ADR-080](ADR-080-rivva-flagship-case-study-finalized.md) — amends: page IA and v2 narrative structure; role/scope decisions preserved

## References

- [`lib/rivvaContent.ts`](../../lib/rivvaContent.ts)
- [`app/work/rivva/page.tsx`](../../app/work/rivva/page.tsx)
- [`components/case-study/EvidenceClaimBlock.tsx`](../../components/case-study/EvidenceClaimBlock.tsx)
- [`components/case-study/RoleMissionBrief.tsx`](../../components/case-study/RoleMissionBrief.tsx)
- Editorial draft: `rivva-case-study-draft_1.md` (v2)
