# Screen inventory (slice 1)

Every screen has a wireframe ID. "State" refers to lifecycle state keys in [`docs/spec/01-slice-1-brief.md#4-lifecycle`](../../spec/01-slice-1-brief.md#4-lifecycle). That table owns state names, public labels, plain explanations, next actions and transition rights; this file only maps states and content types to screens. If a key below does not match the brief, the brief wins. Public labels in the UI always come from the brief's table, never from strings in app code. All forms are rendered from the content schema version (`wireframes/forms.md`).

## Screens

| Screen | Route | Actor | Purpose | Required UI states (see `ui-unit-template.md`) |
|---|---|---|---|---|
| WF-LIST-1, WF-LIST-2 | `/` | anyone | Browse published problems; seed label | loading, empty, error, offline |
| WF-DETAIL-1 | `/problems/{id}` | anyone | Problem workspace, policy badge | loading, error, offline, tombstone |
| WF-DETAIL-2 | same | anyone | Tombstone for withdrawn or removed items | n/a |
| WF-DETAIL-3 | same | anyone | Status variants (paused, stuck, withdrawn, closed, redirected) | n/a |
| WF-RESOLUTION-1 | `/resolutions` | anyone | Resolution records | loading, empty, error |
| WF-SIGNUP-1 | `/sign-up` | anyone | Redeem invite | validation, offline, error |
| WF-SIGNIN-1, WF-SIGNIN-2 | `/sign-in`, `/sign-in/code` | anyone | Email code sign-in | validation, rate limited, offline |
| WF-ONBOARD-1 | `/welcome` | new member | Public name | error |
| WF-SESSION-1 | overlay | member | Session expired | n/a |
| WF-FORM-1 to WF-FORM-5 | pattern | member | Schema-driven form shell, assist, hints, assumptions, version change | validation, offline (local autosave), session-expired, unsupported field, schema version change |
| WF-SUBMIT-1 to WF-SUBMIT-4 | `/report/{section}` | anyone, sign-in at submit | Problem form, sources, privacy check, preview | validation, offline, session-expired |
| WF-EXTERNAL-1 | overlay | anyone | External routes | n/a |
| WF-PENDING-1 | `/me/problems/{id}` | initiator | Awaiting review | loading, error, not-permitted |
| WF-HOLD-1 | same | initiator | Held, taking longer than usual | loading, error |
| WF-DECISION-1, WF-DECISION-2 | `/me/problems/{id}/decision` | initiator | Decision, hints, rule ids, policy version | loading, error, not-permitted |
| WF-REMOD-1 | same, and public page | initiator, public | Re-reviewed notice | loading, error |
| WF-APPEAL-1, WF-APPEAL-2 | `/me/problems/{id}/appeal` | initiator | File appeal, status timeline | validation, window closed |
| WF-MYACT-1 | `/me` | member | Drafts, submissions, purge dates | loading, empty, error |
| WF-CONTRIB-1, WF-CONTRIB-2 | tab, `/problems/{id}/add` | anyone read, member write | Contributions | loading, empty, validation, not-permitted |
| WF-PROPOSAL-1, WF-PROPOSAL-2 | tab, `/problems/{id}/propose` | anyone read, member write | Proposals | loading, empty, validation |
| WF-DECREC-1, WF-DECREC-2 | tab, `/problems/{id}/decide` | anyone read, initiator write | Decision record and its form | empty, validation |
| WF-TASK-1, WF-TASK-2 | tab, `/tasks/{id}` | anyone read, assignee write | Tasks, verification form | loading, empty, validation |
| WF-AUDIT-1 | `/review` | auditor, labeler | Review work list | loading, empty, error, not-permitted |
| WF-AUDIT-2 | `/review/audit/{id}` | auditor | Masked sampled decision review | validation, not-permitted, conflict declared |
| WF-LABEL-1 | `/review/label/{id}` | labeler | Masked label task | validation, not-permitted |
| WF-LANE-1 | `/lane` | lane member | Emergency and legal console, logged | empty, not-permitted, validation |
| WF-MOD-INVITE-1 | `/review/invites` | steward, maintainer | Issue invite | validation, one-time display |
| WF-POLICY-1 | `/policy/new` | member | Policy proposal form | validation |
| WF-POLICY-2 | `/policy/{id}` | anyone read, panel acts | Eval, replay diff, ratification | loading, error |
| WF-SIM-1 | `/policy/simulations/{id}` | maintainer | Simulation run report | loading, error, not-permitted |

## Content types to forms

| Content type | Schema form | Decision points that read it |
|---|---|---|
| problem | WF-SUBMIT-1 to WF-SUBMIT-4 | ELIGIBILITY, PRIVACY, FRAMING, DUPLICATE, NAMING, TONE, EVIDENCE-TIER, ASSUMPTIONS, COMPLETENESS |
| contribution (typed) | WF-CONTRIB-2 | CONTRIB-RELEVANCE, PRIVACY, NAMING, TONE, ASSUMPTIONS, COMPLETENESS |
| proposal | WF-PROPOSAL-2 | LEGALITY, ASSUMPTIONS, COMPLETENESS |
| decision record | WF-DECREC-2 | DECISION-RECORD, LEGALITY |
| task and verification | WF-TASK-2 | STAGE, VERIFICATION, EVIDENCE-TIER |
| appeal | WF-APPEAL-1 | APPEAL |
| policy proposal | WF-POLICY-1 | automated eval and replay |

## State to screen map

| Lifecycle state key | What the initiator sees | What the public sees |
|---|---|---|
| draft | WF-SUBMIT-1..4, WF-MYACT-1 | nothing |
| submitted (label: Awaiting review) | WF-PENDING-1; WF-HOLD-1 if the run is held | nothing (private) |
| needs_revision | WF-DECISION-1 (hints beside fields, deletion date, appeal entry) | nothing (private) |
| rejected (label: Not accepted) | WF-DECISION-2, WF-APPEAL-1, WF-EXTERNAL-1 | nothing (never published) |
| withdrawn (before publication, T06 T07) | WF-MYACT-1 with deletion date | nothing |
| withdrawn (after publication, T21) | WF-DETAIL-3 withdrawn variant | WF-DETAIL-3; initiator text tombstoned (WF-DETAIL-2) |
| eligible (label: Open: gathering facts; discovery and root_cause_analysis fold into it) | WF-DETAIL-1, WF-CONTRIB-1 | same |
| solution_development, solution_selection | WF-PROPOSAL-1, WF-PROPOSAL-2, WF-DECREC-1, WF-DECREC-2 | same |
| implementation, verification | WF-TASK-1, WF-TASK-2 | same |
| paused | WF-DETAIL-3 (reason and resume condition) | WF-DETAIL-3 |
| stuck | WF-DETAIL-3 (blocker, next route, review date) | WF-DETAIL-3 |
| solved | WF-DETAIL-1, WF-RESOLUTION-1 | WF-RESOLUTION-1 |
| closed | WF-DETAIL-3 variant, WF-RESOLUTION-1 | same |
| redirected | WF-DETAIL-3 variant with routes, WF-RESOLUTION-1 | same |
| any published state after a policy change flips the result | WF-REMOD-1 with explanation and appeal | WF-REMOD-1 public short form on the item |

## Pre-publication visibility

Draft, submitted, needs_revision, rejected and withdrawn-before-publication items are visible to the initiator only. The emergency/legal lane sees the minimum redacted record for its case. Auditors and labelers see only masked samples (WF-AUDIT-2, WF-LABEL-1): no handle, no account, no identity. No role may publish, reject or overturn one item by hand. WF-DETAIL-2 (tombstone) covers withdrawn contributions and public items taken out of view, never private drafts. Decided items show "Decided under policy vX", or "Policy vX, transitional stewardship" while only founder stewardship approves the pack. Seed problems show "Seed problem, synthetic evidence" in list and detail, and name no one.

Appeals attach to decisions, not to a state (D-15), and cover T02, T05, T19 and T20 plus re-moderation notices; WF-APPEAL-1 hangs off WF-DECISION-1, WF-DECISION-2 and WF-REMOD-1.

## Navigation

Primary areas: Discover (WF-LIST-1), Report (WF-SUBMIT-1), My activity (WF-MYACT-1), Policy (WF-POLICY-2), and for auditors and labelers Review (WF-AUDIT-1). Contributions and Problem workspace are tabs inside WF-DETAIL-1. Bottom tabs on mobile, a top bar on desktop. No badges with counts on nav items.
