# 26. The capability profile

Status: Decided (D-80). Owner of the private capability profile and on-device matching. Constitution text is written in 16-u02 (planned article II.10, `CAPABILITY-PROFILE-LOCAL`).

## 1. Why

CAN is for people who solve problems, not people who consume content. A person arrives, says plainly what they know and what they can give, and is shown only the few public problems they can actually move. One person, maybe five problems, solved properly. Depth over reach.

- There is no engagement algorithm. Nothing is inferred from what a person opens, lingers on or skips. Only what the person chose to say shapes what they see (`17-ux.md`, "Deliberate, not addictive"; `RANK-1`).
- It is never called a feed. It has a stopping point, and it is named "Problems you can move".
- The public list is never ranked by engagement and always exists in plain form (section 4).

## 2. Structured registration

Registration mirrors problem preparation: structured answers, no free text that could identify someone. Every step can be skipped, every answer can be changed later, and nothing is required to belong. A person with an empty profile sees the plain public list.

1. **What you know.** Plain-language groups: care and health, hospitality and food, public service and administration, trades and repair, law and rights, teaching and childcare, transport, technology, research, community organising. No job titles, no employers.
2. **What you can give.** Time per month (a few bands), and kinds of help: evidence, local knowledge, a skill, translation, review.
3. **Places you are connected to.** Coarse areas only, kept private. The device check reuses ADR 0016 (`docs/adr/0016-private-location-attestation.md`): coordinates never leave the device, and doubt means no place is added.
4. **What affects you.** Topics from the same list the public problems use.
5. **Causes you care about.** Topics, chosen from the list.
6. **Languages you read and speak.**

## 3. No personal data

The profile holds no name, contact detail, exact location, employer or identifier. A rare skill plus a small place can identify someone even without a name, so the profile never leaves the device, not even in part, not even as a hash, a count or a query.

## 4. On the device

- The profile is stored encrypted at rest with a key held in the device's secure storage.
- Matching is a deterministic filter on the device. It runs against the public problem list, or a coarse region shard of it, fetched without signing in. The server receives nothing derived from the profile, and the fetch is the same for every person.
- Each match shows why it matched ("You speak Polish; this problem needs translation").
- A plain chronological view of every public problem always exists, one tap away, and is the default for anyone without a profile (`05-lifecycle-participation.md`, chronological or transparent alternative views).
- Matching never ranks by engagement, never hides a problem from the plain view, and has no learned or hidden weights. Same profile and same list give the same result.

## 5. What problems publish

Each public problem carries a `help_needed` set: skill groups, languages, coarse place and topic. The poster proposes it during preparation and volunteer review checks it. It describes the problem, never a person, and it is public like the rest of the problem. How strictly review checks it is an open question tracked by 16-u03.

## 6. Notices

- Notices are opt-in only (`NOTIFY-CONSENT-1`), with mute and leave.
- The server push knows nothing about interests. It says only "new public problems were published".
- The device then matches locally and raises its own notice if something fits. No match, no notice. No urgency language.

## 7. Control

A person can at any time view, edit, export to a file, import and delete the whole profile.

- Wipe clears the key first, then the store.
- Optional backup goes only to the person's own cloud drive, encrypted with a device-generated recovery code. CAN never holds the code or the backup.
- Losing the device without a backup loses the profile. That is by design and is stated at registration.

## 8. Limits, stated plainly

- Taking part in a problem is public by nature. The device-only rule covers browsing and matching, not participation. A contribution is a public act under the ordinary rules, with its own `impacted` or `guest` label.
- Showing a problem on a person's own device is not assignment or private matching: nobody is contacted, ranked or obliged (Constitution Art 59, Art 72, Art 33).
- A person who shares a screenshot or backup shares it themselves; CAN cannot prevent that.
- The pattern follows the mera protocol rules 1, 4 and 6 (D-80): facts stay on the device, no consumption signals leave it, inference happens on the device. Unlike mera, nothing derived from the profile is ever sent as a query.

## Links

`DECISIONS.md` D-80, `constitution/ch02-privacy-participation.md`, `constitution/ch07-expertise-reputation.md`, `17-ux.md`, `10-data-model.md`, `05-lifecycle-participation.md`, ADR 0016.
