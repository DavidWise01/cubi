# CUBI 143 — Independent Difference Recalculation

The `{{aether}}` substrate remains `{ [6x4(5x3)] }`. For every stored LH, CH, RH report from CUBI142, CUBI143 reads the original CUBI141 generation records and recalculates all six slot-level comparisons against the same hemisphere's previous generation. It checks source identity, predecessor identity, parentChanged, operationChanged, polarityChanged, novelty, closed door and canonical substrate. A mismatched claim yields HOLD; no reports yields UNVERIFIED. The original generation and report databases are read-only.

Invariant: a witness's assertion must be reproducible from independently inspected source evidence, without requiring agreement with other hemispheres. The shared pool preserves each report and its provenance; no consensus, votes, quorum, retroactive changes or implicit tool execution.

This is an independent software recalculation, not a separate hardware or security domain. It does not establish that the underlying source generation data is authentic. Browser execution has not been independently measured.
