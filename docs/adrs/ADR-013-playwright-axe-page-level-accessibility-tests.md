# ADR-013: Playwright and axe page-level accessibility tests

## Status

**Status:** Accepted  
**Date:** 2026-04-11  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

The portfolio already uses semantic tokens and targeted UX/a11y fixes (ADR-005), but regressions in contrast, ARIA usage, and other WCAG issues are easiest to catch on **rendered pages** in a real browser. Token-level contrast checks and code review do not replace DOM-aware rules (stacked backgrounds, overlays, dynamic content).

The codebase had no automated end-to-end or accessibility test runner.

**In scope:** add automated page-level accessibility scans using Playwright and axe-core, wired to npm scripts and documented for local/CI-style runs.  
**Out of scope:** replacing manual keyboard or screen-reader testing; full E2E functional tests; GitHub Actions workflow (optional follow-up).

## Decision Drivers

- Catch serious/critical WCAG 2 A/AA-tagged issues that only appear in the live DOM.
- Keep the stack minimal: one browser driver, one a11y engine, no duplicate test frameworks.
- Runs must use a **production build** (`next start`) so results match deployed behavior.
- Tests must be maintainable when routes or project slugs change.

## Options Considered

### Option A: Playwright + @axe-core/playwright (chosen)

- **Description:** Add `@playwright/test` and `@axe-core/playwright`. Configure `playwright.config.ts` with `webServer` running `npm run start` and a fixed `baseURL`. Add `tests/a11y/routes.spec.ts` that visits key routes and fails on critical/serious violations under `wcag2a` + `wcag2aa` tags.
- **Pros:** industry-standard; exercises real Chromium; axe rules align with Deque tooling; integrates with future E2E if needed.
- **Cons:** adds dev dependencies and requires `playwright install` for browsers.
- **Effort:** Medium
- **Notes:** Matches the page-level sweep plan; gate on serious/critical to limit noise from moderate axe findings.

### Option B: pa11y CLI or Lighthouse CI only

- **Description:** Run pa11y or Lighthouse against URLs in a script without Playwright.
- **Pros:** lighter than full Playwright in some setups.
- **Cons:** less flexible for multi-route suites and future interaction tests; separate tooling from a potential E2E path.
- **Effort:** Medium
- **Notes:** Rejected for this repo to keep one browser automation stack.

## Decision

**We will use Option A because it provides reliable, DOM-accurate axe scans with a clear path to expand tests later.**

Production server startup in config ensures scans reflect built output. Serious/critical gating balances strictness with maintainability.

## Consequences

### Positive

- Key routes (`/`, `/work`, `/about`, `/leadership`, one case study, 404) are scanned on demand.
- Violations surface in CI-style runs (`test:a11y:ci`) before release.
- Complements ADR-005 by automating regression detection after manual polish.

### Negative / Trade-offs

- First-time setup requires `npx playwright install` (documented in README).
- axe results are **heuristic**; some findings need human judgment.
- Failing scans require token or markup fixes (as with emphasis contrast and `role="group"` fixes discovered during rollout).

### Operational Impact

- Run `npm run build && npm run test:a11y` (or `test:a11y:ci`) before major releases or a11y-sensitive changes.
- Playwright artifacts (`test-results/`, `playwright-report/`) are gitignored.
- **Migration / rollback:** remove scripts and devDependencies if the suite is abandoned; no runtime impact on the site.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Route or data changes break the case-study URL in tests | Low | Med | Derive slug from `lib/projects.ts` (`projects[0]`); update test if data contract changes | Maintainer | Changes to `lib/projects.ts` or `/work/[slug]` routing |

## Review Schedule

- **Next review:** 2026-07-11
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-005 — prior audit-driven UX/a11y polish and token conventions.
- ADR-007 — theme tokens and contrast; a11y tests validate tokens in context.

## References

- `playwright.config.ts`
- `tests/a11y/routes.spec.ts`
- `package.json` (`test:a11y`, `test:a11y:ci`)
- `README.md` (Accessibility automated section)
- `.gitignore` (Playwright output dirs)
