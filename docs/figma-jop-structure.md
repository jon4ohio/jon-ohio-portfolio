# Figma structure: auto layout, atoms, and JOP tokens

This file is the **Figma-side contract** for the portfolio. Code uses **`--jop-*` CSS variables** (see [theme-tokens.md](./theme-tokens.md)). In Figma, use the same **JOP** naming (informal shorthand **JOS** = John Ohio System in design files refers to this same set).

## 1. Variable collections (mirror code)

The live file is **Portfolio_ John Ohio** (`fileKey` in [`scripts/figma-asset-map.json`](../scripts/figma-asset-map.json)). Local collections:

| Collection | Modes | Contents |
|------------|-------|----------|
| **JOP / Primitives / Color** | `default` | `jop/primitive/color/...` — sage, cream, lavender, forest, grey, violet, teal, slate ramps (aligned with `:root` primitives in `app/globals.css`). |
| **JOP / Decision / Theme** | `light`, `dark` | `jop/decision/...` — canvas, surfaces, text, borders, accents, overlays, backdrops, etc., aligned to `data-theme`. |
| **JOP / Layout / Space** | `default` | `jop/space/1`–`7` → 4–48 px for gap and padding (see §3). |

Apply **explicit variable mode** on frames when previewing non-default themes (Figma: variable mode picker per frame).

Slash-separated variable paths align with CSS:

| Tier | CSS example | Figma path pattern |
|------|----------------|-------------------|
| Primitives | `--jop-color-sage-40` | `jop/primitive/color/sage/40` |
| Primitives | `--jop-color-violet-80` | `jop/primitive/color/violet/80` |
| Decision | `--jop-text-primary` | `jop/decision/text/primary` |
| Decision | `--jop-border-default` | `jop/decision/border/default` |
| Decision | `--jop-accent-brand` | `jop/decision/accent/brand` |

**Modes:** Create variable modes **light** and **dark** to match `data-theme` in the app. Decision tokens change per mode; primitive ramps stay in shared collections where possible.

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

Use the **remote Figma MCP** at `https://mcp.figma.com/mcp` for a two-way loop in chat: read tools pull design context from Figma; write/capture tools (`use_figma`, `generate_figma_design`) push or edit the canvas. This repo uses **remote-only** — do not configure `figma-desktop` / `localhost:3845`.

### MCP setup

1. Copy [`docs/mcp.json.example`](./mcp.json.example) to `.cursor/mcp.json` (project root).
2. **Restart Cursor** so MCP config reloads.
3. Open **Cursor Settings → MCP**, find **`figma`**, and complete **Connect** / **Login with Figma** (OAuth).
4. Verify: `whoami` on the `figma` server should return your Figma user/plan.

If both the Figma plugin and `.cursor/mcp.json` register a server named `figma`, keep only one entry in MCP settings to avoid duplicates.

`FIGMA_TOKEN` in `.env.local` is for `npm run export:figma-assets` (REST API) — separate from MCP OAuth.

### Site URLs (for capture into Figma)

With `npm run dev`, pass the **full URL including path** to tools like `generate_figma_design`:

| Use | URL pattern |
|-----|-------------|
| Local base | `http://localhost:3000` |
| Homepage | `http://localhost:3000/` |
| Work index | `http://localhost:3000/work` |
| Case study | `http://localhost:3000/work/<slug>` (slug from `lib/projects.ts`) |
| Other pages | `http://localhost:3000/about` |

For production capture, use the deployed origin instead of localhost.

### Figma file URLs (for MCP tools)

From `https://www.figma.com/design/{fileKey}/...?node-id=1-2`:

- **`fileKey`** — first path segment after `/design/` (use branch key as `fileKey` for branch URLs).
- **`nodeId`** — convert `node-id` by replacing the hyphen between numbers with a colon (e.g. `1-2` → `1:2`).

### Which flow to use

| Goal | Tools / approach |
|------|------------------|
| Import a running page into Figma (pixel capture) | `generate_figma_design` (poll `captureId` until complete); target `newFile`, `existingFile` + `fileKey`, or `clipboard` |
| Build or edit frames with the team design system | `search_design_system` + `use_figma` (load the `figma-use` skill before `use_figma` when available) |
| Implement or align code with a Figma frame | `get_design_context` + adapt output to this repo (inline styles, `lib/projects.ts`); follow §7 and [ADR-023](./adrs/ADR-023-figma-mcp-handoff-jop-tokens.md) |
| Map components ↔ code | Code Connect tools (`get_code_connect_map`, `add_code_connect_map`, etc.) |

### Tool tips

- **`get_design_context`:** Works best when frames use components and variables; generated code maps more cleanly to [theme-tokens.md](./theme-tokens.md).
- **`use_figma` / `search_design_system`:** Prefer **instancing** existing `Atom/*` and `Org/*` components over drawing new rectangles.
- After **generate_figma_design** imports, refactor captures into **components + auto layout** rather than leaving flat groups.

## 7. Figma MCP → site (implementation)

When moving **from Figma to code** (e.g. after **`get_design_context`** or any generated snippet):

1. **Treat output as layout and structure reference**, not drop-in styling. MCP output often includes **literal hex/RGB** or class names that do not match this repo’s **inline `style` + CSS variables** convention ([CONTRIBUTING.md](../CONTRIBUTING.md), [ADR-001](./adrs/ADR-001-inline-styles-for-layout-and-visuals.md)).
2. **Do not merge pasted hex** as final styles if it bypasses **JOP** and [ADR-007](./adrs/ADR-007-theme-naming-and-contrast-hardening.md) theme behaviour. Map fills and text to **`var(--jop-…)`** decision tokens first; use primitives only when no semantic token fits ([theme-tokens.md](./theme-tokens.md)).
3. **Frames authored with raw hex in Figma** do not auto-tokenize in code—you still choose matching **`var(--jop-…)`** at implementation time. Rebasing Figma to JOP variables improves parity; Code Connect does not substitute tokens automatically—review every color line.
4. **Case study content** remains authored in [`lib/projects.ts`](../lib/projects.ts) per [ADR-002](./adrs/ADR-002-static-in-repo-data-for-case-studies.md); do not replace it with generated copy from MCP alone.

**One-line rule:** If suggested code shows `#RRGGBB`, replace with the appropriate **`var(--jop-…)`** (or legacy semantic `var(--fg)` where that is still the convention) before merging.

## 8. Quick checklist

**Figma file**

- [ ] Color and text use **JOP** variables (primitive or decision), not one-off hex.
- [ ] Sections and pages use **auto layout** with gap/padding from **space** variables.
- [ ] Layers follow **Atom / Mol / Org / Section / Page** naming.
- [ ] Light / dark modes defined for decision tokens where the site differs.
- [ ] Max content width **1240** respected for main editorial columns.

**Repository (after MCP or manual handoff)**

- [ ] No pasted **`#hex`** left as final styles—mapped to **`var(--jop-…)`** per theme.
- [ ] Case study structure and copy still driven by [`lib/projects.ts`](../lib/projects.ts) where applicable.
