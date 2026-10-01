---
id: "09-u25"
plan: "09"
title: "Submit gate and publication run paths: T01, T03, T04, T02, T05, edit cancel and withdraw"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 254
depends_on: ["09-u24", "09-u07", "03-u07", "12-u04", "12-u03"]
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
Lifecycle v2 (D-72): sending for volunteer review (T01) runs the deterministic checks and the submit-gate DPs (DP-PRIVACY, DP-CRISIS and the cheap checks, so personal data never reaches volunteers); publication is a separate blocking run (DP-PUBLISH with the DPs it aggregates, 09-u72 and 12-u08) after volunteer review. Nothing is public until a complete publication run says publish. Editing while checking cancels the run, withdraw works at any time.

## Steps
1. T01 and T03 (03-u07 transitions endpoint, 03-u08 sync gate, state `draft` or `needs_revision` to `in_review`) enqueue the submit-gate DP set (DP-CRISIS first, then DP-PRIVACY, DP-NAMING, DP-TONE, and DP-SOURCE-TRUST, DP-CRITERIA, DP-STAGE-PLAN as cheap structural checks) through the relay with trigger `submit_gate`; a failing gate returns the problem to `draft` or `needs_revision` with hints and T08 holds when the run cannot complete (the `in_review` state is entered only when the gate passes, as 12-u04 defines). The publication run (trigger `publish`, event publication_requested, applied by 12-u08) is the only path to T04. Remove any 03-u07 hook that waited for a moderator.
2. Gating: publication fails closed (PUB-FAILCLOSED-1): if moderation is entirely down (no valid pack, gateway not configured) the item stays `in_review` (T09) or `draft` (T08) with hold; no endpoint publishes without a complete run (test lists all routes that can reach T04 and asserts each requires a run id).
3. Edit while a run is in flight (PATCH of an `in_review` problem by the poster): cancels the in-flight publication run (supersede) and the poster resolves it through the review module (a changed field reopens the affected recommendations, 12-u03); a new run starts on the next publication request. Withdraw (T06) stays available while `in_review` or `held`.
4. Backpressure from triggers.md: per-account and per-IP rate limits and cooldowns apply before runs are queued; when pre-publication queue age exceeds a config limit, async classes are shed first (queue class order), blocking work is never skipped (test with fake clock and a flood).
5. Honest wait: status ageSeconds is real; the held state retries with backoff; "Taking longer than usual" has no promise value in the API.
6. Tests: a clean fixture passes the T01 gate and, with a completed review fixture, the publication run ends `active` via T04 with decision and run; vague fixture ends T02 with hints per field; scope fixture T05 reject with rule id; crisis fixture not published and route_external returned in status; provider outage script holds (T08 at the gate, T09 at publication) and the item keeps its state; an edit cancels the run; withdraw while held. A publication request with zero completed reviews is refused before any run (12-u03 owns the review facts).
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- No public state without a complete run (route-table test).
- Outage holds, never publishes.
- Edit cancels the in-flight run; withdraw works while held.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Updates after publication (next unit).
- App screens.
