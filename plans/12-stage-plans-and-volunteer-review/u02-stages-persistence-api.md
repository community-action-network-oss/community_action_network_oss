---
id: "12-u02"
plan: "12"
title: "Stages persistence and API: stage, stage_edge, acceptance_criterion, stage_option, stage_choice, stage_evidence"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 46
depends_on: ["12-u01", "02-u10", "02-u08", "03-u05"]
writes: ["src/stages/http/**", "src/stages/app/**", "src/stages/infra/**", "src/stages/stages.module.ts", "src/db/schema.ts", "drizzle/**", "src/app.module.ts", "test/stages-api.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#10-minimal-entity-list", "docs/spec/01b-stages.md", "docs/design/components/server.md#lifecycle-v2-entities", "docs/design/flows/stage-work.md", "docs/design/system-design.md#6-api-surface-v1", "docs/spec/constitution/rules.md#STAGE-PREP-1", "docs/spec/constitution/rules.md#STAGE-RESOLVE-1"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/stages-api.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Persist the stage plan and the per-stage work records, and expose them: `stage`, `stage_edge`, `acceptance_criterion`, `stage_option`, `stage_choice`, `stage_evidence`, `stage_event` (append-only). Read endpoints for the stage map and workspace, and write endpoints for options, a choice and evidence. Stage state changes (start, resolve, block) and plan changes are later units (12-u06, 12-u07, 12-u09).

## Steps
1. Schema (append to `src/db/schema.ts`, `npm run db:generate`): `stage` (id, problem_id fk, name, goal, state text default `planned`, decision_method, required, needs_choice, auto_start, resume_state null, plan_version int, ordinal, origin_node_id, protocol_version), `stage_edge` (stage_id, depends_on_id, plan_version; unique pair; CHECK stage_id <> depends_on_id), `acceptance_criterion` (id, problem_id fk null, stage_id fk null, CHECK exactly one owner, statement, measure, target null, evidence_hint null, deadline null, met_by jsonb default [], ordinal), `stage_option` (id, stage_id fk, contribution_id fk null, author_id, mechanism, success_metric, risks, verification_plan, status `pending|public|hidden|withdrawn`, for_later_stage bool, created_at), `stage_choice` (id, stage_id fk unique where not withdrawn, option_ids jsonb, steps jsonb, decision_method, decider_id, authority, rationale, dissent_notes null, withdrawn_at null, gate_result jsonb null), `stage_evidence` (id, stage_id fk, url, kind, claim_text, criteria_ids jsonb, submitted_by, tier null, source_trust jsonb null, frozen_at null), `stage_event` (id, stage_id, problem_id, type, actor_id, from_state, to_state, reason, payload jsonb, occurred_at; UPDATE and DELETE revoked from the restricted role, as `problem_event`). Visibility: rows are private until the problem is published (T04); a repository helper `visibleToViewer` returns nothing for non-published problems except to the poster.
2. `StagePlanRepository` (interface in `app/`, Drizzle in `infra/`): `savePlan(problemId, plan)` replaces a draft plan atomically (only while the problem is `draft` or `needs_revision`), `loadPlan(problemId)` returns the domain `StagePlan` plus `StageStates`, and `listForViewer`. The domain `validatePlan` runs before any write.
3. Read endpoints (public after publish): `GET /v1/problems/{id}/stages` (nodes, edges, chip text, current flags, criteria progress, the problem chip data, `planVersion`; list order is `topoOrder`, so the app renders the graph and the list from the same data), `GET /v1/stages/{id}` (workspace: options, choice, tasks placeholder, evidence, criteria with `hasEvidence`). No handle is exposed beyond the public handle; no email.
4. Write endpoints: `POST /v1/stages/{id}/options` (member; stage state allowed by `allowedContributionTypes` for `proposed_solution`, `planned` and `ready` set `for_later_stage` true; validated against the pinned `stage_option` schema via 10-u29 once present; creates the option through a `ContributionPort` that 04-u02 implements, with an in-memory fake here; the option is hidden from others until the contribution is accepted), `GET|PATCH /v1/stage-options/{id}` (author, while pending or stage active), `POST /v1/stages/{id}/choice` (decider only as set by `decision_method`, stage `active`, `needs_choice`; calls a `ChoiceGatePort` (CHOICE-GATE: DP-DECISION-RECORD and DP-LEGALITY, adapter in 04-u05 and plan 09), default fake passes; a held gate stores nothing as chosen; `DELETE /v1/stages/{id}/choice` withdraws a choice while the stage is `active`), `POST /v1/stages/{id}/evidence` (URL only, https, each mapped to criterion ids of that stage; stage `active` or `blocked`; ahead contributions are never evidence, STAGE-PREP-1). All writes append a `stage_event` in the same transaction.
5. DTOs with `@ApiProperty` and operationIds (`listProblemStages`, `getStage`, `addStageOption`, `updateStageOption`, `chooseStageOption`, `withdrawStageChoice`, `addStageEvidence`). Unknown fields rejected.
6. Tests (e2e, direct inserts for problems): a published plan shows nodes and edges in topological order; an unpublished plan is invisible to guests; an option on a `planned` stage is stored with `for_later_stage`; a choice by a non-decider gets 403; a choice on a `planned` stage gets `not_ready`; evidence needs an https URL and valid criterion ids; `stage_event` rejects UPDATE and DELETE under the restricted role; exact key sets (no email, no author handle beyond the public handle).
7. Run `npm run openapi` and `git add -- openapi/openapi.json` (the verify diff gate). Never hand-edit the file.

## Acceptance
- A guest reads the stage map and workspace of a published problem, and nothing of a private one.
- `STAGE-GATE-1` is visible at the API: a `planned` stage cannot take a choice or evidence.
- Option, choice and evidence writes are atomic with their `stage_event`.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Starting, resolving and blocking stages, and the gating transaction (12-u06, 12-u07).
- Plan changes after publication (12-u09).
- The preparation endpoints that write the draft plan (12-u04).
