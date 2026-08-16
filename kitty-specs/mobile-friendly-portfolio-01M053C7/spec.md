# Mobile-Friendly Portfolio

## Purpose

Recreate the portfolio currently presented at `danahtetaung.com` in its designated source repository and make it comfortable to use on phones while preserving its minimalist black-and-white wave identity. The result should help a prospective client, collaborator, or employer quickly understand Dana's services, projects, and experience without horizontal scrolling, tiny controls, or an unreadable embedded resume.

## User Scenarios & Testing

### Scenario 1: Navigate from a narrow phone

A visitor opens the home page on a 320-pixel-wide phone. Dana's name, LinkedIn and email actions, the Services, Portfolio, and Resume navigation, and the wave visual all remain inside the viewport. The visitor can tap any primary action without zooming or making a precision tap.

**Acceptance scenarios**

- Given a viewport at least 320 pixels wide, when the home page loads, then no visible element causes horizontal scrolling.
- Given a touch device, when a visitor targets any primary navigation or contact action, then the action has a comfortable touch area of at least 44 by 44 pixels.
- Given a narrow portrait viewport, when the navigation does not fit on one row, then it reflows without clipping labels or borders.

### Scenario 2: Experience the visual identity safely

A visitor sees the black wave as a distinctive ambient element without it blocking navigation or making the page difficult to use. A visitor who requests reduced motion receives a still or substantially reduced presentation.

**Acceptance scenarios**

- Given portrait or landscape orientation, when the home page renders, then the wave remains visible but never covers essential content.
- Given reduced-motion preference, when the home page renders, then continuous wave motion is disabled.
- Given the page is no longer visible, when the visitor changes tabs, then continuous visual work pauses until the page becomes visible again.

### Scenario 3: Contact Dana from Services

A small-business visitor opens Services, scans the offering, and can call or email Dana directly from a phone.

**Acceptance scenarios**

- Given the Services page, when a visitor taps the displayed phone number, then the device receives a call action for the displayed number.
- Given the Services page, when a visitor taps the displayed email address, then the device receives an email action for that address.
- Given a narrow phone, when the Services content is viewed, then headings, list items, and contact actions remain readable without horizontal scrolling.

### Scenario 4: Evaluate portfolio work

A visitor opens Portfolio and sees Dana's featured project as a structured, readable project entry with a clear external destination.

**Acceptance scenarios**

- Given the Portfolio page, when the featured project is viewed on a phone, then its name, summary, contribution, technology context, and project action are readable in a single-column flow.
- Given a featured project action, when the visitor activates it, then the project opens without losing the portfolio page unexpectedly.

### Scenario 5: Read or download the resume

A visitor opens Resume on a phone and can understand the resume without trying to read a desktop PDF viewer scaled to the screen. The original resume remains available to view and download.

**Acceptance scenarios**

- Given a narrow phone, when Resume loads, then the visitor sees a readable page summary and clear View PDF and Download PDF actions before any embedded document.
- Given a tablet or desktop, when Resume loads, then the original document may be previewed inline while the same external actions remain available.
- Given an unavailable inline preview, when Resume loads, then the summary and document actions remain usable.

### Scenario 6: Preserve larger-screen behavior

A visitor on a tablet or desktop continues to see the existing visual composition: identity and contact details near the top, pill navigation positioned cleanly, and a broad wave visual with no content overlap.

**Acceptance scenarios**

- Given a viewport 768 pixels wide or larger, when any route renders, then layout hierarchy and navigation remain visually consistent with the current live site.
- Given keyboard navigation, when focus moves through interactive controls, then focus is visible and follows a logical reading order.

## Edge Cases

- A viewport is only 320 pixels wide.
- The device is in short landscape orientation.
- Text is zoomed to 200 percent.
- Motion reduction is enabled at operating-system level.
- The animation cannot initialize or the device has limited graphics capability.
- The resume document cannot be embedded by the browser.
- A long email address or project label must wrap.
- External links are opened from a browser that blocks new tabs.

## Functional Requirements

| ID | Requirement | Status |
| --- | --- | --- |
| FR-001 | The home page must present Dana's name, LinkedIn action, email action, Services navigation, Portfolio navigation, Resume navigation, and the black wave visual. | Approved |
| FR-002 | The home navigation must reflow at narrow widths so all actions remain fully visible without horizontal scrolling. | Approved |
| FR-003 | Every primary navigation, contact, back, project, and resume action must provide a touch area of at least 44 by 44 pixels. | Approved |
| FR-004 | The wave presentation must adapt to portrait and landscape viewports without obscuring essential content. | Approved |
| FR-005 | The wave presentation must honor reduced-motion preference and pause continuous work when the page is not visible. | Approved |
| FR-006 | The Services page must present the current offering and provide actionable phone and email contact links. | Approved |
| FR-007 | The Portfolio page must present the featured Vanity PermitOps project with a short summary, Dana's contribution, relevant technology context, and a clear external project action. | Approved |
| FR-008 | The Resume page must provide a readable mobile summary plus explicit View PDF and Download PDF actions. | Approved |
| FR-009 | The Resume page may embed the document on larger screens but must remain useful if the embed is unsupported or unavailable. | Approved |
| FR-010 | All inner pages must provide a consistent, touch-friendly route back to the home page. | Approved |
| FR-011 | Duplicate visual labels used for animation must expose a single understandable accessible name. | Approved |
| FR-012 | The site must identify Dana and the portfolio accurately in the browser title and page description. | Approved |

## Non-Functional Requirements

| ID | Requirement | Status |
| --- | --- | --- |
| NFR-001 | At widths from 320 through 1,440 pixels, every tested route must have document width equal to viewport width with no horizontal overflow. | Approved |
| NFR-002 | Essential body content must render at a computed size of at least 16 pixels on phone viewports, excluding optional metadata. | Approved |
| NFR-003 | Automated production build and static validation must complete successfully before handoff. | Approved |
| NFR-004 | Mobile accessibility and performance audits should each score at least 90 for the home page and each inner route under the same audit conditions. | Approved |
| NFR-005 | All essential navigation and content must remain usable with scripting or animation initialization failure, except that ambient motion may be absent. | Approved |
| NFR-006 | The site must remain usable at 200 percent text zoom and with keyboard-only navigation. | Approved |

## Constraints

| ID | Constraint | Status |
| --- | --- | --- |
| C-001 | Preserve the current minimalist black-and-white identity and ambient wave concept; this mission is not a visual rebrand. | Approved |
| C-002 | Treat the live site as the visual and content baseline because the repository currently contains an older portfolio template. | Approved |
| C-003 | Preserve the current public LinkedIn, email, phone, PermitOps link, and resume content unless a correctness fix is required to make an existing action work. | Approved |
| C-004 | Do not push directly to the remote `main` branch; delivery must use the feature branch and pull-request workflow. | Approved |
| C-005 | Do not claim production deployment until a preview and the custom-domain connection are verified. | Approved |
| C-006 | Avoid adding account systems, data storage, analytics, a content-management system, or new business workflows. | Approved |

## Success Criteria

- SC-001: All routes pass viewport checks at 320x568, 360x800, 390x844, 412x915, 768x1024, 844x390, and 1440x900 with zero horizontal overflow.
- SC-002: One hundred percent of primary interactive controls meet or exceed a 44-by-44-pixel touch area.
- SC-003: A phone visitor can reach Services, Portfolio, Resume, LinkedIn, email, phone, and the featured project in no more than two taps from the home page.
- SC-004: The Resume page provides readable experience, education, skills, and projects content on a phone without requiring PDF zoom.
- SC-005: Reduced-motion mode produces no continuous wave animation.
- SC-006: Automated build, lint, keyboard, zoom, and route-link checks pass before review.

## Assumptions

- The user approved the previously presented mobile plan and asked for full execution.
- The repository `danahtetaung/danahtetaung` is the requested delivery repository even though its current branch does not match the deployed site.
- The current live home, Services, Portfolio, and Resume pages are the intended content baseline.
- The existing phone number is preserved as displayed; number ownership and formatting are outside this mission.
- A pull request into `main` is the intended delivery path, and production remains unchanged until a verified preview is accepted.

## Dependencies

- Access to the public live site for visual and content reference.
- Availability of the current public resume document.
- A working repository preview or deployment connection for final environment verification.

## Out of Scope

- Rebranding or changing the black-and-white visual direction.
- Adding authentication, persistent data, analytics, a CMS, or contact-form processing.
- Rewriting resume facts or business claims beyond faithfully presenting existing public content.
- Direct production deployment or custom-domain reassignment without separate verification.
