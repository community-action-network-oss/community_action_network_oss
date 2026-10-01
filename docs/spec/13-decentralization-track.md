### Proposed decentralized node roles

The decentralization program should evaluate distinct node capabilities rather than treating every computer as a complete trusted server.

#### Anchor nodes

Independently operated bootstrap and trust-metadata nodes may publish signed node directories, supported protocol versions, constitutional and jurisdiction-policy hashes, software-release metadata, relay addresses, revocations, quarantine decisions, and network-health information. Anchor nodes must not route every request, hold universal decryption keys, own all problems, or unilaterally control network membership. Consequential anchor actions should use threshold approval across independent operators.

#### Civic instance nodes

Civic nodes run compatible problem-solving services for a community, jurisdiction, or organization. A problem normally has an authoritative home node, while compatible nodes may mirror public records and exchange signed events. Node authority is scoped and does not manufacture legal, political, or constitutional legitimacy.

#### Community-started civic nodes

**Founder direction:** A non-technical person in an uncovered area should be able to open the client, discover that no compatible node currently serves the selected area, and start a small civic node through a guided deployment. For example, a person in an uncovered part of a large city could create an experimental local node, invite a small stewardship group, and progressively qualify it for broader public operation.

The client should say approximately:

> **This area is not currently covered by a compatible civic node. You can follow nearby public problems, request coverage, or help start a community node.**

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

A provisional product target is that the basic non-AI node for approximately 25 to 100 low-activity participants should fit on a single low-cost instance and remain within an approximately US$10 to $20 monthly infrastructure envelope in commonly available regions. This is a design target, not a price promise. AI inference, heavy media, SMS, email, high egress, enhanced backups, legal compliance services, and rapid traffic growth must be measured separately.

#### External group cost sharing

The platform remains non-monetary, and the rules are canonical in `20-participation-nonmonetary.md` ("Completely non-monetary platform", "Rare external cost-request procedure", "Supporter independence"). For nodes: the operator or small group pays the provider directly, outside the platform. A node page may show its hosting provider and profile, an operator-supplied cost band, capacity bands, and whether the node seeks in-kind hosting or a rare external cost-need record. It must not collect or route money, keep balances, reveal who paid, or turn paying a bill into ownership, votes, moderation power or prominence.

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

### Parallel decentralization workstream

This workstream starts after the slice-1 seams exist (D-22) and proceeds alongside the numbered product phases without becoming a production dependency. Not in the initial plan corpus.

#### Milestone D0: Structural portability

The four seams (UUIDv7 identifiers, `origin_node_id`, `protocol_version`, append-only events) ship with slice 1. D0 adds the rest of the structural-portability list in `12-decentralization-ready.md` ("Decentralization-ready requirements"):

- Versioned protocol vocabulary and protocol schemas
- Signed export and import bundles
- Storage, identity and signing abstractions
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

