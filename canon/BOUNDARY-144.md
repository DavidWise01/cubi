# CUBI 144 — Source Integrity and Linked Generation Digests

`{{aether}}` retains `{ [6x4(5x3)] }`.

Each complete source generation has 18 records, six in each isolated LH/CH/RH hemisphere. CUBI144 canonicalizes the source fields and computes a SHA-256 digest. It creates a separate sequence of anchors, each referring to the previous digest and incorporating the previous chain hash. Anchors are added using IndexedDB `add`, not rewritten by the interface. Its read-only audit independently recalculates all source digests and chain links; changed originals or altered anchor fields yield HOLD, missing anchors yield UNVERIFIED, matching anchored data yields PASS.

These are local integrity witnesses, not proof of who created source records, external authenticity, immutability against privileged tampering, or a physical scientific law. Earlier CUBI141/142/143 data remain unchanged. No consensus, quorum or implicit action. Live Chromium execution remains unverified.
