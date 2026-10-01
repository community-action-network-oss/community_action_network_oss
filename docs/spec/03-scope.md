# Scope and non-goals

This file is the **canonical** statement of what the platform is and is not. Other files link here instead of repeating it.

## Controlling scope rule

This is a **public and structural problem-solving platform**, not an individual problem-solving service. The unit of collaborative work is a public condition, recurring pattern, institutional failure, geographic issue, shared risk, or structural root cause. An individual's experience may initiate, evidence, corroborate, or reveal that public problem. The platform does not provide personalized therapy, medicine, legal representation, private consulting, investigation, or one-to-one professional handling of a private matter. Any wording elsewhere that implies individualized service must be read according to this rule.

"Problem" always means the shared public problem. An individual's private matter is never called a problem on this platform.

## 2. Product definition

The platform is an open-source, location-aware, law-aware system for resolving **public and structural problems**. People surface civic conditions, recurring harms, institutional failures, geographic issues, shared risks, or systemic root causes. Eligible problems enter a staged public process in which affected communities, local participants, experts, journalists, implementers, and institutions clarify evidence and causes, develop lawful structural solutions, coordinate implementation, and preserve verified outcomes as reusable public playbooks. It also preserves a durable, source-backed memory of institutional responsibility, procedural actions, commitments, blockers, implementation, and outcomes so that communities can coordinate follow-through and, where separately enabled under strict safeguards, make better-informed democratic and electoral judgments.

An individual experience may be the first signal or evidence of a public problem, even when only one report is known. It does not become an individual service request. The platform may provide general routing to an appropriate external institution or resource, but collaborative work centers on the public condition revealed by the experience.

It is not an individual advice service, therapy platform, medical service, legal service, consulting marketplace, personal matter manager, general social network, personality forum, political debate forum, complaint board, petition site, emergency service, or unrestricted discussion platform.

### Core outcome

A valid problem moves from an unstructured real-world concern to an explicit end state. The full state and transition table is owned by `01-slice-1-brief.md`; this is the summary.

- **Solved:** a solution was implemented and sufficiently verified. A steward proposes, a moderator confirms.
- **Closed:** the problem is invalid, duplicated, no longer relevant, or cannot continue under platform rules.
- **Redirected:** a better institution, partner project, emergency channel, political platform, legal process, or specialist service should handle it.
- **Withdrawn / rejected:** the submission was withdrawn by its initiator or not accepted before it was ever published.

Two further states are not terminal:

- **Paused:** progress is temporarily on hold, with a reason and a resume condition.
- **Stuck:** documented effort has hit a blocker. The blocker and the next lawful escalation route stay public. This is the accountable unresolved record.

**Resolution records** are the plain archive of problems that reached `solved`, `closed` or `redirected`: the whole journey, kept for others to learn from. They are listed chronologically and by jurisdiction, never ranked, scored or rewarded, so they give nobody a reason to chase status.

### Success principles

- Real and bounded problems over abstract conflict
- Solutions and implementation over engagement
- Visible progress over endless discussion
- Local agency with useful outside expertise
- Lawful and safe action over viral mobilization
- Explainable moderation over arbitrary enforcement
- Data minimization over surveillance
- Preparation and prevention alongside response (later phases)
- Durable institutional memory over short political attention cycles
- Evidence-backed civic accountability over partisan accusation
- Neutral voter information over platform endorsement or political targeting
- Continuous governance improvement over claims of perfection

## 3. Initial release hypothesis

The first release should prove one complete, safe workflow in one agreed jurisdiction and language. **Slice 1** (`01-slice-1-brief.md`) is the narrowest version of this and owns the exact scope. The long-term workflow:

1. A person creates a pseudonymous account and submits a non-identifying, geoscoped public problem or systemic hypothesis.
2. The platform checks evidence tier, structural framing, affected scope, duplication, privacy, safety, legality, and routing. In slice 1 these are deterministic checks plus human review.
3. A report with weak evidence is flagged `investigation_needed`, a flag derived from its evidence tier, rather than being presented as established fact.
4. An eligible public problem becomes visible across the appropriate platform and jurisdiction surfaces.
5. Participants contribute through structured contribution types rather than a generic feed.
6. Proposals are created, compared, refined, and selected through an explicit decision method.
7. Implementation tasks, owners, evidence, blockers, and updates are tracked.
8. The problem reaches an end state with an audit trail and resolution summary.
9. Later: a solved problem can be published as a reusable playbook after privacy review.
10. Moderation errors can be appealed. Later: platform concerns can be submitted as governance issues.

Do not expand to multiple jurisdictions, app-store releases or native-only features, complex reputation markets, binding voting, payments, or autonomous legal determinations before this vertical slice works. The app is one universal Expo codebase that must still bundle for iOS and Android; in slice 1 it is verified on web only (`11-architecture.md`).
