---
id: "02-u09"
plan: "02"
title: "Lifecycle v2 problem-state vocabulary from the lifecycle spec (states, labels, policy-version helpers)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 0.8
priority: 9
depends_on: []
writes: ["src/domain/lifecycle/vocabulary.ts","src/domain/lifecycle/vocabulary.spec.ts"]
reads: ["docs/spec/01a-lifecycle.md"]
spec: ["docs/spec/01-slice-1-brief.md", "docs/spec/01a-lifecycle.md", "docs/design/system-design.md", "docs/design/ux/screens.md#state-to-screen-map", "docs/design/ux/copy-deck-lifecycle.md"]
needs: []
verify: ["npm run lint","npm run build","npm test","npx vitest run src/domain/lifecycle/vocabulary.spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["6f9e9ac"]
actual_hours: 0.1
---
## Objective
Encode the per-state vocabulary of docs/spec/01a-lifecycle.md (lifecycle v2, D-72; section 4.1 state classes and the public labels of the T00 to T22 table) as data (state keys, state classes, public chip label, plain explanation, next action), so list and detail endpoints return labels the app never hardcodes. The transition table itself is 03-u01. Stage chips (Planned to Skipped) belong to the stages domain (12-u01), not here.

## Steps
1. src/domain/lifecycle/vocabulary.ts: export const STATES (the 12 v2 keys from section 4.1: draft, in_review, needs_revision, held, rejected, active, paused, stuck, redirected, closed, withdrawn, solved), type State, STATE_CLASS (pre_publication for draft, in_review, needs_revision, held, rejected; working for active; resting for paused and stuck; terminal for solved, closed, redirected, withdrawn) and isPublicState(state, publishedBefore) (private: the five pre-publication states; public: active, paused, stuck, solved, closed, redirected, and withdrawn only when it was published, which the caller decides, T18). `in_review` is also visible to opted-in volunteers with personal data masked, but only through the review module (12-u03), never through public problem routes.
2. STATE_COPY: for each state {label, explanation, nextAction}. Copy the exact public labels and plain explanations from the rows of docs/spec/01a-lifecycle.md that enter the state and from docs/design/ux/copy-deck-lifecycle.md (T00 draft "Draft"; T01 in_review "In volunteer review"; T02 needs_revision "Changes requested"; T04 active; T05 rejected "Not accepted"; T06 and T07 withdrawn "Withdrawn"; T08 and T09 held "Waiting for the check"; T11 paused "Paused"; T13 stuck "Stuck"; T15 solved "Solved"; T16 closed "Closed"; T17 redirected "Redirected"). The label of `active` is a template: export activeLabel({kind: "one", name} | {kind: "many", n} | null) returning "Active: stage {name}", "Active: {n} stages in progress" (ICU plural) or the plain "Active" when no stage data exists yet; the stage data comes from the stages module (12-u01, 12-u02). Never write "moderator" or "interim" in any string: nothing waits for a person to decide, the community's published rules are being applied. The word "volunteer" is allowed only in the in_review strings. Labels never mention red or alarm.
3. Policy-version labels (no "interim"): helper decidedUnderLabel(state, policyVersion) returns "Decided under policy vX" for solved, closed and redirected; helper reopenedLabel(policyVersion) returns "Reopened under policy vX" for a problem reopened by T20 or T21 (the reopen is a flag plus event, not a state key: state stays one of the 12); helper transitionalLabel(policyVersion) returns "Policy vX, transitional stewardship" (INTERIM-1) when the deciding pack was ratified only by transitional founder stewardship. Strings come from docs/design/ux/copy-deck.md and copy-deck-lifecycle.md.
4. Tests: every state has copy; no string contains U+2014 or U+2013; labels match docs/spec/01a-lifecycle.md verbatim for a hand-listed subset (copy the strings into the test, so a spec change breaks the test on purpose), including "In volunteer review", "Changes requested", "Waiting for the check" and "Not accepted"; no string contains "interim" or "moderator"; "volunteer" appears only in in_review copy; isPublicState false for the five pre-publication keys; activeLabel covers one, many and null.

## Acceptance
- STATE_COPY covers all 12 states and the test fails if one is added without copy.
- Strings equal the lifecycle spec table verbatim; the three policy-version helpers and activeLabel exist and are tested.
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- The transition table, guards or actors (03-u01).
- Stage chips and the stage plan (12-u01).
