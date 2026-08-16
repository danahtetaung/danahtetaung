# Work Packages: Mobile-Friendly Portfolio

**Planning/base branch**: `codex/mobile-friendly-portfolio`  
**Final mission merge target**: `codex/mobile-friendly-portfolio`  
**Later repository PR target**: `main`

## Subtask Index

| ID | Description | WP | Parallel |
| --- | --- | --- | --- |
| T001 | Establish deterministic package scripts and browser-test configuration | WP01 | No |
| T002 | Add a structural static-site validator | WP01 | Yes |
| T003 | Author black-box route, responsive, touch-target, motion, and resume tests | WP01 | Yes |
| T004 | Run the harness against the legacy baseline and confirm meaningful failures | WP01 | No |
| T005 | Recreate the semantic home route and verified public metadata | WP02 | No |
| T006 | Build the Services route with actionable contact links | WP02 | Yes |
| T007 | Build the Portfolio route with the featured PermitOps project | WP02 | Yes |
| T008 | Build the readable Resume route with PDF actions and optional preview | WP02 | Yes |
| T009 | Add and verify the public resume asset and direct-route behavior | WP02 | No |
| T010 | Implement the shared responsive visual and interaction contract | WP03 | No |
| T011 | Implement the responsive wave renderer and lifecycle controls | WP03 | Yes |
| T012 | Add reduced-motion, failure, landscape, zoom, and keyboard safeguards | WP03 | No |
| T013 | Satisfy the full layout and accessibility assertions without weakening tests | WP03 | No |
| T014 | Remove unused legacy template assets after replacement validation | WP04 | No |
| T015 | Rewrite repository documentation for the maintained portfolio | WP04 | Yes |
| T016 | Run build, structural, browser, and visual acceptance checks | WP04 | No |
| T017 | Record the repository/deployment boundary and prepare the reviewed handoff | WP04 | No |

## WP01 — Acceptance Harness

**Priority**: P0  
**Prompt**: [tasks/WP01-acceptance-harness.md](./tasks/WP01-acceptance-harness.md)  
**Independent test**: The legacy site fails for the intended reasons, including missing routes or mobile contract violations; the harness itself starts and reports actionable failures.

- [x] T001 Establish deterministic package scripts and browser-test configuration (WP01)
- [x] T002 Add a structural static-site validator (WP01)
- [x] T003 Author black-box route, responsive, touch-target, motion, and resume tests (WP01)
- [x] T004 Run the harness against the legacy baseline and confirm meaningful failures (WP01)

**Implementation sketch**: Replace the obsolete Gulp-only package surface with reproducible serve, validate, and test commands. Create structural checks that inspect public files and black-box browser checks that exercise only served routes and rendered behavior. Prove the tests fail on the old site before implementation.

**Dependencies**: None.  
**Parallel opportunities**: T002 and T003 touch different test surfaces after T001.  
**Risks**: Tests that encode implementation details would create friction; assert only observable requirements.  
**Estimated prompt size**: ~240 lines.

## WP02 — Canonical Routes and Content

**Priority**: P0  
**Prompt**: [tasks/WP02-canonical-routes-and-content.md](./tasks/WP02-canonical-routes-and-content.md)  
**Independent test**: All four routes load directly with semantic content and functional links even before visual enhancement is complete.

- [x] T005 Recreate the semantic home route and verified public metadata (WP02)
- [x] T006 Build the Services route with actionable contact links (WP02)
- [x] T007 Build the Portfolio route with the featured PermitOps project (WP02)
- [x] T008 Build the readable Resume route with PDF actions and optional preview (WP02)
- [x] T009 Add and verify the public resume asset and direct-route behavior (WP02)

**Implementation sketch**: Build semantic static documents from the verified live content. Use ordinary links and visible labels, place readable resume HTML before the optional PDF preview, and ensure all required assets are repository-owned.

**Dependencies**: WP01.  
**Parallel opportunities**: Services, Portfolio, and Resume route files are independent after the home shell is established.  
**Risks**: Do not invent new resume facts or service claims; use public evidence and retain the deployment mismatch disclosure.  
**Estimated prompt size**: ~300 lines.

## WP03 — Responsive Visual System and Wave

**Priority**: P0  
**Prompt**: [tasks/WP03-responsive-visual-system-and-wave.md](./tasks/WP03-responsive-visual-system-and-wave.md)  
**Independent test**: The site matches the monochrome live identity, has no overflow from 320 to 1,440 pixels, provides 44-pixel touch targets, and stops continuous motion when requested.

- [x] T010 Implement the shared responsive visual and interaction contract (WP03)
- [x] T011 Implement the responsive wave renderer and lifecycle controls (WP03)
- [x] T012 Add reduced-motion, failure, landscape, zoom, and keyboard safeguards (WP03)
- [x] T013 Satisfy the full layout and accessibility assertions without weakening tests (WP03)

**Implementation sketch**: Create one stylesheet for the shared shell, pill reflow, inner-route content, resume behavior, focus states, and breakpoints. Add a separate decorative canvas renderer with DPR capping, resize handling, reduced-motion still rendering, and visibility pausing.

**Dependencies**: WP02.  
**Parallel opportunities**: Initial stylesheet and wave module work are file-isolated, then converge under tests.  
**Risks**: Canvas sizing can create hidden overflow or excess GPU work; keep it contained, non-interactive, and optional.  
**Estimated prompt size**: ~300 lines.

## WP04 — Cleanup, Documentation, and Release Evidence

**Priority**: P1  
**Prompt**: [tasks/WP04-cleanup-documentation-and-release-evidence.md](./tasks/WP04-cleanup-documentation-and-release-evidence.md)  
**Independent test**: The repository contains one maintained site implementation, all automated and viewport checks pass, and the handoff truthfully distinguishes the branch result from production deployment.

- [ ] T014 Remove unused legacy template assets after replacement validation (WP04)
- [ ] T015 Rewrite repository documentation for the maintained portfolio (WP04)
- [ ] T016 Run build, structural, browser, and visual acceptance checks (WP04)
- [ ] T017 Record the repository/deployment boundary and prepare the reviewed handoff (WP04)

**Implementation sketch**: Remove obsolete Bootstrap/Gulp/template assets only after the new site passes. Document local commands, route model, responsive guarantees, and preview boundary. Produce final screenshots and test evidence without claiming custom-domain deployment.

**Dependencies**: WP03.  
**Parallel opportunities**: Documentation can be drafted while the final acceptance suite runs.  
**Risks**: Legacy deletion must stay scoped; repository cleanup must not remove the new asset or mission files.  
**Estimated prompt size**: ~230 lines.
