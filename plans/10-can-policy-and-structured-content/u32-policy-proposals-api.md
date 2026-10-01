---
id: "10-u32"
plan: "10"
title: "Policy proposals API: submit, stage, protected-core refusal, eval and replay reports"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 32
depends_on: ["10-u29","10-u24","10-u12"]
writes: ["src/policy-proposals/**","src/app.module.ts","drizzle/**","src/db/schema.ts","test/policy-proposals/**","test/fixtures/policy-proposals/**","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/policy.md#WF-POLICY-1","docs/design/ux/wireframes/policy.md#WF-POLICY-2","docs/design/ai/amendment-loop.md","docs/design/flows/policy-amendment.md","docs/spec/constitution/rules.md","docs/open-questions/OQ-ratification-method.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run openapi","git add openapi/openapi.json","npm run verify"]
founder_gate: false
defaults: "Opening the real GitHub pull request is NOT part of this unit. The proposal is stored with a `pr_url` field the maintainers fill (or a later unit sets via a GitHub app). Reports are ingested from CI as JSON posted by a maintainer-only token endpoint; nothing here calls GitHub."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The server side of the amendment loop's front and middle: a signed-in member submits a policy proposal (schema `policy_proposal`), the server refuses protected-core changes with the reason, and maintainers attach the CI eval and replay reports and move the stage, so WF-POLICY-2 can show where a proposal stands.

## Steps
1. Table `policy_proposal(id, account_id, schema_version, body jsonb, stage, pr_url, eval_report jsonb, replay_report jsonb, protected_core_flag, created_at, updated_at)`; stages `submitted|eval|replay|ratification|shadow|canary|full|rejected|withdrawn` with a pure transition table (domain, table-driven tests); one stage change = one event in the append-only `events` log and an `audit_event`.
2. Endpoints (explicit `operationId`s): `POST /v1/policy-proposals` (validate against `policy_proposal` schema via 10-u29, account required, per-account cap from limits.yaml `caps.policy_proposals_per_account_per_period`, default 2 per 7 days, add key to limits in a note for 10-u07 follow-up), `GET /v1/policy-proposals/{id}` (public), `GET /v1/policy-proposals` (public, stage filter), `POST /v1/policy-proposals/{id}/reports` (maintainer role; accepts `eval` and `replay` JSON validated against `can_policy` report schemas copied into fixtures; verdict `blocked` sets stage back to `eval`/`replay` with the reason), `POST /v1/policy-proposals/{id}/stage` (maintainer role, legal transitions only).
3. Protected-core check: the `rule_ids_and_dps_touched` field is compared with the active pack's `protected_core` list (10-u04 registry); a hit returns 422 `protected_core` with the constitution reference text and creates no proposal. The text field passes through the same privacy, naming, tone and crisis gates as any content (hook into the moderation port from plan 09 when present; until then the deterministic checks only, noted in the commit message).
4. Read model for the view: response includes `eval` summary rows (name, status passed|did_not_pass), `replay` totals (changed, of, expected, unexpected, stricter, more_permissive), ratification state (`panel_status`, `transitional: true` while founder stewardship applies), rollout stages with dates. Strings are keys, not prose (the app maps them).
5. Tests: submit ok; protected-core refused; per-account cap; non-maintainer cannot attach reports or move stage; blocked replay verdict moves stage back; transition table; public reads. Regenerate OpenAPI.

## Acceptance
- A proposal touching a protected-core rule is refused with the reason and nothing is stored (test).
- Only maintainers attach reports or move stages (tests).
- Stage transitions follow the table and write events (tests).
- `npm run verify` green.

## Out of scope
- Panel selection and voting (OQ-ratification-method).
- Creating the GitHub PR automatically.
- The UI (10-u38, 10-u39).
