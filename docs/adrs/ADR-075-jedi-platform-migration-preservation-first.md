# ADR-075: JEDI platform migration (preservation-first)

## Status

**Status:** Accepted  
**Date:** 2026-07-03  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None (amends ADR-001, ADR-023 in scope noted below)

## Context

Portfolio V2 migrates presentation and interaction to **JEDI** (`@jedi/*`) — an opinionated UI platform built on Astryx as upstream foundation ([jon4ohio/jedi](https://github.com/jon4ohio/jedi)). This is a **platform migration**, not a redesign.

The existing portfolio at johnohio.vercel.app is the source of truth for narrative, information architecture, editorial voice, content hierarchy, case studies, storytelling, and routing.

**In scope:** JEDI adoption, preservation constraints, replaceability, public API consumption, version compatibility, URL stability.  
**Out of scope:** OS navigation restructure (cancelled); new top-level IA; replacing editorial case-study components.

## Decision Drivers

- Returning visitors must recognize the same portfolio immediately.
- No content, narrative, or URL regressions.
- Applications must not depend on `@astryxdesign/*` directly (replaceability).
- JEDI versions independently from the portfolio (semver pin).
- Accessibility maintained or improved ([ADR-013](ADR-013-playwright-axe-page-level-accessibility-tests.md)).
- Performance equal to or better than V1.

## Portfolio Preservation Principle

**Only these may change in V2.0:** presentation, interaction, accessibility, performance, maintainability.

**Must preserve:** navigation (Home · Work · Leadership · About · Thinking), content hierarchy, case study structure ([ADR-042](ADR-042-flagship-case-study-static-route-override.md)), editorial components (`components/case-study/*` — token pass only), URLs, narrative in `lib/projects.ts` / `lib/thinking.ts` / `lib/sitePositioning.ts`.

## Options Considered

### Option A: Full redesign with new OS navigation

- **Description:** Adopt JEDI and restructure IA (Work · Systems · Research · Writing · Library).
- **Pros:** Closer to Astryx docsite patterns.
- **Cons:** Breaks recognition, URLs, and established mental model; conflicts with portfolio strength.
- **Effort:** High  
- **Notes:** Rejected.

### Option B: Preservation-first JEDI migration (chosen)

- **Description:** Wire `@jedi/core`, `@jedi/react`, `@jedi/themes`, `@jedi/tokens`; `JediProviders` in layout; chrome via JEDI where compatible; keep Nav links, routes, and editorial components; pin JEDI `0.1.x`.
- **Pros:** Faithful reconstruction; platform boundaries; replaceability; measurable user-facing success criteria.
- **Cons:** Dual token systems during transition (JOP aliases + JEDI bridge); incremental visual polish.
- **Effort:** Medium  
- **Notes:** Chosen.

### Option C: Visual-only refresh without JEDI packages

- **Description:** Retoken `globals.css` only; no `@jedi/*` dependency.
- **Pros:** Lowest integration risk.
- **Cons:** No platform validation; does not meet V2 ecosystem goals.
- **Effort:** Low  
- **Notes:** Rejected.

## Decision

**We will use Option B.**

- Portfolio consumes **only** `@jedi/*` public APIs at **`0.1.x`** (Portfolio V2.0).
- **No** `@astryxdesign/*` in portfolio `package.json`; ESLint `no-restricted-imports` enforces.
- **`JediProviders`** from `@jedi/core` wraps site chrome; theme mode maps `dark` → gothic, `light` → neutral per JEDI-002.
- **URL stability:** `/`, `/work`, `/work/[slug]`, `/about`, `/leadership`, `/thinking`, and flagship static routes unchanged. New routes only for genuinely new content.
- **Amends ADR-001:** `@jedi/react` components allowed for chrome primitives; inline styles remain for editorial layer.
- **Amends ADR-023:** Token bridge via `@jedi/tokens/bridge.css`; JOP decision tokens retained for editorial until fully mapped.

## Consequences

### Positive

- Platform migration with clear replaceability boundary.
- Portfolio remains the product; JEDI serves it.
- Independent JEDI release cycle (see compatibility table below).

### Negative / Trade-offs

- GitHub Packages distribution via npm aliases (`@jedi/core` → `npm:@jon4ohio/jedi-core@0.1.0`); public identity remains `@jedi/*`.
- Full Astryx visual takeover deferred where it would harm recognition.

### Version compatibility

| Portfolio | Requires JEDI |
|-----------|---------------|
| V2.0 | `0.1.x` |
| V2.1 | `0.2.x` |
| V2.2 | `0.3.x` |
| V2.3 | `1.x` |

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner | Review |
|------|------------|--------|------------|-------|--------|
| IA creep during chrome swap | Med | High | Preservation checklist in PR review | Maintainer | Each V2.0 PR |
| Accidental `@astryxdesign` import | Low | Med | ESLint `no-restricted-imports` | Maintainer | CI lint |

## Review Schedule

- **Next review:** After Portfolio V2.0 production deploy
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- [ADR-001](ADR-001-inline-styles-for-layout-and-visuals.md) — amended in scope
- [ADR-023](ADR-023-figma-mcp-handoff-jop-tokens.md) — amended in scope
- [ADR-042](ADR-042-flagship-case-study-static-route-override.md) — preserved
- JEDI-001, JEDI-002, JEDI-003 (jedi repo)

## References

- [JEDI VISION](https://github.com/jon4ohio/jedi/blob/main/docs/VISION.md)
- [JEDI PUBLIC_API](https://github.com/jon4ohio/jedi/blob/main/docs/PUBLIC_API.md) — distribution aliases for GitHub Packages
- Portfolio V2 Preservation plan (2026-07-03)
