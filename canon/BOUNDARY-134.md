# CUBI 134 — Causal Continuity Across Reloads

Substrate: `{{aether}}` and canonical rectangle `{ [6x4(5x3)] }`.

**Invariant:** active causal state is derived from the persistent event ledger, not from a temporary browser variable. On page load and before every user-requested action, CUBI reconstructs observation → proposal → CLOSED/HELD history from the original IndexedDB `cubi.aether133.v1/events` records. No event is rewritten.

A single IndexedDB read-write transaction now reads the full event history, validates sequential IDs and predecessor references, checks causal parent and BOX/TOROID invariants, then appends the requested event if and only if the chain is eligible. Two tabs attempting to close the same proposal cannot both produce a valid second decision through this transaction path. An inconsistent ledger is placed on HOLD, not silently repaired.

Explicit human buttons remain the only way to import an observation, propose, close, or hold. There is no quorum, vote, implicit execution, or fabricated ancestor.

Limits: This changes the existing CUBI 133 engine in place and does not rewrite stored events. Existing malformed histories can be flagged HOLD. IndexedDB is browser-local, user-modifiable storage, not cryptographically tamper-proof. Rendering and multi-tab behavior have not been independently run in Chromium.
