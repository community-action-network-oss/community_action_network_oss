# Security policy

## Reporting a vulnerability

Do not open a public issue or pull request for a vulnerability. Report it privately. No private reporting channel exists yet. Until the repository is hosted, report privately to the maintainer through the channel by which you received the repository. GitHub private vulnerability reporting will be enabled at hosting time. See `docs/open-questions/OQ-security-and-conduct-contact.md`.

Please include what you found, how to reproduce it, and the impact. Reports must be verified by a human. Unverified or AI-fabricated reports may be closed.

## Scope

In scope: the code and configuration in `can_server`, `can_app`, `can_gallery`, the scripts, and the documented API contract.

Out of scope: third-party services and dependencies (report those upstream), social engineering of maintainers, and denial-of-service testing against anything you do not run yourself.

## What not to test

- There is no real user data. All data in this project is fictional. Do not create, upload or look for real personal data.
- Do not test against infrastructure you do not own or run. Run your own local copy with `docker compose`.
- Do not send secrets, private evidence or personal data to hosted AI services while investigating.

## Response

CAN is pre-release and run by volunteers. We will acknowledge reports as soon as we can and credit reporters who want credit.
