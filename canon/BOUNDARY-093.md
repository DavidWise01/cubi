# CUBI 093 — Stateful edge telemetry

Each of six directed inheritance edges at scalar z=0 now displays:
- P: pending number of source records without a child in the next tier.
- t: last successful INHERIT event tick from the persisted process observations, or — if never observed.
- lineage integrity: compare each derived reference with its recorded parent ordinal, identity and compartment. A discrepancy appears in red as BROKEN.

Existing edge states remain: dim IDLE, gold READY, white transient ACTIVE and green SETTLED. The red BROKEN state supersedes those visual states. Horizontal observation lanes remain non-mutating and separate from the six promotion edges.

This monitor reads already-committed memory and process observations. Displayed metrics are derived, not new observations. Historical tick accuracy is limited to available event history and does not certify an external clock. Memory state, shadows and observations remain in the same browser-local checkpoint; no remote backend is implied.

Integrity checks are diagnostic, not cryptographic authority; live-browser execution remains to be verified.
