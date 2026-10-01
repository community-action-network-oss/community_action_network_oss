---
id: "11-u40"
plan: "11"
title: "Founder graduation review and stewardship record for the run set (G13, founder action)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 0.5
priority: 140
depends_on: ["11-u38","11-u39","10-u28"]
writes: ["ratifications/**","docs/graduation.md"]
reads: []
spec: ["docs/spec/constitution/rules.md#SIM-GATE-1","docs/spec/constitution/rules.md#FOUNDER-TRANS-1","docs/open-questions/OQ-graduation-criteria.md","docs/design/flows/persona-simulation-run.md#graduation-check","DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: true
defaults: "If any criterion is not met or not assessable, the answer is not yet; record it and the missing evidence. Opening public participation is a separate human product decision, not made by this repository."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The founder reads the graduation report, confirms the run set was on the exact ratified pack and schema versions, and records the decision. Opening public participation to real people is the founder's call (SIM-GATE-1) and is never taken by an agent.

## Steps
1. Read the graduation report and the run evidence (11-u38, 11-u39); check G13: the ratification record names the exact pack and schema versions that ran.
2. Create `ratifications/graduation-<date>.md` (frontmatter: pack versions and hashes, report sha256, per-criterion states, decision `not_yet|open`, approver, date, expiry) and a public log entry.
3. If the decision is `open`, note the follow-up product actions (invite policy, moderation staffing of the lane) in the record; no code change here.

## Acceptance
- A signed record exists naming the pack and schema versions and the decision.
- The record cites the graduation report hash.

## Out of scope
- Any product launch work.
- Changing thresholds.
