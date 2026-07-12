# Session Arbitration (adopting-project instrument)

**Type:** Adopting-project instrument — not an Anchor framework contract  
**Purpose:** Execute Anchor research protocol slice: session-arbitration

---

## Protocol

[Anchor research/protocol/session-arbitration.md](https://github.com/jon4ohio/anchor/blob/main/research/protocol/session-arbitration.md)

This file is a local path map for the protocol. It should stay thin.

---

## Local path mappings

| Responsibility | This project |
|----------------|--------------|
| Orientation gap | `docs/project/entry.md` |
| Session continuity | `ai/handoff.md` |
| Decision rationale | `docs/adrs/` |
| Implementation scope | `ai/handoff.md` horizon, then only the named paths |

---

## Local rules

- Do not use version-control history when the context bundle above is sufficient.
- Load a named ADR directly when the question is about decision rationale.
- Treat `AGENTS.md` as the canonical AI dispatch layer for this repository.
