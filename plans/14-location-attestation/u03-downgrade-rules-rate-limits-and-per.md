---
id: "14-u03"
plan: "14"
title: "Downgrade rules, rate limits and per-area surge caps (LOC-DOUBT-1)"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 452
depends_on: ["14-u02"]
writes: ["src/location/app/doubt/**","src/location/domain/doubt/**","src/db/schema.ts","drizzle/**","test/location-doubt.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#4-anti-spoofing-signals-not-identity","docs/adr/0016-private-location-attestation.md","docs/spec/constitution/rules-legal-sim.md#LOC-DOUBT-1","docs/spec/constitution/rules-legal-sim.md#IMPACT-1","docs/open-questions/OQ-limits.md","docs/design/components/server.md"]
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
The decision rule of attestation.md section 4: `impacted` only if the proof verifies, the challenge is fresh, rate limits pass and no downgrade signal fires. Any doubt means `guest` for that message only, with a neutral coarse reason. Never an accusation, never a restriction (LOC-DOUBT-1).

## Steps
1. Domain `decide(signals) -> {label, result}` as a pure function with a closed signal set: `challenge_fresh`, `proof_valid`, `client_plausible` (the client-reported bit), `mock_location_flag`, `integrity_failed`, `rate_limited`, `area_surge`, `account_too_new`. The result set stays the closed list of IMPACT-1 (`rate_limited`, `invalid_proof`, `stale`, `unavailable`, `outside`, `no_permission`, `verified`, `asserted`); no result string says or implies spoofing. A table test covers every signal combination.
2. Rate limits as pack values read through the policy module (defaults in 10-u66): per account per area per hour, per account per day across areas, and a per-area daily cap on `impacted` contributions beyond which new ones are `guest` pending review of the surge. Counters live in `location_counter` keyed on (account_id, area_key) and (problem_id, area_version, day); they hold counts and a window start, never a location; rows older than the window are deleted by the existing job runner.
3. Account age may reduce weight only: a new account within the pack window is `guest` while a surge is active. It never reveals identity or location.
4. Hook into `LocationAttestationService.attest()` of 14-u02: after the verifier, `decide()` is applied; the moderation outcome of the message is unaffected (the label is not an input to any run, see 14-u12).
5. LOC-DOUBT-1 guard: a DB-level and test-level assertion that no code path writes any restriction, sanction, flag or reputation row from a location signal (the test counts rows in those tables, or the audit table, before and after every doubt scenario).
6. Tests: each doubt signal gives `guest` with the right coarse result and an accepted message; a surge flips later contributions to guest, then recovers after the window; counters hold no location; the same account can be impacted in one place and guest in another; sanction and reputation tables unchanged in every scenario.

## Acceptance
- Every doubt signal downgrades only that message, with a neutral reason.
- No restriction, sanction or reputation write follows from a location signal (tested).
- Counters are keyed on account and area and expire with the window.
- `npm run verify` is green.

## Out of scope
- The client plausibility computation (14-u04).
- Real native integrity adapters (14-u09).
