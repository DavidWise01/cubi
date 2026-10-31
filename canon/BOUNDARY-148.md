# CUBI 148 — Awareness-to-Intent Isolation

Canonical `{{aether}}` substrate `{ [6x4(5x3)] }`.

Each of LH, CH and RH independently converts its own CUBI147 awareness evidence into an intent proposal. Proposals are deterministic symbolic recommendations: ESTABLISH_BASELINE, MONITOR, or REQUEST_MORE_OBSERVATION. They are neither executed actions nor grants of authority. Three separately inherited intent histories are held in a shared IndexedDB pool, with per-hemisphere parent references and original awareness source identities.

All proposals are appended, never modified through the interface. The independent read-only auditor recomputes the intent from original awareness, verifies source identity and each hemisphere's parent chain, and confirms `executed:false`. No cross-hemisphere ancestry, vote, quorum, forced agreement or implicit action. This is a software model, not evidence of consciousness or autonomy. Live browser tests are outstanding.
