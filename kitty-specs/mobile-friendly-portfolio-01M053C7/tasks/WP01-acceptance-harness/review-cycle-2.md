## Review finding

**Issue 1 — FR-011 exact accessible names are not enforced.** The home action locators currently use Playwright's substring name matching, so duplicated visual label text such as “Portfolio Portfolio” could still pass. Require exact accessible names for LinkedIn, Email, Services, Portfolio, and Resume so animated duplicate labels remain a single understandable name.

The prior FR-004 and FR-005 findings are resolved: the new checks cover portrait/landscape wave safety and hidden-document pause/resume behavior.
