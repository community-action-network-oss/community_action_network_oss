# AI-assisted contribution policy

**Scope:** this policy governs **external contributors** to the project. It is unchanged and stays strict. Founder-operated agents (the orchestrated and overnight runs) follow the separate pipeline in `02-agent-rules.md`, "Founder-operated agent pipeline": they commit only to `night/*` branches and the founder merges. That exception does not relax any rule below for anyone else. Principles that mention autonomous pull requests, AI-written commit messages, human-written intent, and self-merge apply to external contributors.

### AI-assisted contribution and merge safety

**Founder direction:** AI coding tools may make contribution more accessible, but they also make it inexpensive to generate changes whose review cost, defect risk, security risk, and long-term maintenance burden are much larger than their creation cost. The project must define its AI-assisted contribution and merge workflow before encouraging agent-generated pull requests. Blind or popularity-driven merging is prohibited.

Until the complete policy is approved, apply these provisional principles:

- A human contributor remains accountable for every submitted change, including correctness, tests, security, privacy, licensing, accessibility, migrations, documentation, and maintenance.
- Contributors must understand the related code and be able to explain the change and respond to review in their own words.
- AI-assisted work must be disclosed in the pull-request template, including the tool or model and how it was used. Do not require full private prompts when that would expose secrets, personal information, or unrelated source material.
- AI output is untrusted input. The person submitting must review and test it before maintainers see it.
- Fully autonomous, bulk, unsolicited, or mechanically generated issues and pull requests may be closed without detailed review.
- Large AI-generated pull requests, AI-generated commit messages, fabricated reproduction steps, unverified security reports, and AI-written responses that do not demonstrate contributor understanding should not be accepted.
- AI may help with translation and language accessibility, but contributors must verify technical meaning and clearly identify uncertainty.
- Passing CI is necessary but not sufficient. Review must examine intent, architecture, test quality, hidden regressions, security boundaries, generated dependency changes, licensing, and deletion or migration consequences.
- AI review is advisory and cannot satisfy a required human approval, code-owner approval, separation-of-duties rule, or constitutional review.
- No agent, bot, or contributor may automatically merge its own generated change. Protected branches, required checks, code owners, and human approval remain mandatory.
- High-risk areas such as authentication, authorization, cryptography, evidence privacy, moderation, identity, election accountability, federation, distributed storage, protocol compatibility, migrations, and constitutional policy require designated human reviewers and enhanced evidence.
- Review effort is a scarce project resource. Maintainers may request smaller changes, an approved issue, a design note, reproducible evidence, or contributor-led cleanup before review continues.
- The project should welcome AI-assisted contributors without requiring any specific paid model, vendor, subscription, or computing budget.

#### Contribution accessibility

A contributor should be able to work manually, with a paid coding assistant, with a lower-cost hosted model, or with a suitable local model. The project should document provider-neutral workflows rather than treating access to an expensive frontier model as an eligibility requirement.

The list of candidate tools and access paths is time-sensitive (prices, licenses, data use, model availability and terms change quickly), so it does not live in the spec. It belongs in `CONTRIBUTING.md` and the affordable-tool setup guide, with an owner and a scheduled review. The version at the split commit is in git history (`git show 7f61360:docs/spec/22-ai-contribution-policy.md`). Listing a tool is never an endorsement or a promise that it is free. Contributors must not send secrets, private evidence, production data, credentials, personal information, or restricted repository material to an unapproved hosted service.

#### Task: Establish the AI-assisted contribution policy and merge workflow

- [ ]  Research, propose, review, and adopt `AI_CONTRIBUTIONS.md`, the AI disclosure fields in the pull-request template, a contributor checklist, a reviewer checklist, bot and autonomous-agent rules, risk-tiered merge gates, and an affordable-tool setup guide.

The task should draw on mature open-source AI contribution policies (Python, NumPy, Kubernetes, Apache, OpenInfra, Open edX, scikit-learn, KubeVirt, Gentoo, NetBSD and others) for contributor understanding, disclosure, focused changes, test integrity and maintainer-load protection. The current reference list changes quickly, so it lives with the tool list in `CONTRIBUTING.md` (version at the split commit: `git show 7f61360:docs/spec/22-ai-contribution-policy.md`).

Required policy decisions and deliverables:

1. Define `AI-assisted`, `AI-generated`, `agent-authored`, `automated submission`, and `AI-reviewed` consistently.
2. Specify disclosure scope for code, tests, documentation, issues, security reports, design artifacts, translations, commit messages, and review comments.
3. Establish the contributor's personal understanding, testing, provenance, licensing, and review-response obligations.
4. Define prohibited behaviors, including unattended submissions, fabricated reports, review flooding, test weakening, unexplained dependencies, prompt-generated discussion, and autonomous self-merge.
5. Add risk tiers. Require issue or RFC approval, code-owner review, two-person review, specialist review, or security review where appropriate.
6. Define how maintainers may close, pause, label, rate-limit, or request reduction of low-value or excessive submissions without turning AI detection into unreliable surveillance.
7. Define an AI disclosure block that captures tool, model when known, use category, affected areas, human verification performed, and known uncertainty without requesting secret prompts.
8. Require human-written intent, architecture reasoning, commit history, security claims, and responses to substantive review questions.
9. Define how AI-assisted tests are validated so generated tests do not merely mirror an incorrect implementation, delete desired behavior, or game coverage.
10. Establish independent-review expectations; using another model on the same output is not automatically independent human review.
11. Define security and privacy rules for hosted models, local models, source-code sharing, telemetry, retention, secrets, personal data, and restricted civic evidence.
12. Provide contributor pathways for manual work, lower-cost APIs, limited free tiers, local models, shared community infrastructure if later approved, and non-code contributions.
13. Create examples of acceptable and unacceptable AI-assisted pull requests, issues, reviews, and security reports.
14. Add branch protection, CODEOWNERS, required status checks, signed contribution requirements, dependency review, secret scanning, provenance checks, and auditable merge records.
15. Pilot the policy with fictional or low-risk contributions, measure maintainer review time and defect escape, gather contributor feedback, and revise before broad promotion.

Acceptance criteria:

- The policy distinguishes responsible assistance from automated contribution spam.
- The merge workflow protects high-risk platform and protocol areas without banning useful tools by default.
- A contributor can comply without buying a particular commercial model.
- PR and issue templates expose the required disclosures and evidence.
- Reviewer and maintainer actions are explicit, consistent, appealable where appropriate, and designed to prevent burnout.
- CI verifies objective requirements but never substitutes for accountable human judgment.
- The policy has legal and security review for copyright, licensing, privacy, source disclosure, and hosted-model data handling.
- The reference list and accessible-tool matrix have an owner and scheduled review because policies, products, prices, and model terms change quickly.

