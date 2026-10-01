# OQ-moderator-signin: Should emergency/legal lane members, auditors and policy maintainers use a stronger sign-in factor?

- **ID:** OQ-moderator-signin
- **Status:** open

## Question

What additional factor, if any, should emergency/legal lane members, auditors and `can_policy` maintainers use beyond the email code?

## Why it matters

The lane can act on emergency and legal cases, auditors see sampled decisions, and maintainers can merge policy. A taken-over account is serious.

## Current default (what we built meanwhile)

The same email code as everyone, with every privileged action audited. Acceptable only on fictional data.

## Who can help

Security engineers; identity specialists.

## What a good answer looks like

A recommendation (for example passkeys or an authenticator app) with the recovery process.

## Spec links

- `docs/spec/01-slice-1-brief.md` (Accounts and sign-in)
- `docs/spec/16-security-a11y-ops-testing.md`
