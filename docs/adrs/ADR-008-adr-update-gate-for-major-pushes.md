# ADR-008: ADR update gate for major pushes

## Status
**Status:** Accepted
**Date:** 2026-04-10
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

The project now evolves through larger architecture-affecting pushes (theme system expansion, token governance, interaction model changes). Those changes are currently documented only when remembered, which creates drift between code and architecture rationale.

To keep design and engineering decisions auditable, ADR updates need to be an explicit release discipline for major pushes.

**In scope:** defining what qualifies as a major push, and requiring ADR creation/update before those pushes are considered complete.
**Out of scope:** automating remote git push blocking, CI pipeline policy, or minor typo/docs-only commits.

## Decision Drivers

- Architecture decisions must remain traceable as code evolves.
- Team and future contributors need consistent decision context without chat history.
- The process must be lightweight enough to follow for every major push.

## Options Considered

### Option A: Mandatory ADR checkpoint for major pushes (chosen)
- **Description:** Define a major-push checklist and require an ADR action (new ADR, superseding ADR, or explicit "no ADR needed" note) before push completion.
- **Pros:** consistent governance, low tooling complexity, works immediately with current workflow.
- **Cons:** adds a documentation step to major delivery cadence.
- **Effort:** Low
- **Notes:** Implemented through contributor docs and ADR index discipline.

### Option B: Optional ADR updates based on maintainer judgment
- **Description:** Keep ADR updates informal and rely on memory/reviewer prompts.
- **Pros:** zero process overhead.
- **Cons:** high risk of architecture drift and missing rationale history.
- **Effort:** Low
- **Notes:** Rejected because it does not reliably meet traceability goals.

## Decision

**We will use Option A because architecture traceability is a core requirement and this approach is enforceable with minimal overhead.**

Every major push must include an ADR action: create a new ADR, supersede an existing ADR, or explicitly document why no ADR change is required in the push checklist.

## Consequences

### Positive
- Major architectural changes remain documented and reviewable over time.
- ADR index stays current and useful for onboarding and audits.
- Decision rationale is preserved alongside implementation changes.

### Negative / Trade-offs
- Adds a small procedural step before finalizing major pushes.
- Requires maintaining ADR index and cross-links when superseding decisions.

### Operational Impact
- Contributors must run an ADR checkpoint before major pushes.
- `docs/adrs/index.md` becomes a required update when new ADRs are added.
- **Migration / rollback:** if this policy proves too heavy, create a new ADR to relax scope (for example, only pre-release pushes), without altering this accepted ADR.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Major change ships without ADR update due to process skip | Med | High | Add explicit major-push checklist in `CONTRIBUTING.md` and reference policy in `README.md`; require checklist completion before push | Maintainer | Any push that changes architecture, tokens, routing, data model, or operational workflow |

## Review Schedule

- **Next review:** 2026-07-10
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-001 — constrains styling conventions that major pushes may change.
- ADR-007 — recent theme governance decision; future theme shifts must follow this gate.

## References

- `CONTRIBUTING.md`
- `README.md`
- `docs/adrs/index.md`
