---
id: LRN-003
title: release.yml publish step runs on every push to main, so it must tolerate an already-published version
status: active
tags: [release, npm, ci, mochila]
task: TSK-003
created: 2026-11-06
---

Context: the npm publish step follows semantic-release and runs on every push to main, including docs/chore pushes that cut no release.
Insight: on those pushes package.json still holds the already-published version, so publish would fail. That is the only legitimate failure to swallow; `|| echo` hid all others (npm showed 1.11.2 while the repo was at 1.11.3).
Application: guard the publish with `npm view pkg@version version`; never mask the exit code of `npm publish` itself.
