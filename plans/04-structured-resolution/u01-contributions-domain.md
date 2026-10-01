---
id: "04-u01"
plan: "04"
title: "Contributions schema, type enum, allowed-per-state matrix, cooldown rules"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 70
depends_on: ["03-u14"]
writes: ["src/contributions/domain/**","src/db/schema.ts","drizzle/**","src/platform/error-codes.ts","test/contributions-schema.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#6-contributions","docs/spec/01-slice-1-brief.md#2-slice-1-defaults","docs/open-questions/OQ-cooldown-lengths.md","docs/spec/constitution/rules.md#EVID-URL-1","docs/design/system-design.md#3-slice-1-erd","docs/spec/constitution/rules.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/contributions-schema.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The data model and pure rules for contributions: the 16-value type enum, which types are allowed in which problem state, and the targeted reflection delays. No endpoints yet.

## Steps
1. src/contributions/domain/types.ts: CONTRIBUTION_TYPES exactly the 16 values of brief section 6; type ContributionType; moderation_feedback is reserved (rejected for users).
2. src/contributions/domain/allowed.ts: allowedTypes(state) transcribed from the brief ("all types in eligible and solution_development; ... nothing after a terminal state") and isAllowed(state, type); table-driven spec asserting all (state, type) pairs and that terminal and pre-publication states allow nothing. A spec reads the brief section and compares the per-state lists where practical.
3. src/contributions/domain/cooldown.ts: COOLDOWN = {betweenContributionsSeconds: 120, afterRejectionSeconds: 600, exemptTypes: ["progress_update", "verification_evidence"]} in one exported constant (OQ-cooldown-lengths: change here only); nextAllowedAt({now, lastContributionAt, lastRejectedAt, type}) returns null or a Date; spec with FixedClock-style plain dates.
4. Schema (append to src/db/schema.ts, migration via db:generate): contribution (id, problem_id fk, author_id fk, type text CHECK in the 16 values, body jsonb (the structured answers validated against the pinned contribution schema, 10-u29; no free-form text column), schema_id, schema_version, schema_hash, status text CHECK in pending_review (shown as Awaiting review)|accepted|hidden|tombstoned, last_run_id null, answers_contribution_id fk null, created_at, reviewed_at, tombstoned_at, origin_node_id, protocol_version) and evidence_ref (id, contribution_id fk, url text, note text, kind text, tier smallint null, attestation text null, added_at; no blob or file column: EVID-URL-1). Index (problem_id, status, type, created_at).
5. Add error code cooldown_active (429) to src/platform/error-codes.ts and make the kernel envelope allow an optional retryAfterSeconds field (additive, documented).
6. Schema e2e test: constraint failures for a bad type or status; no column in evidence_ref or contribution matches /blob|file|bytea|upload/ (EVID-URL-1 schema test).
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.
8. Tests that read files under ../docs (the superproject) resolve the path from the superproject root and skip with an explicit reason when it is absent, because can_server may be checked out alone.

## Acceptance
- The 16 types match the brief exactly (test compares the list).
- Allowed-per-state matrix is exhaustively tested.
- Cooldown constants live in one place with the brief defaults.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Endpoints and moderation (next units).
