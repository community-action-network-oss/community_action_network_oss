# Copy deck (English, slice 1)

All user-facing strings. Source of truth for `can_app` message files (ICU MessageFormat). Rules: calm, plain, non-shaming; reading level about grade 8; say what happens and what the person can do; no blame for stuck, paused or withdrawn; no exclamation marks; zero em dashes and en dashes (a lint grep enforces this); no string concatenation, use placeholders; plurals via ICU `plural`. Seed examples are labelled as synthetic. Anything not built is labelled "planned". Placeholders in braces are ICU arguments, not message ids. Message ids use letters and dots only.

Chip labels (exact text from the brief): Awaiting review, Changes requested, Open: gathering facts, Open: developing solutions, Open: choosing a solution, In progress, Checking the result, Paused, Stuck, Solved, Closed, Redirected, Withdrawn, Not accepted. Plus two policy badges: "Decided under policy {version}" and, while only founder stewardship approves the pack, "Policy {version}, transitional stewardship". The app reads labels from the brief's table data; this deck must not redefine them. State labels, plain explanations and next actions come from `docs/spec/01-slice-1-brief.md#4-lifecycle`; this deck holds the surrounding UI strings only.

Lifecycle v2 (D-72) strings, including the new problem chips (Draft, In volunteer review, Active: stage {name}, Solved) and the stage chips (Planned, Ready, In progress, Checking evidence, Done, Blocked, Skipped), are in `copy-deck-lifecycle.md`. Chip labels above that belong to the retired fixed sequence (Awaiting review, Open: ..., Checking the result) are kept only until the app drops them.

Form field labels, guidance, examples and hints-by-field come from the content schema version in the policy pack (D-58), never from this deck. This deck holds only the form chrome (`form.*`).

## Common
| id | English |
|---|---|
| common.appName | Community Action Network |
| common.seedBanner | Seed problem, synthetic evidence. Nothing here is a real report. |
| common.loading | Loading |
| common.error.title | That did not work |
| common.error.body | Something went wrong on our side. Your work is safe. Try again in a moment. |
| common.error.retry | Try again |
| common.offline.banner | You are offline. You can read what is already loaded. Changes will wait until you reconnect. |
| common.notPermitted.title | You cannot do this here |
| common.notPermitted.body | This action is for {role, select, auditor {auditors} labeler {labelers} lane {the emergency and legal lane} maintainer {policy maintainers} initiator {the person who started this problem} other {signed in members}}. |
| common.back | Back |
| common.next | Next |
| common.cancel | Cancel |
| common.save | Save |
| common.loadMore | Load more |
| common.showing | Showing {shown, number} of {total, number} |
| common.sortedBy.activity | Sorted by recent activity |
| common.sortedBy.oldest | Oldest first |
| common.field.required | This field is needed |
| common.field.tooLong | Please use {max, number} characters or fewer. You have {count, number}. |
| common.linkOpensNew | Opens in a new tab |

## Auth and onboarding
| id | English |
|---|---|
| auth.signup.title | Create your account |
| auth.signup.body | Writing is by invitation for now. Reading needs no account. |
| auth.signup.haveAccount | Already have an account? Sign in |
| auth.signin.title | Sign in |
| auth.signin.body | We will email you a 6 digit code. No password needed. |
| auth.signin.noAccount | No account yet? You can read everything without one. |
| auth.invite.label | Invite code |
| auth.invite.invalid | That invite code did not work. Check it and try again. |
| auth.invite.used | This invite has already been used or has expired. Ask the person who invited you for a new one. |
| auth.email.label | Email |
| auth.email.invalid | That does not look like an email address. |
| auth.email.privacy | We keep your email encrypted and never show it to anyone. |
| auth.send | Send me a code |
| auth.code.sentGeneric | If that address can sign in, we sent a code. It lasts 10 minutes. |
| auth.code.title | Check your email |
| auth.code.body | Enter the 6 digit code we sent you. |
| auth.code.continue | Continue |
| auth.code.resend | Send a new code |
| auth.code.resendIn | You can ask for a new code in {seconds, number} seconds. |
| auth.code.wrong | That code is not right. {remaining, plural, one {# try left} other {# tries left}}. |
| auth.code.expired | That code has expired. Ask for a new one. |
| auth.code.locked | Too many tries. Ask for a new code. |
| auth.code.dev | Development only: open Mailpit to read the code. |
| onboard.title | Welcome |
| onboard.handle.body | Your public name is {handle}. Your email is never shown. |
| onboard.handle.another | Try another name |
| onboard.handle.regenNote | You can change it once, until you publish something. After that it stays the same. |
| onboard.promise | Here we work on shared public problems, not on people. |
| onboard.continue | Continue |
| session.expired.title | You were signed out |
| session.expired.body | Your draft is saved on this device. Sign in again to carry on. |
| session.expired.signIn | Sign in again |
| session.expired.notNow | Not now |
| auth.signOut | Sign out |

## Browse and detail
| id | English |
|---|---|
| list.title | Problems |
| list.place | Place |
| list.stage | Stage |
| list.search | Search problems |
| list.empty.title | No problems here yet |
| list.empty.body | Be the first to describe one, or change the place or stage filter. |
| list.clearFilters | Clear filters |
| list.report | Report a public problem |
| list.card.next | Next: {action} |
| list.card.contributions | {count, plural, one {# contribution} other {# contributions}} |
| list.card.seed | Seed problem, synthetic evidence |
| detail.back | Problems |
| detail.byline | Started by {handle} in {place} |
| detail.bylineSeed | Seed problem in {place}. No person started it. |
| detail.seed.explain | This problem was written by the project to start the platform. Its evidence is synthetic and is shown so you can see how the work looks. |
| detail.stage.explain | {explanation} |
| detail.known | Known |
| detail.uncertain | Not yet known |
| detail.assumptions | Assumptions made |
| detail.neededNext | Needed next |
| detail.add | Add to this problem |
| detail.tab.overview | Overview |
| detail.tab.contributions | Contributions |
| detail.tab.proposals | Proposals |
| detail.tab.decision | Decision |
| detail.tab.tasks | Tasks |
| detail.tab.history | History |
| detail.tier.needsEvidence | Needs evidence |
| detail.sources | Sources |
| detail.editUnderReview | An edit is under review. This is the last approved version. |
| detail.assisted | Assisted |
| status.decidedUnder | Decided under policy {version} |
| status.transitional | Policy {version}, transitional stewardship |
| status.transitional.explain | Until the community ratifies the policy, the founder stewards it. The policy is public and can be changed. |
| status.paused.title | Paused |
| status.paused.reason | Reason: {reason} |
| status.paused.resumes | Picks up again when: {condition} |
| status.paused.help | I can help with this |
| status.stuck.title | Stuck |
| status.stuck.body | There has been no recent progress. This is not a judgement of anyone. |
| status.stuck.next | Here is what would help move it forward. |
| status.stuck.help | See what would help |
| status.withdrawn.title | Withdrawn |
| status.withdrawn.body | The person who raised this withdrew it before anyone else took part. |
| status.closed.title | Closed |
| status.redirected.title | Redirected |
| status.redirected.body | This is better handled by another group. Routes that can help are listed below. |
| status.solved.title | Solved |
| reopen.title | Reopened under policy {version} |
| reopen.old | Earlier result: {outcome}, decided under policy {oldVersion}. The old record is kept. |
| reopen.changed | What changed: rule {ruleId}, policy or law {oldVersion} to {newVersion}. |
| reopen.body.t20 | New rules or law changed the conclusion of this earlier result, and reopening is feasible. |
| reopen.body.t21 | The rules for evidence changed and the earlier result no longer meets them. |
| reopen.next.t20 | Add options or evidence under the new rule. The problem continues from {state}. |
| reopen.next.t21 | Add verification evidence that meets the new rule. |
| reopen.appeal | Disagree? Appeal this decision until {date, date, medium}. |
| reopen.oldrecord | Read the old record |
| tombstone.title | This item is no longer shown |
| tombstone.withdrawn | The author withdrew it on {date, date, medium}. Replies and decisions that refer to it are kept. |
| tombstone.removed | It was taken out of public view on {date, date, medium} under {ruleId}, policy {version}. You can read the reason and the appeal route. |
| tombstone.notFound | We could not find this. It may never have existed. |
| tombstone.back | Back to the problem |
| resolution.title | Resolution records |
| resolution.body | A plain archive of problems that were solved or closed. It is not a leaderboard. |
| resolution.filter | Resolved in |
| resolution.item | {outcome}. Resolved {date, date, medium} in {place}. |
| resolution.empty | Nothing has been resolved yet. |

## Forms (schema driven, D-58)
| id | English |
|---|---|
| form.progress | Section {n, number} of {total, number}: {section} |
| form.progress.fields | {done, number} of {required, number} needed fields answered |
| form.version | Form version {version} |
| form.version.pinned | You started on version {version}. We keep your draft on that version until you choose to move. |
| form.version.newer | A newer version of this form is available. Moving keeps your answers and shows what is new. |
| form.version.move | Move to the new version |
| form.version.stay | Stay on my version |
| form.saveDraft | Save draft |
| form.saved | Draft saved on this device and in your account |
| form.savedLocal | Draft saved on this device. It will sync when you are back online. |
| form.field.why | Why we ask |
| form.field.example | Example |
| form.field.exampleLabel | Example, synthetic: {text} |
| form.field.basis | How do you know this? |
| form.basis.seen | I saw it myself |
| form.basis.source | A source reports it |
| form.basis.inferred | I worked it out from other facts |
| form.basis.assumed | I am assuming it |
| form.field.unknown | I do not know this yet |
| form.field.unknownWhy | What would help find out? |
| form.field.unsupported | This form has a field type this app version cannot show. Your other answers are safe. Update the app to answer it. |
| form.field.unsupportedBlocks | You cannot submit until that field can be answered. |
| form.assist.offer | Suggest an answer |
| form.assist.working | Drafting a suggestion. Nothing is filled in yet. |
| form.assist.suggestion | Suggested answer. Read it before you use it. |
| form.assist.accept | Use this answer |
| form.assist.edit | Edit then use |
| form.assist.discard | Discard |
| form.assist.marker | Assisted |
| form.assist.markerHelp | A suggestion helped write this answer and you confirmed it. People who read it can see that. |
| form.assist.unavailable | Suggestions are not available right now. You can answer the field yourself. |
| form.assist.privacy | We hide personal details before a suggestion is made. |
| form.assumption.prompt | What are you taking for granted here? List each assumption on its own line. |
| form.assumption.add | Add an assumption |
| form.assumption.none | I checked and I am not assuming anything |
| form.assumption.item | Assumption {n, number} |
| form.hint.title | Needs a closer look |
| form.hint.assumption | This rests on an assumption that may not hold: {hint} |
| form.hint.incomplete | This needs a fuller answer: {hint} |
| form.hint.rule | Rule {ruleId}, policy {version} |
| form.hint.fixed | Changed since the last check |
| form.hint.count | {count, plural, =0 {No fields need a closer look.} one {# field needs a closer look.} other {# fields need a closer look.}} |
| form.check | Check my draft |
| form.check.running | Checking. This is advice only. Nothing is submitted. |
| form.check.ok | Nothing needs a closer look right now. The full check still runs when you submit. |
| form.review | Review before submitting |
| form.submit | Submit |

## Submit (problem form)
| id | English |
|---|---|
| submit.start.title | Report a public problem |
| submit.start.body | You will answer a short set of questions about facts, causes, who is affected, scope, lawful options, what is uncertain and what you assume. Take your time. |
| submit.evidence.title | Where can others check this? |
| submit.evidence.body | Add links only. Uploads are not part of this version. |
| submit.evidence.link | Link |
| submit.evidence.note | Note about the link |
| submit.evidence.add | Add another link |
| submit.evidence.none | I do not have a source yet. That is fine. It will be marked "needs evidence". |
| submit.evidence.invalid | Use a link that starts with https. |
| submit.evidence.private | This looks like a private or personal page. Please link a public source instead. |
| submit.flag.name | This looks like it names a person: "{text}". Describe their role or office instead. |
| submit.flag.address | This looks like a street address: "{text}". Use the neighbourhood or ward instead. |
| submit.flag.contact | This looks like a phone number or email: "{text}". Please remove it. |
| submit.flag.individual | This reads like one person's case. A public problem needs a shared condition. |
| submit.flag.generalise | Generalise it |
| submit.flag.keep | Keep as is |
| submit.privacy.title | Check for private details |
| submit.privacy.body | We found {count, plural, =0 {nothing} one {# thing} other {# things}} to look at. |
| submit.privacy.none | Nothing was flagged. The automated review still checks everything before it is public. |
| submit.privacy.confirm | I removed names, identifiers and private case details. |
| submit.preview.title | This is exactly what people would see |
| submit.preview.explain | An automated review checks it against the published rules first. Only then is it public. You can edit or withdraw before that. If it is not published, the draft is deleted 30 days later. Your email is never shown. |
| submit.preview.duplicates | {count, plural, =0 {No similar problems found.} one {1 similar problem found.} other {# similar problems found.}} |
| submit.preview.different | This is different |
| submit.preview.addInstead | Add to that problem instead |
| submit.preview.edit | Back to edit |
| submit.preview.submit | Submit for review |
| external.title | If this is urgent |
| external.body | This place is for shared public problems, not individual help. These routes can help with a personal situation. |
| external.continue | Continue my draft |
| external.delete | Delete it |

## Pending, hold, decision, notices, appeal
| id | English |
|---|---|
| pending.title | Awaiting review |
| pending.checking | Checking against policy {version} |
| pending.wait | An automated review checks this against the published rules. It usually takes seconds to a few minutes. If it takes longer, we say so here. Nothing is public yet. |
| pending.submittedAt | Submitted {date, date, medium} |
| pending.email | We will email you when there is a decision. |
| pending.edit | Edit draft |
| pending.withdraw | Withdraw |
| pending.withdraw.confirm | Withdraw this? The draft will be deleted on {date, date, medium}. |
| hold.title | Taking longer than usual |
| hold.body | The check has not finished. Nothing is public until it does. Your work is safe and still private. |
| hold.retrying | We are trying again. Last attempt {time, time, short}. |
| hold.age | Waiting for {minutes, plural, one {# minute} other {# minutes}}. |
| hold.rule | A held item never becomes public just because time passed. |
| hold.language | We cannot yet review this language. It stays private until we can. |
| hold.crisis | If someone is in danger, call your local emergency number now. |
| decision.title.needsRevision | Changes are needed before this can be shared |
| decision.title.notAccepted | Not accepted |
| decision.explain | {explanation} |
| decision.rules | Decided under {ruleIds} |
| decision.policy | Policy {version}, run {runId} |
| decision.noPerson | An automated review applied a rule that people wrote. No person decided this one item. |
| decision.hint | Hint: {hint} |
| decision.hintHere | Hint for this field |
| decision.keep | Your draft is kept so you can change it. |
| decision.deleteDate | It will be deleted on {date, date, medium} if nothing changes. |
| decision.revise | Revise and resubmit |
| decision.appeal | Appeal this decision |
| decision.appealUntil | You can appeal until {date, date, medium}. |
| decision.withdraw | Withdraw |
| decision.notPublished.body | This was not accepted because of {rule}. {hint} |
| decision.deleteNow | Delete now |
| decision.model | Reviewed by a {modelClass} model with prompt variant {variant}. |
| remod.title | Re-reviewed under policy {version} |
| remod.body | The rules changed. We checked this again under the new version and the result is different. |
| remod.what | What changed: {explanation} |
| remod.rules | Rules now applied: {ruleIds} |
| remod.visible | It stays visible until {date, date, medium}. You can revise it or appeal before then. |
| remod.immediate | This was taken out of public view right away because it involves {tier, select, privacy {private details} crisis {someone's safety} other {a protected category}}. You can appeal. |
| remod.revise | Revise it |
| remod.permissive | The new policy would allow this. You can resubmit it now. |
| remod.resubmit | Resubmit now |
| remod.public | This item was re-reviewed under policy {version}. {explanation} |
| remod.nothingSilent | Nothing is removed without a notice. |
| appeal.title | Appeal this decision |
| appeal.body | A second automated review runs with a different model and prompt. If you still disagree, a randomized panel of community members reads a masked copy. People never override one item by hand. They can change the rule. |
| appeal.rule | Which rule do you think was misapplied? |
| appeal.why | Why? |
| appeal.send | Send appeal |
| appeal.received | Appeal received. We will email you when there is an answer. |
| appeal.step.filed | Appeal filed |
| appeal.step.rerun | Second review with a different model |
| appeal.step.label | Community label task |
| appeal.step.label.count | {done, number} of {total, number} labels in. Identities are never shown. |
| appeal.step.policy | Policy change proposed |
| appeal.step.redecide | Decided again under the new policy |
| appeal.step.done | Done |
| appeal.step.waiting | Waiting. Real wait so far: {days, plural, one {# day} other {# days}}. |
| appeal.outcome.upheld | The earlier decision stands. Reason: {note} |
| appeal.outcome.overturned | The earlier decision was changed. Reason: {note} |
| appeal.outcome.unclear | The rule is right, but its wording was unclear. We have asked for a clearer rule. |
| me.reminder | This draft will be withdrawn on {date, date, medium} if there are no changes. |
| me.title | My activity |
| me.drafts | Drafts |
| me.submitted | Submitted |
| me.attention | Needs your attention |
| me.deletesOn | Deleted on {date, date, medium} |

## Participate (structured forms)
| id | English |
|---|---|
| contrib.add.title | Add to this problem |
| contrib.add.type | What kind of contribution is this? |
| contrib.add.review | It is checked automatically before it appears. |
| contrib.add.reflect | Read it once more before posting. |
| contrib.add.post | Post |
| contrib.group.empty | Nothing here yet. |
| contrib.report | Report a concern |
| proposal.new.title | Propose a fix |
| proposal.new.lawful | Name the law or rule that allows it, or say you do not know yet. |
| proposal.empty | No proposals yet. |
| decrec.new.title | Record the decision |
| decrec.empty | No decision yet. Proposals are still open for feedback. |
| decrec.decidedBy | Decided by {handle} ({authority}) |
| decrec.checked | Record checked for completeness under policy {version} |
| decrec.dissent | Dissent and concerns are kept with the record. |
| task.new.title | Add a task |
| task.verify.hint | Someone other than the person who did the task checks it. |
| task.verify.evidence | What shows the task is done? Link a public source. |
| task.empty | No tasks yet. |
| task.help | I can do this |

## Review work (auditors, labelers, lane)
| id | English |
|---|---|
| review.title | Review work |
| review.empty | Nothing is waiting. |
| review.body | You see masked copies. Names, handles and accounts are removed. You judge the rule, not the person. |
| review.noCounts | Work is offered in random order. |
| audit.title | Audit a decision |
| audit.why | This decision was picked at random, or because it was close to a threshold. |
| audit.q.agree | Does the decision follow the rule as written? |
| audit.agree | It follows the rule |
| audit.disagree | It does not follow the rule |
| audit.unclear | The rule is unclear here |
| audit.note | What should the rule say? (optional) |
| audit.send | Record my review |
| audit.sent | Recorded. Thank you. Disagreements are tracked and may become a policy proposal. |
| audit.conflict | I have a conflict with this item |
| label.title | Label task |
| label.q | {question} |
| label.masked | Context is limited to what the question needs. |
| label.independent | Your label is recorded before anyone sees the group result. |
| label.yes | Yes |
| label.no | No |
| label.unsure | Not sure |
| label.send | Send label |
| label.sent | Label recorded. |
| lane.title | Emergency and legal lane |
| lane.scope | Only credible imminent danger and legal or law enforcement matters. Every action is logged. |
| lane.noPublish | This lane cannot publish content or overturn a rule decision. |
| lane.action | Action |
| lane.reason | Reason (required) |
| lane.record | Record action |
| lane.logged | Logged. A second lane member will review it. |
| lane.empty | No cases waiting. |
| mod.invite.title | Issue an invite |
| mod.invite.note | Share the code directly. It is shown only once. |

## Policy and simulation
| id | English |
|---|---|
| policy.title | Policy proposal |
| policy.new.title | Propose a policy change |
| policy.new.body | Describe the change in the fields below. It goes through automated tests, a replay over past decisions, and ratification. |
| policy.stage | Stage: {stage, select, proposal {Proposal} eval {Automated tests} replay {Replay} ratification {Ratification} shadow {Shadow} canary {Canary} full {Full rollout} other {Unknown}} |
| policy.eval.title | Automated test results |
| policy.eval.pass | Passed |
| policy.eval.fail | Did not pass. This blocks the change. |
| policy.replay.title | Replay over past decisions |
| policy.replay.body | If this version had been live, {flips, number} of {total, number} sampled decisions would have a different result. |
| policy.replay.expected | {count, number} match the examples that motivated the change. |
| policy.replay.unexpected | {count, number} were not expected. These need an explanation. |
| policy.replay.masked | Examples are masked. You judge the rule, not the person. |
| policy.ratify.title | Ratification |
| policy.ratify.panel | A randomized, masked panel from several jurisdictions reads the evidence. |
| policy.ratify.transitional | The founder approves this version for now, in public. This is transitional stewardship. |
| policy.ratify.status | {state, select, open {Waiting for the panel} done {Ratified} declined {Not ratified} other {Unknown}} |
| policy.ratify.dissent | Dissent is recorded and published with the result. |
| sim.title | Simulation runs |
| sim.body | Persona agents use the real pipeline with synthetic content. They test the policy. They are not real people. |
| sim.persona | Persona: {persona} |
| sim.metric.flip | Flip rate after policy change |
| sim.metric.falseReject | Good content wrongly held or rejected |
| sim.metric.overturn | Appeals overturned |
| sim.metric.injection | Injection attempts stopped |
| sim.metric.cost | Cost per accepted result |
| sim.graduation.title | Progress toward opening public participation |
| sim.graduation.met | Met |
| sim.graduation.notMet | Not yet met |
| sim.live.gated | Live model runs need the founder's go ahead and a spend cap. This report uses recorded responses. |
