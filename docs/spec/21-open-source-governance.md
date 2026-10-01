## 20B. Open-source ecosystem and structured growth

### Growth objective

The project should not optimize for popularity as an end in itself. Its objective is to become trusted, useful, open infrastructure for turning public problems into verified collective action. Popularity should follow demonstrated utility, institutional trust, credible governance, interoperability, and successful outcomes.

The project should combine lessons from mature open-source ecosystems and open protocols:

- Clear, useful software and documented contribution paths
- Transparent, merit-based maintainership
- Open, versioned standards
- Independent implementations and deployments
- Portability and resistance to organizational capture
- Predictable governance, security, and release processes

### Three-layer structure

The project should maintain three distinct but compatible layers.

#### Constitutional layer

Defines what implementations may and may not do, including rights and safety guarantees, privacy boundaries, public-problem scope, AI authority limits, governance principles, interoperability requirements, and amendment procedures.

Maintain a concise, readable project charter alongside the complete constitutional specification so that new users and contributors can understand the project without first reading the entire specification.

#### Open protocol

Develop interoperable, versioned representations for:

- Problems
- Claims and evidence
- Lifecycle transitions
- Contributions
- Proposals
- Decisions
- Implementation tasks
- Outcomes and verification
- Moderation decisions and appeals
- Jurisdiction policy packs
- Audit records

The protocol should eventually allow independent communities to operate compatible implementations without depending on one company or hosted service.

#### Reference implementation

Build one high-quality application that demonstrates how the constitution and protocol work. Do not delay the first useful product for federation: centralized first, with the structural seams in `12-decentralization-ready.md`.

### Two growth engines

The project must develop product adoption and contributor adoption together.

#### Product adoption loop

> Real problem → structured collaboration → implementation → verified result → reusable playbook → new community adoption

People and institutions should adopt the platform because it helps produce accountable progress and verified outcomes, not because it maximizes activity.

#### Contributor adoption loop

> Clear task → quick setup → constructive review → visible impact → increased responsibility → project stewardship

A repository without real users risks becoming a hobby project. A product without independent maintainers remains founder-dependent.

### Progressive governance

Governance should distribute authority as demonstrated capability and community maturity grow.

1. **Founder stewardship** (transitional, with limits and a sunset: Constitution VIII.2, `AMEND-STEWARDSHIP`; the sunset numbers are `docs/open-questions/OQ-founder-stewardship-sunset.md`): The founder retains responsibility for scope, constitutional interpretation, safety, and release direction. Consequential decisions and reasons are documented publicly where safe.
2. **Bounded maintainership:** Reliable contributors gain ownership of defined areas such as accessibility, workflow, moderation tooling, protocol schemas, localization, security, or documentation.
3. **Maintainer council:** Multiple independent maintainers approve releases and major technical changes. No single organization should control every critical subsystem.
4. **Independent governance:** Once real users, maintainers, deployments, and funding relationships exist, evaluate transferring trademarks, protocol stewardship, and constitutional governance to an appropriate independent nonprofit or foundation structure.

Do not create a foundation before there is a functioning community to govern. Do not present ambiguous or founder-controlled processes as decentralized.

### Decision process

This table is the **canonical** decision taxonomy. Agents use it with the founder, engineering and experiment split in `02-agent-rules.md`. Unresolved questions go to `docs/open-questions/`.

Use decision mechanisms proportionate to the decision:

| Decision | Required process |
| --- | --- |
| Small bug fix | Maintainer review |
| Reversible implementation choice | Engineering decision or proposal |
| Major feature | Public request for comments |
| Protocol change | Versioned protocol proposal |
| Constitutional or protected-rights change | Constitutional amendment process |
| Security issue | Private coordinated disclosure and remediation |
| Experimental feature | Time-bounded experiment with success and rollback criteria |
| Production policy | Approved, versioned policy pack with review evidence |

Every major proposal should identify:

- The problem being addressed
- Alternatives considered
- Constitutional implications
- Privacy and safety impact
- Compatibility implications
- Migration plan
- Test requirements
- Rollback path
- Decision authority

Project decisions must not collapse into raw vote count, GitHub popularity, financial influence, or persistence in debate.

### Contributor-ready repository

Before broad public promotion, maintain at least the following. These block publishing, not building:

- `README.md`
- `CHARTER.md`
- `ROADMAP.md`
- `GOVERNANCE.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- An approved license (MIT, D-49)
- Product, constitutional, architecture, protocol, threat-model, decision, and user-research documentation
- Clearly separated application, domain, policy, protocol, and design-system components
- Fictional, non-sensitive example problems

The repository introduction should quickly explain:

1. What problem the project solves
2. What it explicitly does not do
3. What can be run today
4. How to contribute
5. Who makes decisions
6. What milestone comes next

Local setup should be tested, reproducible, and progressively reduced in complexity. Contributor documentation is part of the product and must be maintained accordingly.

### Who is welcome now (D-60)

Every profession can contribute. The most urgent need today is engineers, designers and other technical people, because the platform is being built. Lawyers, activists, policy and rights experts are needed now as well: they draft the platform rules and policy packs in `can_policy` and the legal-layer corpora (`docs/open-questions/OQ-legal-corpus-sourcing.md`).

### Contribution ladder

Use a visible contribution ladder rather than treating everyone as either an outsider or a maintainer. These are roles in the open-source project, not platform roles (`04-roles-stewardship.md`); the names are chosen so they do not collide with the platform roles "Observer" and "Steward":

1. **Watcher:** Follows development and discussions.
2. **Contributor:** Submits documentation, design, tests, translations, research, policy analysis, or code.
3. **Reviewer:** Reviews work within a demonstrated area of competence.
4. **Maintainer:** Owns a bounded subsystem or project area.
5. **Project steward:** Participates in cross-project coordination and governance.
6. **Constitutional reviewer:** Reviews rights, safety, policy, or governance changes under stricter eligibility and conflict rules.

Advancement should depend on sustained constructive work and demonstrated judgment, not employment, funding, follower count, popularity, or personal proximity to the founder.

### Bounded contribution tasks

Do not invite contributors merely to help build a global platform. Publish concrete work with defined context and acceptance criteria, such as:

- Design a lifecycle component
- Test intake with screen readers
- Define a schema for evidence tiers
- Translate a fictional pilot
- Model allowed lifecycle transitions
- Develop adversarial privacy fixtures
- Create low-bandwidth workspace patterns
- Test identifying-information detection
- Document verified public-service routes for an approved jurisdiction
- Improve local setup time and reliability

Classify each contribution task by skill, estimated effort, risk level, required context, responsible maintainer, acceptance criteria, and policy-approval requirements.

### Licensing strategy

**Decided (D-49):** MIT for all four repositories, code and docs alike. The founder chose maximum reuse: CAN is meant to be copied and used by anyone. Copyright line "Community Action Network contributors". Contributions are accepted under MIT (inbound = outbound), with no CLA. Relicensing later needs the agreement of contributors, so the choice is effectively one-way once outside contributions land.

The options considered were Apache 2.0 (explicit patent grant), AGPL (hosted forks stay open, lower adoption) and layered licensing (more complexity). MIT trades the patent grant and copyleft for simplicity and the widest adoption. See `docs/open-questions/OQ-license.md` (resolved, kept for history).

### Outcome-led adoption

The strongest adoption and recruitment artifact should be a credible case study in which a community identifies a bounded public problem, establishes evidence, develops a lawful intervention, coordinates implementation, and verifies improvement through the platform.

The first pilot problem should be:

- Important but not politically explosive
- Measurable
- Geographically bounded
- Realistically addressable within months
- Supported by an identifiable institution or implementation partner
- Safe to discuss publicly
- Suitable for producing a reusable playbook

One verified resolution is more valuable than thousands of sign-ups, posts, downloads, or repository stars.

### Working groups and chapters

After the reference pilot, communities may form recognized working groups or chapters for areas such as jurisdictions, accessibility, protocol development, moderation evaluation, localization, civic implementation, or security.

Each recognized group must have:

- A charter and bounded scope
- Named maintainers or stewards
- Decision rules
- Public meeting notes where safe
- Concrete deliverables
- Conflict-of-interest disclosures
- Renewal or expiry conditions

Informal groups may contribute but may not claim official project authority merely by using the project name.

### Continuous release and review rhythm

Establish a predictable operating rhythm, subject to project capacity:

- **Weekly:** Contributor triage and working-group updates
- **Monthly:** Reference implementation release or public release-status report
- **Quarterly:** Roadmap review and project health report
- **Every six months:** Governance, security, accessibility, and community-health review
- **Annually:** Constitutional and protocol compatibility review

Each release should record:

- What changed
- Which problem it addresses
- Evidence that it works
- Known limitations
- Security and privacy implications
- Migration requirements
- Rollback procedure
- Contributors recognized

### Project health metrics

Do not optimize primarily for stars, downloads, account creation, posts, sessions, or media coverage.

#### Product health

The product metrics are the canonical list in `16-security-a11y-ops-testing.md` ("Observability and operations"). Do not duplicate them here.

#### Community health

Track:

- Time to first successful contribution
- First-time contributor return rate
- Number of active independent maintainers
- Maintainer concentration and bus factor
- Review turnaround time
- Release reliability
- Accessibility and localization coverage
- Contributor departures and stated reasons where voluntarily provided

#### Ecosystem health

Track:

- Independent deployments
- Compatible implementations
- Institutions using the protocol
- Verified jurisdiction policy packs
- Reused playbooks
- Cross-deployment interoperability

