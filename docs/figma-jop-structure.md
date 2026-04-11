# Figma structure: auto layout, atoms, and JOP tokens

This file is the **Figma-side contract** for the portfolio. Code uses **`--jop-*` CSS variables** (see [theme-tokens.md](./theme-tokens.md)). In Figma, use the same **JOP** naming (informal shorthand **JOS** = John Ohio System in design files refers to this same set).

## 1. Variable collections (mirror code)

Use **Figma variables** with slash-separated paths so they align with CSS:

| Tier | CSS example | Figma path pattern |
|------|----------------|-------------------|
| Primitives | `--jop-color-sand-40` | `jop/primitive/color/sand/40` |
| Primitives | `--jop-color-violet-80` | `jop/primitive/color/violet/80` |
| Decision | `--jop-text-primary` | `jop/decision/text/primary` |
| Decision | `--jop-border-default` | `jop/decision/border/default` |
| Decision | `--jop-accent-brand` | `jop/decision/accent/brand` |

**Modes:** Create variable modes **light**, **warm**, **dark** to match `data-theme` in the app. Decision tokens change per mode; primitive ramps stay in shared collections where possible.

**Gradients:** Store as Figma styles or variables per product policy; code uses `--jop-fill-brand-gradient` and related decision tokens—name Figma entries `jop/decision/fill/brand-gradient`, etc.

Do not invent parallel names (e.g. `Brand / Coral` only); bind fills and strokes to **JOP** variables so MCP and handoff stay traceable.

## 2. Auto layout rules

- **Page frame:** Direction **vertical**, alignment **top + stretch width**, **fill** horizontal sizing to the page width you are designing (e.g. 1440 desktop). Use **layout grid** or a max-width wrapper at **1240** to match the site content width.
- **Sections:** Each major vertical band is its own auto-layout frame: direction **vertical**, gap from a spacing variable (see §3). Prefer **hug** height unless the section must fill viewport (then **fixed** height with internal fill).
- **Rows (grids):** Direction **horizontal**, wrap if needed, **space-between** or **gap** from spacing variables; align **top** or **center** per design.
- **Cards and chips:** Inner padding from spacing variables; corner radius from a single `jop/radius/*` scale if you add one in Figma (code uses mixed values—normalize in Figma for consistency).
- **Resizing:** Set explicit **min/max width** on responsive targets (e.g. nav tray, cards) where the site uses breakpoints; label variants `Desktop` / `Tablet` / `Mobile` as separate frames or component sets.

## 3. Spacing scale (Figma-only until codified)

The repo does not yet expose `--jop-space-*` tokens everywhere; in Figma define a small shared scale and use it for gap/padding:

| Token path | Suggested value (px) | Use |
|------------|----------------------|-----|
| `jop/space/1` | 4 | Tight stacks, icon gaps |
| `jop/space/2` | 8 | Default inner padding steps |
| `jop/space/3` | 12 | |
| `jop/space/4` | 16 | Section gap (tight) |
| `jop/space/5` | 24 | Section gap (default) |
| `jop/space/6` | 32 | Section gap (loose) |
| `jop/space/7` | 48 | Major section breaks |

Bind auto-layout **gap** and **padding** to these variables, not raw numbers.

## 4. Atomic structure (components)

Build **small, reusable pieces** before pages:

| Layer | Prefix | Examples |
|-------|--------|----------|
| **Atom** | `Atom /` | `Atom / Text / Body`, `Atom / Text / Eyebrow`, `Atom / Button / Primary`, `Atom / Logo Mark` |
| **Molecule** | `Mol /` | `Mol / Nav Link`, `Mol / Metric Badge`, `Mol / Work Card Thumbnail` |
| **Organism** | `Org /` | `Org / Site Nav`, `Org / Footer`, `Org / Hero Home` |
| **Section** | `Section /` | `Section / Metrics Strip`, `Section / Featured Work`, `Section / Case Study / Content` |
| **Page** | `Page /` | `Page / Home`, `Page / Work Index`, `Page / Case / Ibedc` |

**Rules:**

- Atoms do not embed full organisms; compose **upward**.
- Published **components** should live in a team library file when possible; this portfolio file can instance from library or local main components.
- Variants: use **component properties** for theme (if needed), size, and state (default / hover / pressed) rather than duplicating frames.

## 5. Frame and section naming

Use **Title Case** after the prefix. Patterns:

- **Pages:** `Page / {Name}` — e.g. `Page / Leadership`.
- **Sections:** `Section / {Purpose}` — e.g. `Section / Hero`, `Section / Work Grid`. For case studies: `Section / Challenge`, `Section / Outcome`.
- **Imported captures:** Rename html-to-design output from generic names to the patterns above as soon as you consolidate; keep one **cover** frame per page for thumbnails.

**Avoid:** `Frame 427`, `Group 3`, or untyped names. **Do:** rename layers inside sections (`Heading`, `Eyebrow`, `CTA row`) for accessibility handoff and Code Connect.

## 6. MCP and maintenance

- **`get_design_context`:** Works best when frames use components and variables; generated code maps more cleanly to [theme-tokens.md](./theme-tokens.md).
- **`use_figma` / `search_design_system`:** Prefer **instancing** existing `Atom/*` and `Org/*` components over drawing new rectangles.
- After **generate_figma_design** imports, refactor captures into **components + auto layout** rather than leaving flat groups.

## 7. Quick checklist

- [ ] Color and text use **JOP** variables (primitive or decision), not one-off hex.
- [ ] Sections and pages use **auto layout** with gap/padding from **space** variables.
- [ ] Layers follow **Atom / Mol / Org / Section / Page** naming.
- [ ] Light / warm / dark modes defined for decision tokens where the site differs.
- [ ] Max content width **1240** respected for main editorial columns.
