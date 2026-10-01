---
id: "03-u11"
plan: "03"
title: "Decision and reminder emails via Mailpit"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 48
depends_on: ["03-u10","02-u06"]
writes: ["src/platform/mail/templates.ts","src/moderation/infra/notifier.ts","src/moderation/moderation.module.ts","src/config.ts",".env.example","test/decision-emails.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/design/ux/copy-deck.md","docs/spec/constitution/rules.md#DRAFT-TTL-1"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/decision-emails.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Send the plain emails the table promises: changes requested, published, not accepted (with deletion date and appeal date), and the day-23 reminder. Emails never contain the problem text.

## Steps
1. Add appBaseUrl to config (APP_BASE_URL, default http://localhost:8081) and .env.example.
2. Templates in src/platform/mail/templates.ts (pure functions, plain text, no dashes, no tracking): changesRequested({title?}), published(), notAccepted({deletionDate, appealableUntil}), appealOutcome({outcome}), revisionReminder({withdrawOn}). Each includes the plain explanation text from the lifecycle vocabulary and a link to {appBaseUrl}/me/problems/{id} (decisions) only; never the problem body, hints or internal note. Titles are omitted (privacy default).
3. src/moderation/infra/notifier.ts implements the DecisionNotifier port: loads the initiator email through the accounts module (decrypt at send time only; accounts is the only module that touches plaintext, so call an accounts use case sendToAccount(accountId, message)), sends via NotificationPort, and never logs the address. A send failure is logged without the address and does not roll back the decision (the decision is the record; emails are best effort, retried by the retention unit job later or manually).
4. Dates are formatted as ISO date plus a plain sentence ("Your text is deleted on 2026-11-03.") because email has no ICU runtime; keep one helper formatDate.
5. Tests with Mailpit: each decision type produces one email to the initiator with the expected phrases, containing no problem text, no email address of anyone else, and the exact deletion date for rejections.

## Acceptance
- Emails contain dates and the explanation but never problem text or hints.
- A mail failure never undoes a moderation decision.
- `npm run verify` is green.

## Out of scope
- Appeal outcome sending (appeals resolve unit calls the template).
- Follower notifications (plan 04).
