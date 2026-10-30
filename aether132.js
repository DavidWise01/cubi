// CUBI 132 — temporal causal ordering (read-only, three-valued verdict).
(()=>{"use strict";
const host=document.getElementById("aether132");if(!host)return;
host.innerHTML='<h2>CUBI 132 · TEMPORAL CAUSAL BOUNDARY</h2><p>{{aether}} · observe → propose → close · timestamps are supporting evidence, not proof</p><button id="audit132">Audit temporal ancestry</button> <button id="fixtures132">Test temporal counterexamples</button><pre id="result132">Unobserved. No state changed.</pre>';
const output=document.getElementById("result132");
function verdict(proposals,closures,cortex){
 const problems=[],unknown=[],observations=new Map(cortex.map(x=>[String(x.id),x]));
 const proposalsById=new Map(proposals.map(x=>[x.id,x]));
 for(const c of closures){
  const p=proposalsById.get(c.proposal);
  if(!p){problems.push({proposal:c.proposal,reason:"ORPHAN_CLOSURE"});continue}
  const o=observations.get(String(p.observation));
  if(!o){unknown.push({proposal:p.id,reason:"ORIGINAL_OBSERVATION_NOT_FOUND"});continue}
  if(o.door!=="CLOSED"){problems.push({proposal:p.id,reason:"OBSERVATION_NOT_CLOSED"});continue}
  const t0=Number(o.passedAt),t1=Date.parse(p.created),t2=Date.parse(c.time);
  if(!Number.isFinite(t0)||!Number.isFinite(t1)||!Number.isFinite(t2)){unknown.push({proposal:p.id,reason:"MISSING_CAUSAL_TIME"});continue}
  if(t0>t1||t1>t2){problems.push({proposal:p.id,reason:"TEMPORAL_INVERSION",times:[t0,t1,t2]});continue}
  unknown.push({proposal:p.id,reason:"CLOCK_ORDER_CONSISTENT_BUT_NO_CROSS_STORE_EVENT_SEQUENCE"});
 }
 return {status:problems.length?"HOLD":unknown.length?"UNVERIFIED":"PASS",checked:closures.length,violations:problems,unverified:unknown,note:"Independent database timestamps cannot establish a strict causal happens-before relation"};
}
function fetchDB(name,stores){return new Promise((resolve,reject)=>{const r=indexedDB.open(name);r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result;if(stores.some(s=>!db.objectStoreNames.contains(s))){db.close();reject(Error("missing store in "+name));return}const tx=db.transaction(stores,"readonly"),result={};for(const store of stores){const request=tx.objectStore(store).getAll();request.onsuccess=()=>{result[store]=request.result}}tx.oncomplete=()=>{db.close();resolve(result)};tx.onerror=()=>{db.close();reject(tx.error)}}})}
function show(v){output.textContent=JSON.stringify(v,null,2)}
document.getElementById("audit132").onclick=async()=>{try{const [a,b]=await Promise.all([fetchDB("cubi.aether129.v1",["proposals","closures"]),fetchDB("cubi.cortex115.v1",["cortex"])]);show(verdict(a.proposals,a.closures,b.cortex))}catch(e){show({status:"UNVERIFIED",reason:String(e.message)})}};
document.getElementById("fixtures132").onclick=()=>{
 const observation={id:"O",door:"CLOSED",passedAt:1000},proposal={id:"P",observation:"O",created:"1970-01-01T00:00:02.000Z"},closure={proposal:"P",time:"1970-01-01T00:00:03.000Z"};
 const checks={ordered:verdict([proposal],[closure],[observation]),inverted:verdict([proposal],[{...closure,time:"1970-01-01T00:00:01.500Z"}],[observation]),unknown:verdict([proposal],[closure],[])};
 show({checks,expected:"ordered UNVERIFIED; inverted HOLD; missing observation UNVERIFIED"});
};
window.CUBI132=Object.freeze({verdict});
})();