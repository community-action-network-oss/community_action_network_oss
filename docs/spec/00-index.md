# Specification index

The Community Action Network (CAN) is an open-source platform where people turn public problems into evidence, lawful solutions and tracked outcomes. This folder is its specification. It was split from one large document so that people and agents can load only what they need. Every file is 25KB or less.

**Current stage:** concept and scaffolding. Nothing handles real problems yet.

## What to load

| Work | Load |
|---|---|
| Any slice-1 work | `01-slice-1-brief.md` and `02-agent-rules.md` first, always |
| Lifecycle, states, transitions | `01` (owns the table), `05` |
| Roles, who may do what | `01`, `04` |
| Moderation, appeals, jurisdiction | `01` (section 5), `06`, constitution chapters IV and V |
| Evidence, claims, systemic graph | `07` (Phase 7 design), constitution chapter III |
| Architecture, repositories, API, stack | `11`, `12` |
| Data model | `01` (section 10), `10`, `docs/design/` |
| AI of any kind | `14`, `15` (nothing live in slice 1) |
| Security, accessibility, testing, metrics | `16` |
| UX and design | `17`, `docs/design/ux/` |
| Phases, gates, timing | `18` |
| Which documents must exist | `19` |
| Participation and the non-monetary rules | `20` |
| Open source, governance, license | `21` |
| External contributors using AI | `22` |
| Anything undecided | `docs/open-questions/`, then `23` |
| Elections, civic protocol, decentralization | `08`, `09`, `12`, `13` (all later phases) |

## Files

| File | Covers |
|---|---|
| `01-slice-1-brief.md` | Slice 1 scope and defaults, the lifecycle state and transition table, moderation decision fields, contribution-type enum, "solved", sign-in, draft retention, minimal entity list, accessibility baseline |
| `02-agent-rules.md` | Agent mandate, autonomy rules, unattended-run rule, founder-operated agent pipeline, first instruction |
| `03-scope.md` | Canonical scope and non-goals, product definition, core outcome, initial release hypothesis |
| `04-roles-stewardship.md` | Canonical platform roles, authorization, problem stewardship groups |
| `05-lifecycle-participation.md` | Lifecycle design rules, submission requirements, structured participation, solution decisions |
| `06-moderation-geo-governance.md` | Moderation pipeline, community grounding, geography, playbooks, platform governance |
| `07-systemic-evidence.md` | Problem graph, claim and evidence ledger, timelines, blockers, community implementation, mass participation |
| `08-election-accountability.md` | Civic accountability and election information (Phase 8) |
| `09-civic-protocol.md` | Shared Civic Protocol with the political organizing platform (deferred) |
| `10-data-model.md` | Long-term entity menu |
| `11-architecture.md` | The three repositories, frontend and backend stack, API principles |
| `12-decentralization-ready.md` | Centralized-first decision, the four seams, decentralization-ready constraints |
| `13-decentralization-track.md` | Node roles, federation, storage, working group, milestones D0 to D5 |
| `14-ai-privacy-gateway.md` | AI status, the privacy gateway, data zones, operational gates |
| `15-ai-inference.md` | Policy objects, staged inference, caching, model routing, cost |
| `16-security-a11y-ops-testing.md` | Security, accessibility, operations and metrics, test categories |
| `17-ux.md` | UX principles, information architecture, problem workspace, design contribution |
| `18-phases-gates.md` | Phases 0A to 8, Gate X, indicative timing, pilot-ready |
| `19-artifacts.md` | Index of required project artifacts |
| `20-participation-nonmonetary.md` | Participation sequence, "one hour, one problem, one step", non-monetary rules, supporter independence |
| `21-open-source-governance.md` | Growth, governance, decision process, contribution ladder, license strategy |
| `22-ai-contribution-policy.md` | AI-assisted contribution policy for external contributors |
| `23-open-decisions.md` | Map from the original open-question list to `docs/open-questions/` |
| `constitution/` | The constitution (chapters I to XI), `map.tsv`, `rules.md`; start at `constitution/README.md` |
| `split-map.tsv`, `tools/` | Provenance of the split and the check scripts |

## Glossary

- **Problem:** a shared public condition, institutional failure, recurring pattern or structural cause. Never an individual's private matter. Replaces the older word "case".
- **Initiator:** the member who submitted a problem. Provisional steward in slice 1. Does not own the problem.
- **Steward:** a person responsible for coordinating one problem. Not a platform-wide authority. Different from **Project steward**, a rung on the open-source contribution ladder.
- **Moderator:** a volunteer who reviews submissions and confirms publish, solved, closed and redirected.
- **Observer:** a platform role that follows a problem. Different from **Watcher**, the first rung of the contribution ladder.
- **Core participant, visitor:** whether a person has a material connection to the affected scope.
- **Contribution:** a typed piece of participation (one value of the enum in `01`).
- **Evidence tier:** how well a claim is supported (Constitution III.4). **`investigation_needed`** is a flag derived from the tier, not a state.
- **Decision record:** the public record of how a solution was chosen and why.
- **Moderation decision:** a recorded decision with rule ids, field reference, revision hint and appeal deadline.
- **Interim decision:** a decision made while there is no independent review panel, labelled "Interim decision, will be re-reviewed".
- **Resolution record:** the unranked archive entry for a solved, closed or redirected problem. It replaces an older name that implied ranking.
- **Stuck:** documented effort hit a blocker; the blocker stays public. **Paused:** on hold with a reason and resume condition. Neither is terminal.
- **Slice 1:** the smallest end-to-end build (`01`).
- **Seams:** the four decentralization hooks kept from the start: UUIDv7 ids, `origin_node_id`, `protocol_version`, append-only events with a nullable `prev_hash`.
- **Policy pack:** a versioned, reviewed set of jurisdiction rules.
- **Gate X:** the checkpoint before opening to wider participation (`18`).
- **Open question (OQ):** an undecided item with a current default, tracked in `docs/open-questions/`.

## Links

- Open questions: [`../open-questions/`](../open-questions/README.md)
- Design (system design, ERD, UX): [`../design/`](../design/)
- Architecture decisions: [`../adr/`](../adr/)
- Decision log: [`../../DECISIONS.md`](../../DECISIONS.md)
- Constitution: [`constitution/README.md`](constitution/README.md)
- Manifesto: [`../../manifesto.md`](../../manifesto.md)
