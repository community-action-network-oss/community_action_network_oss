---
id: "09-u07"
plan: "09"
title: "Event relay: domain events to jobs, plus policy_changed and sample_tick"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 236
depends_on: ["09-u05","09-u06","03-u05"]
writes: ["src/moderation/app/event-relay.ts","src/moderation/app/events.ts","src/moderation/infra/relay-cursor.ts","src/db/schema.ts","drizzle/**","src/app.module.ts","test/moderation-relay.e2e-spec.ts"]
reads: ["src/problems/**","src/platform/**"]
spec: ["docs/design/ai/runtime.md#event-bus-and-selector","docs/design/ai/triggers.md","docs/design/system-design.md#4-event-log","docs/design/components/cross-cutting.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-relay.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["f7ffb3c","804f02d"]
actual_hours: null
---
## Objective
A relay reads new append-only events (problem_event and the new policy_changed and sample_tick events), runs the selector, and enqueues one job per (event, DP) with the right priority class. At-least-once, idempotent.

## Steps
1. Table relay_cursor (name, last_event_id or last_seq) plus a `moderation_event` table for the two new event kinds (policy_changed {fromVersion,toVersion,scope}, sample_tick {dpId,jurisdictionId,windowId}) written through the existing event writer conventions (append-only, protocol_version, origin_node_id). Naming per cross-cutting.md: `moderation.run.completed`, `moderation.held`, `policy.version.ratified` constants live in src/moderation/app/events.ts.
2. EventRelay.tick(): read events after the cursor in order, map each problem_event type to a selector event kind (T01 and T03 review_requested, the publication request, stage and plan events of plan 12, problem.ended of 13-u01, edits, and so on; unknown types are ignored with a debug counter), call `selectDps`, enqueue jobs on queue `moderation` with dedupeKey `${eventId}:${dpId}` and class by trigger (crisis first, then prepub, update, async, sample), then advance the cursor in the same transaction as the enqueue.
3. A crash between enqueue and cursor advance only causes duplicate enqueues, which dedupe_key absorbs (test by injecting a failure).
4. Per-target ordering: jobs carry targetId and targetVersion; handlers (later units) process the same target in version order. Expose `ModerationJob` type in src/moderation/app/events.ts.
5. Tests: a T01 event enqueues the submit-gate DP set including DP-CRISIS first (the full publication set runs at publication_requested); edit with changed fields enqueues only bound DPs plus the always set; replaying the same events enqueues nothing new; a policy_changed event enqueues a fan-out job (not per item yet; the policy-change unit expands it); a failed relay tick does not lose events.

## Acceptance
- One job per (event, DP), deduped, in the right priority class.
- Relay is at-least-once and cursor-safe (failure injection test).
- `npm run verify` is green.

## Out of scope
- Executing the jobs.
- Expanding policy_changed into per-item rechecks.
