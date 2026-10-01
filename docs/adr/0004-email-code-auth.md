# ADR 0004: Email 6-digit code sign-in

- Status: Accepted, 2026-10-01 (D-14)

## Context
Slice 1 needs real accounts (invite-only writes) on web first and native later. Magic links need a domain and universal links. Passwords add breach and reset burden. Email addresses are sensitive and must never be displayed.

## Decision
Sign-in and sign-up use a 6-digit code emailed to the member: 10 minute life, 5 attempts, hashed at rest, rate limited, generic responses that do not reveal whether an address exists. The invite is redeemed at sign-up. The email is encrypted at rest (AES-256-GCM) with an HMAC blind index for lookup, and is never returned by any endpoint. The public handle is generated from curated word lists with one regenerate before first publish. Web sessions use an httpOnly, SameSite=Lax cookie with a double-submit CSRF header; native receives the opaque token in the body and stores it in SecureStore. A magic link may exist on web as a convenience that only prefills the code. In development mail goes to Mailpit in compose; a real provider is founder-gated.

## Consequences
- One backend path for every platform; no domain or deep-link setup needed to start.
- Email delivery is a hard dependency for sign-in; Mailpit makes dev and e2e deterministic.
- Short codes are brute-forceable without limits, hence attempts, expiry and rate limits are part of the decision, not optional.
- Account recovery equals email access; stronger factors for moderators are a later decision.

## How to reverse
Add a second authenticator behind `IdentityPort` (passkeys, OIDC) and keep the email code as a fallback or remove it. Sessions and handles are independent of the factor.
