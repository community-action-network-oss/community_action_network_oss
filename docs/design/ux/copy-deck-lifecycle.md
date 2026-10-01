# Copy deck: lifecycle v2 (D-72)

Continuation of `copy-deck.md` (same rules: ICU MessageFormat, calm and plain, no exclamation marks, no em or en dashes, no concatenation). Split out because the main deck reached the 25KB file limit. `check.py` reads both files. Labels come from `.claude/skills/can-code-large/briefs/lifecycle-v2.md`; the app still reads state labels from the spec table, this deck holds the surrounding UI strings.

Problem chips: Draft, In volunteer review, Active: stage {name}, Active: {n} stages in progress, Solved. The labels for paused, stuck, redirected, closed, withdrawn and the reopen labels are unchanged. Stage chips: Planned, Ready, In progress, Checking evidence, Done, Blocked, Skipped.

## Chips
| id | English |
|---|---|
| lifecycle.chip.draft | Draft |
| lifecycle.chip.inReview | In volunteer review |
| lifecycle.chip.active | Active: stage {name} |
| lifecycle.chip.activeMany | {n, plural, one {Active: # stage in progress} other {Active: # stages in progress}} |
| lifecycle.chip.solved | Solved |
| stage.chip.planned | Planned |
| stage.chip.ready | Ready |
| stage.chip.active | In progress |
| stage.chip.resolving | Checking evidence |
| stage.chip.resolved | Done |
| stage.chip.blocked | Blocked |
| stage.chip.skipped | Skipped |

## Preparation (WF-PREP-1 to WF-PREP-3)
| id | English |
|---|---|
| prep.title | Prepare your problem |
| prep.private | Private. Only you can see this until it is published. |
| prep.body | Fill in the facts, show that the issue is real, and say when it counts as solved. Volunteers then review it before the publication check. |
| prep.progress | {done, number} of {total, number} parts ready |
| prep.part.facts | Facts and causes |
| prep.part.sources | Trusted sources |
| prep.part.criteria | When it is solved |
| prep.part.stages | Stages (optional) |
| prep.part.ready | Ready |
| prep.part.todo | Not finished |
| prep.sources.title | Show that the issue is real |
| prep.sources.body | Add links to sources that others can check. |
| prep.trust.high | Official or primary source |
| prep.trust.medium | Established publisher |
| prep.trust.low | Not verified |
| prep.trust.unknown | We could not tell |
| prep.trust.help | Trust hints are advice. They never stop you from saving. |
| prep.sendReview | Send to volunteer review |
| prep.sendReview.missing | Before you send, finish: {parts} |
| prep.sendReview.masked | Volunteers see it with personal details hidden. |
| prep.sendReview.note | You can still edit. Changes you make while it is in review are shown to reviewers. |
| crit.title | When is this solved |
| crit.body | Write final acceptance criteria. Each one should be something anyone can check. |
| crit.add | Add a criterion |
| crit.remove | Remove this criterion |
| crit.statement | The criterion |
| crit.measure | How it is measured |
| crit.target | Target or threshold |
| crit.evidence | Evidence that would show it |
| crit.example | Example, synthetic: {text} |
| crit.hint.vague | This is hard to check: {hint} |
| crit.count | {count, plural, =0 {No criteria yet.} one {# criterion} other {# criteria}} |
| crit.required | At least one final criterion is needed. |
| plan.title | Stage plan |
| plan.optional | A stage plan is optional. You can publish with final criteria only and add stages later. |
| plan.start.template | Start from classic-5 |
| plan.start.blank | Start blank |
| plan.template.help | classic-5 has five stages in a row: gathering facts, developing solutions, choosing a solution, in progress, checking the result. You can change anything. |
| plan.stage.add | Add a stage |
| plan.stage.name | Stage name |
| plan.stage.criteria | Acceptance criteria for this stage |
| plan.stage.method | How the choice is made |
| plan.method.poster | The poster chooses, after community input |
| plan.method.community | The community chooses |
| plan.stage.dependsOn | Starts after |
| plan.stage.dependsNone | Nothing, it can start right away |
| plan.stage.remove | Remove this stage |
| plan.graph.title | Order of stages |
| plan.graph.help | A stage waits for the stages it starts after. Stages that do not wait for each other run at the same time. |
| plan.graph.serial | In a row |
| plan.graph.parallel | At the same time |
| plan.graph.cycle | These stages wait for each other: {names}. Remove one link. |
| plan.graph.noEnd | Every stage must lead to the final criteria. {names} does not. |
| plan.view.graph | Graph |
| plan.view.list | List |

## Volunteer review (WF-VREVIEW-1 to WF-VREVIEW-3)
| id | English |
|---|---|
| vreview.optin.title | Review as a volunteer |
| vreview.optin.body | You can check problems before they are public. You see them with personal details hidden. You can turn this off at any time. |
| vreview.optin.on | Turn on volunteer review |
| vreview.optin.off | Turn off volunteer review |
| vreview.queue.title | Problems to review |
| vreview.queue.empty | Nothing to review right now. |
| vreview.queue.item | {place}, {parts, number} parts, {recs, plural, =0 {no recommendations yet} one {# recommendation} other {# recommendations}} |
| vreview.open | Review this problem |
| vreview.masked | Personal details are hidden. Do not try to work out who wrote this. |
| vreview.conflict | I know this problem or the people in it |
| vreview.conflict.help | Say so and we will give you another one. |
| vreview.rec.add | Recommend a change |
| vreview.rec.target | Applies to |
| vreview.rec.change | What should change |
| vreview.rec.why | Why |
| vreview.rec.send | Send recommendation |
| vreview.rec.sent | Recommendation sent. The poster will answer it. |
| vreview.rec.mine | Your recommendations |
| vreview.finish | I have finished my review |
| vreview.resolve.title | Recommendations from volunteers |
| vreview.resolve.reviewer | Volunteer {n, number} |
| vreview.resolve.accept | Accept |
| vreview.resolve.decline | Decline |
| vreview.resolve.reason | Your reason |
| vreview.resolve.reasonRequired | A reason is needed for each answer. |
| vreview.resolve.diff | What would change |
| vreview.resolve.status.open | Open |
| vreview.resolve.status.accepted | Accepted |
| vreview.resolve.status.declined | Declined |
| vreview.resolve.unresolved | {count, plural, one {# recommendation is still open.} other {# recommendations are still open.}} The publication check takes them into account. |
| vreview.publish | Ask for the publication check |

## Stage map and stage workspace (WF-STAGEMAP-1, WF-STAGE-1 to WF-STAGE-3)
| id | English |
|---|---|
| stagemap.title | Stage map |
| stagemap.help | A stage waits for the stages it starts after. Stages that do not wait for each other run at the same time. |
| stagemap.current | Current |
| stagemap.after | Starts after: {names} |
| stagemap.next | Needed before: {names} |
| stagemap.open | Open this stage |
| stagemap.blockedWhy | Blocked: {constraint} |
| stagemap.skippedWhy | Skipped: {reason} |
| stagemap.final | Final criteria |
| stagemap.change | Propose a change to the plan |
| stage.locked | This stage cannot start until {names} is done. |
| stage.options | Options |
| stage.option.add | Suggest an option |
| stage.option.empty | No options yet. |
| stage.choice | Choice |
| stage.choice.method | Decided by: {method} |
| stage.choice.pending | No choice yet. |
| stage.choice.make | Choose this option |
| stage.choice.chosen | Chosen by {who} on {date} |
| stage.steps | Steps |
| stage.step.add | Add a step |
| stage.step.empty | No steps yet. They are added after a choice. |
| stage.evidence | Evidence |
| stage.evidence.add | Add evidence |
| stage.evidence.empty | No evidence yet. |
| stage.criteria | Acceptance criteria |
| stage.criteria.progress | {met, number} of {total, number} criteria have evidence |
| stage.submit | Submit evidence for checking |
| stage.checking | Checking evidence. This is an automated check against the criteria. It usually takes {wait}. |
| stage.result.title | Result of the check |
| stage.result.met | Met |
| stage.result.notMet | Not met yet |
| stage.result.why | Why |
| stage.result.next | What would help |
| stage.result.rule | Rule {ruleId}, policy {version} |
| stage.result.appeal | Appeal this result |
| stage.result.done | This stage is done. {n, plural, =0 {No stage is waiting for it.} one {# stage is now ready.} other {# stages are now ready.}} |
| stage.ahead.title | Contribute ahead of time |
| stage.ahead.body | This stage has not started. What you add now is kept and shown when it starts. |
| stage.ahead.waiting | Waiting for: {names} |
| stage.ahead.add | Add for this stage |
| stage.ahead.kept | Kept for when this stage starts. |
