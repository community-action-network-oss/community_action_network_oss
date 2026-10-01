# Screen inventory (slice 1)

Every screen has a wireframe ID. "State" refers to lifecycle state keys defined in [`docs/spec/01-slice-1-brief.md#4-lifecycle`](../../spec/01-slice-1-brief.md#4-lifecycle). That table owns state names, public labels, plain explanations, next actions and transition rights; this file only maps states to screens. If a state key below does not match the brief, the brief wins and this table is corrected in a follow-up commit. Public labels shown in the UI always come from the brief's table, never from strings in the app code.

## Screens

| Screen | Route | Actor | Purpose | Required UI states (see `ui-unit-template.md`) |
|---|---|---|---|---|
| WF-LIST-1, WF-LIST-2 | `/` | anyone | Browse and filter published problems | loading, empty, error, offline |
| WF-DETAIL-1 | `/problems/{id}` | anyone | Problem workspace and status panel | loading, error, offline, tombstone |
| WF-DETAIL-2 | same | anyone | Tombstone for withdrawn or removed items | n/a (is the state) |
| WF-DETAIL-3 | same | anyone | Status panel variants (paused, stuck, closed, redirected) | n/a |
| WF-RESOLUTION-1 | `/resolutions` | anyone | Resolution records archive | loading, empty, error |
| WF-SIGNUP-1 | `/sign-up` | anyone | Redeem invite, email | validation, offline, error |
| WF-SIGNIN-1, WF-SIGNIN-2 | `/sign-in`, `/sign-in/code` | anyone | Email code sign-in | validation, rate limited, offline |
| WF-ONBOARD-1 | `/welcome` | new member | Public name | error |
| WF-SESSION-1 | overlay | member | Session expired | n/a |
| WF-SUBMIT-1 to WF-SUBMIT-7 | `/report/{step}` | anyone, sign-in at submit | Staged intake and preview | validation, offline (local autosave), session-expired |
| WF-EXTERNAL-1 | overlay | anyone | External routes | n/a |
| WF-PENDING-1 | `/me/problems/{id}` | initiator | Waiting for review | loading, error, not-permitted |
| WF-DECISION-1, WF-DECISION-2 | `/me/problems/{id}/decision` | initiator | Moderation decision, hints, deletion date | loading, error, not-permitted |
| WF-APPEAL-1 | `/me/problems/{id}/appeal` | initiator | File appeal | validation, window closed |
| WF-MYACT-1 | `/me` | member | Drafts, submissions, purge dates | loading, empty, error |
| WF-CONTRIB-1, WF-CONTRIB-2 | tab, `/problems/{id}/add` | anyone read, member write | Typed contributions | loading, empty, validation, not-permitted |
| WF-PROPOSAL-1, WF-PROPOSAL-2 | tab, `/problems/{id}/propose` | anyone read, member write | Proposals | loading, empty, validation |
| WF-DECREC-1 | tab | anyone | Decision record | empty, interim badge |
| WF-TASK-1, WF-TASK-2 | tab, `/tasks/{id}` | anyone read, assignee write | Tasks and verification | loading, empty, validation |
| WF-MOD-QUEUE-1 | `/mod` | moderator | Queue | loading, empty, error, not-permitted |
| WF-MOD-REVIEW-1 | `/mod/problems/{id}` | moderator | Review and decide | validation (incomplete decision), not-permitted |
| WF-MOD-APPEAL-1 | `/mod/appeals/{id}` | moderator | Appeal review | not-permitted, same-reviewer disclosure |
| WF-MOD-INVITE-1 | `/mod/invites` | moderator | Issue invite | validation, one-time display |

## State to screen map

| Lifecycle state key | What the initiator sees | What the public sees |
|---|---|---|
| draft | WF-SUBMIT-1..7, WF-MYACT-1 | nothing |
| submitted | WF-PENDING-1 | nothing (private) |
| needs_revision | WF-DECISION-1 (hints beside fields, deletion date, appeal entry) | nothing (private) |
| rejected | WF-DECISION-2, WF-APPEAL-1, WF-EXTERNAL-1 (deletion date shown) | nothing (never published) |
| withdrawn | WF-MYACT-1 with deletion date; the draft is deleted at 30 days | nothing (never published) |
| eligible (includes discovery in slice 1) | WF-DETAIL-1, WF-CONTRIB-1 | same |
| solution_development, solution_selection | WF-PROPOSAL-1, WF-PROPOSAL-2, WF-DECREC-1 | same |
| implementation, verification | WF-TASK-1, WF-TASK-2 | same |
| paused | WF-DETAIL-3 (reason and resume condition) | WF-DETAIL-3 |
| stuck | WF-DETAIL-3 (blocker, next route, review date) | WF-DETAIL-3 |
| solved | WF-DETAIL-1, WF-RESOLUTION-1 | WF-RESOLUTION-1 |
| closed | WF-DETAIL-3 variant, WF-RESOLUTION-1 | same |
| redirected | WF-DETAIL-3 variant with routes, WF-RESOLUTION-1 | same |

Pre-publication states (draft, submitted, needs_revision, rejected, withdrawn) are visible only to the initiator and moderators. WF-DETAIL-2 (tombstone) covers withdrawn contributions and removed public items, not private drafts.

Appeals attach to moderation decisions, not to a problem state (D-15); WF-APPEAL-1 hangs off WF-DECISION-1 and WF-DECISION-2.

## Navigation

Primary areas in slice 1: Discover (WF-LIST-1), Report (WF-SUBMIT-1), My activity (WF-MYACT-1), and for moderators Review (WF-MOD-QUEUE-1). The spec lists five areas; Contributions and Problem workspace are inside WF-DETAIL-1 tabs in slice 1. Bottom tabs on mobile, a top bar on desktop. No badges with counts on nav items.
