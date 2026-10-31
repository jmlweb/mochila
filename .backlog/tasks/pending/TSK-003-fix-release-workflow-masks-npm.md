---
id: TSK-003
title: Fix: Release workflow masks npm publish failures as success
status: pending
priority: P3
tags: []
created: 2026-10-31
source: report/RPT-003
depends-on: []
---

# Fix: Release workflow masks npm publish failures as success

## Description

Source: RPT-003. `.github/workflows/release.yml:49` ends `npm publish` with `|| echo ...`, so every publish failure exits 0. `release.config.cjs` sets `npmPublish: false`, making this step the only npm publisher: a failure leaves a GitHub release with no npm version and a green run.

## Acceptance Criteria

- [ ] The publish step in .github/workflows/release.yml skips only when the package.json version already exists on npm
- [ ] Any other npm publish failure fails the release job
- [ ] Maintainer approves the workflow change before merge

## Notes

## Learnings

## Progress Log

- [2026-10-31] Created