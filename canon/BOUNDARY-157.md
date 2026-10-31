# CUBI 157 — Pauli Exclusion + Chemistry Constraints

The user-defined toroidal geometry has 8 sectors × 3 labeled positions = 24. This does **not** identify those sector addresses with quantum orbitals, spin, or a particle species.

Test first ten neutral elements (H–Ne) as standard independent-electron filling: orbitals 1s, 2s, 2p, with distinct labels (n,l,m,spin); Pauli requires no duplicate complete four-quantum-number state within one atom. The code `pauli157.js` builds ten distinct occupancy slots and evaluates Z=1..10. For Z=6 (carbon), standard reference is 1s²2s²2p²: two 2p electrons populate different degenerate orbitals with parallel spins (Hund's rule). The center cipher crossing 5/6 is retained as symbolic indexing, not a derived carbon bond.

Important: 24! counts permutation orderings, not 24 allowed electrons per orbital, nor toroidal species. Ordinary chemistry requires *multiple simultaneous occupied electron states* for Z>1. A single continuous worldline traversing times is a speculative Wheeler-style interpretation, not a mechanism that reproduces electron antisymmetry, electron-electron repulsion, spectra, chemical bonding, or observed positron asymmetry. Electron spin ±1/2 is a quantum property and is not merely toroidal rotational motion.

The test is a baseline compatibility check, not an ab initio chemical simulation. It cannot show the proposed physical toroid is stable or that one literal electron accounts for all atoms. Existing CUBI153 worldline and CUBI154 geometry sources remain unchanged. No Lean additions. Runtime Chrome execution not verified.
