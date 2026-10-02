# 06 Review and decisions

## What maintainers check

A human reads for intent, design, test quality and risk, not only a green CI. Typically: the unit's acceptance list and verify output, that the change stays inside scope, the decisions in [DECISIONS.md](../../DECISIONS.md), accessibility, privacy and licensing. High-risk areas (authentication, moderation, identity, cryptography, evidence privacy, migrations) get designated reviewers and more evidence. AI review is advisory and never replaces a human approval.

Maintainers may ask you to split the pull request, add a design note or reduce scope before review continues. There is no stated review turnaround; the project does not promise one. See [CONTRIBUTING.md](../../CONTRIBUTING.md) for the review expectations.

## Who decides what

| Question | Where it goes |
|---|---|
| A settled product choice | already in [DECISIONS.md](../../DECISIONS.md); do not reopen in a pull request |
| A technical choice with lasting effect | an ADR in [docs/adr](../adr/README.md) |
| Something nobody can answer yet | an `OQ-*.md` file in [docs/open-questions](../open-questions/README.md) |
| A unit's status | maintainers only |
| Merging pointer bumps | maintainers only |

Flow for an open question: proposal, discussion, a founder or governance decision, then a log entry in `DECISIONS.md`. Governance background is in [open-source governance](../spec/21-open-source-governance.md).

## Escalation

- Stuck on a unit: comment on your claim issue and say what you tried.
- A review disagreement: explain your reasoning in the pull request; if it is a product rule, open an open question.
- Conduct concerns: [CODE_OF_CONDUCT.md](../../CODE_OF_CONDUCT.md).

## Security reports

Never open a public issue or pull request for a vulnerability. Follow [SECURITY.md](../../SECURITY.md). Reports must be verified by a human.
