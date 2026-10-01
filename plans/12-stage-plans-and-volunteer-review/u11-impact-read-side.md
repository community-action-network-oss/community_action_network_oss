---
id: "12-u11"
plan: "12"
title: "Impact label read side: impactedOnly filter and exact filter counts on every content list"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 54
depends_on: ["14-u02", "04-u02", "12-u02", "12-u03"]
writes: ["src/contributions/http/**", "src/contributions/app/**", "src/stages/http/**", "src/stages/app/**", "src/review/http/**", "src/review/app/**", "src/db/schema.ts", "drizzle/**", "test/impact-filter.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#impacted-and-guest-labels-d-73-d-75", "docs/design/ux/wireframes/guest.md#WF-FILTER-1", "docs/design/ux/wireframes/guest.md#WF-GUEST-1", "docs/design/location/attestation.md", "docs/spec/constitution/rules-legal-sim.md#IMPACT-1", "docs/spec/constitution/rules-legal-sim.md#GUEST-LABEL-1", "docs/spec/constitution/rules-legal-sim.md#LOC-PRIV-1", "docs/spec/constitution/rules-legal-sim.md#LOC-DOUBT-1"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/impact-filter.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Every contribution, option, choice comment, evidence item and volunteer recommendation is labelled `impacted` or `guest` (D-73), and every content list can hide guest items with `impactedOnly`, with exact counts so nothing is removed silently (`GUEST-LABEL-1`, WF-FILTER-1). The attestation service and the contribution columns are 14-u02; this unit adds the label to the stage and review write paths and the read side everywhere.

## Steps
1. Migration: add `impact_label` (`impacted|guest`, default `guest`), `attestation_result`, `area_version` and `proof_type` (the closed sets of 14-u02) to `stage_evidence` and `review_recommendation`; `stage_option` and `stage_choice` comments take the label of their contribution. The write paths `POST /v1/stages/{id}/evidence`, option creation and `POST /v1/review/{problemId}/recommendations` accept the optional `attestation` object and call the `LocationAttestationService` of 14-u02 (verify then discard; only the four fields are stored; a missing, stale or failed attestation gives `guest` and the item is still accepted, `LOC-DOUBT-1`).
2. Read side: every list response (contributions 04-u02, stage options and evidence 12-u02, recommendations 12-u03) returns per item `impactLabel` and, for guest items, `guestReason` from the closed class set (`outside`, `no_permission`, `not_confirmed`, `unavailable`; never a location, never an accusation) and `areaVersion`; the query parameter `impactedOnly=true` hides guest items from the list but never deletes them; the response carries `filterCounts: {impacted, guest, hidden}` computed over the same list, exact, and no other count field (RANK-1 is unchanged: no per-type or engagement counts). Counts never include private data and never include pending items of other authors.
3. The label is a view only: stage resolution, recommendations and every decision still record guest items; moderation inputs never receive the label or any attestation field (`LOC-PRIV-1`, a type-level test in the run input builder).
4. A poster viewing their own item gets `canRetryAttestation` true while the label is guest for a retryable reason; `POST` retry reuses 14-u02 (single use challenge).
5. Tests: label per item on each list; `impactedOnly` hides guests and `hidden` equals their number; a failed attestation still creates the item as guest; no response carries coordinates, cell or IP-derived fields (exact key sets); counts match the visible list; run input has no label field.
6. `npm run openapi`, then `git add -- openapi/openapi.json`.

## Acceptance
- No content is blocked or hidden by default because of the label; the filter hides only on request and always says how many.
- Only the label, result, area version and proof type are stored (schema scan).
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The attestation challenge, verification and downgrade rules (14-u02 and plan 14).
- The badge, filter and permission screens (12-u22 to 12-u24).
