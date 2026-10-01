# Journeys (slice 1)

Journeys are numbered paths through screens (IDs are wireframe frames in `wireframes/`). Lifecycle state names and who may move a problem between them come from [`docs/spec/01-slice-1-brief.md#4-lifecycle`](../../spec/01-slice-1-brief.md#4-lifecycle). Journeys say only where the person sees the result. Model: people legislate policy; an automated moderation run applies it to every item and explains itself; people audit, label and amend (`docs/design/ai/`). Seed problems use real framings with synthetic evidence and name nobody (D-56); personas below are made up.

Principles: progress over discussion, calm under conflict, honest waiting, no engagement hooks (no streaks, counts as status, infinite scroll or urgency nudges), a visible next meaningful action, nothing removed silently, every decision explained with its rule and policy version.

## J1 Submitter: from a frustration to a published problem

Persona: "Asha", a resident who wants a shared public condition fixed for everyone, not help for herself.

| Step | Screen | What happens | Emotional aim |
|---|---|---|---|
| 1 | WF-LIST-1 | Reads the list without an account. Seed problems are labelled. Taps "Report a public problem". | Curious, not pressured |
| 2 | WF-SUBMIT-1, WF-FORM-1 | Answers a structured form rendered from the schema: facts, causes, affected people, scope, lawful options, uncertainty, assumptions. Each field says why it is asked and shows an example. | Guided, not scolded |
| 3 | WF-FORM-2 | Optionally asks for a suggested answer to a field, reads it, and confirms or edits it. The field is marked "Assisted". | In control |
| 4 | WF-FORM-3, WF-FORM-4 | Runs "Check my draft". Hints appear beside fields about a weak assumption or a thin answer. She marks guesses as assumptions. | Honest about limits |
| 5 | WF-SUBMIT-2, WF-SUBMIT-3 | Adds source links or says she has none yet. Reviews private-detail flags. | No penalty for missing evidence |
| 6 | WF-SUBMIT-4 | Previews exactly what the public would see, including assumptions and the Assisted marks. Presses Submit. | Informed consent |
| 7 | WF-SIGNUP-1, WF-SIGNIN-2, WF-ONBOARD-1 | If not signed in: redeems an invite, enters the emailed code, learns her public name. The draft is still there. | Safe |
| 8 | WF-PENDING-1 | Sees "Awaiting review". An AI moderation run checks it against the published policy, usually in seconds to minutes. She may edit or withdraw. | Trusting, not anxious |
| 8a | WF-HOLD-1 | If the run cannot finish, the item is held (fail closed): "Taking longer than usual", the real wait, nothing public. It never publishes by timeout. | Informed |
| 9a | WF-DECISION-1 | Changes requested: hints beside fields, rule ids, policy version, plain explanation, deletion date. Taps "Revise and resubmit"; her draft is intact. | Supported |
| 9b | WF-APPEAL-1, WF-APPEAL-2 | If she disagrees, appeals before the date shown. A second review with a different model runs; if still disputed a masked community label task follows; the label may change the policy; the item is then decided again. She sees each step and the real wait. | Heard |
| 9c | WF-DECISION-2, WF-EXTERNAL-1 | If it is an individual case, she sees plain reasons and routes that can help. | Respected |
| 10 | WF-DETAIL-1 | Published: she sees the workspace, the policy badge and a "needed next" line. | Progress is visible |
| 11 | WF-REMOD-1 | Later the policy changes and her item is checked again. If the result differs she sees "Re-reviewed under policy vX", why, and how to revise or appeal. Never a silent removal. | Respected |
| 12 | WF-MYACT-1 | Finds her drafts, submissions and purge dates in one place. | Orientation |

Exits: withdraw at any point before publication (draft deleted at 30 days, date shown); sign out; leave and return, the draft remains on the form version it started on (WF-FORM-5).

## J2 Contributor: adding evidence and shaping a fix

Persona: "Ben", a member who knows the ward budget process.

| Step | Screen | What happens |
|---|---|---|
| 1 | WF-LIST-1, WF-DETAIL-1 | Finds a problem that is "Open: gathering facts" with "needed next: a source". |
| 2 | WF-CONTRIB-1 | Reads contributions grouped by type, sees an unanswered question. |
| 3 | WF-CONTRIB-2, WF-FORM-1 | Answers through the schema form for that type, with a source link. Hints beside fields apply. The run checks it before it appears. |
| 4 | WF-PROPOSAL-1, WF-PROPOSAL-2 | Drafts a proposal with mechanism, outcome measure, lawful basis and risks, and compares it with another. |
| 5 | WF-DECREC-2, WF-DECREC-1 | Records a decision through a schema form. Sees who decided, under what authority, why, dissent, and the policy badge. |
| 6 | WF-TASK-1, WF-TASK-2 | Takes a task, posts an update and verification link through the schema form. Verification is by someone else. |
| 7 | WF-DETAIL-3, WF-RESOLUTION-1 | Sees the problem Solved, or Paused or Stuck with neutral wording and a way to help. |

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
