# ADR-044: Phase V pilot-review artifact and AI narrative boundary (SeamlessHiring)

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Proposed
**Date:** 2026-04-29
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` (Next.js App Router portfolio deployed on Vercel).

The SeamlessHiring flagship case study introduces AI in **Phase V** as the culmination of a rebuilt, trusted workflow. During pilot review, we needed Phase V to show concrete evidence of AI integration *inside RMS* while keeping the broader “AI platform/infrastructure” story scoped to the SeamlessAI case study.

This required:
- Updating Phase V naming and intervention language to emphasize **AI-assisted decision support** with **explainability cues** and **recruiter-controlled boundaries**.
- Replacing the prior Phase V figure with a **Pilot Review** artifact that shows explainable evaluation surfaces (or a styled placeholder until the screenshot exists).
- Adding a continuity sentence that signals the later SeamlessAI work **without importing** SeamlessAI platform details into SeamlessHiring.

Constraints:
- Do not modify other phases, section ordering, or adjacent styles/spacing.
- Do not surface pilot UI details (e.g. “79% match”) as a portfolio KPI.
- Use theme-safe tokens and the existing `AnnotatedFigure` placeholder behavior.

**In scope:** Phase V naming/copy; Figure 05 artifact selection and caption; Phase V decision notes; single continuity bridge sentence.
**Out of scope:** SeamlessAI platform architecture, embeddables/playground, assistants, governance story, AI component library, or cross-product infrastructure narrative.

## Decision Drivers

- Preserve the **SeamlessHiring narrative boundary**: AI output/experience vs AI platform architecture.
- Provide **visual evidence** for Phase V (pilot review artifact) with a stable fallback (placeholder).
- Maintain **recruiter agency** framing (recommendations + reasoning, not opaque scores).
- Keep edits **surgical** (Phase V only) and avoid regressions.

## Options Considered

### Option A: Keep generic Phase V figure and broader AI copy
- **Description:** Continue using a generic figure and less specific intervention language.
- **Pros:** Lowest effort; no asset dependency.
- **Cons:** Weak evidence; blurs the boundary with SeamlessAI; reduces credibility of the “explainability + boundaries” claim.
- **Effort:** Low
- **Notes:** Risks turning Phase V into an assertion without proof.

### Option B: Pilot Review artifact + explicit AI-assisted decision support boundary (chosen)
- **Description:** Use a dedicated Pilot Review artifact for Figure 05 (image if present, otherwise styled placeholder), update Phase V naming/copy, add one decision note and a single continuity bridge sentence.
- **Pros:** Proof-forward; clean boundary; maintains recruiter agency framing; placeholder ensures stable rendering until the screenshot exists.
- **Cons:** Requires later asset handoff for maximum fidelity; continuity sentence must remain tightly scoped.
- **Effort:** Medium
- **Notes:** Keep “79% match” as interface detail only, not a headline metric.

## Decision

**We will use Option B because it provides concrete evidence of Phase V’s AI integration while maintaining a strict narrative boundary between SeamlessHiring (AI experience) and SeamlessAI (AI platform architecture).**

## Consequences

### Positive
- Phase V reads as “AI-assisted decision support,” not “AI feature drop.”
- The case study shows explainability surfaces and recruiter-controlled boundaries with a proof artifact.
- Continuity is signaled without expanding scope into SeamlessAI’s platform story.

### Negative / Trade-offs
- Until the Pilot Review screenshot is added, the artifact renders as a placeholder.
- Requires discipline to avoid adding SeamlessAI platform content into SeamlessHiring in future edits.

### Operational Impact
- Add the Pilot Review screenshot to `public/assets/work/seamless-hiring/pilot-review-ai.png` when available; the `AnnotatedFigure` will switch automatically.
- **Migration / rollback:** revert Phase V figure + copy to previous version if artifact or boundary language causes narrative confusion.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Phase V begins to accumulate SeamlessAI platform details | Med | High | Keep continuity limited to one sentence; enforce “out of scope” list in reviews | John Ohio | Any Phase V copy expansion or SeamlessAI references beyond continuity |

## Review Schedule

- **Next review:** When `pilot-review-ai.png` is added, or next Phase V narrative revision
- **Review owner:** John Ohio

## Related ADRs

- ADR-042 — depends on: static route override provides the flagship page surface
- ADR-043 — constrains: flagship brief/metrics decisions define adjacent narrative and typography system

## References

- `app/work/seamless-hiring/page.tsx` (Phase V block)
- `components/case-study/EvidenceModule.tsx`
- `components/case-study/AnnotatedFigure.tsx`

