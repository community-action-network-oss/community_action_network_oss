---
id: "14-u04"
plan: "14"
title: "Client area check library: cached cell set, plausibility history, assertion prover (consolidates 12-u24)"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.5
priority: 453
depends_on: ["14-u01","14-u02","12-u24","02-u13"]
writes: ["src/location/**","app/problems/**","src/api/schema.d.ts","__tests__/location-*.test.ts","__tests__/location-permission-*.test.tsx","package.json","package-lock.json"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#3-candidates","docs/design/location/attestation.md#4-anti-spoofing-signals-not-identity","docs/design/location/attestation.md#6-ux-hooks","docs/design/location/attestation.md#7-interfaces","docs/design/ux/wireframes/guest.md#WF-LOCPERM-1","docs/adr/0016-private-location-attestation.md","docs/spec/constitution/rules-legal-sim.md#LOC-PRIV-1","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The on-device half of option C (web first, D-8) as one tested library: fetch and cache the area of a problem, check the device position against its cell set locally, keep a short local history for plausibility, and produce the attestation request. Coordinates never leave the device and are never logged. The permission pre-prompt screen (WF-LOCPERM-1), the Guest badge and the Impacted only filter are built by plan 12 (12-u24, 12-u22, 12-u23) and the server read side by 12-u11; this unit does not rebuild them. 12-u24 wrote a first inline version of the local check: read it first, then move that logic into this library (src/location/check, area, history, prover) and make the screen call the library, deleting the duplicate. Keep the screen behaviour and its tests green.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit.
2. Add `h3-js` (the same version as the server, 14-u01) as a dependency. `src/location/area.ts`: fetch `GET /v1/problems/{id}/area` through the generated client and cache the cell set in app storage keyed by (problem, area_version) so the check runs offline; the cell set is a few KB.
3. `src/location/check.ts`: `checkInside(position, area) -> "inside" | "outside"` with `latLngToCell` at the area resolution; a pure function with fixtures including border cells. The position object exists only inside this module call; nothing writes it to storage, logs, analytics, error reports or network (a lint rule and a test that stubs `fetch`, `console` and the logger and asserts no coordinate-like numbers pass through).
4. `src/location/history.ts`: the local recent-cell history for plausibility only (cell ids with coarse timestamps, short TTL 24 hours, stored in app storage only, never uploaded, cleared on sign-out). `plausible(history, newCell)` refuses `inside` when the jump from the last fix is physically implausible or the position flips between regions within minutes (thresholds are constants in one file). Only the boolean leaves the module.
5. `src/location/prover.ts`: `ClientAssertionProver` implementing the client `LocationProverPort` of attestation.md section 7: gets the position (browser geolocation on web through an injected `PositionSource`; the one-time permission where the browser supports it), calls `POST /v1/problems/{id}/location-challenge` at send time (not at fix time), checks the area, and returns the `AttestationRequest` with proof type `client_assertion`, `messageDigest` of the contribution payload and the challenge response. Missing permission, an unavailable source, outside, or a stale or failed challenge returns a typed `guest` reason from the closed set; it never throws to the caller.
6. `FakeLocationProver` and `FakePositionSource` for tests and the persona simulation (controllable result, no device).
7. Offline queue rule: a message queued for longer than the challenge window is sent as guest unless re-checked; the label is decided at the actual send (attestation.md section 6).
8. Tests: border cell fixtures; offline check from the cache; implausible jump is not asserted; history TTL and sign-out clearing; no coordinate reaches fetch, console or storage (spy test); the challenge is requested at send time; every failure maps to a typed reason; the 12-u24 screen tests still pass against the library.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- No coordinate-like value is stored, logged or sent (spy tests).
- The check works offline from the cached cell set.
- Every failure yields a typed guest reason, never an exception.
- `npm run verify` is green.

## Out of scope
- The permission, badge and filter screens (plan 12).
- Native token collection (14-u10).
- Any zero-knowledge proof (zk units, gated on 14-u32).
