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

1. Read [Handoff](../../ai/handoff.md) for current session state
2. Consult [ADRs](../adrs/index.md) before changing architectural decisions

## Contracts in Use

### Project Entry

- **Location:** `docs/project/entry.md` (this document)

### Decision Records

- **Contract:** Anchor ADR (preserve significant architectural decisions)
- **Implementation:** [Operational ADR](https://github.com/jon4ohio/operational-adr)
- **Location:** `docs/adrs/`

### Session Coordination

- **Contract:** Anchor Session Arbitration (research protocol)
- **Implementation:** Anchor Session Arbitration
- **Instrument:** [`ai/session-arbitration.md`](../../ai/session-arbitration.md)
- **Adapters:** Cursor (`.cursor/rules/anchor-session-arbitration.mdc`); Claude Code (`AGENTS.md` / `CLAUDE.md`)

### Handoff

- **Location:** [`ai/handoff.md`](../../ai/handoff.md)

Additional Anchor contracts will be adopted only when real work requires them.
