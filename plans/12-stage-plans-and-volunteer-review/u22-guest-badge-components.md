---
id: "12-u22"
plan: "12"
title: "Guest badge and explanation sheet (WF-GUEST-1), wired into every content list"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 47
depends_on: ["12-u11", "04-u08", "12-u18", "02-u24", "02-u25", "14-u02"]
writes: ["src/location/guest/**", "src/contributions/**", "src/stages/**", "src/review/**", "src/i18n/en.json", "__tests__/guest-badge-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/guest.md#WF-GUEST-1", "docs/design/location/attestation.md", "docs/spec/constitution/rules-legal-sim.md#GUEST-LABEL-1", "docs/spec/constitution/rules-legal-sim.md#LOC-DOUBT-1", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/guest-badge-components.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-GUEST-1: a neutral outlined "Guest" pill with an info icon (not red, not a warning, token family slate) and an explanation sheet, shown on every contribution, option, choice comment, evidence item and volunteer recommendation wherever it is listed. Impacted items show no badge (guest is the exception); impacted is stated in words in counts and in the screen reader label ("From inside the affected area").

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. `GuestBadge` and `GuestReasonSheet` components in `src/location/guest/`: the sheet opens on tap, click, focus or Enter (never hover only; a bottom sheet on mobile) with `{guest.badge.why}`, `{guest.badge.help}` and one reason class text (`{guest.reason.outside}`, `{guest.reason.noPermission}`, `{guest.reason.failed}`, `{guest.reason.unavailable}`), the area name and version (`{guest.area}`, `{guest.area.version}`); it never states a location and never says the person did something wrong. On web while the check is self-asserted an impacted label reads "Reported impacted" (`OQ-impacted-label-web`).
3. Fill the badge slots left by 04-u08, 12-u16, 12-u17, 12-u18 and 12-u20 from the item fields `impactLabel` and `guestReason` (12-u11); readers see only "Guest" with the help text, never the pending detail.
4. Sender and poster states for their own item: Checking location (`{guest.pending}`), Waiting for a connection (`{guest.offline}`), Not confirmed (`{guest.failed}` with `{guest.failed.retry}` calling the retry of 12-u11); all display as Guest until confirmed; when the check succeeds the badge disappears with a live region announcement to the sender only. A failed check never shows a raw error code and keeps the input.
5. Nothing is blocked or hidden because of the label.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The sheet is operable by keyboard, touch and screen reader; focus returns to the trigger on close.
- No string states or implies a person's location or wrongdoing.
- The badge is neutral in light and dark and passes contrast.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The Impacted only filter (12-u23), the permission prompt (12-u24) and the client attestation (plan 14).
