---
id: "03-u11"
plan: "03"
title: "Decision and reminder emails via Mailpit"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 48
depends_on: ["03-u05", "03-u09", "02-u06"]
writes: ["src/platform/mail/templates.ts","src/moderation/infra/notifier.ts","src/moderation/moderation.module.ts","src/config.ts",".env.example","test/decision-emails.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals", "docs/design/ux/copy-deck.md", "docs/spec/constitution/rules.md#DRAFT-TTL-1", "docs/spec/constitution/rules.md#REMOD-NOTICE-1"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/decision-emails.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["5a82230"]
actual_hours: null
---
## Objective
Send the plain emails the lifecycle promises when a moderation run decides: changes requested (T02), published (T04), not accepted (T05, with deletion date and appeal date), re-reviewed under a new policy version, reopened under policy vX (T20, T21), the day-23 reminder, and "your problem is in volunteer review" (T01) and "your problem is waiting for the check" (T08, T09, held). Emails never contain the problem text. The adapter implements the DecisionNotifier port from 03-u05; the outcome applier (09-u23) and the re-moderation and re-resolution units call it.

## Steps
1. Add appBaseUrl to config (APP_BASE_URL, default http://localhost:8081) and .env.example.
2. Templates in src/platform/mail/templates.ts (pure functions, plain text, no dashes, no tracking): changesRequested(), inReview(), waitingForCheck(), published(), notAccepted({deletionDate, appealableUntil}), appealOutcome({outcome}), revisionReminder({withdrawOn}), reReviewed({policyVersion}) (REMOD-NOTICE-1: says it was re-reviewed under policy vX, that nothing was removed silently, and links to the appeal path), reopened({policyVersion}) (T20 and T21, D-59). Each includes the plain explanation text from the lifecycle vocabulary (02-u09) and a link to {appBaseUrl}/me/problems/{id} only; never the problem body, hints or explanation text. Titles are omitted (privacy default).
3. src/moderation/infra/notifier.ts implements the DecisionNotifier port: loads the initiator email through the accounts module (decrypt at send time only; accounts is the only module that touches plaintext, so call an accounts use case sendToAccount(accountId, message)), sends via NotificationPort, and never logs the address. A send failure is logged without the address and does not roll back the decision (the decision is the record; emails are best effort and retried by the job queue 09-u05 when it exists).
4. Dates are formatted as ISO date plus a plain sentence ("Your text is deleted on 2026-11-03.") because email has no ICU runtime; keep one helper formatDate.
5. Tests with Mailpit: each template produces one email to the initiator with the expected phrases, containing no problem text, no email address of anyone else, and the exact deletion date for not accepted. The port is exercised by calling the notifier directly with a decision row (no moderation run needed).

## Acceptance
- Emails contain dates, policy version and the explanation pointer but never problem text, hints, recommendations or reviewer identities (REVIEW-1).
- A mail failure never undoes a decision.
- `npm run verify` is green.

## Out of scope
- Triggering the emails from runs (09-u23, 09-u29).
- Follower notifications (04-u07).
