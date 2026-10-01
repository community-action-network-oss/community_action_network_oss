# Copy deck (English, slice 1)

All user-facing strings. Source of truth for `can_app` message files (`en.json`, ICU MessageFormat). Rules: calm, plain, non-shaming; reading level about grade 8; say what happens and what the person can do; no blame for stuck, paused or withdrawn; no exclamation marks; zero em dashes and en dashes (a lint grep enforces this); no string concatenation, use placeholders; plurals via ICU `plural`. Examples in the product are labelled fictional. Anything not built is labelled "planned". Placeholders in braces are ICU arguments, not message ids.

Chip labels (exact text from the brief): Awaiting volunteer review, Changes requested, Open: gathering facts, Open: developing solutions, Open: choosing a solution, In progress, Checking the result, Paused, Stuck, Solved, Closed, Redirected, Withdrawn, Not accepted. Plus the badge "Interim decision, will be re-reviewed". The app reads labels from the brief's table data; this deck must not redefine them. State labels, plain explanations and next actions for every lifecycle state come from `docs/spec/01-slice-1-brief.md#4-lifecycle`; this deck holds the surrounding UI strings only.

## Common
| id | English |
|---|---|
| common.appName | Community Action Network |
| common.fictionalBanner | Fictional data only. Nothing here is real. |
| common.loading | Loading |
| common.error.title | That did not work |
| common.error.body | Something went wrong on our side. Your work is safe. Try again in a moment. |
| common.error.retry | Try again |
| common.offline.banner | You are offline. You can read what is already loaded. Changes will wait until you reconnect. |
| common.notPermitted.title | You cannot do this here |
| common.notPermitted.body | This action is for {role, select, moderator {volunteer moderators} initiator {the person who started this problem} other {signed in members}}. |
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
| detail.back | Problems |
| detail.byline | Started by {handle} in {place} |
| detail.stage.explain | {explanation} |
| detail.known | Known |
| detail.uncertain | Not yet known |
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
| status.interim | Interim decision, will be re-reviewed |
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
| tombstone.title | This item is no longer shown |
| tombstone.withdrawn | The author withdrew it on {date, date, medium}. Replies and decisions that refer to it are kept. |
| tombstone.removed | A volunteer removed it on {date, date, medium} under {ruleId}. |
| tombstone.notFound | We could not find this. It may never have existed. |
| tombstone.back | Back to the problem |
| resolution.title | Resolution records |
| resolution.body | A plain archive of problems that were solved or closed. It is not a leaderboard. |
| resolution.filter | Resolved in |
| resolution.item | {outcome}. Resolved {date, date, medium} in {place}. |
| resolution.empty | Nothing has been resolved yet. |

## Submit (staged intake)
| id | English |
|---|---|
| submit.progress | Step {n, number} of {total, number} |
| submit.autosaved | Draft saved on this device |
| submit.condition.title | What public condition needs to change? |
| submit.condition.hint | Describe a shared situation, not a person. Example (fictional): "The bus shelter on Route 9 is missing." |
| submit.affected.title | Who or what is affected? |
| submit.affected.hint | Describe the group, not individuals. |
| submit.affected.howMany | How many, if you know? |
| submit.affected.unknown | I do not know |
| submit.where.title | Where does this happen? |
| submit.where.fictional | This preview has one made up place. |
| submit.where.privacy | Pick the widest area that is still useful. Never enter a street address. |
| submit.observed.title | What have you seen, and what is not yet known? |
| submit.observed.seen | What has been observed |
| submit.observed.unsure | What is uncertain or still unknown |
| submit.observed.hint | Mark guesses as guesses. That helps everyone. |
| submit.observed.nothingUncertain | I confirm nothing is uncertain |
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
| submit.privacy.none | Nothing was flagged. A volunteer still checks everything before it is public. |
| submit.privacy.confirm | I removed names, identifiers and private case details. |
| submit.preview.title | This is exactly what people would see |
| submit.preview.explain | A volunteer reviews it first. Only then is it public. You can edit or withdraw before that. If it is not published, the draft is deleted 30 days later. Your email is never shown. |
| submit.preview.duplicates | {count, plural, =0 {No similar problems found.} one {1 similar problem found.} other {# similar problems found.}} |
| submit.preview.different | This is different |
| submit.preview.addInstead | Add to that problem instead |
| submit.preview.edit | Back to edit |
| submit.preview.submit | Submit for review |
| external.title | If this is urgent |
| external.body | This place is for shared public problems, not individual help. These routes can help with a personal situation. |
| external.continue | Continue my draft |
| external.delete | Delete it |

## Pending, decision, appeal
| id | English |
|---|---|
| pending.title | Submitted, awaiting volunteer review |
| pending.wait | Volunteers review in the order things arrive. Right now that can take a few days. We cannot say exactly when. |
| pending.submittedAt | Submitted {date, date, medium} |
| pending.queue | About {position, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} in line (an estimate) |
| pending.email | We will email you when there is a decision. |
| pending.edit | Edit draft |
| pending.withdraw | Withdraw |
| pending.withdraw.confirm | Withdraw this? The draft will be deleted on {date, date, medium}. |
| decision.title | A volunteer asked for changes |
| decision.interim | Interim decision, will be re-reviewed |
| decision.rules | Reviewed under {ruleIds} (policy {version}) |
| decision.hint | Hint: {hint} |
| decision.keep | Your draft is kept so you can change it. |
| decision.deleteDate | It will be deleted on {date, date, medium} if nothing changes. |
| decision.revise | Revise and resubmit |
| decision.appeal | Appeal this decision |
| decision.appealUntil | You can appeal until {date, date, medium}. |
| decision.withdraw | Withdraw |
| decision.notPublished.title | Not accepted |
| decision.notPublished.body | This was not accepted because of {rule}. {hint} |
| decision.deleteNow | Delete now |
| appeal.title | Appeal this decision |
| appeal.body | A different volunteer will look at this whenever more than one is available. |
| appeal.sameReviewer | Only one volunteer is active right now, so the same person may review this. We tell you so you can decide. |
| appeal.rule | Which rule do you think was misapplied? (optional) |
| appeal.why | Why? |
| appeal.send | Send appeal |
| appeal.received | Appeal received. We will email you when there is an answer. |
| appeal.outcome.upheld | The earlier decision stands. Reason: {note} |
| appeal.outcome.overturned | The earlier decision was changed. Reason: {note} |
| me.reminder | This draft will be withdrawn on {date, date, medium} if there are no changes. |
| me.title | My activity |
| me.drafts | Drafts |
| me.submitted | Submitted |
| me.attention | Needs your attention |
| me.deletesOn | Deleted on {date, date, medium} |

## Participate and moderate
| id | English |
|---|---|
| contrib.add.title | Add to this problem |
| contrib.add.type | What kind of contribution is this? |
| contrib.add.hint | {typeHint} |
| contrib.add.review | A volunteer may check this before it appears. |
| contrib.add.reflect | Read it once more before posting. |
| contrib.add.post | Post |
| contrib.group.empty | Nothing here yet. |
| contrib.report | Report a concern |
| proposal.new.title | Propose a fix |
| proposal.new.lawful | Please check that it is lawful and safe. |
| proposal.empty | No proposals yet. |
| decrec.empty | No decision yet. Proposals are still open for feedback. |
| decrec.decidedBy | Decided by {handle} ({authority}) |
| decrec.confirmedBy | Confirmed by a volunteer moderator |
| task.verify.hint | Someone other than the person who did the task checks it. |
| task.empty | No tasks yet. |
| task.help | I can do this |
| mod.queue.title | Review queue |
| mod.queue.empty | Nothing is waiting. |
| mod.queue.interim | Interim: only {count, plural, one {# moderator is} other {# moderators are}} active. |
| mod.review.hint | Write the hint for the person who will read it, not for the rulebook. |
| mod.review.incomplete | Choose at least one rule. Changes and refusals also need a field and a hint. |
| mod.appeal.same | You decided the original. Only one moderator is active, so this will be shown as the same reviewer. |
| mod.invite.note | Share the code directly. It is shown only once. |
