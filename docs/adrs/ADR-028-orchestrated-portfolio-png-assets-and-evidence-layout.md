# ADR-028: Orchestrated portfolio — PNG evidence assets, hero refresh, and block layout

## Status

**Status:** Accepted  
**Date:** 2026-04-13  
**Decision Maker(s):** Jon Ohio (Product Design Lead)  
**Supersedes:** None

## Context

The `orchestrated-portfolio` case study accumulated screenshot evidence (Codex review, ADR gate, Figma canvas, Cursor session) and a refreshed homepage hero for listing + case study lead art. Source files were exported with `.png` extensions but sometimes contained **JPEG bytes**, which breaks MIME/extension expectations and tooling.

**In scope:** `public/assets/work/orchestrated-portfolio/*` PNG assets (real PNG encoding), `assets.hero` / `thumbnails[0]` alignment, and `assets.blocks` structure in [`lib/projects.ts`](../../lib/projects.ts).  
**Out of scope:** Changing case study narrative fields beyond asset references; other projects.

## Decision Drivers

- **Encoding correctness:** file extension must match image bytes (avoid repeat of Codex catch).  
- **Preview consistency:** `hero` and `thumbnails[0]` stay identical per ADR-022.  
- **Scanability:** evidence grouped with `callout` headers; review + governance side-by-side via `gallery` columns.

## Options Considered

### Option A: Keep JPEG assets under `.jpg` paths only

- **Pros:** Smaller files; straightforward.  
- **Cons:** Mixed policy vs “PNG evidence” goal; still need dimension metadata.  
- **Effort:** Low  

### Option B: Normalize to real PNG bytes on disk + update references (chosen)

- **Description:** Convert mislabeled sources to true PNG (or re-export), store under `.png`, set `width`/`height` to measured pixels, update `lib/projects.ts`.  
- **Pros:** Matches stated artifact format; safer for static hosting and reviewers.  
- **Cons:** Larger assets; one-time conversion step.  
- **Effort:** Medium  

## Decision

**We will use Option B** so evidence screenshots are **real PNGs**, hero/thumb stay aligned, and blocks use **callouts + 2-column gallery** for review/governance proof.

## Consequences

### Positive

- Predictable MIME handling for static assets  
- Clear visual hierarchy on the case study page  

### Negative / Trade-offs

- PNGs can be heavier than JPEG for photo-like screenshots  

### Operational Impact

- **Migration / rollback:** Restore prior `lib/projects.ts` asset paths and files; remove new PNGs if reverting.  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| `.png` files committed with non-PNG bytes | Low | High | `file` + `sips` check before commit; convert with `sips -s format png` | Product Design Lead | Any new screenshot asset |

## Review Schedule

- **Next review:** Next portfolio visual refresh or when replacing hero art again  
- **Review owner:** Product Design Lead  

## Related ADRs

- ADR-022 — relationship: constrains (hero + aligned thumbnails)  
- ADR-027 — relationship: complements (evidence integration narrative)  
- ADR-008 — relationship: referenced (governance gate evidence)  

## References

- [`lib/projects.ts`](../../lib/projects.ts) — `orchestrated-portfolio`  
- `public/assets/work/orchestrated-portfolio/`  
