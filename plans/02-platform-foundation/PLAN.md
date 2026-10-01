---
id: "02"
title: "Platform foundation"
approved: true
status: todo
depends_on_plans: []
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md","docs/design/ux/screens.md","docs/design/ux/ui-unit-template.md","docs/spec/constitution/rules.md"]
---
# Plan 02: Platform foundation

## Goal
Everything later plans stand on: hardened server config (AI gateway config with the FakeModel default, live provider founder-gated), shared kernel (error envelope, ids, clock, pagination, audit), invite-only accounts with 6-digit email codes through Mailpit, cookie sessions with CSRF, encrypted email, generated handles, a dev seed (accounts, Amsterdam and fiktiva-city jurisdictions, invites, a tiny fictional test fixture; the real seed problems enter through the pipeline, D-56), the app's session handling and auth screens, and the thin read slice D-25 deferred: a problems read model with list and detail endpoints and the matching app screens, so the app shows real data early. Also the Playwright web smoke harness and a root local verify script.

## Spec refs
- docs/spec/01-slice-1-brief.md (sections 4, 8, 10)
- docs/design/system-design.md (sections 2 to 6, 9)
- docs/design/ux/screens.md, wireframes auth.md and browse.md

## Acceptance for the whole plan
With compose up and `npm run seed`, a developer can: open Expo web, see the fixture problems (`npm run seed -- --fixture`, labelled fictional) in WF-LIST-1, open one in WF-DETAIL-1, sign up with a seeded invite code (code read from Mailpit), see the generated handle once in WF-ONBOARD-1, regenerate it once, sign out, sign in again with a new code, and see WF-SESSION-1 when a session is revoked. No API response contains an email (contract test). `npm run verify` is green in can_server and can_app, the Playwright smoke passes, and `bash scripts/verify-all.sh` is green from the superproject root.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [02-u01](u01-verify-all-script.md) | Extend verify-all.sh with flags and missing gates | . | 1 | 5 | - | - |
| [02-u02](u02-config-hardening.md) | Config hardening and structured logging | can_server | 1 | 10 | - | - |
| [02-u03](u03-shared-kernel.md) | Shared kernel: error envelope, clock, pagination, noindex | can_server | 1.2 | 11 | 02-u02 | - |
| [02-u04](u04-accounts-schema.md) | Accounts, audit and jurisdiction schema with insert-only grants | can_server | 1.5 | 12 | 02-u03 | - |
| [02-u05](u05-identity-primitives.md) | Email crypto, code hashing and handle generator | can_server | 1.5 | 13 | 02-u02 | - |
| [02-u06](u06-mail-port.md) | Notification port, SMTP adapter and Mailpit test helper | can_server | 1 | 14 | 02-u02 | - |
| [02-u07](u07-auth-usecases.md) | Auth use cases: sign-up, code, verify, sessions | can_server | 1.5 | 15 | 02-u04, 02-u05, 02-u06, 02-u03 | - |
| [02-u08](u08-auth-http.md) | Auth HTTP: cookies, CSRF, guards, /v1/me | can_server | 1.5 | 16 | 02-u07 | - |
| [02-u09](u09-lifecycle-vocabulary.md) | Lifecycle v2 problem-state vocabulary from the lifecycle spec | can_server | 0.8 | 9 | - | - |
| [02-u10](u10-problems-read-model.md) | Problems schema, jurisdictions and list endpoint | can_server | 1.5 | 18 | 02-u08, 02-u09, 02-u04 | - |
| [02-u11](u11-problem-detail.md) | Problem detail, visibility rules and public timeline | can_server | 1.2 | 19 | 02-u10 | - |
| [02-u12](u12-seed-fictional.md) | Dev seed: accounts, jurisdictions, invites and a tiny fictional test fixture | can_server | 1.2 | 20 | 02-u11 | - |
| [02-u13](u13-api-client-infra.md) | API client infrastructure: CSRF, error envelope, session events | can_app | 1 | 21 | - | - |
| [02-u14](u14-form-kit.md) | Form kit: fields, inline validation, focus-first-error | can_app | 1.2 | 22 | 02-u24, 02-u25 | - |
| [02-u15](u15-nav-shell.md) | Navigation shell, skip link and emergency notice | can_app | 0.8 | 23 | 02-u14, 02-u24, 02-u25 | - |
| [02-u16](u16-session-provider.md) | Session provider, route guard and session-expired sheet | can_app | 1.2 | 30 | 02-u08, 02-u13, 02-u15, 02-u24, 02-u25 | - |
| [02-u17](u17-signup-onboarding-screens.md) | Sign-up and onboarding screens | can_app | 1.5 | 31 | 02-u16, 02-u14, 02-u24, 02-u25 | - |
| [02-u18](u18-signin-screens.md) | Sign-in screens: email and code | can_app | 1 | 32 | 02-u17, 02-u24, 02-u25 | - |
| [02-u19](u19-list-screen.md) | Problem list screen (real data) | can_app | 1.2 | 33 | 02-u10, 02-u15, 02-u13, 02-u24, 02-u25 | - |
| [02-u20](u20-detail-screen.md) | Problem detail screen and tombstone | can_app | 1.5 | 34 | 02-u19, 02-u11, 02-u24, 02-u25 | - |
| [02-u21](u21-playwright-harness.md) | Playwright web smoke harness | can_app | 1.5 | 40 | 02-u20, 02-u18, 02-u12 | - |
| [02-u24](u24-gluestack-install-theme.md) | Adopt gluestack-ui: install, pin and generate the theme from tokens | can_app | 1.5 | 19 | - | - |
| [02-u25](u25-gluestack-civic-wrappers.md) | Adopt gluestack-ui: re-implement civic wrappers on gluestack primitives | can_app | 1.5 | 20 | 02-u24 | - |
| [02-u22](u22-smtp-provider-adapter.md) | Real SMTP provider adapter (founder-gated) | can_server | 1 | 200 | 02-u06 | yes |
| [02-u23](u23-native-session-securestore.md) | Native session storage and device smoke test (founder-gated) | can_app | 1.5 | 201 | 02-u16 | yes |

Design system: gluestack-ui for all surfaces (ADR 0007, D-50). 02-u24 and 02-u25 run before every other can_app UI unit; until they land the app uses RN-core civic wrappers (D-33).

Night-1 shape: server lane runs config, kernel, schema, identity, mail; app lane runs client infra, form kit, nav shell (no server dependency); root lane runs the verify script. Auth-dependent app units start once the auth HTTP unit is done.

## Risks
- Docker or Mailpit unavailable on the runner: units that need them are skipped by preflight, pure-domain units still run.
- Single openapi.json owner: server API units are strictly serial in the server lane.
- Cookie and CSRF behaviour differs between Expo web dev (port 8081 to 4000, cross-origin) and production. Default: CORS with credentials for the configured origin, SameSite=Lax (same-site across ports on localhost).
- Native session handling is founder-gated and out of this plan.

## depends_on_plans
None. Plan 03 depends on this plan.
