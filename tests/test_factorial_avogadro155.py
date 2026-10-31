#!/usr/bin/env python3
"""CUBI 155: reproducible factorial-vs-Avogadro numerical null test."""
import math
import json
AVOGADRO = 6.02214076e23  # numerical value in mol^-1 (SI exact)
TARGET = math.log10(AVOGADRO)
rows = []
for n in range(1,101):
    delta = math.lgamma(n+1)/math.log(10)-TARGET
    rows.append({"n":n,"log10_ratio":delta,"absolute_log10_distance":abs(delta)})
best = min(rows,key=lambda r:r["absolute_log10_distance"])
factorial_24 = math.factorial(24)
ratio = factorial_24/AVOGADRO
report = {
    "hypothesis":"24! predicts Avogadro number",
    "null":"compare log-scale distances for factorial indices 1..100",
    "closest_factorial":best["n"],
    "factorial_24":factorial_24,
    "avogadro_numerical_value_per_mol":AVOGADRO,
    "ratio":ratio,
    "percent_difference":(ratio-1)*100,
    "in_range_20_to_27":[r for r in rows if 20<=r["n"]<=27],
    "conclusion":"NUMERICAL_MATCH_ONLY; physical prediction not established",
    "caveat":"24! is dimensionless; Avogadro constant has units mol^-1. The reference value depends on the chosen unit."
}
assert best["n"]==24
assert abs(report["percent_difference"]-3.02788102436)<1e-7
print(json.dumps(report,indent=2))
