---
id: "02-u18"
plan: "02"
title: "Sign-in screens: email and code"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 32
depends_on: ["02-u17","02-u24","02-u25"]
writes: ["app/sign-in/**","src/auth/**","src/i18n/en.json","__tests__/signin-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/ux/wireframes/auth.md#WF-SIGNIN-1","docs/design/ux/wireframes/auth.md#WF-SIGNIN-2","docs/design/system-design.md#5-auth-flow","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/signin-screens.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-SIGNIN-1 (email for returning members) and WF-SIGNIN-2 (enter the 6 digit code) reusing the code entry component from the sign-up unit.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/sign-in/index.tsx: email field, submit calls POST /v1/auth/code; always show the same neutral confirmation "If that address can sign in, we sent a code" and navigate to /sign-in/code, passing email in memory only.
3. Extend CodeEntryScreen with: resend (disabled for 30 seconds with a text countdown, announced once, not every second), attempts feedback ("That code did not match" without revealing remaining count beyond the server hint), expired code message with a resend action, rate limited state with Retry-After.
4. After success honour returnTo (validated) and keep the local draft untouched.
5. Tests: neutral message identical for 200 and unknown email responses; wrong code shows message and keeps input focus; expired code; rate limited; resend countdown does not spam the live region; returnTo honoured.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The UI never reveals whether an email has an account.
- Code field has autoComplete one-time-code and numeric input mode.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Steward-specific sign-in (OQ-moderator-signin).
