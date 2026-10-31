// CUBI 143: independent, read-only recomputation of CUBI142 reports.
(()=>{"use strict";const host=document.getElementById("aether143");if(!host)return;
host.innerHTML='<h2>CUBI 143 · INDEPENDENT DIFFERENCE AUDIT</h2><p>{{aether}} · recompute from original hemisphere generations · no quorum</p><button id="audit143">Recalculate every reported difference</button><pre id="out143">No reports audited.</pre>';
const out=document.getElementById("out143"),HEMIS=["lh","ch","rh"];
async function read(database,store){return new Promise((ok,bad)=>{const request=indexedDB.open(database);request.onerror=()=>bad(request.error);request.onsuccess=()=>{const db=request.result;if(!db.objectStoreNames.contains(store)){db.close();bad(Error("Missing "+database+"/"+store));return}const tx=db.transaction(store,"readonly"),q=tx.objectStore(store).getAll();q.onsuccess=()=>ok(q.result);q.onerror=()=>bad(q.error);tx.oncomplete=()=>db.close()}})}
function verify(source,reports){const errors=[],results=[],keys=new Set();
for(const report of reports){const id=report.id;if(keys.has(id))errors.push(id+":DUPLICATE");keys.add(id);
const g=report.generation,h=report.hemisphere;if(!Number.isInteger(g)||g<1||!HEMIS.includes(h)){errors.push(id+":INVALID_IDENTITY");continue}
const now=source.filter(r=>r.generation===g&&r.hemisphere===h).sort((a,b)=>a.slot-b.slot);
const prev=source.filter(r=>r.generation===g-1&&r.hemisphere===h).sort((a,b)=>a.slot-b.slot);
if(now.length!==6||(g>1&&prev.length!==6)){errors.push(id+":INCOMPLETE_SOURCE");continue}
const expected=now.map((r,i)=>({slot:i+1,parentChanged:g===1?null:r.parent!==(i===0?prev[5].id:now[i-1].id),operationChanged:g===1?null:r.operation!==prev[i].operation,polarityChanged:g===1?null:r.polarity!==prev[i].polarity}));
const novelty=g===1?"BASELINE":expected.some(x=>x.parentChanged||x.operationChanged||x.polarityChanged)?"CHANGED":"STABLE";
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const claims=equal(report.source,now.map(x=>x.id))&&equal(report.predecessor,prev.map(x=>x.id))&&equal(report.differences,expected)&&report.novelty===novelty&&report.door==="CLOSED"&&report.substrate==="{{aether}}"&&id==="G"+g+":"+h;
if(!claims)errors.push(id+":CLAIM_MISMATCH");
results.push({id,status:claims?"MATCH":"HOLD",computedNovelty:novelty})}
return {status:errors.length?"HOLD":reports.length?"PASS":"UNVERIFIED",reports:reports.length,errors,results};}
document.getElementById("audit143").onclick=async()=>{try{const [source,reports]=await Promise.all([read("cubi.aether141.v1","pool"),read("cubi.aether142.differences.v1","reports")]);out.textContent=JSON.stringify(verify(source,reports),null,2)}catch(e){out.textContent=JSON.stringify({status:"UNVERIFIED",reason:e.message},null,2)}};
window.CUBI143=Object.freeze({verify});})();