---
id: "09-u44"
plan: "09"
title: "E2E with FakeModel part 1: seeded problem, pre-publication, update re-check"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 273
depends_on: ["09-u25", "09-u26", "09-u43", "02-u12", "12-u08", "12-u03"]
writes: ["test/e2e-moderation-flow.e2e-spec.ts","test/support/moderation-flow.ts","test/fixtures/moderation/flow/**"]
reads: ["src/**","test/**"]
spec: ["docs/design/ai/README.md","docs/design/ai/triggers.md","docs/design/flows/intake-submit.md","docs/design/flows/content-update.md","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/design/ai/simulation.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/e2e-moderation-flow.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
First half of the plan 09 acceptance, over HTTP against the real app, FakeModel only, no paid calls. A seeded problem (D-56 framing 1 with synthetic evidence, no individuals named) goes through submit, a needs_revision round, a publish, and an update re-check that publishes the edit and one that is rejected while the old version stays.

## Steps
1. Helper test/support/moderation-flow.ts: sign in as a seeded member, create a draft from the fixture, drain the queue deterministically (`drain` from the queue unit), read status and decisions. All HTTP, no direct DB writes except test fixtures.
2. Scenario 1: a vague first draft passes the T01 gate to `in_review`, a seeded volunteer (fixture accounts through the review API of 12-u03) completes a review, and the publication run gives needs_revision with a hint per field (completeness, assumptions, criteria, sources); the member revises, resubmits (T03), a second review completes if the quorum default needs it, and the second publication run publishes (T04); every decision stores policy_version, prompt_hash, model_id and run_id; run rows contain no raw text.
3. Scenario 2: held run: script a provider timeout, assert status held with real age on a fake clock, assert not public, then clear the script and assert publish. Crisis fixture routes to external resources and is not published.
4. Scenario 3: update re-check: edit `scope` of the published problem, assert the old version stays visible with `editUnderReview`, assert only the narrowed DPs plus the always set ran, assert publish swaps; a second edit adding a named person is rejected by DP-NAMING and the old version stays.
5. Scenario 4: cache and idempotency: re-draining runs makes zero provider calls (assert provider counter).
6. Fixtures are synthetic; seed framing 1 text is used verbatim as the condition.
7. Scenario 5 (lifecycle v2): zero completed reviews never publishes (the request is refused before any run); one completed review plus 14 days (fake clock) lets the poster send to the publication run anyway; an open high-impact recommendation is cited in the needs_revision hint. Prepared stage plan: a two-parallel-stage plan passes DP-STAGE-PLAN, a cyclic plan is refused by the deterministic layer with no model call.

## Acceptance
- The scenarios pass with FakeModel only (provider counter proves no live call).
- Nothing is public before a complete run in any scenario.
- `npm run verify` is green.

## Out of scope
- Policy change and appeal (part 2).
