# Content extraction (V2.2)

Portfolio case study **source of truth** remains `lib/projects.ts` during V2.2. This directory holds extracted, graph-addressable content for knowledge cross-links and future CMS-free publishing — **without changing IA or URLs**.

## Layout

```
content/
  README.md           — this file
  projects/           — per-slug JSON mirrors (incremental extraction)
  graph/              — optional static graph snapshots
```

## Extraction rules

1. **No route changes** — `/work/[slug]` and flagship static overrides stay canonical.
2. **Extract metadata first** — title, summary, tags, metrics before long-form blocks.
3. **Graph IDs** — align with `lib/graph.ts` (`project:{slug}`).
4. **Dual-write window** — update `lib/projects.ts` and `content/projects/{slug}.json` together until ADR-077 migration completes.

## Example

See `content/projects/seamkit.json` for the minimal metadata mirror pattern.
