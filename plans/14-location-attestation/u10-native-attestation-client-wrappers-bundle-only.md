---
id: "14-u10"
plan: "14"
title: "Native attestation client wrappers: bundle only, unverified on device"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.2
priority: 459
depends_on: ["14-u04","14-u09"]
writes: ["src/location/native/**","app.json","package.json","package-lock.json","__tests__/location-native*.test.ts"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#4-anti-spoofing-signals-not-identity","docs/adr/0016-private-location-attestation.md","docs/adr/0005-web-first-verification.md","docs/open-questions/OQ-native-device-testing.md","docs/design/ux/wireframes/guest.md#WF-LOCPERM-1","docs/spec/constitution/rules-legal-sim.md#LOC-PRIV-1","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Collect an App Attest assertion (iOS) or a Play Integrity token (Android) and attach it to the attestation request as `platformToken`. Native builds are bundled only in slice 1 (D-8): the code compiles and is unit tested with mocks and is not verified on a device.

## Steps
1. Add the smallest maintained Expo-compatible wrapper for each platform API (record the choice and licence in the commit message); isolate them in `src/location/native/` behind a `PlatformTokenSource` interface; web returns `none`.
2. Extend `ClientAssertionProver` (14-u04) through composition: when a token source exists, it requests a token bound to the message digest and the challenge nonce and sets `proofType: device_attested`; a missing or failed token falls back to `client_assertion` without error.
3. The token is sent once and not stored or logged; mark the files "not verified on device" in a header comment and in the README of src/location.
4. Tests with mocked token sources: token attached when present, fallback when absent, no token in logs or storage, web path unchanged.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- The app compiles and tests pass for web with the native code path present.
- A missing token never blocks a send.
- `npm run verify` is green.

## Out of scope
- Verification on real devices (14-u29).
