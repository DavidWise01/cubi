// CUBI 135 — isolated falsification laboratory; production events are read only.
(()=>{"use strict";
const host=document.getElementById("aether135");if(!host)return;
host.innerHTML='<h2>CUBI 135 · INTERRUPTION & CONCURRENCY FALSIFICATION</h2><p>{{aether}} · isolated test database · production ledger unchanged</p><button id="run135">Run boundary tests</button><pre id="out135">Not tested.</pre>';
const output=document.getElementById("out135");
const name="cubi.aether135.fixtures.v1";
function open(){return new Promise((yes,no)=>{const r=indexedDB.open(name,1);r.onupgradeneeded=()=>r.result.createObjectStore("events",{keyPath:"seq"});r.onsuccess=()=>yes(r.result);r.onerror=()=>no(r.error)})}
async function tx(fn){const d=await open();return new Promise((yes,no)=>{const t=d.transaction("events","readwrite"),store=t.objectStore("events");let result;t.oncomplete=()=>{d.close();yes(result)};t.onabort=()=>{d.close();no(t.error||Error("transaction aborted"))};fn(store,t,v=>result=v)})}
async function read(){const d=await open();return new Promise((yes,no)=>{const t=d.transaction("events","readonly"),q=t.objectStore("events").getAll();q.onsuccess=()=>yes(q.result);q.onerror=()=>no(q.error);t.oncomplete=()=>d.close()})}
function attempt(kind){return tx((s,t,set)=>{const q=s.getAll();q.onsuccess=()=>{const a=q.result,tip=a[a.length-1];if(!tip||tip.kind!=="PROPOSAL"){t.abort();return}const e={seq:a.length+1,id:"F135-"+(a.length+1),prev:tip.id,parent:tip.id,kind,box:tip.box,tool:tip.tool};s.add(e);set(e)}})}
async function run(){
 // Clear ONLY isolated fixture store, not production.
 await tx((s,t,set)=>{s.clear();set(true)});
 await tx((s,t,set)=>{s.add({seq:1,id:"F135-1",prev:null,parent:null,kind:"OBSERVATION"});s.add({seq:2,id:"F135-2",prev:"F135-1",parent:"F135-1",kind:"PROPOSAL",box:"B1",tool:"T1"});set(true)});
 const before=await read();
 // Aborted transaction must not leave a partial closure.
 try{await tx((s,t,set)=>{s.add({seq:3,id:"TEMP",kind:"CLOSED"});t.abort()})}catch(_){}
 const afterAbort=await read();
 const results=await Promise.allSettled([attempt("CLOSED"),attempt("HELD")]);
 const afterRace=await read();const terminal=afterRace.filter(e=>e.kind==="CLOSED"||e.kind==="HELD");
 return {interruptionAtomic:before.length===2&&afterAbort.length===2,competingWritesSingleWinner:results.filter(r=>r.status==="fulfilled").length===1&&terminal.length===1,states:results.map(r=>r.status),records:afterRace.length,terminal:terminal[0]?.kind||null,testDatabase:name,productionUnchanged:true};
}
document.getElementById("run135").onclick=async()=>{try{const result=await run();output.textContent=JSON.stringify({verdict:result.interruptionAtomic&&result.competingWritesSingleWinner?"PASS":"HOLD",...result},null,2)}catch(e){output.textContent=JSON.stringify({verdict:"HOLD",error:e.message},null,2)}};
})();