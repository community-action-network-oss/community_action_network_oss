---
id: "02-u22"
plan: "02"
title: "Real SMTP provider adapter (founder-gated)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 200
depends_on: ["02-u06"]
writes: ["src/platform/mail/**","src/config.ts",".env.example","test/mail-provider.spec.ts"]
reads: ["src/platform/mail/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#8-decentralization-seams-interfaces-only","docs/open-questions/OQ-domain.md","docs/open-questions/OQ-hosting-region.md","docs/spec/02-agent-rules.md"]
needs: []
verify: ["npm run lint","npm run build","npm test","npx vitest run src/platform/mail"]
founder_gate: true
defaults: "None: this unit is skipped until the founder decides on a provider and domain."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Wire a real transactional email provider behind the existing NotificationPort via MAIL_TRANSPORT. Requires founder decisions: a domain, a provider account, a hosting region and any legal terms. Gated: no agent runs this overnight.

## Steps
1. Founder supplies the provider choice, domain and credentials as environment variables (never committed).
2. Add a provider adapter selected by MAIL_TRANSPORT=<provider> in config (validated, secrets only from env, redaction list extended).
3. Keep SMTP to Mailpit as the default. Unit test the adapter against a fake HTTP or SMTP server; add no live-send test.
4. Document SPF, DKIM and DMARC setup needs in docs/open-questions/OQ-domain.md as a note, not as DNS changes.

## Acceptance
- Default behaviour is unchanged.
- No credentials in the repo; scan:secrets (if present) passes.
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- Sending any real email.
- Domain registration or provider signup.
