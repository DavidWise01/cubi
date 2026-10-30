# CUBI 112 — Asynchronous Diodic Arrival

Canonical topology remains {{ [(lh,ff,rr)L] [(ch,ff,rr)C] [(rh,ff,rr)R] }}.

Each registry's independently computed observation can be queued before reaching the central silo. A separate browser-local queue preserves queued RGB payload, source simulation tick and queue identifier. The page has three controls: Queue RGB snapshot, Deliver next, and Reverse delivery test.

In reverse mode the registry delivery preference is R,C,L; normal is L,C,R. Within each registry, the earliest source tick is selected before later source ticks, preserving local chronology. Each committed arrival includes source tick, queue id, global sequence, independent local sequence, and SHA-256 predecessor and content hashes. The main silo does not vote, average or discard differences. Existing observations are not edited. SHA and provenance verification occur before delivery.

Scope: source snapshots and a queue are persisted locally; delivery writes journal then removes delivered items from queue. These are two localStorage transactions rather than one atomic transaction. A crash between them can leave a duplicate queued item; the next gate is idempotent exactly-once delivery using a durable transactional store such as IndexedDB. This version performs controlled reverse-color delivery, not arbitrary network latency simulation. JIT optimization is the browser's responsibility, not a custom compiler. Live browser validation remains outstanding.
