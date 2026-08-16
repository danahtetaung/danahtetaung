---
affected_files:
- path: tests/portfolio.spec.mjs
cycle_number: 2
mission_slug: mobile-friendly-portfolio-01M053C7
reproduction_command: npm test
reviewed_at: '2026-08-16T11:19:56Z'
reviewer_agent: codex
verdict: rejected
wp_id: WP01
---

## Review finding

**Issue 1 — FR-011 exact accessible names are not enforced.** The home action locators currently use Playwright's substring name matching, so duplicated visual label text such as “Portfolio Portfolio” could still pass. Require exact accessible names for LinkedIn, Email, Services, Portfolio, and Resume so animated duplicate labels remain a single understandable name.

The prior FR-004 and FR-005 findings are resolved: the new checks cover portrait/landscape wave safety and hidden-document pause/resume behavior.
