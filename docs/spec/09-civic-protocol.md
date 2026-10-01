## 12B. Shared Civic Protocol and political organization interoperability

> **Founder direction:** The Open Problem-Solving Platform and the Open Political Organizing Platform are distinct products connected through one shared Civic Protocol and public civic data graph. They must not depend on one permanent shared internal application database.

**Status:** deferred to the decentralization track (D-22). The Open Political Organizing Platform has its own specification, which is not in this repository. Treat this file as design intent for a later protocol, not as work for slice 1. The AT Protocol choice below is a leading option to be confirmed by a bounded spike, not a decision.

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

Use AT Protocol as the leading candidate public-data substrate unless a bounded technical spike demonstrates a material blocker. Define independently governed Civic Protocol Lexicons and application services on top of AT Protocol rather than forking the Bluesky product or representing civic objects as ordinary social posts.

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

