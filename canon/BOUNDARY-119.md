# CUBI 119 — Consequence-Based Recursive Observation

**Natural invariant:** `Observe → Close → Inherit → Observe the consequence`. A new inherited record is admitted only when the set of most recent closed source observations changes. Repeated inspection of the same source IDs produces no new child; the diodic door remains closed.

Three independent software-model observers (LH blue, CH green, RH red) report to one main cortex, without quorum, consensus, majority or checkpoint. The **Observe consequence** control uses source IDs as a stable signature, preserves the latest source residual/spike measurements, references an existing derived parent when present and creates a new `CONSEQUENCE119` entry in the existing inheritance store. Source observations and earlier generations remain unchanged.

This is a *change-in-observation-identity* test, not a claim of scientific causation or new semantic information. Since the simulation increments model ticks, its closed source identifiers typically change over time; more selective novelty filters are a future boundary. Browser-local IndexedDB is not tamper-proof, and live Chromium execution is not yet verified.
