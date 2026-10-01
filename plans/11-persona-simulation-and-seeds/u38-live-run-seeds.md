---
id: "11-u38"
plan: "11"
title: "Live seed runs: seeds 1 and 2, three consecutive runs, free or cheap models, capped"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 138
depends_on: ["11-u35","11-u28","11-u36","09-u68"]
writes: ["test/simulation/runs-evidence/**"]
reads: []
spec: ["docs/design/ai/simulation.md#5-modes","docs/design/ai/simulation.md#8-graduation-criteria-defaults-to-be-ratified","docs/open-questions/OQ-graduation-criteria.md","DECISIONS.md"]
needs: []
verify: ["npm run lint","npm run build","npx vitest run test/simulation"]
founder_gate: false
defaults: "Not founder-gated (D-65). Needs OPEN_ROUTER_KEY, an explicit --cap-usd (default 3 USD per run, 3 runs) under the monthly cap, free or cheap registered models only, synthetic seeds only. If the key is missing or the budget is exhausted, stop, mark the unit blocked with the reason and report. Never send real member data."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Quality evidence for G1, G6, G7 and G12: live persona and live DP models running seeds 1 and 2 through all variants, three consecutive runs. Calls are budget-capped, use free or cheap registered models and synthetic data only (D-65); the graduation decision stays with the founder (11-u40).

## Steps
1. Confirm `OPEN_ROUTER_KEY` is present in the sim stack environment (never read or printed by the harness), the register has current evals (09-u68), and set `--cap-usd` under the monthly cap. Real member data is out of scope: seeds are synthetic.
2. Run `npm run sim -- --mode live --cap-usd <cap> --scenarios seed1,seed2` three times in a row; the run store keeps transcripts and reports.
3. Run the graduation engine over the three runs, attach the report to the run evidence folder (`runs-evidence/`, reports only, no keys, no transcripts with canaries) and hand it to 11-u40.

## Acceptance
- Three consecutive live runs completed under the cap with reports saved.
- The graduation report lists G1, G6, G7 and G12 states from live evidence.

## Out of scope
- The adversarial campaign (11-u39).
- Opening public participation.
