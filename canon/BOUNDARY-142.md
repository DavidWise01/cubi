# CUBI 142 — Recursive Difference Propagation

Substrate `{{aether}}`; geometry `{ [6x4(5x3)] }`.

Each LH, CH, and RH hemisphere separately compares six closed positions in its most recent generation with its own six positions in the predecessor generation. Reports preserve source IDs, predecessor IDs, changes to operation and polarity, and the expected causal parent links. Generation 1 is BASELINE, and subsequent generations may be CHANGED or STABLE. Three independent reports append in a single transaction to one separate shared pool, `cubi.aether142.differences.v1`, without merging their identities or forcing consensus.

The audit checks report shape and closed status; it does not yet independently recompute all claimed differences from source. Duplicate reports for a generation are rejected by primary key. The report generator is a deterministic software observer, not a model of biological hemispheres. Existing causal records are read-only, and no tool execution is authorized. Live Chromium tests remain outstanding.
