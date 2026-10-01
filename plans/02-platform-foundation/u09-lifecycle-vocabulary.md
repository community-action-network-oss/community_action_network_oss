---
id: "02-u09"
plan: "02"
title: "Lifecycle state vocabulary from the lifecycle spec (T00 to T24)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 0.8
priority: 9
depends_on: []
writes: ["src/domain/lifecycle/vocabulary.ts","src/domain/lifecycle/vocabulary.spec.ts"]
reads: ["docs/spec/01a-lifecycle.md"]
spec: ["docs/spec/01-slice-1-brief.md", "docs/spec/01a-lifecycle.md", "docs/design/system-design.md", "docs/design/ux/screens.md#state-to-screen-map"]
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
Encode the per-state vocabulary of docs/spec/01a-lifecycle.md section 4.2, the single owner of the table T00 to T24 (state keys, state classes, public chip label, plain explanation, next action) as data, so list and detail endpoints can return labels the app never hardcodes. The transition table itself is 03-u01.

## Steps
1. src/domain/lifecycle/vocabulary.ts: export const STATES (all 15 keys from section 4.1: draft, submitted, needs_revision, eligible, solution_development, solution_selection, implementation, verification, paused, stuck, solved, closed, redirected, withdrawn, rejected), type State, STATE_CLASS (pre_publication, working, resting, terminal) and isPublicState(state) (public: all working, resting, solved, closed, redirected, and withdrawn only when it was published, which the caller decides).
2. STATE_COPY: for each state {label, explanation, nextAction}. Copy the exact public labels and plain explanations from docs/spec/01a-lifecycle.md rows that enter the state (T01 for submitted, whose label is "Awaiting review"; T02 needs_revision, label "Changes requested"; T04 eligible; T05 rejected, "Not accepted"; T06 withdrawn; T08 solution_development; T09 solution_selection; T11 implementation; T12 verification; T14 solved; T15 stuck; T17 paused; T19 closed; T20 redirected). Never write "volunteer", "moderator" or "interim" in any string: nothing is waiting for a person, the community's published rules are being applied. For draft use label "Draft", explanation "Only you can see this draft." and next action "Finish and submit it." Paused keeps label "Paused". Labels never mention red or alarm.
3. Policy-version labels (no "interim"): helper decidedUnderLabel(state, policyVersion) returns "Decided under policy vX" for solved, closed and redirected; helper reopenedLabel(policyVersion) returns "Reopened under policy vX" for a problem reopened by T23 or T24 (the reopen is a flag plus event, not a state key: state stays one of the 15); helper transitionalLabel(policyVersion) returns "Policy vX, transitional stewardship" (INTERIM-1) when the deciding pack was ratified only by transitional founder stewardship. Strings come from docs/design/ux/copy-deck.md.
4. Tests: every state has copy; no string contains U+2014 or U+2013; labels match docs/spec/01a-lifecycle.md verbatim for a hand-listed subset (copy the strings into the test, so a spec change breaks the test on purpose), including "Awaiting review", "Changes requested" and "Not accepted"; no string contains "interim" or "volunteer"; isPublicState false for the four pre-publication keys.

## Acceptance
- STATE_COPY covers all 15 states and the test fails if one is added without copy.
- Strings equal the lifecycle spec table verbatim; the three policy-version helpers exist and are tested.
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- The transition table, guards or actors (plan 03-u01).
