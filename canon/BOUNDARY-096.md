# CUBI 096 — Active brain-simulation lattice with Gap A / Gap B

Nine existing tensor cubit registers (LH, CH, RH × i, id, sid) are now also views into an active neural simulation. Each register is assigned a five-layer array; each layer has a 5×5 active sheet: 5×25=125 modeled neurons per tensor, 1,125 active neurons across the nine. The notation `{{5x5}}^5` also defines a recursively expandable full address space of 25^5=9,765,625 symbolic neuron positions per tensor, or 87,890,625 total. The full symbolic tree is *not* allocated or simulated: the 125 active elements are an explicitly limited sample representation.

Gap A is a configurable excitatory/local-coupling term; Gap B a configurable inhibitory/counter-coupling term. Each simulation tick reads the previous state and updates its full neuron buffer in one pass; threshold firing is reset and counted per tensor. These parameters are original model rules and not measured physiological gap-junction conductances.

The GitHub Pages app shows the nine neural arrays on the flat scalar-zero field with toroidal overlays, model spikes, a pause/resume toggle, adjustable Gap A and Gap B, a stimulus button and a reset button. Original persistent-memory snapshots and conservation gates are retained unchanged. Neural voltage values are ephemeral in this version and are not integrated into the hashed persistent-memory checkpoint; reloading reinitializes the simulation.

Boundary: theoretical agentic neural dynamics visualization, not a validated neuroscience simulation, living brain, physical quanta, or autonomous consciousness. No quorum. No cross-domain original-memory transfer. Existing GitHub Pages workflow remains configured; actual remote page execution requires independent verification.
