# CUBI 152 — Time-Dilation Research Under 17 Analytical Layers

Canonical substrate: `{{aether}}`; geometry `{ [6x4(5x3)] }`.

Mission: research time dilation and related general-relativistic mechanisms **within sixteen analytical software layers**. Seventeenth layer is a provenance and falsifiability boundary, **not** evidence of a physical seventeenth dimension/layer. The research crawler uses public Crossref metadata rather than pretending to read or understand entire papers.

The research scheduler is `.github/workflows/cubi-time-dilation-research.yml` (daily 13:23 UTC plus manual workflow_dispatch), calling `scripts/time_dilation_research.py`. It searches sixteen topic-specific scholarly queries (relativity, clocks, gravitation, tetrads, gravitational reconnection and predictions), deduplicates by DOI, and appends observation records to `research/time-dilation/observations.jsonl`. Records preserve layer index, DOI, title, venue, source URL, timestamp and three separately labeled classification channels (LH observe; CH audit; RH provide). A shared source is **not** three independent sources. None of these channels authorizes action or offers a quorum.

The Columbia Comisso–Asenjo 2026 paper is documented at `evidence/time-dilation/2026-10-31-columbia-gravitational-reconnection.md`; scientific paper https://doi.org/10.1103/lmqy-pf9k. It is a theoretical gravitational reconnection result, not empirical evidence for discrete spacetime layers or a replacement of Einstein's general relativity.

No Lean additions; `proofs/CUBI150.lean` remains the one prior formal model.

Validation limitations:
- Daily GitHub Actions execution depends on repository Actions being enabled, the scheduled workflow being accepted and branch write permissions.
- Workflow may fail if Crossref is unavailable or the default branch requires pull requests.
- The absence of matching metadata is not negative evidence.
- Recorded research candidates need subsequent full-text/manual assessment and experimental evidence.
- At creation, no successful scheduled or manual workflow run has been observed.
