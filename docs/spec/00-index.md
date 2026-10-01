# Specification index

The Community Action Network (CAN) is an open-source platform where people turn public problems into evidence, lawful solutions and tracked outcomes. This folder is its specification. It was split from one large document so that people and agents can load only what they need. Every file is 25KB or less.

**Current stage:** concept and scaffolding. Nothing handles real problems yet.

## What to load

| Work | Load |
|---|---|
| Any slice-1 work | `01-slice-1-brief.md` and `02-agent-rules.md` first, always |
| Lifecycle, states, transitions | `01a` (problem states, T-table), `01b` (stage plan, stage states, gating), `05` |
| Roles, who may do what | `01`, `04` |
| Moderation, appeals, jurisdiction | `01` (section 5), `06`, constitution chapters IV and V, `docs/design/ai/README.md` |
| Evidence, claims, systemic graph | `07` (Phase 7 design), constitution chapter III |
| Architecture, repositories, API, stack | `11`, `12` |
| Data model | `01` (section 10), `10`, `docs/design/` |
| AI of any kind | `14`, `15` (slice-1 core; live provider founder-gated), `docs/design/ai/README.md` |
| Security, accessibility, testing, metrics | `16` |
| UX and design | `17`, `docs/design/ux/` |
| Phases, gates, timing | `18` |
| Which documents must exist | `19` |
| Participation and the non-monetary rules | `20` |
| Open source, governance, license | `21` |
| External contributors using AI | `22` |
| The Archive, reuse, suggested paths | `24`, constitution IV.7 |
| Anything undecided | `docs/open-questions/`, then `23` |
| Elections, civic protocol, decentralization | `08`, `09`, `12`, `13` (all later phases) |

## Files

| File | Covers |
|---|---|
| `01-slice-1-brief.md` | Slice 1 scope and defaults (full AI pipeline, structured content, persona simulation proof, graduation gate), moderation decision fields, contribution-type enum, "solved", sign-in, draft retention, minimal entity list, accessibility baseline |
| `01a-lifecycle.md` | The problem state classes, the transition table T00 to T22 and the old to new T-id map (single owner of problem states) |
| `01b-stages.md` | The stage plan (a DAG), stage states, the stage transition table ST01 to ST11, stage gating, work inside a stage, contributions ahead of time, the `classic-5` template (single owner of stage states) |
| `02-agent-rules.md` | Agent mandate, autonomy rules, unattended-run rule, founder-operated agent pipeline, first instruction |
| `03-scope.md` | Canonical scope and non-goals, product definition, core outcome, initial release hypothesis |
| `04-roles-stewardship.md` | Canonical platform roles, authorization, problem stewardship groups |
| `05-lifecycle-participation.md` | Lifecycle design rules, submission requirements, structured participation, solution decisions |
| `06-moderation-geo-governance.md` | Moderation pipeline (community-legislated, AI-executed), community grounding, geography, playbooks, platform governance |
| `07-systemic-evidence.md` | Problem graph, claim and evidence ledger, timelines, blockers, community implementation, mass participation |
| `08-election-accountability.md` | Civic accountability and election information (Phase 8) |
| `09-civic-protocol.md` | Shared Civic Protocol with the political organizing platform (deferred) |
| `10-data-model.md` | Long-term entity menu |
| `11-architecture.md` | The repositories (three, plus planned `can_policy`), frontend and backend stack, API principles |
| `12-decentralization-ready.md` | Centralized-first decision, the four seams, decentralization-ready constraints |
| `13-decentralization-track.md` | Node roles, federation, storage, working group, milestones D0 to D5 |
| `14-ai-privacy-gateway.md` | AI status (slice-1 core), the privacy gateway, data zones, operational gates |
| `15-ai-inference.md` | The moderation run, policy objects, staged inference, caching, model routing, cost |
| `16-security-a11y-ops-testing.md` | Security, accessibility, operations and metrics, test categories |
| `17-ux.md` | UX principles, information architecture, problem workspace, design contribution |
| `18-phases-gates.md` | Phases 0A to 8, Gate X, indicative timing, pilot-ready |
| `19-artifacts.md` | Index of required project artifacts |
| `20-participation-nonmonetary.md` | Participation sequence, "one hour, one problem, one step", non-monetary rules, supporter independence |
| `21-open-source-governance.md` | Growth, governance, decision process, contribution ladder, license strategy |
| `22-ai-contribution-policy.md` | AI-assisted contribution policy for external contributors |
| `24-archive-reuse.md` | The Archive: archive record, context profile, path suggestions, `DP-ARCHIVE`, `DP-REUSE-FIT`, `DP-STAGE-DRAFT`, license, slice-1 scope |
| `23-open-decisions.md` | Map from the original open-question list to `docs/open-questions/` |
| `constitution/` | The constitution (chapters I to XI), `map.tsv`, `rules.md`; start at `constitution/README.md` |
| `split-map.tsv`, `tools/` | Provenance of the split and the check scripts |

## Glossary

- **Problem:** a shared public condition, institutional failure, recurring pattern or structural cause. Never an individual's private matter. Replaces the older word "case".
- **Initiator:** the member who submitted a problem. Provisional steward in slice 1. Does not own the problem.
- **Steward:** a person responsible for coordinating one problem. Not a platform-wide authority. Different from **Project steward**, a rung on the open-source contribution ladder.
- **Moderator:** the small emergency and legal lane, an auditor of sampled decisions, or a labeler. Does not decide single items.
- **Observer:** a platform role that follows a problem. Different from **Watcher**, the first rung of the contribution ladder.
- **Core participant, visitor:** whether a person has a material connection to the affected scope.
- **Stage plan:** the per-problem graph of stages (series, parallel or mixed) that replaces the old fixed sequence. Each stage has its own acceptance criteria and decision method. The old sequence survives as the optional template `classic-5` (`01b`, D-72).
- **Acceptance criteria:** measurable statements of when something is done. A problem has final criteria (what "solved" means) and each stage has its own (`CRITERIA-1`).
- **Volunteer review:** the private step before publication where opted-in members, with personal data masked, check a problem and recommend changes. Nothing from it is public (`REVIEW-1`).
- **Recommendation:** one volunteer suggestion on a field or metadata path. The poster accepts or declines it with a reason (`RECO-1`).
- **Impacted and guest:** a per-message label. Impacted means sent from inside the problem's affected area at that moment, proved privately. Guest means anything else, always labelled, and hidden by the "Impacted only" filter (D-73, `IMPACT-1`, `GUEST-LABEL-1`).
- **Contribution:** a typed piece of participation (one value of the enum in `01`).
- **Evidence tier:** how well a claim is supported (Constitution III.4). **`investigation_needed`** is a flag derived from the tier, not a state.
- **Decision record:** the public record of how a solution was chosen and why.
- **Moderation decision:** a recorded decision with rule ids, field reference, revision hint and appeal deadline.
- **Interim policy stewardship:** until a ratifying panel exists the founder ratifies the policy pack (Constitution VIII.2). Decisions show "Policy vX, transitional stewardship".
- **Archive:** CAN's second main goal (D-76): the public, unranked record of every ended problem with its whole journey, failed paths and challenges, personal data stripped. Replaces "Resolution records" (D-20). One entry is an **archive record** (`24-archive-reuse.md`).
- **Context profile, path suggestion:** structured context used to match a new problem to archived ones, and a candidate path from archive records adapted to the new problem, always credited and never adopted automatically (`DP-REUSE-FIT`).
- **Stuck:** documented effort hit a blocker; the blocker stays public. **Paused:** on hold with a reason and resume condition. Neither is terminal.
- **Slice 1:** the smallest end-to-end build (`01`).
- **Structured content:** no free-form posting; every content type is a structured response to a community-decided schema in the policy pack (D-58). **`DP-ASSUMPTIONS`** holds back wrong assumptions; **`DP-COMPLETENESS`** checks every required field is answered.
- **Persona simulation:** AI persona agents drive lifecycles through the real pipeline on seeds 1 and 2 and red-team the policy pack (D-55). **Graduation criteria** decide when public participation opens (`docs/design/ai/simulation.md`).
- **Legal layer stack:** L0 CAN rules, L1 UN human rights, L2 supranational where binding, L3 national constitution, L4 national law, L5 regional, L6 city; cumulative constraints applied by every moderation run (D-61, Constitution I.2).
- **Re-resolution:** a policy or legal-corpus change re-examines past solved, closed, redirected and stuck problems and can reopen them (T20 `REOPEN-RULE` and T21 `REOPEN-EVIDENCE`, `DP-RERESOLUTION`, D-59).
- **Seed problem:** a real framing with synthetic evidence, labelled "Seed problem, synthetic evidence"; Amsterdam (NL) is the first jurisdiction overlay (D-56).
- **Seams:** the four decentralization hooks kept from the start: UUIDv7 ids, `origin_node_id`, `protocol_version`, append-only events with a nullable `prev_hash`.
- **Policy pack:** a versioned bundle (semver plus content hash) in the planned `can_policy` repo: rules, one prompt template per decision point, labeled examples, eval sets, thresholds, with layers base, constitution, jurisdiction, local. Design: `../design/ai/policy-pack.md`.
- **Decision point (`DP-*`):** a place where CAN would otherwise need human consensus, with a trigger, inputs, a policy section, an output and a mode (blocking or async). Catalog: `../design/ai/decision-points.md`.
- **Moderation run:** the bounded set of small agents that applies the policy at one event (before publication, on every update, after publication). Every run is recorded (`../design/ai/runtime.md`).
- **Pre-decided and post-decided consensus:** policy is ratified before content arrives (pre-decided). The community then audits outcomes and amends the policy (post-decided).
- **Replay diff:** a re-run of a proposed policy over past decisions that reports what would flip (`../design/ai/amendment-loop.md`).
- **Label task:** a randomized, context-masked human labeling job on one example, from an appeal, an eval set or an audit sample (`../design/ai/appeals.md`).
- **Re-moderation:** applying a new policy version to affected content. A flip shows a visible notice and an appeal path.
- **Gate X:** the checkpoint before opening to wider participation (`18`).
- **Open question (OQ):** an undecided item with a current default, tracked in `docs/open-questions/`.

## Links

- Open questions: [`../open-questions/`](../open-questions/README.md)
- Design (system design, ERD, UX): [`../design/`](../design/). AI model: [`../design/ai/README.md`](../design/ai/README.md)
- Architecture decisions: [`../adr/`](../adr/)
- Decision log: [`../../DECISIONS.md`](../../DECISIONS.md)
- Constitution: [`constitution/README.md`](constitution/README.md)
- Manifesto: [`../../manifesto.md`](../../manifesto.md)
