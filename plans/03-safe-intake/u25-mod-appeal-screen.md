---
id: "03-u25"
plan: "03"
title: "Moderator appeal review screen"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 61
depends_on: ["03-u24","03-u13"]
writes: ["app/mod/appeals/**","src/moderator/**","src/i18n/en.json","__tests__/mod-appeal-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/ux/wireframes/moderation.md#WF-MOD-APPEAL-1","docs/spec/constitution/rules.md#APPEAL-1","docs/spec/constitution/rules.md#APPEAL-2","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/mod-appeal.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-MOD-APPEAL-1: the assigned reviewer reads the original decision and the appellant grounds, then upholds or overturns with an explanation.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/mod/appeals/[id].tsx: original decision (rules, hint, explanation) beside grounds; reviewer disclosure banner when same moderator; outcome radio, rule ids, explanation (required); effect preview in plain words per decision outcome (what overturning does, from a map keyed by outcome in src/moderator/appealEffects.ts that matches the brief section 5 table).
3. Not permitted for anyone but the assigned reviewer (names the rule). States: loading, error, offline, validation, already resolved.
4. Tests: effect text per outcome, disclosure banner, not permitted for decider when pool is 2 or more (API 403 mapped), validation.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The effect preview matches the brief table.
- Disclosure banner mirrors the API flag.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Contribution appeals (plan 04).
