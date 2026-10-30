# CUBI 122 — Atomic Decision and Local Witness

Natural invariant: **the cortex agent's novelty decision and the local self-observer's record cross one diodic door in a single transaction**. Neither may commit alone.

The browser cortex agent now opens one IndexedDB readwrite transaction spanning `inheritance117` and `self121`. It reads the last agent-derived generation and the local witness history, computes the same unchanged CUBI120 novelty rule (absolute residual >= 0.0005, spike-count difference >= 1, or new source), and writes a derived generation on NOVEL plus a local witness on either NOVEL or STABLE. Both stores commit together, or both abort. The witness references the decision's derived ID when one exists.

Historical CUBI117–121 records remain intact. The earlier separate `selfObserve121` helper is retained for compatibility but is no longer called in the active agent path. Three RGB reports remain independent: no checkpoints, quorum, consensus or rewriting ancestors.

Scope: atomicity applies to the two stores inside the same IndexedDB database, not to simultaneous sampling from the RGB neural model or external systems. Existing pre-122 orphaned records cannot be retroactively repaired without a separate explicit migration. Browser storage remains externally mutable. Live Chromium runtime has not been verified.
