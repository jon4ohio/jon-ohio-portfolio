# Session Arbitration

**Type:** Adopting-project instrument (not an Anchor framework contract)  
**Purpose:** Execute delegated responsibility resolution — minimum sufficient context per session.

**Governing principle:** The adapter is the instrument, not the intervention. This spec defines the protocol; `.cursor/rules/anchor-session-arbitration.mdc` executes it in Cursor.

---

## Three protocols

```
Orientation  →  responsibility (not context)
Session      →  minimum context bundle given responsibility
Observation  →  persistence actions only if responsibility moved
```

---

## Orientation

**Question:** What responsibility owns the current question?

| If the question is about… | Responsibility |
|---------------------------|----------------|
| What changed, what's next, current branch, blocks | Session continuity |
| Why a decision was made, rationale, alternatives | Decision rationale |
| What to build, scope, acceptance criteria | Implementation scope |
| What is this project, where truths live | Orientation gap |

**Output:** Named responsibility — not a file list.

---

## Session

Given the resolved responsibility, assemble the **minimum sufficient context bundle**.

| Responsibility | Load | Do not load |
|----------------|------|-------------|
| Session continuity | `ai/handoff.md` | git log, git diff, full ADR tree |
| Decision rationale | Named ADR in `docs/adrs/` — use Handoff only to discover ADR id if unknown | Handoff first when ADR is known; git log |
| Implementation scope | `ai/handoff.md` (horizon) → paths named in horizon only | Entire `app/`, all case studies |
| Orientation gap | `docs/project/entry.md` contract index section only | Full Entry prose unless needed |

**Explicit exclusions:** `git log`, `git diff`, browsing all of `docs/adrs/` when a specific ADR suffices.

---

## Expected bundles (probe questions)

| Question | Responsibility | Expected minimum bundle |
|----------|----------------|-------------------------|
| "What changed recently?" | Session continuity | `ai/handoff.md` only |
| "Why was ADR-073 accepted?" | Decision rationale | `docs/adrs/ADR-073-case-study-progress-status-dark-default-homepage-headline.md` only |
| "Why was dark theme the default?" | Decision rationale | ADR-073 (Handoff only if ADR id unknown) |
| "What's in scope for WIP badge work?" | Implementation scope | Handoff horizon → ADR-073 / relevant paths |

---

## Observation

At session end, determine whether responsibility moved.

| Signal | Action |
|--------|--------|
| Decision constrains future work | ADR candidate — write or pointer in Handoff; do not duplicate ADR body in Handoff |
| Scope changed | Spec or case-study doc candidate |
| Continuity changed | Update Handoff delta, horizon, blocks |
| Repeated explanation | Friction log row |
| None of the above | Explicit: Handoff unchanged |

---

## Experiment reference

Maintainer falsification experiment: see Anchor meta-repo `releases/v0.2/context-arbitration-experiment.md`.
