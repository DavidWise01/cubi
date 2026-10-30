# CUBI 113 — Transactional Exactly-Once Diodic Delivery

L/LH/BLUE, C/CH/GREEN and R/RH/RED retain independent ff → rr → silo identity.

CUBI 113 adds a new IndexedDB database `cubi.atomic113.v1` with queue, ledger and metadata object stores. `Queue RGB` snapshots three currently simulated neural fields using stable event identifiers `registry@sourceTick`. Re-queuing the same source tick does not create a duplicate record. `Deliver next` or `Deliver reverse RGB` chooses earliest source tick per registry, computes each registry's independent previous SHA-256 hash, and commits new ledger records and queue deletion in one IndexedDB readwrite transaction. On an aborted transaction, neither change is committed. Repeated delivery of a committed identifier is skipped by its unique key.

The audit replays each color's chain and checks per-registry local sequence, previous hash, nondecreasing source tick and payload digest. The original CUBI 112 localStorage journal is preserved unchanged; it is **not silently migrated** or treated as verified by CUBI 113. The new panel offers queue, normal/reverse delivery, audit and export controls.

## Engineering limits

The operation is transactional within one IndexedDB database; it is not a remote, distributed exactly-once guarantee. Parallel tabs may race during precomputation; conflicting transactions abort and should be retried after reloading current ledger state. The hashes are unkeyed and not authenticated against a storage administrator. Browser quotas, storage clearing and private-mode restrictions apply. This is an observable software simulation; no biological or experimental time-dilation claim. Browser runtime remains unverified, although JavaScript syntax checking passed.

Next natural boundary: robust cross-tab coordination and fault-injection tests of transactions, crash recovery and duplicate source arrivals.
