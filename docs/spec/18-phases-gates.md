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

Each phase must end with a demonstrable product increment, evidence against acceptance criteria, open risks, and a clear go or no-go decision.

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

