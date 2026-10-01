---
id: "07"
title: "Hardening"
approved: true
status: todo
depends_on_plans: ["02","03","04","05","06","09","10","11"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md","docs/spec/16-security-a11y-ops-testing.md","docs/spec/constitution/rules.md","docs/design/ux/journeys.md","docs/design/ux/ui-unit-template.md","docs/design/components/cross-cutting.md","docs/design/ux/tokens.json"]
---
# Plan 07: Hardening

## Goal
Prove slice 1 is done and safe to hand to contributors: adversarial inputs, rate limits, an authorization matrix with no per-item moderator, a security checklist, portable backup and restore, a seeded end-to-end Playwright run of the AI-executed model (FakeModel only), an accessibility pass and a web bundle budget. Also the portability work of D-57: production images for server, app and gallery, an env-var contract with startup validation, GET /v1/ready, and a prod-like compose rehearsal; none of it deploys or provisions anything (hosting is founder-gated). One docs-owned token rename (status.interim to status.transitional) with its two consumer syncs.

## Spec refs
- docs/spec/01-slice-1-brief.md section 1 ("Done means" an end-to-end script over seeded data walks one problem from draft to solved, plus a revision, a rejection with an appeal and a stuck path, all decided by moderation runs under the ratified policy), docs/spec/01a-lifecycle.md (T00 to T24)
- docs/design/system-design.md sections 9 to 11, docs/design/components/cross-cutting.md (portability, D-57)
- docs/spec/16-security-a11y-ops-testing.md; rules IDENT-1, ACCT-REQ-1, OWN-1, MONEY-0, DEVICE-0, EVID-URL-1, NO-INSTANCE-OVERRIDE-1, TOPIC-FORBIDDEN-1, REMOD-NOTICE-1, RERESOLVE-1

## Acceptance for the whole plan
`bash scripts/verify-all.sh --e2e` from the superproject root, on a machine with Docker, resets and seeds the database (seed bootstrap, FakeModel, no live provider), starts server and Expo web, and walks: a seed problem from draft to solved with pre-publication runs; a revision with hints beside fields; a rejection with the appeal-to-example loop and a fail-closed hold; a policy change with a re-moderation notice and a re-resolution reopen (T23); a forbidden-topic refusal and a legally blocked stuck path; at 360 px and 1280 px, with no serious axe violations on any screen, at 200 percent text size and by keyboard only. The authorization matrix, adversarial corpora, rate limit tests, security checklist script and backup and restore test pass. The three images build and run non-root, `bash scripts/prod-like.sh check` passes with GET /v1/ready green, the web bundle stays within the recorded budget and the iOS and Android JS bundles export, and no reference to status.interim remains in docs, can_app or can_gallery.

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [07-u01](u01-adversarial-corpus.md) | Adversarial fixture corpus for detectors | can_server | 1.5 | 110 | 03-u03, 03-u02, 09-u11 | - |
| [07-u02](u02-rate-limits.md) | Postgres-backed rate limits on every write path | can_server | 1.5 | 111 | 04-u07, 09-u05, 09-u33, 10-u30 | - |
| [07-u03](u03-authz-matrix.md) | Authorization matrix and rule-registry scans | can_server | 1.5 | 112 | 07-u02, 05-u04, 09-u02, 09-u38, 09-u43 | - |
| [07-u04](u04-security-checklist.md) | Security checklist: headers, CORS, restricted DB role, secret scan | can_server | 1.5 | 113 | 07-u03 | - |
| [07-u05](u05-backup-restore.md) | Portable Postgres backup and restore scripts and runbook | can_server | 1.2 | 114 | 07-u04 | - |
| [07-u06](u06-journey-main.md) | Playwright journey: seed problem from draft to solved with FakeModel runs | can_app | 1.5 | 120 | 02-u21, 05-u08, 05-u07, 04-u11, 09-u44, 09-u48, 09-u49, 09-u40, 09-u41, 09-u42, 10-u33, 10-u34, 10-u35, 11-u18 | - |
| [07-u07](u07-journey-branches.md) | Playwright journeys: revise with hints, rejection, appeal-to-example loop and fail-closed hold | can_app | 1.5 | 121 | 07-u06, 09-u45, 09-u50, 09-u51, 09-u54, 09-u37, 10-u36, 09-u52 | - |
| [07-u08](u08-root-e2e-wiring.md) | Root e2e wiring in verify-all | . | 1 | 122 | 07-u06, 07-u07, 07-u21, 07-u22, 02-u01, 11-u18 | - |
| [07-u09](u09-a11y-pass.md) | Accessibility pass against the UI unit template | can_app | 1.5 | 123 | 07-u07, 07-u21, 07-u22, 02-u24, 02-u25, 09-u53, 09-u55 | - |
| [07-u10](u10-perf-budget.md) | Web bundle performance budget and native bundle check | can_app | 1 | 124 | 05-u08 | - |
| [07-u11](u11-device-smoke-test.md) | Native device smoke test run (founder-gated) | can_app | 1 | 220 | 07-u10 | yes |
| [07-u12](u12-server-dockerfile.md) | Production Dockerfile for can_server: multi-stage, non-root, healthcheck | can_server | 1.2 | 130 | 07-u04 | - |
| [07-u13](u13-env-contract.md) | Environment variable contract document and startup validation | can_server | 1.2 | 131 | 02-u02, 07-u04 | - |
| [07-u14](u14-ready-endpoint.md) | GET /v1/ready: database, migrations and active policy pack | can_server | 1 | 132 | 10-u04, 02-u03, 07-u12 | - |
| [07-u15](u15-app-web-image.md) | Static web build image for can_app: Expo web export behind a tiny static server | can_app | 1 | 133 | 07-u10, 07-u13 | - |
| [07-u16](u16-gallery-static-image.md) | Static export image for can_gallery behind a tiny static server | can_gallery | 1 | 134 | 06-u09, 07-u13 | - |
| [07-u17](u17-compose-prod-like.md) | Compose prod-like profile: all images together, nothing deployed | . | 1.2 | 135 | 07-u12, 07-u13, 07-u14, 07-u15, 07-u16 | - |
| [07-u18](u18-token-rename-docs.md) | Rename design token status.interim to status.transitional (tokens, build, contrast check) | . | 0.8 | 136 | - | - |
| [07-u19](u19-app-token-sync.md) | can_app: sync tokens and rename code references to status.transitional | can_app | 0.8 | 137 | 07-u18, 02-u24, 02-u25 | - |
| [07-u20](u20-gallery-token-sync.md) | can_gallery: sync content and rename references to status.transitional | can_gallery | 0.8 | 138 | 07-u18, 06-u16 | - |
| [07-u21](u21-journey-remoderation-reresolution.md) | Playwright journeys: policy change notice and re-resolution reopen (T23) | can_app | 1.5 | 126 | 07-u07, 09-u50, 09-u65, 09-u66, 09-u64 | - |
| [07-u22](u22-journey-legal-stack.md) | Playwright journeys: legal stack refusal (TOPIC-FORBIDDEN-1) and legally blocked stuck | can_app | 1.5 | 127 | 07-u07, 09-u67, 09-u59, 09-u58, 09-u49, 05-u06 | - |

## Risks
- Playwright browsers need a download; the e2e units are skipped when docker or the browser is unavailable (needs flags) and still pass lint in CI-less local runs.
- Flaky timing in e2e: use Mailpit polling and web-first assertions, never sleeps.
- Device behaviour (native sessions, screen readers on devices) stays founder-gated and is not claimed by this plan (D-8).
- Live AI provider runs, hosting, registries, TLS and domains are founder-gated; 07-u12 to 07-u17 only prove portability locally.
- The token rename touches docs (07-u18, can-spec) and both consumers (07-u19, 07-u20) and must land together; the consumers depend on the docs unit.
- 10-u33 still lists skipped 03-u19 in depends_on; plan 10 owner must repoint it (reported).

## depends_on_plans
02, 03, 04, 05
