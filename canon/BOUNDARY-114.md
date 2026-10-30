# CUBI 114 — Isolated fault injection and recovery checks

This boundary adds a visible **Run fault tests** control to the existing CUBI 113 IndexedDB panel.

Tests execute in a separate `cubi.test114.v1` IndexedDB database:
1. Write a fixture; intentionally abort a replacement transaction; verify the first value survived.
2. Attempt an `add` with an existing primary key; verify the key remains unique and the original event remains unchanged.
3. Close and reopen the test database; verify the committed fixture persists.
4. Compare production silo counts, pending queue counts and RGB hash heads before and after; the production ledger is not deliberately modified.

Each case yields explicit PASS/FAIL and a combined result. A test failure does not count as proof of the implementation's correctness. Test records are isolated from the production witness store.

**Limits:** Cross-tab collision, actual power-loss durability, browser quota exhaustion, and full end-to-end JavaScript runtime behavior remain untested. The old CUBI 112 localStorage queue remains separate; no migration or destructive rewriting was performed. No quorum or forced consensus. The tests validate transactional primitives in the user's browser only if successfully run there.
