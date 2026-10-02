# OQ-profile-multi-device: How does a capability profile move between a person's devices?

- **ID:** OQ-profile-multi-device
- **Status:** open

## Question

The profile stays on the device (PROFILE-LOCAL-1). How does someone use it on a second device or after losing a phone?

## Why it matters

Any sync service would have to hold the profile, which D-80 rules out. Without a way to move it, people must retype it, or lose it with the device.

## Current default (what we built meanwhile)

Export to an encrypted file and import on the other device. No sync server, nothing leaves the device unless the person moves the file.

## Who can help

Privacy engineers, local-first developers, and people who use several devices or share one.

## What a good answer looks like

A move flow a non-technical person can finish, a passphrase approach that is hard to lose and hard to guess, and honest wording about what happens if the file is lost.

## Spec links

- `docs/spec/26-capability-profile.md`
- `docs/spec/constitution/rules.md` (PROFILE-LOCAL-1)
- `DECISIONS.md` (D-80)
