# ADR-061: SeamKit case study — executive evidence narrative and Figma asset sync

## Status
**Status:** Accepted
**Date:** 2026-06-25
**Decision Maker(s):** John Ohio
**Supersedes:** ADR-052

## Context

Project: `jon-ohio-portfolio` (Next.js App Router portfolio).

The SeamKit flagship case study (`/work/seamkit`) had placeholder SVG figures and a narrative order that led with diagnosis (Core Tensions) before proof (audit findings). Real Figma evidence frames were available in Portfolio file `HNS3VdAyubm38nx5aYVZOR` (page frame `29571:31326`). ADR-052 (Draft) prescribed dashed placeholder containers while awaiting artifacts — those artifacts are now exported.

Hiring managers and Staff/Lead reviewers need **Evidence → Diagnosis → Decision → Outcome** scan order, not a feature catalog.

**In scope:** SeamKit static route (`app/work/seamkit/page.tsx`), `lib/projects.ts` seamkit `assets`, Figma export map for seamkit, optional `AnnotatedFigure.decisionLabel` extension, ADR-052 supersession.
**Out of scope:** Migrating SeamKit to ADR-058 canonical six-chapter labels (FetsProza template); polished Figma raster for the before/after transformation strip; fixing mislabeled Figma governance caption node `29659:24992`.

## Decision Drivers

- Proof density: no placeholder SVGs or dashed frames where real screenshots exist.
- Executive scan: evidence and audit metrics before tension framing.
- Judgment signal: ADR-style decision blocks distinct from italic captions.
- Asset pipeline: `@2x` exports via `scripts/export-figma-assets.mjs` remain the single source for figure filenames.
- Backward compatibility: `AnnotatedFigure` defaults unchanged for other case studies.

## Options Considered

### Option A: Keep ADR-052 placeholder containers until all figures ship
- **Description:** Retain dashed-frame placeholders for governance, adoption, and hierarchy slots.
- **Pros:** No content churn; minimal diff.
- **Cons:** Undermines credibility now that Figma frames exist; prolongs Draft ADR-052 indefinitely.
- **Effort:** Low
- **Notes:** Rejected — artifacts are ready.

### Option B: Export Figma assets + reorder narrative IA (chosen)
- **Description:** Export 10+ evidence frames; restructure page to Brief → Evidence Behind the Decision → transformation strip → Tensions → Evidence in Practice (four layers) → Outcomes → Designed to Evolve; wire real `AnnotatedFigure` images; sync `lib/projects.ts` blocks.
- **Pros:** Executive reading order; real proof; retires placeholders; aligns with flagship evidence patterns (ADR-028, ADR-047).
- **Cons:** Large `page.tsx` diff; SeamKit keeps sister-flagship chapter labels (not ADR-058 canonical names yet).
- **Effort:** Medium
- **Notes:** Layer rhythm uses Problem → Decision → Intervention → Evidence → Decision blocks per layer.

### Option C: Migrate SeamKit fully to ADR-058 canonical IA in one pass
- **Description:** Rename all chapters to Snapshot / Challenge / Strategy / Decisions / Impact / Reflection.
- **Pros:** Full template parity with FetsProza.
- **Cons:** High copy churn; design-system story maps awkwardly to operator-first template without dedicated editing pass.
- **Effort:** High
- **Notes:** Deferred — Option B ships evidence first.

## Decision

**We will use Option B** because real artifacts and executive narrative sequencing deliver the highest hiring-signal return without forcing a full ADR-058 relabel in the same release.

Chapter nav: `01 Brief · 02 Evidence · 03 Tensions · 04 Evidence in Practice · 05 Outcomes · 06 Designed to Evolve`. Section `validation` holds audit findings and FigJam workshop figure. A net-new inline before/after transformation strip sits between Evidence and Tensions. Layer chips use merged titles (`Layer 01 — Foundations`). Outcomes lead with **Business Impact** then **System Health**. `AnnotatedFigure` gains optional `decisionLabel="Decision"` for ADR-style blocks; validation findings use local `Finding` blocks.

## Consequences

### Positive
- SeamKit case study shows real Figma evidence (hierarchy, governance, adoption analytics, component library, docs).
- Readers encounter audit metrics before tension cards — proof before diagnosis.
- ADR-052 placeholder strategy is explicitly retired.
- `lib/projects.ts` blocks and thumbnails no longer reference `block-hypothesis`, `block-approach`, or placeholder SVGs.

### Negative / Trade-offs
- SeamKit chapter IA still diverges from ADR-058 canonical labels — follow-up migration required for full portfolio consistency.
- Transformation strip is code-only (not yet a Figma asset) — acceptable v1 per plan.

### Operational Impact
- Re-export seamkit assets with `FIGMA_TOKEN` and `node scripts/export-figma-assets.mjs` when Figma frames change.
- **Migration / rollback:** Revert `app/work/seamkit/page.tsx` and asset map; restore ADR-052 only if placeholders are reintroduced (not recommended).

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Bulk Figma export script overwrites unrelated project PNGs | Med | Med | Scope export runs to seamkit slug only; review `git diff public/assets` before commit | Maintainer | Any `export-figma-assets.mjs` run touching non-target slugs |
| `decisionLabel` styling keyed on string equality `"Decision"` | Low | Low | Document prop contract in ADR; consider enum or `decisionStyle` flag if reused beyond SeamKit | Maintainer | Third case study adopts ADR blocks |

## Review Schedule

- **Next review:** When migrating SeamKit to ADR-058 canonical chapter IA
- **Review owner:** John Ohio

## Related ADRs

- ADR-052 — superseded (placeholder containers no longer needed)
- ADR-062 — follow-up: validation findings grouped in one labeled block (presentation only; stats unchanged)
- ADR-028 — depends on: PNG evidence asset pattern
- ADR-042 — depends on: static route override for flagship case studies
- ADR-058 — constrains: future SeamKit chapter relabel migration
- ADR-023 — constrains: Figma MCP handoff and JOP tokens for any Figma edits

## References

- `app/work/seamkit/page.tsx`
- `lib/projects.ts` (seamkit entry)
- `scripts/figma-asset-map.json`
- `components/case-study/AnnotatedFigure.tsx`
- Figma: `https://www.figma.com/design/HNS3VdAyubm38nx5aYVZOR/Portfolio_-John-Ohio?node-id=29571-31326`
