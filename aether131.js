// CUBI 131 — read-only causal witness integrity for {{aether}}.
(()=>{"use strict";
const host=document.getElementById("aether131");if(!host)return;
host.innerHTML='<h2>CUBI 131 · CAUSAL WITNESS INTEGRITY</h2><p>{{aether}} · { [6×4(5×3)] } · observe only</p><button id="audit131">Audit closed causal records</button> <button id="test131">Run falsification fixtures</button><pre id="out131">No records examined.</pre>';
const out=document.getElementById("out131");
function verify(proposals,closures){
 const issues=[],byId=new Map(),seen=new Set();
 for(const p of proposals){if(!p||!p.id||byId.has(p.id)){issues.push("DUPLICATE_OR_MISSING_PROPOSAL");continue}byId.set(p.id,p)}
 for(const c of closures){
  if(!c||!c.proposal||seen.has(c.proposal)){issues.push("DUPLICATE_CLOSURE");continue}
  seen.add(c.proposal);const p=byId.get(c.proposal);
  if(!p){issues.push("ORPHAN_CLOSURE");continue}
  if(p.state!=="BOUND"||c.door!=="CLOSED")issues.push("UNRESOLVED_CLOSURE");
  if(p.substrate!=="{{aether}}"||c.substrate!=="{{aether}}"||p.box!==c.source||p.tool!==c.tool||p.observation!==c.observation)issues.push("PROVENANCE_MISMATCH");
 }
 for(const p of proposals){if(p?.state==="BOUND"&&!seen.has(p.id))issues.push("BOUND_WITHOUT_CLOSURE");if(p?.state==="HELD"&&seen.has(p.id))issues.push("HELD_WITH_CLOSURE")}
 return {status:issues.length?"HOLD":"PASS",proposalCount:proposals.length,closureCount:closures.length,issues};
}
function read(){return new Promise((resolve,reject)=>{const r=indexedDB.open("cubi.aether129.v1");r.onerror=()=>reject(r.error);r.onsuccess=()=>{const d=r.result;if(!d.objectStoreNames.contains("proposals")||!d.objectStoreNames.contains("closures")){d.close();reject(Error("No CUBI129 stores"));return}const t=d.transaction(["proposals","closures"],"readonly");let ps,cs;t.objectStore("proposals").getAll().onsuccess=e=>{ps=e.target.result};t.objectStore("closures").getAll().onsuccess=e=>{cs=e.target.result};t.oncomplete=()=>{d.close();resolve({proposals:ps||[],closures:cs||[]})};t.onerror=()=>{d.close();reject(t.error)}}})}
function display(v){out.textContent=JSON.stringify(v,null,2)}
document.getElementById("audit131").onclick=async()=>{try{const v=await read();display(verify(v.proposals,v.closures))}catch(e){display({status:"HOLD",error:e.message})}};
document.getElementById("test131").onclick=()=>{const p={id:"P",state:"BOUND",substrate:"{{aether}}",observation:"O",box:"B1",tool:"T1"};const c={proposal:"P",substrate:"{{aether}}",observation:"O",source:"B1",tool:"T1",door:"CLOSED"};const fixtures={valid:verify([p],[c]),orphan:verify([],[c]),mismatch:verify([p],[{...c,tool:"T2"}]),duplicate:verify([p],[c,c]),missing:verify([p],[])};display({fixtures,expected:"valid PASS; all other fixtures HOLD"})};
window.CUBI131=Object.freeze({verify});
})();