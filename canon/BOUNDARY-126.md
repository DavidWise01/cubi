# CUBI 126 — {{aether}} Substrate

Canonical identity: **`{{aether}}`**.

The CUBI primitive substrate is named `{{aether}}`, retaining geometry `{ [6x4(5x3)] }`: 24 BOX data addresses, 15 TOROID tool addresses and one enclosing BRACE. These domains remain distinct. A TOOL embedded in a BOX description is never implicitly executed.

The rectangular Canvas2D panel displays the named substrate. Each user-requested **Bind sample explicitly** action now appends a browser-local persistent entry to `cubi.aether126.events.v1`, with monotonic sequence number, predecessor number, stable BOX and TOOL identities, substrate identifier and CLOSED door. On reload the history is checked for structural continuity. Any malformed history places subsequent app writes on HOLD; originals are not rewritten through the interface.

This is a symbolic software substrate, not the historical hypothesized physical luminiferous aether nor an established physical field. Browser localStorage is externally mutable and can be deleted; it is not cryptographically immutable or a transactional multiwriter store. Binding remains an explicit user action, not autonomous tool execution. No checkpoints, votes, quorums or forced agreement. Live browser execution has not been independently verified.
