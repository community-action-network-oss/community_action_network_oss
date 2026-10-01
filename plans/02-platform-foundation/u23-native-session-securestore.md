---
id: "02-u23"
plan: "02"
title: "Native session storage and device smoke test (founder-gated)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 201
depends_on: ["02-u16"]
writes: ["src/session/**","src/api/**","package.json","package-lock.json","docs/native-smoke-checklist.md","__tests__/native-session*.test.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/system-design.md#5-auth-flow","docs/open-questions/OQ-native-device-testing.md","docs/spec/01-slice-1-brief.md#8-accounts-and-sign-in-d-14","docs/design/ux/copy-deck.md","docs/design/ux/wireframes/auth.md#WF-SESSION-1","docs/design/ux/wireframes/auth.md#WF-SIGNIN-2","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/native-session.test.ts"]
founder_gate: true
defaults: "None: skipped until the founder runs device checks (OQ-native-device-testing)."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Native clients send X-CAN-Client: native, keep the returned token in expo-secure-store and send it as a bearer token. Verification on a real device or simulator is founder-operated (D-8), so this unit is gated and ships with a manual smoke checklist.

## Steps
1. Add expo-secure-store; src/session/nativeToken.ts with get, set, clear; the API client middleware adds Authorization: Bearer and X-CAN-Client: native on native platforms only (Platform.OS), web keeps cookies.
2. Unit tests with a mocked secure-store and Platform.OS switched; session-expired handling clears the token and shows the sheet.
3. Write docs/native-smoke-checklist.md: the manual steps for the founder on a device (sign-in code, restart persistence, sign out, session expiry, offline draft).
4. Confirm npx expo export --platform ios and android still bundle.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Web behaviour is unchanged.
- Tokens are stored only in SecureStore on native.
- The checklist exists for the founder to run; the unit does not claim device verification.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Push notifications.
- Claiming device verification.
