---
work_package_id: WP03
title: Responsive Visual System and Wave
dependencies:
- WP02
requirement_refs:
- FR-002
- FR-003
- FR-004
- FR-005
- FR-010
- FR-011
tracker_refs: []
planning_base_branch: codex/mobile-friendly-portfolio
merge_target_branch: codex/mobile-friendly-portfolio
branch_strategy: Planning artifacts for this mission were generated on codex/mobile-friendly-portfolio. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/mobile-friendly-portfolio unless the human explicitly redirects the landing branch.
subtasks:
- T010
- T011
- T012
- T013
agent: codex
history:
- timestamp: '2026-08-16T10:58:48Z'
  event: planned
  actor: codex
agent_profile: frontend-freddy
authoritative_surface: assets/
create_intent:
- assets/styles.css
- assets/site.js
- assets/wave.js
execution_mode: code_change
owned_files:
- assets/styles.css
- assets/site.js
- assets/wave.js
role: implementer
tags: []
---

## ⚡ Do This First: Load Agent Profile

Load the assigned `frontend-freddy` profile with `/ad-hoc-profile-load` before reading implementation files or changing code. Use the actual live captures as the visual reference and keep all enhancements progressive.

## Objective

Implement the shared monochrome design contract and optional ambient wave so the site is polished, touch-friendly, motion-safe, and free of overflow from 320 through 1,440 pixels.

## Context

The verified live site uses a white canvas, strong black type, outlined pill navigation, generous whitespace, and a layered black wave. At 320 and 360 pixels its current pill row overflows; at 390 pixels it fits but remains too short for touch. Inner-route links are similarly undersized, and the PDF preview is unreadable on phones.

## Branch Strategy

Planning/base branch: `codex/mobile-friendly-portfolio`. Final mission merge target: `codex/mobile-friendly-portfolio`. Reuse the dependency lane with `spec-kitty agent action implement WP03 --agent codex`; do not create a manual worktree.

## Subtask Guidance

### T010 — Shared responsive visual contract

- Implement a small reset with border-box sizing, predictable media behavior, and visible focus states.
- Use fluid but bounded page gutters and text measures.
- Recreate the top identity/contact composition and pill navigation at tablet/desktop widths.
- Below the measured fit threshold, move navigation beneath identity and use a wrapping grid that fits 320 pixels without label clipping.
- Make primary pills and every route/contact action at least 44 pixels tall and wide.
- Style inner routes with readable 16-pixel-or-larger body copy, clear section rhythm, and single-column mobile flow.
- Restrict inline resume preview to larger screens while keeping HTML and document actions visible everywhere.

### T011 — Wave renderer

- Create a self-contained canvas module with no third-party dependency.
- Draw multiple bezier or sinusoidal curves with monochrome alpha variation to match the layered reference.
- Size the canvas from its container and account for device pixel ratio while capping effective DPR.
- Adapt amplitude, baseline, and spread for narrow portrait, tablet, desktop, and short landscape viewports.
- Mark the canvas decorative, disable pointer capture, and contain it so it never changes document width.
- Expose a stable public state marker useful for black-box motion checks without leaking renderer internals.

### T012 — Motion, failure, zoom, and keyboard safeguards

- When reduced motion is requested, render one still frame and schedule no animation loop.
- Pause scheduled frames on `visibilitychange`; resume only when visible and motion is allowed.
- Handle missing canvas context or module failure without affecting content or navigation.
- Recalculate safely on resize using throttling or animation-frame coalescing.
- Ensure 200-percent text zoom reflows navigation and route headers.
- Ensure focus outlines remain visible against white and inside outlined pills.

### T013 — Converge under acceptance checks

- Run every viewport from the spec, including 844x390 landscape.
- Fix source behavior, not tests, when overflow or target assertions fail.
- Inspect visual captures for accidental large gaps, clipped wave lines, content overlap, or desktop regression.
- Confirm hover/focus animation duplicates expose only one accessible name.
- Confirm a no-script or failed-animation load still contains all essential links and content.

## Test Strategy

Use WP01 black-box tests as the contract. Add manual visual comparison only for properties that cannot be reliably asserted, such as the wave's aesthetic resemblance and balance of whitespace.

## Definition of Done

- [ ] Zero horizontal overflow at every acceptance viewport.
- [ ] Primary targets meet 44-by-44 pixels.
- [ ] Monochrome home composition matches the live design direction.
- [ ] Resume preview is mobile-safe.
- [ ] Reduced motion schedules no continuous animation.
- [ ] Hidden tabs pause animation.
- [ ] Keyboard focus and 200-percent zoom remain usable.
- [ ] Only owned files are staged and committed.

## Risks

- High-DPI canvases can consume excess memory; cap DPR and line count.
- Absolute positioning can reintroduce overflow; use bounded containers and test rendered document width.
- Animation tests can become timing-sensitive; assert observable scheduler state rather than exact frames.

## Reviewer Guidance

Review at 320, 390, 768, landscape, and desktop widths. Reject CSS that hides content to satisfy overflow, controls that meet target size only through invisible overlap, or animation that continues under reduced motion or a hidden document.
