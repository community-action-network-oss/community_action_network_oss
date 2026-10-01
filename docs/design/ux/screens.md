# Screen inventory (slice 1)

Every screen has a wireframe ID. "State" refers to lifecycle state keys in [`docs/spec/01-slice-1-brief.md#4-lifecycle`](../../spec/01-slice-1-brief.md#4-lifecycle). That table owns state names, public labels, plain explanations, next actions and transition rights; this file only maps states and content types to screens. If a key below does not match the brief, the brief wins. Public labels in the UI always come from the brief's table, never from strings in app code. All forms are rendered from the content schema version (`wireframes/forms.md`).

## Screens

| Screen | Route | Actor | Purpose | Required UI states (see `ui-unit-template.md`) |
|---|---|---|---|---|
| WF-LIST-1, WF-LIST-2 | `/` | anyone | Browse published problems; seed label | loading, empty, error, offline |
| WF-DETAIL-1 | `/problems/{id}` | anyone | Problem workspace, policy badge | loading, error, offline, tombstone |
| WF-DETAIL-2 | same | anyone | Tombstone for withdrawn or removed items | n/a |
| WF-DETAIL-3 | same | anyone | Status variants (paused, stuck, withdrawn, closed, redirected) | n/a |
| WF-DETAIL-4 | same | anyone | Reopened under policy vX (T23, T24): old conclusion, what changed, next step, appeal | n/a |
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
| WF-PREP-1 | `/me/problems/{id}` | poster | Preparation workspace: structured form, sources with trust hints, progress | validation, offline (local autosave), session-expired, not-permitted |
| WF-PREP-2 | `/me/problems/{id}/criteria` | poster | Final acceptance criteria editor | validation, offline, not-permitted |
| WF-PREP-3 | `/me/problems/{id}/stages` | poster | Stage plan editor: template or blank, stages, criteria, method, depends_on, graph plus list | validation (cycle, no path to final criteria), offline, not-permitted |
| WF-VREVIEW-1 | `/review/problems` | volunteer (opt-in) | Review queue | loading, empty, error, not-permitted |
| WF-VREVIEW-2 | `/review/problems/{id}` | volunteer | Masked problem with inline recommendations | validation, conflict declared, not-permitted |
| WF-VREVIEW-3 | `/me/problems/{id}/review` | poster | Accept or decline recommendations, diff preview | validation (reason needed), loading, error |
| WF-STAGEMAP-1 | `/problems/{id}` | anyone | Stage map (graph) and equivalent list | loading, error, offline, no-plan |
| WF-STAGE-1 | `/problems/{id}/stages/{stageId}` | anyone read, member write | Stage workspace: options, choice, steps, evidence, criteria | loading, empty, error, validation, not-permitted |
| WF-STAGE-2 | `.../stages/{stageId}/result` | anyone | Stage resolution, per criterion, appeal | loading, error |
| WF-STAGE-3 | `.../stages/{stageId}` | anyone read, member write | Contribute ahead to a planned stage | empty, validation |
| WF-GUEST-1 | sheet on any content item | anyone | Guest badge and explanation; attestation pending, failed and offline states | pending, failed, offline, unavailable |
| WF-FILTER-1 | control on every content list | anyone | "Impacted only" filter with counts, remembered per viewer | empty (none impacted), offline |
| WF-LOCPERM-1 | sheet before a contribution | member | Location permission explanation | denied, unavailable, offline |
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
| problem (prepared) | WF-PREP-1, WF-PREP-2, WF-PREP-3, then WF-SUBMIT-3 and WF-SUBMIT-4 | ELIGIBILITY, PRIVACY, FRAMING, DUPLICATE, NAMING, TONE, EVIDENCE-TIER, ASSUMPTIONS, COMPLETENESS |
| volunteer recommendation | WF-VREVIEW-2 | recommendation check (privacy, tone) |
| stage option, evidence | WF-STAGE-1, WF-STAGE-3 (WF-CONTRIB-2 form) | CONTRIB-RELEVANCE, PRIVACY, NAMING, TONE, ASSUMPTIONS, COMPLETENESS |
| stage plan change proposal | WF-STAGEMAP-1 | STAGE-PLAN |
| proposal | WF-PROPOSAL-2 | LEGALITY, ASSUMPTIONS, COMPLETENESS |
| stage choice (decision record) | WF-STAGE-1 (WF-DECREC-2 form) | DECISION-RECORD, LEGALITY |
| stage step and verification | WF-STAGE-1 (WF-TASK-2 form) | STAGE-RESOLUTION,  STAGE, VERIFICATION, EVIDENCE-TIER |
| appeal | WF-APPEAL-1 | APPEAL |
| policy proposal | WF-POLICY-1 | automated eval and replay |

## State to screen map (lifecycle v2, D-72)

Problem states and the labels in `copy-deck-lifecycle.md`. The old fixed-sequence states (submitted, eligible, solution_development, solution_selection, implementation, verification) no longer exist; they survive only as the optional stage template classic-5.

| Problem state (label) | What the poster sees | What the public sees |
|---|---|---|
| draft (Draft) | WF-PREP-1, WF-PREP-2, WF-PREP-3, WF-MYACT-1 | nothing |
| in_review (In volunteer review) | WF-VREVIEW-3, WF-PREP-1 (still editable); WF-PENDING-1 while the publication check runs | nothing; opted-in volunteers see a masked copy in WF-VREVIEW-1, WF-VREVIEW-2 |
| needs_revision (Changes requested) | WF-DECISION-1 (hints beside fields, appeal entry), WF-PREP-1 | nothing |
| held | WF-HOLD-1 | nothing |
| rejected (Not accepted) | WF-DECISION-2, WF-APPEAL-1, WF-EXTERNAL-1 | nothing |
| withdrawn before publication | WF-MYACT-1 with deletion date | nothing |
| active (Active: stage {name}, or Active: {n} stages in progress) | WF-DETAIL-1, WF-STAGEMAP-1, WF-STAGE-1, WF-STAGE-2, WF-STAGE-3 | same |
| paused, stuck | WF-DETAIL-3 (reason and resume condition, or blocker and next route), WF-STAGEMAP-1 | same |
| redirected, closed | WF-DETAIL-3 variants, WF-RESOLUTION-1 | same |
| withdrawn after publication | WF-DETAIL-3 withdrawn variant, text tombstoned (WF-DETAIL-2) | WF-DETAIL-3 |
| solved (Solved) | WF-DETAIL-1, WF-STAGE-2 (final criteria), WF-RESOLUTION-1 | same; reopened: WF-DETAIL-4 |
| any published state after a policy change flips the result | WF-REMOD-1 with explanation and appeal | WF-REMOD-1 public short form |

| Stage state (chip) | Screens |
|---|---|
| planned (Planned) | WF-STAGEMAP-1, WF-STAGE-3 |
| ready (Ready) | WF-STAGEMAP-1, WF-STAGE-1 (waiting to start) |
| active (In progress) | WF-STAGEMAP-1, WF-STAGE-1 |
| resolving (Checking evidence) | WF-STAGEMAP-1, WF-STAGE-1 (read only) |
| resolved (Done) | WF-STAGEMAP-1, WF-STAGE-2 |
| blocked (Blocked) | WF-STAGEMAP-1 with the cited constraint, WF-STAGE-1 |
| skipped (Skipped) | WF-STAGEMAP-1 with the reason |

## Impacted and guest (D-73)

Every contribution, option, choice comment, evidence item and recommendation carries an impacted or guest label (WF-GUEST-1) and every content list has the filter (WF-FILTER-1). Lists affected: WF-DETAIL-1, WF-CONTRIB-1, WF-STAGE-1, WF-STAGE-3, WF-VREVIEW-2, WF-VREVIEW-3. WF-LOCPERM-1 precedes the first contribution to a problem with an affected area. Attestation design: [`docs/design/location/attestation.md`](../location/attestation.md).

## Retired and redirected wireframes

Retired frames stay in `wireframes/` with a "Retired (D-72)" note until the app drops them.

| Retired | Replacement |
|---|---|
| WF-SUBMIT-1 (problem form sections) | WF-PREP-1 |
| WF-SUBMIT-2, WF-SUBMIT-3, WF-SUBMIT-4 | kept, now used inside WF-PREP-1 and before sending to review |
| WF-PENDING-1 ("Awaiting review") | "In volunteer review" (WF-VREVIEW-3); frame kept for the publication check |
| Status panel "Stage" line and "Open: ..." chips in WF-DETAIL-1 | WF-STAGEMAP-1 |
| WF-CONTRIB-1 | WF-STAGE-1 options, WF-STAGE-3 |
| WF-PROPOSAL-1 | WF-STAGE-1 options and comparison |
| WF-DECREC-1 | WF-STAGE-1 choice |
| WF-TASK-1 | WF-STAGE-1 steps (WF-TASK-2 kept as the step form) |
| WF-CONTRIB-2, WF-PROPOSAL-2, WF-DECREC-2 | kept as the schema forms behind WF-STAGE-1 actions |

## Pre-publication visibility

Draft, needs_revision, held, rejected and withdrawn-before-publication items are visible to the initiator only. In_review items are also visible to opted-in volunteers with personal data masked (WF-VREVIEW-2); the poster handle never shows. The emergency/legal lane sees the minimum redacted record for its case. Auditors and labelers see only masked samples (WF-AUDIT-2, WF-LABEL-1): no handle, no account, no identity. No role may publish, reject or overturn one item by hand. WF-DETAIL-2 (tombstone) covers withdrawn contributions and public items taken out of view, never private drafts. Decided items show "Decided under policy vX", or "Policy vX, transitional stewardship" while only founder stewardship approves the pack. Seed problems show "Seed problem, synthetic evidence" in list and detail, and name no one.

Appeals attach to decisions, not to a state (D-15), and cover T02, T05, T19 and T20 plus re-moderation notices; WF-APPEAL-1 hangs off WF-DECISION-1, WF-DECISION-2 and WF-REMOD-1.

## Navigation

Primary areas: Discover (WF-LIST-1), Report (WF-PREP-1), My activity (WF-MYACT-1), Policy (WF-POLICY-2), and for auditors, labelers and volunteer reviewers Review (WF-AUDIT-1, WF-VREVIEW-1). The stage map (WF-STAGEMAP-1) and stage workspaces sit inside WF-DETAIL-1. Bottom tabs on mobile, a top bar on desktop. No badges with counts on nav items.
