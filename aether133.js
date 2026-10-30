// CUBI 133: one transactional causal sequence; isolated {{aether}} prototype.
(()=>{"use strict";const host=document.getElementById("aether133");if(!host)return;
host.innerHTML='<h2>CUBI 134 · {{aether}} RELOAD CONTINUITY</h2><p>Observation → Proposal → Closure · single ordered ledger, no implicit execution</p><div class="controls"><button id="obs133">Import closed observation</button><button id="prop133">Append proposal</button><button id="close133">Explicit close</button><button id="hold133">Explicit hold</button><button id="audit133">Audit chain</button></div><pre id="state133">No causal sequence established.</pre>';
const show=x=>document.getElementById("state133").textContent=JSON.stringify(x,null,2);
const NAME="cubi.aether133.v1";let active=null;
function db(){return new Promise((ok,bad)=>{const r=indexedDB.open(NAME,1);r.onupgradeneeded=()=>r.result.createObjectStore("events",{keyPath:"seq"});r.onsuccess=()=>ok(r.result);r.onerror=()=>bad(r.error)})}
async function transaction(write,fn){const d=await db();return new Promise((ok,bad)=>{const tx=d.transaction("events",write?"readwrite":"readonly"),st=tx.objectStore("events");let output;tx.oncomplete=()=>{d.close();ok(output)};tx.onabort=()=>{d.close();bad(tx.error||Error("aborted"))};try{fn(st,x=>output=x,tx)}catch(e){tx.abort();bad(e)}})}
function append(kind,parent,payload={}){return transaction(true,(st,set,tx)=>{const r=st.openCursor(null,"prev");r.onsuccess=()=>{const tip=r.result?.value,seq=tip?tip.seq+1:1;if(parent!==null&&(!tip||tip.id!==parent)){tx.abort();return}const entry={seq,id:"C133-"+seq,prev:tip?.id||null,parent,kind,substrate:"{{aether}}",...payload};st.add(entry);set(entry)}})}
function cortex(){return new Promise((ok,bad)=>{const r=indexedDB.open("cubi.cortex115.v1");r.onsuccess=()=>{const d=r.result;if(!d.objectStoreNames.contains("cortex")){d.close();bad(Error("cortex unavailable"));return}const t=d.transaction("cortex","readonly"),q=t.objectStore("cortex").getAll();q.onsuccess=()=>{d.close();const a=q.result||[];a.length?ok(a[a.length-1]):bad(Error("no closed cortex observation"))};q.onerror=()=>{d.close();bad(q.error)}};r.onerror=()=>bad(r.error)})}
function reconstruct(rows){
 const errors=[],byId=new Map();let previous=null,open=null,seenDecision=new Set();
 for(let i=0;i<rows.length;i++){
  const e=rows[i];if(e.seq!==i+1||e.id!=="C133-"+(i+1)||e.prev!==previous||e.substrate!=="{{aether}}")errors.push("SEQUENCE_INVALID:"+e.id);
  if(e.kind==="OBSERVATION"){if(e.parent!==null||e.sourceDoor!=="CLOSED"||open)errors.push("OBSERVATION_INVALID:"+e.id);else open={observation:e}}
  else if(e.kind==="PROPOSAL"){if(!open||open.proposal||e.parent!==open.observation.id||e.origin!==open.observation.id)errors.push("PROPOSAL_INVALID:"+e.id);else open.proposal=e}
  else if(e.kind==="CLOSED"||e.kind==="HELD"){if(!open?.proposal||e.parent!==open.proposal.id||seenDecision.has(e.parent)||e.origin!==open.observation.id||e.box!==open.proposal.box||e.tool!==open.proposal.tool||((e.kind==="CLOSED")!==(e.door==="CLOSED")))errors.push("DECISION_INVALID:"+e.id);seenDecision.add(e.parent);open=null}
  else errors.push("UNKNOWN_KIND:"+e.id);
  if(byId.has(e.id))errors.push("DUPLICATE_ID:"+e.id);byId.set(e.id,e);previous=e.id;
 }
 return {status:errors.length?"HOLD":"PASS",errors,active:errors.length?null:open,events:rows.length,tail:rows.slice(-5)};
}
function recover(){return transaction(false,(st,set)=>{const q=st.getAll();q.onsuccess=()=>set(reconstruct(q.result))})}
async function guardedAppend(kind,expectedId,payload){
 return transaction(true,(st,set,tx)=>{const q=st.getAll();q.onsuccess=()=>{const history=reconstruct(q.result);if(history.status!=="PASS"){tx.abort();return}
 const open=history.active;let parent=null;
 if(kind==="OBSERVATION"){if(open){tx.abort();return}}
 else if(kind==="PROPOSAL"){if(!open?.observation||open.proposal||open.observation.id!==expectedId){tx.abort();return}parent=expectedId}
 else {if(!open?.proposal||open.proposal.id!==expectedId){tx.abort();return}parent=expectedId}
 const tip=q.result[q.result.length-1],seq=q.result.length+1;
 const event={seq,id:"C133-"+seq,prev:tip?.id||null,parent,kind,substrate:"{{aether}}",...payload};
 st.add(event);set(event);
 }})
}
const button=(id,fn)=>document.getElementById(id).onclick=async()=>{try{show(await fn())}catch(e){show({status:"HOLD",reason:e.message})}};
async function current(){const state=await recover();if(state.status!=="PASS")throw Error("CHAIN INTEGRITY HOLD: "+state.errors.join(","));active=state.active;return state}
button("obs133",async()=>{const state=await current();if(state.active)throw Error("Existing chain remains pending");const o=await cortex();if(o.door!=="CLOSED")throw Error("observation not closed");return guardedAppend("OBSERVATION",null,{sourceObservation:o.id,sourceDoor:o.door})});
button("prop133",async()=>{const state=await current();if(!state.active?.observation||state.active.proposal)throw Error("Need pending imported observation");const p=state.active.observation;return guardedAppend("PROPOSAL",p.id,{origin:p.id,box:"B"+(p.seq%24+1),tool:"T"+(p.seq%15+1)})});
async function finish(kind){const state=await current(),p=state.active?.proposal;if(!p)throw Error("No pending proposal");return guardedAppend(kind,p.id,{origin:state.active.observation.id,box:p.box,tool:p.tool,door:kind==="CLOSED"?"CLOSED":null})}
button("close133",()=>finish("CLOSED"));button("hold133",()=>finish("HELD"));
button("audit133",async()=>{const a=await current();return {status:a.status,events:a.events,errors:a.errors,pending:a.active?.proposal?.id||a.active?.observation?.id||null,tail:a.tail}});
current().then(a=>show({status:a.status,restored:a.active?.proposal?.id||a.active?.observation?.id||null,events:a.events})).catch(e=>show({status:"HOLD",reason:e.message}));
window.CUBI134=Object.freeze({reconstruct,recover});
})();