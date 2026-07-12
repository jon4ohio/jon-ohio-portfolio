# Project Entry

**Contract:** Project Entry  
**Problem coordinated:** Where am I? What is this project?

## Purpose

John Ohio’s portfolio — a living design-engineering record of product work, case studies, and evidence. The site is the artifact; the repo is the source of truth for content, decisions, and delivery.

## Audience

Hiring managers, design leaders, Tech Nation reviewers, collaborators, and future me.

## Current Priorities

1. Strengthen portfolio quality
2. Complete additional case studies
3. Improve storytelling and evidence
4. Maintain a high-quality design system

## Technology

- Next.js 16 (App Router), React 19, TypeScript
- Inline `style` props + CSS custom properties (`--jop-*` theme tokens in `app/globals.css`; Tailwind only for animation utilities)
- Static in-repo content — `lib/projects.ts`, App Router pages under `app/`
- Playwright + axe for automated a11y (`npm run test:a11y:ci`)
- Vercel deployment

## Constraints

Fast, accessible, maintainable. Minimal dependencies. Clear content over clever architecture. Decisions that affect structure or conventions are recorded as ADRs.

## Start Here

1. Read this document for project orientation and canonical locations.
2. If continuing work, read [Handoff](../../ai/handoff.md) for current session state.
3. For decision rationale, read the named ADR directly in [docs/adrs/](../adrs/index.md).
4. For implementation work, read only the task-relevant docs and code paths.

## Canonical Locations

- **Orientation:** `docs/project/entry.md`
- **Session continuity:** [`ai/handoff.md`](../../ai/handoff.md)
- **Decision rationale:** [`docs/adrs/`](../adrs/index.md)
- **Implementation details and code organization:** relevant project docs under `docs/` and the repository implementation
- **Standard commands and contribution workflow:** `README.md`, `CONTRIBUTING.md`, `package.json`
- **Figma structure / MCP setup / JOP handoff:** [`docs/figma-jop-structure.md`](../figma-jop-structure.md), [ADR-023](../adrs/ADR-023-figma-mcp-handoff-jop-tokens.md)
- **Theme tokens:** [`docs/theme-tokens.md`](../theme-tokens.md)

## AI Entry Points (Dispatch Only)

- **Canonical dispatch layer:** `AGENTS.md`
- **Claude adapter:** `CLAUDE.md` imports `AGENTS.md`
- **Rule:** AI entry files are dispatch surfaces only. They must not restate durable project knowledge owned by Entry, Handoff, ADRs, or the repository itself.

## Contracts in Use

### Project Entry

- **Location:** `docs/project/entry.md` (this document)

### Decision Records

- **Contract:** Anchor ADR (preserve significant architectural decisions)
- **Implementation:** [Operational ADR v1.0.0](https://github.com/jon4ohio/operational-adr/tree/v1.0.0) ([spec](https://github.com/jon4ohio/operational-adr/blob/v1.0.0/spec/adr-v1.0.md))
- **Location:** `docs/adrs/`

### Session Coordination

- **Contract:** Anchor Session Arbitration (research protocol)
- **Implementation:** Anchor Session Arbitration
- **Instrument:** [`ai/session-arbitration.md`](../../ai/session-arbitration.md)
- **Adapters:** Cursor (`.cursor/rules/anchor-session-arbitration.mdc`); Claude Code (`AGENTS.md` / `CLAUDE.md`)

### Handoff

- **Location:** [`ai/handoff.md`](../../ai/handoff.md)

Additional Anchor contracts will be adopted only when real work requires them.
