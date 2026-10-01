---
id: "14-u02"
plan: "14"
title: "Attestation option C: single-use challenge, verification, label on contributions"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 451
depends_on: ["14-u01","02-u04","04-u01"]
writes: ["src/location/**","src/contributions/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/location-attestation.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#3-candidates","docs/design/location/attestation.md#5-data-stored-and-what-the-server-can-learn","docs/design/location/attestation.md#7-interfaces","docs/adr/0016-private-location-attestation.md","docs/spec/constitution/rules-legal-sim.md#IMPACT-1","docs/spec/constitution/rules-legal-sim.md#LOC-PRIV-1","docs/spec/constitution/rules-legal-sim.md#LOC-DOUBT-1","docs/design/components/server.md"]
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
Slice-1 attestation, option C of ADR 0016: the server issues a single-use challenge, verifies the claim, and stores only `impact_label`, `attestation_result`, `area_version` and `proof_type` on the contribution (IMPACT-1, LOC-PRIV-1). Anchor unit: the client (14-u04), the downgrade rules (14-u03) and zk_cell_v1 plug into the ports defined here.

## Steps
1. Ports in src/location/domain (the interfaces of attestation.md section 7): `LocationVerifierPort.verify(req, ctx)`, `PlatformTokenVerifierPort.verify(token, challenge, messageDigest)` (App Attest or Play Integrity; real adapters are 14-u09; this unit ships the port and an in-memory fake), `ProofType` and `AttestationResult` types. Unknown proof types verify to `guest` with `invalid_proof`, never an error.
2. Table `location_challenge`: id, account_id, problem_id, area_version, nonce (random, stored hashed), expires_at (2 minutes), used_at. Nothing else, no IP, no device id. Deleted on use or expiry by the existing job runner.
3. `POST /v1/problems/{id}/location-challenge` (authenticated, rate-limited per account) returns `{challengeId, nonce, expiresAt, areaVersion}` for the latest area version of the problem. Operation id `issueLocationChallenge`.
4. Verifier `ClientAssertionVerifier` for proof type `client_assertion`: checks the challenge exists, belongs to the account and problem, is fresh and unused, matches the area version, and binds `messageDigest`; consumes it in one atomic update (single use under concurrency). Result `impacted` with `asserted` when the claim is `inside` and a native token is absent; `device_attested` with `verified` when a platform token passes the port; every other case maps to a `guest` label with a coarse result from the closed set `no_permission`, `unavailable`, `outside`, `stale`, `rate_limited`, `invalid_proof`. A verifier outage maps to `guest` with `unavailable` and never fails the post.
5. Contribution wiring: a migration adds `impact_label`, `attestation_result`, `area_version`, `proof_type` to the contribution table (read the contribution migration of 04-u01 first and extend it; CHECKs on the closed sets; default `guest`, `none`). The contribution service calls `LocationAttestationService.attest()` before insert from an optional `attestation` object on the contribution body. Missing, stale or invalid attestation gives `guest` and the message is accepted (IMPACT-1). The payload is verified and discarded: only the four fields are written. Any plan 12 contribution endpoint that targets a stage reuses the same service; leave a one-line integration note in src/location/README.md.
6. Privacy: a Nest logging interceptor redaction for the attestation field to its length and type; a lint-style test fails if any logger formats the attestation DTO; the OpenAPI schema for the contribution response carries the four fields and no location field. The moderation input builder (plan 09) never receives these fields: add a type-level test that the run input schema has none of them.
7. Tests (db and http): inside claim gives impacted/asserted; replayed challenge gives guest/stale; challenge of another account gives guest/invalid_proof; expired gives stale; unknown proof type gives guest/invalid_proof; verifier throw gives guest/unavailable and a 201; the same account labelled impacted on one problem and guest on another; schema scan finds no column named like lat, lon, cell, geohash, ip; log capture shows no payload.
8. Run `npm run openapi` and `git add -- openapi/openapi.json`.

## Acceptance
- A challenge is single use, bound to account and area version, and dead after 2 minutes (tested under concurrency).
- Only impact_label, attestation_result, area_version and proof_type are stored.
- Every failure or doubt yields guest and an accepted message.
- No log line and no moderation input contains attestation data.
- `npm run verify` is green with openapi regenerated.

## Out of scope
- Rate limits, surge downgrades and plausibility handling (14-u03).
- The client (14-u04 and later).
- Real App Attest and Play Integrity adapters (14-u09).
- Any zero-knowledge proof type.
