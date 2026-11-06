---
id: TSK-003
title: Fix: Release workflow masks npm publish failures as success
status: complete
priority: P3
tags: []
created: 2026-10-31
source: report/RPT-003
depends-on: []
started: 2026-11-06
completed: 2026-11-06
---

# Fix: Release workflow masks npm publish failures as success

## Description

Source: RPT-003. `.github/workflows/release.yml:49` ends `npm publish` with `|| echo ...`, so every publish failure exits 0. `release.config.cjs` sets `npmPublish: false`, making this step the only npm publisher: a failure leaves a GitHub release with no npm version and a green run.

## Acceptance Criteria

- [x] The publish step in .github/workflows/release.yml skips only when the package.json version already exists on npm — evidence: release.yml diff: skip only when npm view mochila-ts@VERSION returns VERSION; yaml parses; snippet checked vs registry 1.11.2 exists, 1.11.3/99.0.0 missing → publish branch (2026-11-06) (2026-11-06)
- [x] Any other npm publish failure fails the release job — evidence: publish step has no || echo; npm publish failure exits non-zero, job fails (2026-11-06) (2026-11-06)
- [x] Maintainer approves the workflow change before merge — evidence: user approved proposed diff in session, yes (2026-11-06); merge approval still theirs (2026-11-06)

## Notes

## Learnings

- LRN-003: release.yml publish step runs on every push to main, so it must tolerate an already-published version
## Progress Log

- [2026-10-31] Created
- [2026-11-06] Started
- [2026-11-06] Applied approved diff; full gate green; branch fix/tsk-003-release-npm-publish-failures
- [2026-11-06] Completed