# CUBI 139 — Cyclic Straw-Man Witness Pool

Canonical substrate `{{aether}}`, rectangle `{ [6x4(5x3)] }`.

Each of the three independent witnesses LH, CH and RH has three separately typed channels: PROVIDE information, AUDIT information, and OBSERVE information. The channels cycle `PROVIDE → AUDIT → OBSERVE → PROVIDE`; each operation records its own witness, channel, source digest, count, tip, timestamp and opinion without overwriting another channel. Nine records from a complete cycle are appended atomically into one shared IndexedDB pool.

The shared pool contains differences and makes them observable; it does not merge identities, elect a winner, vote, force consensus or grant execution authority. The current implementation uses deterministic reports against the same CUBI133 event ledger, not autonomous semantic language-model opinions. Each channel independently reads the causal history sequentially; intervening changes may produce legitimate differences. The source ledger remains read-only. Live browser execution is not independently validated.
