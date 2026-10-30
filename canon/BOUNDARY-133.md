# CUBI 133 — Shared Causal Sequence

Substrate: `{{aether}}`, geometry `{ [6x4(5x3)] }`.

New events live in a separate IndexedDB store `cubi.aether133.v1/events`, each with a strictly increasing integer sequence, stable event ID, previous-tip reference, and causal parent. An imported closed cortex report is recorded as an OBSERVATION snapshot, followed by a PROPOSAL referencing that imported observation, followed by exactly one explicit CLOSED or HELD event referencing the proposal. BOX/TOROID identity must be unchanged across proposal and decision. The audit reconstructs predecessor relations from immutable event objects and detects breaks, invalid parent types, and duplicate decisions. No implicit binding or quorum.

This is local software causality. Import order is not proof of original cortex observation time; the imported snapshot establishes the start of the new local chain. In-session active state is not restored automatically after reload. Runtime Chromium testing remains outstanding. Historical CUBI 129 ledgers remain unchanged; CUBI 130 is not present. IndexedDB is not a tamper-proof immutable archive.
