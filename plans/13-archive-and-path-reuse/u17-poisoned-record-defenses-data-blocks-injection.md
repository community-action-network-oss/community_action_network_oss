---
id: "13-u17"
plan: "13"
title: "Poisoned-record defenses: data blocks, injection tests, ratified-only SQL, retraction effects"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.3
priority: 416
depends_on: ["13-u09","13-u04","13-u05","09-u17"]
writes: ["src/archive/app/safety/**","test/fixtures/archive-poison/**","test/archive-poison.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#12-abuse-and-poisoning","docs/design/ai/safety-and-privacy.md","docs/design/ai/evaluation.md","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Prove that archive content is data and never instructions, and that only ratified, provenanced records can influence a suggestion.

## Steps
1. A shared helper `quoteAsData(record)` used by every model call that includes archive text (13-u04, 13-u12, 13-u15): delimited block, fixed delimiters, escaping of the delimiter inside text, standing rule line. A lint-style test greps src for model calls that interpolate archive text without it.
2. Injection corpus under test/fixtures/archive-poison: records whose stage goals, challenges and options contain instruction-like imperatives aimed at the model, hidden text (zero width and homoglyph runs), delimiter breakouts, link farms, and a fabricated "solved" record with weak evidence tiers. Expected: DP-ARCHIVE fails them as `needs_revision`; if one is inserted directly in the database as `ratified = false`, retrieval never returns it; if inserted as ratified (a simulated insider) the suggestion run holds on the canary and the quote helper keeps it inert.
3. Sybil and fabricated solved: rank weight uses evidence tier (13-u10) not count; a fixture with 50 near-identical weak-tier records does not outrank one strong-tier record; popularity or view counts do not exist as a column (schema scan).
4. Retraction effects: a withdrawn or de-ranked record disappears or sinks in the retrieval fixtures, and an existing suggestion based on a withdrawn record becomes `stale` with a visible note (nothing removed silently).
5. Provenance links: every suggestion payload links to the run records and versions that admitted its source records (field present test).
6. Tests as above with FakeModel scripted to obey the injection when unguarded (to prove the guard, not the model).

## Acceptance
- No poisoned fixture changes an instruction, a suggestion or a stage draft.
- Only `ratified` records are retrievable (SQL and test).
- `npm run verify` is green.

## Out of scope
- Eval of real model prompt resistance (live record runs in plan 11).
