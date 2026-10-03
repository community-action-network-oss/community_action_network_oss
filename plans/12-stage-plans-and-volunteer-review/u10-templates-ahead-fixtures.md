---
id: "12-u10"
plan: "12"
title: "Stage templates endpoint, attaching contributions made ahead to an active stage (STAGE-PREP-1), stage fixtures"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 53
depends_on: ["12-u06", "04-u02", "02-u12"]
writes: ["src/stages/http/**", "src/stages/app/**", "src/seed/stage-fixtures.ts", "src/seed.ts", "test/stage-ahead.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01b-stages.md", "docs/spec/constitution/rules.md#STAGE-PREP-1", "docs/design/ux/wireframes/stages.md#WF-STAGE-3", "docs/design/ux/wireframes/prepare.md#WF-PREP-3"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/stage-ahead.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["5cce38d"]
actual_hours: null
---
## Objective
Serve the default templates, let the steward attach what people contributed ahead of time to a stage once it is `active`, and extend the fictional dev fixture with stage rows so the app and the journeys have plans to show.

## Steps
1. `GET /v1/stage-templates` (public): `classic-5` and `one-stage` from the domain (12-u01) with names, goals, `depends_on`, starting criteria wording and decision method; the wording comes from the active policy pack when it carries a template and else from the domain constants (a pack value wins).
2. `POST /v1/stages/{id}/attach-contribution` (steward; stage `active` or `blocked`): turns an accepted `evidence` or `verification_evidence` contribution (made ahead or at problem level, URL only) into a `stage_evidence` row mapped to criteria ids, keeps the contribution link and marks it `attached_at`; an unaccepted or hidden contribution is refused; a contribution made ahead is never evidence and can never resolve a stage until attached (`STAGE-PREP-1`). Options made ahead need no attach: they simply appear in the workspace after ST03 with the label "Added ahead of time" (`for_later_stage` stays true as a record).
3. `seedStageFixture()` in `src/seed/stage-fixtures.ts`, wired behind `--fixture` (02-u12): stage rows, edges and criteria for the fictional problems (a plan with one stage `resolved`, one `active` and one `planned` with a contribution kept ahead; a classic-5 plan at `facts`; a blocked branch for the stuck fixture; all stages resolved for the solved fixture), with fixed ids, `stage_event` rows and the label "Fictional example". No stage content names a person.
4. Tests: templates equal the 01b section 4b.1 table (parse the spec table like 12-u01); attach maps and links; attach of a pending contribution refused; a planned stage refuses attach; the fixture seeds twice with identical ids and the stage map endpoint returns the expected chips.
5. `npm run openapi`, then `git add -- openapi/openapi.json`.

## Acceptance
- A contribution made ahead cannot be stage evidence until attached by the steward in an active or blocked stage.
- The templates endpoint equals the spec table.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The template picker UI (12-u14) and the stage workspace (12-u18).
