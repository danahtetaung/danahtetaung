# Public Route Contract

| Route | Required visible content | Required actions | Enhancement |
| --- | --- | --- | --- |
| `/` | Dana Htet Aung, LinkedIn, Email, Services, Portfolio, Resume, black wave | LinkedIn, Email, Services, Portfolio, Resume | Animated wave when motion is allowed |
| `/services/` | Services, automation statement, four service offerings, phone, email | Back, Phone, Email | None required |
| `/portfolio/` | Portfolio, Vanity PermitOps, project summary, contribution, technologies | Back, PermitOps project link | None required |
| `/resume/` | Resume, readable skills, experience, education, and projects summary | Back, View PDF, Download PDF | Inline PDF preview on larger screens |

## Cross-route invariants

- Routes load directly without relying on client-side navigation state.
- No route creates horizontal overflow at supported viewports.
- Essential content appears without waiting for animation initialization.
- Interactive controls expose one understandable accessible name and visible keyboard focus.
- External and document actions remain ordinary links so browser fallback behavior is preserved.
