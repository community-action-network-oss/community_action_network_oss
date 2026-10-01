---
id: "12-u07"
plan: "12"
title: "Stage resolution: DP-STAGE-RESOLUTION adapter, ST04 to ST06, per-criterion results and appeals"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 50
depends_on: ["12-u06", "09-u23", "09-u22", "09-u33"]
writes: ["src/stages/app/resolution/**", "src/stages/infra/resolution/**", "src/stages/http/**", "src/db/schema.ts", "drizzle/**", "test/stage-resolution.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01b-stages.md", "docs/design/flows/stage-work.md", "docs/design/flows/appeal.md", "docs/spec/constitution/rules.md#STAGE-RESOLVE-1", "docs/spec/constitution/rules.md#VERIFY-1", "docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals", "docs/design/ux/wireframes/stages.md#WF-STAGE-2"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/stage-resolution.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make a stage resolve only through a recorded moderation run on evidence against the stage's criteria (`STAGE-RESOLVE-1`, `VERIFY-1`): the stage becomes `resolved` (ST05) or goes back to `active` with hints (ST06). A completed task alone is not evidence. The decision cites rule ids and the policy version and can be appealed (`APPEAL-1`).

## Steps
1. `StageResolutionTarget`, a moderation target (the port of 09-u23): builds the run input from the frozen evidence (URLs, claim text, the criteria each item maps to), the stage criteria, the stage choice and the cited sources, all through the privacy gateway; no contribution text from guests outside the stage is included. Decision points: `DP-STAGE-RESOLUTION`, `DP-EVIDENCE-TIER` and `DP-SOURCE-TRUST` on every cited source (the result is stored on `stage_evidence.source_trust`).
2. Table `stage_resolution` (id, stage_id, attempt, run_id, decision_id, per_criterion jsonb [{criterionId, met, why, next}], rule_ids text[], policy_version, outcome `met|not_met|held`, appealable_until, created_at; insert-only for the app role). The outcome applier maps `met` (every criterion met) to ST05 and updates `acceptance_criterion.met_by`, `not_met` to ST06 with per-criterion hints beside the criteria, and a failed or low-confidence run to `held` (the stage stays `resolving` and the job retries; nothing resolves on a failed run, PUB-FAILCLOSED-1).
3. After ST05 the gating engine of 12-u06 runs in the same transaction (successors become `ready`, the final check is requested when due).
4. While `resolving` the evidence is frozen and only `clarifying_question` and `risk` contributions are accepted (01b 4b.6); after ST06 evidence can be added again and the poster resubmits with ST04.
5. `GET /v1/stages/{id}/result` (public after publish) returns the latest resolution for WF-STAGE-2: per-criterion met or not met in words with the why and the next step, the rule ids, "Decided under policy vX" and `appealableUntil`.
6. Appeals: register the stage decision as an appeal target (09-u33): the poster or the contributor who submitted the evidence may appeal until `appealable_until`; an appeal does not pause live successor stages; only an overturn changes state, through ST10 (the stage is re-decided under the new version, unstarted `ready` successors return to `planned`, a visible notice). Register a `TransitionEffects` handler for T20 and T21 (09-u63 applies the problem transition): the affected stages move `resolved` to `active` (ST10) and their unstarted successors back to `planned`, with history and the old result kept.
7. Tests (e2e with the FakeModel, recorded fixtures): met resolves and readies successors; not met returns with hints and a second attempt resolves; a held run leaves the stage `resolving` and retries; evidence cannot be added while resolving; a task done with no evidence never resolves; an appeal filed on a met decision leaves a started successor running; an overturn runs ST10 once; T20 effect reopens exactly the affected stages.
8. `npm run openapi`, then `git add -- openapi/openapi.json`.

## Acceptance
- A stage never resolves without a run and evidence (route scan: no endpoint sets `resolved`).
- Results show per-criterion reasons, rule ids and the policy version.
- Held means the stage waits, never resolves.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The DP prompts and eval content (plan 10 and plan 09).
- Re-running resolution when an evidence rule changes (09-u60 to 09-u62 select the candidates; this unit only applies ST10).
- The final solved check (T15, 05-u02).
