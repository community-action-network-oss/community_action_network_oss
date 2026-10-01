---
id: "02-u06"
plan: "02"
title: "Notification port, SMTP adapter and Mailpit test helper"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 14
depends_on: ["02-u02"]
writes: ["src/platform/ports/**","src/platform/mail/**","test/support/mailpit.ts","test/mail.e2e-spec.ts","package.json","package-lock.json"]
reads: ["src/config.ts"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#8-decentralization-seams-interfaces-only","docs/design/system-design.md#5-auth-flow","docs/spec/constitution/rules.md#NOTIFY-CONSENT-1"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/mail.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
All outbound email goes through a NotificationPort. In development it is SMTP to Mailpit. Provide the test helper every later e2e test uses to read mail.

## Steps
1. src/platform/ports/notification.ts: interface NotificationPort { send(msg: {to: string, subject: string, text: string, kind: string}): Promise<void> }.
2. Add the nodemailer dependency (and @types/nodemailer). src/platform/mail/smtp.adapter.ts implements the port using config.smtpUrl; plain text only, no tracking pixels, no links with tracking. Provide InMemoryNotification for unit tests that records messages.
3. src/platform/mail/templates.ts: pure functions returning {subject, text}: signInCode(code) with text "Your CAN sign-in code is 123456. It expires in 10 minutes. If you did not ask for it, ignore this email." Later plans add decision and notification templates here. No em or en dashes.
4. Bind NotificationPort to the SMTP adapter in the Platform module; throw at startup if mailTransport is not smtp.
5. test/support/mailpit.ts: clearMailbox(), latestMessageTo(address) polling http://localhost:8025/api/v1/messages with a 5 second timeout, and extractCode(text) returning the 6 digits. Document in a header comment that every e2e test clears the mailbox first.
6. test/mail.e2e-spec.ts: send through the adapter, read it back via the helper, assert subject and that the body contains no URL.

## Acceptance
- The e2e test passes against compose Mailpit.
- No module other than src/platform/mail imports nodemailer.
- Sending failures reject the promise with a typed error and never log the recipient address (redaction test).
- `npm run verify` is green.

## Out of scope
- Real providers (founder-gated, OQ-domain).
- Digest or notification scheduling (plan 04).
