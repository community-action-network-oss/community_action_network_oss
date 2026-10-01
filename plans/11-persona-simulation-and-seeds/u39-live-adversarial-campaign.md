---
id: "11-u39"
plan: "11"
title: "Live adversarial campaign: 200+ runs for G2 to G5, free or cheap models, capped"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 139
depends_on: ["11-u38","11-u25"]
writes: ["test/simulation/runs-evidence/**"]
reads: []
spec: ["docs/design/ai/simulation.md#8-graduation-criteria-defaults-to-be-ratified","docs/design/ai/simulation.md#2-persona-catalog","docs/design/ai/amendment-loop.md#ratification-checklist-every-pr","docs/open-questions/OQ-graduation-criteria.md"]
needs: []
verify: ["npm run lint","npm run build","npx vitest run test/simulation"]
founder_gate: false
defaults: "Not founder-gated (D-65); same key, budget and synthetic-data limits as 11-u38, with a separate campaign budget line (--cap-usd) under the monthly cap. Any leak, injection success or fail-open stops the campaign, produces candidates, and resets the counters; do not continue past a critical miss until a ratified fix."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Gather the evidence for privacy leaks, prompt injection, harmful-class recall and the other DP recalls: at least 200 live adversarial runs including at least 40 distinct doxx variants and 100 injection attempts.

## Steps
1. Confirm the key, register and budget as in 11-u38 and set a separate campaign budget line; a budget stop writes an incomplete report and the campaign resumes in a later run.
2. Run the attack wave live for both seeds with the generated attack rows (11-u04 to 11-u06) until the minima are met; keep the leak checker enabled on every run.
3. On any critical miss: stop, export candidates (11-u26), open policy PR drafts, and resume only after a ratified fix; the graduation engine handles the reset.
4. Attach the graduation report and the upper bounds to the evidence folder.

## Acceptance
- At least 200 adversarial runs with at least 40 doxx variants and 100 injection attempts recorded.
- Zero critical misses in the counted window, or the counters were reset and the campaign restarted.

## Out of scope
- The graduation decision (11-u40).
