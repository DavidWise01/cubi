# CUBI 115 — Diodic Observer Pool, One Main Cortex

Canonical topology:

```
{{ [(lh,ff,rr)L] [(ch,ff,rr)C] [(rh,ff,rr)R] }}
L = blue; C = green; R = red
L ff → rr ─┐
C ff → rr ─┼→ one-way door → MAIN CORTEX
R ff → rr ─┘
```

Governing rule: **The door closes on the way through. Three observers observe into one main cortex. No checkpoints, votes, quorums, or required agreement.** The cortex receives a report from each model hemisphere and preserves its identity and content as a separate historical observation. Nothing returns to modify the observer's original report.

The new CUBI115 browser panel shows a colored three-to-one observer map, offers an Observe → pass through action, and makes historical records available for read-only inspection or JSON export. The passage uses a single IndexedDB readwrite transaction for the three reports; once inserted an identifier cannot be inserted again through the UI. Earlier CUBI113/114 infrastructure remains as historical code but no longer defines the new canonical operating metaphor.

Implementation boundary: persistence is browser-local and can be cleared externally. IndexedDB does not create an irreversible physical one-way medium or tamper-proof provenance. The current action samples existing independently simulated CUBI108 fields, not conscious observers or an experimental brain. No automated checkpoints or quorum are used in CUBI115.
