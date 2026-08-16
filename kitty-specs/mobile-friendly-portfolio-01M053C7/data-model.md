# Static Content Model

The portfolio has no persistent data. These content shapes describe the stable concepts represented in HTML and validated by black-box tests.

## Navigation Item

- `label`: visible route label
- `href`: public destination
- `kind`: internal route or external action
- `accessibleName`: single announced name when visual hover labels are duplicated

**Rules**:

- Primary home navigation contains exactly Services, Portfolio, and Resume.
- Every navigation action is keyboard-focusable and provides a 44-by-44-pixel touch area.

## Contact Action

- `label`: visible LinkedIn, Email, or Phone text
- `href`: secure web, mail, or telephone action
- `external`: whether a new browsing context may be used

**Rules**:

- Email and phone values remain visible rather than icon-only.
- Contact information remains usable when animation or optional scripting is unavailable.

## Service Offering

- `title`: Automation, Data dashboards, Permit intelligence, or Custom software
- `summary`: optional supporting sentence

**Rules**:

- The list remains scannable in a single column on phones.

## Portfolio Project

- `name`: public project name
- `summary`: concise problem/outcome description
- `contribution`: Dana's role or contribution
- `technologies`: short public technology context
- `projectUrl`: external destination

**Rules**:

- The featured project is Vanity PermitOps.
- External action text identifies the destination clearly.

## Resume Profile

- `identity`: Dana Htet Aung and contact actions
- `skills`: public skills list
- `experience`: ordered experience entries
- `education`: education entries
- `projects`: portfolio entries
- `pdfUrl`: path to the printable resume document

**Rules**:

- HTML content appears before the optional embedded preview in document order.
- View and Download actions remain available even when the browser cannot embed the PDF.
