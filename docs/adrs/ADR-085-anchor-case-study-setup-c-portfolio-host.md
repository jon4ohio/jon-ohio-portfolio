# ADR-085: Anchor case study hosted on the portfolio (Setup C)

## Status
**Status:** Accepted  
**Date:** 2026-07-15  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None

## Context

Anchor ([jon4ohio/anchor](https://github.com/jon4ohio/anchor)) needs a memorable public entry from this portfolio. Earlier exploration considered GitHub Pages in-repo (Setup A), README-as-landing (Setup B), and a portfolio-hosted editorial page (Setup C). Parallel drafts ranged from a framework docs homepage to a dense multi-scroll “experience”; the Scales-inspired restraint settle was a **five-moment editorial case study**.

The portfolio already adopts Anchor for session coordination. That must not turn the marketing site into Anchor’s documentation portal, nor replace the repository as the source of framework truth.

**In scope:** Where the case study URL lives; primary CTA destination; separation of marketing story vs engineering proof; page-local visual identity for `/work/anchor`.  
**Out of scope:** Changing Anchor’s contract model; GitHub Pages hosting; rewriting Anchor README as the landing; embedding the seven-contract docs catalog on the portfolio.

## Decision Drivers

- Preserve portfolio purpose as Design Engineering demonstration, not a docs portal.
- Visitor flow: Portfolio → case study story → GitHub → documentation.
- Avoid duplicating Anchor documentation between portfolio and repository.
- Keep ink/teal editorial identity page-local without churning the marketing-shell theme (ADR-084 / ADR-007).
- Problem-first listing copy before framework labels.

## Options Considered

### Option A: GitHub Pages in the Anchor repo
- **Description:** Host the five-moment page on `jon4ohio.github.io/anchor`; portfolio case study links there.
- **Pros:** Page lives with the framework; custom URL without touching portfolio chrome.
- **Cons:** Splits story from portfolio evidence surface; portfolio “case study” becomes an off-site hop before visitors see Jon’s work context; Pages ops on Anchor during v0.2 freeze.
- **Effort:** Medium
- **Notes:** Viable but weakens portfolio → proof cohesion.

### Option B: README-as-landing only
- **Description:** Portfolio links straight to `github.com/jon4ohio/anchor`; README carries hero + diagram + pillars.
- **Pros:** Lowest friction; single source of truth in repo.
- **Cons:** Cannot deliver the scroll-chain editorial experience; GitHub UI undercuts Scales-level pacing.
- **Effort:** Low
- **Notes:** Rejected for the approved five-moment design.

### Option C: Portfolio hosts `/work/anchor`; repo remains engineering CTA
- **Description:** Five-moment editorial page at `/work/anchor` inside this portfolio; primary CTAs open the Anchor GitHub repo and journey artifacts; catalog entry is problem-first with a chain-style preview thumb.
- **Pros:** Story and evidence sit with the Design Engineering body of work; repo stays proof surface; marketing, evidence, and engineering stay separated.
- **Cons:** Portfolio must ship and maintain a distinct page module; risk of docs drift if authors paste contracts onto the page.
- **Effort:** Medium
- **Notes:** Chosen. Mitigation: ADR + out-of-scope exclusion of seven-contract explainer.

## Decision

**We will use Option C (Setup C)** because Decision Drivers require the portfolio to tell the story and the repository to provide the proof, without turning either into a duplicate documentation portal.

Rationale captured as operating rules:

- Keep marketing, evidence, and engineering separate.
- Use the portfolio to tell the story.
- Use the repository to provide the proof.
- Avoid duplicating documentation between the two.

## Consequences

### Positive
- `/work/anchor` is listable in Case Studies and Selected Work with problem-first summary.
- Scoped fonts and ink/teal tokens stay on the page — marketing shell identity unchanged.
- CTAs drive curiosity into GitHub rather than replacing Start Here / contracts.

### Negative / Trade-offs
- Two surfaces to keep aligned (case study claims vs repo status); honesty on validation status must not become inflated “trusted by” claims.
- Preview SVG and editorial page must stay idea-led (chain + tagline), not logo candy.

### Operational Impact
- New route package under `app/work/anchor/`; project row in `lib/projects.ts`; FEATURED + homepage wiring.
- **Migration / rollback:** Remove route, catalog entry, and listing rows; ADR remains historical record.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Case study accretes seven-contract / docs-homepage content | Med | Med | Out-of-scope in this ADR; reject PRs that paste Entry/contract catalogs onto `/work/anchor` — link to repo instead | Owner | Any content PR that adds a contracts explainer section |
| Portfolio summary drifts from Anchor’s honest v0.2 status | Med | Med | Quiet status line only; no adopter-count dashboard; verify against Anchor handoff before major launches | Owner | Anchor status milestone or external adoption claim |

## Review Schedule

- **Next review:** After first external adopter signal, or three months from Accept date
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-001 — constrains: inline styles for layout/visuals (Anchor page follows)
- ADR-007 — constrains: dual theme remains on shell; Anchor page-local palette does not replace tokens
- ADR-083 — related: editorial case-study direction; Anchor uses a custom five-moment spine, not rail kit
- ADR-084 — related: marketing shell coexistence with Nav/Footer/PageCrumbHeader

## References

- Anchor repository: https://github.com/jon4ohio/anchor
- Implementation: `app/work/anchor/`, `public/assets/work/anchor/preview-16x9.svg`, `lib/projects.ts` (`slug: "anchor"`)
- Scales pacing reference (structure only): https://jeromantik.de/scales-landing
