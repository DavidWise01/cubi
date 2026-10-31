# CUBI 151 — Executable Persistence Refinement

Canonical substrate `{{aether}}`, geometry `{ [6x4(5x3)] }`.

An isolated IndexedDB fixture tests the abstract persistence claims of `proofs/CUBI150.lean`: append preserves an existing prefix, length increases by one, an explicitly aborted transaction leaves no extra record, and causal parent IDs remain continuous. A pre-reload witness in localStorage allows manual comparison after a page refresh. These are runtime checks, not formal proofs that JavaScript refines the Lean implementation.

No production action, hemisphere, or source ledger is modified. There is no quorum or implicit execution. A test that has merely been committed is not a measured PASS; the user must run the controls in Chromium. The cross-reload comparison is not itself proof that the page was reloaded, and localStorage is not tamper-resistant. The Lean source has not been compiler-checked here.
