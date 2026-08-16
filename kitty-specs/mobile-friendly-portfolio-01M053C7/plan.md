# Implementation Plan: Mobile-Friendly Portfolio

**Branch**: `codex/mobile-friendly-portfolio` | **Date**: 2026-08-16 | **Spec**: [spec.md](./spec.md)  
**Input**: Approved feature specification and verified headless captures of `danahtetaung.com` at phone, tablet, landscape, and desktop viewports.

## Summary

Replace the repository's stale portfolio template with a maintained, dependency-light recreation of the currently deployed minimalist portfolio. Deliver the home, Services, Portfolio, and Resume routes as semantic static pages sharing a responsive design system. Recreate the ambient black wave with a small native canvas renderer that has a static fallback, reduced-motion behavior, visibility pausing, and no dependency on essential navigation or content. Present the resume as readable HTML on phones while preserving the public PDF for viewing and download.

## Engineering Alignment

- The invariant is that content and navigation remain usable even if animation or scripting fails.
- The live site is the design baseline; the old repository template is not carried forward merely because it is present.
- The visual identity remains monochrome, typographic, spacious, and wave-led.
- Narrow-screen layout begins at 320 pixels and uses wrapping rather than a modal menu because there are only three primary routes.
- The feature branch is the only remote delivery candidate. Production and `main` remain unchanged until a preview is verified and a pull request is explicitly accepted.

## Technical Context

**Language/Version**: HTML5, CSS3, ECMAScript 2022; Node.js 22 for validation tooling  
**Primary Dependencies**: No production runtime dependencies; Playwright for black-box browser validation  
**Storage**: Static files only; no application storage  
**Testing**: Node-based structural checks, Playwright route/layout/accessibility checks, production build validation, and visual captures at the acceptance viewport matrix  
**Target Platform**: Static web hosting on Vercel-compatible infrastructure; current Safari, Chrome, Edge, and Firefox  
**Project Type**: Multi-page static portfolio website  
**Performance Goals**: Mobile performance and accessibility audit scores at least 90; no continuous animation in reduced-motion mode; zero layout overflow at 320-1,440 pixels  
**Constraints**: Preserve black-and-white wave identity, keep essential content independent of JavaScript, maintain 44-by-44-pixel touch targets, avoid production mutation, and remove unused legacy assets only after the replacement validates  
**Scale/Scope**: Four public routes, one shared stylesheet, one shared interaction module, one wave renderer, one resume PDF, and a small black-box test suite

## Charter Check

No project charter exists. The applicable built-in governance checks pass:

- **Architectural integrity**: shared shell styles and a separate optional wave module keep concerns understandable and replaceable.
- **Decision traceability**: `research.md` records the static-site, wave, navigation, and resume decisions and alternatives.
- **Specification fidelity**: every implementation concern maps to approved FR identifiers.
- **Locality of change**: the mission replaces only the obsolete portfolio delivery surface and its build/test metadata.
- **Living documentation**: README and quickstart are updated with the new route and validation model.
- **Test/typecheck gate**: structural, build, and black-box browser checks are required before review.

No charter exception or complexity waiver is required.

## Project Structure

### Documentation (this mission)

```text
kitty-specs/mobile-friendly-portfolio-01M053C7/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── route-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
index.html
services/
└── index.html
portfolio/
└── index.html
resume/
└── index.html
assets/
├── styles.css
├── site.js
├── wave.js
└── resume.pdf
scripts/
└── validate-site.mjs
tests/
└── portfolio.spec.mjs
package.json
playwright.config.mjs
README.md
```

**Structure Decision**: Keep deployment as a static multi-page site because the designated repository is already static, every required route is content-first, and essential behavior does not require a server or application framework. Shared assets provide one responsive design contract without duplicating styles or interactive behavior across routes.

## Design Details

### Shared document shell

- Use semantic landmarks, a skip link, descriptive metadata, and a single visible `h1` per route.
- Provide a shared route header with home/back navigation and consistent focus treatment.
- Set box sizing, overflow safety, responsive gutters, readable type scale, and touch target minimums globally.
- Keep external actions identifiable and safe, with a single accessible name even when visual hover labels are duplicated.

### Home composition

- Place identity/contact details and primary navigation in a responsive top region.
- Use three pill links that remain horizontal where space permits and wrap to a two-column-plus-full-width arrangement on narrow phones.
- Position the wave in a non-interactive canvas layer below essential content.
- Use `100svh`/`100dvh`-compatible sizing with a stable fallback and landscape-specific wave framing.

### Wave lifecycle

- Render a family of monochrome curves on a DPR-aware canvas.
- Initialize only when the canvas API is available.
- Stop scheduling frames when the document is hidden.
- Render a still frame and schedule no animation when reduced motion is requested.
- Expose the canvas as decorative and ensure pointer events do not capture navigation input.

### Inner routes

- Services: responsive heading, offering list, tap-to-call, and tap-to-email actions.
- Portfolio: a single-column project card on phones with summary, contribution, technologies, and external link.
- Resume: readable HTML sections on every device; mobile-first document actions; inline PDF preview restricted to wider viewports and treated as optional enhancement.

### Validation and rollout

- Structural validation checks route files, required landmarks, required links, metadata, and asset references.
- Browser checks assert route status, viewport width equality, target dimensions, reduced-motion behavior, keyboard focus, resume actions, and content presence.
- Capture the acceptance viewport matrix from the built site.
- Push only the feature branch after all checks pass. A preview must be inspected before the pull request is considered ready for production review.

## Implementation Concern Map

### IC-01 — Canonical static route shell

- **Purpose**: Replace the obsolete template with the home and three inner routes that match the live content and share semantic, accessible structure.
- **Relevant requirements**: FR-001, FR-006, FR-007, FR-008, FR-009, FR-010, FR-012
- **Affected surfaces**: `index.html`, `services/index.html`, `portfolio/index.html`, `resume/index.html`, `assets/resume.pdf`
- **Sequencing/depends-on**: none
- **Risks**: public content or PDF could drift from the current live deployment; preserve verified public facts and avoid inventing claims.

### IC-02 — Responsive design and interaction contract

- **Purpose**: Establish the shared monochrome visual system, responsive navigation, readable layouts, touch targets, zoom support, and keyboard focus behavior.
- **Relevant requirements**: FR-002, FR-003, FR-010, FR-011, NFR-001, NFR-002, NFR-006
- **Affected surfaces**: `assets/styles.css`, `assets/site.js`
- **Sequencing/depends-on**: IC-01
- **Risks**: narrow navigation can overflow when label or font metrics change; tests must include 320 pixels and 200-percent text zoom.

### IC-03 — Optional ambient wave renderer

- **Purpose**: Preserve the live site's distinctive wave while guaranteeing reduced motion, visibility pausing, responsive framing, and content independence.
- **Relevant requirements**: FR-004, FR-005, NFR-005, C-001
- **Affected surfaces**: `assets/wave.js`, `index.html`, `assets/styles.css`
- **Sequencing/depends-on**: IC-01, IC-02
- **Risks**: high-DPI devices and short landscape viewports can increase rendering work or produce poor framing; cap effective DPR and line count.

### IC-04 — Reproducible validation and delivery

- **Purpose**: Make the static site testable, build-verifiable, documented, and safe to hand off through a PR and preview.
- **Relevant requirements**: NFR-003, NFR-004, C-004, C-005
- **Affected surfaces**: `scripts/validate-site.mjs`, `tests/portfolio.spec.mjs`, `playwright.config.mjs`, `package.json`, `README.md`
- **Sequencing/depends-on**: IC-01, IC-02, IC-03
- **Risks**: a locally passing site may not be connected to the custom domain; report repository and preview evidence separately from production status.

## Complexity Tracking

No justified violations. The design removes the existing dependency-heavy legacy template surface and introduces no server, data layer, framework, or persistent state.
