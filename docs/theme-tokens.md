# Theme Tokens Guide

## Scope
This project uses a 2-theme token system for visual consistency across:
- `dark` (default) — slate + violet decision tokens
- `light` — soft sage/lavender pastels with subtle gradients

The active theme is applied via `data-theme` on the root html element. Legacy `warm` storage values migrate to `light`.

## Light theme: Framer-inspired palette

The **light** theme uses a calming sage/lavender/forest palette (reference: [Godspower Ehioze leave case study](https://ehiozegodspowerebiowei.framer.website/leave-case-study)).

- **Sage primitives** (`--jop-color-sage-*`) — canvas (`#f7faf8`), mint surfaces, impact gradients.
- **Cream primitives** (`--jop-color-cream-*`) — raised card fills.
- **Lavender primitives** (`--jop-color-lavender-*`) — image chrome and soft accent washes.
- **Forest primitives** (`--jop-color-forest-*`) — brand accent, emphasis bands, interactive gradients.
- **Muted text:** `--jop-text-muted` / `--jop-text-subtle` use **`#55695b`** (sage-80) for WCAG AA on canvas and surface-subtle.
- **Browser UI chrome:** `viewport.themeColor` for light scheme uses `#f7faf8` to match `--jop-color-sage-5` / canvas (`app/layout.tsx`).

`dark` keeps slate + violet decision tokens; it does not use sage/cream/lavender/forest for main surfaces.

## Token Tiers
Use two tiers only:

1. **Primitives**: `--jop-color-{hue}-{step}`
   - Examples: `--jop-color-sage-40`, `--jop-color-lavender-50`, `--jop-color-slate-20`

2. **Decision tokens**: `--jop-{category}-{intent}-{state?}`
   - Examples: `--jop-text-primary`, `--jop-border-default`, `--jop-fill-impact-gradient`

Do not consume primitives directly in components. Components should only reference decision tokens (or compatibility aliases).

## Gradient tokens

| Token | Light theme use |
|-------|-----------------|
| `--jop-fill-neutral-gradient` | Page canvas wash (`body`) |
| `--jop-fill-impact-gradient` | Metric badges, impact summary chips |
| `--jop-fill-accent-gradient` | Image chrome (`--asset-chrome-gradient`) |
| `--jop-fill-brand-gradient` | Forest CTA / interactive fills |

## Compatibility Aliases
Legacy aliases are preserved in `app/globals.css`:
- `--bg`, `--fg`, `--border`, `--surface`, etc.
- `--asset-chrome-gradient` → `--jop-fill-accent-gradient`
- These map to `jop` decision tokens to keep existing inline styles stable.

New code should prefer decision tokens first, then aliases only when needed for consistency with existing files.

## Rules for Contributors
- No raw hex/rgb/rgba in TSX inline styles for themed UI.
- No theme-specific branching in components when a token can express it.
- Keep token names stable across themes; only values change per theme block.
- Use gradient decision tokens for all reusable gradients.

## Migration Checklist
- [ ] Add primitive values to `:root`.
- [ ] Add/update `:root[data-theme="light"]` and `:root[data-theme="dark"]`.
- [ ] Map compatibility aliases.
- [ ] Replace hardcoded colors in components/pages with decision tokens.
- [ ] Verify all pages in both themes.

## Interaction + Hierarchy Checklist
- [ ] Theme control uses accessible semantics (`radiogroup`/`radio` or equivalent) with keyboard arrow support.
- [ ] Theme changes persist to `localStorage` and update `data-theme` on `html`.
- [ ] Mobile navigation state closes on route transitions.
- [ ] Focus-visible behavior is equivalent to hover cues for interactive controls.
- [ ] Each page has one primary `h1`; sections progress with consistent `h2`/`h3` structure.
- [ ] Landmark labels (`aria-label`) are present for major navigation and metric regions.

## QA Matrix
- **Themes:** `light`, `dark`
- **Pages:** `/`, `/work`, `/work/[slug]`, `/about`, `/leadership`, `/thinking`, `not-found`
- **Breakpoints:** desktop, `<=900px`, `<=640px`
- **Flows:** first load, refresh persistence, route change, theme switch while mobile menu is open, keyboard-only navigation

## See also
- **[Figma JOP structure](./figma-jop-structure.md)** — auto layout, atomic **Atom / Mol / Org / Section / Page** naming, and Figma variable paths that mirror `--jop-*` tokens.
- **[ADR-070](./adrs/ADR-070-soft-light-theme-framer-palette.md)** — warm removal and Framer palette adoption.
