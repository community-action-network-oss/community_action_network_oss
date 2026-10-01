---
id: "09-u25"
plan: "09"
title: "Pre-publication blocking path on T01 and T03, edit cancel and withdraw"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 254
depends_on: ["09-u24","09-u07","03-u07"]
writes: ["src/moderation/app/prepub.ts","src/problems/app/**","src/moderation/http/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/moderation-prepub.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/triggers.md#1-pre-publication-blocking","docs/design/ai/triggers.md#backpressure","docs/design/flows/intake-submit.md","docs/design/ux/wireframes/submit.md#WF-PENDING-1","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1","docs/spec/01a-lifecycle.md#42-transition-table"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-prepub.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Submit means: deterministic checks, then a blocking moderation run before anything is public. Nothing is public until a complete run says publish. Editing while checking cancels the run, withdraw works at any time.

## Steps
1. T01 and T03 (03-u07 transitions endpoint, 03-u08 sync gate) after state moves to `submitted` enqueue the blocking DP set (crisis first) via the relay with trigger pre_publication; the response includes the status shape of the previous unit. Remove any 03-u07 hook that waited for a moderator.
2. Gating: publication fails closed (PUB-FAILCLOSED-1): if moderation is entirely down (no valid pack, gateway not configured) the item stays `submitted` with hold; no endpoint publishes without a complete run (test lists all routes that can reach T04 and asserts each requires a run id).
3. Edit while checking (PATCH draft in `submitted`): cancels the in-flight run (supersede) and returns the item to `draft`-editing semantics per the lifecycle table, a new run starts on the next submit. Withdraw (T06) stays available while checking or held.
4. Backpressure from triggers.md: per-account and per-IP rate limits and cooldowns apply before runs are queued; when pre-publication queue age exceeds a config limit, async classes are shed first (queue class order), blocking work is never skipped (test with fake clock and a flood).
5. Honest wait: status ageSeconds is real; the held state retries with backoff; "Taking longer than usual" has no promise value in the API.
6. Tests: T01 with clean FakeModel fixture ends published via T04 with decision and run; vague fixture ends T02 with hints per field; scope fixture T05 reject with rule id; crisis fixture not published and route_external returned in status; provider outage script holds and item stays submitted; edit cancels run; withdraw while held.
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- No public state without a complete run (route-table test).
- Outage holds, never publishes.
- Edit cancels the in-flight run; withdraw works while held.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Updates after publication (next unit).
- App screens.
