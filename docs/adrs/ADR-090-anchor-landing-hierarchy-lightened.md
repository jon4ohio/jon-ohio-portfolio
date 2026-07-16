# ADR-090: Anchor landing hierarchy lightened (v1.1.1)

## Status
**Status:** Accepted  
**Date:** 2026-07-16  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** ADR-089

## Context

ADR-089 extended `/anchor` with Evidence, Related Research, and Explore sections so visitors would “trust” before clicking GitHub. On the live page, those sections diluted the existing visual rhythm (Hero → Problem → Framework → Adoption) and asked first-time visitors for proof that belongs in the repository.

**In scope:** Restore a four-beat landing spine; Option 1 hero (“Continue instead of reconstruct.”); tightened Problem / Framework / Adoption copy; thin Related Work link row (no large research chapter).  
**Out of scope:** Visual identity (ADR-086/088); route/catalog rules (ADR-087); Anchor contract model upstream.

## Decision Drivers

- First-minute clarity: problem, approach, outcome — then GitHub.
- Do not lengthen the page to carry validation/research detail.
- Preserve navy hero + scroll-spy nav pattern (four section ids).
- Related work may appear as quiet links only — no explanatory section.

## Options Considered

### Option A: Keep ADR-089 Evidence + Research + Explore; only trim copy
- **Description:** Shorten paragraphs but retain the three added sections.
- **Pros:** Keeps research discoverability on-page.
- **Cons:** Hierarchy problem remains; page still longer than the strong four-beat rhythm.
- **Effort:** Low
- **Notes:** Rejected — wrong problem.

### Option B: Four-beat spine + thin Related Work footer (chosen)
- **Description:** Remove Evidence / Related Research / Explore chapters; restore adopt in spy nav; Option 1 hero; short Problem/Framework/Adopt copy; three Related Work links + MIT/GitHub bar.
- **Pros:** Matches visual rhythm; repository stays primary detail surface.
- **Cons:** Less on-page “proof”; trust deferred to GitHub/docs.
- **Effort:** Low
- **Notes:** Chosen.

## Decision

**We will use Option B** because Decision Drivers prioritize hierarchy and first-minute clarity over on-page evidence chapters. ADR-089’s narrative intent (problem → approach → GitHub) remains; its section expansion does not.

## Consequences

### Positive
- Page ends cleanly after Adoption + quiet Related Work.
- Side nav returns to four story beats (Start / Problem / Framework / Get Started).

### Negative / Trade-offs
- Validation and research depth live off-page (repo / field note).

### Operational Impact
- Modified: `app/anchor/page.tsx`; ADR-089 status → Superseded by ADR-090.
- **Migration / rollback:** Revert page to ADR-089 commit; restore ADR-089 Accepted if abandoning lighten.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Visitors miss research context without Evidence section | Low | Low | Related Work links + GitHub README/docs carry depth | Owner | Feedback that landing feels under-proven |

## Related ADRs

- ADR-089 — superseded: Evidence / Related Research / Explore spine
- ADR-086 — constrains: standalone `/anchor` + GitHub-primary funnel
- ADR-087 — constrains: sole public Anchor surface
- ADR-088 — constrains: navy hero + scroll-spy side nav

## References

- Implementation: `app/anchor/page.tsx`
- Anchor repository: https://github.com/jon4ohio/anchor
