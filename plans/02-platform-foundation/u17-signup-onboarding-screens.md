---
id: "02-u17"
plan: "02"
title: "Sign-up and onboarding screens"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 31
depends_on: ["02-u16","02-u14"]
writes: ["app/sign-up.tsx","app/welcome.tsx","app/sign-in/code.tsx","src/auth/**","src/i18n/en.json","__tests__/signup-*.test.tsx","__tests__/onboard-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/ux/wireframes/auth.md#WF-SIGNUP-1","docs/design/ux/wireframes/auth.md#WF-ONBOARD-1","docs/design/system-design.md#5-auth-flow","docs/open-questions/OQ-age-default.md","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/signup-screen.test.tsx __tests__/onboarding-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-SIGNUP-1 (redeem invite, email, 18+ attestation) and WF-ONBOARD-1 (your generated public name, one regenerate), wired to the generated client.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/sign-up.tsx: fields invite code, email, checkbox "I am 18 or older" (required, maps to ageConfirmed), submit calls POST /v1/auth/signup via unwrap; on success navigate to /sign-in/code passing the email only through in-memory state (a small zustand-free module store in src/auth/pending.ts), never through the URL; show the emergency notice and the line "Your email is never shown."
3. Create app/sign-in/code.tsx as a thin route that renders the CodeEntryScreen from src/auth/CodeEntryScreen.tsx (6 digit input, autoComplete one-time-code, inputMode numeric, verify via POST /v1/auth/verify). The sign-in units reuse this component. On success refresh the session, then route to /welcome for first sign-in (signup flow) or to returnTo.
4. app/welcome.tsx (RequireAuth): shows "Your public name is {handle}. Your email is never shown." (ICU), a Regenerate button that calls POST /v1/me/handle/regenerate once; after use the button is replaced by text saying a name can be changed once; 409 shown as that same text. Continue goes to /.
5. States: invalid or used invite shows the generic invalid_invite message beside the invite field; rate limited shows the calm too-many-attempts text with Retry-After seconds; offline blocks submit with common.offline.banner; validation inline.
6. Tests: happy path, invalid invite, age box unchecked, rate limited, offline, regenerate once then disabled, the email string never appears in rendered output after submit.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The 18+ attestation is required and sent as ageConfirmed.
- The email never appears in the URL, in rendered text after submit, or in client storage.
- One regenerate only, enforced by server and reflected in UI.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Returning-member sign-in screens (next unit).
- Invite creation (plan 03).
