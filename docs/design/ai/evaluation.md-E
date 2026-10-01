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
