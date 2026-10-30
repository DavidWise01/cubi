# CUBI 127 — Agentic {{aether}} Proposal Boundary

Canonical substrate: `{{aether}}`, with rectangular scope `{ [6x4(5x3)] }` and preserved primitive identities `[]^4`, `()^3`, `{n}^{n}`.

## Next natural invariant: observation is not authority

The main cortex's already-closed observation may inform an AETHER proposal for one of 24 BOX addresses and one of 15 TOROID tool addresses. The proposal has its own identity, carries a reference to the sampled observation, and is **not** itself an executed binding. Only an explicit button activation binds the proposal. The resulting browser-local event records proposal ID, observation reference, source, tool, predecessor and a CLOSED diodic door.

```
CORTEX (read only) -> AETHER PROPOSAL (no execution)
                             |
                    explicit human bind
                             v
                    NEW BOX RECORD -> CLOSED
```

There is no quorum, vote, implicit tool activation, backward mutation or automatic proposal execution. The cortex sampler reads the existing browser IndexedDB `cubi.cortex115.v1` store `cortex`; if absent or empty, it holds rather than fabricating an observation. The proposed address selection is a deterministic illustrative mapping, not a learned policy. The existing manual binding control still supports direct symbolic samples.

Current constraints: proposals exist only within the current page session and are not independently archived until a bind occurs; a browser-local localStorage event stream is neither cryptographically immutable nor transactional between tabs; the cortex records are sampled by database iteration rather than causally proven to be the latest event. No live Chromium test has been performed.
