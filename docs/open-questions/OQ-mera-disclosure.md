# OQ-mera-disclosure: Must hosting or links from Mera be disclosed?

- **ID:** OQ-mera-disclosure
- **Status:** open

## Question

If a related company hosts early servers or links to CAN problems from its own products, what must CAN disclose publicly (who hosts, who can access data, what the links show), and what must stay separate (brand, ownership, data, policy)?

## Why it matters

Independence is a core promise. Earlier planning notes say CAN should not operate under another brand or be owned by it, and that the company may host early servers and offer neutral links. Hidden dependence would damage trust.

## Current default (what we built meanwhile)

Hosting is undecided and every service is portable (D-57). If a host is chosen, the choice and who can access the data are published before any real participant joins. Neutral "take action" links, if ever used, need a policy proposal.

Since D-79, Mera News is CAN's news pipeline partner:
- **Data flow:** CAN sends only the watch text of published, public problems to Mera, and reads articles back. No member data is sent.
- **Brand use:** a "Powered by Mera News, news pipeline partner" badge appears on the gallery, and in the app while the Mera adapter is configured.
- **Independence:** Mera is replaceable behind `NewsSourcePort` and has no say in moderation, ranking or governance.

The data flow and the partner are documented in `docs/integrations/mera-news.md`, and are listed in the public support ledger before any real participant joins.

## Who can help

Governance and independence researchers; data-protection officers; journalism ethics practitioners.

## What a good answer looks like

A disclosure checklist (host, access, data flows, links, branding) and the point in time each item must be public.

## Spec links

- `docs/spec/11-architecture.md`
- `docs/spec/20-participation-nonmonetary.md`
- `docs/open-questions/OQ-hosting-region.md`
