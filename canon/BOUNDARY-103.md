# CUBI 103 — Diodic Gap C Persistence

Canonical requested sequence: `C1,C2,C3.C1,C2,C3.C1,C2,C3.C1`.

Ten phases exactly: C1 → C2 → C3 → C1 → C2 → C3 → C1 → C2 → C3 → C1, then recurrence. This is a *phase-indexed one-way journal*, not 3 votes or a quorum. C1/C2/C3 are ordered witness/observation states, not competing truth claims.

Gap C model observations and feedback recovery events append to a separate localStorage journal, `cubi.gapc.diodic103.v1`. Each entry has a monotonic sequence number, preceding sequence pointer, phase, model tick, event kind and preserved payload. Existing entries cannot be rewritten through the UI. Initial loading checks phase and parent continuity; a mismatch produces DIODIC HOLD rather than silently regenerating data. Source memory and original neural observations are not mutated.

The journal also persists a RECOVERY_SAVED record with prior A/B, applied A/B and trial metadata. On reload, the most recent unrecovered trial is reconstructed along with its A/B slider settings; model tick advances past the journal's latest tick. A confirmed divergence recovery appends RECOVERY_RESTORED. Controls: Audit C1/C2/C3 and Export diodic ledger. This complements the existing short WHY history, which remains independently bounded.

Scope: browser-local append-only *application behavior*, not an independently verified cryptographic ledger or remote Git persistence; browser storage remains user-editable and finite. The neural voltage arrays themselves do not survive a reload, so the resumed stability comparison spans a fresh neural initialization and is not a continuous physiological experiment. The user’s 0.2 nm is symbolic. Live GitHub Pages execution remains unverified.
