## Review findings

**Issue 1 — FR-004 wave safety is not directly exercised.** Add a black-box check at phone portrait and short landscape sizes that confirms the decorative wave is present and does not intercept or cover primary controls.

**Issue 2 — FR-005 visibility pausing is untested.** Add a black-box check that places the page in a hidden visibility state and observes the public wave state transition to paused, then restores visibility and observes animation resume when reduced motion is not active.

All other WP01 checks passed: the package installs cleanly, the validator fails with actionable legacy-route errors, the 39-test red baseline is meaningful, owned-file boundaries are intact, and no frozen or locked surface was changed.
