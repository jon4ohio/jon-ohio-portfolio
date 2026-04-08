# Component inventory

Conventions: **Server Components** unless `components/Nav.tsx` (client). Styling: inline `style` + tokenized CSS vars (`var(--fg)`, etc.) per ADR-001.

## Navigation / layout

| Component | File | Client? | Responsibility |
|-----------|------|---------|------------------|
| Nav | `components/Nav.tsx` | Yes | Primary nav links (Home, Work, Leadership, About), active state via `usePathname`, mobile menu, mail CTA |
| Footer | `components/Footer.tsx` | No | Site footer links and meta |
| Hero | `components/Hero.tsx` | No | Homepage headline, role line, CTAs to Work and Leadership |
| SystemModel | `components/SystemModel.tsx` | No | “How systems evolve” four-stage model (homepage) |

## Content / media

| Component | File | Client? | Responsibility |
|-----------|------|---------|------------------|
| AssetImage | `components/AssetImage.tsx` | No | Wraps `next/image`; `treatment` plain vs device chrome; uses design tokens for borders/surface |

## Page-level composition

| Area | Notes |
|------|--------|
| `app/page.tsx` | Homepage: imports `Hero`, `SystemModel`, featured work cards, metrics — large file |
| `app/work/page.tsx` | Project grid/list |
| `app/work/[slug]/page.tsx` | Case study layout; **`BlockRenderer`** inline for `CaseStudyBlock` union |
| `app/about/page.tsx`, `app/leadership/page.tsx` | Long-form marketing copy |
| `app/not-found.tsx` | 404 |

## Design system

No separate `ui/` package. Shared behavior is duplicated minimally across pages with inline styles; **tokens** live in `app/globals.css` (`--fg`, `--border`, `--accent`, etc.).

## State management

- **Global:** None (no Redux/Context for data).
- **Local:** `Nav` only — `useState` for mobile drawer, `usePathname` for active link.
