# Evaluation

Evaluation is how the community trusts a policy it did not watch run. Eval results are the gates in the amendment loop and the evidence behind model routing (spec 15, evaluation-driven selection).

## Sets per decision point

Each `decision-points/<DP>/eval/` holds:

| Set | Use | Rule |
|---|---|---|
| `core` | Held-out labeled cases: positive, negative, boundary | Never appear in prompts or examples; disjointness is a CI check |
| `adversarial` | Injection, encoded abuse, homoglyph and spacing evasion, multilingual evasion | Grows from audit findings |
| `privacy` | Synthetic-PII cases across scripts and languages | Used for redaction recall and over-redaction |
| `parity` | Matched cases across jurisdictions, languages and groups | Used for parity bounds |
| `regression` | Every past failure (an overturned appeal, a flip found by audit) | Never removed; a fixed case can only be retired by its own ratified PR |
| `simulation` | Cases from persona runs (`simulation.md`): misses become labeled candidates, provenance `simulation` | Fictional and publishable; confirmed by an auditor-labeler before entering `core`, `adversarial` or `regression` |
| `sampled` (later) | Redacted real cases admitted through the approved process | Provenance, minimization, retention, deletion path |

Each case is `{id, input, expected_outcome, rule_ids, field_ref, jurisdiction, language, tags, provenance}`.

## Thresholds as ratification gates

`thresholds.yaml` per DP (examples of the shape, values set by the pack):

- minimum recall for harmful classes (privacy, crisis, names, threats): high, and checked with a confidence interval, not a point estimate
- maximum false-reject rate on `core` negatives
- calibration: expected calibration error bound, so confidence floors mean what they say
- schema validity rate, citation correctness (rule ids and spans exist)
- injection pass rate on `adversarial`
- parity gap bound between jurisdictions and languages
- per-model eligibility: a model is eligible for a DP only if it passes that DP's thresholds; passing one DP does not carry over

A PR cannot be ratified with a failing gate. A threshold change is a separate, stricter-reviewed PR and never loosens in the same PR that depends on it.

## Persona runs as an eval source

Persona simulation (`simulation.md`) is both an eval source and the slice-1 proof. Deterministic runs on `FakeModel` are part of the regression suite on every pack change. Live runs measure end-to-end metrics (leaks, injection success, recall per DP on attack personas, false rejects on good personas, revise effectiveness, appeal loop success) that feed the graduation criteria. Schema checks (DP-ASSUMPTIONS, DP-COMPLETENESS) get their own `core` cases from the `x-guidance` examples and from `sub-wellmeaning-wrong`, `sub-vague` and `adv-assumption-smuggle`.

## Replay diff method

1. Select the replay set (appealed, near-threshold, stratified random per DP and jurisdiction) from stored redacted normalized inputs, with the original decision.
2. Run the proposed version (and, for shadow, the live traffic) through the same pipeline using the same model register entry, deterministic settings, and recorded or live calls per policy.
3. Compare outcome, rule ids and fields. Report flips by direction, DP, rule and jurisdiction, and attach confidence changes.
4. Label each flip as expected (matches the motivating examples) or unintended, via a small auditor check. Unintended flips in protected tiers block.
5. Store the report with the PR. Re-run on every push to the PR.

## Regression suite

On every change to a pack, prompt, schema, model, route or the gateway: all `regression` and `core` sets, the injection suite, the redaction and re-identification tests, and the contract tests that each outcome maps to its lifecycle effect (the table in `decision-points.md`). Results are stored per `policy_version` and `model_id`. Eval approvals expire; a model's eligibility is re-checked after a version change or when data goes stale.

## Slice 1 bootstrap with fictional fixtures

Slice 1 has no real data, so the first eval data is made, not collected:

- A fictional jurisdiction (`fiktiva-city`) pack, one language (English).
- About 30 fictional core cases per DP written by the policy author, covering each rule in the DP and each outcome, plus 10 adversarial and 10 privacy cases for the DPs where they matter (PRIVACY, NAME, CRISIS, TONE, LEGAL).
- Each case has a recorded `FakeModel` response script so tests are deterministic and make no paid calls. The FakeModel's behavior is derived from the case table, so the pipeline, thresholds, replay diff and rollout stages are all exercised end to end; they test the machinery, not model quality.
- The end-to-end script of the brief (one lifecycle to `solved`, one rejection with revise-and-resubmit, one appeal, one `stuck`) is re-expressed as fixtures that go through the runtime, plus a shadow-to-full rollout test, a rollback test, a fail-closed test per row of the matrix, and a re-moderation notice test.
- When a founder-approved live run happens, the same inputs are recorded and added as recordings; model quality metrics are first meaningful then. Until then the report says the thresholds were met "on fictional fixtures with FakeModel".
- Real examples enter only later, via appeals and approved sampling, redacted, with provenance, and never from copied production PII.

## Model selection procedure (D-65)

Models are chosen per DP by eval, cheapest first, not by reputation (spec 15, evaluation-driven model selection).

1. List candidate models from the OpenRouter models list: free (`:free`) first, then ascending price.
2. For each DP, run that DP's `core`, `adversarial` and privacy sets and compare to `thresholds.yaml`. Machinery runs on FakeModel-recorded fixtures (free, deterministic); candidate quality runs live under a small per-run budget, on synthetic inputs only, so free endpoints are allowed here.
3. Record model id, price, per-DP score, set version and date in the model register (`runtime.md`).
4. The primary for a DP is the cheapest model that passes that DP's thresholds. The next cheapest passing models are its fallback chain. A failing model is recorded as failed, not dropped, so it is not retried needlessly.

**Re-selection cadence.** Re-run selection when: a threshold or eval set version changes, a registered model's price or terms change, a model is removed or deprecated, the register entry's `evalExpiry` passes (default 90 days), a drift alert fires (overturn rate or cost per accepted result regression), or the founder asks. A new primary is promoted through shadow and canary (spec 15 routing lifecycle) and the previous routing set is kept for rollback. Real member data never enters an eval set except through the approved sampling path in `amendment-loop.md`.
