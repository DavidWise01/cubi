# CUBI 120 — Agentic Meaningful Novelty

Three independent model observers LH/BLUE, CH/GREEN and RH/RED continuously report through their one-way diodic doors into the main cortex. No checkpoints, votes, quorums or forced consensus.

A new **autonomous novelty agent** runs on a browser timer approximately every 1.5 seconds while the page is visible. It reads the latest closed source reports, compares each registry's residual and spike count against the previous **agent-inherited** observation, and writes a new `AGENT_NOVELTY120` generation only when a registry is new, an absolute residual difference reaches 0.0005, or a spike-count difference reaches 1. Merely advancing the model tick is not a sufficient novelty condition.

The agent stores its observation inputs, source IDs, per-source differences, parent derived record, generation, thresholds and a CLOSED designation. The existing parent reports and earlier derived records are never changed through the application. It can be paused/resumed and a readout shows cycles, novel generations, stable observations and any error. On persistent errors the agent stops rather than repeatedly writing.

Limits: this is an autonomous browser-local deterministic rule agent, not a general AI model. Novelty thresholds are chosen engineering parameters, not scientifically validated measures of meaning. It does not modify neural dynamics, its own policy, or outside services. IndexedDB can be externally deleted/modified and runtime Chromium behavior has not been independently verified.
