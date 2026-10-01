---
id: "12-u24"
plan: "12"
title: "Location permission pre-prompt (WF-LOCPERM-1) wired to the attestation challenge"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 49
depends_on: ["12-u22", "14-u02", "04-u08", "02-u24", "02-u25"]
writes: ["src/location/permission/**", "app/problems/**", "src/i18n/en.json", "__tests__/location-permission-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/guest.md#WF-LOCPERM-1", "docs/design/location/attestation.md", "docs/adr/0016-private-location-attestation.md", "docs/spec/constitution/rules-legal-sim.md#LOC-PRIV-1", "docs/spec/constitution/rules-legal-sim.md#LOC-DOUBT-1", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/location-permission-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-LOCPERM-1: a pre-prompt shown before the first contribution to a problem with an affected area, and from "Check again". It explains in plain words that exact location never leaves the device and only "inside the area or not" is shared, then asks the system permission. "Not now" is as prominent as "Allow", and contributing is never blocked: denial, no permission or an unavailable check (some browsers) means the contribution is labelled Guest.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. `LocationPrompt` screen or sheet: `{locperm.title}`, `{locperm.body}`, the four details `{locperm.detail1}` to `{locperm.detail4}`, the area name, `{locperm.allow}`, `{locperm.allowOnce}`, `{locperm.deny}` and the learn-more link `{locperm.learn}` to the attestation explainer; the denied state shows `{locperm.denied}` and `{locperm.denied.settings}` with the note that contributions go ahead as Guest.
3. On allow, run the local area check on the device against the polygon or cell set from the area endpoint (14-u01 contract), request a single-use challenge `POST /v1/problems/{id}/location-challenge` (14-u02) and attach `{attestation}` to the next contribution, option, evidence or recommendation write; exact coordinates, cells and IP-derived location are never stored, logged, cached or sent (an eslint no-console and a test that the attestation object has only the claim, challenge id and optional platform token). Offline, the check is queued on the device and shown as `{guest.offline}`.
4. The sender sees the label (Guest or none) before posting; a failed or stale challenge retries once, then falls back to Guest without an error code. Native builds pass a platform integrity token through a `PlatformTokenProvider` interface whose real adapters are plan 14 (a no-op provider here); the web result is self-asserted and reads "Reported impacted".
5. The system dialog is never opened before the pre-prompt is shown; the prompt is not shown again after an explicit "Not now" for the same problem until the poster taps "Check again".

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The pre-prompt always precedes the system dialog and "Not now" is as prominent as "Allow".
- Denial never blocks contributing; the item is labelled Guest.
- No location value is stored, logged or sent beyond the attestation object (test).
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Real App Attest and Play Integrity adapters and the zero-knowledge proof type (plan 14).
- The challenge and verification endpoints (14-u02).
