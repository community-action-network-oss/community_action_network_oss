# Wireframes: sign-in, sign-up, onboarding, session

Conventions for every wireframe file: ASCII low fidelity, 360 px width unless stated, `[ ]` field, `( )` option, `[ Button ]`, `{message.id}` message ids from `../copy-deck.md`. Layout is mirrored automatically in RTL: only logical start/end is used, never left/right. Reading and focus order is top to bottom, then start to end. Targets are at least 44 pt.

## WF-SIGNUP-1  Redeem invite and enter email
Route `/sign-up`. Reached from an invite link or the "I have an invite" link on WF-SIGNIN-1.
```
+--------------------------------------+
| Community Action Network             |
|                                      |
| {auth.signup.title}                  |
| Create your account                  |
| {auth.signup.body}                   |
| Writing is by invitation for now.    |
|                                      |
| Invite code                          |
| [ ABCD-EFGH                        ] |
| Email                                |
| [ you@example.org                  ] |
| {auth.email.privacy}                 |
| We encrypt it and never show it.     |
|                                      |
| [ Send me a code ]                   |
| {auth.signup.haveAccount}            |
+--------------------------------------+
```
States: validation inline under each field (`auth.invite.invalid`, `auth.email.invalid`); invite used or expired shows `auth.invite.used` with a path to ask on the open questions page; offline shows the shared offline banner.

## WF-SIGNIN-1  Email for returning members
Route `/sign-in`.
```
+--------------------------------------+
| {auth.signin.title}  Sign in         |
| {auth.signin.body}                   |
| We will email you a 6 digit code.    |
| Email                                |
| [ you@example.org                  ] |
| [ Send me a code ]                   |
| {auth.signin.noAccount}              |
| Reading needs no account.            |
+--------------------------------------+
```
Always answers `auth.code.sentGeneric` whether or not the address exists.

## WF-SIGNIN-2  Enter the 6 digit code
Route `/sign-in/code`. Used for both sign-up and sign-in.
```
+--------------------------------------+
| {auth.code.title}  Check your email  |
| {auth.code.body}                     |
| We sent a code to your address.      |
|                                      |
| [ 1 ][ 2 ][ 3 ][ 4 ][ 5 ][ 6 ]       |
|  (one input, autocomplete one-time-  |
|   code, paste friendly, numeric)     |
|                                      |
| [ Continue ]                         |
| {auth.code.resend}  Send a new code  |
| (available after 30 seconds)         |
| {auth.code.dev}  dev only: Mailpit   |
+--------------------------------------+
```
Errors: `auth.code.wrong` (with remaining attempts), `auth.code.expired`, `auth.code.locked` (ask for a new code). The web convenience link in the email opens this route with the code prefilled but still requires pressing Continue.

## WF-ONBOARD-1  Your public name
Route `/welcome`. Shown once after first verification.
```
+--------------------------------------+
| {onboard.title}  Welcome             |
| {onboard.handle.body}                |
| Your public name is                  |
|   +------------------------------+   |
|   |  QuietHeron42                |   |
|   +------------------------------+   |
| Your email is never shown.           |
|                                      |
| [ Try another name ]  (one use left) |
| {onboard.handle.regenNote}           |
|                                      |
| {onboard.promise}                    |
| What to expect: problems, not people |
| [ Continue ]                         |
+--------------------------------------+
```
After the regenerate is used the secondary button disappears and the note says the name is fixed once something is published.

## WF-SESSION-1  Session expired (sheet over current screen)
Appears on a 401 with code `session_expired`. The local draft is kept; nothing is lost.
```
+--------------------------------------+
|  {session.expired.title}             |
|  You were signed out                 |
|  {session.expired.body}              |
|  Your draft is saved on this device. |
|  [ Sign in again ]   [ Not now ]     |
+--------------------------------------+
```
After sign-in the user returns to the same route and field focus.
