# CUBI 121 — Local Self-Observation Invariant

The cortex agent remains a deterministic observer of three independently simulated RGB fields. A new **local self-observer** records each resulting NOVEL or STABLE decision after the agent acts, keeping its measured source IDs, the differences used to decide, the fixed novelty thresholds, and its own previous-entry reference.

The new `self121` IndexedDB store is append-only through the app and separate from source reports and derived-inheritance records. Database version 3 adds the store without rewriting earlier records. Each entry's local sequence and predecessor are audited. **Inspect local observer** displays a PASS/HOLD continuity result and counts of inherited versus held observations.

Canonical local invariant: `observe sources → agent decides → local witness observes decision → door closes`. The local witness has no voting or veto role, and it cannot alter the agent's threshold policy, earlier reports, or parent generations. There are no checkpoints and no quorums.

Limitations: browser-local IndexedDB remains editable or deletable by external means; the current implementation has no remote integrity anchor, and the decision recording is a separate transaction after the original decision. An interrupted session can thus leave a decision without its subsequent self-observation. Live Chromium verification remains outstanding.
