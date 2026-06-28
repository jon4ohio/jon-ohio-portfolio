# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-06-28

## Delta

- Pass 1 adoption: added Project Entry and Handoff

## Adoption Context

This project is adopting Anchor during normal development. Existing ADRs remain at `docs/adrs/` — no migration.

**Hypothesis under test:** Can two lightweight coordination contracts (Entry + Handoff) eliminate most session reorientation on an existing project?

**Anti-goal:** Do not try to prove Anchor works. Use the portfolio normally and allow evidence to determine whether additional coordination is needed.

## Horizon

- Normal portfolio work (case studies, quality, storytelling)
- Validation: start Cursor sessions without re-explaining the portfolio

## Blocked

None

## Session Protocol (validation week)

1. Read `docs/project/entry.md`
2. Read this Handoff
3. Build portfolio — do not "use Anchor" ceremonially

When friction appears, ask: which contract owns this?

- Entry / Handoff → update them
- New significant decision → write ADR in `docs/adrs/` (existing convention)
- Repeated workflow / explanation → friction log below
- None → friction log

## Pass 1 Exit Criteria

Pass 1 completes when (roughly ten meaningful sessions):

- Entry is updated only when project identity changes
- Handoff is updated after each meaningful work session
- No duplicate project explanations emerge
- No additional Anchor contracts were created unless the work naturally required them

Otherwise, record the friction rather than extending Pass 1.

## Validation Questions

Track per session:

| Question | Pass? |
|---|---|
| Did I reopen old chats to remember context? | |
| Did Entry answer orientation questions? | |
| Did Handoff answer "what next?" | |
| Did I create unnecessary documentation? | |

**Primary measure:** Did I have to explain my portfolio less today than yesterday?

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|---|---|---|---|---|
| | | | | |
