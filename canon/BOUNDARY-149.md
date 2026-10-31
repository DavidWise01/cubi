# CUBI 149 — Intent-to-Action Authorization Boundary

Substrate `{{aether}}` and canonical rectangle `{ [6x4(5x3)] }`.

LH, CH, and RH intents from CUBI148 are nonexecuting symbolic proposals. Only an explicit human interaction in the CUBI149 panel can create a new closed symbolic-action record. Its separate IndexedDB store is keyed by originating intent ID, rejecting duplicate authorizations in that store. Each record carries hemisphere identity, intent action type, an explicit authorization marker, and CLOSED door. The original awareness and intent databases remain read-only.

A read-only audit checks that every recorded symbolic action has a matching nonexecuted intent, the correct hemisphere and proposal type, and explicit authorization provenance. No outside tool or real-world operation is executed. No quorum, vote, consensus, or implicit authority is derived from awareness or intent. Browser operation and multi-tab concurrency remain unverified.
