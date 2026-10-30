# CUBI 135 — Interruption and Concurrency Falsification

Substrate `{{aether}}`; primitive geometry `{ [6x4(5x3)] }`.

Next boundary: failure and concurrent action must not generate more than one terminal decision for one pending proposal. Tests in `aether135.js` operate against separate `cubi.aether135.fixtures.v1` IndexedDB storage, leaving the production CUBI133/134 ledger untouched.

Two tests: (1) write a temporary closure then abort its transaction and verify no closure survived; (2) start concurrent CLOSED and HELD transactions referencing one pending proposal, requiring exactly one transaction to commit. An isolated fixture store is reset on each manual test. PASS must be earned by the browser results, not assumed from code inspection.

This exercises IndexedDB atomicity and serialization in one browser origin; it does not simulate a true browser-process crash, page reload while a transaction is in flight, or separate devices. A full Chromium multi-tab and reload test remains open. No quorum or automatic execution.
