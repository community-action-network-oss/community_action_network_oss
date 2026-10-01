# Flow: sign-up and sign-in

## Purpose
Let an invited person create an account and sign in with an emailed 6-digit code, with no password and no email shown publicly (ADR 0004).

## Trigger
Invite redeem (`POST /v1/auth/signup`), sign-in request (`POST /v1/auth/code`), code exchange (`POST /v1/auth/verify`).

## Status
planned: server 02-u04 (schema), 02-u05 (crypto, handle), 02-u06 (mail port), 02-u07 (use cases), 02-u08 (HTTP, cookies, CSRF); app 02-u13, 02-u16 to 02-u18. Real SMTP 02-u22 and native session 02-u23 are founder-gated. No AI step: auth has no DP.

## Sequence
```mermaid
sequenceDiagram
  participant User
  participant App
  participant API
  participant UC as accounts UC
  participant DB
  participant Mail
  User->>App: invite code + email (WF-SIGNUP-1)
  App->>API: POST /v1/auth/signup
  API->>UC: redeem(invite, email)
  UC->>DB: tx: account (email encrypted + blind index), handle, invite redeemed, login_code hash
  UC->>Mail: send 6-digit code
  API-->>App: {handle} (never the email)
  User->>App: enter code (WF-SIGNIN-2)
  App->>API: POST /v1/auth/verify
  API->>UC: verify(email, code)
  UC->>DB: check hash, attempts, expiry; create session (token hash)
  API-->>App: Set-Cookie can_session + can_csrf
  App->>App: upload local draft on first authenticated save
```

Existing account: `POST /v1/auth/code` replaces the first half. The answer is always "If that address can sign in, we sent a code".

## Failure paths
- Unknown or used invite: `invite_invalid`, no account created, nothing leaked.
- Wrong code: attempt counter, 5 attempts invalidates; constant-time compare; rate limit per email and IP.
- Mail send fails: transaction already committed; user can request a new code; no retry loop leaks existence.
- 401 `session_expired` later: App shows WF-SESSION-1 and keeps the local draft.

## Data written
`account`, `invite` (redeemed), `login_code`, `session`, `audit_event` (sign-in, sign-up). Email only as ciphertext plus HMAC blind index.

## Events emitted
Audit only: `auth.signup`, `auth.signin`, `auth.logout` (planned). No `problem_event`.

## DPs invoked
None.

## Related
[system-design section 5](../system-design.md), [components/server.md](../components/server.md) (`accounts`), [ux/journeys.md](../ux/journeys.md) J1 step 8.
