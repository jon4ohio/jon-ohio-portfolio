# ADR-057: FetsProza operator-first evidence spine and narrative reframe

## Status
**Status:** Accepted
**Date:** 2026-06-24
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` (Next.js App Router portfolio).

The FetsProza flagship case study (`app/work/fetsproza/page.tsx`) was ported from the SeamlessHiring flagship shell with a **Layer 1–4 infrastructure spine** (transaction engine → integration layer) and placeholder evidence figures. That framing read as an architecture specification — inconsistent with the design deck (operator workflows, dashboards, modules) and the OC1 evidence document (vendor replacement, $1M+ savings, ₦89.7B+ production volume, CTO validation).

**In scope:** FetsProza flagship page copy and evidence spine; aligned `Project.brief` and hero metrics in `lib/projects.ts`; homepage featured-work blurb for FetsProza in `app/page.tsx`.
**Out of scope:** New components, new assets, cross-case-study refactors, generic `[slug]` renderer changes.

## Decision Drivers

- Reader takeaway must be **operating system for a mobile-money business**, not fintech middleware.
- Evidence must use **real UI screenshots** already in `public/assets/work/fetsproza/`.
- Narrative must align with **two source documents**: design deck (modules) + OC1 (verified outcomes).
- Follow flagship pattern established by SeamlessHiring and BluAlliance: product story, not architecture doc.

## Options Considered

### Option A: Keep infrastructure-layer spine
- **Description:** Retain Layer 1–4 copy and placeholder figures; polish prose only.
- **Pros:** No structural change.
- **Cons:** Contradicts source materials; reads engineering-led; placeholders imply fake evidence.
- **Effort:** Low

### Option B: Operator-first module spine with real assets (chosen)
- **Description:** Replace layers with five modules (transaction monitoring → reconciliation → payment → merchant admin → platform outcomes); pull-quote thesis in hero; four outcome tiers + CTO quote; align executive brief bento.
- **Pros:** Matches deck + OC1; visibility-first arc; design-leadership positioning.
- **Cons:** Requires copy pass across page and brief data.
- **Effort:** Medium

## Decision

**We will use Option B** because both source documents support an operator-and-outcomes narrative, not an infrastructure architecture walkthrough.

Implementation summary:
- **Thesis (hero):** *Operators shouldn't need engineering to answer what happened to this transaction.*
- **Spine order:** Transaction monitoring → Reconciliation → Payment processing → Merchant & agent management → Platform outcomes.
- **Assets:** `thumb-2.png`, `hero.png`, `block-module-payment.png`, `block-module-merchant.png`, `block-outcome.png`.
- **Outcomes tiers:** PRODUCT, OPERATOR EXPERIENCE, BUSINESS IMPACT, PLATFORM SCALE (OC1 + deck metrics).
- **Validation:** Clement Asibeluo (CTO) quote after outcome cards.
- **Brief bento:** Operator UX framing; hero metric strip replaces "Proprietary infrastructure" with ₦89.7B+ production volume.

## Consequences

### Positive
- Case study reads as product leadership with defensible production evidence.
- Executive brief bento aligns with hero and evidence modules (no architecture vocabulary in section titles).
- Real screenshots replace placeholder SVGs.

### Negative / Trade-offs
- Module 05 (Platform outcomes) and `#outcomes` section both surface metrics — intentional: figure for scanability, cards for structured reading.
- `lib/projects.ts` narrative fields (`context`, `action`, etc.) still use legacy wording for the generic `[slug]` route; flagship override is canonical for `/work/fetsproza`.

### Operational Impact
- Future FetsProza copy edits should treat `app/work/fetsproza/page.tsx` as source of truth for the flagship narrative.
- **Migration / rollback:** Revert page + brief/metrics changes; no schema migration.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Brief bento and body copy drift again | Med | Med | ADR-057 documents spine order and architecture-language ban; review on next FetsProza edit | John Ohio | Next FetsProza content change |

## Review Schedule

- **Next review:** Next FetsProza narrative or evidence update
- **Review owner:** John Ohio

## Related ADRs

- ADR-042 — depends on: flagship static route override pattern
- ADR-051 — depends on: phase strip inside evidence section
- ADR-055 — related: brief density and leadership signals

## References

- [`app/work/fetsproza/page.tsx`](../../app/work/fetsproza/page.tsx)
- [`lib/projects.ts`](../../lib/projects.ts) — `fetsproza` entry
- Design deck: `FETSPROZA-compressed.pdf`
- OC1 evidence doc: `OC1_FetsProza_Fintech_Infrastructure_John_Ohio`
