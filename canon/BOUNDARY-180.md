# CUBI 180 — Open-boundary pulse control

Use exactly the same 26-layer punctuation interface as CUBI175-179. Two runs use identical incident finite Gaussian-envelope sinusoidal pulse and numerical grid: with the layer stack (dot index 1, bar index 1.5) and without it (all index 1). Both use 900 spatial positions, dt=0.25, 3000 steps, pulse source off at step 190, and graded damping sponge over outer 110 cells to reduce external-box reflections.

Observe center two-cell energy, full 26-cell-region energy and global wave energy every 60 steps; compare cumulative late central energy after step 900 with empty control. Source: `open180.js`. The sponge is NOT a perfectly matched layer, and a higher cumulative energy in the structured case would not alone establish photon trapping or an optical Q factor. Window selection, boundary reflection, grid convergence, and wave-energy definitions require further testing. Distinct incident drive and absence of a pulse-duration correction can affect comparisons; avoid physical assertions about quantum gravity, manifolds, electrons, or superluminal propagation.

Computational experiment committed; live runtime output and convergence are NOT VERIFIED. No additional Lean.
