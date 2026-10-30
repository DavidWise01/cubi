# CUBI 129 — Atomic Diodic Closure

Canonical substrate: `{{aether}}`; geometry `{ [6x4(5x3)] }`; 24 BOX addresses, 15 TOROID tool addresses, one scope; isolated primitive types `[]^4`, `()^3`, and `{n}^{n}`.

## Invariant

**No BOUND proposal exists without its corresponding CLOSED binding.** A human-explicit binding opens one IndexedDB `readwrite` transaction spanning the `proposals` and `closures` object stores in `cubi.aether129.v1`. The transaction changes the existing proposal's status to BOUND and adds exactly one CLOSED binding keyed by the proposal ID. Aborted transactions commit neither change. Proposal creation itself is separately recorded and never executes a tool. An explicit HOLD changes the proposal state without adding a binding. The existing CUBI 126/128 localStorage ledgers are not modified or migrated.

The agent proposes only after reading a previously recorded cortex observation. The proposal cannot execute without pressing **Explicit bind → close**. Audit performs a read-only cross-store correspondence check for BOUND/CLOSED pairs, box/tool identity, and orphaned closures. No consensus, quorum, voting, retroactive edits to the older ledgers, or automatic execution.

## Important implementation boundaries

The transaction guarantees database-level atomicity **within this browser database**, not physical-world execution, cryptographic append-only immutability, or cross-database/cross-tab provenance. The proposal status is updated rather than preserved as an append-only status event inside the new database, while the closed binding is a separate durable record. A page reload leaves existing proposed records visible in audit but does not automatically re-arm them for binding. The cortex reader samples an existing observation but does not prove that it is the latest chronological event. The original CUBI 128 dual localStorage writes remain non-atomic if the old panel is used. The new CUBI 129 panel should be used for atomic binding demonstrations. Browser runtime testing has not been independently completed.
