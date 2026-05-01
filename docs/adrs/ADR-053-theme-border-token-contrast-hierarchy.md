# ADR-053: Theme border token contrast hierarchy

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Draft
**Date:** 2026-05-01
**Decision Maker(s):** Unknown (required before Accepted)
**Supersedes:** None

## Context

Project: `jon-ohio-portfolio` (Next.js App Router portfolio site).

Across Light/Warm/Dark themes, subtle dividers and panel lines are used heavily to encode hierarchy (section separation, card boundaries, tables, and micro-label groupings). Recent work surfaced two issues:

- In **Light**, the “subtle” border token was darker than the “default” border token, collapsing hierarchy.
- In **Dark**, the “subtle” border token could match adjacent subtle surfaces, reducing legibility of lines and separators.

Because the UI is implemented primarily via inline styles that reference shared CSS variables, the least invasive fix is to correct the border token relationships at the theme-token layer.

**In scope:** Decision-token tuning for border contrast/hierarchy across themes (`--jop-border-default`, `--jop-border-subtle`).
**Out of scope:** Layout changes, typography changes, or component-specific overrides for individual pages.

## Decision Drivers

- Subtle borders must read as **lighter** than default borders in Light/Warm.
- Dark theme borders must remain visible over `--surface` / `--surface-subtle` fills.
- Changes should be global and low-touch (token-level), preserving inline-style conventions.

## Options Considered

### Option A: Keep current token values; fix per-component
- **Description:** Leave border tokens as-is and patch contrast issues in specific components/pages.
- **Pros:**
  - Localized change; avoids shifting global look.
- **Cons:**
  - Repeats fixes across many inline-style callsites.
  - Inconsistent results and ongoing drift risk.
- **Effort:** High
- **Notes:** Conflicts with the desire to keep hierarchy encoded in shared decision tokens.

### Option B: Swap / rebalance border tokens at the theme layer
- **Description:** Adjust theme token values so `subtle` is reliably lighter than `default` in Light, and both remain visible in Dark.
- **Pros:**
  - One change improves the whole site.
  - Restores a consistent visual grammar for hierarchy.
- **Cons:**
  - Global aesthetic shift; may require follow-up tuning if any page relied on the previous inversion.
- **Effort:** Low
- **Notes:** Best fit for token-driven theming.

## Decision

**We will use Option B because border hierarchy is a global affordance and is best enforced at the token layer.**

Specifically:
- Light: ensure `--jop-border-subtle` is lighter than `--jop-border-default`.
- Dark: increase both border tokens so lines stay visible against dark surfaces.

## Consequences

### Positive
- Clearer hierarchy across Light/Warm/Dark.
- Fewer component-level “contrast band-aids” needed.

### Negative / Trade-offs
- Some views may appear slightly more “lined” in Dark and slightly softer in Light.

### Operational Impact
- Token-first approach reduces future theme regressions when new blocks are added.
- **Migration / rollback:** Revert the border token values in `app/globals.css` to prior values if the global change is too strong.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Dark theme borders become too prominent, competing with text hierarchy | Med | Med | Evaluate key pages (Home, Work index, SeamKit case study) and adjust `--jop-border-default/subtle` one step down if needed | Maintainer | After visual QA across Light/Warm/Dark |

## Review Schedule

- **Next review:** After a full-theme sweep on Home + Work + one case study
- **Review owner:** Maintainer

## Related ADRs

- [ADR-006] — constrains: dual brand theme token system
- [ADR-007] — related: theme naming and contrast hardening

## References

- `app/globals.css`

