---
id: "04-u04"
plan: "04"
title: "Stage options: proposed_solution contributions become stage_option rows and the options comparison read (replaces proposals)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 73
depends_on: ["04-u03", "10-u29", "12-u02"]
writes: ["src/stages/app/options/**","src/stages/infra/options/**","src/contributions/app/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/stage-options.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#6-contributions","docs/spec/01b-stages.md","docs/design/components/server.md#lifecycle-v2-entities","docs/design/system-design.md#6-api-surface-v1","docs/design/ux/wireframes/stages.md#WF-STAGE-1","docs/design/ux/wireframes/participate.md#WF-PROPOSAL-2","docs/design/flows/stage-work.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/stage-options.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["8fcccaa"]
actual_hours: null
---
## Objective
Replace proposals with stage options (D-74: `stage_option` replaces the old `proposal` entity). A `proposed_solution` contribution aimed at a stage is stored as a `stage_option` carrying the validated structured answers; `proposal_improvement` contributions link to an option. This unit completes the contribution-to-option adapter whose port and table 12-u02 created, and serves the options comparison read used by the stage workspace. The old T08, T09 and T10 field enforcement is gone: those ids no longer exist (docs/spec/01a-lifecycle.md section 4.3 maps them to ST05 on the classic-5 stages, a withdrawn `stage_choice` and T22); their equivalent gates are the ST04 requirements (12-u06) and the choice gate (04-u05).

## Steps
1. Adapter `StageOptionContributionAdapter` implementing the `ContributionPort` of 12-u02: on a `proposed_solution` contribution with a `stageId` it inserts the `stage_option` row (mechanism, success_metric, risks, verification_plan taken from the pinned `stage_option` content schema answers through 10-u29; the schema, not this unit, names the fields; the pack schema id `stage_option` replaces `proposal`) with `contribution_id`, status following the contribution status (`pending`, `public` when accepted, `hidden`, `withdrawn`) and `for_later_stage`. The 09-u40 adapter calls `markOptionPublic(contributionId)` through a small hook when a run accepts the contribution.
2. `proposal_improvement` contributions carry `improves_option_id` (stage_option fk, migration) and appear under their option; withdrawing the parent keeps them readable.
3. `GET /v1/stages/{id}/options` (public after publish) returns public options in a fixed order of creation, each with its improvements, `forLaterStage` and the viewer's own pending items flagged `pending_review`; no scores, votes, counts or ranking (RANK-1; response carries `criteria: {order: "created_at_asc", usesEngagementSignals: false}`). An options comparison view model (rows are the four schema fields) is returned as `comparison` for stages with 2 or more options.
4. An option can be edited by its author only while pending or while the stage is `active` and no choice has been recorded; after a choice, options are read only.
5. Tests: an option is created with its contribution and stays hidden until accepted; an improvement attaches; order is stable; no score fields (exact key set); edits refused after a choice; a proposed_solution without a stage is a problem-level contribution, never an option.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- A `proposed_solution` aimed at a stage is always a `stage_option`; there is no proposal table or route.
- Options carry no scores or ranking fields (key-set test).
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The choice and decision record (04-u05).
- Starting and resolving stages (12-u06, 12-u07).
- Voting or scoring (not in slice 1).
