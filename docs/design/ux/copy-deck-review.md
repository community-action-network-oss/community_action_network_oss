# Copy deck: volunteer review and moderation screens

Continuation of `copy-deck.md` (same rules: ICU MessageFormat, calm and plain, no exclamation marks, no em or en dashes, no concatenation). Text mirrors `can_app/src/i18n/en.json`.

## Added ids: mod.* (copy-deck-sync)
| id | English |
|---|---|
| mod.invite.days | Days until it expires |
| mod.invite.daysHint | A whole number from 1 to 30. |
| mod.invite.daysInvalid | Enter a whole number from 1 to 30. |
| mod.invite.create | Create code |
| mod.invite.codeLabel | Your invite code |
| mod.invite.expires | Expires on {date, date, medium}. |
| mod.invite.onceWarning | This is shown once. When you leave this screen it is gone and we cannot show it again. |
| mod.invite.exact | Share the code exactly as shown, with the dashes and the same capital letters. |
| mod.invite.done | I have saved the code |
| mod.invite.listTitle | Invites you issued |
| mod.invite.empty | You have not issued any invites yet. |
| mod.invite.row | Issued {issued, date, medium}. Expires {expires, date, medium}. |
| mod.invite.used | Used |
| mod.invite.waiting | Not used yet |
| mod.invite.lapsed | Expired |
| mod.invite.notPermitted | Only stewards and admins can issue invites. |
| mod.invite.rateLimited | You have issued the most invites allowed for today. Try again tomorrow. |

## Added ids: vreview.* (copy-deck-sync)
| id | English |
|---|---|
| vreview.optin.nowOn | Volunteer review is on. |
| vreview.optin.nowOff | Volunteer review is off. Reviews you finished still count. |
| vreview.queue.shape | {place}, {stages, plural, one {# stage} other {# stages}}, {sources, plural, =0 {no sources} one {# source} other {# sources}} |
| vreview.queue.noPlace | No place given |
| vreview.mine.new | Not started by you |
| vreview.mine.in_progress | You have started this one |
| vreview.mine.finished | You finished this one |
| vreview.open.label | Review this problem: {place} |
| vreview.error.notPermitted | Volunteer review is not available to this account. |
| vreview.error.rateLimited | That was too many requests. Wait a moment and try again. |
| vreview.problem.title | Review a problem |
| vreview.conflict.start | Start reviewing |
| vreview.conflict.leave | Choose another problem |
| vreview.hidden.name | hidden name |
| vreview.hidden.contact | hidden contact |
| vreview.hidden.detail | hidden detail |
| vreview.rec.add.label | Recommend a change to: {target} |
| vreview.rec.changed | The problem has changed since you wrote this. |
| vreview.target.stage | Stage: {name} |
| vreview.target.stageCriteria | Criteria of stage: {name} |
| vreview.stage.heading | Stage {n, number}: {name} |
| vreview.finish.none | I have finished, no changes needed |
| vreview.finished | You finished your review. Thank you. |
| vreview.aggregate | {finishedReviews, plural, one {# volunteer has finished.} other {# volunteers have finished.}} Recommendations: {open, number} open, {accepted, number} accepted, {declined, number} declined. |
| vreview.error.gone | This problem is no longer in volunteer review. |
| vreview.error.notAllowed | You cannot review this one. You can only review other people's problems, and only with volunteer review turned on (rule REVIEW-1). |
| vreview.error.masking | We cannot show this problem safely right now, so nothing is shown. Try again in a moment. |
| vreview.error.dailyLimit | You have reached the daily limit for recommendations. Your text is kept. Try again tomorrow. |
| vreview.error.recheck | We could not check this just now. Your text is kept. Try again in a moment. |
| vreview.error.refused | We could not send this. Check that it holds no personal details, then try again. Your text is kept. |
| vreview.resolve.screen | Review of your problem |
| vreview.resolve.removed | Removed: |
| vreview.resolve.added | Added: |
| vreview.resolve.counts | {reviews, plural, one {# review finished} other {# reviews finished}}, day {days, number} |
| vreview.resolve.needsReviewers | No volunteer has finished a review yet. Your problem stays in review until one does. |
| vreview.resolve.wait | Reviews run in the order received. A held item waits rather than lowers the standard. |
| vreview.resolve.empty | No recommendations yet. Volunteers have not suggested any changes. |
| vreview.resolve.gone | This problem is not in volunteer review. |
| vreview.resolve.withdraw | Withdraw this problem |
| vreview.resolve.withdraw.ask | Withdraw this problem? It will not go to the public. |
| vreview.resolve.withdraw.yes | Yes, withdraw it |
| vreview.resolve.open | See volunteer recommendations |
| vreview.publish.recorded | Your request is recorded. The checks will run. Your problem is not public yet. |
| vreview.publish.notYet | You can ask for the check once enough volunteers have finished, or after 14 days with one finished review. |
| vreview.publish.refused | We could not record your request. Try again in a moment. |
