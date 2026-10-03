# Copy deck: app shell, home, auth, lists, detail, forms and submit

Continuation of `copy-deck.md` (same rules: ICU MessageFormat, calm and plain, no exclamation marks, no em or en dashes, no concatenation). Text mirrors `can_app/src/i18n/en.json`.

## Added ids: home.* (copy-deck-sync)
| id | English |
|---|---|
| home.purpose | A place to raise problems that affect a community and work on them in the open. This app is an early preview. |
| home.health.heading | Connection |
| home.health.loading | Checking the connection to the server |
| home.health.ok | Connected to the server. Everything is working. |
| home.health.degraded | Connected to the server, but some parts are not working yet. {part, select, db {The database is not responding.} other {Please try again soon.}} |
| home.health.error | We could not reach the server. Check that it is running, then try again. |
| home.profile | Set up my profile |

## Added ids: common.* (copy-deck-sync)
| id | English |
|---|---|
| common.error.generic | Something went wrong. Your work is safe. Try again. |
| common.validation.required | This field is needed |
| common.validation.tooLong | That is {count, number} characters. The most is {max, number}. |
| common.field.needed | needed |
| common.field.counter | {count, number} / {max, number} characters |
| common.submitting | Sending |

## Added ids: nav.* (copy-deck-sync)
| id | English |
|---|---|
| nav.label | Main |
| nav.skip | Skip to main content |
| nav.discover | Discover |
| nav.report | Report |
| nav.me | My activity |
| nav.policy | Policy |
| nav.review | Review |
| nav.invites | Invites |
| nav.reviewProblems | Review problems |

## Added ids: emergency.* (copy-deck-sync)
| id | English |
|---|---|
| emergency.notice | If someone is in danger, contact your local emergency number. |

## Added ids: auth.* (copy-deck-sync)
| id | English |
|---|---|
| auth.signIn | Sign in |
| auth.signUp | Create an account |
| auth.welcome | Welcome |
| auth.email.never | Your email is never shown. |
| auth.age.label | I am 18 or older |
| auth.age.required | Please confirm you are 18 or older to go on. |
| auth.code.label | 6 digit code |
| auth.code.resent | If that address can sign in, we sent a new code. It lasts 10 minutes. |
| auth.code.invalid | That code is not right, or it has expired. Check it or ask for a new one. |
| auth.code.noEmail | We no longer have your address on this screen. Start again to get a code. |
| auth.code.restart | Start again |
| auth.signin.haveInvite | I have an invite |
| auth.rateLimited | Too many tries. Please wait {minutes, plural, one {# minute} other {# minutes}} and try again. |

## Added ids: form.* (copy-deck-sync)
| id | English |
|---|---|
| form.field.slot | This part has its own editor, which is not available in this screen yet. |
| form.list.item | Item {n, number} |
| form.list.add | Add another |
| form.list.remove | Remove item {n, number} |
| form.error.url | Use a web address that starts with https:// |
| form.error.tooShort | That is {count, number} characters. The least is {min, number}. |
| form.error.pattern | Check the form of this entry. The example above shows it. |
| form.error.duplicate | Each entry can appear only once |
| form.error.choice | Pick one of the choices |
| form.error.unknownWhy | Say what would help find out |
| form.version.retired | The form version you started on is no longer available. Your answers are kept and cannot be edited until you move to the new version. |
| form.version.migrate | This draft must move to the current form version before it can be saved. |
| form.savedLocal.at | Saved on this device at {time} |
| form.savedLocal.failed | This device could not save your draft |
| form.version.changed | New or changed: {fields} |
| form.version.graceEnds | You can stay on your version until {date, date, long}. |
| form.version.graceEnded | The time to stay on your version has ended. Move to the new version to edit the content or to submit. |
| form.version.minor | New optional fields were added to this form. Your answers are unchanged. |
| form.version.unavailable | A newer form version exists, but this draft cannot move yet. Your draft stays on your version and nothing is lost. |
| form.migrate.title | Move to the new form version |
| form.migrate.intro | Nothing moves until you say so. Confirm each answer below, or go back and stay on your version. |
| form.migrate.carried | Carried over: {from} to {to}. Your answer: {value} |
| form.migrate.confirmRow | Move my answer from {from} to {to}: {value} |
| form.migrate.removeRow | Remove my answer for {from}: {value} |
| form.migrate.noAnswer | no answer |
| form.migrate.newTitle | New questions |
| form.migrate.newBody | You will answer these after you move: {fields} |
| form.migrate.droppedTitle | Answers that will not carry over |
| form.migrate.droppedBody | These have no place in the new form: {fields} |
| form.migrate.confirmFirst | Confirm every answer above to move. |
| form.migrate.go | Move to the new version |
| form.migrate.back | Back to my draft |
| form.migrate.nothing | There is nothing to move: your draft is already on the current version. |

## Added ids: list.* (copy-deck-sync)
| id | English |
|---|---|
| list.order | Sorted by date published. Engagement is not used. |
| list.place.all | All places |
| list.stage.all | All stages |
| list.search.go | Search |
| list.loading | Loading problems |
| list.empty.filtered | Nothing matches these filters. Change the place, stage or search, or clear them. |
| list.more | Load more |
| list.more.loading | Loading more |
| list.error | The problems could not be loaded. Your filters are kept. Try again. |
| list.card.untitled | Untitled problem |
| list.card.needsInvestigation | Needs investigation |
| list.card.decided | Decided under policy {version} |
| list.card.reopened | Reopened under policy {version} |
| list.card.open | Open |

## Added ids: detail.* (copy-deck-sync)
| id | English |
|---|---|
| detail.status | Where this stands |
| detail.transitional | Transitional stewardship: only the founder approves this policy for now. |
| detail.loading | Loading this problem |
| detail.error | This problem could not be loaded. Check your connection and try again. |
| detail.notFound.title | Not found |
| detail.tombstone.on | It was taken out of view on {date, date, medium}. |
| detail.tombstone.kept | Replies and decisions that refer to it are kept. |
| detail.duplicate | This problem was marked as a duplicate of another. |
| detail.about | About this problem |
| detail.condition | The condition |
| detail.affected | Who is affected |
| detail.desiredOutcome | What would help |
| detail.place | Place: {place}. As reported. |
| detail.reviewCount | {count, plural, one {# review} other {# reviews}} |
| detail.history.loading | Loading history |
| detail.history.error | The history could not be loaded. |
| detail.history.empty | Nothing has changed yet. |
| detail.event.on | {date, date, medium} |
| detail.event.other | Status changed |
| detail.event.published | Published |
| detail.event.solved | Marked solved |
| detail.event.closed | Closed |
| detail.event.redirected | Redirected |
| detail.event.reopened | Reopened |

## Added ids: onboard.* (copy-deck-sync)
| id | English |
|---|---|
| onboard.handle.regenUsed | Your name can be changed once, and that is done. It stays the same now. |
| onboard.profile | Optional: set up a profile on this device to see problems you can move. |

## Added ids: submit.* (copy-deck-sync)
| id | English |
|---|---|
| submit.part.area | Affected area |
| submit.context.title | About your situation |
| submit.context.unavailable | Confirming your context is not available yet. You can go on without it. |
| submit.preview.masked | Volunteers see it with personal details hidden. |
| submit.preview.handle | Shown as @{handle} |
| submit.preview.explain.review_first | An automated review checks it against the published rules first. Only then is it public. |
| submit.preview.explain.fields_public | Only the fields above become public. |
| submit.preview.explain.handle_shown | Your email is never shown. |
| submit.preview.explain.flags_kept | Parts you chose to keep as written are not made public by the check. |
| submit.flags.title | Please check these parts |
| submit.flags.hard | Fix before sending: {part} contains something that cannot be shown. |
| submit.flags.review | Check {part}: it may name or point to a person or place. |
| submit.flags.keep | Keep as written |
