# ADR-023: Figma MCP handoff — map design output to JOP tokens (no raw hex as source of truth)

## Status

**Status:** Accepted  
**Date:** 2026-04-11  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

The portfolio uses **inline styles** and **`--jop-*` CSS variables** ([ADR-001](ADR-001-inline-styles-for-layout-and-visuals.md); [ADR-007](ADR-007-theme-naming-and-contrast-hardening.md)). Figma MCP tools such as **`get_design_context`** emit **reference** code that often includes **literal hex/RGB** and framework-style classes, even when Figma frames use variables. **`generate_figma_design`** imports can also flatten appearance to non-token layers. Without a documented rule, PRs risk **token drift**, broken **warm/light/dark** behaviour, and duplicate color sources (hex in components vs variables in `globals.css`).

**In scope:** Process and documentation for Figma → repository handoff; where authoritative guidance lives.  
**Out of scope:** Changing MCP or Figma product behaviour; automated lint banning all hex literals (may remain in rare edge cases after explicit review).

## Decision Drivers

- **Theme correctness:** Decision colors must resolve through **`var(--jop-…)`** so `data-theme` continues to work.  
- **Single source of truth:** Avoid parallel palettes (pasted hex vs tokens).  
- **Reviewability:** Reviewers can grep for risky patterns using [`docs/figma-jop-structure.md`](../figma-jop-structure.md) §7–8.  
- **Alignment with existing ADRs:** No contradiction with inline-style architecture or static case study data ([ADR-002](ADR-002-static-in-repo-data-for-case-studies.md)).

## Options Considered

### Option A: Document handoff in `docs/figma-jop-structure.md` + checklist; implementers map hex → tokens manually

- **Description:** Add **§7 Figma MCP → site** and extend **§8** with repository checklist items. Point **`CLAUDE.md`** to §7 and this ADR. Treat MCP output as **reference only**; merge requests must replace literal colors with **`var(--jop-…)`** unless an exception is justified in review.
- **Pros:** Low tooling cost; fits current workflow; reinforces [theme-tokens.md](../theme-tokens.md); no build pipeline change.
- **Cons:** Relies on human and reviewer discipline; no automatic enforcement.
- **Effort:** Low  
- **Notes:** Complements Figma-side hygiene (variables in files) without requiring codegen to emit tokens.

### Option B: ESLint rule banning hex in `components/` and `app/`

- **Description:** Add a custom or plugin rule to flag `#RRGGBB` in style props.
- **Pros:** Stronger enforcement.  
- **Cons:** False positives (comments, rare intentional literals); maintenance overhead; out of scope for this decision cycle.  
- **Effort:** Medium  
- **Notes:** Deferred unless token violations recur in CI.

### Option C: Documentation-only in `CLAUDE.md` (no `figma-jop-structure` section)

- **Description:** Single paragraph in `CLAUDE.md` without a dedicated Figma doc section.
- **Pros:** Minimal surface area.  
- **Cons:** Splits Figma contract across files; harder to find for designers and implementers; duplicates ADR-001/007 narrative.  
- **Effort:** Low  
- **Notes:** Rejected in favour of **Option A** for discoverability.

## Decision

**We will use Option A:** Authoritative Figma → code handoff rules live in **[`docs/figma-jop-structure.md`](../figma-jop-structure.md) §7–8**. Implementations derived from **`get_design_context`** (or similar) must **not** treat pasted hex as final styling; map to **`var(--jop-…)`** per [theme-tokens.md](../theme-tokens.md). Case study prose and structure remain in [`lib/projects.ts`](../../lib/projects.ts) per [ADR-002](ADR-002-static-in-repo-data-for-case-studies.md). **`CLAUDE.md`** references §7 and this ADR so agents and contributors share one pointer.

## Consequences

### Positive

- Clear **PR review** hook: token mapping is an explicit expectation, not implicit taste.  
- **No conflict** with theme ADRs: decision reinforces rather than replaces ADR-001 and ADR-007.  
- Designers can keep improving Figma variable usage; code side has a **fixed reconciliation** procedure.

### Negative / Trade-offs

- **Manual mapping** from MCP output to tokens adds implementation time—mitigated by semantic token set and checklist.  
- **Code Connect** still requires human review for colors (stated in §7).

### Operational Impact

- **Onboarding:** Read `figma-jop-structure` §7 before merging Figma-driven UI changes.  
- **Migration / rollback:** Remove §7–8 content and `CLAUDE.md` cross-links; behaviour reverts to informal practice (not recommended).

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Contributor merges MCP snippet with hex “to ship faster,” breaking theme parity | Med | Med | §8 repo checklist; PR review; link to this ADR in `CLAUDE.md` | Maintainer | PR that cites Figma MCP or large visual diff from design import |

## Review Schedule

- **Next review:** 2027-01-01 (or when Figma MCP codegen reliably emits `var(--jop-*)`).  
- **Review owner:** Maintainer  

## Related ADRs

- [ADR-001](ADR-001-inline-styles-for-layout-and-visuals.md) — inline styles; MCP output must be adapted, not pasted wholesale.  
- [ADR-002](ADR-002-static-in-repo-data-for-case-studies.md) — case study data stays in `lib/projects.ts`.  
- [ADR-007](ADR-007-theme-naming-and-contrast-hardening.md) — warm/light/dark; hex bypass risks theme correctness.  

## References

- [`docs/figma-jop-structure.md`](../figma-jop-structure.md) §7–8  
- [`CLAUDE.md`](../../CLAUDE.md) — Figma MCP and file hygiene  
- [`theme-tokens.md`](../theme-tokens.md) — token naming for mapping  
