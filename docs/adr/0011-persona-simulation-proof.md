# ADR 0011: Persona simulation is the slice-1 proof

- Status: Accepted, 2026-10-01 (D-55, D-56). Builds on [0008](0008-ai-executed-community-policy.md).

## Context
A policy pack that no one has attacked is a claim, not evidence. Real participants should not be the first adversaries. The founder's earlier plan was to resolve seed problems among hypothetical AI participants before inviting the public.

## Decision
- A simulation harness runs AI persona agents (submitters, contributors, proposers, appellants, adversarial actors) against the real pipeline through the real API, never the database. Everything they create is labeled synthetic.
- Seeds 1 and 2 (Amsterdam safety and city-centre cleanliness) use the real framings with synthetic evidence and no named individuals; Amsterdam (NL) is the first jurisdiction overlay. Seeds 3 and 4 wait for the problem graph.
- Deterministic mode on `FakeModel` runs in CI and night runs. Live persona runs are founder-gated (key, spend cap, DPIA).
- Misses become labeled examples and policy PRs in the amendment loop. Graduation criteria (SIM-GATE-1) decide when public participation opens.
- Design and default criteria: `docs/design/ai/simulation.md`.

## Consequences
- Public participation depends on measured evidence, not a date. Live quality criteria cannot be met by FakeModel alone.
- Work: a harness, persona and seed files, synthetic evidence hosting, reports. Cost is capped by the live gate.
- Proposed rule ids: SIM-GATE-1, SIM-LABEL-1, SIM-NOSECRET-1.
- Risk: personas share model blind spots with the judge. Mitigations: different persona and judge models, human-written adversarial sets, auditor-confirmed labels.

## How to reverse
Open participation by founder decision without the criteria, recorded as an exception in the ratification log. The harness stays useful as a regression tool.
