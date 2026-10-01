---
id: "03-u12"
plan: "03"
title: "Appeals: schema, reviewer selection and filing"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 49
depends_on: ["03-u10"]
writes: ["src/moderation/**","src/db/schema.ts","drizzle/**","test/appeals-file.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#APPEAL-1","docs/spec/constitution/rules.md#APPEAL-2","docs/spec/constitution/rules.md#INTERIM-1","docs/design/ux/wireframes/submit.md#WF-APPEAL-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/appeals-file.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: skipped
attempts: 0
commits: []
actual_hours: null
blocked_reason: "superseded by 09-u33"
---
## Objective
SUPERSEDED: replaced by 09-u33. Reviewer selection and the human appeal queue are replaced by structured appeals with an independent re-run. This unit is skipped and builds nothing; the text below is kept only as history.

Add the appeal table, the pure reviewer-selection rule, and the filing endpoint. One appeal per decision, before appealable_until.

## Steps
1. Table appeal: id, moderation_decision_id (unique FK, one appeal per decision), appellant_id, grounds text NOT NULL (max 2000), reviewer_id null, same_moderator_disclosed bool default false, outcome null | "upheld" | "overturned", outcome_explanation, filed_at, decided_at. Migration via db:generate.
2. Pure src/moderation/domain/reviewer.ts: selectReviewer({pool: {id}[], appellantId, deciderId, loads}) returns {reviewerId, sameModeratorDisclosed}: when the pool has two or more moderators, choose among those who are neither the appellant nor the decider (lowest open load, ties by id); if no one qualifies fall back with disclosure true; with a pool of one return that moderator with disclosure true (APPEAL-1). Unit tests for pool sizes 1, 2, 3 and when the appellant is also a moderator.
3. POST /v1/moderation/decisions/{id}/appeals (initiator of the target problem, or the target author for contributions later): body {grounds}; allowed for T02, T05 decisions now (T19, T20 decisions are appealable once plan 05 exists; the check is by decision outcome, so list the allowed outcomes in one constant); rejects after appealable_until with conflict code "appeal_window_closed" and the date; one per decision (conflict). Assign reviewer at filing via selectReviewer. Audit event "appeal.filed" with interim flag. The appellant sees only the disclosure flag and text, never the reviewer handle.
4. GET /v1/moderation/appeals (moderator): queue of open appeals assigned to or visible to the moderator, oldest first, with disclosure flag. Fill the appeals variant of the queue endpoint (type=appeals). Add appeal info to GET /v1/problems/{id}/moderation for the initiator (filed, outcome, explanation).
5. Tests: reviewer rules by pool size; late appeal blocked; second appeal blocked; non-initiator 404; grounds length; disclosure true with one moderator; appeal does not change problem state by itself.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- APPEAL-1: reviewer differs from decider and appellant when the pool has two or more (test), else disclosure is recorded.
- Appeals change no state until resolved.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Resolving appeals (next unit).
- Appeals for contributions (plan 04 adds the allowed outcome).
