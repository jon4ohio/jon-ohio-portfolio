# ADR-056: Strategic Decisions — single judgment section per case study

## Status

**Status:** Accepted  
**Date:** 2026-06-01  
**Decision Maker(s):** John Ohio (Lead Product Designer)  
**Supersedes:** None

## Context

SeamlessHiring’s flagship page presented three overlapping surfaces: executive brief bullets labelled **Key decisions**, a mid-page **Decision Log** / **Key decisions** accordion, and a prose **Key decisions and what they cost** section. Portfolio readers (hiring managers, design leaders, MBA/EB1 reviewers) need proof of **strategic judgment**, not an internal decision log or chronological design-review table.

ADR-055 introduced brief-level judgment bullets; this ADR consolidates flagship narrative into one **Strategic Decisions** pattern with a shared data type.

**In scope:** `StrategicDecision` type, `MetadataBrief` scan card, `lib/projects.ts` brief data, SeamlessHiring flagship section merge, rename from `keyDecisions` strings.  
**Out of scope:** ADR-style decision logs on orchestrated-portfolio (internal governance story remains valid there).

## Decision Drivers

- One executive-friendly judgment section beats duplicate Key decisions + Decision Log + trade-off essay  
- Brief band stays scannable (titles only); flagship carries title + rationale + trade-off + outcome in accordion bodies  
- Single canonical source for SeamlessHiring (`lib/seamlessHiringStrategicDecisions.ts`) consumed by brief and page  

## Options Considered

### Option A: Keep Decision Log + Key decisions + cost prose

- **Description:** Retain three sections with clearer labels.  
- **Pros:** Maximum detail for mentors or internal readers.  
- **Cons:** Repetitive; “Decision Log” mis-signals process documentation; lowers perceived seniority.  
- **Effort:** Low  

### Option B: One Strategic Decisions section + shared type (chosen)

- **Description:** Replace `keyDecisions: string[]` with `strategicDecisions: { title, body }[]`. Brief shows up to three titles; flagship renders full accordion; remove duplicate prose section.  
- **Pros:** Aligns with target audiences; DRY; trade-offs live inside each decision body.  
- **Cons:** Longer accordion bodies require careful editing to stay readable.  
- **Effort:** Medium  

## Decision

**We will use Option B** — one **Strategic Decisions** surface per case study, with brief scan titles and flagship accordion detail sourced from the same data.

## Consequences

### Positive

- SeamlessHiring drops ~80 lines of duplicate prose while preserving trade-off content inside decision bodies  
- Seamkit, Fetsproza, and IBEDC briefs use the same schema  
- `DecisionAccordion` types align with `StrategicDecision`  

### Negative / Trade-offs

- Generic `/work/[slug]` routes do not auto-render a full Strategic Decisions section — only brief scan unless a flagship page exists  

### Operational Impact

- Edit `lib/seamlessHiringStrategicDecisions.ts` (or project `brief.strategicDecisions`) when judgment narrative changes; brief titles auto-sync via slice(0, 3)  
- **Migration / rollback:** Restore removed SeamlessHiring sections from git history if needed  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Accordion bodies too long for mobile scan | Med | Med | Keep bodies to 2–4 sentences; one trade-off + one outcome each | John Ohio | Mobile QA on `/work/seamless-hiring` |

## Review Schedule

- **Next review:** Next flagship case study copy pass  
- **Review owner:** John Ohio  

## Related ADRs

- ADR-055 — executive brief leadership signals (extends with strategic decision schema)  
- ADR-044 — AI narrative boundary on SeamlessHiring (Phase V decision preserved in workflow-first body)  
- ADR-047 — SeamlessHiring metrics canonicalization  

## References

- `lib/strategicDecisions.ts`  
- `lib/seamlessHiringStrategicDecisions.ts`  
- `components/case-study/MetadataBrief.tsx`  
- `app/work/seamless-hiring/page.tsx`
