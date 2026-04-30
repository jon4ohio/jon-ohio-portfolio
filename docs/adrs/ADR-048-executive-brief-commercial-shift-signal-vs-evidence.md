# ADR-048: Executive Brief commercial shift as signal (numbers only in Strategic evidence)

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Proposed
**Date:** 2026-04-30
**Decision Maker(s):** John Ohio
**Supersedes:** None

## Context

In the SeamlessHiring flagship case study (`/work/seamless-hiring`), the Executive Brief includes a “Commercial shift” card. The canonical commercial story contains two distinct kinds of change:
- **International**: a price increase within the same monthly pricing model (`$200 → up to $500/mo`).
- **Nigeria**: a pricing **model transformation** (from a one-time add-on to recurring monthly pricing, `₦150k one-time → ~₦200k/mo`).

Rendering both inside a single “before → after” visual creates cognitive dissonance: the UI implies one comparable pricing ladder, but the underlying story is two different systems.

The Strategic outcome card already carries the full, explainable commercial proof sentence and has enough space to disambiguate “increase” vs “model transition.”

**In scope:** Executive Brief commercial shift copy; rendering behavior when the second line is omitted; avoiding duplicated pricing mentions.
**Out of scope:** Changing the canonical pricing sentence; adding new sections; altering the hero strip metric mix.

## Decision Drivers

- Keep **Executive Brief** as a fast signal layer (meaning first, minimal parsing).
- Keep **Strategic** as the evidence layer (defensible narrative + numbers).
- Avoid mixed abstraction levels and duplicated pricing mentions across the page.
- Preserve existing layout and typography hierarchy.

## Options Considered

### Option A: Dual-market labeled Commercial shift card
- **Description:** Keep pricing numbers in the Executive Brief but add labels for International vs Nigeria.
- **Pros:** Keeps all pricing evidence near the top.
- **Cons:** Adds cognitive load; turns the brief into documentation; still forces the reader to parse two systems in a “one story” card.
- **Effort:** Low
- **Notes:** Weakens the “instant clarity” goal of the Executive Brief.

### Option B: Meaning-only Commercial shift in Executive Brief; numbers only in Strategic (chosen)
- **Description:** Replace numeric lines in the Executive Brief commercial card with a single meaning sentence; keep the canonical pricing proof sentence only in the Strategic outcome card.
- **Pros:** Clean separation of layers (signal → proof); reduces confusion; avoids duplication.
- **Cons:** Pricing evidence appears later in the scroll, not in the brief.
- **Effort:** Low
- **Notes:** Requires conditional rendering to avoid empty lines/arrows when the second line is omitted.

## Decision

**We will present the Executive Brief commercial shift as a meaning-only signal and keep pricing numbers exclusively in the Strategic evidence layer.**

## Consequences

### Positive
- Executive Brief remains scannable and coherent.
- Commercial proof remains explicit and defensible (Strategic caption).
- No mixed “increase vs model transition” mental models inside one card.

### Negative / Trade-offs
- Readers must reach Outcomes/Strategic to see numeric proof.

### Operational Impact
- Ensure no other pricing strings (`$3,600/yr`, duplicate `$200→$500/mo`, etc.) reappear elsewhere on the page.
- **Migration / rollback:** Restore numeric two-line commercial shift and arrow treatment if the Strategic caption is removed in future.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Pricing numbers reintroduced into the Executive Brief, re-creating confusion | Med | Med | Keep this ADR as the reference; enforce a “single commercial proof sentence” rule in review | John Ohio | Any change to Executive Brief commercial shift or Strategic caption |

## Review Schedule

- **Next review:** Next SeamlessHiring narrative revision
- **Review owner:** John Ohio

## Related ADRs

- ADR-047 — depends on: canonical metric system and Strategic caption support

## References

- `app/work/seamless-hiring/page.tsx` (Executive Brief + Strategic caption)
- `components/case-study/MetadataBrief.tsx` (commercial shift rendering)

