---
id: "02-u09"
plan: "02"
title: "Lifecycle state vocabulary from the brief"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 0.8
priority: 9
depends_on: []
writes: ["src/domain/lifecycle/vocabulary.ts","src/domain/lifecycle/vocabulary.spec.ts"]
reads: ["docs/spec/01-slice-1-brief.md"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md","docs/design/ux/screens.md#state-to-screen-map"]
needs: []
verify: ["npm run lint","npm run build","npm test","npx vitest run src/domain/lifecycle/vocabulary.spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Encode the per-state vocabulary of the brief table (state keys, state classes, public chip label, plain explanation, next action) as data, so list and detail endpoints can return labels the app never hardcodes. The transition table itself is plan 03.

## Steps
1. src/domain/lifecycle/vocabulary.ts: export const STATES (all 15 keys from section 4.1: draft, submitted, needs_revision, eligible, solution_development, solution_selection, implementation, verification, paused, stuck, solved, closed, redirected, withdrawn, rejected), type State, STATE_CLASS (pre_publication, working, resting, terminal) and isPublicState(state) (public: all working, resting, solved, closed, redirected, and withdrawn only when it was published, which the caller decides).
2. STATE_COPY: for each state {label, explanation, nextAction}. Copy the exact public labels and plain explanations from the transition table rows that enter the state (T01 for submitted, T02 needs_revision, T04 eligible, T05 rejected, T06 withdrawn, T08 solution_development, T09 solution_selection, T11 implementation, T12 verification, T14 solved, T15 stuck, T17 paused, T19 closed, T20 redirected). For draft use label "Draft", explanation "Only you can see this draft." and next action "Finish and submit it." Paused keeps label "Paused". Labels never mention red or alarm.
3. Interim states: a helper isInterimLabelState(state) true for solved, closed, redirected (show "Interim decision, will be re-reviewed").
4. Tests: every state has copy; no string contains U+2014 or U+2013; labels match the brief table verbatim for a hand-listed subset (copy the strings into the test, so a brief change breaks the test on purpose); isPublicState false for the four pre-publication keys.

## Acceptance
- STATE_COPY covers all 15 states and the test fails if one is added without copy.
- Strings equal the brief table verbatim.
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- The transition table, guards or actors (plan 03-u01).
