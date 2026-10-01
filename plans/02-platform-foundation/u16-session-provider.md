---
id: "02-u16"
plan: "02"
title: "Session provider, route guard and session-expired sheet"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 30
depends_on: ["02-u08","02-u13","02-u15"]
writes: ["src/session/**","src/navigation/**","app/_layout.tsx","src/i18n/en.json","__tests__/session-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#5-auth-flow","docs/design/ux/wireframes/auth.md#WF-SESSION-1","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/session-provider.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Give the app a real session: load GET /v1/me on boot, expose useSession, guard member-only routes, and show WF-SESSION-1 as a sheet over the current screen when any call returns session_expired, keeping unsaved input.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. src/session/SessionProvider.tsx: TanStack Query for GET /v1/me; 401 means guest; the provider feeds the SessionContext from the nav-shell unit; exposes refresh() and clear() (logout calls POST /v1/auth/logout then clears and invalidates all queries).
3. RequireAuth wrapper component and useRequireAuth hook: when guest, route to /sign-in with a returnTo param (path only, validated to start with / and not //) so the user lands back where they were.
4. SessionExpiredSheet (WF-SESSION-1): subscribes to the api session-events "expired"; renders as a modal sheet over the current screen (does not navigate away), says the session ended and that nothing was lost, primary action "Sign in again" opens /sign-in with returnTo the current path, secondary "Keep reading". Focus moves into the sheet, Escape closes it and returns focus to the trigger, announced via live region. Never clears form state (forms live in their screens; the sheet is an overlay).
5. Mount the provider and sheet once in app/_layout.tsx.
6. Tests with mocked fetch: boot as guest and as member; 401 session_expired shows the sheet over the current screen and a TextField value typed before stays; returnTo rejects an absolute URL; logout clears the cache.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- WF-SESSION-1 appears on session_expired without losing typed input (test).
- returnTo is validated (open redirect test).
- Email is never rendered or stored in app state (the /v1/me type has none).
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Sign-in and sign-up screens.
- Native SecureStore (founder-gated).
