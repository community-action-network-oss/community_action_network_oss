# Journeys (slice 1)

Three journeys, each a numbered path through screens (IDs are wireframe frames in `wireframes/`). All use fictional data in one fictional jurisdiction, English only. Lifecycle state names and who may move a problem between them come from [`docs/spec/01-slice-1-brief.md#4-lifecycle`](../../spec/01-slice-1-brief.md#4-lifecycle); journeys only say where the person sees the result.

Principles carried through every step: progress over discussion, calm under conflict, honest waiting, no engagement hooks (no streaks, counts as status, infinite scroll or urgency nudges), a visible next meaningful action.

## J1 Submitter: from a frustration to a published problem

Persona: "Asha" (fictional), a resident who has watched a bus shelter go missing and wants it fixed for everyone, not help for herself.

| Step | Screen | What happens | Emotional aim |
|---|---|---|---|
| 1 | WF-LIST-1 | Reads the list without an account, sees what a good problem looks like. Taps "Report a public problem". | Curious, not pressured |
| 2 | WF-SUBMIT-1 | Describes the condition. An inline flag asks her to generalise a named person. | Guided, not scolded |
| 3 | WF-SUBMIT-2, WF-SUBMIT-3 | Names the affected group and picks the fictional jurisdiction. | Orienting |
| 4 | WF-SUBMIT-4 | Separates what she saw from what is uncertain. | Honest about limits |
| 5 | WF-SUBMIT-5 | Adds source links, or says she has none yet. | No penalty for missing evidence |
| 6 | WF-SUBMIT-6 | Reviews remaining privacy flags and confirms. | In control |
| 7 | WF-SUBMIT-7 | Previews exactly what the public would see and reads what publishing means. Presses Submit. | Informed consent |
| 8 | WF-SIGNUP-1, WF-SIGNIN-2, WF-ONBOARD-1 | If not signed in: redeems an invite, enters the emailed code, learns her public name. The draft is still there. | Safe |
| 9 | WF-PENDING-1 | Sees "Submitted, awaiting volunteer review" with an honest wait. She may edit or withdraw. | Trusting, not anxious |
| 10a | WF-DECISION-1 | Gets an email. Finds hints beside the fields that need changes, sees the deletion date, taps "Revise and resubmit". Her draft is intact. | Supported |
| 10b | WF-APPEAL-1 | If she disagrees, appeals before the date shown. The reviewer is a different volunteer when possible. | Heard |
| 10c | WF-DECISION-2, WF-EXTERNAL-1 | If it is an individual case, she sees plain reasons and routes that can help. | Respected |
| 11 | WF-DETAIL-1 | Published: she sees the workspace and a "needed next" line. | Progress is visible |
| 12 | WF-MYACT-1 | Later, finds her drafts, submissions and purge dates in one place. | Orientation |

Exits: withdraw at any point before publication (draft deleted at 30 days, date shown); sign out; leave and return, the local draft remains.

## J2 Contributor: adding evidence and shaping a fix

Persona: "Ben" (fictional), a member who knows the ward budget process.

| Step | Screen | What happens |
|---|---|---|
| 1 | WF-LIST-1, WF-DETAIL-1 | Finds a problem that is "Open: gathering facts" with "needed next: a source". |
| 2 | WF-CONTRIB-1 | Reads contributions grouped by type, sees an unanswered question. |
| 3 | WF-CONTRIB-2 | Answers with a typed contribution and a source link. Inline privacy flags apply. A calm prompt asks him to read it once more. |
| 4 | WF-PROPOSAL-1, WF-PROPOSAL-2 | When the problem reaches solution development, drafts a proposal with mechanism, outcome measure and risks, and compares it to another. |
| 5 | WF-DECREC-1 | Sees the decision record: who decided, under what authority, why, and the interim badge if applicable. |
| 6 | WF-TASK-1, WF-TASK-2 | Takes a task, posts an update, adds a verification link. Verification is by someone else. |
| 7 | WF-DETAIL-3, WF-RESOLUTION-1 | Sees the problem Solved, or Paused or Stuck with neutral wording and a way to help; solved problems appear as Resolution records. |

Edge cases: withdrawn contribution becomes a tombstone (WF-DETAIL-2); session expires mid-write (WF-SESSION-1) and text is kept.

## J3 Moderator: reviewing fairly and explainably

Persona: "Mira" (fictional), a volunteer moderator, possibly the only one (interim).

| Step | Screen | What happens |
|---|---|---|
| 1 | WF-MOD-QUEUE-1 | Opens the oldest-first queue. The interim banner is visible when the pool is small. |
| 2 | WF-MOD-REVIEW-1 | Reads the submission with flagged spans and flags the author kept. Chooses an outcome. |
| 3 | WF-MOD-REVIEW-1 | Selects rule ids, the field and text span, writes a hint for the person, sets the appealable date. Interim flag is automatic. The server rejects an incomplete decision. |
| 4 | WF-MOD-APPEAL-1 | Handles an appeal, only if she is not the original decider (or sees the disclosure when she must be). |
| 5 | WF-MOD-INVITE-1 | Issues an invite code, shown once. |
| 6 | WF-DETAIL-1 | Confirms later transitions (publish, solved, closed, redirected) as the brief requires; each decision is audited and labelled interim when applicable. |

Success for the moderator journey: every outcome has rule ids, a field or span, a hint and an appeal date, and the person can act on it without writing to anyone.
