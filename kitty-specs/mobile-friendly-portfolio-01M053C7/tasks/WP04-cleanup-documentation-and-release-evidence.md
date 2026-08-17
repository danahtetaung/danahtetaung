---
work_package_id: WP04
title: Cleanup, Documentation, and Release Evidence
dependencies:
- WP03
requirement_refs:
- FR-001
- FR-012
tracker_refs: []
planning_base_branch: codex/mobile-friendly-portfolio
merge_target_branch: codex/mobile-friendly-portfolio
branch_strategy: Planning artifacts for this mission were generated on codex/mobile-friendly-portfolio. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/mobile-friendly-portfolio unless the human explicitly redirects the landing branch.
subtasks:
- T014
- T015
- T016
- T017
agent: "codex"
shell_pid: "9204"
history:
- timestamp: '2026-08-16T10:58:48Z'
  event: planned
  actor: codex
agent_profile: frontend-freddy
authoritative_surface: README.md
create_intent:
- README.md
execution_mode: code_change
owned_files:
- README.md
- styles.scss
- gulpfile.js
- css/**
- js/**
- font-awesome/**
- images/**
role: implementer
tags: []
---

## ⚡ Do This First: Load Agent Profile

Load the assigned `frontend-freddy` profile with `/ad-hoc-profile-load` before reading implementation files or changing code. Keep cleanup recoverable through git and stage only explicit owned paths.

## Objective

Remove the obsolete template surface, document the maintained site and validation workflow, run final acceptance evidence, and prepare a truthful feature-branch handoff without claiming production deployment.

## Context

WP01-WP03 establish the tested replacement. This WP should leave one obvious implementation path in the repository. The custom domain currently serves code not present in the designated repository, so local and GitHub success must remain distinct from Vercel preview or production proof.

## Branch Strategy

Planning/base branch: `codex/mobile-friendly-portfolio`. Final mission merge target: `codex/mobile-friendly-portfolio`. Invoke `spec-kitty agent action implement WP04 --agent codex` to reuse the dependency lane. Do not push or merge `main`.

## Subtask Guidance

### T014 — Remove obsolete template assets

- First confirm all structural and browser tests pass using the new source.
- Remove the unused Bootstrap, Font Awesome, template SCSS, Gulp file, legacy scripts, and legacy image assets listed in owned files.
- Do not remove the new `assets/` directory, resume PDF, favicon, Spec Kitty artifacts, or test tooling.
- Re-run a repository-wide reference search to confirm no surviving document points to deleted paths.

**Safety**: Use explicit paths and targeted staging. All removals remain recoverable through the branch commit.

### T015 — Rewrite README

- Explain that this repository contains Dana's static portfolio.
- List the four public routes and shared asset layout.
- Document install, local server, validation, and test commands.
- Document responsive acceptance widths and reduced-motion behavior.
- State that branch validation is not proof that `danahtetaung.com` has deployed; a preview/custom-domain check is required.

### T016 — Final acceptance evidence

- Run clean dependency install, structural validation, and complete browser suite.
- Capture phone, tablet, landscape, and desktop screenshots from the local build.
- Check link destinations and PDF loading.
- Inspect git diff for scope, generated artifacts, secrets, and accidental unrelated files.
- Record exact commands and results for the final handoff.

### T017 — Prepare reviewed delivery

- Ensure all WP commits are present and the lane is clean.
- Move the WP to review using the Spec Kitty workflow.
- Report separately: source implemented, tests passed, branch merged locally, branch pushed, preview verified, PR created, production deployed. Never collapse these statuses.
- If the Vercel connection cannot be proven, leave preview and production explicitly pending.

## Test Strategy

No new acceptance behavior is added here. Run all established checks after cleanup to catch deleted references or documentation drift.

## Definition of Done

- [ ] Obsolete template files are gone and unreferenced.
- [ ] README describes the new maintained site and exact commands.
- [ ] Clean install, validation, and browser tests pass.
- [ ] Visual captures cover phone, tablet, landscape, and desktop.
- [ ] Git diff is scoped and contains no secrets or unrelated work.
- [ ] Delivery status distinguishes branch, preview, PR, and production truthfully.
- [ ] Only owned files are staged and committed.

## Reviewer Guidance

Check that deletion happened only after replacement validation and that README commands work from a clean checkout. Reject any statement implying the live domain changed without direct preview or production evidence.

## Activity Log

- 2026-08-16T11:45:20Z – codex – shell_pid=8716 – Assigned agent via action command
- 2026-08-16T11:48:17Z – codex – shell_pid=8716 – Ready for review: legacy template removed after clean install and 41/41 tests; README documents routes, commands, motion, and deployment truth; build/audit/reference/secret scans pass; phone, tablet, landscape, and desktop captures inspected.
- 2026-08-16T11:48:30Z – codex – shell_pid=9204 – Started review via action command
- 2026-08-16T11:49:51Z – user – shell_pid=9204 – Review passed: clean install/build/audit and 41/41 browser tests pass after cleanup; legacy/reference/secret scans are clean; four viewport captures accepted; README states deployment status truthfully.
