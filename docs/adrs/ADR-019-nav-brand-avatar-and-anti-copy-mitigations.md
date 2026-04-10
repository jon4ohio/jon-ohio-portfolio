# ADR-019: Nav brand avatar beside "John Ohio" and anti-copy mitigations

## Status

**Status:** Accepted  
**Date:** 2026-04-11  
**Decision Maker(s):** John Ohio (Owner/Maintainer)  
**Supersedes:** None  

## Context

The primary navigation brand in [`components/Nav.tsx`](../../components/Nav.tsx) was text-only (“John Ohio”). The site needed a **recognizable headshot** beside the name for stronger identity on desktop and mobile headers, aligned with ADR-001 (inline layout styles) and ADR-003 (shared utilities in [`app/globals.css`](../../app/globals.css)). The portrait should stay **round**, **fluidly sized** within the fixed **56px** nav height, and use **light friction** against casual drag/right-click save—without claiming DRM.

**In scope:** Brand `Link` layout; `next/image` for the avatar; static asset under `public/`; `.nav-avatar` utility; accessibility of the combined control  
**Out of scope:** Footer brand block; authenticated or signed image delivery; watermarking  

## Decision Drivers

- **Identity:** Visible headshot next to the name on every page via the fixed header  
- **ADR-001 / ADR-003:** Structural affordances (e.g. `.nav-avatar`) live in `globals.css`; spacing and flex on the `Link` stay inline  
- **Responsive:** Avatar scales within bounds (`clamp`) without clipping the nav bar  
- **Accessibility:** Single `Link` to home; image `alt=""` because visible text labels the control  
- **Privacy / UX:** Discourage casual copy/save/drag; document that **`public/` URLs remain fetchable**  

## Options Considered

### Option A: `next/image` + `public/assets/nav/avatar.png` + circular wrapper + `.nav-avatar`

- **Description:** Commit a square-friendly PNG at **`public/assets/nav/avatar.png`**, reference **`NAV_AVATAR_SRC`** in `Nav.tsx`, render **`Image`** with **`fill`** inside a square wrapper sized with **`clamp(28px, 5vw, 36px)`**, **`borderRadius: 50%`**, **`overflow: hidden`**, **`objectFit: cover`**. Add **`.nav-avatar`** in `globals.css` for **`-webkit-user-drag: none`** and **`user-select: none`**; set **`draggable={false}`**; optional **`onContextMenu` preventDefault** on the avatar wrapper only.
- **Pros:** Fast, cacheable static asset; good LCP control via `sizes`; matches existing Next patterns  
- **Cons:** Asset URL is public; mitigations are **not** copy protection  
- **Effort:** Low  
- **Notes:** Same pattern as project thumbnails elsewhere; anti-copy is best-effort  

### Option B: Text-only brand (no image)

- **Description:** Keep “John Ohio” only.
- **Pros:** No asset maintenance; smallest bundle surface  
- **Cons:** Weaker personal branding in the persistent nav  
- **Effort:** None  
- **Notes:** Rejected for this iteration.  

### Option C: Remote-only image URL (no repo binary)

- **Description:** Point `next/image` at an external host via `remotePatterns`.
- **Pros:** No large binary in git  
- **Cons:** Extra config; third-party availability; same public-fetch limits as Option A  
- **Effort:** Low–Med  
- **Notes:** Rejected in favor of a committed **`public/`** asset for simplicity and offline builds.  

## Decision

**We will use Option A:** ship **`/assets/nav/avatar.png`**, use **`next/image`** with **`fill`** inside a **square, circular** wrapper with **`clamp`** sizing, **`sizes`** aligned to max display width, and **`.nav-avatar`** for drag/user-select discouragement plus **`draggable={false}`** and **context-menu prevention** on the avatar wrapper. **`alt=""`** on the image because the link text **“John Ohio”** provides the accessible name.

## Consequences

### Positive

- Consistent personal branding in the global nav across breakpoints  
- Fluid avatar size stays within the 56px header without layout jumps  
- Shared **`.nav-avatar`** hook keeps WebKit-specific rules out of inline-only styles  

### Negative / Trade-offs

- **Public URL:** Anyone can still request **`/assets/nav/avatar.png`** or use DevTools  
- **Context menu:** Blocking on the avatar removes default image menu actions on that element only; parent link behavior unchanged  
- **Repo size:** PNG committed under **`public/assets/nav/`**  

### Operational Impact

- **Asset updates:** Replace **`public/assets/nav/avatar.png`** and verify **`sizes`** / **`clamp`** if dimensions or art direction change  
- **Migration / rollback:** Remove `Image` block and **`NAV_AVATAR_SRC`**; delete or retain asset file  

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|------------|--------|------------|------------|----------------|
| Expectation of **strong** image protection while using **`public/`** | Med | Med | Document in this ADR; if requirements tighten, evaluate **non-public** route + signed URLs in a **new** ADR | Maintainer | Request to “hide” or DRM the headshot |

## Review Schedule

- **Next review:** 2026-07-01  
- **Review owner:** Maintainer  

## Related ADRs

- ADR-001 — inline styles on the brand `Link`; shared chrome in `globals.css`  
- ADR-003 — `.nav-avatar` utility alongside other layout utilities  
- ADR-015 / ADR-016 / ADR-017 — mobile nav structure; avatar lives in the same header brand region  

## References

- [`components/Nav.tsx`](../../components/Nav.tsx) — `NAV_AVATAR_SRC`, brand `Link`, `Image`  
- [`app/globals.css`](../../app/globals.css) — `.nav-avatar`  
- [`public/assets/nav/avatar.png`](../../public/assets/nav/avatar.png) — static headshot  
