# CUBI 131 — Causal Witness Integrity

Canonical substrate `{{aether}}`, geometry `{ [6x4(5x3)] }`.

Scientific software invariant: every CLOSED binding must refer to exactly one originating BOUND proposal, preserving BOX, TOROID, observation, and substrate identity. A BOUND proposal must have a corresponding CLOSED binding; HELD proposals must not have a closure. Invalid pairings are recorded as HOLD by a read-only audit, never repaired in place.

`aether131.js` audits the CUBI129 IndexedDB stores and provides five synthetic fixtures: valid, orphan, mismatched, duplicate, and missing closure. Expected outcome is PASS only for valid and HOLD for the other four. This is a falsifiable software integrity requirement, not a claim of a physically established law.

CUBI130 remains uncommitted; CUBI131 audits the existing CUBI129 schema. No tool executes automatically. No quorum, voting, consensus, or retroactive mutation. Browser execution remains to be independently verified.
