# ADR 0005: Verify on web first; native only has to bundle

- Status: Accepted, 2026-10-01 (D-8)

## Context
The founder has no simulators or devices available for overnight agents, and agents cannot run device tests. The spec wants iOS, Android and web from one Expo app.

## Decision
"Done" for slice 1 means: verify script green, server e2e green against compose, Playwright green on Expo web at 360 px and 1280 px (including keyboard-only and axe checks), and `expo export -p ios` and `-p android` bundle successfully. Native session storage, push, deep links and device screen readers are founder-gated and recorded as open questions; they are never claimed as verified. Code may use `.web.tsx` and `.native.tsx` splits where needed but must keep both bundling.

## Consequences
- Overnight agents have an objective, runnable definition of done.
- Native-only bugs can ship undetected until a person tests on a device; this is acknowledged and logged.
- Accessibility on web is well covered by tooling; native screen reader behaviour is not.

## How to reverse
Add device farm or simulator runs to CI and a native e2e layer (Maestro or Detox), then promote native verification from founder-gated to required.
