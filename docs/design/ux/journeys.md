# Journeys (slice 1)

Journeys are numbered paths through screens (IDs are wireframe frames in `wireframes/`). Lifecycle state names and who may move a problem between them come from [`docs/spec/01-slice-1-brief.md#4-lifecycle`](../../spec/01-slice-1-brief.md#4-lifecycle). Journeys say only where the person sees the result. Model: people legislate policy; an automated moderation run applies it to every item and explains itself; people audit, label and amend (`docs/design/ai/`). Seed problems use real framings with synthetic evidence and name nobody (D-56); personas below are made up.

Principles: progress over discussion, calm under conflict, honest waiting, no engagement hooks (no streaks, counts as status, infinite scroll or urgency nudges), a visible next meaningful action, nothing removed silently, every decision explained with its rule and policy version.

## J1 Submitter: from a frustration to a published problem, then running its stages (D-72)

Persona: "Asha", a resident who wants a shared public condition fixed for everyone, not help for herself. Lifecycle v2: prepare privately, get volunteer review, pass the AI publication check, then run the stage plan.

| Step | Screen | What happens | Emotional aim |
|---|---|---|---|
| 1 | WF-LIST-1 | Reads the list without an account. Taps "Report a public problem". | Curious, not pressured |
| 2 | WF-PREP-1, WF-FORM-1 | Opens the preparation workspace (Draft, private). Fills the structured problem from the schema: facts, causes, affected people, scope, lawful options, uncertainty, assumptions. | Guided, not scolded |
| 3 | WF-FORM-2, WF-FORM-4 | Optionally asks for a suggested answer (marked "Assisted") and lists assumptions. | In control |
| 4 | WF-PREP-1, WF-SUBMIT-2 | Adds trusted sources that show the issue is real, with a trust hint beside each link. No source is allowed and is marked "needs evidence". | No penalty for gaps |
| 5 | WF-PREP-2 | Writes the final acceptance criteria: measurable, with examples. | Clear about "solved" |
| 6 | WF-PREP-3 | Optionally builds a stage plan: starts from classic-5 or blank, adds stages, criteria per stage, decision method and what each stage starts after. Sees the stage graph and its list. | Plans, not paperwork |
| 7 | WF-SUBMIT-3, WF-SUBMIT-4 | Privacy check and an exact preview. Presses "Send to volunteer review". | Informed consent |
| 8 | WF-SIGNUP-1, WF-SIGNIN-2, WF-ONBOARD-1 | If not signed in: invite, emailed code, public name. The draft is still there. | Safe |
| 9 | WF-VREVIEW-3 | In volunteer review (not public). Reads each volunteer recommendation with a diff, accepts or declines with a reason, edits as needed, then asks for the publication check. | Heard, in charge |
| 10 | WF-PENDING-1, WF-HOLD-1 | The AI publication check runs against the policy and the guidelines, weighing any open recommendations. If it cannot finish the problem is held (fail closed), never published by timeout. | Trusting, not anxious |
| 11a | WF-DECISION-1 | Needs revision: hints beside fields, rule ids, policy version. Revises in WF-PREP-1. | Supported |
| 11b | WF-APPEAL-1, WF-APPEAL-2 | Disagrees: appeals, as in the appeal flow. WF-DECISION-2 and WF-EXTERNAL-1 for individual cases. | Heard, respected |
| 12 | WF-DETAIL-1, WF-STAGEMAP-1 | Active: sees the stage map, current stages highlighted, with a list view. | Progress is visible |
| 13 | WF-STAGE-1, WF-STAGE-2 | Runs each stage: gathers options, makes or collects the choice, tracks steps, posts evidence, reads the resolution per criterion, can appeal. | Steady progress |
| 14 | WF-REMOD-1, WF-MYACT-1 | A policy change can re-check the item: "Re-reviewed under policy vX". Finds drafts, reviews and purge dates in one place. | Respected |

Exits: withdraw at any point before publication (draft deleted at 30 days, date shown); sign out; leave and return, the draft stays on its form version (WF-FORM-5). Proposing a change to the stage plan after publication is a proposal, never an edit (WF-STAGEMAP-1).

## J2 Contributor: shaping and advancing a stage

Persona: "Ben", a member who knows the ward budget process.

| Step | Screen | What happens |
|---|---|---|
| 1 | WF-LIST-1, WF-DETAIL-1, WF-STAGEMAP-1 | Finds an active problem and the stage that needs help. |
| 2 | WF-STAGE-1, WF-FORM-1 | Suggests an option or adds evidence through the schema form, with a source link. The run checks it before it appears. |
| 3 | WF-STAGE-3 | Contributes ahead to a planned stage: the contribution is kept for when that stage starts. |
| 4 | WF-STAGE-1 | Sees how the choice is made for the stage, who chose, why, dissent and the policy badge. Takes a step and posts an update with verification by someone else (WF-TASK-2). |
| 5 | WF-STAGE-2 | Reads the resolution per criterion, and may appeal. |
| 6 | WF-DETAIL-3, WF-ARCHIVE-2 | Sees the problem Solved, or Paused or Stuck in neutral words, with a way to help. |

Edge cases: withdrawn contribution becomes a tombstone (WF-DETAIL-2); session expires mid-write (WF-SESSION-1) and answers are kept.

## J3 Auditor: checking decisions without seeing people

Persona: "Mira", a member who volunteered to audit.

| Step | Screen | What happens |
|---|---|---|
| 1 | WF-AUDIT-1 | Opens the work list: sampled decisions in random order. No counts as status. |
| 2 | WF-AUDIT-2 | Reads a masked copy (no handle, no account) beside the rule text and the decision with its policy version. |
| 3 | WF-AUDIT-2 | Records whether the decision follows the rule as written, or that the rule is unclear. Declares a conflict if any. Her answer is recorded before the group result shows. |
| 4 | WF-POLICY-1 | Repeated disagreements on one rule can become a policy proposal. She never changes the single item. |

Success: disagreements are tracked per rule and decision point, and feed the amendment loop.

## J4 Labeler: answering label tasks

Persona: "Kofi", a member drawn at random for a task.

| Step | Screen | What happens |
|---|---|---|
| 1 | WF-AUDIT-1 | Sees a label task from an appeal or an eval set. |
| 2 | WF-LABEL-1 | Reads the exact question, the rule and masked text. Answers yes, no or not sure, after declaring any conflict. |
| 3 | WF-LABEL-1 | Sees the label recorded. Group results appear only after labels close. The label may become an example in a policy proposal. |

## J5 Emergency and legal lane operator

Persona: "Lane member", a small trained group, named and rotating.

| Step | Screen | What happens |
|---|---|---|
| 1 | WF-LANE-1 | Opens a case raised by DP-CRISIS or DP-LEGAL: redacted record, rule ids, run record. |
| 2 | WF-LANE-1 | Chooses an action the jurisdiction pack allows, states the reason. The console cannot publish or overturn a rule decision. |
| 3 | WF-LANE-1 | Action is logged; a second member reviews it afterwards. A redacted example candidate goes to the policy. |

## J6 Policy contributor: changing the rules

Persona: "Ines", a member who wants a rule clearer.

| Step | Screen | What happens |
|---|---|---|
| 1 | WF-POLICY-1, WF-FORM-1 | Opens a policy proposal through a schema form: what changes, why, who is affected, lawful basis, risks and assumptions. |
| 2 | WF-POLICY-2 | Sees automated test results, the replay diff summary (what would flip, expected and unexpected, masked examples) and the ratification status. |
| 3 | WF-POLICY-2 | Follows staged rollout (shadow, canary, full). Affected items get re-moderation notices (WF-REMOD-1). |
| 4 | WF-SIM-1 | Maintainers read the simulation report: persona runs, metrics, and progress toward opening public participation. |

## J7 Volunteer reviewer: checking a problem before it is public

Persona: "Noor", a member who wants better problems published. Volunteers are signed-in members who opt in; personal data stays masked.

| Step | Screen | What happens |
|---|---|---|
| 1 | WF-VREVIEW-1 | Opts in to volunteer review. Opens the queue (random order, no counts as status). |
| 2 | WF-VREVIEW-2 | Opens a masked problem. Declares any conflict first. Reads facts, sources, final criteria and the stage plan. |
| 3 | WF-VREVIEW-2 | Recommends changes on any field, stage or criterion, each with a reason. Finishes the review. |
| 4 | WF-VREVIEW-3 (read side) | Later sees whether her recommendation was accepted or declined, and the poster's reason. She never sees who the poster is. |

Success: problems reach the publication check clearer and more checkable, and every declined recommendation has a stated reason.

## J8 Impacted resident and guest expert (D-73)

Two people contribute to the same problem. The label depends on where the app is used for each message, not on a profile.

| Step | Screen | Impacted resident, "Maple" | Guest expert, "Dr. Rao", elsewhere |
|---|---|---|---|
| 1 | WF-LOCPERM-1 | Reads that exact location never leaves the device and only "inside the area or not" is shared. Allows the check. | Reads the same and allows it, or taps "Not now". |
| 2 | WF-STAGE-1, WF-CONTRIB-2 | Suggests an option. The check says inside the area, so it shows no badge. | Suggests an option. It is labelled Guest, with a neutral explanation. |
| 3 | WF-GUEST-1 | Sees "Checking location" for a moment, then nothing. If offline, "Waiting for a connection" and Guest until sent. | Opens the explanation: "Guests help. People affected by the problem decide what matters to them most." Sees it is not a judgement. |
| 4 | WF-FILTER-1 | Turns on "Show impacted only (12 of 30)" to see what neighbours suggest. It is remembered. | Reads everything, with guest items labelled. Can still add evidence and be heard. |
| 5 | WF-STAGE-2 | Sees the resolution per criterion; guest evidence still counts toward the criteria. | Same. |

If the check fails, the contribution shows as Guest with a retry; it is never an accusation (D-73).

## J9 Poster in a low-resource place starts from a Dutch path (D-76)

Persona: "Tendai", a resident of a small, hot, dry town with a tiny budget and no collection trucks, who wants public waste fixed. The archive holds a solved Dutch case (fictional here) in a cold, wet, well-funded city.

| Step | Screen | What happens |
|---|---|---|
| 1 | WF-PREP-1, WF-SUGGEST-1 | Fills in the problem type, place, scale and the resources the town really has. Paths appear and update. One is from the Netherlands, badged "Allowed where you are" and "Partly fits your resources". |
| 2 | WF-SUGGEST-2 | Opens it. Reads the differences first: climate and budget. Sees the adaptations (shaded bins, volunteer rounds instead of trucks), legality per layer with one "Needs a legal check", the missing vehicle, and credit to the Dutch case. |
| 3 | WF-ARCHIVE-2 | Follows the credit link to read the Dutch journey, including two challenges that failed there. Learns what to avoid. |
| 4 | WF-SUGGEST-2 | Chooses "Use as starting point" and confirms. Draft stages land in the stage editor (WF-PREP-3); facts and criteria are untouched. |
| 5 | WF-PREP-3, WF-VREVIEW-3 | Edits the stages. Sends for volunteer review. The review still happens; the archive evidence only helps reviewers. |
| 6 | WF-STAGEDRAFT-1 | After publication, reviews the AI-drafted plan, edits one stage, applies it. Credit to the source case is visible on the public stage map. |
| 7 | WF-ARCHIVE-1 | Months later the problem ends and is archived with its journey, including what failed in this town, for the next community. |

Success: Tendai never applies something blindly, sees why the path differs, and the Dutch case is credited. If suggestions are unavailable, every step still works by hand.
