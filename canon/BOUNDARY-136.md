# CUBI 136 — Durable Recovery Witness

Substrate: `{{aether}}`, geometry `{ [6x4(5x3)] }`.

Test the already-committed causal ledger (`cubi.aether133.v1/events`) after page interruption. An explicitly armed pre-reload witness records the complete ledger's SHA-256 digest, record count, pending causal ID and ephemeral page-session ID into a separate IndexedDB database. On reload, verification recomputes the digest of the original prefix and validates sequence, parent and terminal continuity across the current ledger. A lost or changed prefix triggers HOLD; without an armed witness the result is UNVERIFIED. An explicit reload button permits a repeatable manual test.

This audits persistence rather than executing any bound tool. The previous event ledger is read-only; witness storage is separate. This is a browser-local integrity check, not tamper-proof proof of real crash recovery: both the ledger and witness are mutable by a privileged local user, and actual process termination and multi-device operations have not been tested. No quorum, implicit action or backward mutation of provenance.
