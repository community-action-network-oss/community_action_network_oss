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

