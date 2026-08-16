---
work_package_id: WP01
title: Acceptance Harness
dependencies: []
requirement_refs:
- FR-001
- FR-002
- FR-003
- FR-004
- FR-005
- FR-006
- FR-007
- FR-008
- FR-009
- FR-010
- FR-011
- FR-012
tracker_refs: []
planning_base_branch: codex/mobile-friendly-portfolio
merge_target_branch: codex/mobile-friendly-portfolio
branch_strategy: coordination
subtasks:
- T001
- T002
- T003
- T004
agent: codex
history:
- timestamp: '2026-08-16T10:58:48Z'
  event: planned
  actor: codex
agent_profile: frontend-freddy
authoritative_surface: tests/
create_intent: []
execution_mode: code_change
owned_files:
- package.json
- package-lock.json
- playwright.config.mjs
- scripts/validate-site.mjs
- tests/portfolio.spec.mjs
role: implementer
tags: []
---

## ⚡ Do This First: Load Agent Profile

Load the assigned `frontend-freddy` profile with `/ad-hoc-profile-load` before reading implementation files or changing code. Keep the implementation test-first, responsive, accessible, and dependency-light.

## Objective

Create an observable acceptance harness before replacing the legacy site. The harness must fail on meaningful user-facing contract violations and later pass without being weakened.

## Context

Read these artifacts first:

- `kitty-specs/mobile-friendly-portfolio-01M053C7/spec.md`
- `kitty-specs/mobile-friendly-portfolio-01M053C7/plan.md`
- `kitty-specs/mobile-friendly-portfolio-01M053C7/contracts/route-contract.md`

The repository currently contains a 2020 portfolio template. The target is a four-route static site. Tests must interact with served URLs and rendered output, not component internals.

## Branch Strategy

Planning/base branch: `codex/mobile-friendly-portfolio`. Final mission merge target: `codex/mobile-friendly-portfolio`. Run `spec-kitty agent action implement WP01 --agent codex` so the CLI allocates the lane worktree from `lanes.json`. Do not create a worktree manually and do not push `main`.

## Subtask Guidance

### T001 — Deterministic package and server setup

- Replace obsolete Gulp-only scripts with `dev`, `validate`, and `test` commands.
- Use a small static HTTP server suitable for direct-route testing.
- Add Playwright test tooling as a development dependency and update the lockfile through the package manager.
- Configure Chromium tests to start the local server automatically on `127.0.0.1:4173`.
- Preserve a simple command surface that works in Windows PowerShell and CI.

**Validation**:

- `npm ci` succeeds from a clean checkout.
- `npm run dev` serves repository-root static files.
- The browser runner can open `/` without manual server setup.

### T002 — Structural validator

- Create `scripts/validate-site.mjs` using Node standard library APIs.
- Verify required route files and shared asset references.
- Verify each route has a title, description, viewport metadata, language, one visible primary heading, and a home/back path.
- Verify required public actions: LinkedIn, email, phone, PermitOps, View PDF, and Download PDF.
- Verify the resume asset exists and is non-empty.
- Emit concise per-file failures and a non-zero exit code when contracts are missing.

**Guardrail**: Parse only enough markup for stable public contracts. Do not write brittle full-document snapshots.

### T003 — Black-box browser tests

- Test `/`, `/services/`, `/portfolio/`, and `/resume/` by URL.
- Test viewport matrix widths: 320, 360, 390, 412, 768, 844 landscape, and 1,440 desktop.
- Assert `scrollWidth === clientWidth` for every route.
- Assert all primary actions have rendered boxes at least 44 pixels wide and high.
- Assert direct route loads and required text/action destinations.
- Assert keyboard focus is visible on route controls.
- Emulate reduced motion and assert the home page exposes no active continuous wave animation.
- Assert mobile Resume shows readable HTML and document actions; assert the inline preview is hidden on phone widths.

**Guardrail**: Do not query implementation-specific class names where roles, labels, landmarks, or public data attributes can express the user contract.

### T004 — Prove the tests protect the change

- Run structural and browser tests against the legacy baseline before implementing routes.
- Confirm failures relate to missing routes, overflow, touch targets, metadata, or required content.
- Fix false-positive harness problems only; do not weaken or skip valid contract failures.
- Record the meaningful red baseline in the implementation commit message or WP history.

## Test Strategy

This WP is the test scaffold. It is complete only when both structural and rendered contracts are executable and demonstrably fail for correct reasons on the old site.

## Definition of Done

- [ ] Package and browser tooling installs reproducibly.
- [ ] Structural validation reports actionable route/asset failures.
- [ ] Browser tests cover the complete acceptance viewport matrix.
- [ ] Reduced motion, keyboard, touch target, overflow, direct-route, and resume assertions exist.
- [ ] Legacy baseline produces expected red failures without harness crashes.
- [ ] Only owned files are staged and committed.

## Reviewer Guidance

Reject tests that pass because controls are missing, rely on internal source structure, lower touch targets below 44 pixels, or skip small viewports. Confirm the suite would catch the verified 320/360-pixel navigation overflow and phone PDF problem.
