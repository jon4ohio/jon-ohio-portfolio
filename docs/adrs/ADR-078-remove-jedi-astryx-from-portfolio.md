# ADR-078: Remove JEDI/Astryx integration from portfolio

## Status
<!-- One of: Draft | Proposed | Accepted | Deprecated | Superseded by ADR-NNN -->
**Status:** Accepted
**Date:** 2026-07-07
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** ADR-075

## Context

Project: `jon-ohio-portfolio`.

Portfolio V2 introduced a platform layer (JEDI `@jedi/*`, built on Astryx `@astryxdesign/*`) for chrome primitives, providers, and theme CSS. The integration increased dependency and operational complexity (vendored packages, lockfile churn, documentation coupling) relative to the portfolio’s needs.

We are reverting Portfolio V2’s platform dependency so the portfolio is self-contained, builds with standard `npm ci`, and does not rely on external UI platform packages for core navigation, theming, or basic UI primitives.

**In scope:** Removing JEDI/Astryx dependencies, providers, vendored packages, and any portfolio code/docs that treat them as current state.
**Out of scope:** Redesigning the portfolio’s visual language; changing IA/routes/content hierarchy; adding a new component library.

## Decision Drivers

- Portfolio must build and run without `@jedi/*` / `@astryxdesign/*`.
- Reduce dependency surface area (fewer moving parts, simpler local + CI installs).
- Keep primary routes and content intact (`/`, `/work`, `/work/[slug]`, `/about`, `/leadership`, `/thinking`).

## Options Considered

### Option A: Keep JEDI/Astryx integration (status quo)
- **Description:** Continue using `@jedi/*` packages for providers/theme and chrome primitives, retaining the existing operational workflow.
- **Pros:**
  - Reuses an existing platform abstraction.
  - Shared primitives may speed up future UI experimentation.
- **Cons:**
  - Adds dependency/maintenance overhead that is not required for the portfolio.
  - Couples portfolio operations and docs to an external platform release/distribution model.
- **Effort:** Low
- **Notes:** Leaves the portfolio dependent on platform packaging decisions.

### Option B: Remove JEDI/Astryx integration (chosen)
- **Description:** Remove all `@jedi/*` and `@astryxdesign/*` usage; replace required primitives with small local components; keep existing CSS variable token system in `app/globals.css`.
- **Pros:**
  - Self-contained portfolio with fewer external constraints.
  - Simpler installs and fewer build/workflow edge cases.
  - Clearer boundary: portfolio owns its UI and tokens.
- **Cons:**
  - Loss of platform-provided primitives; any future shared UI work must be reintroduced deliberately.
- **Effort:** Medium
- **Notes:** Requires touching layout wrapper, imports, CSS, and documentation.

## Decision

**We will use Option B because it best satisfies the “self-contained, low-overhead portfolio” drivers while preserving routes and content.**

This keeps the portfolio independent from external UI platform distribution concerns and reduces the maintenance burden for a project whose primary value is its content and narrative.

## Consequences

### Positive
- Portfolio builds and runs without JEDI/Astryx dependencies.
- Reduced complexity in dependency management and documentation.

### Negative / Trade-offs
- Any future adoption of an external UI platform will require a new ADR and a deliberate integration plan.

### Operational Impact
- Onboarding: fewer special cases; standard `npm ci` workflow.
- Maintenance: local `components/ui/*` primitives become the portfolio-owned surface.
- **Migration / rollback:** This ADR can be rolled back by reintroducing `@jedi/*` dependencies and restoring the provider/theme wiring, but that should only happen via a new ADR.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Visual regressions after removing platform CSS | Med | Med | Verify key routes in light/dark; keep token aliases stable; run a11y checks | Maintainer | Before next production deploy |

## Review Schedule

- **Next review:** After next production deploy
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-075 — relationship: superseded

## References

- `docs/adrs/ADR-075-jedi-platform-migration-preservation-first.md`
- `package.json`

