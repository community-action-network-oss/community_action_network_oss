---
id: "12-u04"
plan: "12"
title: "Preparation API: sources, final acceptance criteria, optional stage plan, and problem states v2 (T00 to T10)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 47
depends_on: ["12-u02", "03-u05", "03-u06", "03-u08", "02-u10", "10-u29", "10-u69"]
writes: ["src/problems/http/**", "src/problems/app/**", "src/problems/infra/**", "src/problems/domain/**", "src/stages/app/**", "src/db/schema.ts", "drizzle/**", "test/preparation.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#41-preparation-private", "docs/spec/01a-lifecycle.md", "docs/spec/01b-stages.md", "docs/design/flows/problem-preparation.md", "docs/design/flows/lifecycle-transition.md", "docs/spec/constitution/rules.md#CRITERIA-1", "docs/spec/constitution/rules.md#SOURCE-1"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/preparation.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make the draft a complete structured problem (D-72 step 1): trusted sources (`source_ref` with a category), final acceptance criteria, and an optional stage plan, and wire the lifecycle v2 problem transitions T00 to T10 into the transition engine. The T01 guard enforces `CRITERIA-1`.

## Steps
1. Schema: `source_ref` (id, problem_id fk null, stage_evidence_id fk null, `uri` https only, `category` official_record|statistics_body|court_or_legislature|reputable_media|research|civil_society|other, `establishes`, `authenticity_note`, `trust_result` jsonb null (DP-SOURCE-TRUST fills it), no_source_note on the problem for the "no source yet" case marked `needs evidence`), and the `problem.plan_version` default 1. Final criteria are `acceptance_criterion` rows owned by the problem (12-u02).
2. Draft endpoints (extending 03-u06): `PATCH /v1/problems/{id}` accepts `sources[]` and `finalAcceptanceCriteria[]` (structured, validated against the pinned problem schema, 10-u29, once present), `PUT /v1/problems/{id}/stage-plan` {template?: `classic-5`|`one-stage`|null, stages[], edges[]} saves the optional plan through `StagePlanRepository.savePlan` after `validatePlan`; `POST /v1/problems/{id}/stage-plan/validate` returns the `validatePlan` issues for a plan without saving (used by the editor, 12-u14), and `GET /v1/me/problems/{id}/preparation` returns per-part readiness (`facts`, `sources`, `criteria`, `stages`: ready or not finished, with the reason) for WF-PREP-1, and the deterministic flags from the checks endpoint (03-u08) per field.
3. T00 (create draft) and T19 (discard) as in 03-u06. T01 guard (`draft` to `in_review`): the form complete against the pinned schema, 1+ `source_ref` or the no-source note, 1+ final criterion with a measure (`CRITERIA-1`), the stage plan valid when present (default plan when none: one implicit stage whose criteria equal the final criteria), identifiers confirmed, the synchronous checks and DP-PRIVACY pass (03-u08, 09-u25), with field errors beside the field names. Edits stay allowed while `in_review` (WF-PREP-1 shows a banner that reviewers see the changes): an edit writes a new version snapshot, marks the recommendations whose `path` changed as "changed since" for reviewers and does not reopen them (reopening is T03).
4. T03 (`needs_revision` to `in_review`): at least one flagged field changed; recommendations whose `path` changed reopen (hook to the review module, 12-u03, through a `ReopenRecommendations` port).
5. T06, T07 (withdraw; deletion date + 30 days; volunteer access ends: the review module reads the problem state), T08, T09, T10 (held and resume) on the engine with `resume_state`. T02, T04, T05 stay run-decided (applied by 09-u23 and 12-u08); this unit adds no human path for them.
6. Engine hooks (registered in `TransitionEffects`, defined by 03-u05): on T01 store the version snapshot and fingerprint, enter the review queue; on T04 call `StagePlanService.publish(problemId)` (12-u02) in the same transaction: stages become public, stages with no predecessor become `ready` (ST01, ST02), the rest `planned`, and `auto_start` stages start (ST03); on T05, T06, T07 end volunteer access.
7. Extend `GET /v1/problems/{id}` (02-u11) with public `sources[]` (uri, category label, establishes), `finalCriteria[]` and `planVersion` once published, and `reviewCount`; private states never expose them to others.
8. Tests (e2e): T01 refused without criteria, without a source or note, with a cyclic plan; allowed with `classic-5`, `one-stage` or none; an edit in `in_review` writes a version snapshot and flags the affected recommendations; the readiness endpoint reports each part; T04 applied with a run id publishes the plan and sets root stages `ready` in one transaction (failure injection leaves nothing half published); a member cannot apply T04.
9. `npm run openapi`, then `git add -- openapi/openapi.json`.

## Acceptance
- A problem cannot leave `draft` without final acceptance criteria and sources or a no-source note.
- The default and the classic-5 plan both publish with the right ready set.
- No human can apply a run-decided transition.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The review queue and recommendations (12-u03) and the publication adapter (12-u08).
- Suggested paths from the Archive (plan 13) and the AI stage draft after publication (plan 13).
