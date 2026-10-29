# CUBI 098 — Gap C causal-observation ledger

An observation of the Gap A/B modeled contributions and Gap C interpretation is captured every ten simulated ticks in a browser-local bounded ledger (maximum 256 records). Each observation includes tick, nine spike counts, total spike count, A/B/C control values, A and B measured model contributions, their delta, and an explicit unknown: the computation does not establish biological causality.

The page displays the most recent seven WHY observations and supports JSON export and explicit ledger reset. The ledger uses a separate localStorage key and does not overwrite original tensor memory or its SHA-256 checkpoint. No claim of immutable remote storage is made. Dropping the oldest ledger observations is a bounded visualization/history policy, not an append-only archive; export regularly to preserve history.

Symbolic scale: 0.2 nm. Unbounded model notation: `{{inf!xinf!}}^{{inf!}}`. Both remain descriptive, not allocated physical geometry. Live page execution is unverified.
