# Copy deck: stage plans, stage controls, follow and updates

Continuation of `copy-deck.md` (same rules: ICU MessageFormat, calm and plain, no exclamation marks, no em or en dashes, no concatenation). Text mirrors `can_app/src/i18n/en.json`.

## Added ids: plan.* (copy-deck-sync-2)
| id | English |
|---|---|
| plan.start.title | How do you want to start? |
| plan.start.oneStage | Start with one stage |
| plan.stage.goal | What this stage is for |
| plan.stage.required | This stage has to be done before the problem is solved |
| plan.stage.needsChoice | People choose between options in this stage |
| plan.stage.autoStart | Starts on its own when the stages before it are done |
| plan.stage.close | Close |
| plan.stage.moveUp | Move up |
| plan.stage.moveDown | Move down |
| plan.stage.newName | New stage |
| plan.stage.of | Stage {n, number} of {total, number} |
| plan.method.steward | A steward chooses |
| plan.method.other | Someone named in the plan chooses |
| plan.graph.parallelNames | {names} run at the same time. |
| plan.list.title | Stages ({n, number}), list |
| plan.issue.noCriteria | {names} needs at least one way to check that it is done. |
| plan.issue.noFinal | Add the final criteria first. Every plan ends with them. |
| plan.issue.other | Something in the plan needs a closer look. Check each stage. |
| plan.save | Save plan |
| plan.saved | Plan saved. You can keep editing. |
| plan.readOnly | The plan cannot change while volunteers review it. |
| plan.offline | You are offline. Your changes are kept here. Save the plan when you are back online. |
| plan.locked | The plan cannot be saved right now. Reload the page and try again. |

## Added ids: stage.* (copy-deck-sync-2)
| id | English |
|---|---|
| stage.control.title | Stage controls |
| stage.control.start | Start this stage |
| stage.control.start.why | Starting opens the stage for options, a choice and evidence. |
| stage.control.submit | Send evidence for checking |
| stage.control.submit.why | The evidence is checked against the stage goals. |
| stage.control.block | Mark as blocked |
| stage.control.block.why | Use this when a rule or fact stops the stage. Say what blocks it and what could change that. |
| stage.control.unblock | Clear the block |
| stage.control.unblock.why | Use this when the blocker is gone. Show how you know. |
| stage.control.perLine | One entry per line |
| stage.control.cancel | Cancel |
| stage.control.checking | Checking evidence |
| stage.control.checking.why | The evidence is being checked. This stage is waiting for the result. |
| stage.control.problemNotActive | This problem is not active right now, so the stage cannot change. |
| stage.control.notAllowed | Only the person who posted this problem can change the stage. |
| stage.control.conflict | The stage cannot move that way right now. Reload to see where it stands. |

## Added ids: follow.* (copy-deck-sync-2)
| id | English |
|---|---|
| follow.title | Follow this problem |
| follow.signin.why | Sign in to follow this problem. You choose what you hear about. |
| follow.signin | Sign in to follow |
| follow.loading | Loading your follow choice |
| follow.follow | Follow this problem |
| follow.email.label | Also email me updates |
| follow.email.consent | We email you only about this problem. You can mute or unfollow any time. |
| follow.state.following | You follow this problem. |
| follow.state.muted | You follow this problem, and it is muted. You get no updates about it. |
| follow.mute | Mute |
| follow.unmute | Unmute |
| follow.unfollow | Unfollow |
| follow.stopAll | Stop all emails |
| follow.error | That did not save. Nothing changed. Try again. |

## Added ids: updates.* (copy-deck-sync-2)
| id | English |
|---|---|
| updates.title | Updates |
| updates.intro | What happened on the problems you follow, newest first. |
| updates.signin.why | Sign in to see updates on the problems you follow. |
| updates.loading | Loading updates |
| updates.error | Updates did not load. Try again. |
| updates.empty | No updates yet. You only hear about changes that happen after you follow a problem. |
| updates.readAll | Mark all as read |
| updates.markRead | Mark as read |
| updates.markRead.a11y | Mark as read: {title} |
| updates.open | Open problem |
| updates.open.a11y | Open problem: {title} |
| updates.read | Read |
| updates.unread | Not read yet |
| updates.when | {date, date, medium} |
| updates.older | Show older updates |
| updates.email.on | You get update emails about some problems you follow. |

## Added ids: me.* (copy-deck-sync-2)
| id | English |
|---|---|
| me.updates | Updates |
