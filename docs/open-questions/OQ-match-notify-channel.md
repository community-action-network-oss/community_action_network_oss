# OQ-match-notify-channel: How does a person hear about problems that match them?

- **ID:** OQ-match-notify-channel
- **Status:** open

## Question

How are people told about newly published problems that fit their profile, without the server learning their interests?

## Why it matters

Matching needs a channel. A channel that knows interests would break PROFILE-LOCAL-1 and NOTIFY-CONSENT-1.

## Current default (what we built meanwhile)

An opt-in push that is interest-blind (it only says new public problems were published) plus on-device matching (D-80). A digest in the app is the fallback when push is off.

## Who can help

Mobile developers, privacy engineers, accessibility specialists, and people who dislike notifications.

## What a good answer looks like

A channel that works on web, iOS and Android, reveals no interest to the server or the push provider, and stays calm and easy to mute.

## Spec links

- `docs/spec/26-capability-profile.md`
- `docs/spec/constitution/rules.md` (PROFILE-LOCAL-1)
- `DECISIONS.md` (D-80)
