# CUBI 094 — Memory-flow conservation gate

Every mutation of the browser-local checkpoint must pass conservation094(before,after) before storage commit.

1. All existing memory records (L0 original, L1 medium shadow, L2 strong shadow) remain at the same ordinal with identical serialized contents. No deletions or rewrites.
2. New shadow records may be appended only with an existing parent in the immediately preceding layer; original ID and compartment are retained.
3. No two shadow records in the same layer may reference the same parent ordinal. No silent LH-to-CH-to-RH copying.
4. Report original and shadow counts by compartment. The page exposes an Audit conservation button.

Invariant: for an agent consolidation cycle, original memory count and content before = after; only derived references and event observations may append. A separate Remember operation may append an original. Failed conservation prevents activating the candidate checkpoint.

This is local application integrity, not a trusted external write authority. The existing SHA-256 checkpoint persists the unified candidate. Historic corrupted data is not repaired. Live GitHub Pages execution remains unverified.
