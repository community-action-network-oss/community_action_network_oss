---
id: "13-u21"
plan: "13"
title: "Archive and suggestion OpenAPI audit: key sets, no leaks, privacy invariants"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.2
priority: 420
depends_on: ["13-u14","13-u16","13-u05","13-u20","09-u43"]
writes: ["test/archive-openapi-audit.e2e-spec.ts","test/archive-privacy.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#12-abuse-and-poisoning","docs/spec/24-archive-reuse.md#241-the-archive-record","docs/spec/constitution/rules-legal-sim.md#ARCHIVE-1","docs/spec/constitution/rules-legal-sim.md#LOC-PRIV-1","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Conformance tests over everything plan 13 exposes, in the style of 09-u43.

## Steps
1. Operation id and response key-set audit for `/v1/archive*`, `/v1/problems/{id}/suggestions*`, `/v1/problems/{id}/context-profile*`, `/v1/problems/{id}/stage-draft*`.
2. Leak scan: every public archive response, over the full simulation fixture, contains no email-like string, no handle of a non-opted-in contributor, no account id, no coordinate-like number pairs and no attestation field; the poster id is never linkable from `problem_ref` (the mapping table is not exposed by any query).
3. Suggestion payloads never include another draft's data; the retrieval query object never includes raw intake (spy on the retrieval port in an e2e run).
4. Fail-closed matrix rows for plan 13: DP-ARCHIVE hold, DP-REUSE-FIT hold, embedding outage, budget exhausted, unresolved legal stack: each shows nothing public, never a partial record or an unchecked suggestion.
5. No route accepts the creation of an archive record from outside (route table test).

## Acceptance
- The audit fails when a key, field or route is added without review.
- `npm run verify` is green.

## Out of scope
- Fixing any leak found (open a unit in the plan).
