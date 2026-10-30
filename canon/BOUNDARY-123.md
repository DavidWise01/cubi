# CUBI 123 — Causal Continuity

Natural invariant: **every inherited observation must resolve through existing parent references to closed original RGB reports.** A failed path is reported as HOLD, not repaired by rewriting history.

The main cortex now exposes **Trace causal lineage**. This read-only audit traverses the existing IndexedDB `cortex`, `inheritance117` and `self121` stores. It follows parent identifiers recursively, detects missing parents, cycles and empty parent sets, checks that reached source records are closed and mapped to L/C/R, and reports any local self-witness referencing a missing inherited decision. A successful path returns its original source IDs. No quorum, voting, checkpoints or forced agreement.

Limitations: this is a referential-integrity audit, not an authenticated proof of physical causality. Legacy inherited records with incomplete parent fields may correctly report HOLD. IndexedDB is browser-local and externally mutable. Source and runtime browser execution have not been verified. The audit never modifies historical records.
