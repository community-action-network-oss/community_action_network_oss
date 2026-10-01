# Wireframes: problem form, pending, hold, decision, notices, appeal

The problem form is an instance of the schema-driven pattern in forms.md (WF-FORM-1 to WF-FORM-5). Sections, fields, guidance and examples come from the problem schema version in the policy pack. The sections below show what the current schema renders; they are not hard-coded. Order of sections follows the schema: facts, causes, affected people, scope, lawful options, uncertainty, assumptions, then sources, privacy check and preview.

Signed-out visitors can start. Sign-in is requested only at submit, and the draft survives it (invite redeemed at sign-up, so a visitor without an account sees WF-SIGNUP-1 first). Autosave on every change (`form.saved`, `form.savedLocal`).

Inline privacy flags: every text field runs the deterministic checks (names, addresses, phone, email, plates, identifiers, "I" narrative about a named person). A flag appears under the field in a neutral note with the offending text marked, never blocking typing: `submit.flag.name`, `.address`, `.contact`, `.individual`. Each flag offers [ Generalise it ] (manual edit hint) and [ Keep as is ] (kept flags go to the automated review, which may still ask for a change). Assumption and completeness hints (WF-FORM-3) appear in the same place.

## WF-SUBMIT-1  Problem form sections
Route `/report/{section}`. Renders WF-FORM-1 per section of the schema.
```
+--------------------------------------+
| {submit.start.title}                 |
| Report a public problem              |
| {submit.start.body}                  |
|--------------------------------------|
| Section 1 of 7: Facts                |
|  What is the public condition?       |
|  [ structured answer               ] |
|  How do you know? ( ) seen ( ) source|
|  [ Suggest an answer ]               |
| Section 2: Causes                    |
| Section 3: Affected people           |
|   (group, not individuals; how many, |
|    or "I do not know")               |
| Section 4: Scope                     |
|   (place picker from jurisdictions,  |
|    period, boundaries)               |
| Section 5: Lawful options            |
| Section 6: What is uncertain         |
| Section 7: Assumptions (WF-FORM-4)   |
| [ Back ]  [ Save draft ]  [ Next ]   |
+--------------------------------------+
```
Seed note: seed problems written by the project use the same schema and are labelled `list.card.seed`. Individual crisis language triggers WF-EXTERNAL-1 inline, never forced. The place picker is a plain native select from `GET /v1/jurisdictions`; Amsterdam (NL) is the first real overlay.

## WF-SUBMIT-2  Sources section (URL list field)
```
+--------------------------------------+
| {submit.evidence.title}              |
| Where can others check this?         |
| {submit.evidence.body}               |
| Links only. Uploads are not part of  |
| this version.                        |
| Link  [ https://example.org/report ] |
| Note  [ City report, page 4        ] |
| [ + Add another link ]  (max 5)      |
| ( ) I do not have a source yet       |
|   {submit.evidence.none}             |
| [ Back ]              [ Next ]       |
+--------------------------------------+
```
Validation: https only; a link to a social profile or private document host warns with `submit.evidence.private`.

## WF-SUBMIT-3  Privacy check
```
+--------------------------------------+
| {submit.privacy.title}               |
| {submit.privacy.body}                |
| We found 2 things to look at.        |
| 1 Facts: a name                      |
|   [ Edit ] [ Keep as is ]            |
| 2 Scope: a street address            |
|   [ Edit ] [ Keep as is ]            |
| [x] {submit.privacy.confirm}         |
| [ Back ]              [ Next ]       |
+--------------------------------------+
```
Zero flags shows `submit.privacy.none` and the confirmation. Next stays disabled until confirmed.

## WF-SUBMIT-4  Review and preview (mandatory)
```
+--------------------------------------+
| {form.review}                        |
| {submit.preview.title}               |
| ---- PREVIEW (read only) -------     |
| Title and condition                  |
| Known | Not yet known                |
| Assumptions made (marked)            |
| (Assisted) on fields you confirmed   |
| Sources, evidence tier               |
| --------------------------------     |
| {submit.preview.explain}             |
|  * An automated review checks it.    |
|  * Only then is it public.           |
|  * You can edit or withdraw before.  |
|  * If it is not published, the draft |
|    is deleted 30 days later.         |
|  * Your email is never shown.        |
| {submit.preview.duplicates}          |
| [ Back to edit ] [ Submit for review]|
+--------------------------------------+
```
The Submit button is the only way to leave forward; the route guard sends deep links back to the first section with a missing field. If duplicates are found they list with links and the choice "This is different" or "Add to that problem instead".

## WF-PENDING-1  Awaiting review
Route `/me/problems/{id}`. An AI moderation run is in progress. Nothing is public.
```
+--------------------------------------+
| (Awaiting review) {pending.title}    |
| {pending.checking}                   |
| Checking against policy 1.0.0        |
| {pending.wait}                       |
| Usually seconds to a few minutes.    |
| Submitted 1 Oct, 14:05               |
| {pending.email}                      |
| [ Edit draft ] [ Withdraw ]          |
| What you submitted (collapsed) v     |
+--------------------------------------+
```
Withdraw confirms with the deletion date (`pending.withdraw.confirm`). Editing while checking cancels the run and starts a new one on submit. No fake progress bars; the elapsed time is shown only if the run becomes a hold.

## WF-HOLD-1  Held: taking longer than usual (fail closed)
Same route. Shown when the run times out, fails validation, the language is unsupported, or spend or capacity limits apply. The chip stays "Awaiting review".
```
+--------------------------------------+
| (Awaiting review)                    |
| {hold.title} Taking longer than usual|
| {hold.body}                          |
| {hold.age}  Waiting for 12 minutes.  |
| {hold.retrying}                      |
| {hold.rule}                          |
| (language case) {hold.language}      |
| {hold.crisis} If someone is in       |
|   danger, call your local number.    |
| [ Edit draft ] [ Withdraw ]          |
+--------------------------------------+
```
Hold never becomes publish by timeout. The wait shown is the real age.

## WF-DECISION-1  Decision with hints beside fields
Route `/me/problems/{id}/decision`. Outcome `needs_revision`.
```
+--------------------------------------+
| (Changes requested)                  |
| {decision.title.needsRevision}       |
| Changes are needed before this can   |
| be shared                            |
| {decision.explain} plain explanation |
| {decision.rules} Decided under       |
|   RULE-PRIV-NAME, RULE-ASSUMP-1      |
| {status.decidedUnder} (badge)        |
|   or {status.transitional}           |
| {decision.noPerson}                  |
|--------------------------------------|
| Facts                                |
| [ Mr. Rao refused to fix the shelter]|
|   {decision.hintHere}: remove the    |
|   name; describe the office instead. |
| Causes                               |
| [ ...                              ] |
|   {form.hint.assumption} hint        |
| Scope (no hint)                      |
|--------------------------------------|
| {decision.keep} {decision.deleteDate}|
| [ Revise and resubmit ]              |
| [ Appeal this decision ] until 8 Oct |
| [ Withdraw ]                         |
+--------------------------------------+
```
Hints use the WF-FORM-3 layout and the span reference. "Revise and resubmit" returns to the first hinted field with all answers kept. Policy and run id show as `decision.policy`.

## WF-DECISION-2  Decision: not accepted
Outcome `reject`. Shows everything WF-DECISION-1 shows.
```
+--------------------------------------+
| (Not accepted) {decision.title.notAccepted} |
| {decision.notPublished.body}         |
| Not accepted because of RULE-SCOPE-1.|
| Describe the shared condition.       |
| {decision.rules} {status.decidedUnder}|
| {decision.noPerson}                  |
| Facts  <- field the rule applies to  |
|   {decision.hintHere}                |
|   (empty only for a safety-sensitive |
|    decision)                         |
| Places that can help (route text from|
| the jurisdiction pack):              |
|  * Legal aid line  * Ward office     |
| {decision.deleteDate}                |
| {decision.appealUntil}               |
| [ Revise as a shared condition ]     |
| [ Appeal this decision ]             |
| [ Delete now ]                       |
+--------------------------------------+
```

## WF-REMOD-1  Re-reviewed under a new policy version
Shown to the initiator and, in short form, on the public page. Never a silent removal (REMOD-NOTICE-1).
```
+--------------------------------------+
| {remod.title}                        |
| Re-reviewed under policy 1.1.0       |
| {remod.body}                         |
| {remod.what} What changed: ...       |
| {remod.rules} Rules now applied: ... |
| {remod.visible} Visible until 8 Oct. |
|   (privacy or crisis: {remod.immediate})|
| {remod.nothingSilent}                |
| [ {remod.revise} Revise it ]         |
| [ Appeal this decision ]             |
|--------------------------------------|
| more permissive result:              |
| {remod.permissive}                   |
| [ {remod.resubmit} Resubmit now ]    |
|--------------------------------------|
| public short form:                   |
| {remod.public}                       |
+--------------------------------------+
```

## WF-APPEAL-1  File an appeal
```
+--------------------------------------+
| {appeal.title}  Appeal this decision |
| {appeal.body}                        |
| Which rule do you think was          |
| misapplied?  [ RULE-PRIV-NAME v ]    |
| Why? (structured: what the rule says,|
|  what your text says, what is        |
|  different)  [                     ] |
| [ Send appeal ]  Closes 8 Oct        |
+--------------------------------------+
```
The grounds use the appeal schema (WF-FORM pattern): rule, the passage, the reason. After sending: "Appeal received" and the timeline (WF-APPEAL-2).

## WF-APPEAL-2  Appeal status timeline
```
+--------------------------------------+
| (done) {appeal.step.filed}           |
| (done) {appeal.step.rerun}           |
|   Different model, prompt variant B  |
| (now)  {appeal.step.label}           |
|   {appeal.step.label.count}          |
|   3 of 5 labels in                   |
| (next) {appeal.step.policy}          |
| (next) {appeal.step.redecide}        |
| {appeal.step.waiting} real wait: 2 d |
| Outcome: {appeal.outcome.upheld} or  |
|  {appeal.outcome.overturned} or      |
|  {appeal.outcome.unclear}            |
| {decision.noPerson}                  |
+--------------------------------------+
```
Steps are shown only as far as they happen; the appeal never closes silently by timeout. The result screen reuses WF-DECISION-1.

## WF-MYACT-1  My problems and drafts
Route `/me`.
```
+--------------------------------------+
| {me.title}  My activity (@handle)    |
| Drafts                               |
|  Bus shelter...  Draft  [Continue]   |
| Submitted                            |
|  Water fountain... (Awaiting review) [Open] |
| Needs your attention                 |
|  Library hours... (Changes requested)|
|    Deleted on 31 Oct 2026  [Open]    |
| [ Sign out ]                         |
+--------------------------------------+
```

## WF-EXTERNAL-1  Routes for an individual or urgent situation
Offered inline (never blocking). Static, jurisdiction-appropriate.
```
+--------------------------------------+
| {external.title}  If this is urgent  |
| {external.body}                      |
| Emergency: call your local number    |
| Legal aid, counselling (route text   |
| from the jurisdiction pack)          |
| [ Continue my draft ] [ Delete it ]  |
+--------------------------------------+
```
