---
id: "08-u09"
plan: "08"
title: "Devcontainer configuration"
repo: "."
area: "can-root"
model: sonnet
est_hours: 0.75
priority: 90
depends_on: ["08-u08"]
writes: [".devcontainer/**"]
spec: ["CONTRIBUTING.md","docs/spec/21-open-source-governance.md","docs/adr/0001-submodule-layout.md"]
verify: ["node -e \"JSON.parse(require('fs').readFileSync('.devcontainer/devcontainer.json','utf8').replace(/^\\s*\\/\\/.*$/gm,''))\"","bash -n scripts/bootstrap.sh"]
founder_gate: false
defaults: "Use the official Node 24 devcontainer image and the docker-outside-of-docker feature; add Python 3 through a feature."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

A zero-install path for contributors who prefer containers or hosted dev environments, built on the bootstrap script.

## Steps

1. Write .devcontainer/devcontainer.json: Node 24 image, features for docker-outside-of-docker and Python, forwardPorts for 3000, 8081, 8025 and 5433, postCreateCommand `bash scripts/bootstrap.sh`, and editor extensions limited to ESLint, Prettier and EditorConfig.
2. Write .devcontainer/README.md: when to use it, known limits (relative submodule URLs need a remote, compose-in-container needs Docker access), and that it does not require any paid AI tool.
3. Validate the JSON parses (comments stripped). The container itself is not built in this unit.

## Acceptance

- devcontainer.json parses and references only scripts that exist.
- README states untested-in-container status until someone builds it.

## Out of scope

- Building or publishing images.
- Cloud workspace configuration.
