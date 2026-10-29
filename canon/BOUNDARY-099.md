# CUBI 099 — Observation-to-memory binding

Gap C's WHY history now has an explicit **Bind latest to memory** action. The latest sampled neural observation is serialized whole, including its tick, nine spike counts, A/B values, delta, descriptive interpretation, and explicit unknown. The original payload is appended as a CH.L0 memory record via the existing CUBI90 transaction and conservation gate, using center cf. Its JSON includes the source node CH.id as the representative center neuron lattice.

The existing agent consolidation can then derive CH.L1 and CH.L2 references without modifying the root observation. No automatic push is performed: the operator deliberately chooses to bind an observation. The bounded Gap C history still exists separately, and the memory record is an immutable snapshot once committed.

This model's WHY string is a computed description, not proof of biological mechanism. The 0.2 nm marker and `{{inf!xinf!}}^{{inf!}}` are symbolic; no physical nanometer-resolution neuron simulator is claimed.

The live GitHub Pages deployment and browser functionality have not been independently verified.
