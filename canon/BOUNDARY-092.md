# CUBI 092 — Stateful floor arrows

The nine logical tensor cubit registers occupy a 3 × 3 flat plane, z=0:
- columns LH, CH, RH
- rows L0 short/weak, L1 medium/medium, L2 long/strong

Six arrows connect only permitted inheritance paths, L0→L1 and L1→L2 inside the same compartment. Horizontal dashed lanes show inspection paths only; they do not copy records.

Every arrow derives its visible status from the persisted memory lineage:
- IDLE / dim: source has no records.
- READY / gold: at least one source record does not have a derived child at the next layer.
- ACTIVE / white: a running browser consolidation operation just created a derived child (transient display).
- SETTLED / green: all current source records have child references in the next layer.

Cortex agent cycles call the already-existing consolidation operation, which preserves source identity, parent ordinal, and compartment. There is no voting or consensus. Each visible sphere encloses a symbolic toroid ring and BOX outline. This is a browser-model rendering at scalar z=0, not a physical Planck-length claim.

**Integrity scope:** memory, shadows and process observations are serialized into a single locally hashed JSON checkpoint. Active arrow pulses are ephemeral UI feedback and are not recorded as durable event timestamps; after reload the derived ready/settled states are recomputed. The site needs a working GitHub Pages deployment, which source commits alone do not verify.
