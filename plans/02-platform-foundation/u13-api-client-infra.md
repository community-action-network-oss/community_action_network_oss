---
id: "02-u13"
plan: "02"
title: "API client infrastructure: CSRF, error envelope, session events"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 21
depends_on: []
writes: ["src/api/**","__tests__/api-*.test.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#6-api-surface-v1","docs/design/system-design.md#5-auth-flow","docs/design/ux/copy-deck.md","docs/design/ux/wireframes/auth.md#WF-SESSION-1","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/api-client.test.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["80636e7"]
actual_hours: 0.1
---
## Objective
Extend the typed openapi-fetch client with everything every screen needs: credentials, the CSRF header, the error envelope parsed to a typed ApiError, offline detection, and a session-expired event bus. This unit has no server dependency (the client is tested against a mocked fetch).

## Steps
1. In src/api/client.ts keep the late-bound fetch; add credentials "include" for web and a middleware that, for POST, PATCH, PUT, DELETE, reads the can_csrf cookie (web: document.cookie) and sets X-CAN-CSRF; ignore on native.
2. src/api/errors.ts: class ApiError {status, code, message, fieldErrors?: Record<string,string>, kind: "validation"|"unauthenticated"|"session_expired"|"not_permitted"|"not_found"|"rate_limited"|"offline"|"server"}; parseApiError(response) reads {error:{code,message,fieldErrors}}; a thrown TypeError from fetch becomes kind "offline".
3. src/api/session-events.ts: a tiny typed emitter (subscribe/emit, no dependency) emitting "expired" when any response is 401 with code session_expired. The middleware emits; screens never poll.
4. src/api/unwrap.ts: unwrap(promise) returning data or throwing ApiError, designed for TanStack Query queryFn and mutationFn. src/api/query-client.ts exports a QueryClient with retry false for 4xx and 2 retries with backoff otherwise, and a networkMode that surfaces offline state.
5. Do not edit src/api/schema.d.ts. Add jest tests with a mocked globalThis.fetch: CSRF header attached on POST only, error envelope parsed with fieldErrors, 401 session_expired emits once, network failure becomes offline, 429 becomes rate_limited.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- No screen needs to know about fetch, cookies or the envelope shape.
- A mocked 401 session_expired reaches subscribers exactly once per response.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The session provider and screens (later units).
- Native token storage (founder-gated).
