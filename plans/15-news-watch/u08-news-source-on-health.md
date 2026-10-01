---
id: "15-u08"
plan: "15"
title: "newsSource on GET /health"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 0.6
priority: 507
depends_on: ["15-u01"]
writes: ["src/health/**", "openapi/openapi.json", "test/health*.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/25-news-watch.md#259-attribution", "docs/design/ux/wireframes/browse.md#WF-PARTNER-1"]
needs: ["docker", "db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Let clients know whether a news partner is configured, so the app can show the badge only on nodes that use one.

## Steps
1. Add optional `newsSource: { name: string; url: string } | null` to `HealthDto`, filled from the port's `describe()` (null when off or fake).
2. Regenerate `openapi/openapi.json` (never hand-edit).
3. Tests: off gives null; a stubbed Mera adapter gives the name and URL; the field is present on the degraded response too.

## Acceptance
- `npm run verify` is green.

## Out of scope
- The badge (15-u09).
