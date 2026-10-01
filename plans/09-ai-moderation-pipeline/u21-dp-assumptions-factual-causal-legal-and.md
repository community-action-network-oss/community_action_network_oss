---
id: "09-u21"
plan: "09"
title: "DP-ASSUMPTIONS: factual, causal, legal and scope assumptions"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.3
priority: 250
depends_on: ["09-u20"]
writes: ["src/moderation/app/dp-assumptions.ts","src/moderation/domain/assumptions/**","test/fixtures/moderation/assumptions/**","src/moderation/domain/assumptions/*.spec.ts"]
reads: ["src/moderation/**"]
spec: ["docs/design/ai/structured-content.md#4-dp-assumptions","docs/design/ai/decision-points.md#per-dp-notes","docs/design/ai/decision-points.md#shared-contract","docs/design/flows/structured-submission.md","docs/spec/06-moderation-geo-governance.md"]
needs: []
verify: ["npm run verify","npx vitest run src/moderation/domain/assumptions"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Hold back assumptions stated as fact. Output is needs_revision with one hint per field and the ASSUMP-1 rule id, never a silent reject or edit; an honestly marked assumption passes. The model gets only retrieved references from the pack (no tools, no lookups).

## Steps
1. Handler src/moderation/app/dp-assumptions.ts runs through the DAG with the four kinds as rule slices (factual, causal, legal, scope). Inputs: schema fields plus the poster `assumptions[]` list plus reference items from the pack reference set via the policy module.
2. Allowed outcomes only publish, needs_revision, hold (the DP never emits reject; enforce in a test via the aggregate validator). A hint names the assumption, the rule id, and what would make it acceptable; it never edits the text.
3. Legal readings cite the pack version and are never advice; when the model is unsure about a legal point the result is needs_revision asking to mark it unverified (fixture and test).
4. Explicitly marked assumptions with a confidence pass (fixture); the same claim presented as fact gets a hint (fixture).
5. Use the sub-wellmeaning-wrong and adv-assumption-smuggle shapes from docs/design/ai/simulation.md as fixtures (synthetic).
6. Unit tests with FakeModel keyword table entries added to test/fixtures/moderation/assumptions/ (do not edit the fake table of the fake unit; add a second table file it can load via config).

## Acceptance
- Four assumption kinds each have a hint fixture.
- DP never returns reject (test).
- A marked assumption passes, an unmarked one is held back with a field hint.
- `npm run verify` is green.

## Out of scope
- Reference data authoring (can_policy).
