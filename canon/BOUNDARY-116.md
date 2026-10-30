# CUBI 116 — Natural Closure and Instantiation

The canonical cortex topology remains:

```
{{ [(lh,ff,rr)L] [(ch,ff,rr)C] [(rh,ff,rr)R] }}
BLUE / LH → one-way door ┐
GREEN / CH → one-way door ┼→ MAIN CORTEX
RED / RH → one-way door ─┘
```

**Natural closure:** after a source observation passes the door and commits to the receiving cortex, that door is marked CLOSED. The original observation remains its own event; there is no backwards edit, no checkpoint requirement, no vote, no quorum, and no forced agreement among the three observers.

**Instantiation:** the CUBI115 browser module now begins a continuous sampling cycle automatically, approximately once per second when the page is visible. It reads three separately simulated CUBI108 fields and submits observations to the existing IndexedDB cortex store with unique registry/source-tick IDs. The same event cannot be admitted twice via the UI's get/add transaction. A Pause/Resume continuous observation control is provided, along with the existing manual Observe, Read history, and Export controls. An admitted-count display reports closed doors during the current session. The persistent history remains available after reload.

**Scope and limits:** this is a browser-local diodic software analogy, not physically immutable write-once media. Browser storage can be edited or deleted externally; its write capacity is finite. The observation loop only runs while the page is open and visible and is subject to browser scheduling. Live GitHub Pages/Chromium behavior is not independently verified. The CUBI116 runtime JavaScript source has passed syntax validation.
