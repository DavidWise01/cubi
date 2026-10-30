# CUBI 118 — Recursive Diodic Inheritance

Natural invariant: **A closed derived observation may parent another new observation. No ancestor is rewritten.**

A new **Inherit next generation** action examines the existing `inheritance117` record store and selects the latest generation, then writes a new `RECURSIVE_INHERITANCE` record with a reference to its parent, a monotonically increasing generation number, root parent references, and a CLOSED label. Original source observations remain in the separate `cortex` store and existing derived observations remain intact.

Canonical path: `observation → one-way closure → inheritance → recursive inheritance …`. One or more incoming observations can establish a root. No checkpoints, quorums, consensus, or rewriting of historical events. The recursion is user-triggered rather than unbounded automatic generation.

Constraints: the application enforces append-only behavior through this interface, not through physical immutable storage. IndexedDB can be externally modified or deleted. The simulated RGB observers do not establish biological or physical hypotheses. Browser execution is not independently verified.
