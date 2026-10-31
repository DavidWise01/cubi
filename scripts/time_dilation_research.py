#!/usr/bin/env python3
"""CUBI research: 16 analytical layers + layer-17 boundary.
Uses Crossref public scholarly metadata; no LLM, no physical claims.
Append-only JSONL, deduplicated by DOI. Stdlib only.
"""
import datetime as dt
import hashlib
import json
import os
import pathlib
import time
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "research" / "time-dilation" / "observations.jsonl"
OUT.parent.mkdir(parents=True, exist_ok=True)

LAYERS = [
    ("01", "special relativity Lorentz time dilation"),
    ("02", "gravitational redshift optical clocks"),
    ("03", "proper time interferometry"),
    ("04", "atomic optical lattice clocks"),
    ("05", "relativistic geodesics"),
    ("06", "Schwarzschild spacetime time dilation"),
    ("07", "Kerr spacetime frame dragging clocks"),
    ("08", "gravitational wave timing"),
    ("09", "gravitational field reconnection"),
    ("10", "tetrad formulation general relativity"),
    ("11", "gravitational helicity evolution"),
    ("12", "strong field compact binary merger"),
    ("13", "equivalence principle tests"),
    ("14", "causal structure spacetime topology"),
    ("15", "Planck scale proper time hypotheses"),
    ("16", "time dilation falsifiable experimental predictions"),
]
assert len(LAYERS) == 16
NOW = dt.datetime.now(dt.timezone.utc).isoformat()
seen = set()
if OUT.exists():
    for line in OUT.read_text(encoding="utf-8").splitlines():
        try:
            obj = json.loads(line)
            if obj.get("doi"):
                seen.add(obj["doi"].lower())
        except json.JSONDecodeError:
            raise SystemExit("HOLD: malformed historical observation JSONL")

def fetch(query):
    params = urllib.parse.urlencode({
        "query.bibliographic": query,
        "rows": 3,
        "filter": "from-pub-date:2025-01-01",
        "select": "DOI,title,URL,published,container-title,type",
    })
    url = "https://api.crossref.org/works?" + params
    request = urllib.request.Request(url, headers={
        "User-Agent": "CUBI-TimeDilation-Research/1.0 (public scholarly metadata)",
        "Accept": "application/json",
    })
    with urllib.request.urlopen(request, timeout=25) as response:
        return json.load(response)["message"]["items"]

def record(layer, query, item):
    doi = str(item.get("DOI", "")).lower().strip()
    if not doi or doi in seen:
        return None
    title = item.get("title") or [""]
    name = title[0] if isinstance(title, list) else str(title)
    source = item.get("container-title") or [""]
    journal = source[0] if isinstance(source, list) else str(source)
    base = {
        "observed_utc": NOW,
        "layer": int(layer),
        "scale_type": "ANALYTICAL_NOT_PHYSICAL",
        "query": query,
        "doi": doi,
        "title": name,
        "venue": journal,
        "uri": item.get("URL", "https://doi.org/" + doi),
        "evidence_status": "METADATA_ONLY_NOT_PHYSICAL_VERIFICATION",
        "claim": "SCHOLARLY_DISCOVERY_CANDIDATE",
    }
    payload = json.dumps(base, sort_keys=True, ensure_ascii=False)
    digest = hashlib.sha256(payload.encode("utf-8")).hexdigest()
    # Each witness is an independently identified *classification channel*;
    # not a separate physical observer or independent data source.
    base["witnesses"] = [
        {"id": "LH", "channel": "OBSERVE", "finding": "METADATA_SEEN"},
        {"id": "CH", "channel": "AUDIT", "finding": "DOI_PRESENT"},
        {"id": "RH", "channel": "PROVIDE", "finding": "RESEARCH_CANDIDATE"},
    ]
    base["observation_sha256"] = digest
    return base

new = []
errors = []
for layer, query in LAYERS:
    try:
        for item in fetch(query):
            found = record(layer, query, item)
            if found:
                new.append(found)
                seen.add(found["doi"])
    except Exception as error:
        errors.append({"layer": int(layer), "error": type(error).__name__, "detail": str(error)[:160]})
    time.sleep(0.25)

# Layer 17 is a policy boundary: audit source attribution, never declare
# that 17 is a number of experimentally observed spacetime layers.
for entry in new:
    assert 1 <= entry["layer"] < 17
    assert entry["doi"] and entry["uri"]
if new:
    with OUT.open("a", encoding="utf-8") as handle:
        for entry in new:
            handle.write(json.dumps(entry, ensure_ascii=False, sort_keys=True) + "\n")
print(json.dumps({"boundary": 17, "new_entries": len(new), "errors": errors, "output": str(OUT.relative_to(ROOT))}))
if errors:
    raise SystemExit(1)
