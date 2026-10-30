# CUBI 132 — Temporal Causal Ordering

Substrate `{{aether}}` = `{ [6x4(5x3)] }`.

Scientific software boundary: the cortex observation must be CLOSED before a proposal is recorded; a proposal must exist before its binding closure. Evidence from wall-clock timestamps alone is insufficient to prove a cross-database causal sequence. The auditor therefore uses HOLD for a detected inversion, UNVERIFIED for missing original observations or clocks and for timestamp-consistent events without a common monotonic event clock, and PASS only when stronger causal ordering is established (not available in the current CUBI129 schema).

The CUBI132 auditor is read-only across the CUBI115 cortex and CUBI129 proposal and closure stores. Synthetic fixtures test timestamp-consistent, inverted, and missing-ancestor cases. Future work should assign all three events a shared ordered transactional sequence or explicit parent-to-child event identifiers, not assume that wall-clock timestamps are sufficient.

No votes, quorum, implicit execution, provenance fabrication, or retroactive mutation. Browser runtime not independently verified.
