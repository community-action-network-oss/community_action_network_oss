---
id: "14-u09"
plan: "14"
title: "Native integrity verifiers: App Attest and Play Integrity adapters"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 458
depends_on: ["14-u02"]
writes: ["src/location/infra/platform/**","src/config.ts",".env.example","test/location-platform.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#4-anti-spoofing-signals-not-identity","docs/design/location/attestation.md#8-spike-plan","docs/adr/0016-private-location-attestation.md","docs/open-questions/OQ-native-device-testing.md","docs/spec/constitution/rules-legal-sim.md#LOC-DOUBT-1","docs/design/components/server.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Real adapters behind the `PlatformTokenVerifierPort` of 14-u02: Apple App Attest assertions (verified locally, counter checked) and Play Integrity standard verdicts (decoded through Google). The code path is built after web (D-8); this unit is verified with recorded fixtures only, never on a device.

## Steps
1. App Attest: verify the assertion and counter against the stored public key of the attested key (a table `platform_key` with account id, key id, public key, counter; no device identifiers beyond what the protocol needs; deleted with the account). Attestation of a new key is a separate endpoint call that stores the key. Use a well-maintained verification library only if it is small and licensed permissively, otherwise implement the documented CBOR and certificate chain checks with the stdlib and test vectors.
2. Play Integrity: decode the standard verdict through Google's API using a service account from configuration (`PLAY_INTEGRITY_*` env, placeholders in .env.example, never committed), bind the request hash to the message digest and the challenge nonce; a verdict is a signal, not a ban list: devices without Play services map to guest weight, not rejection.
3. Both adapters return `{ok, reason}` to the verifier; an absent verdict, an unsupported platform or a verifier outage maps to `guest` with `unavailable` and never an error or a failed post; a failed verdict maps to `guest` with the coarse `invalid_proof`.
4. Configuration `LOCATION_PLATFORM_VERIFIERS` (comma list, default empty) so nothing runs unless configured; a missing config logs one line and uses the fake-free no-token path.
5. Tests with recorded fixtures: valid assertion, replayed counter, wrong nonce, bad verdict, outage, device without Play; no secret or token in any log line.

## Acceptance
- Absent or failed verdicts downgrade the message to guest and never fail the post.
- No secrets in the repo or logs.
- `npm run verify` is green; native verification on real devices stays out of scope (E7, 14-u29).

## Out of scope
- Device round trips (14-u29, founder-gated).
- Client token collection (14-u10).
