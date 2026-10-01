---
id: "14-u12"
plan: "14"
title: "Privacy conformance suite: schema scan, log redaction, moderation inputs, API keys"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.2
priority: 461
depends_on: ["14-u03","12-u11","09-u22"]
writes: ["test/location-privacy.e2e-spec.ts","test/location-privacy-static.spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/constitution/rules-legal-sim.md#LOC-PRIV-1","docs/spec/constitution/rules-legal-sim.md#IMPACT-1","docs/spec/constitution/rules-legal-sim.md#LOC-DOUBT-1","docs/design/location/attestation.md#5-data-stored-and-what-the-server-can-learn","docs/design/components/server.md"]
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
Executable proof of LOC-PRIV-1 and the stored-data table of the design: nothing but label, result, area version and proof type is stored; nothing leaks to logs, moderation inputs or APIs.

## Steps
1. Schema scan: introspect the database and fail on any column or type named like latitude, longitude, lat, lon, geohash, cell, h3, coordinate, ip_location, wifi, tower, or any `geography`/`geometry` type outside `problem_area_version`; `location_challenge` and `location_counter` hold only the allowed columns.
2. Log scan: run the attestation endpoints with a unique marker payload and a proof body; capture all logger output and assert the marker and the body are absent and that only length and type are logged; a static test fails if any logger call formats the attestation DTO.
3. Moderation input scan: the run input schema of plan 09 (and the builder of 09-u22) is checked at the type level and by a fixture run with an impacted and a guest contribution: no field or value from the attestation reaches any DP input; the label is not an input by default.
4. API scan: no response key set anywhere contains per-person area lists, challenge nonces after use, platform tokens or proof bytes; the proof is discarded (no column stores it).
5. Static check for the guarantee "proofs are verified then discarded": grep that no repository method persists `payload`.

## Acceptance
- The suite fails if a location column, log line, moderation input or API field appears.
- `npm run verify` is green.

## Out of scope
- Fixing any finding (a new unit).
