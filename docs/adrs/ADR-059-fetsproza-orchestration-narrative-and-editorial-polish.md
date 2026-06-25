# ADR-059: FetsProza orchestration-first narrative and editorial polish

## Status
**Status:** Accepted
**Date:** 2026-06-25
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` (Next.js App Router portfolio).

After [ADR-058](ADR-058-canonical-flagship-case-study-template.md) established the six-chapter flagship IA on FetsProza, review found the **operating-model story** was strong but the **orchestration problem** (why FetsProza had to exist) arrived too late. Readers hit operator workflows and UI evidence before understanding fragmented vendor orchestration as the business problem.

**In scope:** FetsProza flagship narrative layering (Snapshot → diagram → Challenge opener), `thesisLead` on `CaseHero` / `FlagshipOpener`, `EvidenceModule` scan layout and consequence-led outcomes, timeline correction (`2024 · 8 months`), homepage and `/work` card copy sync.
**Out of scope:** Decisions chapter structure (four judgments unchanged), Impact tier names (OPERATIONAL / BUSINESS / STRATEGIC), new PNG assets, migrating other flagships.

## Decision Drivers

- Recruiter must answer *why couldn't FETS keep the old platform?* within 60 seconds (Snapshot + diagram).
- Case study must read as **enterprise payment orchestration** solved through **operational design leadership** — not a wallet redesign or infrastructure postmortem.
- Product name **FetsProza** must match other flagship cards (SeamKit, SeamlessHiring) while preserving orchestration thesis in narrative lead.
- Timeline must reflect actual engagement (**2024, 8 months**).
- Screenshot outcomes must state **business consequences**, not UI descriptions.

## Options Considered

### Option A: Full rewrite toward platform/architecture spine
- **Description:** Replace Decisions chapter with vendor topology and microservice consolidation narrative.
- **Pros:** Surfaces systems-thinking for platform roles.
- **Cons:** Contradicts ADR-058 judgment-before-output contract; implies engineering ownership; discards differentiated decision evidence.
- **Effort:** High

### Option B: Reframe opening only; preserve Decisions spine (chosen)
- **Description:** Layer three nested stories — (1) business orchestration problem, (2) enterprise operating platform, (3) four design decisions — via Snapshot copy, business-oriented before/after diagram, Challenge/Strategy bridge, and editorial polish. H1 = **FetsProza**; bold `thesisLead` carries orchestration thesis.
- **Pros:** Minimal structural risk; Decisions section stays proof of judgment; aligns homepage, `/work` card, and case study.
- **Cons:** Static route still duplicates copy vs `lib/projects.ts` (existing ADR-058 trade-off).
- **Effort:** Medium

## Decision

**We will use Option B** because orchestration frames the story without replacing the design-leadership evidence in Decisions.

Implementation summary:
- **Hero:** `title` = FetsProza; `thesisLead` = orchestration thesis; compressed problem + role abstract; optional `thesisLead` prop on `CaseHero` / `FlagshipOpener`.
- **Diagram:** Business responsibility map (Customer → Vendor A–D vs FetsProza unified platform) after Snapshot — not a service catalog.
- **Challenge:** Fragmented infrastructure opener; merged philosophy line (no repeated “The challenge was…”).
- **Strategy:** Unified orchestration bridge; bold **single source of transaction truth**.
- **Decisions:** H2 → *The decisions that changed how the business operated*; scan layout (`decisionLayout="scan"`); `outcome` lines rewritten as business consequences.
- **Impact / Reflection:** Operational reliability over implied customer-trust claims; expanded philosophy close; varied “owned platform” phrasing.
- **Data:** `period` and brief Timeline → `2024 · 8 months`; `summary` / homepage ownership blurb aligned.

## Consequences

### Positive
- Orchestration and operating-model stories stack instead of compete.
- Preview cards show **FetsProza**; narrative still leads with enterprise orchestration.
- Shorter verified timeline strengthens seniority signal.
- `thesisLead` reusable for future flagships.

### Negative / Trade-offs
- ADR-058 writing rule “mention product name once in opening” is relaxed for FetsProza: name is H1 plus narrative references — accepted for card consistency.
- Diagram is page-local markup, not a shared component — acceptable to avoid premature abstraction.

### Operational Impact
- FetsProza page override remains canonical for `/work/fetsproza`; sync `lib/projects.ts` on card/summary/timeline changes.
- **Migration / rollback:** Revert `app/work/fetsproza/page.tsx` and remove `thesisLead` if unused elsewhere.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Opening orchestration copy drifts back to outcome-first hero on future edits | Med | Med | Keep diagram + merged Challenge as checklist items in PR review | John Ohio | Any FetsProza copy PR |
| `thesisLead` prop unused on other flagships creates API surface creep | Low | Low | Document as optional; only adopt when product-name H1 pattern applies | John Ohio | Next flagship migration |

## Review Schedule

- **Next review:** When migrating SeamlessHiring to ADR-058 template
- **Review owner:** John Ohio

## Related ADRs

- ADR-057 — operator-first evidence spine (evidence assets and outcome tiers; opening narrative evolved here)
- ADR-058 — canonical six-chapter IA (structure preserved)
- ADR-042 — static route override pattern

## References

- [`app/work/fetsproza/page.tsx`](../../app/work/fetsproza/page.tsx)
- [`components/case-study/CaseHero.tsx`](../../components/case-study/CaseHero.tsx)
- [`components/case-study/EvidenceModule.tsx`](../../components/case-study/EvidenceModule.tsx)
- [`lib/projects.ts`](../../lib/projects.ts) — `fetsproza` entry
- [`app/page.tsx`](../../app/page.tsx) — homepage ownership card
