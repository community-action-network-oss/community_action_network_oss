---
id: "04-u02"
plan: "04"
title: "Contribution endpoints with schema validation, checks, cooldown and pending run"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 71
depends_on: ["04-u01", "03-u08", "10-u29"]
writes: ["src/contributions/**","src/app.module.ts","test/contributions.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#6-contributions", "docs/design/system-design.md#6-api-surface-v1", "docs/spec/constitution/rules.md#PRIV-GATE-1", "docs/spec/constitution/rules.md#EVID-URL-1", "docs/spec/constitution/rules.md#RANK-1", "docs/spec/constitution/rules.md#OWN-1", "docs/spec/constitution/rules.md#STRUCT-ONLY-1", "docs/design/ux/wireframes/participate.md#WF-CONTRIB-1", "docs/design/ux/wireframes/participate.md#WF-CONTRIB-2"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/contributions.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
GET and POST /v1/problems/{id}/contributions and PATCH /v1/contributions/{id}. A contribution targets a stage (optional stageId) or the problem. Contributions are structured (STRUCT-ONLY-1), checked on submit, then wait for the blocking moderation run (09-u40) before they are public, and respect delays. Contributions to a planned or ready stage are allowed and kept ready (STAGE-PREP-1).

## Steps
1. POST (member): {type, stageId?, schemaVersion pin, body (object of answers), evidenceRefs?: [{url, note}], answersContributionId?, attestation?}. Validate: problem is published and isAllowed({problemState, stageState, type}) (a disallowed pair is refused with not_allowed_in_state and no row written, STAGE-1; the stage must belong to the problem); set for_later_stage when the stage is planned or ready; a proposed_solution with a stageId also creates its stage_option through the ContributionPort that 12-u02 defines (this unit implements the adapter: the option stays hidden until the contribution is accepted); evidence and verification_evidence made ahead are plain contributions, never stage_evidence (the steward attaches them later, 12-u10); the optional attestation goes through a ContributionAttestationPort whose null object returns impact_label guest and proof_type none, replaced by the LocationAttestationService of 14-u02 (which stores only the four label fields and discards the payload; failure or doubt means guest and the message is still accepted, IMPACT-1); the body validates against the pinned contribution schema for that type through the 10-u29 validator (field names, lengths and required answers come from the schema, never from this unit); evidence type needs at least one URL; factual_claim may reference a clarifying_question of the same problem; moderation_feedback refused; cooldown via nextAllowedAt (429 cooldown_active with retryAfterSeconds and calm message). Run the deterministic checks (privacy, secrets, URL rules) from plan 03: hard flags reject with fieldErrors; personal_experience must pass identifier checks; review flags need acknowledgement body field keptFlagIds. Create with status pending_review (the item is Awaiting review, visible only to its author; 09-u40 enqueues the run and applies publish, needs_revision or reject), evidence_ref rows with category from checkEvidenceUrl.
2. GET list (public): only accepted contributions to everyone, plus the caller's own pending ones flagged status pending_review; each item {id, type, stageId, forLaterStage, body, authorHandle, createdAt, status, answersContributionId, evidenceRefs}; grouped client-side; filterable by ?stageId and ?problemLevel=true; the label read side (impact_label and the Impacted only filter with its exact counts) is added by 12-u11 after 14-u02. No counts, no reactions, order by createdAt ascending (accepted means published by a run) (RANK-1 spirit); response includes criteria {order: "created_at_asc", usesEngagementSignals: false}.
3. PATCH (author): withdraw (tombstone: body null, tombstoned_at set, status tombstoned) or edit body only while pending_review or needs revision (an edit cancels the in-flight run, 09-u40; a published item changes only through an on-update run, 09-u26); accepted text cannot be silently edited (edit after publication is OQ-edit-after-publication: default is withdraw and resubmit). Tombstones remain visible as placeholders with date.
4. Add allowedContributionTypes (array from allowedTypes for the problem-level target, empty for guests and in terminal states) to the problem detail response (GET /v1/problems/{id}) and the per-stage array to the stage detail response (GET /v1/stages/{id}, 12-u02) so clients never hardcode the matrix; update the detail key-set tests.
5. Audit events for create and withdraw (no body). Rate limit through the existing limiter in addition to cooldown. A problem initiator may contribute like anyone.
6. Tests: type not allowed in state (including progress_update on a planned stage), a contribution made ahead to a planned stage is kept with for_later_stage and listed for its stage, a proposed_solution to a stage creates a hidden stage_option, per-state happy paths for 3 types, cooldown 2 minutes and exemption for progress_update, hard flag rejection, schema_invalid with a JSON pointer for a missing required answer, answers link validation, pending visible only to author, tombstone, key-set test (no email, no counts), OpenAPI has no multipart route.
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- A pending contribution is invisible to everyone except its author.
- No counts or ranking fields exist anywhere in the response (key-set test).
- All writes require a session (ACCT-REQ-1 route-table test still passes).
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The moderation run on contributions (09-u40).
- The impact label read side and the Impacted only filter (12-u11) and the attestation service (14-u02).
- Notifications.
