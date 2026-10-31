// CUBI 159 — geometry-to-chemistry falsification boundary, H through Og.
(()=>{"use strict";const root=document.getElementById("map159");if(!root)return;
root.innerHTML='<h2>CUBI 159 · 24-POSITION / 118-ELECTRON TEST</h2><p>24 toroidal positions are geometric addresses, not automatically distinct electron spin-orbitals.</p><button id="test159">Test geometry against 118-element occupancy</button><pre id="out159">Awaiting test.</pre>';
function test(){const sectors=[];for(const side of ["front","back"])for(const vertical of ["upper","lower"])for(const horizontal of ["left","right"])for(let local=1;local<=3;local++)sectors.push({side,vertical,horizontal,local});
const ids=new Set(sectors.map(x=>[x.side,x.vertical,x.horizontal,x.local].join(":")));
const results=[];for(let z=1;z<=118;z++){results.push({Z:z,requiredElectronStates:z,addresses:sectors.length,oneToOnePossible:z<=24,shortfall:Math.max(0,z-24)})}
return {geometryAddresses:sectors.length,uniqueAddresses:ids.size,permutations:"620448401733239439360000",capacityIfEachAddressOneQuantumState:24,firstFailure:25,oganessonShortfall:94,oneToOnePassCount:results.filter(r=>r.oneToOnePossible).length,modelVerdict:"ONE_TO_ONE_MAPPING_FALSIFIED_FOR_Z_25_TO_118",scientificCaveat:"This rules out only one-state-per-address. A richer mapping with internal quantum degrees of freedom is not tested.",sample:[results[0],results[23],results[24],results[117]]}}
document.getElementById("test159").onclick=()=>document.getElementById("out159").textContent=JSON.stringify(test(),null,2);window.CUBI159=Object.freeze({test});
})();