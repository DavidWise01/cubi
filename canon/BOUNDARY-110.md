# CUBI 110 — Independently hash-linked RGB witnesses

Canonical lanes: LH/L/blue, CH/C/green, RH/R/red, all ff→rr→main silo. No quorum or forced agreement.

Every new observation is placed in its original global silo sequence and its corresponding independent local witness stream. For CUBI110 observations, the entry includes a SHA-256 digest of its serialized fields and the previous *same-registry* CUBI110 hash, starting from GENESIS for each color. The silo rechecks all three CUBI110 chains before accepting a new batch, while continuing to audit CUBI109 local sequence continuity and monotonic source ticks.

Legacy entries predating CUBI110 are retained, visible and unauthenticated by the new digest chains rather than rewritten. The SHA-256 check detects inadvertent content corruption relative to stored links, but is not a keyed signature or independently anchored provenance: a party able to edit browser storage can recompute hashes and history. Browser localStorage also does not provide a cross-tab atomic compare-and-swap; concurrent writers require a stronger storage layer.

The silo preserves per-source residual differences. Asynchronous arrival is conceptually supported by distinct local source sequences, but atomic distributed delivery and deliberate reorder tests are not yet implemented. The node field is a computational model, not biological or physical evidence. Live GitHub Pages behavior is not verified.
