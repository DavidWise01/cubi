# CUBI 095 — Reload continuity checkpoint test

The Test reload control reads the persisted CUBI90 checkpoint from browser localStorage, checks its SHA-256 digest, validates its nine-register lineage, and recreates a detached restored candidate. It then compares the current in-memory state to that candidate byte-for-byte via canonical JSON plus each register count and each of six derived inheritance-arrow states.

The report exposes the nine register counts, six arrow statuses, checkpoint sequence/tick/hash and total historical process observations. A mismatch, absent checkpoint or invalid lineage produces HOLD without repairing or rewriting the original. No memory or arrow movement occurs during inspection.

**Invariant 095:** for a committed checkpoint, original records, inherited references, and process observations should round-trip without loss or identity changes. ACTIVE arrow flashes are transient UI state, not durable memory; only their derivable READY/IDLE/SETTLED statuses survive reloading. Browser-local digest comparison is not a substitute for actual page-reload browser testing, authenticated provenance, cross-device synchronization, or trustworthy storage.
