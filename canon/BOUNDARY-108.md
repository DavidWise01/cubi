# CUBI 108 — Independent RGB Neural Fields

Canonical brain mapping retained:
```
{{ [(lh,ff,rr)L] [(ch,ff,rr)C] [(rh,ff,rr)R] }}
L = blue | C = green | R = red
ff → node → rr → main silo
```

Instantiate **three separate 9-register active fields**, one per registry, each holding 9×125 independently updated numerical neuron states, totaling 3,375 modeled neurons. Each has its own floating-point state buffers, tick counter, excitatory/inhibitory model contribution measurement and spike count. They share the user-set Gap A/B control values but not dynamic state. Their initial phase offsets and local noise terms differ deterministically. They are independent computational field histories, not independent physical observations or biologically valid brains.

The main silo's CUBI 106/107 legacy source projections are replaced for future observations by direct reads from the three live CUBI108 simulation fields. Every new residual record carries registry L/C/R, color blue/green/red, source tick, residual, spikes, A/B contribution and the ff/rr lane names. Existing silo journal entries are retained verbatim; old projection entries are not relabeled or presented as independently measured. A missing source produces SILO HOLD, not invented readings.

The three new fields are running browser-local in-memory simulations; neuron voltages are not yet part of the persistent event ledger. The main silo does not average, vote, or overwrite any stream. The conceptual 0.2 nm and scalar-floor expressions remain symbolic. Pages behavior requires browser execution for end-to-end verification.
