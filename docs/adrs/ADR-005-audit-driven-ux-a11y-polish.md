# ADR-005: Audit-driven UX and accessibility polish via targeted in-place fixes

## Status

**Status:** Accepted
**Date:** 2026-04-09
**Decision Maker(s):** John Ohio (Owner/Maintainer)
**Supersedes:** None

## Context

An audit of the portfolio surfaced interaction, accessibility, and responsive behavior issues across navigation, footer links, case studies, and supporting layouts. The issues were narrow and implementation-level (hover feedback, decorative semantics, breakpoint behavior, not-found metadata, content order), but they created visible UX friction and accessibility noise.

The project already has accepted constraints from prior ADRs:
- Layout and visual styling stay primarily inline (ADR-001).
- Responsive behavior is handled through focused utility classes in `app/globals.css` (ADR-003).

The decision needed now is whether to resolve the audit as incremental code-level improvements in existing structures, or redesign/refactor broader UI patterns first.

**In scope:** targeted UX/a11y/layout fixes from the audit (hover affordance, aria attributes for decorative separators/elements, not-found metadata/page, mobile/tablet layout corrections, case-study content flow order); color token migration (replacing raw hex with `:root` CSS variables); homepage polish (Selected Systems row layout, spacing normalization, "How I Think" surface band).
**Out of scope:** comprehensive visual redesign, data model changes, removing optional project fields.

## Decision Drivers

- Must resolve concrete UX/a11y regressions quickly without redesign churn.
- Must preserve accepted architecture conventions from ADR-001 and ADR-003.
- Must keep risk low by preferring localized, reviewable changes over broad rewrites.
- Must ensure metadata and accessibility semantics are explicit and testable.

## Options Considered

### Option A: Targeted in-place fixes in current components and CSS utilities

- **Description:** Apply focused updates in the affected files/components using existing conventions: add hover states, aria semantics, not-found metadata/page, specific breakpoint tweaks, and case-study content reordering. Keep changes localized to the currently responsible files and utility classes.
- **Pros:**
  - Fastest path to remove user-visible friction and accessibility noise.
  - Low blast radius and straightforward review/verification.
  - Fully compatible with ADR-001/ADR-003.
  - Easier rollback if any single fix has side effects.
- **Cons:**
  - Some style repetition remains until later refactor passes.
  - Produces incremental improvements rather than a unified redesign pass.
- **Effort:** Low
- **Notes:** This option aligns with the audit's nature (targeted, not structural redesign).

### Option B: Full pattern redesign and component consolidation before fixing audit items

- **Description:** Redesign shared UI patterns (nav, metadata rows, section headers, cards) and consolidate styles/components first, then absorb audit fixes into the larger redesign.
- **Pros:**
  - Could improve long-term consistency in a single coordinated effort.
  - Reduces repeated style patterns more aggressively.
- **Cons:**
  - High scope and higher regression risk for a content-led portfolio.
  - Slower path to fixing concrete accessibility and interaction issues.
  - Harder to review because bug fixes and redesign intent are coupled.
- **Effort:** High
- **Notes:** Better as a later deliberate redesign ADR if needed.

## Decision

**We will use Option A because it resolves audit findings quickly and safely while preserving existing architectural constraints.**

The implementation will make targeted in-place fixes to interaction feedback, decorative semantics, metadata completeness, responsive behavior, and case-study content flow. This directly satisfies the drivers for speed, low risk, and ADR compatibility without introducing redesign scope.

## Consequences

### Positive

- Navigation/footer/work/case-study interactions provide clear hover affordance.
- Decorative separators and device-frame dots are hidden from assistive technologies.
- Not-found route has explicit metadata and intentional page output.
- Mobile/tablet behavior improves in SystemModel, leadership cards, and about timeline.
- Case-study tags appear after visual evidence, improving information flow.
- All raw hex colors replaced with semantic CSS variables; palette changes only require updating `:root` tokens.
- Selected Systems rows use vertical stacking (title/subtitle above metric badges) for better readability at constrained widths; inter-project separators replaced with spacing for a cleaner feel.
- SystemModel closing line relocated as Selected Systems subtext, improving contextual flow.
- "How I Think" section uses a full-width surface band for clear sectional contrast.

### Negative / Trade-offs

- Styling consistency still relies on a mix of inline styles and utility classes.
- Minor UX improvements are distributed across multiple files, requiring careful review.
- Color migration introduces dependency on CSS custom properties; browsers without support (pre-2016) will see unstyled defaults. Acceptable for the target audience.

### Operational Impact

- Ongoing edits should keep targeted UX/a11y fixes localized to owning components and `app/globals.css`.
- New color values should use existing `:root` tokens; only add new tokens when a color appears repeatedly and has no semantic match.
- Manual responsive and accessibility spot checks are required for nav/footer/work/case-study pages after similar changes.
- **Migration / rollback:** Each fix is independently reversible; if a behavior regresses, revert the specific rule/component change without rolling back unrelated improvements.

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Hover/spacing tweaks unintentionally alter established visual hierarchy on specific breakpoints | Med | Med | Require viewport checks at desktop/tablet/mobile and constrain CSS selectors to explicit classes (`.nav-desktop-links`, `.footer-nav`, `.leadership-focus-grid`, `.about-timeline-row`) | Maintainer | Any change to `app/globals.css` affecting shared selectors |
| New not-found route metadata diverges from layout metadata conventions | Low | Low | Keep explicit `metadata` in `app/not-found.tsx` and verify title/robots behavior in build output | Maintainer | Any metadata or routing changes touching not-found behavior |

## Review Schedule

- **Next review:** 2026-07-01
- **Review owner:** John Ohio (Owner/Maintainer)

## Related ADRs

- ADR-001 — constrains styling approach used by these fixes.
- ADR-003 — constrains responsive utility and breakpoint strategy used by these fixes.
- ADR-004 — complements prior UI consistency work (metric badges/work layout).

## References

- `app/globals.css`
- `components/Nav.tsx`
- `components/Footer.tsx`
- `components/SystemModel.tsx`
- `components/AssetImage.tsx`
- `app/not-found.tsx`
- `app/work/page.tsx`
- `app/work/[slug]/page.tsx`
- `app/leadership/page.tsx`
- `app/about/page.tsx`
- `app/page.tsx`
