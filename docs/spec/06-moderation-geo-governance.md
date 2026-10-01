## 8. Moderation and safety system

Use defense in depth. AI is an assistive first line, not the final authority for high-impact decisions.

### Moderation pipeline

1. Normalize content and detect language.
2. Detect secrets, personal data, precise private location, spam, malware, and unsafe files.
3. Classify content type and current workflow stage.
4. Evaluate base platform policy.
5. Evaluate jurisdiction-specific policy packs that have been approved by qualified reviewers.
6. Evaluate relevance, solution orientation, conflict-escalation risk, hate or abuse, threats, incitement, self-harm, exploitation, and illegal-action risk.
7. Produce structured labels, confidence, cited policy rules, and a user-safe explanation.
8. Allow, request revision, limit visibility, quarantine, escalate, redirect, or reject.
9. Support appeal and independent review.

### Moderation requirements

- Keep policy rules versioned and testable.
- Store the policy and model versions used for each decision.
- Separate public explanations from sensitive internal evidence.
- Give users actionable revision guidance when safe.
- Require human review for defined high-risk categories and low-confidence consequential decisions.
- Test disparate impact across languages, regions, identities, and political or religious contexts.
- Defend against prompt injection, encoded abuse, multilingual evasion, coordinated manipulation, and poisoned community labels.
- Never present an AI interpretation as legal advice or a definitive statement of law.

## 9. Community grounding and review

Users may report moderation gaps and contribute examples, labels, edge cases, local context, or policy suggestions. Treat all submitted grounding data as untrusted.

A review task must specify:

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

Do not infer legal jurisdiction solely from GPS coordinates. Handle overlapping municipal, regional, national, and supranational rules. Record the source, effective dates, authority, reviewer, and version of every legal policy pack. The founder must approve the launch jurisdiction and location-verification model.

## 11. Preparation paths and solved-case playbooks

After the core resolution workflow is stable, support reusable guidance for prevention and preparation.

A playbook should include trigger conditions, scope, prerequisites, steps, resources, risks, escalation paths, version, owner, evidence, and feedback. Publishing a solved case as a playbook requires redaction, consent checks, and removal of unnecessary personal or location data.

People who followed a preparation path may be notified when it changes, subject to consent and notification preferences.

## 12. Platform governance

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

