# CUBI 117 — Natural Invariant: Inheritance Without Revision

```
LH / BLUE ── CLOSED ─┐
CH / GREEN ─ CLOSED ┼─→ MAIN CORTEX → new inherited observation
RH / RED ─── CLOSED ┘
```

**Invariant:** A child observation may reference already-closed parent observations but may not alter the parent observations. Neither consensus nor a quorum is required: one, two or three distinct observers may supply parent references. Disagreements remain separate facts in the derived comparison.

The browser app advances IndexedDB `cubi.cortex115.v1` from version 1 to 2 and adds the `inheritance117` object store without modifying the existing `cortex` store. The Inherit closed reports control collects the latest closed report of each available observer, records stable sorted parent IDs, the observed residual and firing count, and creates a new derived record. Its identity is deterministic from parent IDs, so repeated selection does not create duplicate children. Inspect lineage shows original and derived counts and recent inherited events. The stored primary observations remain untouched.

No checkpoints, voting, quorum, or requirement for agreement. A derived contrast is a software-model observation, not experimental evidence or biological causation. Browser storage is not physically immutable and can be externally edited or cleared. Live GitHub Pages runtime remains unverified.
