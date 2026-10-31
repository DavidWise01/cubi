# JANE MASTER ↔ CUBI90 memory bridge

## Compatibility

JANE MASTER Journeyman v44 exports gameplay observations as **CUBI90** checkpoint JSON for the original `cubi` browser application. The existing CUBI import command validates the SHA-256 digest and `version:90` shape. After importing, use **One cycle** to propagate new originals from L0 through L1 and L2; no original text is changed.

**Mapping:** `LH/ff` = observed screen phase, `CH/cf` = action/feedback and A0 cubit decision, `RH/rf` = observed progression changes. Each original contains a serialized `JaneGameplayObservation` with source/time/sequence and measured data. This is a software `cubit` memory interface, not a hardware qubit.

## Procedure

1. Run JANE MASTER v44 in your browser and load a NES ROM. JANE collects a bounded browser-local observation queue.
2. Click **EXPORT → CUBI90** on Jane's bottom-right bridge. This downloads `JANE-to-CUBI90-checkpoint.json` with a SHA-256 hash.
3. Open the [CUBI memory app](https://davidwise01.github.io/cubi/) and **Export JSON** first to back up the currently existing local checkpoint.
4. Under **Import a verified export**, select Jane's checkpoint and explicitly confirm replacement.
5. Click **One cycle** to promote exact original references L0 → L1 → L2. Inspect the nine sphere registers and run **Verify checkpoint**.

## Boundaries

- **Import replaces CUBI's currently stored browser checkpoint**; it does not merge memories. Back up first.
- A downloaded `file://` Jane app and GitHub Pages `https://` CUBI app do not share localStorage. This bridge uses a portable checkpoint, **not** direct cross-origin writes, automatic cloud sync, a GitHub commit, or remote attestation.
- The browser-local journal is bounded to 250 recent observations, so regular exports are important.
- Jane screen-state confidence and visual change do not prove gameplay victory. Progress markers must be interpreted according to their actual evidence.
- Original CUBI provenance, address and inheritance semantics are preserved. No synthetic witnesses or quorum are introduced.

## Artifact

Standalone build: `JANE_MASTER_v44_CUBI_Integrated.html` (generated in the ChatGPT artifact workspace). Publish it separately as a GitHub Pages file if desired; this repository note does not pretend the local artifact is already hosted.
