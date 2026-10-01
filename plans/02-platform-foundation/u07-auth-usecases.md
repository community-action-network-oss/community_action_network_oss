---
id: "02-u07"
plan: "02"
title: "Auth use cases: sign-up, code, verify, sessions"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 15
depends_on: ["02-u04","02-u05","02-u06","02-u03"]
writes: ["src/accounts/app/**","src/accounts/infra/**","src/accounts/accounts.module.ts","src/app.module.ts","test/auth-usecases.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#5-auth-flow","docs/spec/constitution/rules.md#IDENT-1","docs/spec/constitution/rules.md#ACCT-REQ-1","docs/spec/constitution/rules.md#AGE-DENY-1"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/auth-usecases.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Implement the account domain flows as use cases behind repository interfaces (domain stays ORM-free): redeem an invite, issue and verify 6-digit codes, create and resolve sessions. HTTP comes in the next unit.

## Steps
1. src/accounts/app/ports.ts: AccountRepo, InviteRepo, LoginCodeRepo, SessionRepo interfaces; src/accounts/infra/*.repo.ts Drizzle implementations (take a transaction handle). A small withTransaction helper in src/db/tx.ts if not present.
2. signUp({inviteCode, email, ageConfirmed}): ageConfirmed must be true (else field error); look up the invite by hashSecret(inviteCode); reject used or expired with the same generic error code "invalid_invite"; in one transaction create the account (encrypted email, blind index, generated handle with up to 5 retries on unique collision), mark the invite redeemed, write an audit_event "account.signup" (no email in detail), issue a login code. A duplicate email (blind index exists) does not create a second account: behave as requestCode for that account and return the same generic result.
3. requestCode({email}): if an account exists send a new code (invalidate prior unconsumed codes), always return the same result shape and take roughly the same time (do the hashing work either way); never reveal existence.
4. verifyCode({email, code}): constant-time compare against the hashed code, 10 minute expiry from config, increment attempts, invalidate after 5 failures, consume on success; on success create a session: newToken(), store its hash, idle expiry 30 days sliding and absolute expiry 90 days; return {token, handle, role}. Failures all return code "invalid_code".
5. resolveSession(token): returns {accountId, role, handle} or throws session_expired; slides idle expiry (update at most once per minute), rejects revoked or past absolute expiry. logout(token) sets revoked_at. regenerateHandle(accountId): allowed once (handle_regenerations < 1) and only if hasPublishedContent(accountId) is false; the HasPublishedContent port defaults to a repo returning false until plan 02 problems exist (bound for real in the problem schema unit); write audit "account.handle_regenerated".
6. Use the injected Clock and IdGenerator everywhere so tests can fast-forward time.
7. Tests: unit tests with in-memory fakes for every branch (expired, 5 attempts, replayed code, revoked session, absolute expiry, one regeneration only); e2e with real DB and Mailpit: full signup -> read code from Mailpit -> verify -> session resolves; the audit row contains no email; a second signup with the same invite fails generically.

## Acceptance
- No use-case result or log contains the plaintext email after the send call.
- Codes expire at 10 minutes, die after 5 wrong attempts, and cannot be replayed.
- Responses for unknown versus known email are structurally identical (test).
- Time-dependent tests use FixedClock, not sleeps.
- `npm run verify` is green.

## Out of scope
- HTTP controllers, cookies, CSRF (next unit).
- Steward-issued invites endpoint (03-u15).
- Rate limiting beyond the simple in-memory limiter added in the HTTP unit.
