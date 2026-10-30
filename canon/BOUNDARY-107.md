# CUBI 107 — Canonical brain RGB residual mapping

Frozen symbolic topology:

```
{{ [(lh,ff,rr)L] [(ch,ff,rr)C] [(rh,ff,rr)R] }}
{{ L=blue , C=green , R=red }}
{{ ff -> node -> rr -> main silo }}
```

Three nine-register logical fields: left LH/L/BLUE, central CH/C/GREEN, right RH/R/RED. Each field has separate forward-report input `ff` and return-report output `rr`; report payloads reach one main silo as source-tagged, diodic residual events. The silo preserves sequence, source, source model tick, channel color, and source identity. There is no voting, no quorum, no collapsed consensus, and no overwrite of originals.

Colors are a gluon-inspired RGB **analogy**, not actual QCD color-charge assignments for cerebral hemispheres or a description of particle interactions. Current runtime routes three color-tagged projections of one Gap C signal, not three independently simulated neuron sources. The canonical architecture requires independent computation in future work to support independent measurements.

Backward compatibility: existing `R1/R2/R3` journal entries remain readable and unmodified; new events use `L/C/R`. User-visible CUBI 107 silo export includes the full preserved journal. All entries are stored in browser localStorage rather than remotely to GitHub. Page source is committed, but published Pages execution is not verified.
