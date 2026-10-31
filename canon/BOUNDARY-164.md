# CUBI 164 — Two-Tick Circulation Conservation

Inputs: reference length 1.61658e-35 m, two-length cell side, light-crossing interval 2*l/c, four separate dipole-equatorial bands r=9,6,3,1. For a freely selected angular frequency omega, snapshots have phi_A=0 and phi_B=(omega*dt) mod 2pi. With a fixed modeled circulation Gamma, both snapshots retain the same Gamma **by construction**. The equatorial ideal-dipole curvature is 3/(r*2*l); ordering rises inward.

Crucial physical falsification gate: conventional classical circular speed v=Gamma/(2pi R). The demo selects Gamma=1 square meter per second as an explicitly arbitrary normalization. At Planck-size R it produces v greatly exceeding c, therefore the literal classical-fluid interpretation **FAILS** the relativistic speed bound. Do not assert it represents a physical electron. Conserve field identity in the software model without interpreting visible phase as a quantum spin measurement. Electron intrinsic spin is not ordinary mechanical rotation.

GitHub Pages module: `circulation164.js`; user-adjustable omega, no physics-tuned fitted parameters. No additional Lean files. Browser runtime execution has not been independently verified.
