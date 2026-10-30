# CUBI 124 — Primitive Type Isolation

Canonical primitive grammar:

```
BOX      []^4       DATA
TOROID   ()^3       TOOLS / OPERATIONS
BRACE    {n}^{n}    CONTAINMENT / SCOPE
```

Primitives have distinct types. Nesting **does not** implicitly cast one type into another, nor authorize execution. Reading from right to left does not change primitive identity. An isolated tool may act on data only through an explicit scoped binding. Its result is a newly admitted record through a one-way diodic door; the input stays preserved.

```
{ [ DATA ]^4  ( TOOL )^3 }^{n}^{n}   // symbolic composition
{ [ (TOOL)^3 ]^4 }                  // tool represented inside data, NOT invoked
```

The fourth power, third power and n^n are **primitive cardinality/recursion notation**; this release does not assume numeric physical measurements, fixed-dimensional Euclidean geometry, or automatically materialize an unbounded n^n space.

Invariant:
- `BOX` stores or describes information.
- `TOROID` denotes an operation.
- `BRACE` defines containment and scope.
- A change in outer label does not automatically change the inner primitive type.
- `containment != execution`, `permutation != transformation`, `observation != authority`.
- Three independent RGB observers report into the main cortex with no quorum, voting, checkpoints or backward mutation.

This canon is a symbolic design specification, not a new claim about physical particles, neuroscience or independently validated mathematics.
