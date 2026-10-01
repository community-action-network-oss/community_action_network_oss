# Chapter IX. Decentralization and nodes

Track D, except IX.2 which binds slice 1 through a small set of seams. Moved verbatim from Arts 28, 38, 95 and 99, with light edits.

### IX.1 ANTI-CAPTURE: Anti-capture
*Status: Decided · Old: Art 28 · First phase: D*

**Founder position**

No person, company, government, administrator, or infrastructure provider should be able to take control of the whole network. The platform should use distributed databases and multiple communicating servers while preserving performance.

**Adversarial refinement**

Distribution of servers alone does not distribute power. Control may concentrate through software updates, identity issuance, domain names, application stores, model providers, moderation policies, signing keys, hosting support, ranking, or governance.

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

Rules: none yet.

### IX.2 LAUNCH-PORTABLE: Centralized launch, portable structure
*Status: Decided · Old: Art 95 · First phase: S1*

**Founder decision**

The initial production platform is a founder-hosted centralized reference deployment. A parallel open-source decentralization program begins at project formation and develops portability, federation, independent node conformance, distributed trust, and encrypted-storage experiments without delaying the first verified problem-resolution workflow.

Centralized launch authority is transitional operational responsibility, not a permanent constitutional claim over the network. The reference implementation must preserve globally unique identities, origin and protocol metadata, framework-light domain rules, event-oriented consequential history, provider abstractions, signed export and import, and open protocol schemas so that users, communities, and public knowledge are not structurally trapped in one host.

The community may propose, implement, and test decentralized designs through a public RFC and conformance process. No proposal gains production authority merely through popularity, novelty, token ownership, infrastructure contribution, or claims of decentralization. Sensitive-data federation, storage, computation, identity, or recovery requires threat modelling, privacy and legal review, adversarial testing, recovery and deletion evidence, independent security assessment, and explicit approval.

DNS may bootstrap discovery but must not become the permanent universal coordination or trust authority. Anchor, civic, relay, storage, witness, and compute capabilities should remain separable. No operator, node class, domain, software distributor, signing key, host, supporter, or governance body should independently gain enough authority to control discovery, decrypt all restricted data, rewrite public history, approve its own conduct, or make network recovery impossible.

The project must measure decentralization across hosting, discovery, identity, data custody, signing, protocol control, software distribution, moderation, governance, support concentration, domain control, and recovery. Open source, multiple servers, encryption, or blockchain use alone does not establish meaningful decentralization.

The launch principle is:

> **Centralized operationally at launch, portable structurally, open at the protocol boundary, and replaceable by design.**
> 

Slice-1 seams: UUIDv7 identifiers, `origin_node_id`, `protocol_version`, and an append-only events table with a nullable `prev_hash`. Signing, export, and AT Protocol wait for the D-track.

Rules: DECENT-1

### IX.3 NODE-COMPROMISE: Compromised node
*Status: Decided · Old: Art 38 · First phase: D*

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

Rules: none yet.

### IX.4 COMMUNITY-NODES: Community nodes
*Status: Decided · Old: Art 99 · First phase: D*

**Founder decision**

When no compatible node covers a person's selected area, the client should allow that person to request coverage or start a small community node through a guided, provider-neutral deployment. The experience must be usable by a motivated non-technical person while clearly explaining operator duties, external costs, privacy, security, moderation, legal jurisdiction, updates, backups, and continuity.

One person may bootstrap a sandbox or invited pilot. Public qualification requires conformance, explicit capability approval, recovery, governance, moderation, privacy, security, and jurisdiction readiness. A deployed server is not automatically a trusted civic node, public authority, or lawful custodian of restricted data.

The reference profile must remain small and inexpensive: one modular application, one relational database, minimal permitted storage, automatic TLS, backups, updates, health checks, export, and bounded observability. It must not require Kubernetes, microservices, a search cluster, local large-model inference, or distributed storage merely to support a small group.

Operators and community members handle provider payment outside the platform. They may voluntarily share the external cost through the provider or an independent organization, but the platform does not collect money, maintain balances, assign shares, disclose payers, issue receipts, or make participation conditional on payment. Financial support creates no ownership, governance, moderation, data-access, or ranking privilege.

Every community node must have a safe migration and failure path. Hosting expiry, failed payment, operator disappearance, account compromise, or provider shutdown must not silently expose private data, erase public history, or transfer community authority.

Rules: MONEY-0
