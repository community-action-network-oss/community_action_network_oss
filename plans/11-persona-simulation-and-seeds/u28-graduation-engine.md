---
id: "11-u28"
plan: "11"
title: "Graduation engine: evaluate G1 to G13 over a run set and write the graduation report"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 128
depends_on: ["11-u09","11-u23","11-u24","11-u25","11-u27","11-u43","11-u44"]
writes: ["test/simulation/graduation/**","docs/graduation-report.md"]
reads: []
spec: ["docs/design/ai/simulation.md#8-graduation-criteria-defaults-to-be-ratified","docs/open-questions/OQ-graduation-criteria.md","docs/spec/constitution/rules.md#SIM-GATE-1","docs/design/flows/persona-simulation-run.md#graduation-check"]
needs: []
verify: ["npm run lint","npm run build","npx vitest run test/simulation"]
founder_gate: false
defaults: "A criterion that cannot be assessed from the run kinds present is `not_assessable`, never `met`. The engine never edits thresholds; unmet criteria are reported, not argued."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Read `thresholds.yaml` and a set of run directories, evaluate each of G1 to G13, apply the critical-miss reset rule, and write the graduation report the founder reads. Deterministic runs can satisfy only the machinery criteria (SIM-GATE-1 stays closed on fixtures alone).

## Steps
1. Input: `--runs <dir...>`, thresholds from the synced data, ratification records for the pack and schema versions run (from the pack manifest copy). Order runs by time; compute counters.
2. Evaluators G1 to G13 as pure functions of the run reports: G1 both seeds complete their stage plan (every required stage resolved through DP-STAGE-RESOLUTION, then final DP-VERIFICATION) or reach an honest stuck or redirected with the archive record complete, in each of the last 3 consecutive live runs and in every deterministic run; G2 leaks over at least the required number of live adversarial runs and distinct doxx variants, reporting the upper bound; G3 injection attempts and successes; G4 and G5 recall with lower bounds against the DP lists; G6 false rejects; G7 revise effectiveness; G8 appeals count, overturned count, loop exercised flag from 11-u31; G9 fail-closed rows covered and zero publishes on failure from 11-u29; G10 rollout and rollback exercised from 11-u30; G11 parity gap; G12 cost against the founder cap (null cap gives `needs_founder_value`); G13 ratification record naming the exact pack and schema versions run.
3. Statuses: `met`, `not_met`, `not_assessable` (needs live run), `met_on_fixtures` (deterministic only: allowed for G1 machinery, G9, G10), `needs_founder_value`. Any critical entry in a run resets the consecutive counters from that run on, recorded in the report.
4. Output `graduation-report.json` (schema in the file) and `graduation-report.md`: first line "Verdict: not ready" or "Verdict: ready for founder review"; a table of criteria with value, threshold, interval, runs used; "met on synthetic fixtures with FakeModel" wording for deterministic-only evidence; link list of findings that became candidates. The verdict is never "open"; opening participation is the founder action (11-u40).
5. Tests: all-met synthetic live fixture gives ready; one leak resets counters; deterministic-only set gives not ready with correct statuses; null cost cap gives needs_founder_value; consecutive-run logic; a missing ratification record fails G13.

## Acceptance
- Deterministic-only runs never produce a ready verdict (test).
- A critical miss resets the consecutive counters (test).
- Every criterion has an evaluator with table-driven tests.
- `npm run verify` is green.

## Out of scope
- Running live campaigns (gated units).
- Changing thresholds.
