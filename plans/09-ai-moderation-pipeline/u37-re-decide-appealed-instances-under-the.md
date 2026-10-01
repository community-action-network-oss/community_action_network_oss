---
id: "09-u37"
plan: "09"
title: "Re-decide appealed instances under the new policy version"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.3
priority: 266
depends_on: ["09-u36","09-u27"]
writes: ["src/appeals/app/redecide.ts","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/appeals-redecide.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/appeals.md#steps","docs/design/flows/appeal.md","docs/design/ai/amendment-loop.md","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#APPEAL-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/appeals-redecide.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
When the ratified pack version that contains the appeal-derived change becomes active, re-decide the instance by AI under it and show the appellant the result and version. If the proposal is rejected, close the appeal as upheld with the panel rationale.

## Steps
1. Listen for `policy_changed` events with state active: for each appeal in awaiting_policy whose proposal ref is in the new version change list (the registry or fixture exposes `changedProposalRefs`), enqueue a re-decision job (trigger appeal, normal pipeline with the new version).
2. Result handling: decision stored under the new version; the appeal becomes overturned or upheld by comparing with the original; effects follow the brief table when overturned (through the engine and applier). Notice kind decided_under written for the appellant.
3. Rejected proposal: `POST` internal call `closeAsUpheld(appealId, rationale)` from the proposal status change; appeal closes with the panel rationale text (stored, shown to the appellant).
4. Appeals and re-moderation lock the target against a second concurrent re-moderation (test with two jobs at once).
5. Tests using fixture packs v1 and v2: appeal on the flipping input, label creates proposal (fake), activating v2 re-decides, appeal overturned, appellant notice and timeline show version v2; rejected proposal closes upheld.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Re-decision runs under the new version and is recorded with it.
- Concurrent re-moderation is serialized per target.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Ratification mechanics.
