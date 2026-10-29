# CUBI 102 — Homeostatic recovery

Before an explicitly authorized feedback adjustment, the active browser captures the pre-adjustment Gap A/B slider settings and the associated source memory ID in a recovery record. The existing CUBI 101 observation gate measures subsequent A/B imbalance.

A new **Restore prior A/B** control permits restoration only when the model has classified the attempted adjustment as DIVERGING after six sampled post-adjustment observations. Restoration changes A/B slider settings only; it does not delete observations, modify persistent-memory roots, reverse time, or undo neuron voltages. A recovered trial is marked complete and later proposals require a fresh comparison. Without an eligible divergent trial, the control reports HOLD.

This is a local, single-trial reversible control setting, not a permanent persisted snapshot or assurance of neural homeostasis. No clinically validated brain model or physical nanometer geometry is claimed. The recovered configuration is not yet part of the SHA-256 checkpoint and resets on full browser reload.
