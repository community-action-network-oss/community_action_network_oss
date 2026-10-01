---
id: "12-u25"
plan: "12"
title: "Server e2e on FakeModel: prepare, review, publish, parallel stages, plan change, solved"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 55
depends_on: ["12-u07", "12-u08", "12-u09", "12-u10", "12-u11", "04-u05", "09-u44"]
writes: ["test/journey-v2.e2e-spec.ts", "test/support/journey-v2.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#1-what-slice-1-is", "docs/spec/01a-lifecycle.md", "docs/spec/01b-stages.md", "docs/design/flows/problem-preparation.md", "docs/design/flows/volunteer-review.md", "docs/design/flows/publication-decision.md", "docs/design/flows/stage-advancement.md", "docs/design/flows/stage-work.md", "docs/design/flows/plan-change.md"]
needs: ["docker", "db", "mail"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/journey-v2.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
One HTTP-level journey over the real server, Postgres and Mailpit with the deterministic `FakeModel` and recorded responses (no paid call) that walks lifecycle v2 from `draft` to `solved`. It is the server proof of the slice-1 done criterion (a) for the new lifecycle and the base the Playwright journey (12-u26) mirrors.

## Steps
1. `test/support/journey-v2.ts`: helpers that sign in seeded accounts (the poster member-one and three opted-in volunteers of 02-u12) and drive the endpoints; recorded FakeModel fixtures for each DP in the path.
2. Scenario: the poster prepares facts, two sources, two final criteria and a plan of two parallel stages plus one later stage (`facts` and `funding` in parallel, then `choose`), runs checks, sends to review (T01); three volunteers declare no conflict and finish reviews (two with recommendations); the poster accepts one and declines one with a reason; a volunteer's recommendation containing an email address is masked; the poster requests publication; the run publishes (T04), root stages are `ready` and start; a member contributes ahead to `choose` (kept, label "for a later stage"); both root stages run options, a choice with the legal gate, steps, evidence and resolve through DP-STAGE-RESOLUTION (one not met first, then met after added evidence); `choose` becomes `ready` exactly once, starts, with the contribution ahead shown; a plan change adds a stage and is applied; `choose` resolves; the system proposes T15 and DP-VERIFICATION marks the problem `solved` against the final criteria with the policy version shown.
3. Negative assertions in the same file: publication refused with zero reviews; T04 not applicable by any member; a `planned` stage cannot start (`not_ready`); evidence cannot be added while `resolving`; review content absent from every public response (exact key sets); a guest-labelled contribution is hidden by `impactedOnly` with the right `hidden` count.
4. Failure branch: a held publication run (T09) retries and then publishes with no public row in between.
5. The test prints the problem id and the policy version used; it uses only the public API plus fixtures.

## Acceptance
- The journey passes on `FakeModel` and is deterministic across 3 consecutive runs.
- The no-review and not-ready refusals pass.
- `npm run verify` is green.

## Out of scope
- The browser journey (12-u26) and the persona simulation (plan 11).
- Appeals, legal-stack stuck and re-resolution journeys (07-u07, 07-u21, 07-u22).
