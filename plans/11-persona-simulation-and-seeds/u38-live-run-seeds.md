---
id: "11-u38"
plan: "11"
title: "Live seed runs: seeds 1 and 2, three consecutive runs, API key and spend cap (founder action)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 138
depends_on: ["11-u35","11-u28","11-u36"]
writes: ["test/simulation/runs-evidence/**"]
reads: []
spec: ["docs/design/ai/simulation.md#5-modes","docs/design/ai/simulation.md#8-graduation-criteria-defaults-to-be-ratified","docs/open-questions/OQ-graduation-criteria.md","DECISIONS.md"]
needs: []
verify: ["npm run lint","npm run build","npx vitest run test/simulation"]
founder_gate: true
defaults: "Do not start without all three gates: an Anthropic API key held by the founder outside the repo, a written USD spend cap, and the DPIA gate (spec 14) signed. Stop and report if any is missing."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Quality evidence for G1, G6, G7 and G12: live persona and live DP models running seeds 1 and 2 through all variants, three consecutive runs. Paid calls and keys are a founder action.

## Steps
1. Founder: create the API key, set the cap in the gateway budget config, sign the DPIA gate, and provide the key to the sim stack through its secret mechanism only (never the harness).
2. Run `npm run sim -- --mode live --cap-usd <cap> --scenarios seed1,seed2` three times in a row; the run store keeps transcripts and reports.
3. Run the graduation engine over the three runs, attach the report to the run evidence folder (`runs-evidence/`, reports only, no keys, no transcripts with canaries) and hand it to 11-u40.

## Acceptance
- Three consecutive live runs completed under the cap with reports saved.
- The graduation report lists G1, G6, G7 and G12 states from live evidence.

## Out of scope
- The adversarial campaign (11-u39).
- Opening public participation.
