# Night run YYYY-MM-DD

Copy to `plans/runs/YYYY-MM-DD.md` and fill in. Only the orchestrator edits unit `status:` fields and `DECISIONS.md`. Agents report commit SHAs and never edit either.

- Date: YYYY-MM-DD
- Branch: night/YYYY-MM-DD
- Hours budget: N
- Orchestrator: name or session

## Preflight
- node: version or missing
- docker: up or down
- db: reachable or not
- mail: available or not

## Selection
Paste the output of `node plans/tools/corpus.mjs next --json`, then list each skipped unit with its reason.

```json
```

## Results
| Unit id | Outcome (done, blocked, skipped) | Attempts | Commit SHAs | Est h | Actual h |
|---|---|---|---|---|---|
| | | | | | |

## Blocked
One line per unit: unit id, reason, and the reversible default taken.

## Open questions filed
OQ ids only. Questions are filed here, never decided.

## Decisions to log
Candidate `DECISIONS.md` lines for the orchestrator to review and add. Agents propose, they do not write.

## Verification
Summary of `scripts/verify-all.sh` and `node plans/tools/corpus.mjs lint` results: pass or fail, and what failed.

## Calibration
Estimated vs actual hours, and the units that overran.

## Morning checklist
- [ ] Branches to merge
- [ ] Founder gated units waiting
- [ ] Anything needing a decision
- [ ] Push (founder only)
