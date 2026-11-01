# CUBI 176 — Scattering resonance sweep

Source sequence: `..||..|...|| , || , ||...|..||..`. CUBI175 constructs a 26-layer symmetric, real-index, passive, lossless normal-incidence 1D wave stack with index 1 for dot, 1.5 for bar, and ambient index 1. CUBI176 scans 1101 wavelengths from 1 to 12 arbitrary units using exactly the CUBI175 characteristic-matrix method and identifies local maxima of transmittance. Checks reflectance+transmittance ≈ 1 for each sample, and reports maximal numerical energy-conservation residual.

A transmission maximum is not proof of a trapped mode, positive group delay, energy accumulation at center `||`, quantum-gravity interface, or physical superluminality. The current scattering-only transfer matrix does not compute field distribution, stored energy, radiative Q, or dwell time; all explicitly remain NOT_COMPUTED. Tested model parameters were chosen as an illustration rather than derived from manifold geometry.

No new Lean files, no previous model changes. Browser execution unverified.
