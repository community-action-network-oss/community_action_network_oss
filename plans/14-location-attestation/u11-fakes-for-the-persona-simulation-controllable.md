---
id: "14-u11"
plan: "14"
title: "Fakes for the persona simulation: controllable label on the test server"
repo: can_server
area: can-server
model: sonnet
est_hours: 1
priority: 460
depends_on: ["14-u02","14-u03"]
writes: ["src/location/testing/**","src/config.ts",".env.example","test/location-fake.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#7-interfaces","docs/adr/0016-private-location-attestation.md","docs/design/ai/simulation.md","docs/spec/constitution/rules-legal-sim.md#IMPACT-1","docs/design/components/server.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Both attestation ports have a fake so the persona simulation (plan 11) and tests can assign labels without a device. The fake is impossible to enable in production.

## Steps
1. `FakeLocationVerifier`: reads a signed test token in the attestation `payload` (HMAC with a test-only secret) that names the desired label and result; behaves like the real verifier otherwise (challenge consumption, rate limits and doubt rules still apply).
2. Enable with `LOCATION_VERIFIER=fake` only when `NODE_ENV` is `test` or `simulation`; config validation refuses the flag in `production` and the process exits at startup (test). The test secret comes from the environment, a placeholder is in .env.example.
3. A helper `makeTestAttestation(label, result)` exported for plan 11 drivers.
4. Tests: the fake yields each label and result; the production guard refuses; the doubt rules still downgrade a surge under the fake.

## Acceptance
- The fake cannot be enabled in production (config test).
- Plan 11 can obtain any label without a device.
- `npm run verify` is green.

## Out of scope
- Persona driver changes (plan 11).
