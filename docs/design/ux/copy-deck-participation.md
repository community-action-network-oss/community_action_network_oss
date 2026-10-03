# Copy deck: contributions, options and choices

Continuation of `copy-deck.md` (same rules: ICU MessageFormat, calm and plain, no exclamation marks, no em or en dashes, no concatenation). Text mirrors `can_app/src/i18n/en.json`.

## Added ids: contrib.* (copy-deck-sync-2)
| id | English |
|---|---|
| contrib.add.open | Add a contribution |
| contrib.add.signin | Sign in to add a contribution |
| contrib.add.signinWhy | You can read everything without an account. Adding needs one. |
| contrib.add.none | There is nothing you can add right now. |
| contrib.add.loading | Loading the form |
| contrib.add.formError | We could not load this form. Try again in a moment. |
| contrib.add.sent | Sent. It is checked automatically and appears when the check passes. |
| contrib.add.another | Add another |
| contrib.add.back | Back to the problem |
| contrib.add.cooldown | You can add another contribution in about {minutes, plural, one {# minute} other {# minutes}}. |
| contrib.add.notAllowed | That kind of contribution is not open right now. Pick another kind or come back later. |
| contrib.add.notAllowedStage | This stage is {state}. That kind of contribution is not open right now. |
| contrib.add.allowanceError | We could not check how many replies you have left. You can still write. |
| contrib.add.flagsTitle | Please check these parts |
| contrib.list.title | Questions and notes for the whole problem |
| contrib.list.empty | No contributions yet. Add the first. |
| contrib.list.loading | Loading contributions |
| contrib.list.error | We could not load the contributions. |
| contrib.list.by | @{handle} on {date, date, medium} |
| contrib.list.awaiting | Awaiting review |
| contrib.list.hidden | Not shown to others |
| contrib.list.later | For a later stage |
| contrib.list.tomb | This contribution is no longer shown. It was taken out of view on {date, date, medium}. |
| contrib.list.link | {url} (opens in a new tab) |
| contrib.list.evidence | Links |
| contrib.type.clarifying_question | Questions |
| contrib.type.observation | Observations |
| contrib.type.personal_experience | Personal experiences |
| contrib.type.factual_claim | Facts claimed |
| contrib.type.evidence | Evidence |
| contrib.type.interpretation | Interpretations |
| contrib.type.root_cause | Possible causes |
| contrib.type.constraint | Limits and constraints |
| contrib.type.stakeholder_perspective | Points of view |
| contrib.type.proposed_solution | Proposed solutions |
| contrib.type.proposal_improvement | Ways to improve a proposal |
| contrib.type.risk | Risks |
| contrib.type.implementation_offer | Offers to help |
| contrib.type.progress_update | Progress updates |
| contrib.type.verification_evidence | Evidence it worked |

## Added ids: option.* (copy-deck-sync-2)
| id | English |
|---|---|
| option.order | Shown in the order they were added. No ranking. |
| option.n | Option {n} |
| option.by | Added by {handle} |
| option.awaiting | Awaiting review |
| option.later | Kept for a later stage |
| option.withdrawn | This option was withdrawn. Improvements to it stay readable. |
| option.read | Read option {n} |
| option.read.hide | Hide |
| option.read.error | We could not load this text. Try again in a moment. |
| option.improvement.by | Improvement by {handle} |
| option.improvement.read | Read this improvement |
| option.improve | Suggest an improvement |
| option.table | Options side by side |
| option.table.field | What to compare |
| option.row.mechanism | How it would work |
| option.row.authority | Who may do it |
| option.row.cost | Cost |
| option.row.risks | Risks |
| option.row.none | Not said |
| option.compare.wait | Options can be set side by side once there are two. |
| option.error | The options could not be loaded. Check your connection and try again. |
| option.back | Back to the options |
| option.sent | Sent. It is checked automatically and appears when the check passes. |
| option.review | Read it once more before posting. Adding an option uses one of your replies for today. |
| option.locked | A choice has been made, so options can no longer be added or changed. |

## Added ids: choice.* (copy-deck-sync-2)
| id | English |
|---|---|
| choice.title | Choice |
| choice.empty.open | No choice yet. Options are still being gathered and compared. |
| choice.empty.notStarted | No choice yet. The stage has to start first. |
| choice.withdrawn | An earlier choice was withdrawn. |
| choice.error | The choice could not be loaded. Check your connection and try again. |
| choice.chosen | Chosen |
| choice.steps | Steps |
| choice.method | How it was decided: {method} |
| choice.why | Why: {text} |
| choice.transitional | This decision record is transitional. Until the community ratifies the policy, the founder stewards it. |
| choice.make | Make the choice |
| choice.new.title | Make the choice |
| choice.record | Record the choice |
| choice.back | Back to the choice |
| choice.sent | The choice is recorded. |
| choice.held | This choice is on hold because a rule needs a legal check first. Nothing is lost. You can come back later and record it again. |
| choice.blocked | A law blocks this choice. Nothing was recorded and the stage is now blocked. The stage page shows which layer and article. |
| choice.locked | A choice cannot be recorded for this stage right now. |
| choice.notAllowed | Only the person who posted this problem can record the choice. |
| choice.gate.title | Legal check |
| choice.gate.clear | No law blocks this choice. |
| choice.gate.blocked | A law blocks this choice. |
| choice.gate.blocksThis | blocks this choice |
| choice.gate.articles | Articles: {ids} |
| choice.gate.corpus | Law collection version: {version} |
| choice.layer.L1 | UN human rights |
| choice.layer.L2 | Supranational law |
| choice.layer.L3 | National constitution |
| choice.layer.L4 | National law |
| choice.layer.L5 | Regional law |
| choice.layer.L6 | City rules |
| choice.finding.constrains | A rule limits this |
| choice.finding.permits | A rule allows this |
| choice.finding.none_found | No rule found |
| choice.finding.conflict | Rules disagree |
| choice.finding.not_applicable | Does not apply |
| choice.finding.unjudged | Found a rule that still needs a legal check |
| choice.finding.unknown | Not checked yet |
