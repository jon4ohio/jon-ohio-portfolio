# ADR-058: Canonical flagship case-study template (portfolio v1.0)

## Status
**Status:** Accepted
**Date:** 2026-06-24
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` (Next.js App Router portfolio).

Flagship case studies (FetsProza, SeamlessHiring, BluAlliance, Breeze IA, SeamKit) previously used inconsistent narrative structures — infrastructure spines, module catalogs, or executive-brief formats that read as design output rather than design judgment. Recruiters, hiring managers, and product leaders need a **familiar navigation model** where each project tells a distinct story through the business problem it solved.

**In scope:** Canonical 6-chapter IA, narrative contract, editorial and writing rules, decision micro-structure, Impact Snapshot opener, first implementation on FetsProza (`app/work/fetsproza/page.tsx`), minimal component extensions (`EvidenceModule`, `TensionCards`, `FlagshipOpener`, `MetadataBrief`).
**Out of scope:** Migrating all flagships in this change; generic `[slug]` renderer refactor; new asset exports.

## Guiding principle

> **Enterprise case studies should communicate design judgment rather than design output. The reader should understand why decisions were made before seeing what was produced.**

## Decision Drivers

- Recruiter must understand the project in under 60 seconds (Impact Snapshot).
- Hiring manager must understand decisions in under 5 minutes (Decisions chapter).
- Product leader must grasp designer judgment without reading every paragraph.
- Technical stakeholder must see why engineering and product aligned on the solution.
- Portfolio must read as a **cohesive body of work**, not a collection of one-off case studies.

## Options Considered

### Option A: Per-project narrative IA (status quo)
- **Description:** Each flagship keeps its own chapter names, evidence spine, and copy patterns.
- **Pros:** No migration cost; maximum per-project flexibility.
- **Cons:** Inconsistent navigation; readers relearn structure per case study; drift toward feature catalogs.
- **Effort:** Low

### Option B: Canonical 6-chapter template with shared rules (chosen)
- **Description:** Adopt fixed nav labels, executive questions per chapter, decision micro-structure, and writing rules. First implement on FetsProza; migrate other flagships incrementally.
- **Pros:** Familiar navigation; editorial guardrails; judgment-before-output enforced by structure.
- **Cons:** Migration effort per flagship; some projects need content editing to fit one-question-per-chapter rule.
- **Effort:** Medium (FetsProza first); High (full portfolio)

## Decision

**We will use Option B** because it establishes a reusable storytelling system that positions enterprise operations work as design leadership — not interface documentation.

FetsProza is the first implementation. Planned migrations: SeamlessHiring, BluAlliance, Breeze IA, SeamKit.

## Narrative contract (every flagship)

- The **organization** is the context.
- The **operators** are the protagonist.
- The **product** is the setting.
- **Design decisions** drive the story.
- **Screenshots** exist as evidence, not explanation.

## Editorial rule

**One chapter. One question.**

If a chapter answers more than one executive question, split it or remove content.

*Approved exception:* Research synthesis is embedded in Challenge as supporting evidence — it does not receive its own nav item. Challenge answers *Why did it matter?*

## Writing rules

- Lead with the business problem.
- Mention the product name **once** in the opening.
- Explain decisions before features.
- Explain outcomes before metrics.
- Show screenshots only after the reader understands why they matter.
- Remove repeated ideas rather than rewriting them.
- Default to **operational teams** unless contrasting specific roles.
- Every screenshot must support a claim.

## Chapter IA (v1.0)

| Chapter (full name) | Nav label | Section `id` | Executive question |
|---------------------|-----------|--------------|--------------------|
| Impact Snapshot | Snapshot | `snapshot` | What is this project? |
| Business Challenge | Challenge | `challenge` | Why did it matter? |
| Research Synthesis | *(embedded in Challenge)* | — | *(supports Challenge)* |
| Design Strategy | Strategy | `strategy` | How did you approach it? |
| How We Redesigned Operations | Decisions | `decisions` | What changed? |
| Business Impact | Impact | `impact` | What improved? |
| Reflection | Reflection | `reflection` | What does this say about how you think? |

Sticky nav: `01 Snapshot · 02 Challenge · 03 Strategy · 04 Decisions · 05 Impact · 06 Reflection`

## Decision micro-structure

Each decision module follows:

```
Context → Decision → Reasoning → Evidence → Outcome
```

| Slot | Meaning |
|------|---------|
| Context | Problem situation before the decision |
| Decision | What was chosen |
| Reasoning | Why this approach (trade-offs live here, not in a separate table) |
| Evidence | Screenshot proves the decision |
| Outcome | Business impact of this decision |

Implemented via `EvidenceModule` optional props: `challengeLabel`, `interventionLabel`, `reasoning`, `outcome` (legacy flagships unchanged when `reasoning` is omitted).

## Impact chapter

Single chapter merges outcomes and validation:

```
Outcomes intro → Metrics tiers → Closing sentence → Stakeholder quote
```

Outcomes before metrics (writing rule). No standalone validation chapter.

## Reflection

Prose section ending on portfolio signature line: *Designing operational models, not just interfaces.*

## Consequences

### Positive
- FetsProza establishes the template other flagships can adopt without re-inventing IA.
- Readers build mental model once, apply it across projects.
- ADR provides governance against narrative drift (IaaS framing, module catalogs, feature-first copy).

### Negative / Trade-offs
- Static route overrides duplicate some copy between `lib/projects.ts` and page files.
  - **Mitigation:** Page override is source of truth for flagship narrative; `lib/projects.ts` stays aligned for cards, SEO, and generic `[slug]` fallback.

### Operational Impact
- New flagships: copy ADR-058 structure from `app/work/fetsproza/page.tsx`.
- Component changes are backward-compatible (optional props only).
- **Migration / rollback:** Revert `app/work/fetsproza/page.tsx` to prior spine; remove optional props if unused.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Flagship pages diverge from template over time | Med | Med | ADR writing rules + success criteria review on each flagship migration | John Ohio | Each new flagship migration PR |
| Research embedded in Challenge feels like two questions | Low | Med | Keep insight cards subordinate to challenge prose; no separate nav anchor | John Ohio | User testing or recruiter feedback |

## Template success criteria

- A **recruiter** should understand the project in **under 60 seconds** (Impact Snapshot).
- A **hiring manager** should understand the decisions in **under 5 minutes** (Decisions chapter).
- A **product leader** should understand the designer's judgment **without reading every paragraph**.
- A **technical stakeholder** should understand why engineering and product aligned around the proposed solution.

If any audience cannot answer those questions, simplify the narrative.

## Review Schedule

- **Next review:** When migrating SeamlessHiring to this template
- **Review owner:** John Ohio

## Related ADRs

- ADR-042 — flagship static route override pattern
- ADR-048 — executive brief commercial shift (evolved into Impact Snapshot)
- ADR-056 — strategic decisions in brief bento
- ADR-057 — FetsProza operator-first evidence spine (partially superseded by this narrative IA)

## References

- [`app/work/fetsproza/page.tsx`](../../app/work/fetsproza/page.tsx)
- [`components/case-study/EvidenceModule.tsx`](../../components/case-study/EvidenceModule.tsx)
- [`components/case-study/FlagshipOpener.tsx`](../../components/case-study/FlagshipOpener.tsx)
- [`lib/projects.ts`](../../lib/projects.ts) — `fetsproza` entry
