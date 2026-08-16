---
work_package_id: WP02
title: Canonical Routes and Content
dependencies:
- WP01
requirement_refs:
- FR-001
- FR-006
- FR-007
- FR-008
- FR-009
- FR-010
- FR-012
tracker_refs: []
planning_base_branch: codex/mobile-friendly-portfolio
merge_target_branch: codex/mobile-friendly-portfolio
branch_strategy: Planning artifacts for this mission were generated on codex/mobile-friendly-portfolio. During /spec-kitty.implement this WP may branch from a dependency-specific base, but completed changes must merge back into codex/mobile-friendly-portfolio unless the human explicitly redirects the landing branch.
subtasks:
- T005
- T006
- T007
- T008
- T009
agent: "codex"
shell_pid: "21832"
history:
- timestamp: '2026-08-16T10:58:48Z'
  event: planned
  actor: codex
agent_profile: frontend-freddy
authoritative_surface: index.html
create_intent:
- services/index.html
- portfolio/index.html
- resume/index.html
- assets/resume.pdf
execution_mode: code_change
owned_files:
- index.html
- services/index.html
- portfolio/index.html
- resume/index.html
- assets/resume.pdf
- favicon.ico
role: implementer
tags: []
---

## ⚡ Do This First: Load Agent Profile

Load the assigned `frontend-freddy` profile with `/ad-hoc-profile-load` before reading implementation files or changing code. Preserve verified public content and semantic accessibility.

## Objective

Replace the obsolete single-page template with four directly loadable semantic routes and a repository-owned resume document. Essential navigation and content must work before CSS or animation loads.

## Context

Use the specification and route contract as authority. The live site supplies the visual/content baseline, but the repository is the new canonical maintained source. Do not invent additional experience claims or unrelated portfolio projects.

## Branch Strategy

Planning/base branch: `codex/mobile-friendly-portfolio`. Final mission merge target: `codex/mobile-friendly-portfolio`. This WP depends on WP01 and must reuse the computed execution lane via `spec-kitty agent action implement WP02 --agent codex`.

## Subtask Guidance

### T005 — Semantic home route

- Replace `index.html` with a semantic document using `lang="en"`, viewport metadata, a Dana-specific title, and a concise portfolio description.
- Add a skip link, identity block, visible LinkedIn and email actions, and a labelled primary navigation.
- Add exactly three primary route actions: Services, Portfolio, Resume.
- Include duplicated visual hover labels only if the duplicate is hidden from assistive technology.
- Reserve a decorative canvas region for the wave with a descriptive fallback that does not become essential content.
- Use ordinary relative route links compatible with static hosting.

### T006 — Services route

- Create `services/index.html` with a touch-friendly Back action and one `h1`.
- Present the public automation statement and the four verified offerings.
- Convert the displayed phone number into a `tel:` action and the email into a `mailto:` action while keeping visible text.
- Preserve simple, business-facing wording and sentence capitalization.

### T007 — Portfolio route

- Create `portfolio/index.html` with Back navigation and one `h1`.
- Present Vanity PermitOps as the featured project.
- Include a concise public summary, Dana's contribution, relevant technology context, and an external `permitops.com` action.
- Make external behavior explicit with accessible link text and safe relationship attributes.

### T008 — Resume route

- Create `resume/index.html` with Back navigation and one `h1`.
- Provide View PDF and Download PDF actions near the top.
- Represent public Skills, Experience, Education, and Projects in readable semantic sections.
- Place the optional inline PDF preview after HTML content and label it clearly.
- Keep the page useful when the preview is unavailable.

### T009 — Resume asset and direct routes

- Retrieve the public current resume document from the verified live URL and store it as `assets/resume.pdf`.
- Confirm its media type, non-zero size, and first-page readability.
- Ensure every inner route uses directory-index links so direct loads work on static hosting.
- Preserve or replace the favicon only if needed for consistent metadata.

## Test Strategy

Run WP01 structural tests continuously. Browser tests may still fail on layout/style until WP03, but route status, content, and link destination tests must pass before this WP is complete.

## Definition of Done

- [ ] Four semantic routes load directly.
- [ ] Essential content and links work without animation.
- [ ] Services phone/email actions are actionable.
- [ ] Portfolio project content and external action are present.
- [ ] Resume HTML is readable and the PDF has View/Download actions.
- [ ] Public resume asset is verified and repository-owned.
- [ ] Only owned files are staged and committed.

## Risks

- The public resume may contain facts not visible in the small live preview; extract from the document rather than guessing.
- Static hosts vary in slash handling; use directory index routes and test direct URLs.

## Reviewer Guidance

Verify the page remains meaningful with CSS and JavaScript disabled. Reject icon-only contact actions, placeholder project copy, missing document fallback, multiple `h1` elements, or facts not supported by the current public site/resume.

## Activity Log

- 2026-08-16T11:20:18Z – codex – shell_pid=21832 – Assigned agent via action command
