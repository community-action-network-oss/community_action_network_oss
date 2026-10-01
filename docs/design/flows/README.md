# Execution flows

One file per flow. A flow is a run through the system for one trigger: who starts it, which components talk to which, what is written, what can fail. Components are described in [../components/](../components/README.md); screens in [../ux/](../ux/screens.md); the AI design in [../ai/](../ai/README.md). Lifecycle states and transitions are owned only by [`docs/spec/01-slice-1-brief.md#4-lifecycle`](../../spec/01-slice-1-brief.md#4-lifecycle); flows cite transition ids (T01...) and never restate the table.

Moderation model (D-51): humans legislate policy, AI agents apply it at every event, humans audit and label, and only the emergency and legal lane involves a person per case. Flows therefore show a **moderation run** where older drafts showed a moderator queue.

## Index

| Flow | Trigger | Status |
|---|---|---|
| [auth-signup-signin.md](auth-signup-signin.md) | Invite redeem, sign-in code | planned: 02-u04 to 02-u08, 02-u16 to 02-u18 |
| [intake-submit.md](intake-submit.md) | Submit a draft problem | planned: 03-u05 to 03-u08, 03-u16 to 03-u19; AI parts plan 09 (pending) |
| [content-update.md](content-update.md) | Edit or add content | planned: 03-u06, 04-u02, 04-u03; AI parts plan 09 (pending) |
| [post-publication-recheck.md](post-publication-recheck.md) | Policy change, context change, sampling | plan 09 (pending) |
| [appeal.md](appeal.md) | Appeal a decision | planned: 03-u12, 03-u13 rework; loop plan 09 (pending) |
| [policy-amendment.md](policy-amendment.md) | PR to `can_policy` | plan 09 (pending); repo creation founder-gated (D-52) |
| [lifecycle-transition.md](lifecycle-transition.md) | Any transition request | planned: 03-u01, 03-u05, 03-u07 |
| [contribution-and-proposal.md](contribution-and-proposal.md) | Add contribution, proposal, decision record | planned: 04-u01 to 04-u05 |
| [task-and-verification.md](task-and-verification.md) | Task update, verification, solved | planned: 05-u01 to 05-u04 |
| [emergency-legal-lane.md](emergency-legal-lane.md) | Crisis or legal signal | plan 09 (pending); real routes founder-gated (05-u09) |
| [background-jobs.md](background-jobs.md) | Schedule tick | planned: 03-u14; batches plan 09 (pending) |
| [structured-submission.md](structured-submission.md) | Open any form, submit content | plan 10 (pending) |
| [persona-simulation-run.md](persona-simulation-run.md) | CI, night or founder-gated live run | plan 11 (pending) |
| [seed-bootstrap.md](seed-bootstrap.md) | Maintainer loads seeds 1 and 2 | plan 11 (pending) |
| [policy-schema-change.md](policy-schema-change.md) | PR changing a content schema | plan 10 (pending) |
| [re-resolution.md](re-resolution.md) | Policy or legal-corpus change over past resolutions | plan 09/10 (pending) |
| [legal-corpus-update.md](legal-corpus-update.md) | PR changing a legal corpus in `can_policy` | plan 09/10 (pending) |
| [contract-flow.md](contract-flow.md) | Server API change | partly built (openapi.json exists) |
| [night-run.md](night-run.md) | `/can-code-large night` | built (skill and corpus tool), activation 08-u14 |

Human roles in flows: legislator (writes and ratifies policy), auditor (samples decisions), labeler (masked appeal and eval labels), lane (emergency and legal cases), maintainer (repo, invites, releases). Labels shown to people: "Awaiting review", "Changes requested", "Decided under policy vX" (with "Policy v1, transitional stewardship" while `transitional`).

## Status values
- **built**: code exists in the repo today.
- **partly built**: some steps exist; the diagram marks which.
- **planned (ids)**: specified by those plan units, no code yet.
- **plan 09 (pending)**: depends on the AI plan; unit ids unknown. **plan 09 (pending)** also covers lane, notices, label tasks, re-resolution and legal corpora. **plan 10 (pending)**: structured content (schemas, form renderer). **plan 11 (pending)**: simulation harness and seeds. Portability: plan 07/08 (pending).

Today's code is scaffold only (D-25): `can_server` has `health`, the `events` table and `domain/{ids,event,protocol}`; `can_app` has theme, i18n, API client and five civic components; `can_gallery` has static pages. Everything else in a flow is planned.

## Conventions
Participant names (use exactly these, one alias per box):

| Name | Is |
|---|---|
| `User` | initiator, member, anyone with a browser |
| `App` | can_app (Expo) |
| `API` | can_server HTTP layer (`/v1`) |
| `UC` | the use case in the module's `app/` layer |
| `Eng` | problems transition engine |
| `Mod` | moderation module: DP selector, run recorder, decision applier |
| `Pol` | policy module: pack loader, version registry, cache |
| `GW` | ai-gateway: privacy gateway, router, budgets |
| `LLM` | provider adapter (FakeModel in tests, OpenRouter for live runs (D-65)) |
| `DB` | Postgres |
| `Jobs` | job runner |
| `Mail` | notification port |
| `PolicyRepo` | can_policy |
| `H` | simulation harness (persona runner) |

Rules for every flow file:
1. Sections in order: Purpose, Trigger, Status, Sequence, Failure paths, Data written, Events emitted, DPs invoked, Related.
2. Link DPs to [../ai/decision-points.md](../ai/decision-points.md). DP ids are the canonical ids of that file (19 ids, including DP-ASSUMPTIONS and DP-COMPLETENESS, D-58); it wins on any difference.
3. Any flow that publishes or changes public content must show the moderation gate and what happens when it fails closed (hold).
4. Name events by the `events.eventType` string you expect; mark `planned`.
5. Use mermaid `sequenceDiagram` for interactions and `flowchart` for branching. No em or en dashes.
6. Max 25KB per file. Update the index above in the same PR.

## Adding a flow
Copy the section list, pick a trigger-named file, add a row to the index with a status, link it from the components it touches, run `python3 docs/design/check.py`.

## Shared pieces
The moderation run itself (steps, recording, outcomes) is drawn once in [intake-submit.md](intake-submit.md) and referenced elsewhere as "run". Outcomes: `publish`, `needs_revision`, `reject`, `route_external`, `hold`, `escalate_human`.
