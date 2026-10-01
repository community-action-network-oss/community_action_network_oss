## 8. Moderation and safety system

Use defense in depth. **The community legislates policy; AI agents execute it** (D-51, Constitution V.1). A moderation run applies the ratified policy pack at every decision point before publication, on every update, and after publication (`15-ai-inference.md`). Humans legislate, audit, label, and staff a small emergency and legal lane. Single outcomes are never edited by hand (`NO-INSTANCE-OVERRIDE-1`). Safety gates are in `14-ai-privacy-gateway.md`. In slice 1 steps 1, 2 and 4 are deterministic code, step 5 uses a fictional-jurisdiction rule set, and steps 6 to 9 are agent steps run on `FakeModel` and recorded responses; live calls are founder-gated. Design: `docs/design/ai/README.md`.

### Moderation pipeline

1. Normalize content and detect language.
2. Detect secrets, personal data, precise private location, spam, malware, and unsafe files.
3. Classify content type and current workflow stage.
4. Evaluate base platform policy.
5. Evaluate jurisdiction-specific policy packs that have been approved by qualified reviewers.
6. Evaluate relevance, solution orientation, conflict-escalation risk, hate or abuse, threats, incitement, self-harm, exploitation, and illegal-action risk.
7. Produce structured labels, confidence, cited policy rules, and a user-safe explanation.
8. Publish, request revision, hold, route to another institution, reject, or escalate to the emergency and legal lane (`escalate_human`).
9. Support appeal: independent re-run, then a community label task, then a policy change through a `can_policy` PR (Constitution V.5).

### Moderation requirements

- Keep policy rules versioned and testable.
- Store the policy and model versions used for each decision.
- Every decision carries explanation fields (`rule_ids`, field or span reference, revision hint, `appealable_until`). They are defined in `01-slice-1-brief.md`, section 5.
- Separate public explanations from sensitive internal evidence.
- Give users actionable revision guidance when safe.
- Hold low-confidence results (`OQ-dp-confidence-thresholds`). Send emergency, crisis and legal or law-enforcement cases to the logged human lane.
- Test disparate impact across languages, regions, identities, and political or religious contexts, and monitor it after launch (`OQ-bias-monitoring`).
- Re-moderate when policy or context changes. A flipped published item gets a visible notice and an appeal path (`REMOD-NOTICE-1`).
- Defend against prompt injection, encoded abuse, multilingual evasion, coordinated manipulation, and poisoned community labels.
- Never present an AI interpretation as legal advice or a definitive statement of law.

## 9. Community grounding and review

Users may report moderation gaps and contribute examples, labels, edge cases, local context, or policy suggestions. Treat all submitted grounding data as untrusted. Appeals produce labeled examples that amend the policy pack through a PR, a replay diff, ratification and staged rollout (Constitution V.5, `docs/design/ai/amendment-loop.md`). Panel sizes and ratification are open (`OQ-label-task-panel`, `OQ-ratification-method`).

A label task (or ratification review) must specify:

- Exact labeling question
- Minimum necessary context
- Required jurisdiction or expertise
- Masked fields
- Conflict-of-interest rules
- Number and type of reviewers
- Consensus or escalation rule
- Quality controls and auditability

Never automatically promote community labels into production policy or model training. Require provenance, privacy review, abuse-resistance checks, quality thresholds, approval, versioning, and rollback.

## 10. Geography and jurisdiction

Geography is both a product input and a sensitive-data risk.

The system must distinguish:

- Exact private location
- Coarse public location
- Affected geographic boundary
- Participation eligibility boundary
- Legal jurisdiction
- Service availability region

Do not infer legal jurisdiction solely from GPS coordinates. Handle overlapping municipal, regional, national, and supranational rules. Record the source, effective dates, authority, reviewer, and version of every legal policy pack. The launch jurisdiction and the location-verification model are open questions (`docs/open-questions/OQ-launch-jurisdiction-language.md`, `OQ-location-verification.md`). Slice 1 uses the Amsterdam (NL) overlay for seed problems with synthetic evidence (D-56) and a self-declared coarse area, for display only.

## 11. Preparation paths and solved-problem playbooks

Deferred: not in slice 1.

After the core resolution workflow is stable, support reusable guidance for prevention and preparation.

A playbook should include trigger conditions, scope, prerequisites, steps, resources, risks, escalation paths, version, owner, evidence, and feedback. Publishing a solved problem as a playbook requires redaction, consent checks, and removal of unnecessary personal or location data.

People who followed a preparation path may be notified when it changes, subject to consent and notification preferences.

## 12. Platform governance

Deferred: not in slice 1. Platform concerns reach people through appeals and the open-questions register until this exists.

Platform concerns use a structured workflow similar to public problems, but with stricter security and disclosure controls. Examples include biased moderation, incomplete legal grounding, reviewer capture, unsafe masking, or misuse of expert status.

Governance changes must include:

- Problem statement and affected groups
- Evidence and uncertainty
- Proposed alternatives
- Risk assessment
- Decision authority
- Experiment or rollout plan
- Success and rollback criteria
- Public change note where safe
- Monitoring after release

