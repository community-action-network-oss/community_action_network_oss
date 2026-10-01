### Centralized-first delivery with a parallel decentralization program

**Founder decision:** The first production platform will be a founder-hosted centralized reference deployment. Full decentralization is a separate open-source protocol, research and experimentation program that follows the first working workflow. It must not delay the first usable problem-resolution workflow, but the centralized implementation keeps four structural escape routes from the start (D-22): UUIDv7 identifiers, `origin_node_id`, `protocol_version`, and an append-only events table with a nullable `prev_hash`. Signing, export and import, node discovery, federation, distributed storage and AT Protocol are deferred to the decentralization track (`13-decentralization-track.md`).

This file is the **canonical** description of the centralized-first decision and of the decentralization-ready constraints. Other files link here.

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

**Slice 1 builds the four seams listed above and nothing more.** The constraints below are the full design; items beyond the four seams (signing, export and import, provider adapters beyond the interfaces slice 1 needs) arrive with the decentralization track (milestone D0 in `13-decentralization-track.md`).

The reference platform adopts these constraints:

#### Global object identity

Use globally unique, non-sequential public identifiers such as UUIDv7 or an equivalently suitable standard for problems, claims, evidence references, contributions, events, proposals, commitments, institutions, stewardship groups, and outcomes. Public records should be capable of carrying `originNodeId`, `protocolVersion`, and authoritative-location metadata even while only one production node exists.

#### Event-oriented consequential history

Every consequential mutation should create a durable event containing an event ID, object ID and type, event type, origin node, actor or authorized role, timestamp, policy version, payload or payload reference, and a previous-event hash where applicable (nullable in slice 1). The centralized deployment may initially sign events with one service identity, but the event model must not require one universal database forever.

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

### Delivery priority and resource allocation

A fixed capacity split between the reference platform and the decentralization track is deferred. In slice 1 decentralization work is limited to the four seams above. Set a split when the decentralization track starts. This is a planning matter, not a spending authorization.

No production sensitive data should enter experimental peer-to-peer storage or compute systems before independent security review, metadata-leakage analysis, recovery and deletion testing, jurisdictional legal review, abuse-storage threat modelling, and explicit founder approval.

The governing architecture principle is:

> **Centralized operationally at launch, portable structurally, open at the protocol boundary, and replaceable by design.**

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

