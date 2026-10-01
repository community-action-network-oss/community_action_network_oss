---
id: "09-u63"
plan: "09"
title: "T20 REOPEN-RULE and T21 REOPEN-EVIDENCE reopen transitions in the transition engine, system-only, with history kept"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 292
depends_on: ["09-u62", "03-u05", "09-u23", "05-u04", "12-u07"]
writes: ["src/problems/app/transitions/reopen*.ts", "src/problems/app/**", "src/db/schema.ts", "drizzle/**", "openapi/openapi.json", "test/reopen-transitions.e2e-spec.ts"]
spec: ["docs/spec/01a-lifecycle.md#42-transition-table", "docs/spec/01a-lifecycle.md", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/design/flows/lifecycle-transition.md", "docs/design/flows/re-resolution.md#dps-invoked", "docs/adr/0013-retroactive-re-resolution.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/reopen-transitions.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Add T20 `REOPEN-RULE` (solved, closed, redirected or stuck to `active`) and T21 `REOPEN-EVIDENCE` (solved to `active`) to the engine (old ids T23 and T24, map in docs/spec/01a-lifecycle.md 4.3). The affected stages return to `active` through the TransitionEffects handler of 12-u07 (ST10), not in this unit. They are system transitions made only by an applied re-resolution run, atomic with the event and the notice.

## Steps
1. Register T20 and T21 in the transition table module exactly as docs/spec/01a-lifecycle.md defines them (source states, target states, required fields: old and new policy and corpus version, changed conclusion, rule ids, feasibility result). `withdrawn` and `rejected` never reopen by T20 (guard test).
2. Actor is `system:re_resolution` bound to a `moderation_run` id; no user, steward or lane endpoint can invoke them (route-table test next to the NO-INSTANCE-OVERRIDE-1 test, 09-u38).
3. One transaction: lock the problem row, verify state and `target_version`, write state, `problem_event` `problem.reopened` with the fields above, a `reopen_record`, and the notice row requested by 09-u64 (through a port; the notice adapter is added there), keep the `archive_record` and decision records untouched (the effect of 13-u01 builds a new record at the next end, linked by `previous_record_id`).
4. Appeal: the re-resolution decision is a moderation decision; `appeals` filing (09-u33) accepts `target_kind = re_resolution` and DP-APPEAL re-runs it independently (09-u34); an upheld appeal that finds the reopen wrong returns the problem to its prior state through a reversal recorded as a new transition event, never an edit or delete.
5. Tests: T20 and T21 happy paths and illegal source states; history intact (old archive record, old decisions, events in order, the stage effect of 12-u07 invoked once); direct endpoint attempts 404 or 403; appeal filing accepted.

## Acceptance
- T20 and T21 pass table-driven tests and never delete or edit history.
- No HTTP route can trigger them (route-table test).
- openapi regenerated; `npm run verify` is green.

## Out of scope
- Notices and emails (09-u64).
- App screens (09-u65).
