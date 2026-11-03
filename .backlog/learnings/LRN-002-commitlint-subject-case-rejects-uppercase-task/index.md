---
id: LRN-002
title: commitlint subject-case rejects uppercase task ids in commit subject
status: active
tags: [commitlint, commits, mochila]
task: TSK-001
created: 2026-11-03
---

mochila-ts commitlint enforces `subject-case` lower-case, so a subject like `fix(lrucache): ... (TSK-001)` fails the husky commit-msg hook. Write the task id lower-case in the subject (`(tsk-001)`) and the canonical `TSK-001` in the body. PR titles are squash-merged into commits, so the same rule applies to the PR title.
