# CUBI 106 — Three registries and main residual silo

The proposed structure has three registry fields, each with nine symbolic register addresses. Together they form 27 logical addresses, arranged as three 3×3 grids on scalar zero. Each has its own named diodic routing stream (R1, R2, R3), and all streams converge on one central MAIN SILO.

The main silo does not vote, form a quorum, declare consensus or replace its source. Each recorded residual carries registry identity, source name, source model tick, one-way sequence number, parent sequence reference and the existing C1/C2/C3 ten-phase pattern. History is stored in a browser-local append-only-by-application journal, exportable as JSON. A journal-structure mismatch holds writes.

**Important implementation limitation:** the current active neuron engine has nine simulated tensor nodes, not 27 separately simulated tensors. To visualize and exercise the 3-to-1 convergence, the first release derives three distinguishable labeled *projections* (delta, negative delta, half delta) of the *single* Gap C measurement. They are **not independently measured residuals** and must not be interpreted as independent registry evidence. The next engineering gate is to instantiate two further separately simulated neuron fields and bind each registry to its own measurements, then test cross-stream integrity and asynchronous arrival order.

Preserve literal symbolic ceiling `{{n}}^{{n}}x1.61658^10` and distance notation `[1.161658x10^-[4/8/10]-(3/6/9)-{12 , 24 , 36}`. No length unit is inferred; these are theoretical addresses. Browser storage can be changed externally, so this is not an independently authenticated or physically realized diodic system.
