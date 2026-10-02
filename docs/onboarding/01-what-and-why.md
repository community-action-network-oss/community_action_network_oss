# 01 What and why

CAN (Community Action Network) is an open-source platform where people turn public problems into evidence, lawful solutions and tracked outcomes. It is at the **concept and scaffolding stage**. Read the full idea in the [manifesto](../../manifesto.md) and the [specification index](../spec/00-index.md).

## Two main goals (D-76)

**Goal 1, solve public problems.** A person describes a shared problem, such as a stretch of road with no safe crossing. The platform helps gather evidence, find a lawful solution within the rules that apply where they live, and track the outcome until the problem is solved or honestly ended. The stages a problem moves through are in [the stage plan spec](../spec/01b-stages.md).

**Goal 2, the Archive.** Every problem that ends, solved or not, goes into the Archive with personal data removed. New problems then get suggested paths based on what worked or failed elsewhere, so nobody starts from nothing. See [archive and reuse](../spec/24-archive-reuse.md).

## What does not exist yet

- No real users, no real problems, no live service. All data in this repo is fictional.
- No AI runs on user content in slice 1 (see ADR 0006 in [docs/adr](../adr/README.md)).
- The public gallery is a read-only explainer site, not the product.
- Several rules are still open questions, tracked in [docs/open-questions](../open-questions/README.md). The build continues on stated defaults meanwhile.

## What does exist

Five repositories under one superproject:

| Repo | What it is |
|---|---|
| `can_server` | NestJS and Postgres node server, owns the API contract |
| `can_app` | Expo app for web, iOS and Android |
| `can_gallery` | static public site, read-only |
| `can_policy` | community-written policy packs |
| this repo | specification, plans, decisions and the wiring |

Every product decision that is settled is logged in [DECISIONS.md](../../DECISIONS.md). Do not reopen one in a pull request; open an issue or an open question instead.

Next: [02 Run it](02-run-it.md).
