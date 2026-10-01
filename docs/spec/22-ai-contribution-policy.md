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

Potential tools and access paths to evaluate include:

- Cline — open-source coding agent with provider choice and reviewable diffs
- OpenCode — open-source terminal, desktop, and IDE coding agent with many provider and local-model options
- Aider — open-source terminal pair programmer supporting hosted and local models
- GitHub Models — model experimentation with a limited free access path
- Kimi K2 and the Kimi API — openly available model weights and compatible hosted access, subject to current terms and availability
- DeepSeek models and the DeepSeek API — model and hosted API options, subject to current terms and availability
- Ollama — local-model execution where contributor hardware is sufficient

Listing a tool is not an endorsement or a promise that it is free. Pricing, licenses, data use, model availability, geographic access, security characteristics, and terms can change. Contributors must not send secrets, private evidence, production data, credentials, personal information, or restricted repository material to an unapproved hosted service. The setup guide should maintain a current comparison of cost, license, privacy, context limits, hardware needs, provider compatibility, and data-retention terms.

#### Task: Establish the AI-assisted contribution policy and merge workflow

- [ ]  Research, propose, review, and adopt `AI_CONTRIBUTIONS.md`, the AI disclosure fields in the pull-request template, a contributor checklist, a reviewer checklist, bot and autonomous-agent rules, risk-tiered merge gates, and an affordable-tool setup guide.

The task should use these project policies and analyses as reference points:

- Python Developer Guide: Guidelines for using AI tools — contributor understanding, focused changes, test integrity, and careful review
- NumPy AI Policy — mandatory disclosure, contributor explanation, human-authored issue and PR context, and rejection of low-quality generated work
- Kubernetes: Open source maintainership in the age of AI — disclosure, human engagement, verification, and limits on large generated pull requests
- Apache Software Foundation Generative Tooling Guidance — originality, copyright, third-party licensing, and contributor responsibility
- OpenInfra Policy for AI Generated Content — treating generated code as untrusted, human-in-the-loop review, debugging ability, and heightened scrutiny
- Open edX AI Contribution Policy — separate contributor and reviewer guidance, transparency, understanding, and maintainer-load protection
- scikit-learn Automated Contributions Policy — prohibition of fully automated submissions and requirement to review, understand, and test
- KubeVirt AI Contribution Policy — disclosure conventions, DCO obligations, and policy lifecycle
- Apache Airflow pull-request template — a practical AI disclosure field in the normal contribution workflow
- Open Source Guides: How to Contribute — general contribution quality and AI-assisted review expectations
- Gentoo AI Policy and NetBSD Commit Guidelines — strict-policy reference points for copyright, quality, and prior-approval concerns
- Scientific Python: Community Considerations Around AI Contributions — maintainer capacity and community-culture analysis
- Open-source AI contribution policy collection — a living cross-project reference set

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

