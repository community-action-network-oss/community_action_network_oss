<aside>
🎯

**Purpose:** Give this document to a long-running engineering agent. The agent must turn the product vision into a secure, tested, deployable platform while keeping the founder in control of consequential product, legal, safety, privacy, and cost decisions.

</aside>

<aside>
🏛️

**Controlling scope clarification:** This is a **public and structural problem-solving platform**, not an individual problem-solving service. The unit of collaborative work is a public condition, recurring pattern, institutional failure, geographic issue, shared risk, or structural root cause. An individual's experience may initiate, evidence, corroborate, or reveal that public problem. The platform does not provide personalized therapy, medicine, legal representation, private consulting, investigation, or one-to-one professional case handling. Any older wording in this document that implies individualized service must be interpreted or revised according to this controlling rule.

</aside>

## 1. Agent mandate

You are the principal product engineer, technical lead, and delivery coordinator for the Open Problem-Solving Platform. Your job is to clarify the product, produce an implementation plan, build it incrementally, validate it, document it, and leave it operable by other people.

Do not treat this specification as permission to invent irreversible product policy. Separate decisions into:

- **Founder decision:** Meaningfully changes product scope, governance, safety, legality, privacy, public commitments, operating cost, or user rights.
- **Engineering decision:** Reversible implementation choice that preserves the approved behavior.
- **Experiment:** Time-bounded implementation used to resolve uncertainty with evidence.

### Required operating loop

1. Inspect the repository, infrastructure, existing documents, constraints, and available integrations.
2. Create a concise assumptions register and open-questions list.
3. Ask clarifying questions in prioritized batches. Explain why each question matters and provide a recommended default.
4. Convert confirmed answers into versioned product and architecture decisions.
5. Produce a phased plan with dependencies, risks, acceptance criteria, and test strategy.
6. Build the smallest coherent vertical slice first.
7. After each slice, run tests, security checks, migrations, and a usable end-to-end validation.
8. Record evidence, decisions, known limitations, and the next executable tasks.
9. Continue autonomously when choices are low-risk and reversible. Stop and ask when a founder decision is required.

### Autonomy rules

- Never claim completion without test or inspection evidence.
- Never silently weaken safety, moderation, privacy, accessibility, or legal controls to make a feature pass.
- Never expose secrets, personal data, precise private locations, moderation evidence, or internal risk signals.
- Do not deploy to production, spend money, register services, contact users, accept legal terms, or make a public commitment without explicit approval.
- Prefer boring, maintainable technology over novelty unless evidence supports the novelty.
- Keep changes small, reviewable, reversible, and covered by tests.
- If blocked on a non-critical choice, document a reversible default and continue.
- If blocked on safety, law, privacy, governance, destructive migration, or irreversible architecture, stop and ask.

## 2. Product definition

The platform is an open-source, location-aware, law-aware system for resolving **public and structural problems**. People surface civic conditions, recurring harms, institutional failures, geographic issues, shared risks, or systemic root causes. Eligible problems enter a staged public process in which affected communities, local participants, experts, journalists, implementers, and institutions clarify evidence and causes, develop lawful structural solutions, coordinate implementation, and preserve verified outcomes as reusable public playbooks. It also preserves a durable, source-backed memory of institutional responsibility, procedural actions, commitments, blockers, implementation, and outcomes so that communities can coordinate follow-through and, where separately enabled under strict safeguards, make better-informed democratic and electoral judgments.

An individual experience may be the first signal or evidence of a public problem, even when only one case is known. It does not become a personalized service case. The platform may provide general routing to an appropriate external institution or resource, but collaborative work centers on the public condition revealed by the experience.

It is not an individual advice service, therapy platform, medical service, legal service, consulting marketplace, personal case manager, general social network, personality forum, political debate forum, complaint board, petition site, emergency service, or unrestricted discussion platform.

### Core outcome

A valid problem should move from an unstructured real-world concern to one of four explicit terminal states:

- **Solved:** A solution was implemented and sufficiently verified.
- **Closed:** The issue is invalid, duplicated, withdrawn, no longer relevant, or cannot continue under platform rules.
- **Paused:** Progress is temporarily blocked, with a reason and review condition.
- **Redirected:** A better institution, partner project, emergency channel, political platform, legal process, or specialist service should handle it.

### Success principles

- Real and bounded problems over abstract conflict
- Solutions and implementation over engagement
- Visible progress over endless discussion
- Local agency with useful outside expertise
- Lawful and safe action over viral mobilization
- Explainable moderation over arbitrary enforcement
- Data minimization over surveillance
- Preparation and prevention alongside response
- Durable institutional memory over short political attention cycles
- Evidence-backed civic accountability over partisan accusation
- Neutral voter information over platform endorsement or political targeting
- Continuous governance improvement over claims of perfection

## 3. Initial release hypothesis

The first release should prove one complete, safe workflow in one agreed jurisdiction and language:

1. A person creates a pseudonymous account and submits a non-identifying, geoscoped public problem or systemic hypothesis.
2. The platform checks evidence tier, structural framing, affected scope, duplication, privacy, safety, legality, and routing.
3. An unsupported report may enter an `investigation_needed` tier rather than being presented as established fact.
4. An eligible public problem becomes visible across the appropriate platform and jurisdiction surfaces.
5. Participants contribute through structured comment types rather than a generic feed.
6. Proposals are created, compared, refined, and selected through an explicit decision method.
7. Implementation tasks, owners, evidence, blockers, and updates are tracked.
8. The case reaches a terminal state with an audit trail and resolution summary.
9. A solved case can be published as a reusable playbook after privacy review.
10. Moderation errors and platform concerns can be appealed or submitted as governance issues.

The agent must not expand to multiple jurisdictions, native mobile apps, complex reputation markets, binding voting, payments, or autonomous legal determinations before this vertical slice works.

## 4. Users, roles, and authority

### Platform roles

- **Guest:** Can view content permitted for public access.
- **Member:** Can submit problems, follow cases, and contribute where eligible.
- **Problem initiator:** Submitted the initial public problem or systemic hypothesis. Can clarify the original framing and contribute evidence, but does not own the public problem or decide for all affected people.
- **Stewardship group:** A decentralized, capability-balanced group that maintains framing, scope, stages, implementation coordination, and outcome records under transparent quorum and conflict rules.
- **Core participant:** Is materially connected to the affected geography or group under an approved verification method.
- **Visitor:** Is outside the core scope. Contributions may be limited, separately ranked, or excluded from local decisions.
- **Expert:** Has relevant verified or contextually accepted expertise. Expertise must be scoped, reviewable, and non-transitive.
- **Observer:** Follows a case without participating materially.
- **Volunteer reviewer:** Performs bounded labeling or review tasks with minimum necessary context.
- **Moderator:** Reviews escalations and enforces rules. Sensitive actions require strong authentication and logging.
- **Legal or domain reviewer:** Advises on scoped high-risk decisions. The system must distinguish advice from authoritative legal determination.
- **Institutional representative:** A verified public or organizational role that can provide an official response, commitment, status update, or implementation record without gaining moderation authority.
- **Candidate or elected-office participant:** A verified public candidate or officeholder who may submit structured proposals, commitments, responses, and implementation updates within a dedicated election-accountability layer. This role receives no ranking or moderation privilege.
- **Election accountability reviewer:** Reviews candidate identity, official sources, responsibility attribution, report-card inputs, corrections, and political-neutrality compliance under enhanced independence and conflict rules.
- **Platform administrator:** Manages operations and access, with least privilege and audited actions.

### Authorization requirements

Use explicit role and policy checks on the server. Do not rely on hidden UI controls. Define who can view, create, edit, transition, moderate, appeal, export, or delete every sensitive resource. Add tests for horizontal and vertical privilege escalation.

### Problem stewardship groups

Every eligible public problem should support a stewardship group that acts as the problem's scoped administrative and coordination team. Stewardship is attached to the problem, not to platform-wide authority.

The problem initiator may:

- Create the initial stewardship group
- Invite additional people to become stewards
- Assign proposed capability areas such as local coordination, evidence, technical review, institutional follow-up, implementation, accessibility, rights, or safety
- Withdraw a pending invitation
- Request replacement or expansion when a required capability or affected group is missing

An invited person must explicitly accept the role and disclose relevant conflicts of interest. Invitations and membership changes must be recorded in the problem history. Eligibility, safety, jurisdiction, affected-party representation, and conflict rules may require review before stewardship permissions activate.

During the initial formation stage, the initiator may continue inviting stewards. Once the group reaches the configured formation threshold, adding or removing an active steward should require the group's defined consent threshold or an authorized moderation or governance process. This prevents the initiator from permanently controlling a public problem while preserving the ability to assemble an effective team.

The group should support:

- Multiple stewards with complementary capabilities
- Role labels and scoped permissions within the problem
- A defined quorum and consent threshold
- Primary and alternate stewards for critical capabilities
- Term duration, inactivity handling, resignation, replacement, and removal
- Conflict-of-interest disclosure
- Dissent and minority-position records
- An appeal path for disputed membership actions
- An emergency restriction path for compromised or unsafe stewards

Problem-level stewardship permissions may include proposing framing changes, organizing evidence, requesting reviews, maintaining the implementation plan, assigning approved tasks, recording institutional contact, proposing lifecycle transitions, and publishing progress updates. Consequential transitions, moderation decisions, expenditure commitments, disclosure of restricted information, and claims of verified resolution remain subject to their separate authorization and review rules.

A steward is not the owner of the public problem and does not gain authority over affected people, public institutions, private information, or implementation resources merely through the role.

## 5. Problem lifecycle

Model lifecycle transitions explicitly. Every transition must record actor, timestamp, reason, previous state, new state, and relevant evidence.

### Suggested states

1. `draft`
2. `submitted`
3. `automated_review`
4. `needs_clarification`
5. `human_review`
6. `eligible`
7. `redirected`
8. `discovery`
9. `root_cause_analysis`
10. `solution_development`
11. `solution_selection`
12. `implementation`
13. `verification`
14. `solved`
15. `paused`
16. `closed`
17. `appealed`

The final state machine must define allowed transitions, required fields, authorized actors, timeouts, reopening rules, and side effects. Invalid transitions must fail atomically.

### Public problem submission requirements

A submission should capture:

- Concise structural problem statement
- Observable condition, recurring pattern, institutional failure, shared risk, or systemic hypothesis
- Affected population and geography at the safest useful level
- Public significance and potential severity
- Responsible roles, institutions, systems, or processes
- Evidence tier, claim-specific sources, and provenance
- What evidence is missing and who could investigate it
- Known root-cause hypotheses, clearly marked as hypotheses
- Existing public responses or attempted interventions
- Desired public outcome and success measures
- Legal, constitutional, safety, rights, and environmental constraints
- Direct and indirect affected groups, including absent stakeholders
- Language and accessibility needs
- Confirmation that names, personal identifiers, individualized allegations, and private case material have been removed

A personal disclosure that cannot be transformed into a non-identifying public problem is not published. The interface may show static, jurisdiction-appropriate external routes before deleting the transient draft.

## 6. Structured participation

Avoid one undifferentiated comment stream. Contributions should have a declared function:

- Clarifying question
- Factual answer
- Evidence or source
- Root cause
- Constraint
- Stakeholder perspective
- Proposed solution
- Improvement to proposal
- Risk or unintended consequence
- Implementation offer
- Progress update
- Verification evidence
- Moderation or governance feedback

Each contribution should support citations or attachments, scope, status, moderation outcome, and revision history. Design rate limits and reflection delays to reduce impulsive posting without preventing urgent legitimate updates.

### Ranking and visibility

Do not optimize for total engagement. Ranking should prioritize relevance, evidence quality, local applicability, safety, novelty, and contribution to the current stage. Keep core-participant, visitor, and expert signals distinguishable. Provide chronological or transparent alternative views where practical.

## 6A. Systemic cases, public evidence, and accountable implementation

### Problem graph

The platform must support both bounded incident problems and broader systemic problems without collapsing them into one discussion. A systemic parent may link to incident, geographic, institutional, legal-reform, implementation, or recurrence problems. Each child retains its own jurisdiction, affected scope, evidence, stewardship, authority map, lifecycle, and outcome.

A parent problem may aggregate patterns and common reforms, but a linked incident does not automatically prove the parent hypothesis. Similarity, coordinated submissions, or high report volume does not establish independence, prevalence, causation, or institutional responsibility. Every cross-case conclusion must identify the qualifying cases, comparison method, uncertainty, and evidence threshold.

The graph must support:

- Parent and child problems
- Duplicate, related, causal, dependency, recurrence, and reform links
- Different stewardship groups at parent and child levels
- Inherited context without inherited truth status
- Cross-case summaries with drill-down and provenance
- Separate lifecycle and resolution states
- Partial closure of an incident while the systemic parent remains active
- Reopening when credible recurrence appears

### Claim and evidence ledger

Evidence must attach to a specific claim rather than merely to a problem or discussion. Each claim should record:

- Exact claim text and scope
- Whether it is an observation, allegation, hypothesis, interpretation, official position, verified fact, or outcome claim
- Relevant problem, geography, institution, role, and time period
- Supporting and contradicting evidence
- Evidence status and confidence
- Material uncertainty and missing evidence
- Reviewer decisions and appeals
- Revision and correction history

Each evidence record should include:

- Evidence category
- Source and provenance
- Authoritative external URL or restricted reference where appropriate
- Submitter relationship to the evidence
- Acquisition and publication dates
- Jurisdiction and language
- Integrity metadata where lawful and useful
- Redactions and access classification
- Claims supported or contradicted
- Verification status
- Retention and withdrawal rules

Legal and procedural material must distinguish reports, complaints, acknowledgments, first information reports or equivalent filings, allegations, charges, investigation findings, official records, judicial findings, appeals, and final outcomes. A filing proves that a filing exists; it does not prove every assertion within it.

### Evidence safety and restricted references

The platform must not interpret `share everything` as permission to publish every artifact. Public discussion must exclude identifying documents, private communications, raw credentials, candidate identifiers, confidential legal material, unsafe infrastructure details, active-investigation evidence, unlawfully obtained data, leaked examination content, and material that creates material retaliation or re-identification risk.

Where public storage is unsafe or unlawful, record a limited attestation such as:

- Evidence category
- Redacted non-identifying summary
- Provenance and integrity reference
- Competent external recipient
- Submission date
- Receipt or case-reference token where safe
- Procedural status
- Verification outcome

Sensitive originals should remain with the competent authority, court, lawyer, regulator, journalist, investigator, infrastructure owner, or other appropriate custodian. The platform tracks status and provenance without becoming an uncontrolled evidence repository.

### Tamper-evident event timeline

Every problem should have a structured, append-oriented timeline. Events may include:

- Problem or incident identified
- Evidence submitted or corrected
- Responsible institution notified
- Acknowledgment received
- Inspection or investigation opened
- Action or remedy requested
- Commitment made
- Deadline established, changed, met, or missed
- Funding or authorization requested
- Proposal accepted or rejected
- Implementation started, paused, or completed
- Court or administrative decision recorded
- Outcome observed, disputed, or verified
- Recurrence detected

Each event must record actor or source, time, jurisdiction, related claim, evidence, confidence, visibility, and correction history. Corrections must not silently erase the prior record. Preserve the original value, corrected value, reason, authorizing process, evidence, and timestamp, subject to privacy and lawful deletion obligations.

### Asset, authority, and responsibility map

For public infrastructure and institutional problems, distinguish:

- Asset owner
- Operator and maintainer
- Funding authority
- Permission or licensing authority
- Implementation authority
- Oversight institution
- Investigation or adjudication authority
- Contractor or delivery organization
- Affected-party representative roles
- Office that can provide the requested remedy

Responsibility must be source-backed and time-bounded. A problem occurring during an office term does not by itself establish responsibility. Attribution should evaluate formal duty, actual authority, notice, capacity, action or inaction, dependencies, inherited conditions, and verified outcomes.

### Blocker ledger

A blocker must describe an obstructed task or decision, not infer a person's character or motive. Each blocker should record:

- Blocked task, decision, or outcome
- Responsible institution and exact time-specific designation
- Source establishing responsibility or dependency
- Required action
- Date requested and response period
- Response, non-response, or disputed responsibility
- Evidence supporting the blocker classification
- Dependency and authority still required
- Current owner and review date
- Next lawful escalation route
- Resolution condition

Supported statuses should include awaiting acknowledgment, assigned role, records, jurisdiction determination, technical review, investigation, administrative decision, court outcome, funding, permission, implementation, or verification; missed documented deadline; institution disputes responsibility; no documented response; legally blocked; and resolved.

The platform may state a documented fact such as `the designated authority did not publish the promised status report by the recorded deadline`. It must not infer corruption, conspiracy, malicious intent, or guilt without appropriately authoritative evidence.

### Action and procedural tracker

Participants should record lawful work already performed or planned, including complaints, public-information requests, representations, inspections, meetings, public hearings, peaceful demonstrations, administrative appeals, public court records, technical assessments, funding requests, proposals, institutional commitments, and implementation follow-up.

Each action should record:

- Purpose
- Responsible participant or group
- Institutional destination
- Date and jurisdiction
- Receipt, source, or acknowledgment
- Current procedural status
- Deadline and next step
- Related blocker and dependency
- Whether qualified legal, engineering, safety, or domain review is required

The platform organizes public procedural information. It must not impersonate a lawyer, engineer, investigator, public authority, or emergency service.

### Community-led implementation paths

Every implementation proposal should identify one of these authority patterns:

1. **Public delivery:** The competent public institution authorizes, funds, executes, and maintains the intervention.
2. **Community-controlled delivery:** A community, association, or private owner implements work entirely within assets and authority it lawfully controls.
3. **Hybrid delivery:** The community funds or coordinates diagnosis, design, procurement, monitoring, or part of delivery while the competent public institution grants permission, performs regulated work, connects public assets, inspects, or accepts maintenance responsibility.
4. **Temporary mitigation:** A bounded, safe, reversible measure reduces immediate harm while permanent resolution proceeds.

Community support does not authorize modification of public assets, unsafe work, entry into hazardous infrastructure, handling of dangerous material, interference with an investigation, or actions requiring licensed competence. Proposals must identify permits, asset ownership, technical review, contractor qualifications, insurance or liability where applicable, downstream effects, maintenance responsibility, cost distribution, and stopping conditions.

The platform must prevent public delay from automatically transferring the cost of public obligations to residents. Funding decisions should disclose who benefits, who pays, ability to pay, public obligations, alternatives, conflicts, procurement method, and long-term maintenance.

### Mass participation architecture

Large systemic problems must not become million-person chat rooms. Mass reach should be converted into bounded contribution tasks, incident workspaces, evidence requests, review queues, translations, affected-party verification, implementation offers, and outcome checks.

At scale, support:

- Parent systemic stewardship and child incident stewardship
- Capability working groups
- Structured submission forms
- Duplicate detection and incident clustering
- Independent-source and coordination analysis
- Rate limits and anti-automation controls
- Multilingual moderation and translation review
- Context-masked distributed review
- Sampling and prioritization without treating popularity as truth
- Public summaries that preserve drill-down provenance
- Contribution queues such as evidence verification, timeline correction, authority mapping, translation, technical review, and outcome verification

Audience size, followers, reposts, signatures, and submission volume indicate reach or support, not evidence quality, affected-party legitimacy, expertise, or decision authority.

## 7. Solution development and decisions

A solution proposal should contain:

- Summary and mechanism
- Target outcome and success metric
- Applicable geography and stakeholders
- Preconditions and dependencies
- Legal and safety considerations
- Estimated cost, effort, and time
- Responsible parties
- Risks and mitigations
- Implementation plan
- Verification plan
- Status and revision history

Do not assume majority voting is the correct decision rule. The founder must approve how local legitimacy, expertise, feasibility, minority rights, legal constraints, and problem-owner preferences interact. The system should support a configurable and explainable decision record rather than a single universal score.

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

## 12A. Durable civic accountability and election information

### Purpose and boundary

The platform should preserve durable, evidence-backed institutional memory so that the public can understand which problems existed, which offices had relevant authority, what was requested, what was promised, what was done or not done, which dependencies intervened, and what outcomes followed.

This layer may inform democratic participation and voting decisions. It must not instruct a person whom to vote for, issue platform endorsements, optimize political persuasion, or infer political preference from private behavior. The platform provides evidence, comparisons, uncertainty, and user-controlled views; the voter makes the political judgment.

### Jurisdiction-specific civic report

For an enabled municipality, constituency, district, state, or national jurisdiction, the platform may generate a civic report containing:

- Highest-impact documented unresolved problems
- Solved, improved, stuck, redirected, recurrent, and closed problems
- Evidence strength and coverage gaps
- Responsible institutions and time-specific offices
- Commitments made, met, missed, revised, or blocked
- Response and implementation timelines
- Verified outcomes and recurrence
- Dependencies outside the relevant office's authority
- Problems inherited from previous terms
- Candidate, party, community, expert, and institutional proposals

Reports must separate institutional accountability, administration-term accountability, and electoral commitments. They must not collapse these into one unexplained score.

### Prominence without a partisan `blunder` ranking

The platform may provide transparent views such as highest severity, greatest affected scope, longest unresolved, strongest evidence, most overdue commitments, highest recurrence, largest rights impact, or most locally relevant. Every prominent placement must expose its criteria, inputs, uncertainty, policy version, and appeal path.

The platform should not maintain a single authoritative list of `worst leaders` or `biggest blunders`. Multiple auditable views reduce the risk that one ranking function becomes political authority. Low-popularity but severe minority problems must remain discoverable.

### Responsibility and term attribution

Attributing a problem or outcome to an administration or office requires evidence of:

1. Relevant formal duty or authority
2. Applicable jurisdiction and term
3. Notice or reasonable opportunity to know
4. Capacity and legal ability to act
5. Documented action, inaction, commitment, or obstruction
6. Dependencies outside the office's control
7. Inherited conditions and prior decisions
8. Outcome during and after the applicable period

A temporal correlation is not enough. Reports must distinguish ownership, operation, funding, authorization, oversight, investigation, adjudication, and implementation authority.

### Public candidate and officeholder identity exception

Ordinary problem discussion remains role-based and does not name private individuals. A dedicated election-accountability record may identify a verified public candidate, elected officeholder, or official party by name when identity is necessary for voters to attribute a public proposal, commitment, term, or official action.

This exception is narrow:

- Identity must come from authoritative election, party, legislative, or institutional sources
- Naming is limited to public capacity, candidacy, official term, commitments, and documented acts
- Private life, family, personality, rumors, protected characteristics, and irrelevant history remain excluded
- Named records may not become open personality discussion or crowdsourced guilt profiles
- The same source, evidence, correction, response, and appeal rules apply across parties and candidates
- Ordinary evidence and discussion continue to use exact institutional roles where a name is unnecessary

### Candidate and party proposal records

Verified candidates, parties, officeholders, experts, and community groups may submit structured proposals. Each proposal should state:

- Problems addressed
- Applicable jurisdiction and office
- Proposed intervention
- Legal authority required
- Responsible institutions
- Estimated cost and funding source
- Implementation sequence and timeline
- Dependencies and risks
- Success and verification metrics
- Transparency and status-update commitments
- What can realistically be completed during the relevant term
- Conflicts of interest

The platform may evaluate completeness, evidence, feasibility, consistency, rights compatibility, and implementation readiness. It must not present popularity, AI confidence, or platform participation as proof that a proposal is correct.

### Commitment lifecycle

Public commitments should have a durable status model:

1. `proposed`
2. `formally_committed`
3. `authorized_or_elected`
4. `implementation_plan_due`
5. `implementation_started`
6. `delayed`
7. `partially_implemented`
8. `completed`
9. `outcome_pending`
10. `outcome_verified`
11. `failed`
12. `withdrawn`
13. `blocked_by_documented_dependency`

Each commitment must preserve exact wording, source, date, office, jurisdiction, term, conditions, authority, revisions, implementation evidence, and outcome. A promise is not an achievement, completed activity is not necessarily an outcome, and an outcome is not verified merely because the responsible party reports it.

### Neutral voter brief

A voter-facing brief may show:

- Documented problems relevant to the selected jurisdiction
- Responsible offices and institutional performance
- Evidence coverage and uncertainty
- Candidate and party responses to those problems
- Proposal cost, authority, dependencies, risks, and missing information
- Prior commitments and verified outcomes where attribution is valid
- User-controlled issue filters and comparison criteria

The brief must not output a voting instruction, platform endorsement, personalized persuasion score, inferred ideology, or covert political targeting. It may neutrally compare documented records and explain the basis of each comparison.

### Election-period integrity safeguards

Before enabling election-accountability features in a jurisdiction, require:

- Qualified election-law, defamation, data-protection, and human-rights review
- Authoritative candidate and constituency sources
- Equal participation and correction rules
- Independent, conflict-checked review
- Strong anti-bot, anti-brigading, and coordinated-influence controls
- No paid promotion, campaign advertising in rankings, or sale of voter data
- No behavioral political targeting
- No candidate or government control over moderation
- Transparent ranking and report-generation versions
- Expedited but fair correction and appeal procedures
- External audits where practical
- A controlled change, freeze, and incident process for high-risk ranking changes near voting dates
- Public disclosure of material data gaps and unsupported jurisdictions

The election layer must remain disabled where legal coverage, moderation capacity, source integrity, or safety protections are insufficient.

## 12B. Shared Civic Protocol and political organization interoperability

<aside>
🔗

**Founder direction:** The Open Problem-Solving Platform and Open Political Organizing Platform — Autonomous Build Specification are distinct products connected through one shared Civic Protocol and public civic data graph. They must not depend on one permanent shared internal application database.

</aside>

### Product boundary

The Open Problem-Solving Platform is the neutral public workspace for problems, claims, evidence, affected groups, institutional responsibility, proposals, implementation, blockers, corrections, and verified outcomes.

The Open Political Organizing Platform is the organizational workspace through which people form movements and parties, develop programmes, prepare candidates, deliberate internally, approve official positions, and support lawful election participation.

The problem-solving platform may become a public proving ground where people examine demonstrated civic work. It must not become a universal political reputation system, candidate endorsement engine, or morality ranking.

### Shared public records

Eligible public records should be reusable across compatible applications, including:

- Problems and affected scopes
- Claims, evidence references, uncertainty, and corrections
- Institutions, public offices, constituencies, authority, and responsibility
- Proposals, implementation plans, blockers, and outcomes
- Political movements and organizations in their public capacity
- Candidate profiles verified from authoritative sources
- Party and candidate positions
- Public commitments and implementation updates
- Organizational authorization and approval records
- Moderation decisions and appeals appropriate for public interoperability

Every interoperable object must carry a stable global ID, schema and protocol version, authoritative repository or node, origin application and node, author or organizational actor, acting capacity, authorization reference, jurisdiction, language, visibility class, provenance, correction state, and relevant policy version.

### Neutral civic record and political interpretation

The system must distinguish:

- **Civic record:** What problem, claim, evidence, uncertainty, affected scope, institutional responsibility, implementation, and outcome are documented.
- **Political interpretation:** How a movement, party, candidate, or individual interprets the record and which values, priorities, trade-offs, and interventions they support.
- **Political commitment:** What a candidate or organization publicly promises, under which authority, conditions, dependencies, cost assumptions, and verification measures.

A political actor may link to, challenge, interpret, or propose changes to the civic record. They may not rewrite, suppress, or privately control the underlying public record.

### Acting capacity and provenance

A linked person must deliberately select how a public contribution is made:

1. **Individual:** Represents only the person.
2. **Member:** May disclose relevant membership, but does not speak officially for the organization.
3. **Authorized representative:** Acts under a defined, current, scoped organizational authorization.
4. **Organization:** Publishes an exact version approved through the organization's recorded process.

Never infer that someone speaks for an organization merely because they are a member. Public records should capture `createdBy`, `actingAs`, `onBehalfOf`, and `authorizationRef` where applicable.

### Approved organizational publication

A political organization may reference a public problem inside its private workspace, deliberate using its own lawful governance process, and approve a proposal or response for public publication.

Suggested lifecycle:

1. `internal_draft`
2. `member_deliberation`
3. `revision_requested`
4. `approval_pending`
5. `approved_for_publication`
6. `published_to_civic_protocol`
7. `public_response_received`
8. `revision_under_review`
9. `superseded`
10. `withdrawn_or_corrected`

An official organizational publication must identify the publishing organization and its legal or platform-native status, exact approved version, authorized publisher, approval method and threshold, approval date, applicable governance-rule version, related public problems and evidence, and correction history. Publish only the minimum approval evidence needed to verify authority. Private deliberation, private membership, secret ballots, and restricted material do not become public merely because the approved output is public.

### AT Protocol foundation

Use AT Protocol as the leading public-data substrate unless a bounded technical spike demonstrates a material blocker. Define independently governed Civic Protocol Lexicons and application services on top of AT Protocol rather than forking the Bluesky product or representing civic objects as ordinary social posts.

Use AT Protocol initially for:

- DIDs and human-readable handles
- Signed public repositories
- Content-addressed records and strong links
- Account migration
- Repository synchronization and federation
- Lexicon schemas
- Granular OAuth permissions
- Relays, AppViews, and labelers

The Civic Protocol must add civic semantics, organization authorization, approval and quorum evidence, jurisdiction and election context, claim-specific provenance, corrections, withdrawals, supersession, commitments, outcomes, moderation decisions, appeals, compatibility rules, and conformance tests.

Keep stable civic object identifiers and a signed AT-independent export bundle so public knowledge is not permanently trapped in one protocol implementation.

### Public and restricted data boundary

AT repositories are public. Do not place private party deliberation, unpublished candidate material, protected membership, identity evidence, sensitive moderation evidence, private drafts, or restricted civic evidence in them.

Classify records as:

- **Public and replicable**
- **Restricted and purpose-bound**
- **Organization-private**
- **Transient unpublished intake**

Authorization must be enforced before restricted retrieval. Cross-application interoperability never grants automatic access to private data.

### Correction and accountability history

Signed repository commits do not replace the civic event and correction model. Because public accountability requires intelligible change history, define explicit records for correction, supersession, withdrawal, authority revocation, disputed status, and lawful deletion. Preserve prior public assertions where lawful and necessary without retaining personal or restricted content that must be deleted.

### Discovery without political scoring

The platform may help people discover emerging ideas, candidates, movements, and parties through attributable public work such as evidence, proposals, implementation, corrections, collaboration, and verified outcomes.

It must not reduce political worth to followers, activity volume, spending, popularity, inferred ideology, AI confidence, or one universal score. The platform does not endorse candidates or parties. It supplies inspectable records and transparent views from which people make their own judgments.

### Cross-platform vertical slice

Before broader political or election functionality, prove with fictional data that:

1. One person uses or explicitly links a protocol identity across both applications.
2. The person publishes one comment as an individual.
3. A fictional political organization deliberates privately and approves one exact proposal version.
4. The organization publishes the proposal through a Civic Protocol Lexicon.
5. The problem-solving platform displays it as an official organization position with understandable provenance.
6. A third reference application interprets the same record consistently.
7. A correction supersedes the proposal without silently rewriting history.
8. The account migrates between test hosts without breaking civic references.
9. Private drafts and membership data never enter the public repository.

Do not enable real election use until jurisdiction, identity, organizational-governance, moderation, privacy, security, election-integrity, and political-neutrality gates pass.

## 13. Data model baseline

Produce an entity-relationship model before implementation. At minimum evaluate these entities:

- User, profile, consent, authentication factor, role, scoped permission
- Geography, boundary, jurisdiction, location claim, verification
- Problem, systemic parent, incident child, stakeholder, lifecycle transition, follow, duplicate link, causal link, dependency link, recurrence link
- Claim, claim status, contradiction, contribution, revision, evidence, evidence provenance, restricted evidence reference, attachment, citation, verification, correction
- Timeline event, institutional notice, acknowledgment, procedural action, deadline, commitment, commitment revision, missed commitment
- Institution, public asset, office, designation, jurisdictional term, authority, duty, responsibility attribution, dependency, response
- Solution proposal, comparison, decision record
- Implementation plan, task, owner, blocker, escalation route, permission, inspection, contractor, procurement record, funding source, cost distribution, update, outcome metric
- Candidate, elected officeholder, party, election, constituency, official candidacy source, candidate proposal, voter brief, civic report, report-card dimension, prominence policy
- Moderation decision, policy rule, policy pack, model run, escalation, appeal
- Expert claim, credential evidence, verification, expiry
- Review task, assignment, label, disagreement, quality score
- Governance issue, experiment, change decision
- Playbook, version, step, follower, feedback
- Notification, preference, delivery attempt
- Audit event, security event, retention action, deletion request

Classify fields by sensitivity. Define retention, deletion, export, anonymization, and access rules before storing production personal data.

## 14. Technical architecture requirements

### Approved implementation baseline

The approved default is a universal TypeScript platform with an Expo frontend and a NestJS backend. Treat this as the implementation baseline rather than reopening the framework decision during Phase 0. The engineering team may propose a change only through an architecture decision record that demonstrates a material security, accessibility, operability, performance, licensing, or maintenance advantage and includes migration and rollback consequences.

### Frontend stack

Use one universal Expo application for iOS, Android, tablet, and web:

- Expo and React Native
- Expo Router for file-based universal routing, deep links, Android App Links, and iOS Universal Links
- React Native Web for browser delivery
- TypeScript with strict checking
- gluestack UI v5 as the leading universal component foundation
- NativeWind v5 as the default styling engine
- Project-owned semantic design tokens and civic components wrapping gluestack primitives
- `expo-localization` for device locale, region, and text-direction signals
- FormatJS / `react-intl` for ICU messages, plurals, dates, numbers, units, and relative time
- `@internationalized/date` where calendar, timezone, and locale-sensitive date behavior require it
- TanStack Query for server-state fetching, caching, invalidation, and retry policy
- React Hook Form and Zod for forms and client-visible validation
- Minimal local state management, with Zustand permitted only for bounded client state that is not authoritative server data

The project should share domain vocabulary, protocol schemas, API clients, validation contracts, i18n messages, design tokens, and most feature components across platforms. Platform-specific files such as `.web.tsx`, `.native.tsx`, `.ios.tsx`, and `.android.tsx` are permitted when required for accessibility, navigation, native capabilities, large desktop workspaces, or platform conventions. One codebase does not require an identical layout or interaction model on every device.

Feature code should import project-owned components such as `CivicButton`, `EvidenceRecord`, `ProblemStatus`, `InstitutionRole`, `BlockerTimeline`, `StewardshipPanel`, and `ProposalComparison`, rather than importing gluestack components directly. Pin component and styling versions, retain copied component source in the repository, and maintain visual, accessibility, RTL, and cross-platform regression tests.

Before the component foundation is considered production-approved, the reference prototype must pass on iOS, Android, mobile web, and desktop web in representative LTR and RTL languages. Test forms, tables, timelines, dialogs, drawers, menus, selects, action sheets, mixed-direction content, keyboard navigation, screen readers, large text, reduced motion, and low-end Android performance. If gluestack fails the agreed acceptance thresholds, keep the Expo architecture and replace only the component layer.

### Backend stack

Use a Node.js and TypeScript modular monolith built with NestJS. NestJS should provide the application composition, dependency injection, transport adapters, validation boundary, authentication integration, authorization guards, background-job entry points, and operational health surfaces. Domain rules must remain in framework-light modules that can be tested without starting NestJS.

Backend defaults:

- NestJS on the current approved Node.js long-term-support release
- PostgreSQL as the primary relational database
- An ORM or typed query layer selected through a narrow architecture decision after testing migrations, transactions, complex reporting queries, row-level authorization patterns, and operational support; domain logic must not depend directly on ORM-specific models
- PostgreSQL full-text search for the initial release; add a separate search engine only after measured requirements justify it
- S3-compatible object storage for permitted files and evidence artifacts
- A background-job abstraction, with Redis and BullMQ or an equivalent introduced only when durable asynchronous work, retries, or scheduled processing require it
- REST and an OpenAPI contract as the initial public API style
- Generated TypeScript API clients for the Expo application and approved integrations
- Server-Sent Events or WebSockets only for workflows that demonstrably require live updates
- OpenTelemetry-compatible logs, metrics, and traces
- Containerized local and deployment environments

The backend remains authoritative for authentication, authorization, lifecycle transitions, moderation status, evidence visibility, stewardship permissions, responsibility attribution, commitment status, audit events, and every consequential mutation. The client may provide optimistic presentation only where rollback is safe and the server remains final.

### Repository structure

Prefer a monorepo with explicit boundaries:

```
apps/
  platform/             Expo Router application for iOS, Android, and web
services/
  api/                  NestJS modular monolith
  workers/              Optional separately deployed job runners using shared backend modules
packages/
  domain/               Framework-light domain rules and state machines
  protocol/             Versioned public schemas and identifiers
  api-client/           Generated and wrapped API client
  design-system/        Tokens and universal civic components
  i18n/                 Messages, locale metadata, and formatting utilities
  policy/               Machine-readable constitutional and jurisdiction policy schemas
  validation/           Shared input and output schemas where safe
  testing/              Fixtures, conformance suites, and adversarial cases
```

Do not import server secrets, persistence models, internal moderation signals, or private authorization logic into shared client packages.

### Architecture style

The initial architecture must remain a modular monolith with clear domain boundaries, a relational database, optional background jobs, object storage, and replaceable AI providers. Justify any move to microservices with measured scaling, isolation, regulatory, team-ownership, or availability requirements. Federation is a later protocol and deployment capability, not a reason to begin with distributed microservices.

### Centralized-first delivery with a parallel decentralization program

**Founder decision:** The first production platform will be a founder-hosted centralized reference deployment. Full decentralization will proceed as a parallel open-source protocol, research, and experimentation program from the beginning. The decentralized track must not delay the first usable problem-resolution workflow, but the centralized implementation must preserve the structural escape routes required for federation, portability, independent nodes, and distributed storage later.

The project therefore has two coordinated tracks:

#### Track A: Founder-hosted reference platform

The production track uses the approved Expo, NestJS, and PostgreSQL architecture. It owns the immediate obligations for security, moderation, privacy, uptime, support, backups, legal compliance, and pilot operations. It should prove one complete workflow before depending on experimental distributed infrastructure.

#### Track B: Community decentralization program

The parallel open-source track develops:

- Federation and node-discovery protocols
- Signed node manifests and event exchange
- Data portability and problem migration
- Independent node conformance
- Distributed identity and recovery research
- Public-content replication
- Client-encrypted distributed storage
- Relay, witness, and bounded compute-node experiments
- Compromised-node quarantine and restoration
- Anti-capture governance and protocol amendment mechanisms

The tracks must share domain vocabulary, protocol schemas, identifiers, policy models, conformance tests, and public documentation. Do not create a second incompatible product or fork the domain logic merely to experiment with decentralization.

### Decentralization-ready requirements for the centralized implementation

The reference platform must adopt these constraints from the beginning:

#### Global object identity

Use globally unique, non-sequential public identifiers such as UUIDv7 or an equivalently suitable standard for problems, claims, evidence references, contributions, events, proposals, commitments, institutions, stewardship groups, and outcomes. Public records should be capable of carrying `originNodeId`, `protocolVersion`, and authoritative-location metadata even while only one production node exists.

#### Event-oriented consequential history

Every consequential mutation should create a durable event containing an event ID, object ID and type, event type, origin node, actor or authorized role, timestamp, policy version, payload or payload reference, previous-event hash where applicable, and signature capability. The centralized deployment may initially sign events with one service identity, but the event model must not require one universal database forever.

#### No permanent single-domain assumption

Separate stable object identity, authoritative node, public presentation URL, and replica locations. Do not encode one founder-controlled hostname as the permanent identity of every object or actor.

#### Framework-light shared domains

Keep lifecycle, evidence, stewardship, responsibility, commitment, and policy rules in framework-light modules. Expo, NestJS, PostgreSQL, and any ORM are adapters around the domain, not the definition of the protocol.

#### Storage and identity abstractions

Application logic should depend on bounded storage, identity, signing, search, notification, and job interfaces rather than directly spreading one provider SDK throughout the codebase. The first implementation may use centralized providers, while later implementations can supply federated or distributed adapters.

#### Export and import

Define a signed, versioned export bundle for public problems and their permitted claims, evidence references, timelines, contributions, proposals, decisions, implementation records, outcomes, policy versions, and provenance. Portability must work before live federation. Restricted content requires separate authorization, redaction, and key-handling rules.

#### Protocol-first API boundaries

Maintain versioned schemas and conformance fixtures for externally meaningful objects. The reference server may expose REST first, but protocol meaning must not be inseparable from internal database tables or NestJS-specific DTOs.

### Proposed decentralized node roles

The decentralization program should evaluate distinct node capabilities rather than treating every computer as a complete trusted server.

#### Anchor nodes

Independently operated bootstrap and trust-metadata nodes may publish signed node directories, supported protocol versions, constitutional and jurisdiction-policy hashes, software-release metadata, relay addresses, revocations, quarantine decisions, and network-health information. Anchor nodes must not route every request, hold universal decryption keys, own all problems, or unilaterally control network membership. Consequential anchor actions should use threshold approval across independent operators.

#### Civic instance nodes

Civic nodes run compatible problem-solving services for a community, jurisdiction, or organization. A problem normally has an authoritative home node, while compatible nodes may mirror public records and exchange signed events. Node authority is scoped and does not manufacture legal, political, or constitutional legitimacy.

#### Community-started civic nodes

**Founder direction:** A non-technical person in an uncovered area should be able to open the client, discover that no compatible node currently serves the selected area, and start a small civic node through a guided deployment. For example, a person in an uncovered part of Bhopal could create an experimental local node, invite a small stewardship group, and progressively qualify it for broader public operation.

The client should say approximately:

> **This area is not currently covered by a compatible civic node. You can follow nearby public problems, request coverage, or help start a community node.**
> 

Do not infer or publish uncovered status from precise GPS without necessity and consent. Let the person choose a coarse area, explain what coverage means, show nearby and overlapping nodes, and distinguish `no node found` from `no problem exists`.

#### Node-starting experience

Evaluate a provider-neutral deployment wizard with this flow:

1. **Choose scope:** Proposed area, language, intended participant group, and whether the node begins as a personal sandbox, invited community pilot, or public-node application.
2. **Understand responsibility:** Plain-language explanation of privacy, moderation, backups, updates, abuse handling, legal jurisdiction, operator visibility, continuity, and external hosting costs.
3. **Select a deployment route:** Supported cloud provider, compatible community host, university or organizational infrastructure, local server, or a downloadable self-hosting bundle.
4. **Connect directly to the provider:** Use provider OAuth, organization access, infrastructure-as-code template, or a one-click deployment link. The platform must not collect provider payment credentials or intermediate hosting payments.
5. **Generate the node:** Deploy the smallest approved profile, create keys, configure HTTPS, initialize the database and storage, enable backups and updates, and produce a signed node manifest.
6. **Create recovery and stewardship:** Invite at least one additional trusted operator or recovery steward before public qualification. One person may bootstrap a node but should not remain its sole irreversible authority.
7. **Run conformance checks:** Verify software release, policy pack, security configuration, privacy boundaries, backup and restore, observability, moderation readiness, and supported protocol version.
8. **Register discovery:** Publish the node only at the appropriate maturity level. Experimental nodes must not appear as constitutionally verified public coverage.
9. **Invite the first group:** Provide privacy-safe invitation links or QR bundles and an onboarding checklist for the local community.
10. **Graduate or migrate:** Move from sandbox to pilot to verified civic node only after readiness gates. Support export or migration if the original operator cannot continue.

The interface must not imply that clicking `start a node` creates legal authority, municipal status, trusted moderation, public-institution endorsement, or permission to process sensitive evidence.

#### Node maturity levels

Use explicit maturity states:

- `personal_sandbox`: Fictional, public, or otherwise approved test data only; not listed as area coverage.
- `invited_pilot`: Limited known participants and bounded public-data workflows; prominently marked experimental.
- `community_candidate`: Meets technical conformance but still requires moderation, privacy, governance, and jurisdiction readiness review.
- `verified_civic_node`: Approved for defined public capabilities, languages, data classes, and jurisdictions.
- `restricted_or_quarantined`: New intake, federation, storage, or discovery capabilities limited pending investigation or remediation.

Capability approval should be granular. A node may be approved for public-problem replication or public discussion without being approved for identity, restricted evidence, election accountability, AI processing, or moderation appeals.

#### Small-node deployment profile

Design the reference node to begin on one low-cost machine or equivalent managed container with:

- The NestJS modular monolith
- PostgreSQL, embedded locally for the smallest profile or supplied as a compatible managed service
- Minimal permitted object storage
- Reverse proxy and automatic TLS
- Encrypted secrets and node signing keys
- Automated backup, restore test, update, health check, and export
- Bounded logs and metrics without raw PII
- Resource and abuse limits
- Optional relay or federation connector

Do not require Kubernetes, multiple microservices, a dedicated search cluster, Redis, a separate queue, local large-model inference, or distributed storage for a small starter node. Add these only when measured load or capability requirements justify them.

The engineering target should be that a low-activity node for a small community can run on a common entry-level hosting profile. Maintain a reproducible benchmark for 25, 100, and 500 active participants, including storage, bandwidth, backups, federation, moderation jobs, and AI calls. Publish current provider examples separately from the protocol because prices and regional availability change.

A provisional product target is that the basic non-AI node for approximately 25 to 100 low-activity participants should fit on a single low-cost instance and remain within an approximately US$10–20 monthly infrastructure envelope in commonly available regions. This is a design target, not a price promise. AI inference, heavy media, SMS, email, high egress, enhanced backups, legal compliance services, and rapid traffic growth must be measured separately.

#### External group cost sharing

The platform remains non-monetary. The node operator or small group pays the cloud or service provider directly outside the platform. As membership grows, the group may voluntarily arrange external provider credits, shared organization billing, a cooperative account, or direct payment to the vendor through an approved external organization.

The platform may display:

- Current hosting provider and deployment profile
- Approximate public operating-cost band supplied by the operator
- Capacity and resource utilization bands
- Whether the node seeks in-kind hosting, migration, or direct external vendor support
- A rare external cost-need record under Article 98

It must not collect contributions, maintain balances, assign payment shares, reveal who paid, rank members by payment, restrict civic rights based on payment, issue receipts, or mediate financial disputes. Paying a hosting bill does not create ownership of community data, permanent operator authority, additional votes, moderation power, or problem prominence.

#### Provider adapter model

Keep provider integration behind versioned adapters. An adapter should declare supported regions, estimated resource envelope, architecture, deployment method, identity flow, data-processing terms, backup behavior, network exposure, IPv4 and IPv6 support, export path, deletion path, and known limitations.

Initial implementation should support one well-tested generic container or virtual-machine bundle and no more than two or three provider adapters. Community contributors can add providers through conformance tests without changing the civic protocol. Never require one company, marketplace, DNS provider, payment provider, or cloud account type.

#### Safety and continuity

Before a community node is treated as public coverage, require:

- At least two independent recovery paths or operators where feasible
- Automated security updates with staged rollback
- Tested backup, restore, export, and provider migration
- Node-key rotation and lost-operator recovery
- Resource exhaustion, abuse, spam, and denial-of-service protections
- Public operator, jurisdiction, software, policy, support, and capability disclosures
- A moderation and incident-response contact appropriate to enabled features
- A plan for expired hosting, failed payment, disappeared operator, compromised account, or provider shutdown
- No storage of restricted evidence or identity material until separately approved

If hosting expires, the client should fail safely, preserve signed public exports and recovery metadata where available, identify alternate replicas, and help authorized stewards migrate the node. It must not expose data, silently transfer authority, or allow the provider account holder to erase public history without detection.

#### Relay nodes

Relay nodes assist nodes behind NAT, firewalls, changing addresses, or intermittent connections. They transport encrypted traffic without receiving application authority or plaintext by default.

#### Storage nodes

Storage nodes retain opaque encrypted fragments. They should not receive plaintext, original filenames, user identities, problem titles, object keys, or enough fragments to reconstruct restricted content independently.

#### Witness nodes

Witness nodes monitor signed checkpoints, manifests, policy versions, software releases, public event roots, quarantine decisions, and federation consistency. Their purpose is to make silent history rewriting and equivocation detectable.

#### Compute nodes

Compute nodes perform bounded work such as public-content indexing, translation, public aggregation, conformance testing, duplicate-candidate generation, media processing, or encrypted-fragment repair. Sensitive computation requires redacted input, explicit authorization, client-side execution, an independently assessed confidential-computing method, or another approved privacy boundary.

Personal computers should begin with low-risk roles such as public replica, relay, witness, protocol tester, public-data worker, or encrypted-fragment storage. They should not initially receive identity material, moderation secrets, private evidence, universal keys, or enough fragments to reconstruct restricted objects.

### Discovery and coordination

DNS and `.well-known` endpoints may bootstrap a new client into the network, but DNS must not become the permanent coordination, trust, surveillance, or censorship plane. A bootstrap response should contain expiring, signed metadata such as protocol version, anchor manifests, root keys, transparency-log locations, bootstrap peers, policy registries, and software-update metadata.

After bootstrap, clients should be able to discover and verify nodes through multiple sources such as independent anchor mirrors, cached trusted manifests, peer exchange, distributed routing, jurisdiction registries, or user-provided invitation bundles. A user account and problem require stable authoritative locations; do not randomly route stateful mutations among unrelated nodes merely because they share a certificate or DNS pool.

TLS proves control of a domain, not constitutional compliance or approved software behavior. A node manifest should identify the node public key, operator or operator class, domains, jurisdictions, protocol versions, software-release digest, constitutional version, active policy packs, capabilities, validity period, and required signatures.

### Federation before unrestricted peer-to-peer mutation

The first decentralized milestone should be federation among a small number of independently operated civic nodes. Each problem should have an authoritative home node and a signed event stream. Receiving nodes verify origin, signature, sequence, policy compatibility, and event integrity before applying or mirroring an event.

Do not require global blockchain consensus for ordinary contributions or lifecycle actions. Use cross-node or threshold consensus only for narrowly defined network matters such as protocol roots, constitutional versions, anchor membership, network-wide revocation, or interoperability standards.

Do not use automatic last-write-wins conflict handling for stewardship, moderation, evidence verification, lifecycle transitions, election records, accountability corrections, or deletion requests. CRDTs or equivalent collaborative methods may be evaluated for low-risk drafts, notes, and offline editing, but consequential state changes require explicit authority and decision records.

### Distributed encrypted storage model

The community track may evaluate a least-authority storage model in which the client or authorized custodian:

1. Generates a random per-object data-encryption key.
2. Authenticated-encrypts the object before storage-node access.
3. Erasure-codes the ciphertext into redundant fragments.
4. Places fragments across independent operators and failure domains.
5. Uses capability-based read, write, repair, share, and deletion authority.
6. Maintains signed, opaque availability commitments and repair status.

No storage node should independently possess enough fragments or keys to reconstruct restricted content. Storage placement should consider operator independence, hosting-provider correlation, jurisdiction, availability, retention, and repair cost.

The network may know that an opaque ciphertext object has a sufficient number of available fragments without knowing the user, problem title, original filename, plaintext hash, evidence description, or decryption key. Storage proofs, audits, and repair should operate on ciphertext wherever possible.

### Data-class-specific decentralization

Do not distribute every data class identically:

- **Public constitutional knowledge, public problems, public playbooks, policy rules, and public commitments:** Signed, content-verifiable, and broadly replicable.
- **Restricted evidence references and moderation records:** Encrypted, access-controlled, jurisdiction-aware, and minimally replicated.
- **Identity and uniqueness material:** Isolated in a separate trust domain, purpose-bound, minimally retained, and excluded from ordinary volunteer storage.
- **Transient unpublished drafts:** Prefer local-device storage, short retention, encryption when synchronized, and automatic expiry.
- **Public audit checkpoints:** Widely replicated hashes and signatures without private payloads.

Encryption does not make all distributed storage lawful or safe. The design must address illegal-content storage, malware, abuse, copyright, retention, deletion, jurisdiction, node-operator obligations, and metadata leakage.

### Encrypted-computation boundary

Do not claim that storage nodes can both remain unable to see plaintext and perform arbitrary search, moderation, translation, deduplication, or AI analysis over that plaintext. Public content may be processed normally after publication. Restricted content should be processed on the client, by an explicitly authorized trusted node or reviewer, within a separately approved isolated environment, or through a narrowly validated privacy-preserving technique.

Secure multiparty computation, private set intersection, homomorphic encryption, zero-knowledge proofs, and trusted execution environments may be researched for bounded operations. They are not assumed to be general replacements for full-text search, arbitrary moderation, or large-language-model processing.

### Node quarantine and recovery

The decentralized design should support states such as suspected, under investigation, quarantined, replication restricted, trust revoked, remediation submitted, revalidated, and restored with monitoring. Quarantine and revocation require evidence, independent confirmation, a defined threshold, signed decisions, review dates, appeal, key rotation, at-risk fragment repair, and revalidation of affected events and decisions.

### Community decentralization working group

Create a public decentralization working group with:

- A bounded charter
- Open RFC process
- Maintainers and reviewers
- Security, privacy, legal, governance, and distributed-systems participation
- Public decision records
- Conflict-of-interest disclosure
- Experimental-status labels
- Protocol versions and compatibility policy
- Reference fixtures and conformance tests
- Threat models and adversarial reviews

The working group should answer concrete questions rather than an unbounded instruction to `decentralize the platform`:

1. How does a node establish and rotate identity?
2. How are nodes discovered after bootstrap?
3. Which node is authoritative for a problem or event?
4. How are signed events exchanged, verified, rejected, and replayed?
5. How can a problem or account move between compatible nodes?
6. How are public records replicated and indexed?
7. How are correction, withdrawal, deletion, and retention propagated?
8. How are consequential conflicts resolved?
9. How are compromised nodes quarantined and restored?
10. How are encrypted fragments placed, audited, repaired, and deleted?
11. Which metadata remains observable to coordinators and storage nodes?
12. Which computations can occur without plaintext disclosure?
13. How is constitutional and jurisdiction-policy compatibility verified?
14. How can the network recover from compromised DNS, anchors, signing keys, or software distribution?
15. How does an independent implementation prove protocol conformance?

Every proposed protocol should include a threat model, privacy analysis, failure behavior, working prototype, interoperability test, migration path, rollback or containment plan, and evidence of adversarial testing. Community popularity alone cannot approve production handling of sensitive data.

### Decentralization maturity measurements

Do not call the platform decentralized merely because the code is open, anyone can run a server, multiple IP addresses exist, data is encrypted, or a blockchain is used. Measure concentration separately across:

- Hosting
- DNS and discovery
- Identity and recovery
- Data custody
- Signing keys
- Protocol control
- Software distribution
- Moderation
- Governance
- Funding
- Domain and trademark control
- Network quarantine and restoration

For each dimension, document who currently holds control, what the failure or capture risk is, which safeguards exist, and what milestone reduces that concentration.

### Delivery priority and resource allocation

Until the first bounded workflow is verified, approximately 80% to 90% of implementation capacity should remain on the founder-hosted reference platform and 10% to 20% on protocol boundaries, RFCs, threat models, conformance fixtures, and contained decentralization experiments. This is a planning default rather than a spending authorization.

No production sensitive data should enter experimental peer-to-peer storage or compute systems before independent security review, metadata-leakage analysis, recovery and deletion testing, jurisdictional legal review, abuse-storage threat modelling, and explicit founder approval.

The governing architecture principle is:

> **Centralized operationally at launch, portable structurally, open at the protocol boundary, and replaceable by design.**
> 

Required boundaries:

- Identity and access
- Problem workflow and systemic problem graph
- Claims, evidence provenance, restricted references, and tamper-evident timelines
- Participation and proposals
- Institutional authority, responsibility, blockers, and procedural actions
- Implementation authority, permissions, procurement, and outcome verification
- Moderation and policy evaluation
- Geography and jurisdiction
- Civic accountability, public commitments, and election information
- Reviews and appeals
- Notifications
- Search and discovery
- Governance and audit
- Analytics with privacy safeguards

### API principles

- Version externally consumed APIs.
- Validate all inputs on the server.
- Use idempotency for retryable mutations.
- Use pagination and bounded queries.
- Enforce authorization at the data access boundary.
- Record audit events for consequential actions.
- Return stable machine-readable error codes and user-safe messages.
- Generate and validate an API contract where practical.

### AI subsystem

- Isolate model providers behind interfaces.
- Use structured outputs with schema validation.
- Treat user content, retrieved documents, and community labels as untrusted input.
- Keep system instructions and policy data separated from user-controlled content.
- Add prompt-injection tests and adversarial fixtures.
- Log minimum necessary metadata, with redaction.
- Support model and prompt versioning, evaluation sets, canary rollout, fallback behavior, and a kill switch.
- Fail safely when models or policy services are unavailable.

### Public-facing AI data safety boundary

**Founder direction:** Treat every public-facing AI input, attachment, retrieved record, tool result, intermediate representation, and generated output as potentially containing personal data, sensitive personal data, third-party information, precise location, secrets, or restricted civic evidence. A user intending to publish a public problem does not make the unreviewed intake safe or public. Raw intake remains private and untrusted until the privacy gate approves a non-identifying representation.

Public-facing AI includes conversational intake, structural reframing, summarization, translation, moderation assistance, duplicate detection, search, retrieval-augmented generation, evidence extraction, transcription, OCR, image or document analysis, recommendation, timeline generation, responsibility mapping, report generation, and any AI-enabled support or contributor interface.

#### Safe-processing architecture

Use an explicit AI privacy gateway rather than allowing application features to call external models directly. The gateway should:

1. Authenticate the requesting user or service and verify purpose and authorization.
2. Classify the requested operation, data classes, jurisdiction, sensitivity, and permitted model environments.
3. Reject unsupported, excessive, or prohibited data before model access.
4. Remove file metadata and perform malware, document, image, OCR, secret, identifier, and re-identification screening.
5. Minimize, redact, generalize, pseudonymize, or tokenize data before leaving the approved trust boundary.
6. Construct the smallest purpose-specific prompt and retrieval context.
7. Route only to an approved model deployment with the required region, retention, training-use, isolation, and contract controls.
8. Treat model output as sensitive and untrusted until output privacy, safety, grounding, and policy checks pass.
9. Require user confirmation before publishing AI-transformed content.
10. Record a minimal audit event without storing raw prompts or responses by default.

No client, plugin, contributor tool, background worker, or experimental feature may bypass this gateway for production user data.

#### Data-zone separation

Maintain technically and operationally distinct zones:

- **Transient raw-intake zone:** Short-lived private drafts and uploads used only for classification, redaction, and user-approved transformation.
- **Restricted evidence zone:** Encrypted, narrowly authorized material that is excluded from general-purpose public AI and ordinary contributor access.
- **Sanitized AI-processing zone:** Minimized or tokenized context approved for a specific model operation.
- **Public knowledge zone:** Material that has passed privacy, safety, evidence, and publication review.
- **Audit and telemetry zone:** Minimal metadata, policy versions, routing decisions, and outcome status without raw content by default.

Moving data between zones is a consequential policy decision and must be server-authorized, auditable, testable, and reversible where possible.

#### Processing preference order

For potentially identifying content, prefer:

1. Deterministic local validation and redaction.
2. On-device or organization-controlled processing when it provides adequate quality and security.
3. Isolated project-operated inference in an approved region.
4. A contractually approved hosted provider only when the preceding options are insufficient.

Local execution is not automatically safe: models, plugins, extensions, logs, crash reporters, model downloads, tool servers, and the operating system can still leak data. Every environment requires a threat model and verified configuration.

#### Hosted-provider requirements

A hosted model may process production user data only after documented approval of:

- Data-processing agreement and lawful transfer mechanism where required
- Explicit prohibition on training or improving shared models with project data
- Zero or strictly bounded content retention, with deletion verification
- Approved processing and storage regions
- Tenant isolation and least-privilege operator access
- Encryption in transit and at rest
- Subprocessor inventory and change notification
- Security certifications or equivalent evidence appropriate to risk
- Breach notification and incident-cooperation terms
- Abuse-monitoring behavior and whether provider personnel can inspect content
- Model, endpoint, version, fallback, and routing transparency
- Export, deletion, termination, and provider-switch procedures
- Prohibition on silently routing data to an unapproved model or region

Consumer chat products, personal API accounts, browser extensions, unapproved MCP or tool servers, and free hosted endpoints must not receive production user data merely because they are convenient or inexpensive.

#### Retrieval and tool safety

Authorization must be enforced before retrieval, not after a model has seen the data. Retrieval systems must apply user, problem, role, jurisdiction, evidence classification, retention, and purpose constraints before producing model context. Do not rely on the model to ignore unauthorized records.

Tool calls require explicit schemas, allowlists, bounded permissions, output validation, time and cost limits, and confirmation for consequential actions. Retrieved documents and tool output remain untrusted and may contain prompt injection designed to exfiltrate data, alter policy, or invoke unauthorized actions.

#### Pseudonymization and token handling

Where a workflow needs continuity without identity disclosure, replace identifiers with scoped, expiring tokens. Keep re-identification mappings in a separate encrypted service with stricter authorization, retention, and audit rules. Do not use stable global pseudonyms when a problem-scoped or operation-scoped token is sufficient.

Pseudonymized data remains personal data when it can be relinked. Hashing an email address, phone number, account ID, or exact address does not by itself make it anonymous.

#### Logging and observability

Do not place raw prompts, raw responses, attachments, embeddings, retrieved passages, personal identifiers, or decryption material in ordinary application logs, traces, analytics, crash reports, or model-evaluation stores. Use opaque request IDs, policy outcomes, model versions, timing, token counts, redaction counts, and categorized failure codes.

Time-bounded encrypted diagnostic capture may be enabled only for a specific incident or approved evaluation, using sampled minimum-necessary data, restricted access, documented purpose, automatic expiry, and an auditable deletion path.

#### Output controls

AI output can reproduce input PII, infer sensitive attributes, reveal restricted retrieval context, or combine harmless facts into an identifying narrative. Before display or publication:

- Re-run secret, identifier, sensitive-attribute, exact-location, and re-identification checks.
- Validate citations, source permissions, and claim scope.
- Prevent output from revealing hidden system metadata, reviewer identities, moderation evidence, or restricted records.
- Mark uncertain transformations and require human confirmation.
- Preserve the original sanitized user statement so an AI rewrite cannot silently change meaning.
- Fail closed to a private draft when confidence, language support, or privacy checks are insufficient.

#### Consent, notice, and user rights

Before an AI feature receives user content, provide a plain-language notice describing purpose, data classes, processing location or provider class, retention, whether a human may review it, publication consequences, and available non-AI or manual alternatives. Do not use bundled consent to authorize unrelated training, profiling, advertising, or product analytics.

Support applicable access, correction, deletion, withdrawal, objection, and export rights. Deletion must address raw intake, provider retention, caches, embeddings, evaluation datasets, replicas, backups, derived records, and re-identification mappings according to the approved retention policy.

#### Operational gates

Before any public-facing AI feature enters production, require:

- Data-flow and trust-boundary diagram
- Data protection impact assessment or equivalent privacy review
- Model and provider register
- Purpose, lawful basis, data-class, jurisdiction, retention, and deletion mapping
- Synthetic-PII evaluation set covering supported languages and scripts
- Prompt-injection, extraction, memorization, cross-tenant, retrieval-authorization, and tool-abuse tests
- Redaction recall and harmful-over-redaction analysis
- Provider failure, fallback, outage, breach, and termination runbooks
- Human override, feature kill switch, and safe non-AI fallback
- Independent security and privacy review proportionate to risk
- Explicit founder approval for high-risk data classes or external processing

Do not test with real private evidence or copied production PII when representative synthetic data can answer the question.

### Context-efficient, cached, multi-model inference architecture

**Founder direction:** The AI subsystem must be designed for a large and continuously evolving body of constitutional rules, jurisdiction laws, policy packs, workflow rules, and evidence requirements without sending the entire rule corpus into every model request. It should use bounded staged inference, deterministic policy evaluation where possible, privacy-safe caching, and eval-driven routing to the cheapest model that has demonstrated adequate performance for the specific task and risk tier.

#### Do not turn the complete rule system into one prompt

Represent rules as versioned, addressable policy objects with stable rule IDs, effective dates, jurisdictions, applicability predicates, priority, source, authoritative text, machine-readable constraints, approved summaries, examples, and evaluation fixtures. Separate:

- Deterministic rules that code or a policy engine can evaluate directly
- Retrieval rules that determine which policy subset applies
- Classification or extraction tasks suitable for a smaller model
- Ambiguous interpretation tasks requiring a stronger model or qualified human
- Consequential decisions that AI may assist but cannot authorize

A generated summary must not silently replace authoritative legal or constitutional text. Every model stage should receive only the applicable policy slice and retain source and rule identifiers for traceability.

#### Inference pipeline as a bounded directed acyclic graph

Implement inference as observable, restartable stages with typed inputs and outputs rather than one unconstrained conversation:

1. **Request classification:** Determine task, language, jurisdiction candidates, data class, sensitivity, workflow stage, and risk tier.
2. **Deterministic applicability:** Resolve effective policy versions, jurisdiction, user capability, evidence class, and mandatory non-AI rules.
3. **Policy retrieval:** Retrieve only the relevant constitutional articles, jurisdiction rules, workflow constraints, definitions, and examples.
4. **Fact and claim extraction:** Convert minimized user content into a structured claim, actor-role, geography, time, evidence, and uncertainty representation.
5. **Specialist evaluations:** Run bounded evaluators for privacy, safety, legality, relevance, evidence, structural framing, moderation, and workflow eligibility. Independent evaluations may run in parallel when their inputs and authority do not depend on each other.
6. **Deterministic aggregation:** Combine typed results using explicit precedence, veto, dependency, confidence, and escalation rules.
7. **Targeted adjudication:** Send only unresolved conflicts, missing facts, or ambiguous rules to a stronger model or qualified human.
8. **User-safe explanation:** Generate an explanation from the structured decision record and cited rule IDs without exposing restricted reasoning or internal risk signals.
9. **Output privacy and policy gate:** Re-screen the final output before display, storage, or publication.

Each stage must be independently testable, replayable against the same approved inputs where provider behavior permits, and replaceable without redesigning the entire pipeline.

#### Hard context budgets

Define a maximum input, output, retrieved-policy, and tool-result budget for every stage and supported model. The orchestrator must estimate tokens before dispatch and refuse to rely on accidental provider truncation.

When material exceeds a stage budget:

- Split by independent claims, documents, jurisdictions, time periods, evidence items, policy families, or workflow questions.
- Use typed partial outputs with source pointers, confidence, unresolved dependencies, and coverage metadata.
- Aggregate partial results deterministically where possible.
- Run a final cross-item consistency pass over structured results rather than all raw source text.
- Escalate when dependencies cross chunks or mandatory rules cannot fit safely.

Never truncate a mandatory rule, exception, legal qualifier, contradiction, denial condition, or evidence source merely to fit a model context. A coverage manifest should show which rules and source segments were considered, omitted, superseded, or escalated.

#### Durable structured state instead of conversational memory

Persist approved intermediate state such as classification, policy selection, claim graph, evidence references, unresolved questions, stage outputs, and decision records in typed application storage. Do not repeatedly resend the full conversation when the next stage needs only a small structured subset.

Conversation history should be summarized into separately reviewable facts and user-approved intent. The system must distinguish user statements, model inferences, retrieved facts, authoritative rules, disputed claims, and prior decisions.

#### Prompt and policy caching

Maximize safe reuse of stable prompt components:

- Keep the system constitution, stage instructions, tool schemas, output schemas, and selected public policy text in stable canonical order so provider prefix caching can apply.
- Separate stable public prefixes from dynamic, user-specific, or restricted suffixes.
- Cache compiled policy packs, embeddings, retrieval indexes, token counts, schema validators, jurisdiction-resolution results, and deterministic rule outputs where valid.
- Use content-addressed keys incorporating stage, prompt version, policy-pack hashes, model and endpoint version, jurisdiction, language, data class, tool schema, and relevant feature flags.
- Define TTL, invalidation, migration, and cache-warming rules for every cache class.
- Invalidate affected entries immediately when a rule, law, policy pack, model, prompt, schema, safety control, or jurisdiction mapping changes.

Provider-side prompt caching must never be assumed to provide privacy, deletion, geographic, or retention guarantees beyond the approved provider agreement.

#### PII-safe cache boundaries

Public constitutional and policy components may be cached broadly. User-specific or restricted content must not share a cache namespace across users, problems, tenants, or purposes unless an approved privacy analysis demonstrates that it is non-identifying and safe.

For sensitive cache entries:

- Prefer not to cache raw input or output.
- Cache minimized structured results when sufficient.
- Encrypt at rest and in transit.
- Scope keys to user, problem, tenant, purpose, policy version, and authorization context as needed.
- Apply short TTLs and explicit deletion propagation.
- Prevent cache timing, key, hit-rate, or error behavior from becoming an identity or content side channel.
- Exclude sensitive material from ordinary logs, traces, analytics, and shared semantic caches.

A cache hit never bypasses current authorization, retention, consent, policy-version, or publication checks.

#### Multi-model inference gateway

Maintain a versioned model registry describing each approved endpoint's:

- Supported tasks and languages
- Quality and calibration by task and risk tier
- Input and output context limits
- Structured-output and tool-use reliability
- Cost and rate limits
- Latency and availability
- Region, retention, training-use, isolation, and subprocessor properties
- Safety and PII-handling approval
- Known failure modes and prohibited data classes
- Current evaluation version and expiry

The gateway should route each stage to the **cheapest eligible model that meets the approved quality, privacy, language, latency, context, and risk thresholds**. Cheapest does not mean lowest token price when retries, review burden, false negatives, long prompts, tool errors, or downstream harm make the total outcome more expensive.

Use an escalation ladder:

1. Deterministic code or cached valid result
2. Small or inexpensive model
3. More capable specialist model
4. Independent verifier or alternative model where required
5. Qualified human review

Escalate on low confidence, disagreement, unsupported language, incomplete policy coverage, schema failure, novel attack patterns, high-risk data, or consequential outcome. Do not repeatedly retry a cheap model when evidence shows that it is not competent for the task.

The gateway must not silently fail over to an endpoint with weaker privacy terms, a different region, unapproved retention, unsupported policy versions, or prohibited data access. Privacy and constitutional eligibility are hard routing constraints, not cost preferences.

#### Evaluation-driven model selection

Create task-specific evaluation suites for intake classification, PII detection, redaction, jurisdiction routing, policy retrieval, moderation, evidence extraction, duplicate detection, structural reframing, translation, summarization, responsibility mapping, timeline extraction, and explanation generation.

Evaluate models using metrics appropriate to each task, including:

- Precision, recall, false-negative rate, and calibration
- Policy-rule coverage and correct exception handling
- Citation and source grounding
- Structured-output validity and schema adherence
- PII leakage and harmful over-redaction
- Multilingual, code-switching, script, dialect, and RTL performance
- Prompt-injection and tool-abuse resistance
- Determinism or stability where required
- Human review time and correction rate
- Latency, retries, token use, cache-hit rate, and total cost per accepted result
- Disparate impact across jurisdictions, languages, affected groups, and political contexts

Set a minimum threshold per task and risk tier. A model that passes low-risk summarization may still be prohibited from privacy classification, legal routing, moderation, or evidence decisions.

Use synthetic, public, licensed, or properly redacted evaluation data. Production examples may enter an evaluation set only through an approved purpose, minimization, retention, access, and deletion process.

#### Continuous routing lifecycle

- Benchmark candidate models offline against the same versioned suite.
- Promote through shadow, canary, bounded rollout, and monitored general availability.
- Compare routed decisions with human outcomes, appeals, reversals, and downstream defects.
- Re-evaluate after model, endpoint, prompt, policy, schema, retrieval, or provider changes.
- Detect quality, cost, latency, and fairness drift.
- Retain rollback to the previous routing policy and model set.
- Expire approvals when evidence becomes stale.

The routing policy, thresholds, evaluation dataset version, and model registry must be auditable. Model selection must not be changed solely through an opaque vendor recommendation or benchmark headline.

#### Cost governance

Track cost by stage, problem, jurisdiction, language, model, retry, cache hit, accepted output, human correction, and verified product outcome. Optimize total cost per safe and accepted decision rather than tokens alone.

Set budgets and alerts for unexpected context growth, cache misses, retry loops, tool recursion, provider price changes, traffic abuse, and stage-level regressions. Any automatic cost cutoff must fail safely to a private draft, deferred processing, deterministic fallback, or human queue rather than silently weakening policy checks.

## 15. Security, privacy, and abuse resistance

Create a threat model before public launch. Cover account takeover, privilege escalation, doxxing, stalking, brigading, Sybil attacks, reviewer collusion, false expertise, evidence tampering, malicious uploads, scraping, prompt injection, data poisoning, denial of service, and insider misuse.

Minimum controls:

- Strong authentication and optional or required MFA for privileged roles
- Least privilege and separation of duties
- Encryption in transit and at rest
- Secret management and rotation
- Secure upload scanning and content-type validation
- Rate limits, abuse detection, and anti-automation controls
- CSRF, XSS, injection, SSRF, broken access control, and dependency protections
- Append-only or tamper-evident audit strategy for consequential events
- Backup, restore, disaster recovery, and deletion testing
- Privacy-preserving logs and analytics
- Coordinated vulnerability disclosure process before broad launch

## 16. Accessibility, localization, and usability

Target WCAG 2.2 AA for core flows. Support keyboard navigation, screen readers, clear focus, sufficient contrast, reduced motion, plain-language explanations, and accessible maps or non-map alternatives.

Design localization from the start. Do not concatenate translated strings. Store original language and translations distinctly. Moderation quality must be evaluated per launch language, not assumed from English performance.

## 16A. User experience and open-source design

### UX north star

The product should feel like a **public problem-solving workspace**, not a social network, petition platform, protest feed, debate forum, government complaint portal, or project-management tool with civic branding.

The central experience should be:

> **Understand the problem → establish what is known → identify who is affected → develop options → coordinate lawful action → verify the result**
> 

Every screen should help move a problem toward the next legitimate stage.

### Core UX principles

#### Deliberate, not addictive

- No infinite scroll
- No follower counts as status
- No trending outrage
- No streaks or engagement rewards
- No prominent raw like counts
- No notifications designed to manufacture urgency
- Clear stopping points and progress summaries

#### Structured, not restrictive

People should be able to write naturally while the interface helps separate:

- Observation
- Personal experience
- Factual claim
- Evidence
- Interpretation
- Root-cause hypothesis
- Proposed solution
- Risk or objection
- Implementation offer
- Outcome evidence

AI may help transform natural language into this structure, but the person must review and approve the transformation before publication.

#### Progress over discussion

Each problem should visibly show:

- Current lifecycle stage
- What has been established
- What remains uncertain or disputed
- Evidence needed
- Current proposals
- Decision authority
- Implementation status
- Blockers
- Next meaningful action
- Conditions required to declare resolution

#### Calm under conflict

The visual language should communicate seriousness without resembling a court, police system, or punitive government bureaucracy. Use neutral language, accessible typography, strong information hierarchy, evidence and uncertainty labels, context before contribution, reflection prompts for consequential actions, and clear disagreement and appeal mechanisms. Do not use red as the default color for disagreement; reserve urgent styling for genuine safety or deadline conditions.

### Initial information architecture

The initial release should evaluate five primary areas:

1. **Discover:** Public problems relevant to a place or topic, investigation-needed signals, problems requiring expertise or implementation support, and solved problems or reusable playbooks.
2. **Create:** Conversational intake, structural reframing, privacy and identifying-information review, evidence classification, geography and affected-scope review, and final publication preview.
3. **Problem workspace:** Overview, evidence, affected groups, causes and constraints, proposed solutions, decision record, implementation, verification, history, and appeals.
4. **Contributions:** Questions awaiting answers, evidence requests, review assignments, proposal feedback, and implementation opportunities.
5. **My activity:** Followed problems, drafts and revisions, contributions, assigned responsibilities, and notification, privacy, and account controls.

### Problem workspace

The problem workspace is the central product surface. It should contain:

- A header with the concise structural problem, geography, evidence tier, and lifecycle stage
- A status panel showing what is known, disputed, missing, and blocked
- A stewardship panel showing active stewards, represented capabilities, missing representation, pending invitations, conflicts, quorum rules, and problem-scoped responsibilities
- Controls for the initiator or authorized stewardship members to invite, accept, replace, resign, or request review of stewards under the applicable formation and consent rules
- A visible path from discovery through verification
- The specific question or action currently needed
- Contributions grouped by function rather than popularity
- Represented and missing affected-party perspectives
- Proposal comparison across benefits, risks, costs, legality, support, and objections
- A decision record stating who decided, under which authority, and why
- A claim and evidence ledger with supporting, contradicting, restricted, disputed, and verified records
- A source-backed event timeline with correction history
- An institution, asset, authority, and responsibility map
- A blocker ledger with deadlines, dependencies, responses, and lawful escalation routes
- An action and procedural tracker for complaints, inspections, public records, official proceedings, commitments, and follow-up
- An implementation tracker with owners, tasks, permissions, contractors, costs, blockers, evidence, and outcomes
- Parent, child, incident, dependency, recurrence, and reform relationships for systemic problems
- An audit history of consequential changes, moderation decisions, and appeals

The workspace must not default to an undifferentiated comment feed.

### Submission experience

The first submission flow should evaluate this sequence:

1. What public condition needs to change?
2. Who or what is affected?
3. Where does it occur?
4. What has been observed, and what remains uncertain?
5. What evidence or sources exist?
6. Privacy, safety, and publication review

Before final submission, the system should present:

- The proposed structural framing
- Statements removed or generalized for privacy
- The evidence tier
- Possible duplicate or related problems
- The selected visibility
- A plain-language explanation of what publication means
- External routes when the submission is an individual crisis or private case

The person submitting makes the final publication decision after review, subject to the platform's pre-publication safety and privacy gates.

### Open-source design contribution model

UI and UX are suitable early open-source contribution areas, but the project must establish product principles, workflow constraints, accessibility requirements, and review criteria before accepting independent screen designs. Community contributors may explore how approved behavior is expressed; interface popularity must not decide consequential policy.

Publish bounded design challenges rather than a vague request to design the whole platform. Suitable early contribution areas include:

- Accessible design tokens
- Navigation prototypes
- Problem-workspace layouts
- Evidence and uncertainty components
- Lifecycle visualizations
- Proposal-comparison patterns
- Mobile and low-bandwidth experiences
- Screen-reader interaction models
- Localization and right-to-left layouts
- Plain-language content
- Privacy-preserving location interfaces
- User-testing scripts
- WCAG audits
- Design-system documentation

Every design contribution should state:

- The user need addressed
- Relevant constitutional constraints
- Accessibility considerations
- Privacy and safety implications
- Mobile and low-bandwidth behavior
- Failure and empty states
- Evidence from testing or comparable systems

### Reserved product and governance decisions

The founder and approved governance process must determine:

- What becomes public
- Moderation thresholds
- Who participates in decisions
- How affected-party influence works
- Location verification
- Reputation consequences
- Identity requirements
- Appeal rights
- Evidence thresholds
- What qualifies as solved

Contributors may propose alternatives and experiments, but community preference, design contests, or visual popularity cannot settle these decisions.

### Open-source UX contribution readiness

Before inviting broad design contributions, maintain:

1. A concise UX constitution
2. Three primary user journeys
3. A basic information architecture
4. Low-fidelity wireframes for the problem workspace
5. Accessibility and privacy requirements
6. A minimal design-token foundation
7. A contribution template and review rubric
8. A public list of bounded design challenges
9. A decision log explaining accepted and rejected patterns
10. A reference prototype using fictional, non-sensitive civic problems

The recommended first community design challenge is:

> **Design a calm, accessible problem workspace that shows evidence, uncertainty, affected groups, proposals, implementation, and verified progress without becoming a social feed.**
> 

## 17. Observability and operations

Implement structured logs, metrics, traces, health checks, job visibility, and actionable alerts. Define service-level objectives for core flows before production.

Track product outcomes without optimizing for addiction:

- Eligible problems reaching active resolution
- Median time between stages
- Proposal-to-implementation rate
- Verified solution rate
- Reopened or failed resolutions
- Appeal rate and overturn rate
- Moderation precision, recall, calibration, and demographic or regional disparities
- Participation balance between core participants, visitors, and experts
- User-reported safety and usefulness
- Data deletion and incident-response performance
- Evidence provenance and correction quality
- Documented commitment completion and verified outcome rates
- Blocker age, response delay, and escalation effectiveness
- Responsibility-attribution accuracy and successful appeals
- Civic-report coverage, uncertainty, and equal-treatment audits

Do not use time spent, session count, posting volume, political conversion, candidate preference, or vote choice as primary success metrics. The platform must not measure success by changing votes toward a candidate or party.

## 18. Testing and quality gates

Maintain a layered test suite:

- Unit tests for domain rules and state transitions
- Property-based tests for permissions and lifecycle invariants
- Integration tests for database, jobs, storage, and AI adapters
- Contract tests for APIs and policy schemas
- End-to-end tests for each critical user journey
- Moderation evaluation sets, including multilingual and adversarial cases
- Accessibility checks
- Security scanning, dependency review, and authorization tests
- Migration, backup, restore, export, and deletion tests
- Load and resilience tests before broad launch
- Provenance, contradiction, correction, and tamper-evident timeline tests
- Responsibility-attribution and term-boundary tests
- Public-asset permission and unsafe-community-action tests
- Mass-participation, duplicate-report, brigading, and coordinated-evidence tests
- Political-neutrality, equal-treatment, candidate-correction, ranking-transparency, and voter-brief non-endorsement tests
- Public-facing AI PII detection, redaction, minimization, tokenization, output-leakage, and deletion tests
- Retrieval authorization, prompt-injection, tool-exfiltration, cross-tenant isolation, model memorization, and provider-fallback tests
- Synthetic multilingual PII fixtures covering names, addresses, identifiers, biometrics, documents, metadata, rare narratives, mixed-direction text, and indirect re-identification
- Stage-level context-budget, mandatory-rule coverage, chunk-boundary, cross-chunk dependency, aggregation, replay, and truncation-failure tests
- Prompt-prefix, compiled-policy, retrieval, and result-cache correctness, invalidation, isolation, deletion, side-channel, and stale-policy tests
- Multi-model routing, cheapest-qualified selection, privacy-constrained fallback, disagreement escalation, eval-threshold, drift, rollback, and cost-runaway tests

A feature is not done until acceptance criteria, tests, documentation, observability, privacy impact, failure behavior, and rollback are addressed.

## 19. Delivery phases

### Phase 0A: Public concept and founding contributor page

This is the first public build. Create a fast, accessible, multilingual-ready promotional and recruitment site before the full platform. It should explain:

- The public and structural problems the project addresses
- Why existing protest, complaint, petition, social-media, and governance channels are insufficient by themselves
- The complete problem-to-verified-outcome vision
- The constitutional principles and explicit non-goals
- The centralized reference-platform and parallel decentralization strategy
- The current project stage and what does not exist yet
- The `one hour, one problem, one step` contribution idea without promising that one hour alone solves a complex problem
- A call for founding engineers, designers, security and privacy specialists, researchers, legal and policy experts, accessibility reviewers, translators, documentation contributors, and infrastructure partners
- Concrete bounded contribution tasks rather than a generic request to `build everything`
- How decisions are made, how AI-assisted contributions are handled, and how contributor work is reviewed
- Links to the charter, specification, roadmap, governance, code of conduct, security policy, and repository
- A privacy-minimized expression-of-interest path with no public roster by default
- A transparent statement that the platform is not yet an emergency, legal, medical, government, or individual case-handling service

The page must not collect detailed civic problems, evidence, political profiles, precise locations, identity documents, or sensitive personal narratives before the protected platform intake exists. Use fictional examples and static verified external resources where useful.

Phase 0A acceptance criteria:

- The public can understand the mission, scope, current stage, safeguards, and ways to help.
- No language implies that the unfinished platform is already handling real cases.
- Every call to contribute maps to a maintained task, owner, review process, and expected outcome.
- The site meets the initial accessibility, privacy, security, analytics, localization, performance, and non-tracking requirements.
- Founding contributors can reach the repository and setup instructions without needing a paid AI tool.

### Phase 0B: Discovery and decisions

- Repository and infrastructure audit
- Stakeholder and user journey map
- Prioritized clarifying questions
- Scope and non-goals
- Launch jurisdiction and language decision
- Product requirements and threat model
- Architecture decision records
- Data classification and retention plan
- Founder-hosted reference deployment plan
- Public concept page, contributor recruitment flow, and founding role-page plan
- Gate X definition for moving from engineering formation to multidisciplinary and public participation
- Decentralization working-group charter and RFC process
- Stable global identifier, origin-node, signed-event, export-bundle, and protocol-version conventions
- Initial decentralization threat model and concentration map
- Milestone plan with estimates, risks, and separate reference-platform and community-track allocations

### Phase 1: Foundation

- Expo Router universal application for iOS, Android, tablet, and web
- gluestack-based project-owned design system with NativeWind, semantic tokens, RTL, accessibility, and responsive-layout tests
- NestJS modular-monolith service with framework-light domain modules
- PostgreSQL schema, migrations, transaction strategy, and typed persistence boundary
- Versioned OpenAPI contract and generated TypeScript client
- Development environment and continuous integration
- Authentication, authorization, audit events, configuration, secrets, and migrations
- Core observability, testing harness, seed data, object-storage abstraction, and deployment pipeline
- Native development builds, web preview deployments, deep-link configuration, and automated cross-platform smoke tests
- UUIDv7 or approved globally unique identifiers for all externally meaningful objects
- `originNodeId`, `protocolVersion`, authoritative-location, and replica-ready metadata conventions
- Event-oriented consequential audit records with future signing and federation compatibility
- Provider-independent storage, identity, signing, search, notification, and background-job boundaries
- Signed versioned public-problem export and import prototype
- Initial protocol schemas, conformance fixtures, and decentralization RFC repository

### Phase 2: Safe public problem intake

- Non-identifying structural problem submission
- Evidence tiers and `investigation_needed` workflow
- Geography, affected-population, and jurisdiction scoping
- Role-alias and privacy controls
- Duplicate, related-case, and systemic-hypothesis detection
- Moderator and distributed-review console
- Explanations, revision, withdrawal, and appeals

### Phase 3: Structured resolution

- Staged case workspace
- Typed contributions and evidence
- Proposals, comparisons, and decision records
- Participant scopes and rate limits
- Notifications and follow controls

### Phase 4: Implementation and verification

- Plans, tasks, owners, blockers, metrics, and updates
- Verification evidence and terminal transitions
- Resolution summaries and redacted playbooks

### Phase 5: Grounding and governance

- Moderation feedback
- Context-masked review tasks
- Reviewer quality and disagreement handling
- Policy versioning, experiments, approvals, and rollback

### Phase 6: Hardening and pilot

- Accessibility and localization audit
- Adversarial moderation and abuse testing
- Security review and incident drills
- Backup and restore verification
- Pilot analytics, feedback, and launch checklist

### Phase 7: Systemic accountability and mass participation

Begin only after the bounded workflow is stable.

- Parent and child problem graph
- Claim-specific evidence ledger and restricted evidence references
- Tamper-evident event timeline and correction workflow
- Institution, asset, authority, responsibility, and blocker maps
- Procedural action, commitment, deadline, and escalation tracking
- Mass-contribution queues, clustering, translation, and anti-coordination controls
- Federated parent, incident, and capability stewardship

### Phase 8: Election accountability

Begin only after jurisdiction enablement, legal review, political-neutrality evaluation, and independent oversight are operational.

- Term-bound institutional accountability
- Verified candidate and party records from authoritative sources
- Structured proposal and commitment lifecycle
- Transparent multidimensional civic reports
- Neutral jurisdiction-specific voter briefs
- Equal correction, response, and appeal mechanisms
- Election-period audits, change controls, and incident procedures

### Gate X: Open multidisciplinary participation

Engineers must not open the platform to unrestricted public problem intake merely because the interface looks complete. Gate X is reached only when the founder approves evidence that:

- The bounded vertical slice works from intake through a legitimate terminal state.
- Authentication, authorization, privacy gates, PII handling, moderation, appeals, audit, deletion, backup, restore, incident response, and observability have passed their quality gates.
- The launch jurisdiction and language have qualified policy coverage and human-review capacity.
- Accessibility and low-bandwidth core flows are usable.
- Fictional and controlled pilot data demonstrate the lifecycle without exposing real private cases.
- Contribution governance, AI-assisted merge safeguards, maintainer capacity, code ownership, security disclosure, and release processes are operational.
- Public communications explain limitations, risk, authority boundaries, and emergency exclusions.
- A bounded pilot problem, steward group, institutional route, and verification plan have been approved.

At Gate X, create and publish role-specific participation pages for:

- Residents and affected community members
- Problem initiators and local stewards
- Engineers and maintainers
- Designers and accessibility contributors
- Translators and localizers
- Researchers and journalists
- Legal, policy, rights, safety, and governance experts
- Engineers, scientists, planners, and other domain experts
- Public institutions and implementation partners
- Moderators and evidence reviewers
- Independent auditors and security researchers
- Civic-node, relay, witness, storage, and infrastructure operators as those capabilities become approved
- In-kind supporters, infrastructure contributors, and external public-benefit organizations under the independence rules

Each role page must explain what the role can do now, prerequisites, time commitment options, privacy and conflict rules, prohibited activity, available tasks, review and escalation, and how contribution affects decisions. A role page does not grant authority merely by allowing self-selection.

Open participation progressively:

1. Founding engineering, product, design, documentation, security, and privacy contributors
2. Controlled multidisciplinary reviewers using fictional or public material
3. Invited pilot stewards, domain experts, institutions, and implementation partners
4. Bounded public problem participation in the approved jurisdiction
5. Broader jurisdictions, roles, and node operation only after separate readiness gates

### Parallel decentralization workstream

This workstream begins in Phase 0 and proceeds alongside the numbered product phases without becoming a production dependency.

#### Milestone D0: Structural portability

- Global identifiers and origin metadata
- Framework-light domain schemas
- Versioned protocol vocabulary
- Signed export and import bundles
- Storage, identity, and signing abstractions
- Decentralization charter, threat model, and RFC template

#### Milestone D1: Trusted federation prototype

Begin after the first vertical slice is coherent.

- Two or three independently operated test civic nodes
- `.well-known` bootstrap and signed node manifests
- Signed public problem-event exchange
- Public-content replication
- Protocol and policy compatibility checks
- Key rotation, replay protection, and quarantine simulation

#### Milestone D2: Portability and recovery

- Problem migration between test nodes
- Replica discovery and failover experiments
- Transparency checkpoints and witness nodes
- Compromised-node and signing-key recovery drills
- Independent implementation conformance test
- Public policy-pack synchronization

#### Milestone D3: Encrypted storage experiment

Use fictional and non-sensitive data only.

- Client or custodian encryption
- Authenticated ciphertext
- Erasure coding and independent fragment placement
- Capability-based access
- Availability proofs, repair, expiry, and deletion experiments
- Metadata-leakage and hostile-node analysis

#### Milestone D4: Restricted-data research pilot

Requires independent cryptographic and security review, legal and jurisdiction analysis, recovery and deletion evidence, abuse-storage controls, and explicit founder approval. Production restricted data remains excluded until every gate passes.

#### Milestone D5: Open personal-node participation

Begin with public replicas, relays, witnesses, protocol testers, public-data workers, encrypted-fragment storage, and the guided community-node sandbox. Add one generic low-cost deployment bundle, provider adapters, signed manifests, maturity labels, conformance checks, operator recovery, and migration. Expand permissions only after measured reliability, safety, legal, privacy, moderation, continuity, and abuse-resistance evidence.

Each decentralization milestone must produce a working prototype or testable specification, threat model, conformance evidence, known limitations, and a go, revise, pause, or reject decision. Experimental work must be clearly labeled and isolated from production credentials and data.

Each phase must end with a demonstrable product increment, evidence against acceptance criteria, open risks, and a clear go or no-go decision.

## 20. Required project artifacts

Maintain these as version-controlled documents or equivalent living records:

- `README` with local setup and system overview
- Product requirements document
- Clarifying-question log
- Assumptions and risk registers
- Architecture overview and diagrams
- Architecture decision records, including the Expo, gluestack, NativeWind, NestJS, persistence-layer, and API-contract decisions
- Universal frontend compatibility matrix covering iOS, Android, mobile web, desktop web, LTR, RTL, accessibility, and supported scripts
- Domain glossary and state machines
- Data model and data classification
- Threat model and privacy impact assessment
- Public-facing AI data-flow map, trust-boundary diagram, data protection impact assessment, model and provider register, retention and deletion matrix, and hosted-provider approval checklist
- AI privacy-gateway specification, redaction and re-identification evaluation plan, synthetic-PII corpus, safe-logging standard, and provider incident runbooks
- Inference-stage DAG, context budgets, typed stage schemas, coverage manifest, policy-retrieval design, and deterministic aggregation specification
- Prompt and policy cache architecture, cache-key standard, invalidation matrix, privacy namespaces, deletion behavior, and cache observability plan
- Multi-model registry, routing policy, escalation ladder, task-and-risk evaluation suites, quality thresholds, model approval lifecycle, and cost-per-accepted-result dashboard
- Moderation policy schema and evaluation plan
- API contract
- Test strategy and quality dashboard
- Runbooks for deploy, rollback, incident response, backup, restore, and data deletion
- Changelog and release notes
- Contributor guide, code of conduct, security policy, and open-source license decision
- AI-assisted contribution policy, disclosure template, reviewer checklist, risk-tiered merge gates, autonomous-agent rules, and affordable-tool setup guide
- Public concept-page brief, factual claims register, recruitment content, contribution calls, launch checklist, and privacy-minimized interest form
- Gate X readiness standard and role-page templates for technical, civic, expert, institutional, review, infrastructure, and funding participation
- One-hour contribution catalog with role, risk, prerequisites, review, expected outcome, and stopping point
- Non-monetary operating model, free-access guarantee, in-kind support registry, host-recognition standard, support-independence rules, rare external cost-request procedure, and no-custody/no-payments policy
- Claim, provenance, evidence-safety, contradiction, correction, and restricted-reference specifications
- Problem-graph, authority, responsibility, blocker, and commitment schemas
- Public-infrastructure permission and community-implementation safety policy
- Political-neutrality, candidate-identity, election-readiness, civic-report, and voter-brief policies before those features are enabled
- Centralized-reference-deployment and parallel-decentralization architecture decision
- Decentralization working-group charter, governance rules, and RFC template
- Node-role taxonomy and signed node-manifest specification
- Community-node deployment wizard, maturity model, operator and recovery model, low-cost reference profile, provider-adapter contract, capacity benchmark, external cost-need UX, and migration runbook
- Global identifier, origin, authoritative-location, replica, and signed-event specifications
- Public problem export, import, migration, and portability specification
- Federation discovery, event exchange, conflict, correction, withdrawal, deletion, and retention RFCs
- Distributed-storage threat model, capability model, fragment-placement model, repair protocol, metadata-leakage analysis, and abuse-storage policy
- Node quarantine, revocation, key rotation, revalidation, and restoration procedures
- Protocol conformance suite and independent-node compatibility matrix
- Decentralization concentration register covering hosting, DNS, identity, custody, signing, protocol control, distribution, moderation, governance, funding, domain control, and recovery authority
- Separate production and experimental-data handling rules

## 20A. Launch sequence, continuous participation, and nonprofit hosting

### Build and participation sequence

The platform should grow through a deliberate sequence:

1. **Explain:** Publish the public concept and founding contributor page.
2. **Assemble:** Recruit and organize the founding engineering, product, design, safety, privacy, legal, documentation, localization, and governance contributors.
3. **Build:** Implement the centralized reference platform and the first protected vertical slice while the decentralization working group develops bounded protocols and experiments.
4. **Prove:** Validate the workflow with fictional data and a controlled pilot.
5. **Open roles:** At Gate X, publish role-specific pages and invite bounded multidisciplinary participation.
6. **Open problems:** Allow non-engineers and affected communities to work through approved public problems, evidence, proposals, implementation, and verification.
7. **Learn:** Convert observed friction, safety issues, outcomes, and unmet needs into governed product, policy, documentation, and protocol improvements.
8. **Repeat:** Continue the problem-solving and platform-improvement loops indefinitely without treating activity itself as success.

The engineers build and maintain the enabling infrastructure. Non-engineers, affected communities, experts, institutions, and implementers use the platform to understand and solve public problems. Contributions from real problem-solving reveal product needs, but users must not become unconsenting software testers. Product changes still require evidence, review, release controls, and constitutional compatibility.

### One hour, one problem, one step

The participation invitation may use a message such as:

> **Give one hour. Move one real problem one responsible step forward.**
> 

A supporting public phrase may be:

> **Change the world one problem at a time—locally, together, and with evidence.**
> 

This is an invitation, not a promise or moral obligation. Complex public problems may require years, professional authority, public institutions, funding, and sustained stewardship. The product should help each person find a bounded, honest one-hour task with a stopping point, such as:

- Clarify one claim
- Locate one authoritative source
- Translate one approved passage
- Check one accessibility flow
- Map one institutional responsibility
- Review one piece of public evidence
- Improve one test or document
- Identify one missing affected perspective
- Compare one solution risk
- Verify one implementation update
- Document one reusable lesson

Do not rank people by hours, manufacture streaks, shame inactivity, or imply that volunteer time replaces public obligations or paid professional work. Recognize useful outcomes, care, reliability, and documented contribution without turning civic work into engagement gamification.

### Perpetual dual flywheel

The project has two continuous, connected loops:

**Public problem-solving loop**

> Problem → evidence → causes and constraints → proposals → decision → implementation → verification → playbook or accountable unresolved record
> 

**Platform-improvement loop**

> Observed need → bounded issue or RFC → design and risk review → implementation → tests and evaluation → controlled release → measured outcome → revision
> 

A public problem does not automatically authorize a software change, and a popular feature request does not override the constitution. Engineers should convert platform feedback into scoped, reviewable work while preserving the integrity of the civic record.

### Completely non-monetary platform

**Revised founder decision:** The platform itself is non-monetary by design. Withdraw the earlier Wikimedia-style fundraising approach. The product, protocol, reference implementation, federation, governance, reputation, and ordinary operation must not collect, hold, transfer, distribute, account for, intermediate, or optimize money.

The platform must not provide:

- Subscriptions, usage fees, paywalls, paid tiers, or pay-per-action features
- Donations, crowdfunding, fundraising campaigns, membership dues, or tip jars
- Wallets, balances, tokens, coins, credits, escrow, payment processing, or financial accounts
- Bounties, cash prizes, paid reputation, referral payments, or revenue sharing
- Advertising sales, sponsorship auctions, paid placement, lead generation, or affiliate links
- Node reimbursement, contributor compensation, contractor payment, grants administration, or procurement payment
- Financial profiles, donor rankings, contribution amounts, or money-based governance weight

Each person or organization choosing to host, relay, mirror, translate, maintain, review, or otherwise support the system ordinarily contributes that capability in kind and bears its own cost outside the platform. The platform does not promise reimbursement and should be architected so useful participation can begin at small scale with ordinary hardware, free software, shared public infrastructure, or voluntarily donated services.

This rule concerns the platform's product and coordination boundary. It does not claim that electricity, hardware, connectivity, employment, legal services, or real-world implementation are costless. Those economic relationships remain outside the platform and do not create platform privileges.

Ordinary people must be able to read, submit, participate in, and follow eligible public problems without payment, targeted advertising, sale of personal data, political sponsorship, or financial profiling.

### Host and infrastructure recognition

The platform may display a standardized acknowledgment such as:

> **Infrastructure for this node is provided by IBM.**
> 

This is recognition, not an advertisement auction. Acknowledgment may identify the verified operator or sponsor, infrastructure category, supported region, support period, public contribution, and a neutral link to an operator information page.

Host recognition must:

- Be factual, proportionate, and visually subordinate to the civic workflow
- Use the same template and eligibility rules for companies, governments, universities, nonprofits, cooperatives, communities, and individuals
- Avoid behavioral targeting, tracking pixels, cross-site profiling, personalized creative, lead generation, and attention optimization
- Exclude political campaign promotion and other prohibited sponsor categories
- Disclose financial, infrastructure, governance, and conflict relationships
- Never alter problem, proposal, candidate, evidence, search, moderation, or notification prominence
- Never imply that the platform endorses the host's products, policies, or conduct
- Never give the host privileged access to user data, private evidence, model prompts, moderation records, analytics, or identity
- Remain removable or correctable when support ends, claims become inaccurate, or the operator violates policy

Recognition should be tied to a verifiable contribution rather than purchased prestige. Avoid animated placements, interruptive banners, repeated impressions, sponsored civic content, comparative marketing claims, and auction-based prominence.

### In-kind node sustainability

Approved node operators sustain their own participation through voluntarily contributed capabilities such as:

- Compute, storage, bandwidth, power, and hardware
- Engineering, security, accessibility, localization, moderation, documentation, and operations time
- Facilities, connectivity, mirrors, relays, backups, testing devices, and incident support
- University, library, public-interest, cooperative, community, company, or individual infrastructure
- Shared open-source software, operational playbooks, and training

The platform records the capability contributed, not its monetary value. Do not convert in-kind support into a currency-equivalent score, tax estimate, token, tradable credit, procurement claim, or governance weight.

Every node should disclose its operator, contribution categories, service period, affected regions, data jurisdiction, material dependencies, conflicts, uptime responsibilities, and recognition placements. It must not sell user data, run targeted advertisements, charge to influence civic visibility, place essential rights behind payment, or convert infrastructure contribution into governance authority.

### Rare external cost-request procedure

A genuine shared dependency may occasionally require an unavoidable external payment, such as renewing a domain or paying a hosting vendor when no in-kind replacement is available. The platform must not collect or route that money.

An authorized steward may publish a time-bounded **external cost need** containing:

- The exact public capability at risk
- Why an in-kind or free alternative is currently insufficient
- The named external vendor or competent recipient
- The exact requested service, public price or quotation, deadline, and minimum necessary amount
- Alternative providers or migration options considered
- Conflicts of interest
- A direct method for an external supporter to pay the vendor or recipient outside the platform
- A way to record non-financial proof that the capability was restored
- Automatic expiry when fulfilled, replaced, or no longer needed

The platform must not receive funds, store payment credentials, show a running balance, pool contributors, issue receipts, calculate tax treatment, guarantee the recipient, mediate refunds, or become a crowdfunding intermediary. A cost need is an informational exception and should be rare, visually neutral, non-personalized, non-tracking, and excluded from civic rankings and notifications unless operational continuity requires notice.

Where a trusted nonprofit, NGO, university, public institution, fiscal host, or community organization already provides a lawful external payment or grant service, the platform may list that verified external route. The external organization remains responsible for financial compliance, due diligence, receipts, disputes, and disbursement.

### No centralized fundraising

The platform will not run Wikimedia-style fundraising campaigns, donation banners, centralized appeals, local fundraising tools, compulsory dues, or universal infrastructure fees. There is no platform treasury, donation pool, financial membership, or donor class.

Operational resilience must instead come from low-cost architecture, many independent in-kind contributors, replaceable providers, public deployment documentation, data portability, signed releases, mirrors, federation, and the ability for another operator to take over a public capability.

### Supporter independence

Hosting, infrastructure, labor, expertise, visibility, or other in-kind contribution must not purchase or create:

- Governance votes or constitutional amendment power
- Moderation or appeal authority
- Protocol exceptions
- Access to restricted data
- Candidate, party, institution, proposal, problem, or source prominence
- Preferential AI routing or technical procurement without an open decision
- Suppression of criticism or accountability records
- Exclusive ownership of community-created public knowledge
- A higher support score merely because the contributor is large or famous

Maintain support-acceptance, refusal, conflict, related-party, naming, recognition, operator-exit, and concentration policies. A dominant or irreplaceable contribution should trigger enhanced disclosure, independence review, replacement planning, and technical work to reduce dependency.

### Public support ledger and resilience

Maintain a non-financial public support ledger describing:

- Who or which organization contributes
- Verified support categories
- Nodes, regions, languages, or capabilities supported
- Service period and current status
- Relevant technical commitments and dependencies
- Conflicts and governance relationships
- Evidence or attestation sufficient to verify the contribution
- Historical contribution after support ends

Do not record private volunteer activity by default. Individuals may choose a public name, organization, pseudonym, or anonymous acknowledgment consistent with security and privacy rules.

Show ecosystem health through coverage and resilience rather than monetary totals: independent operators, geographic and provider diversity, available capacity bands, uptime, language coverage, maintainer coverage, replacement readiness, and concentration risk.

Plan for the failure or withdrawal of any major host or supporter. Public portability, backups, signed releases, independent maintainers, multiple hosting relationships, mirrors, and federation should make support replaceable and prevent any contributor from holding the mission hostage.

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

Build one high-quality application that demonstrates how the constitution and protocol work. Do not delay the first useful product for federation. Begin with a modular monolith and preserve clean domain and protocol boundaries that permit later interoperability and federation.

### Two growth engines

The project must develop product adoption and contributor adoption together.

#### Product adoption loop

> Real problem → structured collaboration → implementation → verified result → reusable playbook → new community adoption
> 

People and institutions should adopt the platform because it helps produce accountable progress and verified outcomes, not because it maximizes activity.

#### Contributor adoption loop

> Clear task → quick setup → constructive review → visible impact → increased responsibility → project stewardship
> 

A repository without real users risks becoming a hobby project. A product without independent maintainers remains founder-dependent.

### Progressive governance

Governance should distribute authority as demonstrated capability and community maturity grow.

1. **Founder stewardship:** The founder retains responsibility for scope, constitutional interpretation, safety, and release direction. Consequential decisions and reasons are documented publicly where safe.
2. **Bounded maintainership:** Reliable contributors gain ownership of defined areas such as accessibility, workflow, moderation tooling, protocol schemas, localization, security, or documentation.
3. **Maintainer council:** Multiple independent maintainers approve releases and major technical changes. No single organization should control every critical subsystem.
4. **Independent governance:** Once real users, maintainers, deployments, and funding relationships exist, evaluate transferring trademarks, protocol stewardship, and constitutional governance to an appropriate independent nonprofit or foundation structure.

Do not create a foundation before there is a functioning community to govern. Do not present ambiguous or founder-controlled processes as decentralized.

### Decision process

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

Before broad public promotion, maintain at least:

- `README.md`
- `CHARTER.md`
- `ROADMAP.md`
- `GOVERNANCE.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- An approved license
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

### Contribution ladder

Use a visible contribution ladder rather than treating everyone as either an outsider or a maintainer:

1. **Observer:** Follows development and discussions.
2. **Contributor:** Submits documentation, design, tests, translations, research, policy analysis, or code.
3. **Reviewer:** Reviews work within a demonstrated area of competence.
4. **Maintainer:** Owns a bounded subsystem or project area.
5. **Steward:** Participates in cross-project coordination and governance.
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

### Licensing strategy

License selection is a founder decision with legal review because it affects adoption, interoperability, proprietary forks, and the long-term commons.

Evaluate at least:

- **Apache 2.0:** Familiar to companies and public institutions, supportive of broad implementation, and includes an explicit patent grant, but permits proprietary hosted derivatives.
- **AGPL:** Encourages hosted modifications to remain open, but may reduce adoption by some organizations and governments.
- **Layered licensing:** For example, an Apache-licensed protocol and client libraries, an AGPL reference server, and an appropriate Creative Commons license for documentation and constitutional material. This may balance adoption and commons protection but increases complexity.

Do not finalize licensing without qualified legal advice and a documented compatibility analysis.

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

Track:

- Problems progressing between stages
- Proposal-to-implementation rate
- Verified resolution rate
- Time to meaningful next action
- Reopened or failed resolutions
- Appeal and overturn rates
- Representation of affected groups

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

### Recommended first-year sequence

#### Months 0 to 2: Make the project legible

- Publish the concise charter
- Select the pilot problem, jurisdiction, and language
- Resolve licensing
- Establish governance and contribution documents
- Create low-fidelity UX prototypes
- Define the core domain model and protocol vocabulary
- Publish the initial threat model
- Establish the repository, tests, and continuous integration

#### Months 3 to 5: Build the vertical slice

- Safe problem intake
- Evidence tiers
- Problem workspace
- Typed contributions
- Proposals and decision records
- Implementation tracking
- Verification
- Moderation and appeals
- Fictional example cases
- Accessibility testing

#### Months 6 to 8: Run a controlled pilot

- Invite a small real community
- Observe and support the complete journey
- Record failures, confusion, and unintended behavior
- Measure whether the workflow produces meaningful action
- Publish transparent pilot findings
- Correct the workflow before expanding scope

#### Months 9 to 12: Grow maintainership

- Onboard independent maintainers
- Formalize justified working groups
- Publish protocol version `0.1`
- Release contributor-focused development resources
- Support a second controlled deployment
- Begin interoperability experiments
- Establish a maintainer council only if the contributor base supports it

### Strategic growth rule

> **Keep the mission universal, but make every implementation step narrow and verifiable.**
> 

The intended growth path is:

> One constitutional core → one excellent workflow → one verified resolution → several independent contributors → several controlled deployments → an open protocol → a durable federation
> 

This sequence should guide roadmap, funding, contributor recruitment, public communication, and architecture. The project should become infrastructure through demonstrated trust and utility rather than attempting to manufacture scale before it can support it.

## 21. Clarifying questions the agent must resolve

Ask these in prioritized batches, not as one overwhelming questionnaire.

### Critical before architecture

1. What repository, code, infrastructure, budget, and deployment accounts already exist?
2. Which country or jurisdiction and which language will host the first pilot?
3. Who are the first users, and what specific category of problem will the pilot support?
4. Is the first release public, invitation-only, organization-based, or limited to a small geography?
5. Which public problem records are open platform-wide, jurisdiction-limited, investigation-limited, moderator-only, or transient unpublished drafts?
6. How should core participant location be verified without creating unacceptable privacy risk?
7. Which legal and safety experts are available to approve policy packs and escalation procedures?
8. What actions require human moderation before publication?
9. What is the founder's preferred hosting region, operating budget, and open-source license?
10. What production actions may the agent perform, and which always require approval?

### Critical before workflow implementation

- Exact eligibility and ineligibility criteria
- Emergency and imminent-harm routing by launch location
- Allowed problem categories and explicit exclusions
- Participation radius and visitor limitations
- Expert verification and expiry
- Decision and legitimacy model for selecting solutions
- Meaning and evidence threshold for `solved`
- Appeal stages and reviewer independence
- Content retention, account deletion, and public-record expectations
- Whether pseudonyms are allowed and when identity disclosure is required

### Important before pilot

- Brand, domain, visual identity, and tone
- Notification channels and consent model
- Analytics restrictions
- Service-level objectives and support model
- Pilot size, success thresholds, duration, and exit criteria
- Community moderation staffing and escalation hours
- Policy transparency and public audit expectations

### Critical before systemic or election accountability

- Parent and child problem-linking rules and aggregation thresholds
- Evidence categories that remain external or restricted
- Source, provenance, contradiction, correction, and retention policy
- Institutional responsibility and term-attribution standard
- Community-controlled, public, hybrid, and temporary implementation authority rules
- Public asset, contractor, procurement, funding, and safety policy
- Criteria and governance for prominent public-problem views
- Whether and where verified public candidates and officeholders may be named
- Election-law, defamation, data-protection, and political-neutrality review capacity
- Candidate response, correction, appeal, and equal-treatment guarantees
- Voter-brief boundaries and prohibition on platform endorsements or targeted persuasion
- Conditions under which the election layer must remain disabled

## 22. Definition of an agent-ready plan

Before substantial implementation, present:

- Confirmed goals and non-goals
- Open questions with recommended defaults
- User journeys and acceptance criteria
- Domain model and state diagrams
- Architecture with alternatives and trade-offs
- Threat model and privacy boundaries
- Moderation architecture and evaluation approach
- Milestones, dependencies, estimated effort, and top risks
- First vertical slice with exact tasks and validation steps

Implementation may begin on reversible foundations while founder decisions remain open, but product behavior dependent on those decisions must stay behind configuration or feature flags.

## 23. Definition of pilot-ready

The platform is pilot-ready only when:

- One complete user journey works in a production-like environment.
- Authorization and lifecycle invariants have automated coverage.
- High-risk moderation paths have human escalation and appeals.
- Public and private location data are separated and tested.
- Terms, privacy disclosures, consent, retention, and deletion behavior are approved for the pilot.
- Monitoring, alerting, backup, restore, rollback, and incident procedures have been exercised.
- Accessibility and launch-language moderation have been evaluated.
- Seeded abuse scenarios and adversarial tests meet agreed thresholds.
- Known limitations are disclosed and no critical risks remain unowned.
- The founder explicitly approves the pilot release.

## 24. First instruction to the long-running agent

<aside>
▶️

Begin with Phase 0A and Phase 0B. Build the public concept and founding contributor page first while inspecting everything available. Do not reopen the approved Expo, gluestack, NativeWind, NestJS, PostgreSQL, centralized-reference, and parallel-decentralization baselines unless evidence reveals a material blocker. Return a concise discovery report, a prioritized first batch of no more than ten clarifying questions, recommended defaults, a proposed first vertical slice, and two coordinated work plans: the founder-hosted reference-platform track and the bounded community decentralization track. The production track receives priority. Set up global identifiers, origin and protocol metadata, event-oriented consequential history, provider abstractions, signed export and import, protocol schemas, the decentralization RFC process, and non-production conformance fixtures from the beginning. Do not place production sensitive data into experimental federation, peer-to-peer storage, or compute systems. Do not deploy publicly or make irreversible decisions. After answers are received, update the living plan and continue through the approved phases without waiting for permission on ordinary reversible engineering work.

</aside>

---

## 25. Constitutional foundations, working draft

<aside>
🏛️

This section converts the founder's stated intent into constitutional doctrine. Each article includes the inferred founder position and an adversarial refinement designed to preserve that intent under ambiguity, scale, conflict, and attempted capture. These are working interpretations until the remaining constitutional questions are resolved.

</aside>

### Article 1: Supreme purpose

> The platform exists to help the public identify, understand, and resolve civic and structural problems through transparent participatory problem-solving, collective intelligence, lawful coordination, implementation tracking, and verified learning.
> 

Its unit of work is the public problem, not the individual client. It must optimize for verified public resolution rather than personalized service, content consumption, attention, posting, or discussion volume.

### Article 2: Individual experience as public signal

A single person's experience may reveal a genuine public problem. It may initiate a systemic hypothesis, support an evidence tier, attract investigation, or corroborate a recurring pattern. The platform must preserve the significance of minority and first-reported problems without converting itself into an individual case-management service.

> Every good-faith public problem receives procedural dignity. Evidence strength affects confidence; severity and rights affect importance; popularity affects neither truth nor moral worth.
> 

### Article 3: Public problem taxonomy

The platform classifies public problems, including:

- Neighborhood or local civic problem
- Municipal or regional problem
- State, national, or international systemic problem
- Institutional or organizational failure
- Public infrastructure or service problem
- Public health, environmental, economic, educational, or safety pattern
- Legal, regulatory, policy, or constitutional reform problem
- Preparation and resilience problem
- Platform governance problem
- Investigation-needed signal that may reveal a public problem

Personal, medical, legal, therapeutic, commercial, and emergency requests are out of scope as collaborative cases. They may receive a transient external route, and their non-identifying structural signal may be submitted separately as a public problem.

### Article 4: Participatory problem-solving and collective intelligence

**Inferred founder position**

Everyone may contribute relevant experience, information, evidence, analysis, and possible solutions. Sensitive subjects, including religion and politics, may be discussed when discussion remains civil, relevant, lawful, and solution-focused.

**Adversarial refinement**

Participation does not make all claims equally reliable or give all participants equal decision authority. The platform must distinguish:

- Lived experience and affected-party testimony
- Local contextual knowledge
- Factual claims and their supporting evidence
- Professional or technical expertise
- Legal authority
- Implementation responsibility
- Public preference
- Rights that cannot be removed by popularity

Community support is evidence of legitimacy and willingness to act. It is not sufficient evidence of truth, safety, legality, fairness, feasibility, or effectiveness.

### Article 5: Problem framing is contestable

**Inferred founder position**

The submitter's experience is sufficient to open a case, and all materially different affected groups should be able to participate.

**Adversarial refinement**

> A submitter may define the initial problem but does not permanently define reality, causation, affected populations, or the solution space.
> 

The platform should separate observations, interpretations, desired outcomes, causal hypotheses, and proposed solutions. Participants may challenge the framing with reasons and evidence. Materially different but valid formulations may coexist or become linked cases.

### Article 6: Resolution first, with immediate and structural horizons

**Founder position**

The platform always optimizes for lawful resolution. When a fast solution addresses immediate harm but leaves a structural cause intact, the current case may be resolved while a linked problem is created to address the root cause. Solving symptoms and solving root causes are both important.

**Adversarial refinement**

> The platform minimizes unresolved harm. It must address immediate needs without allowing short-term success to conceal material structural causes, recurrence risks, or transferred harms.
> 

The platform must not maximize the number of problems. A linked problem should be created or proposed only when evidence indicates a materially distinct cause, consequence, population, authority, jurisdiction, or intervention. AI-generated causal claims remain hypotheses until supported.

### Article 7: Every proposal is a hypothesis

**Founder position**

Every solution is fundamentally an option and every implementation is an experiment.

**Adversarial refinement**

The system should distinguish:

- **Option:** An idea available for consideration
- **Proposal:** A structured hypothesis with assumptions and expected outcomes
- **Experiment:** A bounded implementation intended to produce evidence
- **Promising intervention:** An experiment with positive but incomplete evidence
- **Verified solution:** An intervention supported by agreed outcome evidence
- **Solved problem:** A case whose success criteria have been met without concealing material unresolved harm

Confidence should grow through evidence, implementation, observation, and verification, not popularity or AI confidence.

### Article 8: Acceptable intervention standard

**Inferred founder position**

Solutions should be lawful, safe, non-malicious, nonviolent, evidence-informed, transparent, respectful of dignity, and protective of everyone. A problem must not be called solved by creating another problem.

**Adversarial refinement**

Absolute zero-harm guarantees are usually impossible. The enforceable doctrine should be:

> The platform must not classify a problem as solved by concealing, externalizing, or unjustly transferring material harm to another person, community, generation, or ecosystem.
> 

Before implementation, a proposal must disclose expected benefits, uncertainty, risks, affected parties, distribution of costs, alternatives, success criteria, monitoring, mitigation, stopping conditions, and rollback options. The scale and risk of an experiment must be proportionate to the problem and strength of evidence. High-uncertainty interventions should be limited and reversible where possible. Irreversible interventions require stronger evidence, authority, consent, and review.

### Article 9: Resolution status is multidimensional

A case should not rely on a single ambiguous `solved` label. It should separately record:

- Immediate harm status
- Requested outcome status
- Implementation status
- Evidence strength
- Outcome verification
- Root-cause status
- Recurrence risk
- Residual and transferred harms
- Linked structural problems
- Unexpected consequences

The platform may close an immediate case while keeping structural follow-up visible and active.

### Article 10: Current law and legal reform are separate tracks

**Founder position**

A current solution must work within applicable law. If the law causes or prevents resolution of the problem, a linked problem should be created to examine and pursue legal change through discussion, evidence, analysis, and the appropriate path from public concern to policy or law.

**Adversarial refinement**

The platform should distinguish:

- What current law permits or requires
- Disputed legal interpretation
- Constitutional or judicial challenge
- Policy reform
- Legislative reform
- Moral or rights-based criticism
- Operational facilitation of unlawful conduct

The platform may support lawful challenge, litigation, advocacy, consultation, petitions, elections, and peaceful democratic participation. Legal-reform workflows must be jurisdiction-specific, source-backed, versioned, and reviewed. The platform must never present an LLM's legal interpretation as definitive legal advice.

### Article 11: Geography is not the only form of impact

**Founder position**

The submitter proposes an affected area. AI and the community help determine whether participation should remain local or expand regionally, nationally, or globally. A globally consequential problem may permit global participation.

**Adversarial refinement**

Every case should distinguish:

- Subject scope
- Direct-impact scope
- Indirect-impact scope
- Geographic scope
- Legal jurisdiction
- Implementation-authority scope
- Visibility scope
- Contribution scope
- Decision-participation scope

The submitter, majority, or LLM must not be able to manipulate the boundary to manufacture a preferred outcome. Scope decisions must be reasoned, versioned, contestable, appealable, and revisable as evidence changes.

### Article 12: Affected people

Affected people include those who experience material direct or indirect consequences, including people outside the original geography, absent stakeholders, vulnerable populations, future generations, and ecological interests where relevant.

The platform should account for:

- Severity and concentration of impact
- Directness of impact
- Duration and reversibility
- Ability to avoid the impact
- Vulnerability and existing power
- Responsibility for implementation
- Relevant expertise and local knowledge

Open contribution may be broad, but decision influence should reflect impact, rights, evidence, expertise, and implementation responsibility rather than raw participant count.

### Article 13: Protection against participation gerrymandering

The platform must not allow a submitter, administrator, majority, government, funder, or LLM to selectively include or exclude populations in order to create a desired result. Materially affected but absent groups must be actively identified. Solution selection may be delayed when a materially affected population has not been represented, except for a temporary intervention required to prevent urgent harm.

### Article 14: Minority and nonparticipant protection

**Inferred founder position**

A solution should protect everyone, not only the majority or active participants. It must not solve one group's problem by creating or hiding another group's problem.

**Adversarial refinement**

> Numerical support alone cannot validate a solution. The platform must examine fundamental rights, necessity, severity and distribution of harm, consent, alternatives, proportionality, mitigation, and effects on people who did not or could not participate.
> 

A smaller or less powerful group cannot be treated as expendable because a larger group benefits. Residual material harms must remain visible, owned, mitigated, monitored, and, when distinct, tracked as linked problems.

### Article 15: AI is an instrument, not a sovereign

**Inferred founder position**

AI should reduce the burden on users by converting natural speech into structured cases, detecting case type, finding prior solutions, identifying experts and affected areas, checking legality and safety, moderating discussion, and helping evaluate proposals.

**Adversarial refinement**

> AI may classify, retrieve, compare, question, translate, summarize, flag, explain, and recommend. It must not manufacture authority or become the final source of truth, law, expertise, consent, or political legitimacy.
> 

Consequential AI outputs must expose evidence, uncertainty, assumptions, model and policy versions, relevant context, and review paths. Higher potential harm requires stronger evidence and more meaningful human oversight. Users must be able to contest consequential AI decisions.

### Article 16: Solution reuse must be contextual

Prior solved cases should be discoverable and reusable. Similarity does not prove applicability. Before reusing a solution, the platform should compare geography, law, climate, culture, resources, affected populations, time, implementation capacity, contraindications, and outcome quality.

For high-stakes domains such as medicine, agriculture, law, finance, mental health, and engineering, the platform must clearly communicate uncertainty and use stronger expert-review and escalation controls.

### Article 17: Verified resolution over answer generation

The platform's work does not end when it generates guidance. It should track, with the person's consent:

- Guidance provided
- Option selected
- Implementation started
- Progress and blockers
- Reported outcome
- Independent or expert verification where appropriate
- Recurrence
- Unknown or abandoned outcome

A generated answer is not a solved problem.

### Article 18: Transparency without forced exposure

Transparency applies to process, rules, evidence standards, decisions, uncertainty, conflicts of interest, model behavior, and governance. It does not require public exposure of personal data, precise private locations, vulnerable people, security-sensitive evidence, or confidential expert information.

### Article 19: Constitutional direction of development

Every feature, metric, model, policy, partnership, and business model must demonstrate how it advances verified resolution while preserving rights, safety, privacy, contestability, and accountability. Features that optimize attention without improving resolution should not be built merely because they increase engagement.

The platform should remain improvable by design. New capabilities may extend implementation, but they must not silently redefine the founding purpose.

### Article 20: Machine-enforceable constitutional layer

The human-readable constitution should be accompanied by a versioned policy representation with:

- Stable article and rule identifiers
- Scope and jurisdiction
- Required actions
- Prohibited actions
- Decision authority
- Evidence requirements
- Exceptions and emergency rules
- Escalation and appeal paths
- Priority and conflict-resolution rules
- Effective dates and amendment history
- Positive, negative, boundary, multilingual, and adversarial test cases

LLM workflows must retrieve and apply the relevant constitutional and jurisdictional rules, produce structured decision records, and fail safely when rules conflict or required context is missing.

### Article 21: Dual legality gate and the `stuck` state

**Founder position**

No action facilitated by the platform may violate either the platform constitution or applicable local law. If current law prevents a valid resolution, the case may remain unresolved without weakening either constraint.

**Constitutional rule**

> A proposed action may proceed only when it complies with both the platform constitution and the applicable law. Failure under either layer blocks implementation through the platform.
> 

A case blocked by law should enter a visible `stuck` state rather than being falsely closed or solved. It should record:

- The exact blocking constraint
- The jurisdiction and authoritative source
- The source version and effective date
- Which proposed actions are blocked
- Lawful relief still available
- The linked legal-reform problem
- The dependency required for the original case to resume
- A periodic recheck condition

The law-reform case may collect evidence, testimony, analysis, proposals, and lawful routes to change. The original case resumes only when the relevant constraint changes or a different compliant solution emerges.

### Article 22: Public stewardship and implementation authority

No submitter owns a public problem or chooses on behalf of all affected people. The initiator may clarify the original report, but stewardship belongs to a decentralized, capability-balanced group. Implementation authority remains with the people, communities, institutions, or public bodies legally and practically responsible for the proposed action.

The system must distinguish:

- Proposal created
- Community support expressed
- Affected-party support or objection
- Expert assessment
- Authorized decision
- Implementation started
- Outcome reported
- Outcome independently observed
- Outcome supported by evidence
- Outcome verified

Conflicting accounts and dissent remain visible. The platform records legitimacy and authority; it does not manufacture them.

### Article 23: Layered interpretation and distributed review

**Founder position**

AI performs the first interpretation and moderation layer. Contested or consequential cases move to distributed community labeling. Review assignments should combine randomization with relevant context, location, conflicts of interest, and reviewer history. Review quality affects future weighting.

**Adversarial refinement**

No single AI output, reviewer, popularity signal, or reputation score may become final constitutional authority. The review system should use:

- Structured AI analysis with cited rules, uncertainty, and alternatives
- Randomized and context-masked human assignments
- Domain and jurisdiction matching where necessary
- Conflict-of-interest declarations and detection
- Independent labels before reviewers see aggregate opinion
- Multiple reviewers for consequential decisions
- Disagreement measurement and escalation
- Appeals and fresh review pools
- Continuous calibration using known test cases
- Transparent decision provenance without exposing sensitive reviewer data

Reputation may influence confidence, but it must never be treated as proof that a person is morally correct.

### Article 24: Authoritative legal-source integrity

Constitutions, statutes, regulations, bylaws, case law, official guidance, and jurisdictional boundaries can change or acquire new interpretations. The platform must not assume that a government constitution or legal rule is permanently unchanged.

The legal grounding system should:

- Retrieve from authoritative official sources where available
- Preserve the original text and source URL
- Record jurisdiction, hierarchy, language, effective date, amendment status, and retrieval time
- Detect changes and preserve previous versions
- Distinguish enacted, effective, repealed, proposed, stayed, disputed, and judicially interpreted rules
- Require validation before a detected change alters production moderation or advice
- Support qualified legal review and correction
- Expose when legal coverage is incomplete or uncertain
- Never let an LLM silently rewrite source law into binding platform policy

### Article 25: Non-negotiable rights foundation

**Founder decision**

The protected constitutional core includes all previously proposed commitments and should be strengthened using internationally recognized United Nations human-rights standards.

**Protected core**

- Human dignity and equal moral worth
- Nonviolence
- Equal protection and non-discrimination
- Protection of children and vulnerable people
- Protection against concealed, externalized, or unjustly transferred harm
- Privacy, data minimization, and informed consent
- Freedom of thought, belief, expression, peaceful assembly, and association, subject to lawful and rights-respecting limitations
- Meaningful participation in matters affecting a person or community
- Accessibility and inclusion
- Explanation, contestability, remedy, and appeal
- No forced participation
- No collective punishment
- No sale of influence over problem visibility, moderation, or solution outcomes
- No engagement maximization as the supreme objective
- No autonomous AI sovereignty
- Transparency of consequential rules, evidence standards, and conflicts of interest
- The right to leave and to request data deletion where legally possible
- Protection of affected parties, minorities, nonparticipants, future generations, and ecosystems

**Human-rights reference stack**

The constitution should map its enforceable rules to relevant international instruments, including:

- Universal Declaration of Human Rights
- International Covenant on Civil and Political Rights
- International Covenant on Economic, Social and Cultural Rights
- Convention on the Rights of the Child
- Convention on the Rights of Persons with Disabilities
- International Convention on the Elimination of All Forms of Racial Discrimination
- United Nations Declaration on the Rights of Indigenous Peoples
- UN Guiding Principles on Business and Human Rights
- OHCHR B-Tech Project for applying human-rights responsibilities to digital technology

These sources do not all have identical legal status or universal ratification. The platform should treat them as a principled minimum reference layer, then map binding obligations and reservations separately for each jurisdiction. Qualified human-rights and legal review remains necessary before converting source text into enforceable platform rules.

### Article 26: Human-driven resolution and universal review intent

**Founder position**

Solutions should be driven by people rather than generated as answers by AI. Every problem, comment, and input should undergo review. Contributors should demonstrate relevant understanding and critical reasoning before participating in a subject area.

**Adversarial refinement**

AI should reduce friction, structure information, retrieve prior cases, surface contradictions, moderate, translate, and test claims. It should not replace human experience, judgment, responsibility, or implementation.

A critical-thinking assessment is not the same as verified expertise. The platform must avoid turning language fluency, formal education, test familiarity, disability, or cultural style into hidden eligibility requirements. Participation checks should therefore be:

- Relevant to the specific task and risk
- Available in the contributor's language
- Accessible to people with disabilities
- Explainable and appealable
- Capable of recognizing lived and local knowledge
- Separate from professional credential verification
- Designed to teach and improve, not merely exclude
- Tested for disparate impact

The exact meaning, timing, and scalability of universal expert review remain to be resolved.

### Article 27: Reputation without a permanent social class

**Founder position**

Members earn reputation through consistently useful contributions. Attempts to manipulate the system and repeated poor-quality judgments reduce the weight and ranking of later contributions.

**Adversarial refinement**

Reputation must be multidimensional and domain-specific. A person may be reliable in one subject and unqualified in another. The system should consider accuracy, evidence quality, successful outcomes, calibration, constructive conduct, conflicts of interest, and review agreement without reducing a person to one universal score.

Required safeguards:

- No purchasing or transferring reputation
- No hidden permanent punishment
- Evidence-backed adjustments
- Appeals and correction
- Time decay and opportunities to recover
- Sybil and collusion resistance
- Separation of participation rights from ranking weight except where safety requires restriction
- Protection against popularity becoming truth
- Regular bias and disparate-impact audits
- Visibility rules that do not enable harassment or social-credit use

### Article 28: Anti-capture by governance and architecture

**Founder position**

No person, company, government, funder, administrator, or infrastructure provider should be able to take control of the whole network. The platform should use distributed databases and multiple communicating servers while preserving performance.

**Adversarial refinement**

Distribution of servers alone does not distribute power. Control may concentrate through software updates, identity issuance, domain names, application stores, model providers, moderation policies, signing keys, funding, ranking, or governance.

The platform should investigate a federated or otherwise decentralized architecture with:

- Multiple independently operated nodes
- Open protocols and portable data
- No universal administrator account
- Distributed signing and key recovery
- Explicit quorum and emergency powers
- Byzantine and Sybil threat models
- Constitutional compatibility requirements between nodes
- Transparent software and policy versions
- User-visible node governance and jurisdiction
- Safe migration between compatible nodes
- Forkability when governance irreconcilably fails
- Bounded blast radius for a compromised node
- Cross-node abuse reporting without creating a central surveillance authority

No architecture can guarantee that takeover is impossible. The constitutional requirement should be that capture is difficult, detectable, locally containable, contestable, and recoverable.

### Article 29: Financial, institutional, and political independence

The platform prohibits:

- Payment to influence which solution is selected or presented as valid
- Sale of personal or behavioral data
- Advertising inserted into problem-resolution rankings
- Paid suppression or artificial promotion of problems
- Undisclosed commercial influence over expert recommendations
- Funder, government, political-party, or corporate control over moderation outcomes
- Private-case access without consent or valid legal process
- Retaliation against lawful criticism of the platform or its funders

Material financial, professional, institutional, and political conflicts of interest must be disclosed and incorporated into participation, review assignment, weighting, and governance decisions.

### Article 30: Collective stewardship

**Founder decision**

Collective problems may be stewarded by a decentralized group rather than one person. This is especially important when the original poster is targeted, incapacitated, excluded, or otherwise unable to continue.

**Constitutional rule**

A stewardship group must represent the capabilities relevant to the case. Depending on the problem, this may include affected geography, lived experience, domain expertise, implementation responsibility, and rights or safety knowledge. Group action requires a defined internal consent threshold rather than unilateral control.

The platform must record:

- How stewards were selected
- Which constituencies and capabilities they represent
- Conflicts of interest
- Decision and quorum rules
- Scope and duration of authority
- Actions requiring broader affected-party consent
- Dissenting positions
- Replacement and removal procedures

Stewardship never transfers private information automatically and does not give the group authority over rights belonging to other affected people.

### Article 31: AI pre-publication review and appeal

**Founder decision**

Every submission receives AI review before entering the public system. Content that passes may be published according to its selected visibility. Flagged content does not enter the public workflow until revised or successfully appealed.

A user may appeal an AI decision. The appeal is assigned automatically to a decentralized, context-aware human review panel. Reviewers should not be selected by the user, poster, or original model. The user receives reasons for the outcome.

**Adversarial safeguards**

- AI rejection must identify the rule, triggering content, confidence, and safe revision path where possible.
- Appeals receive fresh review and must not merely rerun the same model configuration.
- Reviewers label independently before seeing consensus.
- Consequential appeals require a minimum number and diversity of eligible reviewers.
- A successful appeal corrects the content decision and produces candidate grounding feedback.
- Grounding data is not updated automatically from one appeal. It requires privacy review, poisoning checks, aggregation, evaluation, approval, versioning, and rollback.
- An unsuccessful good-faith appeal must not itself be penalized.
- Penalties apply only to demonstrable abuse, manipulation, spam, repeated malicious evasion, or knowingly false review behavior.

### Article 32: Consensus is not merely a vote count

Distributed review consensus should include reviewer independence, relevant competence, calibration, conflicts of interest, evidence quality, geographic or contextual fit, and uncertainty. The system must record disagreement instead of forcing false unanimity.

For high-impact cases, consensus thresholds should be defined before labels are collected. Ties, low confidence, coordinated anomalies, and unresolved rights conflicts require escalation rather than automatic majority acceptance.

### Article 33: Expertise claims and evidence

**Founder decision**

A person may claim expertise, but the claim gains weight only through evidence and review. Evidence may include credentials, examinations, demonstrated work, verified outcomes, practical experience, peer assessment, or task-specific questionnaires. AI and distributed community review both contribute to verification.

Expertise must be:

- Domain-specific
- Scoped to an appropriate level
- Time-bound where knowledge or licenses expire
- Distinct from general critical-thinking ability
- Distinct from lived experience and local knowledge
- Revocable or reducible when contradicted by strong evidence
- Appealable

A language test score may support a bounded language-proficiency claim but does not automatically prove expertise in linguistics, teaching, translation, literature, or every English-language task. A programming credential similarly does not prove current expertise in every Java system or security context.

### Article 34: Dynamic competence assessment

When a contributor has not established relevant expertise, the platform may administer a task-specific assessment that changes the weight or review path of the contribution.

The assessment system should use an open, versioned question bank that is:

- Created with human and AI assistance
- Supported by sources and explanations
- Validated by appropriate experts and community review
- Randomly sampled
- Transformed into semantically equivalent variants
- Resistant to memorization and direct answer lookup
- Accessible and multilingual
- Tested for bias and disparate exclusion
- Periodically refreshed and retired

Question transformation must preserve meaning and difficulty. AI-generated variants require validation before they influence participation rights or reputation.

### Article 35: Private, global, time-decaying reputation

**Founder decision**

Karma is private, unavailable to reviewers, global, time-decaying, and informed by both peer review and observed outcomes. Moderate differences affect ranking. Severe and well-supported negative history may restrict participation.

**Adversarial refinement**

A global reputation layer may exist for integrity, abuse resistance, and general reliability, but domain-specific components remain necessary for subject-matter weighting. The system must not infer medical competence from good software contributions or political reliability from popularity.

Reputation decisions require:

- Evidence provenance
- Confidence and uncertainty
- Separation between misconduct and ordinary disagreement
- Protection against retaliation and brigading
- No penalty for successful good-faith appeals
- No visibility to independent reviewers before labeling
- Time decay and recovery paths
- Explanation and appeal for participation restrictions
- Regular bias, calibration, and capture audits

### Article 36: Constitutional amendment protocol

**Founder decision**

Amendable provisions follow the proposed distributed process:

1. Anyone may propose an amendment.
2. AI maps affected articles, rights, risks, contradictions, and required tests.
3. Randomized reviewers independently assess it.
4. Directly affected and vulnerable groups receive explicit representation.
5. Relevant experts review technical, legal, safety, and rights implications.
6. Public deliberation and a waiting period occur.
7. A defined distributed constitutional quorum approves or rejects it.
8. The amendment receives a new version and effective date.
9. LLM, policy, protocol, and software conformance tests pass before activation.
10. Rollback and post-implementation review are defined.

The non-negotiable rights foundation cannot be removed through an ordinary amendment.

### Article 37: Validated legal updates

Detected legal changes must not silently alter production behavior. The system may ingest, compare, preserve, and flag a source automatically. Activation requires provenance checks, impact analysis, and qualified or distributed validation. Emergency changes remain auditable and require retrospective review.

### Article 38: Compromised-node containment and restoration

**Founder decision**

A server that tampers with protected data, protocol behavior, constitutional rules, review results, or network integrity loses trusted status and is removed from the trusted network. The affected data is isolated, re-audited, relabeled, and remoderated as necessary. Re-entry requires a clean restoration and renewed validation.

**Adversarial refinement**

The network must distinguish suspected compromise from proven malicious control. Automatic expulsion based solely on an AI finding could itself become a network-takeover weapon. Required safeguards include:

- Cryptographic and behavioral evidence
- Independent confirmation across nodes
- Emergency quarantine before permanent removal
- A predefined quorum for expulsion
- Protection against malicious false reports
- Published remediation requirements
- Fresh keys and trusted software state
- Independent audit after wipe and restoration
- Revalidation of affected decisions and data
- Appeal without automatic reconnection
- A bounded process for irreconcilable forks

### Article 39: Privacy-preserving identity and uniqueness

**Founder intent**

Users privately prove authenticity and identity, while identity documents, raw GPS coordinates, and unnecessary personally identifiable information are not retained by the platform. The system should store only the minimum cryptographic evidence required to establish uniqueness, authentication, eligibility, or a relevant attribute.

**Critical technical correction**

A plain hash of an identity document is not a safe identity system. Document values are structured and guessable, hashes can become stable tracking identifiers, and a hash collision is not the mechanism that prevents impersonation. Password storage works differently because it uses a unique salt and deliberately expensive password-hashing function. Reusable identity and credential verification should instead evaluate:

- Issuer-signed verifiable credentials
- Selective disclosure
- Zero-knowledge or predicate proofs where mature and appropriate
- Pairwise or purpose-bound identifiers to prevent cross-context tracking
- Device-bound or phishing-resistant authentication keys
- Revocation and expiry without retaining the original credential
- Proof of uniqueness without publishing legal identity
- Recovery that does not create a universal identity administrator
- Data-flow proof that raw documents and locations are deleted after validation

The architecture should follow risk-based identity assurance rather than requiring the same identity proof for every activity. Reading, submitting a sensitive problem, contributing publicly, expert verification, high-impact labeling, and constitutional voting may require different assurance levels.

### Article 40: Deliberate participation as the normal path

**Founder position**

Every person on the platform is part of the overall problem-solving team. The intended experience requires people to act carefully, slowly, consciously, and deliberately when submitting problems, commenting, labeling, reviewing, or making decisions.

**Constitutional rule**

> The platform should make careful participation easier than impulsive participation. It should reward relevance, evidence, reflection, accuracy, constructive disagreement, correction, and responsibility rather than speed, outrage, volume, virality, or performative certainty.
> 

The product should create useful friction through:

- Reflection prompts before consequential submissions
- Clear declaration of contribution type and intended effect
- Evidence and uncertainty fields
- Stage-specific participation rules
- Cooldowns after repeated or heated contributions
- Opportunities to revise before publication
- Plain-language reminders of affected people and applicable rules
- Independent labeling before exposure to group opinion
- Delayed or hidden popularity signals where they could distort judgment
- Recognition for corrections, restraint, successful implementation, and accurate calibration

The constitution should call this the **deliberate participation standard**, not merely the happy path. A constitutional standard must describe observable conduct rather than an undefined preferred personality.

### Article 41: Graduated trust and proportionate restrictions

A deviation from the deliberate participation standard may result in increased friction, reduced privileges, or loss of access. Restrictions must be based on behavior and risk, not disagreement, unpopular identity, political position, religion, geography, disability, language style, education, or lawful criticism of the platform.

Possible interventions, from least to most restrictive, include:

1. Contextual reminder or educational prompt
2. Required revision before publication
3. Additional evidence or reasoning requirement
4. Slower posting rate or cooldown
5. Additional AI moderation pipelines
6. Limited visibility pending review
7. Temporary loss of participation in a topic or role
8. Removal from expert, reviewer, moderator, or steward eligibility
9. Temporary platform suspension
10. Permanent loss of contribution or governance access
11. Full account exclusion for severe, repeated, or coordinated abuse

Restrictions must be necessary, proportionate to the demonstrated risk, as narrow as practical, time-bound where possible, and accompanied by reasons and an appeal path. Severe imminent threats, exploitation, malware, coordinated manipulation, or credible safety risks may justify immediate temporary restriction while review proceeds.

### Article 42: Enhanced moderation without presumption of guilt

**Founder position**

Content from users with substantiated risk indicators may pass through additional moderation pipelines. AI may flag behavior during discussions, and restrictions may be scoped to particular subjects or capabilities rather than always applying to the whole account.

**Adversarial safeguards**

A flag is a risk signal, not proof of wrongdoing. Enhanced review must not become a secret permanent social class or a self-fulfilling punishment system.

Required safeguards:

- Flags must identify the behavior, source, confidence, scope, and expiry
- Protected characteristics and lawful viewpoints must not be risk features
- Successful appeals remove or correct associated risk signals
- Good-faith disagreement and unsuccessful good-faith appeals are not misconduct
- Reviewers should not see irrelevant reputation information before independently judging content
- Additional pipelines must evaluate the content fairly rather than search for reasons to reject it
- Restrictions must decay or be reviewed periodically
- Users must have a meaningful path to regain trust
- Permanent restrictions require strong evidence, independent review, and a higher decision threshold
- Aggregate audits must test false-positive rates and unequal impact across populations
- Reading public information should remain available unless safety, legal obligations, evasion prevention, or protection of targeted people requires narrower access

The system should distinguish inability, mistake, uncertainty, disagreement, negligence, recklessness, deliberate abuse, coordinated manipulation, and imminent threat. These categories must not receive the same consequence.

### Article 43: Sanctions target demonstrable abuse, not disagreement

**Founder clarification**

Penalties are intended for users who genuinely attempt to game the system, commit or facilitate illegal acts, manipulate reviews, evade safeguards, falsify evidence, coordinate abuse, or otherwise act maliciously. Minor differences of opinion, unpopular positions, uncertainty, honest mistakes, and good-faith criticism are not sanctionable.

Enforcement decisions must identify the conduct rather than infer bad intent solely from disagreement. When intent is uncertain, the system should respond first to observable risk and use the least restrictive effective measure.

The deliberate participation standard must define **behavior-specific tolerance buffers**. Ordinary variation inside a buffer is normal participation. Crossing a defined threshold creates a flag and proportionate review. Examples include:

- Posting frequency and repetition thresholds for spam
- Similarity and coordination thresholds for duplicate or automated campaigns
- Evidence of knowingly false claims, fabricated sources, or impersonation
- Attempts to probe, bypass, or manipulate moderation and review assignment
- Undisclosed conflicts of interest in consequential reviews
- Harassment, threats, doxxing, exploitation, malware, or illegal facilitation
- Collusive labeling, reciprocal reputation manipulation, or Sybil behavior
- Repeated reposting of materially unchanged rejected content

A threshold crossing creates a **reviewable risk flag**, not an automatic conclusion about the person's character or intent. Each flag must identify the triggering behavior, applicable threshold, evidence, confidence, scope, expiry, and next action. Clear technical abuse may be blocked immediately. Ambiguous behavioral signals require corroboration before severe restrictions.

Buffers must be versioned, measurable, context-sensitive, and resistant to adversarial probing. Exact operational thresholds may remain private when disclosure would make evasion materially easier, but the prohibited behavior, governing principle, enforcement range, and appeal rights must remain public.

### Article 44: Appeals feed the next rules-review cycle

A successful appeal does not immediately rewrite grounding data, prompts, models, or platform rules. It creates a versioned candidate case for the next review cycle.

Before incorporation, candidate cases require:

- Privacy review and redaction
- Independent additional labeling
- Coordination and poisoning checks
- Analysis of the rule or model failure
- Regression tests against existing cases
- Disparate-impact evaluation
- Formal approval
- Versioned rollout and rollback

An unsuccessful good-faith appeal carries no penalty. Penalties require separate evidence of deliberate abuse or manipulation.

### Article 45: No unverified contested content

**Founder decision**

AI-cleared content may enter the selected workflow. AI-flagged content remains outside public discussion until revised, withdrawn, or approved through distributed human review. Long review times are acceptable when qualified reviewers are scarce. The network should continue routing the case to other eligible reviewers rather than lowering the verification standard.

Users may withdraw flagged content and submit a materially revised version. Reposting must not become a method for repeatedly probing or evading safeguards. The system should compare revisions for moderation purposes without exposing private drafts to ordinary participants.

The interface must distinguish:

- Withdrawn by user
- Revision requested
- Awaiting reviewers
- Awaiting specific expertise
- Awaiting jurisdictional review
- Approved on appeal
- Rejected with reasons
- Closed for demonstrated abuse

### Article 46: Capability-balanced stewardship

Collective stewardship should combine overlapping qualifications appropriate to the case. A local problem may require several affected local participants. A technical problem may require several independently qualified contributors. A high-risk case may require safety, rights, and implementation competence.

The system should avoid single-person dependency through:

- Multiple members for each critical capability where feasible
- Geographic and stakeholder diversity
- Independent conflict checks
- Quorum and consent thresholds
- Alternates and succession
- No unilateral access to sensitive information
- Limited, auditable permissions

### Article 47: Pseudonymous participation and data uselessness outside context

**Founder intent**

People should not place their own or other people's identifying information into the shared problem-solving system. A breach should not reveal which real person submitted an idea, comment, label, vote, or review. Data should be useful only inside its authorized context and substantially less useful when removed from it.

**Adversarial refinement**

Names are only one form of identification. Free text, location, occupation, timing, photographs, voice, rare events, writing style, relationships, and combinations of facts can re-identify a person. The platform therefore needs contextual privacy rather than name removal alone.

Required controls:

- Pseudonymous identifiers by default
- Automatic detection and redaction of names, contact details, precise locations, document numbers, faces, and other identifiers
- User confirmation before any exceptional disclosure
- Separate storage and encryption domains for identity proof, private case data, public content, review data, and audit records
- Purpose-bound identifiers that differ across contexts
- No public display of reviewer identity
- No raw identity documents or raw biometric templates in platform storage
- Minimal retention and verifiable deletion
- Prevention of bulk export and cross-context joins
- Re-identification risk testing before publication
- Protection against stylometry, metadata leakage, image metadata, and location inference
- Strong controls on internal access and legal-process requests

The platform cannot guarantee that breached content is literally useless. The enforceable goal is to minimize linkability, identifiability, and external utility while preserving necessary internal accountability.

### Article 48: Participation without conventional identity

Anyone, including a person without conventional identity documents, may submit a problem. The platform should verify only what is necessary for the requested action.

Suggested assurance tiers:

- **Problem submission:** Human-presence and abuse checks; conventional identity not required
- **Public contribution:** Persistent pseudonymous account and basic anti-Sybil controls
- **Affected-party claim:** Privacy-preserving evidence appropriate to the context
- **Expert claim:** Relevant credential, work, assessment, or peer evidence
- **High-impact labeling:** Stronger uniqueness, integrity, competence, and conflict checks
- **Constitutional governance:** Highest available assurance without public identity disclosure

Identity confidence must not determine whether a genuine problem deserves help. It determines which claims, labels, votes, or governance powers can carry consequential weight.

### Article 49: Biometrics and devices are signals, not identity

Face checks, liveness tests, device integrity, passkeys, and other mechanisms may contribute to anti-bot defense. None independently proves that one real human has only one account or that the human is trustworthy.

The platform should not attach IMEI numbers to user IDs. IMEI is a persistent hardware identifier, is restricted on modern Android, creates tracking and exclusion risk, does not work consistently across platforms, and fails for shared, replaced, repaired, virtual, or inaccessible devices.

Preferred controls include:

- Device-bound passkeys and hardware-backed keys
- App attestation and device-integrity signals
- Privacy-preserving liveness checks from independently audited providers
- Rate limits and proof-of-work or proof-of-personhood experiments where appropriate
- Multiple independent identity and uniqueness providers
- Community attestations with collusion resistance
- Behavioral abuse detection with strict purpose limits
- Recovery and device-change procedures
- No storage of raw face images or biometric templates by the platform
- Clear alternatives for people who cannot or will not use facial verification

On-device Face ID or similar platform biometrics should authenticate control of a registered device. It should not be confused with remote identity proofing or global proof of unique personhood.

### Article 50: Deactivation, appeal, and restoration

**Founder clarification**

The network uses deactivation rather than irreversible expulsion. A person, role, credential, node, or service may be deactivated, isolated, and required to remediate. Appeals and restoration remain possible.

Restoration may require:

- Explanation of the triggering evidence
- Independent review
- Remediation of the underlying weakness
- Fresh keys or credentials
- Clean software and data state
- Revalidation of affected records
- Temporary reduced privileges
- Monitoring during re-entry

The right to appeal does not require immediate reconnection while a credible security or safety risk remains active.

### Article 51: Individual crises are outside the public workflow

A personal crisis is not published as a collaborative problem. If transient intake detects suicidal thoughts, imminent harm, abuse, a medical emergency, or another individualized safety need, the platform stops public submission and displays jurisdiction-appropriate external resources. It does not diagnose, provide treatment, match a private professional, crowdsource the crisis, locate the person, or claim it can intervene.

The transient disclosure may be transformed into a separate non-identifying systemic hypothesis only when the resulting public problem contains no personal narrative or link back to the individual. Static safety routing must remain available even when ordinary moderation is unavailable.

### Article 52: The platform coordinates resolution capacity

The platform itself is not presumed to possess every solution. Its core role is to assemble and coordinate the best available resolution capacity:

- The problem owner's context and choices
- People with relevant lived experience
- Local participants
- Qualified experts
- Prior cases and verified playbooks
- Institutions and service providers
- Public agencies and lawful processes
- Crisis and safeguarding resources
- Implementation volunteers
- Outcome verifiers

AI operates as an orchestration, structuring, retrieval, translation, moderation, and safety layer. Human beings remain the source of responsibility, consent, implementation, and accountable judgment.

### Article 53: Anti-bot defense without universal surveillance

The expected presence of bots and coordinated manipulation justifies layered anti-abuse controls, but not a universal biometric or device-surveillance system.

Controls should be proportional to capability. A low-assurance person may still ask for help. Higher-impact actions require stronger combinations of uniqueness, device integrity, account history, competence, conflict checks, and independent review.

No single provider, face model, device identifier, government credential, or reputation score may become the universal gatekeeper. The system must measure false rejection, demographic performance, accessibility, provider concentration, coercion, and exclusion before increasing the weight of any identity signal.

### Article 54: Discuss roles and routes, not named people

**Founder decision**

The shared platform does not discuss identifiable private individuals by name. When a responsible person must be referenced, the system uses the person's functional public or institutional role, such as `District Magistrate of the affected district`, `authorized municipal officer`, `designated safeguarding lead`, or `company grievance officer`.

The platform focuses on:

- Which role or institution has responsibility
- Which process applies
- Which lawful route is available
- What type of evidence the competent authority may require
- How to prepare, escalate, appeal, and follow up
- What response times or procedural stages apply
- Which alternative route exists when the first route fails

It does not become a forum for naming, accusing, locating, investigating, rating, or mobilizing against real people.

**Privacy safeguard**

A role can still identify one person, especially in a small district or specialized office. Role references must therefore be necessary, relevant, institutionally appropriate, and phrased around duties and procedures rather than personal allegations. The system should prefer the least identifying functional reference capable of routing the problem.

### Article 55: External evidence handling

Real-world evidence that identifies people, alleges misconduct, or belongs in a legal, regulatory, employment, medical, safeguarding, or investigative process should not enter ordinary platform discussion.

The platform may help the user understand:

- What category of evidence may be relevant
- How to preserve originals and provenance
- Which competent authority, court, lawyer, regulator, employer, service, or professional should receive it
- Which filing or reporting process applies
- What redaction or confidentiality precautions may be necessary
- How to record that evidence was submitted without copying its identifying contents into the platform

The platform may store a non-identifying procedural attestation such as `evidence submitted to competent authority`, submission date, evidence category, receipt status, and case-reference token where safe. It must not store the identifying evidence itself merely to make the public case more persuasive.

The platform must not determine guilt, adjudicate allegations, conduct a public investigation, replace legal discovery, or encourage trial by community opinion.

### Article 56: Public resolution orchestrator

The platform coordinates the path from a public problem to structural resolution. It helps communities classify the issue, organize evidence, identify affected groups, map responsible roles and institutions, compare lawful interventions, form stewardship, coordinate implementation, expose blockers, and verify outcomes.

> The platform resolves public problems through coordination and collective action without claiming jurisdiction, professional authority, investigative power, or operational competence it does not possess.
> 

It may act as:

- Public problem intake and framing layer
- Evidence and investigation-needed registry
- Geography, stakeholder, and jurisdiction mapper
- Prior-case and civic-playbook retrieval system
- Structured deliberation space
- Expert and affected-party contribution layer
- Institutional and democratic-process navigator
- Implementation coordinator
- Progress, dependency, and outcome tracker
- Root-cause and recurrence monitor

Individual service requests are routed outside the collaborative platform. Their existence may reveal a structural issue, but the public thread addresses the system, not the individual's case.

### Article 57: Individual-service exclusion

The platform does not operate private professional workflows. It does not assign therapists, doctors, lawyers, consultants, investigators, or other providers to individual users. Professionals participate only as public contributors, reviewers, experts, implementers, or institutional representatives within the scope of a public problem.

### Article 58: From individual signal to public problem

A personal experience may support a public problem only after transformation into a non-identifying structural statement. The resulting record should describe the affected class or geography, institutional or systemic mechanism, public significance, evidence tier, and missing evidence. It must not retain the person's narrative, identity, private chronology, or one-to-one support request.

One case may justify opening a systemic hypothesis. It does not establish prevalence or causation.

### Article 59: Public expertise, not private matching

Verified professionals do not accept private cases through the platform. Their credentials increase the evidentiary weight or eligibility of public contributions within a defined scope. Expertise never creates ownership, automatic correctness, private solicitation rights, or a confidential professional relationship inside the platform.

### Article 60: Participation age follows jurisdiction and capability

The platform has no universal age threshold. Each enabled jurisdiction defines lawful and safe eligibility for reading, submitting, commenting, evidence contribution, labeling, stewardship, expertise, and governance. The platform minimizes age data and does not punish a young person for attempting constructive participation. Child-safety and safeguarding requirements remain mandatory even in an adult-intended launch.

### Article 61: Public evidence remains external and names do not enter discussion

**Founder clarification**

An external public evidence source may contain names and identifying material. The platform may reference the existence and provenance of that source when necessary, but its discussion layer must transform the issue into roles, patterns, mechanisms, institutional failures, safeguards, and root causes.

The platform should not:

- Copy lists of names into discussions
- Build person profiles from public files
- Rank alleged offenders or victims
- Invite crowdsourced guilt determinations
- Treat appearance in a public file as proof of wrongdoing
- Make a named person the organizing object of a problem thread

A source containing identities should remain in a restricted evidence-reference layer or at its authoritative external location. The platform may extract non-identifying claims, procedural facts, and systemic patterns with provenance. Every extracted claim must distinguish allegation, verified fact, judicial finding, institutional record, and interpretation.

Repeated names must be detected and redacted from ordinary contributions, even when those names are publicly available elsewhere.

### Article 62: Jurisdiction enablement gate

A jurisdiction becomes enabled for verified problem-solving only after a defined readiness checklist and committee review. The platform may still permit low-assurance users to seek help, but consequential routing, legal grounding, expertise, moderation, and governance must reflect the jurisdiction's verified readiness level.

The enablement checklist should cover:

- Authoritative constitutional and legal sources
- Human-rights compatibility mapping
- Emergency, crisis, safeguarding, and public-service routes
- Identity and uniqueness providers
- Languages and accessibility
- Qualified reviewers and experts
- Conflict-of-interest and appeal mechanisms
- Data protection and retention requirements
- Node operators and incident response
- Known gaps and unsupported problem categories

Readiness is not permanent. It expires, is periodically reviewed, and may be partially deactivated when sources, providers, laws, or safety conditions deteriorate.

### Article 63: User-controlled account recovery

**Founder decision**

There is no unrestricted administrative account-recovery power. Recovery depends on methods configured by the user or privacy-preserving re-verification.

Supported methods may include:

- Multiple passkeys or registered devices
- Authenticator applications
- One-time backup codes
- Encrypted recovery keys
- Several trusted contacts using threshold approval
- Re-verification through an accepted identity or credential provider

No single trusted contact, provider, employee, node operator, or AI may recover the account alone. Recovery must not reveal the person's legal identity, problem history, labels, or private participation to trusted contacts. Users who configure no recovery method may permanently lose access.

### Article 64: Fail closed for publication, fail useful for support

When moderation is unavailable, outdated, unsupported in the language, or insufficiently confident, content does not enter public discussion. It remains a private draft and may be routed to another compatible model, node, or qualified review pool.

Failure of publication moderation must not prevent the platform from presenting static, verified emergency and support resources. The platform should fail closed for public exposure while remaining useful for safe routing.

### Article 65: Identity data should be useless outside context; knowledge should remain useful

**Founder clarification**

The goal of making breached data useless applies primarily to identity and linkability, not to the substantive public knowledge created by the platform.

The data architecture should separate:

- **Identity and uniqueness proofs:** Minimal, purpose-bound, non-public, and difficult to correlate
- **Transient unpublished drafts:** Short-lived, quarantined, and deleted after moderation, withdrawal, rejection, or timeout
- **Moderation and review records:** Masked and limited to necessary context
- **Public problem evidence records:** Claim-specific provenance without personal identities
- **Outcome attestations:** Non-identifying status and evidence quality
- **Public systemic problems:** Structural descriptions without individual case files
- **Public playbooks:** Reusable routes, methods, safeguards, and lessons
- **Constitutional and audit records:** Transparent rules and integrity proofs without participant identity

The content layer should maximize reusable knowledge. The identity layer should minimize linkability. These objectives must not be conflated.

### Article 66: Open problem declarations

**Founder decision**

The platform is open by design. A problem that is accepted into the platform is available across the platform and may contribute to related cases, aggregate patterns, systemic problems, routing knowledge, and reusable playbooks without separate consent for each reuse. The platform therefore prohibits personally identifying information rather than building private ownership or consent controls around published problem content.

**Required interpretation**

The act of deliberately submitting an accepted problem is the publication decision. Before submission, the interface must clearly explain that:

- The problem becomes available across the platform
- It may be analyzed, linked, aggregated, translated, summarized, and incorporated into systemic problem detection
- It may inform future routes and playbooks
- Withdrawal may stop future platform use but cannot guarantee recall of information already viewed or independently copied
- Personal and third-party identifying information is prohibited

No separate opt-in is required for constitutional uses of accepted platform content. Uses outside the constitutional purpose, including advertising, identity profiling, sale, unrelated model training, or external behavioral tracking, remain prohibited.

**Mandatory pre-publication privacy gate**

Open publication is allowed only after the system checks for direct and indirect identifiers. The platform must detect or request removal of:

- Names and contact details
- Exact addresses and precise locations
- Identity, account, medical, employment, education, and legal reference numbers
- Faces, voices, signatures, document images, and metadata
- Unique job titles or role combinations that identify a private person
- Exact dates, rare events, relationship details, and narrative combinations that create material re-identification risk
- Identifying information about third parties

A statement can identify someone without containing conventional PII. Therefore, `contains no names` is not equivalent to `cannot identify a person`.

**Boundary condition**

If a problem cannot be made sufficiently non-identifying without destroying the information required for safe routing, it cannot enter the open platform in that form. The system should provide general resources or direct the person to an appropriate external confidential service instead.

The platform does not maintain a hidden private case that later becomes public. It may hold a short-lived local or quarantined draft solely to perform redaction and safety checks. Draft content must be deleted when submitted, withdrawn, rejected, or expired according to a strict retention rule.

### Article 67: Open aggregation without individual consent

Accepted non-identifying problem content may contribute to aggregate detection automatically. Aggregation still requires safeguards because combinations of open records may re-identify people or stigmatize a group.

Required controls:

- Minimum cohort and independence thresholds
- Suppression of rare combinations
- Coarsened geography and time windows
- No drill-down from a systemic pattern to an individual problem when that creates linkability
- No quotation of uniquely identifying narrative fragments
- Professional review for sensitive health, crisis, abuse, religion, ethnicity, sexuality, or political patterns
- Clear separation between observed frequency on the platform and prevalence in the real population
- Prevention of coordinated fake reports from manufacturing a systemic problem

The platform may state `the platform received a pattern of reports meeting defined criteria`. It must not claim that the pattern proves population prevalence, causation, guilt, or institutional responsibility without additional evidence.

### Article 68: One case may open a systemic problem

**Founder decision**

Any participant may propose a systemic problem from a single case. Multiple reports are not required before structural causes can be examined. A rare, emerging, geographically isolated, or minority problem must not be denied merely because it affects only one known person.

The system must distinguish:

- **Existence:** The problem record is preserved and discussable
- **Systemic hypothesis:** A proposed claim that a broader mechanism or root cause exists
- **Evidence strength:** How strongly available information supports that claim
- **Prevalence:** How widespread the issue appears to be
- **Severity:** How serious the potential impact is
- **Activity:** Whether participants are currently contributing
- **Prominence:** Where and how often the problem appears in discovery surfaces

A single case can justify investigation but does not prove prevalence, causation, or system-wide failure. Low-evidence or inactive problems may receive less feed prominence without being deleted or declared invalid. Ranking must not bury severe minority problems merely because they lack engagement.

### Article 69: Role aliases with temporal context

**Founder decision**

Real people are represented through institutional role aliases rather than names. A reference should identify the function, jurisdiction, and relevant time, for example:

`Union education minister of India (officeholder as of May 2026)`

The role alias allows institutional accountability and historical accuracy without making the named person the object of discussion.

Required rules:

- Use the office or functional capacity relevant to the problem
- Include jurisdiction and time period when officeholders can change
- Do not include relatives, associates, private individuals, or identifying personal details
- Discuss duties, decisions, processes, institutional powers, and structural incentives
- Preserve source provenance in the restricted evidence layer
- Prevent role aliases from becoming coded harassment or unsupported accusations
- Update current-role mappings without rewriting the historical context of older cases

Institutions and organizations may be named because they are public structural actors. Individual people remain represented through relevant roles.

### Article 70: No speculation, prosecution, or defense of individuals

The platform is not a speculation forum, personality forum, trial forum, or defense forum. It does not determine whether an individual is good, bad, guilty, innocent, truthful, corrupt, competent, or morally blameworthy.

Discussion must remain focused on:

- Structural conditions
- Institutional responsibilities
- Verifiable procedures and outcomes
- Root causes
- Safeguards and incentives
- Lawful routes and reforms
- Implementation and verification

Where an individual legal case matters, competent authorities and legal processes handle the identifiable evidence. The platform may examine what the case reveals about systems without adjudicating the people involved.

### Article 71: Personal service requests are outside collaborative scope

The platform does not provide therapy, legal representation, medical treatment, private consulting, missing-person investigation, or other one-to-one professional services. A transient intake may display an external category of help or official resource, then delete the personal draft. A separate non-identifying public problem may be created only when a structural issue can be stated without retaining the individual case.

Commercial providers may contribute to public problems under conflict-of-interest and anti-solicitation rules, but the platform must not become a lead-generation marketplace. Recommendations cannot be purchased or ranked by commercial payment.

### Article 72: Expertise changes weight, not ownership

A verified professional or demonstrated expert may contribute opinions, evidence, critiques, and recommendations. Expertise may increase the weight of a contribution within the verified scope, but it does not:

- Give the expert ownership of the problem
- Assign the problem to that expert
- Make the expert's answer automatically correct
- Override affected-party experience or constitutional protections
- Create a private professional relationship through the platform
- Permit undisclosed solicitation

Expert contributions remain contestable, evidence-linked, conflict-checked, and subject to outcome calibration.

### Article 73: Safeguarding without individualized youth services

Jurisdiction policy determines age and capability eligibility. The platform does not use private messaging or individualized youth-service workflows. It minimizes age and identity collection, prohibits identifying minors in public problems, and applies safeguarding, grooming prevention, commercial restrictions, and capability limits required by local law and platform policy. A report about a structural problem affecting children may be discussed without turning a child's personal case into public content.

### Article 74: Durable problem memory and later reconnection

**Founder decision**

A problem may remain on the platform even when no immediate solution or active discussion exists. If a similar problem appears months or years later, the system may link the cases, reactivate discussion, and notify previous participants that related activity exists.

Durable retention should preserve:

- Non-identifying problem description
- Classification and affected scope
- Routes attempted
- Blockers
- Proposed systemic hypotheses
- Related cases
- Outcome status and uncertainty
- Reusable lessons

Notifications should reveal no new sensitive context and should allow participants to mute, unfollow, or leave the discussion. Inactivity reduces prominence but does not erase the problem. A later match must compare context rather than assume two superficially similar cases have the same cause or solution.

### Article 75: Evidence-tiered problem intake

**Founder decision**

Anyone may submit a systemic problem, but every problem must display its evidentiary status. A report without supporting evidence is not discarded. It enters a different tier whose purpose is to attract corroboration, investigation, or reporting rather than to present the claim as established fact.

Suggested evidence tiers:

1. **Unverified signal:** A non-identifying report or concern without independently reviewable support
2. **Corroboration requested:** Similar independent reports or a defined evidence request exist, but material claims remain unverified
3. **Documented problem:** Relevant sources or records support the existence of the problem
4. **Independently reported:** Credible independent reporting or investigation supports material claims
5. **Authoritatively established:** Competent official, judicial, regulatory, scientific, or similarly authoritative findings establish defined facts
6. **Outcome verified:** Implementation and results have been independently assessed

A higher tier increases confidence, not moral importance. A severe minority concern in a low evidence tier must remain discoverable to qualified investigators. Tier labels must identify which claims are supported rather than assigning one blanket truth score to an entire problem.

### Article 76: Investigation-needed and journalist discovery layer

Problems lacking sufficient evidence may enter an `investigation_needed` layer. This creates a legitimate opportunity for journalists, researchers, civil-society organizations, auditors, and qualified community investigators to find patterns that deserve reporting.

The layer should provide:

- Non-identifying problem description
- Geography at the safest useful level
- Claim and uncertainty structure
- Evidence needed to move tiers
- Similar independent signals
- Public institutions or systems implicated by role
- Known reporting and safety risks
- A way to publish resulting authoritative work back to the problem

Safeguards:

- The layer must not become a rumor feed
- No named private individuals or crowdsourced accusations
- Multiple reports may be coordinated and do not automatically equal corroboration
- Investigators must disclose conflicts of interest
- Contact between investigators and submitters must use a consented, privacy-preserving relay if introduced later
- Publication of an investigation does not automatically validate every claim
- Retaliation risk must be assessed before increasing visibility

Journalists monitor and investigate; they do not receive privileged authority merely because of occupation. Their work gains weight through independence, methods, evidence, corrections, and outcome accuracy.

### Article 77: Jurisdiction-specific participation age

**Founder decision**

Age eligibility is jurisdiction-specific rather than globally fixed at 18. The platform must determine the legally and constitutionally appropriate participation threshold for each enabled jurisdiction and capability.

**Adversarial correction**

A national constitution alone may not define the relevant age. The system must examine applicable statutes, regulations, child-data rules, contractual-capacity rules, platform obligations, and safeguarding standards. Different capabilities may require different thresholds.

The jurisdiction policy pack should separately define eligibility to:

- Read public content
- Submit a problem
- Comment
- Provide evidence
- Join a stewardship group
- Perform moderation or labeling
- Claim expertise
- Participate in governance
- Receive or send direct contact, if ever supported

Where age cannot be established, the platform should use the safest lawful capability set without collecting more identity data than necessary.

### Article 78: Decentralized community governance

**Founder clarification**

Community governance is decentralized. A global constitutional layer protects the non-negotiable core. Jurisdiction communities maintain local legal, cultural, language, routing, and readiness policies. Case-specific groups apply these layers to individual problems.

No local community may override the protected constitutional core. No global body should silently replace valid local context. Conflicts require a versioned, appealable constitutional review.

### Article 79: Platform-wide access without unrestricted extraction

Accepted problems may be available across the platform without automatically being indexed by public search engines, exposed through unrestricted APIs, downloadable in bulk, or replicated with full context to every node.

Access controls may limit scraping, bulk export, cross-case re-identification, and hostile archival while preserving ordinary open participation and transparent rules.

### Article 80: Withdrawal and durable aggregate knowledge

A participant may withdraw a problem or contribution. The platform should stop ordinary display and future use of the original text, subject to lawful retention and integrity requirements. Previously derived non-identifying aggregate statistics, systemic conclusions, and public playbooks may remain when they no longer expose or depend on the withdrawn record.

Withdrawal must propagate to compliant nodes. The platform cannot guarantee recall of copies independently made while content was available.

### Article 81: Exact public-office aliases

When a public office materially matters, use the exact office, jurisdiction, and time-specific capacity, for example:

`Union education minister of India, officeholder as of May 2026`

Do not include the officeholder's personal name. Historical records retain the role's time context even after the officeholder changes.

### Article 82: Claim-specific source hierarchy

**Founder decision**

Authoritative external links are allowed. Government documentation, judicial records, established institutions, credible news reporting, and well-supported research generally carry more weight than unsourced social posts or random websites. Lower-ranked sources may still be submitted but must not be treated as equally reliable.

**Adversarial refinement**

Source weight must be claim-specific rather than based only on publisher category:

- A government source is authoritative about what the government officially published, not automatically about whether every assertion is true
- A judicial finding has a different status from an allegation filed in court
- A news article's weight depends on sourcing, independence, corrections, and reporting method
- A social post may be primary evidence that a statement was made, but not proof that the statement is true
- A scientific paper's relevance depends on methods, replication, scope, and current validity
- An organization may have conflicts of interest

The community may govern source policies through the constitutional amendment and review process, but source ranking must remain transparent, evidence-based, appealable, resistant to coordinated voting, and tested against known cases.

### Article 83: Privacy-preserving reactivation notifications

When a similar problem appears later, previous participants may receive a neutral notification. Notifications must support mute, unfollow, and leave controls. Sensitive categories must not expose the subject in lock-screen text, email subject lines, or other external previews.

### Article 84: Durable, claim-specific public memory

**Founder decision**

The platform should preserve a durable and source-backed memory of public problems, relevant claims, evidence, procedural actions, institutional responses, commitments, blockers, implementation, outcomes, corrections, and recurrence. Public attention ending does not erase an unresolved problem.

The record must remain claim-specific. Every material assertion should identify scope, time, jurisdiction, evidence, uncertainty, supporting and contradicting sources, verification status, and correction history. Volume, repetition, virality, coordinated reports, or community confidence cannot substitute for evidence.

Durability does not override privacy, lawful deletion, safety, source protection, or evidentiary restrictions. Sensitive originals may remain with competent custodians while the platform preserves a limited procedural attestation and provenance record.

### Article 85: Systemic problems are graphs, not giant threads

A broad structural problem may contain linked incidents, geographic cases, institutional failures, dependencies, legal-reform cases, implementation efforts, and recurrences. Each linked problem retains its own evidence status, jurisdiction, affected population, stewardship, authority map, lifecycle, and outcome.

A parent case may identify a pattern without declaring every child claim true. A child case may be resolved while the systemic parent remains active. Aggregation must disclose inclusion criteria, independence assumptions, missing data, uncertainty, and the difference between platform reports and real-world prevalence.

Mass participation must be routed into bounded tasks, evidence requests, translations, incident workspaces, review queues, proposals, implementation offers, and verification. A large audience does not acquire authority merely through size.

### Article 86: Responsibility and blockers require evidence

The platform may hold institutions and public offices accountable for documented duties, actions, commitments, delays, and outcomes. It must distinguish asset ownership, operation, maintenance, funding, permission, implementation, oversight, investigation, adjudication, and remedy authority.

Responsibility attribution requires evidence of relevant duty or authority, applicable jurisdiction and term, notice or reasonable opportunity to know, capacity to act, documented action or inaction, dependencies, inherited conditions, and outcomes. Occurrence during a term is not by itself proof of responsibility.

A blocker record describes a blocked task, responsible role, requested action, deadline, response, dependency, evidence, and next lawful route. It must not infer a person's motives, moral character, corruption, conspiracy, or guilt without appropriately authoritative evidence. Blocker classifications are contestable and appealable.

### Article 87: Community participation does not manufacture implementation authority

**Founder decision**

Communities should be able to accelerate diagnosis, evidence collection, design, public follow-up, lawful funding, procurement, implementation support, monitoring, and verification. Public institutions should be involved at the exact points where their ownership, permission, statutory duty, technical authority, inspection, connection, or maintenance responsibility is required.

Community support does not authorize modification of public assets, hazardous work, unauthorized excavation, handling of dangerous material, interference with investigations, or professional work requiring qualifications. Every intervention must identify ownership, authority, permits, competence, safety, liability, downstream effects, cost distribution, maintenance, stopping conditions, and verification.

The system must distinguish public delivery, community-controlled delivery, hybrid delivery, and temporary mitigation. Government delay must not automatically transfer public costs or obligations to residents, especially when that would burden poorer or less powerful affected groups.

### Article 88: Procedural action and commitment memory

The platform should record lawful actions such as complaints, notices, public-information requests, inspections, administrative appeals, public court records, meetings, public hearings, peaceful demonstrations, technical assessments, commitments, funding requests, and implementation updates.

Each record should identify purpose, responsible group, institutional destination, date, source or receipt, status, deadline, dependency, next step, and required professional review. The platform organizes public procedural information but does not become a lawyer, investigator, engineering authority, court, police service, or government office.

Corrections must not silently rewrite history. Preserve the original record, corrected value, reason, authorizing process, supporting evidence, and timestamp, subject to privacy and lawful deletion requirements.

### Article 89: Democratic accountability without platform sovereignty

**Founder decision**

The platform may produce evidence-backed, jurisdiction-specific civic accountability reports that help the public understand unresolved problems, responsible institutions, commitments, actions, delays, blockers, implementation, outcomes, and recurrence across relevant terms.

The platform may inform democratic and electoral judgment. It must not tell a person whom to vote for, endorse a candidate or party, optimize for political conversion, infer private political beliefs, sell or share voter profiles, or conduct behavioral political targeting. Voters retain political judgment; the platform supplies documented records, comparisons, uncertainty, and user-controlled views.

Institutional accountability, administration-term accountability, and electoral commitments must remain distinct. Reports should be multidimensional rather than reduced to one unexplained score.

### Article 90: Narrow public-candidate identity exception

**Founder decision and explicit exception to Articles 54, 61, 69, 70, and 81**

Ordinary problem discussion continues to use institutions and exact time-specific role aliases rather than personal names. Private individuals remain unnamed.

A dedicated election-accountability layer may identify a verified public candidate, elected officeholder, or official political party by name only when identity is necessary to attribute a public candidacy, term, proposal, commitment, official response, vote, or documented act relevant to the office.

Identity must come from authoritative election, party, legislative, or institutional sources. The record must remain limited to public capacity. Family, private life, personality, rumors, protected characteristics, irrelevant history, and crowdsourced character judgments remain prohibited. Named public records receive equal evidence, response, correction, and appeal rules across political affiliations.

This exception does not authorize named-person accusation threads, personality rankings, guilt determination, harassment, targeting, or public investigation.

### Article 91: Transparent issue prominence, not a partisan blunder list

The platform may show highest-impact documented public problems through multiple transparent views, including severity, affected scope, duration, rights impact, evidence strength, recurrence, overdue commitments, government authority, and geographic relevance.

It must not create one opaque or authoritative list of `worst leaders` or `biggest blunders`. Every prominent placement must expose criteria, material inputs, uncertainty, policy version, conflicts, and appeal rights. Alternative views must remain available, and severe minority problems must not be buried for lack of engagement.

Popularity, follower count, signatures, reposts, and volume may describe reach or public support. They do not establish truth, responsibility, expertise, or legitimacy.

### Article 92: Public proposals and commitments remain hypotheses until verified

Candidates, parties, officeholders, institutions, experts, and communities may submit structured proposals. Every proposal should identify applicable problems, authority, mechanism, cost, funding, institutions, dependencies, risks, timeline, success measures, transparency commitments, and conflicts of interest.

Public commitments should preserve exact wording, source, date, office, jurisdiction, term, conditions, revisions, implementation evidence, and outcome. The platform must distinguish proposed, formally committed, authorized or elected, implementation due, started, delayed, partially implemented, completed, outcome pending, outcome verified, failed, withdrawn, and blocked by documented dependency.

A promise is not an achievement. Activity completion is not necessarily a public outcome. Self-reported success is not independent verification. Proposal popularity or AI confidence does not prove feasibility or effectiveness.

### Article 93: Neutral voter briefs

Where legally and operationally enabled, the platform may generate a voter brief for a selected jurisdiction. It may compare documented problems, responsible offices, institutional performance, candidate or party responses, proposal completeness, authority, cost, dependencies, risks, prior commitments, outcomes, and material missing information.

The person controls issue priorities and makes the final judgment. The platform must not output a voting instruction, endorsement, personalized persuasion score, covert ideological classification, or claim that one candidate is morally superior. Comparisons must explain their evidence and limitations.

No candidate, party, government, funder, advertiser, or platform employee may purchase, suppress, or secretly alter prominence, moderation, evidence standards, report-card criteria, or voter-brief results.

### Article 94: Election-accountability enablement gate

Election-accountability features are disabled by default. A jurisdiction may enable them only after qualified review of election law, defamation, data protection, human rights, candidate identity sources, constituency boundaries, political advertising restrictions, correction rights, moderation capacity, and election-period security.

Enablement requires:

- Authoritative candidate, party, office, term, and constituency sources
- Equal response, correction, and appeal rules
- Independent conflict-checked review
- Anti-bot, anti-brigading, and coordinated-influence controls
- Transparent report and ranking versions
- No paid political promotion or voter-data sale
- No behavioral political targeting
- Expedited but fair high-impact correction procedures
- Election-period change controls and incident response
- External audit where practical
- Public disclosure of material data gaps

The layer must fail closed when source integrity, legal coverage, moderation capacity, neutrality controls, or safety protections are insufficient. Election urgency must never justify lowering evidentiary or rights standards.

### Article 95: Centralized launch with a protected path to decentralization

**Founder decision**

The initial production platform is a founder-hosted centralized reference deployment. A parallel open-source decentralization program begins at project formation and develops portability, federation, independent node conformance, distributed trust, and encrypted-storage experiments without delaying the first verified problem-resolution workflow.

Centralized launch authority is transitional operational responsibility, not a permanent constitutional claim over the network. The reference implementation must preserve globally unique identities, origin and protocol metadata, framework-light domain rules, event-oriented consequential history, provider abstractions, signed export and import, and open protocol schemas so that users, communities, and public knowledge are not structurally trapped in one host.

The community may propose, implement, and test decentralized designs through a public RFC and conformance process. No proposal gains production authority merely through popularity, novelty, token ownership, infrastructure contribution, or claims of decentralization. Sensitive-data federation, storage, computation, identity, or recovery requires threat modelling, privacy and legal review, adversarial testing, recovery and deletion evidence, independent security assessment, and explicit approval.

DNS may bootstrap discovery but must not become the permanent universal coordination or trust authority. Anchor, civic, relay, storage, witness, and compute capabilities should remain separable. No operator, node class, domain, software distributor, signing key, funder, or governance body should independently gain enough authority to control discovery, decrypt all restricted data, rewrite public history, approve its own conduct, or make network recovery impossible.

The project must measure decentralization across hosting, discovery, identity, data custody, signing, protocol control, software distribution, moderation, governance, funding, domain control, and recovery. Open source, multiple servers, encryption, or blockchain use alone does not establish meaningful decentralization.

The launch principle is:

> **Centralized operationally at launch, portable structurally, open at the protocol boundary, and replaceable by design.**
> 

### Article 96: Public-facing AI assumes personal data

**Founder decision**

Every public-facing AI interaction must be designed under the assumption that inputs, attachments, retrieved context, intermediate representations, and outputs may contain personal data, sensitive personal data, third-party information, precise locations, secrets, or restricted evidence. A person's intention to create a public problem does not make raw intake public or safe.

Raw intake remains private and transient until a purpose-bound privacy process minimizes it and the person approves the publishable representation. Restricted evidence, identity material, moderation secrets, and private drafts must not enter general-purpose public AI environments.

Production AI processing must use an approved privacy gateway, minimum-necessary context, authorization before retrieval, safe model routing, bounded retention, non-training commitments, output screening, minimal logging, deletion controls, and a safe non-AI fallback. Consumer chat services, personal accounts, free endpoints, plugins, and contributor tools are not approved merely because they are accessible.

AI output remains untrusted and potentially identifying. It cannot be published automatically. The platform must detect direct and indirect identifiers, preserve user meaning, expose material transformations, and fail closed to a private draft when privacy assurance is insufficient.

No model provider, local deployment, confidential-computing claim, encryption feature, or contractual promise eliminates the need for data minimization, threat modelling, legal review, adversarial testing, human control, and incident readiness.

### Article 97: Bounded, cached, evidence-routed inference

**Founder decision**

The platform must not place the complete constitution, every jurisdiction law, all workflow rules, and full conversational history into every AI request. It must compile and retrieve the smallest applicable rule set, divide work into typed bounded stages, preserve source and rule coverage, and escalate whenever splitting would omit a mandatory dependency or exception.

Stable public instructions and policy components should be cached aggressively in canonical form. Personal, restricted, or user-specific content requires isolated namespaces, minimum retention, encryption, authorization re-checks, deletion propagation, and protection against cache side channels. A cache hit cannot bypass current law, policy, consent, authorization, or publication review.

The model gateway should use deterministic code or a valid cache first, then route to the cheapest approved model that has passed the required task, language, privacy, context, and risk thresholds. It should escalate to stronger or independent models and qualified humans when confidence, coverage, safety, or consequence requires it. Cost never authorizes weaker privacy or constitutional protection.

Model selection must be governed by versioned evaluations and measured production outcomes rather than brand, benchmark publicity, or assumed intelligence. Required measurements include policy coverage, exception handling, PII safety, grounding, calibration, schema reliability, multilingual performance, human correction, latency, cache behavior, and total cost per safe accepted result.

No AI model may authorize its own consequential action, count as an independent human approval, or silently route data to a provider, region, retention policy, or model version that has not been approved.

### Article 98: A completely non-monetary platform

**Revised founder decision superseding the earlier Wikimedia-style approach**

The platform itself must not collect, hold, transfer, distribute, account for, intermediate, or optimize money. It has no subscriptions, usage fees, paywalls, donations, fundraising campaigns, dues, advertisements, sponsorship auctions, wallets, balances, tokens, escrow, bounties, cash rewards, paid placement, revenue sharing, or platform treasury.

Ordinary people use the public civic workflow without payment. Node operators, maintainers, experts, institutions, companies, communities, and individuals ordinarily contribute infrastructure, labor, knowledge, and services in kind and bear their own external costs. Contribution creates factual acknowledgment and public pride, not financial credit, ownership, governance weight, data access, moderation authority, ranking influence, or protocol privilege.

The platform may maintain a verified non-financial support ledger and display standardized acknowledgments such as `This page is hosted by…`, `These servers are operated by…`, or `Translation for this language is supported by…`. Recognition must remain factual, proportionate, non-tracking, non-personalized, non-transferable, conflict-disclosed, and separate from civic content. It is not advertising or endorsement.

A rare unavoidable external cost may be described as a time-bounded cost need only when an in-kind alternative is unavailable. Any supporter pays the named vendor, nonprofit, NGO, public institution, or competent recipient directly outside the platform. The platform never receives funds, stores payment information, maintains balances, issues receipts, pools donations, mediates refunds, or disburses money.

Real-world solutions may require funding, procurement, grants, wages, materials, or public budgets. Those financial processes remain outside the platform. The platform may document the need, relevant authority, external public-benefit route, procedural status, and implementation evidence, but it cannot become the payment, crowdfunding, contracting, or financial-accountability system.

Operational continuity must come from low-cost architecture, voluntary in-kind support, replaceable providers, many independent operators, guided community-node deployment, open deployment instructions, portability, mirrors, signed releases, and federation—not centralized fundraising. A person in an uncovered area should be able to bootstrap a small node through a provider-neutral wizard, but experimental operation must not be mistaken for verified public coverage.

A node's operator or community group may pay its hosting provider directly outside the platform and may arrange external cost sharing as participation grows. The platform never collects, allocates, tracks, or conditions civic rights on those payments. Paying for infrastructure does not confer ownership of community data or authority over governance, moderation, rankings, evidence, or public problems.

The project must disclose support concentration and remain able to survive the withdrawal or misconduct of a major host.

### Article 99: Community-started nodes for uncovered areas

**Founder decision**

When no compatible node covers a person's selected area, the client should allow that person to request coverage or start a small community node through a guided, provider-neutral deployment. The experience must be usable by a motivated non-technical person while clearly explaining operator duties, external costs, privacy, security, moderation, legal jurisdiction, updates, backups, and continuity.

One person may bootstrap a sandbox or invited pilot. Public qualification requires conformance, explicit capability approval, recovery, governance, moderation, privacy, security, and jurisdiction readiness. A deployed server is not automatically a trusted civic node, public authority, or lawful custodian of restricted data.

The reference profile must remain small and inexpensive: one modular application, one relational database, minimal permitted storage, automatic TLS, backups, updates, health checks, export, and bounded observability. It must not require Kubernetes, microservices, a search cluster, local large-model inference, or distributed storage merely to support a small group.

Operators and community members handle provider payment outside the platform. They may voluntarily share the external cost through the provider or an independent organization, but the platform does not collect money, maintain balances, assign shares, disclose payers, issue receipts, or make participation conditional on payment. Financial support creates no ownership, governance, moderation, data-access, or ranking privilege.

Every community node must have a safe migration and failure path. Hosting expiry, failed payment, operator disappearance, account compromise, or provider shutdown must not silently expose private data, erase public history, or transfer community authority.