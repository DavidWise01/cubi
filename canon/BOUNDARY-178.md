# CUBI 178 — Independent scattering and field integral

Use the CUBI175 26-cell palindrome as a passive, lossless, frequency-domain nonmagnetic, nondispersive 1D dielectric stack; n(dot)=1, n(bar)=1.5, both ambient half-spaces n=1. Compute characteristic matrix M across the stack. For a normalized incident plane wave, complex transmission `t=2/(A+B+C+D)`, reflection `r=(A+B-C-D)/(A+B+C+D)` (ambient admittance 1); calculate independent `T=|t|^2` and `R=|r|^2`, and check residual `|T+R-1|`. No `R=1-T` shortcut.

Back-propagate transmitted E,H through every cell and integrate the normalized harmonic electric-plus-magnetic density `0.5*(n²|E|²+|H|²)` using 32 midpoint quadrature samples per cell, 832 samples total. Compare central cells 13 and 14 with equal total thickness in the other 24. This can detect central enhanced steady-state energy *at the chosen frequency*, but does not establish a trapped quasi-normal mode, causal dwell time, or sustained retention after switching off illumination.

Test module: `integral178.js`. A physical-storage time requires length, material dispersion, input/output flux, and potentially a time-domain pulse test. The optical model is an assumption, not a derivation of gravity-push/void-pull spacetime geometry. Browser execution unverified, no new Lean files.
