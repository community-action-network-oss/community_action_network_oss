---
id: "07"
title: "Hardening"
approved: true
status: todo
depends_on_plans: ["02","03","04","05"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md","docs/spec/16-security-a11y-ops-testing.md","docs/spec/constitution/rules.md","docs/design/ux/journeys.md","docs/design/ux/ui-unit-template.md"]
---
# Plan 07: Hardening

## Goal
Prove slice 1 is done and safe to hand to contributors: adversarial inputs, rate limits, an authorization matrix, a security checklist, backup and restore, a seeded end-to-end Playwright run of the whole lifecycle, an accessibility pass and a web bundle budget.

## Spec refs
- docs/spec/01-slice-1-brief.md section 1 ("Done means: an end-to-end script over fictional seed data walks one problem from draft to solved, plus one rejection with a revise-and-resubmit, one appeal and one stuck path, and passes.")
- docs/design/system-design.md sections 9 to 11
- docs/spec/16-security-a11y-ops-testing.md; rules IDENT-1, ACCT-REQ-1, OWN-1, MONEY-0, DEVICE-0, EVID-URL-1

## Acceptance for the whole plan
`bash scripts/verify-all.sh --e2e` from the superproject root, on a machine with Docker, resets and seeds the database, starts server and Expo web, and walks: one problem from draft to solved; one rejection with revise and resubmit; one appeal reviewed by a different moderator; one stuck path, at 360 px and 1280 px, with no serious axe violations on any screen, at 200 percent text size and by keyboard only. The authorization matrix, adversarial corpora, rate limit tests, security checklist script and backup and restore test pass. The web bundle stays within the recorded budget and the iOS and Android JS bundles export.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [07-u01](u01-adversarial-corpus.md) | Adversarial fixture corpus for detectors | can_server | 1.5 | 110 | 03-u03, 03-u02 | - |
| [07-u02](u02-rate-limits.md) | Postgres-backed rate limits on every write path | can_server | 1.5 | 111 | 04-u07 | - |
| [07-u03](u03-authz-matrix.md) | Authorization matrix and rule-registry scans | can_server | 1.5 | 112 | 07-u02, 05-u04 | - |
| [07-u04](u04-security-checklist.md) | Security checklist: headers, CORS, restricted DB role, secret scan | can_server | 1.5 | 113 | 07-u03 | - |
| [07-u05](u05-backup-restore.md) | Backup and restore runbook and script for compose Postgres | can_server | 1.2 | 114 | 07-u04 | - |
| [07-u06](u06-journey-main.md) | Playwright journey: draft to solved | can_app | 1.5 | 120 | 02-u21, 05-u08, 05-u07, 04-u11, 03-u25 | - |
| [07-u07](u07-journey-branches.md) | Playwright journeys: rejection, appeal and stuck | can_app | 1.5 | 121 | 07-u06 | - |
| [07-u08](u08-root-e2e-wiring.md) | Root e2e wiring in verify-all | . | 1 | 122 | 07-u06, 07-u07, 02-u01 | - |
| [07-u09](u09-a11y-pass.md) | Accessibility pass against the UI unit template | can_app | 1.5 | 123 | 07-u07 | - |
| [07-u10](u10-perf-budget.md) | Web bundle performance budget and native bundle check | can_app | 1 | 124 | 05-u08 | - |
| [07-u11](u11-device-smoke-test.md) | Native device smoke test run (founder-gated) | can_app | 1 | 220 | 07-u10 | yes |

## Risks
- Playwright browsers need a download; the e2e units are skipped when docker or the browser is unavailable (needs flags) and still pass lint in CI-less local runs.
- Flaky timing in e2e: use Mailpit polling and web-first assertions, never sleeps.
- Device behaviour (native sessions, screen readers on devices) stays founder-gated and is not claimed by this plan (D-8).

## depends_on_plans
02, 03, 04, 05
