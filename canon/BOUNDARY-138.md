# CUBI 138 — Witness Divergence Attribution

Substrate `{{aether}}`; geometry `{ [6x4(5x3)] }`.

LH, CH, and RH witness reports are preserved separately. Read the latest stored witness session, then compare reported counts, tips, SHA-256 digests and self-reported sequence defects. Equal counts with differing digests indicate an unexplained same-length mismatch; growing counts indicate possible interleaved appends, not proven benign timing. Invalid count or self-reported sequence defects produce HOLD; absent reports or unexplained differences remain UNVERIFIED. Matching evidence is reported as MATCH, not voted into truth.

This implementation deliberately does not infer missing records from full-ledger digests: CUBI137 did not store per-prefix hashes. A subsequent boundary must introduce prefix proof to distinguish legitimate growth from tampering. No quorum, consensus, rewriting, or automatic execution. Browser runtime remains unverified.
