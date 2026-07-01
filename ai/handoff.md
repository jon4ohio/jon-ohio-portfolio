# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-07-01

---

## Delta

- **ADR-073** accepted (merged #181): WIP badge (`workInProgress` + `WorkInProgressBadge`), static dark theme default, homepage headline → *I design systems that scale.*
- **ADR-074** accepted: shared `MediaViewTrigger` for inspectable case study images; SeamKit brand figure sync.
- **Context arbitration:** controlled experiment complete (maintainer); observational phase open — `ai/session-arbitration.md` + `.cursor/rules/anchor-session-arbitration.mdc` (see Anchor meta-repo `releases/v0.2/context-arbitration-experiment.md`).
- **Uncommitted (local):** FigJam embed reset view + dual-gate placeholder timing (`FigJamEmbedFrame.tsx`); AnnotatedFigure footer cleanup; ADR LOG entries for FigJam amendments.

## Horizon

1. **Observational phase** — use adapter during normal work; log field observations in Anchor experiment worksheet
2. FigJam embed work — commit when ready
3. Normal portfolio work on `cursor/wip-badge-95593-adr`

## Next

- FigJam uncommitted changes — review and commit
- Record observational sessions (adapter feel, overrides, Observation outcomes) in Anchor meta-repo experiment log

## Blocked

None.

## Branch / PR

- **Branch:** `cursor/wip-badge-95593-adr` (up to date with origin)
- **Latest merge:** origin/main + ADR-074 docs

## Session coordination

Pass 1 manual protocol replaced by **session arbitration** adapter. See `ai/session-arbitration.md`.

At session start: Orientation → resolve responsibility → Session → minimum context bundle.  
At session end: Observation → update Handoff only if responsibility moved.

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-07-01 | AI reconstructed from git instead of Handoff | Handoff | No delegated responsibility resolution; Handoff stale | Session arbitration adapter + experiment |

**Graduation rule:** Unchanged items after three cycles promote or delete.

---

## Pointers

- Entry: `docs/project/entry.md`
- ADR-073: `docs/adrs/ADR-073-case-study-progress-status-dark-default-homepage-headline.md`
- ADR-074: `docs/adrs/ADR-074-shared-media-view-trigger-inspectable-images.md`
- Experiment (meta-repo): Anchor `releases/v0.2/context-arbitration-experiment.md`
