## 19. Delivery phases

This is the **canonical** phase list. The timing table is under "Indicative timing" below. Phase contents that are specified elsewhere link there instead of repeating.

**Slice 1** (`01-slice-1-brief.md`) is a cut across phases 1 to 4: invite-only intake, review, typed contributions, proposals, decisions, tasks, verification and appeals on fictional data. It has no playbooks, governance issues or problem graph. Those stay in the phases below.

### Phase 0A: Public concept and founding contributor page

This is the first public build. Create a fast, accessible public site before the full platform: the public gallery of CAN, a read-only observation area where anyone can see what is going on inside the project and learn what CAN is, which also recruits founding contributors. It is the `can_gallery` repository: a Next.js static export with plain CSS, no forms, no analytics and no third-party fetches. English at first, with locale-prefixed routes added later for other languages. It should explain:

- The public and structural problems the project addresses
- Why existing protest, complaint, petition, social-media, and governance channels are insufficient by themselves
- The complete problem-to-verified-outcome vision
- The constitutional principles and explicit non-goals
- The centralized reference-platform and later decentralization strategy (`12-decentralization-ready.md`)
- The current project stage and what does not exist yet
- The `one hour, one problem, one step` contribution idea without promising that one hour alone solves a complex problem
- A call for founding engineers, designers, security and privacy specialists, researchers, legal and policy experts, accessibility reviewers, translators, documentation contributors, and infrastructure partners
- Concrete bounded contribution tasks rather than a generic request to `build everything`
- How decisions are made, how AI-assisted contributions are handled, and how contributor work is reviewed
- Links to the charter, specification, roadmap, governance, code of conduct, security policy, the repository (https://github.com/community-action-network-oss/community_action_network_oss), and `docs/open-questions/`
- A way to get involved that needs no personal data: the repository and its open questions. Any interest form or mailing list is an open question (`docs/open-questions/OQ-promo-interest-channel.md`); until it is answered there is no form and no public roster
- A transparent statement that the platform is not yet an emergency, legal, medical, government, or individual service

The page must not collect detailed civic problems, evidence, political profiles, precise locations, identity documents, or sensitive personal narratives before the protected platform intake exists. Use fictional examples and static verified external resources where useful.

Phase 0A acceptance criteria:

- The public can understand the mission, scope, current stage, safeguards, and ways to help.
- No language implies that the unfinished platform is already handling real problems.
- Every call to contribute maps to a maintained task, owner, review process, and expected outcome.
- The site meets the initial accessibility, privacy, security, analytics, localization, performance, and non-tracking requirements.
- Founding contributors can reach the repository and setup instructions without needing a paid AI tool.

### Phase 0B: Discovery and decisions

- Repository and infrastructure audit
- Stakeholder and user journey map
- Prioritized clarifying questions
- Scope and non-goals
- Launch jurisdiction and language decision (open question, defaulted)
- Product requirements and threat model
- Architecture decision records
- Data classification and retention plan
- Founder-hosted reference deployment plan
- Public concept page, contributor recruitment flow, and founding role-page plan
- Gate X definition for moving from engineering formation to multidisciplinary and public participation
- Decentralization working-group charter and RFC process
- The four decentralization seams of slice 1 (`12-decentralization-ready.md`)
- Initial decentralization threat model and concentration map
- Milestone plan with estimates, risks, and separate reference-platform and community-track allocations

### Phase 1: Foundation

- Three repositories (`11-architecture.md`): `can_server`, `can_app`, `can_gallery`
- Expo Router universal application, with gluestack v5 on UniWind, project-owned civic components, semantic tokens, RTL, accessibility and responsive-layout tests. Verified on web; native builds must bundle (D-8)
- NestJS modular-monolith service with framework-light domain modules
- PostgreSQL schema through Drizzle, migrations, transaction strategy, and a typed persistence boundary
- Code-first OpenAPI contract and generated TypeScript client
- Development environment (docker compose for Postgres and Mailpit) and continuous integration
- Authentication, authorization, audit events, configuration, secrets, and migrations
- Core observability, testing harness and seed data
- The four decentralization seams (`12-decentralization-ready.md`); the rest of the decentralization-ready list is milestone D0 in `13-decentralization-track.md`
- Later, once permitted files exist: object-storage abstraction, deployment pipeline, native device builds, deep-link configuration and cross-platform device smoke tests (founder-gated)

### Phase 2: Safe public problem intake

- Non-identifying structural problem submission
- Evidence tiers and the derived `investigation_needed` flag
- Geography, affected-population, and jurisdiction scoping
- Role-alias and privacy controls
- Duplicate detection (`duplicate_of` is the only link type until the problem graph in Phase 7). Systemic-hypothesis detection waits for Phase 7
- Moderator and distributed-review console
- Explanations, revision, withdrawal, and appeals

### Phase 3: Structured resolution

- Staged problem workspace
- Typed contributions and evidence
- Proposals, comparisons, and decision records
- Participant scopes and rate limits
- Notifications and follow controls

### Phase 4: Implementation and verification

- Plans, tasks, owners, blockers, metrics, and updates
- Verification evidence and terminal transitions
- Resolution records and, later, redacted playbooks

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

Begin only after jurisdiction enablement, legal review, political-neutrality evaluation, and independent oversight are operational. The content of this phase is specified in `08-election-accountability.md` (canonical) and is not repeated here.

### Gate X: Open multidisciplinary participation

Engineers must not open the platform to unrestricted public problem intake merely because the interface looks complete. Gate X is reached only when the founder approves evidence that all of "Definition of pilot-ready" (end of this file) holds and, in addition:

- The bounded vertical slice works from intake through a legitimate terminal state.
- Authentication, authorization, privacy gates, PII handling, moderation, appeals, audit, deletion, backup, restore, incident response, and observability have passed their quality gates.
- The launch jurisdiction and language have qualified policy coverage and human-review capacity.
- Accessibility and low-bandwidth core flows are usable.
- Fictional and controlled pilot data demonstrate the lifecycle without exposing real private matters.
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

### Indicative timing

The phases above are the canonical sequence; this table only adds time. It is a planning default, not a promise.

| Months | Phases | What it proves |
|---|---|---|
| 0 to 2 | 0A, 0B | The project is legible: concept page, charter, governance and contribution documents, a pilot problem and jurisdiction chosen (open questions), license decided (MIT, D-49), low-fidelity UX, domain model, threat model, repository, tests and CI. |
| 3 to 5 | 1 to 4 (slice 1) | The vertical slice runs on fictional data: intake, evidence tiers, workspace, typed contributions, proposals and decisions, implementation tracking, verification, moderation and appeals, accessibility testing, fictional example problems. |
| 6 to 8 | 6 (hardening and pilot) | A controlled pilot with a small real community. Observe the whole journey, record failures and confusion, measure whether the workflow produces meaningful action, publish transparent findings, and correct the workflow before expanding. |
| 9 to 12 | growth; 5 and 7 as capacity allows | Grow maintainership: onboard independent maintainers, formalize justified working groups, publish protocol version `0.1`, release contributor-focused resources, support a second controlled deployment, begin interoperability experiments. Establish a maintainer council only if the contributor base supports it. |

### Strategic growth rule

> **Keep the mission universal, but make every implementation step narrow and verifiable.**

The intended growth path is:

> One constitutional core → one excellent workflow → one verified resolution → several independent contributors → several controlled deployments → an open protocol → a durable federation

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

