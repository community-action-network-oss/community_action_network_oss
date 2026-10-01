---
id: "09-u30"
plan: "09"
title: "Masked view builder for auditors and labelers"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 259
depends_on: ["09-u03","09-u02","09-u09"]
writes: ["src/review/domain/masked-view.ts","src/review/app/masked-view.ts","src/review/domain/*.spec.ts","test/fixtures/moderation/masked/**"]
reads: ["src/**"]
spec: ["docs/design/ai/appeals.md#appeal-to-example-loop","docs/design/ux/wireframes/moderation.md#WF-AUDIT-2","docs/spec/14-ai-privacy-gateway.md","docs/spec/constitution/rules.md#PRIV-GATE-1","docs/design/ai/safety-and-privacy.md"]
needs: []
verify: ["npm run verify","npx vitest run src/review"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
One builder produces every masked copy a reviewer may see: redacted text with the span marked, no handle, no account, no author identity, no place beyond jurisdiction, and only the context the question needs.

## Steps
1. `buildMaskedView({runOrDecision, question, jurisdictionNeeded})` returns {redactedFields:[{fieldRef, text, spanStart, spanEnd}], ruleText, decision: {outcome, ruleIds, hint, policyVersion, runId, modelClass, promptHash}, contextNote}. Reuses the gateway redaction (never re-implements); anything it cannot redact makes the view refuse with `cannot_mask` and the sample is dropped.
2. Hard constraints as tests: no account id, handle, email, problem id (use an opaque review token), no timestamps finer than a day, no coordinates; text length capped; the view never includes `internal_note`.
3. Re-identification test on the synthetic PII fixture set from the redaction unit: no seeded identifier survives.
4. Opaque token `reviewRef` (random, stored with the sample) is the only handle exposed to reviewers.

## Acceptance
- Seeded identifiers never appear in a masked view (test).
- Unmaskable inputs are dropped, never shown.
- `npm run verify` is green.

## Out of scope
- Sampling and endpoints (next units).
