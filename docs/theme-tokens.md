# Theme Tokens Guide

## Scope
This project uses a 3-theme token system for visual consistency across:
- `light`
- `warm`
- `dark`

The active theme is applied via `data-theme` on the root html element.

## Warm theme (default): Claude-aligned palette

The **warm** theme is tuned to a warm-gray palette consistent with Claude’s product UI (scraped reference: `#f8f8f6` canvas, `#efeeeb`/`#e8e7e3` surfaces, `#121212` ink, coral accent `#d97757`).

- **Sand primitives** (`--jop-color-sand-*`) define that warm-gray ramp. Interpolated steps between scraped swatches exist so gradients and hovers have enough stops.
- **Clay primitives** (`--jop-color-clay-*`) are neutral warm grays for **subtle** gradients (dividers, quiet fills, text gradients). **Primary brand and interactive** gradients use `--jop-accent-brand` → `--jop-accent-orange` (coral) in `app/globals.css` under `:root, :root[data-theme="warm"]`.
- **Muted text:** Scraped `#7b7974` on `#f8f8f6` is below **WCAG 2.1 AA** (~4.1:1) for normal text. `--jop-text-muted` / `--jop-text-subtle` use **`#5a5855`** (sand-80) so secondary copy meets AA on both canvas and `--jop-bg-surface-subtle` (`#e8e7e3`).
- **Browser UI chrome:** `viewport.themeColor` for light scheme uses `#f8f8f6` to match `--jop-color-sand-10` / canvas (`app/layout.tsx`).

`light` and `dark` themes do not use sand/clay for their main surfaces; they keep their own decision-token overrides.

## Token Tiers
Use two tiers only:

1. **Primitives**: `--jop-color-{hue}-{step}`
   - Examples: `--jop-color-violet-70`, `--jop-color-slate-20`, `--jop-color-sand-40`

2. **Decision tokens**: `--jop-{category}-{intent}-{state?}`
   - Examples: `--jop-text-primary`, `--jop-border-default`, `--jop-fill-brand-gradient`

Do not consume primitives directly in components. Components should only reference decision tokens (or compatibility aliases).

## Compatibility Aliases
Legacy aliases are preserved in `app/globals.css`:
- `--bg`, `--fg`, `--border`, `--surface`, etc.
- These map to `jop` decision tokens to keep existing inline styles stable.

New code should prefer decision tokens first, then aliases only when needed for consistency with existing files.

## Rules for Contributors
- No raw hex/rgb/rgba in TSX inline styles for themed UI.
- No theme-specific branching in components when a token can express it.
- Keep token names stable across themes; only values change per theme block.
- Use gradient decision tokens for all reusable gradients.

## Migration Checklist
- [ ] Add primitive values to `:root`.
- [ ] Add/update `:root[data-theme=\"light\"]`, `:root[data-theme=\"warm\"]`, `:root[data-theme=\"dark\"]`.
- [ ] Map compatibility aliases.
- [ ] Replace hardcoded colors in components/pages with decision tokens.
- [ ] Verify all pages in all 3 themes.

## Interaction + Hierarchy Checklist
- [ ] Theme control uses accessible semantics (`radiogroup`/`radio` or equivalent) with keyboard arrow support.
- [ ] Theme changes persist to `localStorage` and update `data-theme` on `html`.
- [ ] Mobile navigation state closes on route transitions.
- [ ] Focus-visible behavior is equivalent to hover cues for interactive controls.
- [ ] Each page has one primary `h1`; sections progress with consistent `h2`/`h3` structure.
- [ ] Landmark labels (`aria-label`) are present for major navigation and metric regions.

## QA Matrix
- **Themes:** `light`, `warm`, `dark`
- **Pages:** `/`, `/work`, `/work/[slug]`, `/about`, `/leadership`, `not-found`
- **Breakpoints:** desktop, `<=900px`, `<=640px`
- **Flows:** first load, refresh persistence, route change, theme switch while mobile menu is open, keyboard-only navigation

## See also
- **[Figma JOP structure](./figma-jop-structure.md)** — auto layout, atomic **Atom / Mol / Org / Section / Page** naming, and Figma variable paths that mirror `--jop-*` tokens (JOS/JOP design system in Figma).
