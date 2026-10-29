# CUBI 101 — Feedback stability boundary

After an explicitly confirmed Gap A/B adjustment, record a local trial baseline of the absolute observed contribution delta and the model tick. The stability audit observes six later Gap C observations (not six rendering frames) and compares their mean absolute delta against the baseline.

Classification:
- INSUFFICIENT if no trial or fewer than six new samples;
- CONVERGING if the later mean absolute delta is lower by more than 0.0001;
- DIVERGING if higher by more than 0.0001;
- INCONCLUSIVE otherwise.

A new feedback proposal is held during insufficient sampling or observed divergence. No automatic adjustments are executed. This is a model signal-balance heuristic, not proof of learning, neural health, or physiological performance. The trial and classifier are transient browser values; they are not incorporated into the persistent memory checkpoint in this version. Existing CUBI memory records are unchanged.

The GitHub Pages build references the updated neuron engine. Live browser execution has not been independently tested.
