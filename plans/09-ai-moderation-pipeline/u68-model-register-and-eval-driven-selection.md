---
id: "09-u68"
plan: "09"
title: "Model register and eval-driven per-DP model selection"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 243
depends_on: ["09-u13","09-u12","09-u06"]
writes: ["src/ai-gateway/register/**","scripts/select-models.ts","config/model-register.json","test/fixtures/moderation/selection/**","src/ai-gateway/register/*.spec.ts","package.json"]
reads: ["src/ai-gateway/**","test/fixtures/moderation/**"]
spec: ["docs/design/ai/runtime.md#model-register-and-selection-by-eval","docs/design/ai/evaluation.md#model-selection-procedure-d-65","docs/design/ai/evaluation.md#thresholds-as-ratification-gates","docs/design/ai/safety-and-privacy.md#zero-retention-and-providers","docs/adr/0014-openrouter-free-first-models.md","docs/spec/15-ai-inference.md"]
needs: []
verify: ["npm run verify","npx vitest run src/ai-gateway/register"]
founder_gate: false
defaults: "Free (:free) models first, then cheap; synthetic eval inputs only; live part runs under a small per-run budget (default 1 USD, flag --budget-usd) and stops at 95 percent of it. No candidate passing a DP leaves that DP with no live model: the router holds."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Choose the model per decision point by evidence (D-65): list OpenRouter models, filter free then cheap, run each DP's eval set, record scores and write the register the router (09-u15) reads.

## Steps
1. Register file `config/model-register.json` and its zod schema in `src/ai-gateway/register/` (extends 09-u08): per entry `{id, provider: "openrouter", free, priceInPerMtok, priceOutPerMtok, contextTokens, structuredOutput, dataCollection, region?, evalExpiry, perDp: [{dpId, evalScore, evalSetVersion, evalDate, passed}]}`, plus per DP `{primary, fallbacks[]}`. The loader rejects an expired eval and a duplicate id.
2. `scripts/select-models.ts` (`npm run select:models -- --budget-usd N [--dry-run]`): fetch `GET https://openrouter.ai/api/v1/models` with the key (dev `.env` fallback, never logged); drop models without structured output or with context below the stage need; order free first (`:free` or both prices 0), then ascending price; cap the candidate count per DP (default 8).
3. Machinery pass on FakeModel-recorded fixtures: for each DP, run its eval set through the real scoring code (recall with confidence interval, false-reject rate, calibration, schema validity, injection pass rate) against fixture responses, so the scoring path is deterministic and free. Then a live pass: each candidate answers each DP's `core` and `adversarial` set (synthetic inputs, scanned before send) under `--budget-usd`, with `AI_DATA_COLLECTION=allow` permitted only here because the data is synthetic.
4. Scores are compared to that DP's `thresholds.yaml`; write the result per candidate and DP with the date. Primary = cheapest passing model; fallbacks = the next cheapest passing models (up to 3). A model failing a DP is recorded as failed. A DP with no passing model is written with `primary: null`, which the router turns into hold.
5. The script writes the register file atomically and never loosens a threshold; it never edits the pack. `--dry-run` prints the plan and estimated cost without calling the network.
6. Tests with a mocked models list and mocked completions: free before cheap ordering, filtering, cheapest passing wins, per-DP independence (passing one DP does not carry over), budget stop writes a partial register marked `incomplete`, no passing model gives `primary: null`, no key in output, no network in tests.
7. Embedding models (W13, used by 13-u07 and 13-u19): add `kind` (`chat` default, or `embedding`) to register entries and a `perTask` score list next to `perDp` (task id `archive_retrieval` with recall at 5, nDCG at 10 and the cross-language gap, written by the archive eval runner 13-u19). The selector script treats `embedding` entries separately (OpenRouter embeddings listing, free first, then cheap) and never mixes them into the per-DP chat selection. A model with no passing `archive_retrieval` score is not selectable for embeddings, and the local model of 13-u07 is always the last fallback.

## Acceptance
- The register loader and selection logic are covered by tests with no network.
- Selection is per DP, cheapest passing, free first (tests).
- A live run, when done, writes scores with dates and respects `--budget-usd`.
- `npm run verify` is green.

## Out of scope
- The router and fallback chain (09-u15).
- Re-selection scheduling (a manual or night-run command for now).
- Real member data in any eval set.
