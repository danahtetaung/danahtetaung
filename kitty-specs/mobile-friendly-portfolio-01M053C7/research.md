# Research: Mobile-Friendly Portfolio

## Decision: Use a static multi-page site

**Rationale**: The designated repository is already static, the required behavior is content-first, and all routes can work without server rendering or client application state. Static pages make essential navigation resilient when JavaScript fails and minimize deployment and performance risk.

**Alternatives considered**:

- Reconstruct the unknown deployed Next.js source: rejected because that source is not present in any connected repository and would add framework complexity without user value.
- Continue the old Gulp/Bootstrap template: rejected because it does not match the live design and carries unused legacy code.
- Single-page sections only: rejected because the live information architecture and public URLs already use separate Services, Portfolio, and Resume routes.

## Decision: Recreate the wave with a small native canvas renderer

**Rationale**: Canvas can produce the layered black curves seen in the live design with a few functions and no runtime dependency. The animation can render one still frame for reduced-motion visitors and pause cleanly when hidden.

**Alternatives considered**:

- Heavy 3D/WebGL library: rejected because the effect does not require it and continuous GPU cost would work against mobile performance.
- Pre-rendered image only: retained as a conceptual fallback but rejected as the default because the live site uses ambient motion as a central identity element.
- SVG animation: viable, but canvas provides simpler curve iteration and resize handling for this specific effect.

## Decision: Wrap the three pills instead of adding a mobile menu

**Rationale**: Three actions fit comfortably as visible controls when the layout allows wrapping. Keeping them visible avoids menu state, extra taps, focus trapping, and a new interaction pattern that would diverge from the live site.

**Alternatives considered**:

- Hamburger menu: rejected because it hides only three primary actions and adds complexity.
- Smaller labels or reduced padding: rejected because the current failure is insufficient space and touch size; shrinking controls would worsen mobile usability.

## Decision: HTML resume first, PDF as an enhancement

**Rationale**: A phone-scaled PDF viewer renders resume text too small. An HTML summary makes the same information readable and accessible while explicit View and Download actions preserve the original document.

**Alternatives considered**:

- PDF embed on every viewport: rejected based on the verified 390-pixel capture.
- Remove the PDF entirely: rejected because visitors may need the original printable document.

## Decision: Treat deployment connection as an external verification gate

**Rationale**: The user-designated repository and current live Vercel output do not contain the same source history. The repository can receive a complete, validated implementation, but production status cannot be inferred from a local build or GitHub push.

**Alternatives considered**:

- Claim the feature branch automatically creates the correct preview: rejected because no repository-to-Vercel binding has been verified.
- Modify production directly: rejected by scope and PR-only governance.
