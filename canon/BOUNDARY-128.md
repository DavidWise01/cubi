# CUBI 128 — Aether Proposal Event History

Substrate: `{{aether}}` with expression `{ [6x4(5x3)] }`.

A proposal is not an execution. Every newly generated CUBI 128 proposal is appended to `cubi.aether128.proposals.v1` in browser localStorage with a sequence number, predecessor counter, cortex observation reference, source BOX, and TOROID tool. An explicit bind attempts to append a BOUND outcome; the human may instead append HELD. Superseding a pending session proposal records HELD. "Inspect proposal history" reads the recorded events and folds their states without rewriting earlier records.

The independent aether binding ledger `cubi.aether126.events.v1` remains the authoritative local record of executed symbolic bindings. Cross-ledger writes are NOT atomic: the binding can succeed when the proposal audit write fails, in which case the interface reports a hold. Proposals that were left pending on an earlier page session remain visible in history, but are not automatically resumed or silently executed. A HOLD is an observation, not deletion or a vote.

No quorum, consensus, retroactive modification, or automatic execution. The engine is a browser-local prototype; localStorage provides no tamper-proof immutability and concurrent tabs may race. No live browser test is claimed.
