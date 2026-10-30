// CUBI 115 — three observers, one-way diodic door, main cortex.
(()=>{"use strict";
const host=document.getElementById("cortex115");if(!host)return;
host.innerHTML='<h2>MAIN CORTEX · DIODIC OBSERVER POOL</h2><p>Three observers · one-way doors · no checkpoints · no quorums</p><canvas id="cortexCanvas115" style="width:100%;height:290px;background:#060c18;border:1px solid #28506a;border-radius:10px"></canvas><div class="controls"><button id="cortexObserve115">Observe → pass through</button><button id="cortexAuto116">Pause continuous observation</button><button id="cortexHistory115">Read cortex history</button><button id="cortexInherit117">Inherit closed reports</button><button id="cortexLineage117">Inspect lineage</button><button id="cortexRecurse118">Inherit next generation</button><button id="cortexObserve119">Observe consequence</button><button id="cortexAgent120">Pause cortex agent</button><button id="cortexAgentAudit120">Agent novelty audit</button><button id="cortexLocal121">Inspect local observer</button><button id="cortexTrace123">Trace causal lineage</button><button id="cortexExport115">Export cortex history</button></div><pre id="cortexStatus115">Three independent observers ready.</pre>';
const KEY="cubi.cortex115.v1",OB=[{id:"L",hemisphere:"LH",color:"#438eff",label:"BLUE"},{id:"C",hemisphere:"CH",color:"#41ef99",label:"GREEN"},{id:"R",hemisphere:"RH",color:"#ff586a",label:"RED"}];let dbPromise,working=false,continuous116=true,closed116=0,last116=null;
function db(){return dbPromise??=new Promise((ok,fail)=>{const r=indexedDB.open(KEY,3);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains("cortex"))r.result.createObjectStore("cortex",{keyPath:"id"});if(!r.result.objectStoreNames.contains("inheritance117"))r.result.createObjectStore("inheritance117",{keyPath:"id"});if(!r.result.objectStoreNames.contains("self121"))r.result.createObjectStore("self121",{keyPath:"id"})};r.onsuccess=()=>ok(r.result);r.onerror=()=>fail(r.error)})}
function txRead(d){return new Promise((ok,fail)=>{const t=d.transaction("cortex","readonly"),r=t.objectStore("cortex").getAll();r.onsuccess=()=>ok(r.result);r.onerror=()=>fail(r.error)})}
function source(){const a=window.CUBI108?.observe();if(!a||a.length!==3)throw Error("Independent observer fields unavailable");return a}
async function pass(){if(working)return;working=true;try{const d=await db(),reports=source();const result=await new Promise((ok,fail)=>{const t=d.transaction("cortex","readwrite"),store=t.objectStore("cortex");let admitted=0,already=0;t.oncomplete=()=>ok({admitted,already});t.onerror=()=>fail(t.error);t.onabort=()=>fail(t.error||Error("door failed"));for(const report of reports){const id=report.registry+"@"+report.sourceTick,r=store.get(id);r.onsuccess=()=>{if(r.result){already++;return}store.add({id,...report,passedAt:Date.now(),door:"CLOSED",destination:"MAIN_CORTEX"});admitted++}}});closed116+=result.admitted;last116={...result,closedDoors:closed116,observers:3,mode:"CONTINUOUS",rule:"one-way after passage; no vote or checkpoint"};show(last116)}catch(e){show({hold:e.message})}finally{working=false}}
const out=document.getElementById("cortexStatus115"),canvas=document.getElementById("cortexCanvas115"),g=canvas.getContext("2d");
function show(data){out.textContent=JSON.stringify(data,null,2)}
function draw(){const w=canvas.clientWidth||500,h=290,scale=devicePixelRatio||1;canvas.width=Math.round(w*scale);canvas.height=h*scale;g.setTransform(scale,0,0,scale,0,0);g.clearRect(0,0,w,h);
 OB.forEach((o,i)=>{const x=w*(.17+i*.33),y=65;g.strokeStyle=o.color;g.fillStyle=o.color;g.lineWidth=2;g.beginPath();g.arc(x,y,23,0,Math.PI*2);g.stroke();g.font="bold 12px monospace";g.textAlign="center";g.fillText(o.id,x,y+4);g.font="11px monospace";g.fillText(o.hemisphere+" "+o.label,x,y-34);const mid=w*.5;g.beginPath();g.moveTo(x,y+25);g.lineTo(mid,208);g.stroke();g.fillText("ff → rr",x,y+46)});
 g.strokeStyle="#8ef6b9";g.strokeRect(w*.5-60,193,120,63);g.fillStyle="#8ef6b9";g.textAlign="center";g.font="bold 12px monospace";g.fillText("MAIN CORTEX",w*.5,219);g.font="10px monospace";g.fillText("door closes",w*.5,236)}
// CUBI 117: derived observation is new; original closed records remain unchanged.
async function inherit117(){
 const d=await db(),all=await txRead(d);
 const sources=["L","C","R"].map(id=>all.filter(x=>x.registry===id&&x.door==="CLOSED").sort((a,b)=>b.sourceTick-a.sourceTick)[0]).filter(Boolean);
 if(!sources.length)throw Error("NO CLOSED OBSERVATIONS");
 const ids=sources.map(x=>x.id).sort(),id="inherit:"+ids.join("|");
 const derived={id,type:"CORTEX_INHERITANCE",parents:ids,createdAt:Date.now(),parentCount:ids.length,
  contrasts:sources.map(x=>({registry:x.registry,sourceTick:x.sourceTick,residual:x.residual,spikes:x.spikes})),
  note:"Derived comparison, not source modification; disagreement preserved; no quorum"};
 return await new Promise((ok,fail)=>{const t=d.transaction("inheritance117","readwrite"),o=t.objectStore("inheritance117"),check=o.get(id);let inserted=false;
 check.onsuccess=()=>{if(!check.result){o.add(derived);inserted=true}};
 t.oncomplete=()=>ok({inserted,derived:inserted?derived:{id,parents:ids,note:"already inherited"}});t.onerror=()=>fail(t.error);t.onabort=()=>fail(t.error)})
}
async function lineage117(){const d=await db();return new Promise((ok,fail)=>{const t=d.transaction(["cortex","inheritance117"],"readonly"),a=t.objectStore("cortex").getAll(),b=t.objectStore("inheritance117").getAll();let originals,derived;
 a.onsuccess=()=>{originals=a.result};b.onsuccess=()=>{derived=b.result};t.oncomplete=()=>ok({originals:originals.length,derived:derived.length,last:derived.slice(-5),rule:"parents remain closed and unchanged; children are new records"});t.onerror=()=>fail(t.error)})
}
document.getElementById("cortexInherit117").onclick=async()=>{try{show(await inherit117())}catch(e){show({hold:e.message})}};
document.getElementById("cortexLineage117").onclick=async()=>{try{show(await lineage117())}catch(e){show({hold:e.message})}};
// CUBI 118: one-way recursion over the latest existing derived observation.
async function recurse118(){
 const d=await db();
 return new Promise((ok,fail)=>{
  const t=d.transaction("inheritance117","readwrite"),store=t.objectStore("inheritance117");
  const get=store.getAll();let outcome=null;
  get.onsuccess=()=>{
   const list=get.result.filter(x=>x.type==="CORTEX_INHERITANCE"||x.type==="RECURSIVE_INHERITANCE");
   if(!list.length){t.abort();return}
   const ordered=list.sort((a,b)=>(a.generation||1)-(b.generation||1)||a.id.localeCompare(b.id));
   const parent=ordered.at(-1),generation=(parent.generation||1)+1,id="recursive:"+generation+":"+parent.id;
   const child={id,type:"RECURSIVE_INHERITANCE",generation,parents:[parent.id],rootParents:parent.rootParents||parent.parents,createdAt:Date.now(),door:"CLOSED",
    note:"New child references a closed parent; no ancestor mutation, checkpoint, vote or quorum"};
   const found=store.get(id);
   found.onsuccess=()=>{if(found.result){outcome={inserted:false,id,generation}}else{store.add(child);outcome={inserted:true,id,generation,parent:parent.id}}};
  };
  t.oncomplete=()=>ok(outcome);t.onerror=()=>fail(t.error);t.onabort=()=>fail(t.error||Error("No inherited root: use Inherit closed reports first"));
 });
}
document.getElementById("cortexRecurse118").onclick=async()=>{try{show(await recurse118())}catch(e){show({hold:e.message})}};
// CUBI 119: only changed consequences cross the one-way inheritance door.
async function consequence119(){
 const d=await db(),originals=await txRead(d);
 const latest=["L","C","R"].map(id=>originals.filter(r=>r.registry===id&&r.door==="CLOSED").sort((a,b)=>b.sourceTick-a.sourceTick)[0]).filter(Boolean);
 if(!latest.length)throw Error("NO CLOSED SOURCE REPORTS");
 const signature=latest.map(x=>x.id).sort().join("|");
 return new Promise((ok,fail)=>{
  const tx=d.transaction("inheritance117","readwrite"),store=tx.objectStore("inheritance117");
  const listReq=store.getAll();let outcome;
  listReq.onsuccess=()=>{
   const records=listReq.result,changed=records.filter(x=>x.type==="CONSEQUENCE119").sort((a,b)=>a.generation-b.generation);
   const last=changed.at(-1),lastSignature=last?.sourceSignature;
   if(lastSignature===signature){outcome={status:"UNCHANGED",sourceSignature:signature,reason:"No new closed source IDs; door remains closed"};return}
   const parent=last||records.filter(x=>x.type==="RECURSIVE_INHERITANCE"||x.type==="CORTEX_INHERITANCE").sort((a,b)=>(a.generation||1)-(b.generation||1)).at(-1);
   const generation=(parent?.generation||1)+1,ids=latest.map(x=>x.id).sort();
   const value={id:"consequence:"+ids.join("|"),type:"CONSEQUENCE119",generation,parents:parent?[parent.id]:ids,sourceIds:ids,sourceSignature:signature,door:"CLOSED",createdAt:Date.now(),
    observations:latest.map(x=>({source:x.registry,tick:x.sourceTick,residual:x.residual,spikes:x.spikes})),
    note:"A new closed source observation is a new consequence; existing reports never revised"};
   const check=store.get(value.id);
   check.onsuccess=()=>{if(check.result){outcome={status:"ALREADY_PRESERVED",id:value.id};return}store.add(value);outcome={status:"INHERITED",id:value.id,generation,parents:value.parents}};
  };
  tx.oncomplete=()=>ok(outcome);tx.onerror=()=>fail(tx.error);tx.onabort=()=>fail(tx.error);
 });
}
document.getElementById("cortexObserve119").onclick=async()=>{try{show(await consequence119())}catch(e){show({hold:e.message})}};
// CUBI 121 — one local observer watches the agent's decisions without changing policy.
let selfSeq121=0,selfFault121=null;
async function selfObserve121(result,inputs){
 const d=await db();return new Promise((ok,fail)=>{
  const t=d.transaction("self121","readwrite"),o=t.objectStore("self121"),r=o.getAll();let record;
  r.onsuccess=()=>{
   const history=r.result,prev=history.sort((a,b)=>a.seq-b.seq).at(-1);
   const seq=(prev?.seq||0)+1;
   record={id:"self121:"+seq,seq,parent:prev?.id||null,decision:result.status,sourceIds:inputs.map(x=>x.id),reason:result.differences||[],policy:{residual:0.0005,spikes:1},observedAt:Date.now(),door:"CLOSED"};
   o.add(record)
  };
  t.oncomplete=()=>ok(record);t.onerror=()=>fail(t.error);t.onabort=()=>fail(t.error)
 })
}
async function selfAudit121(){
 const d=await db();return new Promise((ok,fail)=>{
  const t=d.transaction("self121","readonly"),r=t.objectStore("self121").getAll();let report;
  r.onsuccess=()=>{
   const all=r.result.sort((a,b)=>a.seq-b.seq);
   const valid=all.every((x,i)=>x.seq===i+1&&x.parent===(i?all[i-1].id:null)&&x.policy.residual===0.0005&&x.policy.spikes===1);
   report={status:valid?"PASS":"HOLD",decisions:all.length,inherited:all.filter(x=>x.decision==="NOVEL").length,held:all.filter(x=>x.decision==="STABLE").length,last:all.at(-1)||null,rule:"one-way self-observation; policy is not rewritten"}
  };
  t.oncomplete=()=>ok(report);t.onerror=()=>fail(t.error);t.onabort=()=>fail(t.error)
 })
}
document.getElementById("cortexLocal121").onclick=async()=>{try{show(await selfAudit121())}catch(e){show({hold:e.message})}};
// CUBI 120: an autonomous, observation-only novelty agent (not a language model).
const NOVELTY120={residual:0.0005,spikes:1},AGENT120={active:true,busy:false,cycles:0,novel:0,stable:0,last:null,error:null};
async function agent120(){
 if(!AGENT120.active||AGENT120.busy||document.visibilityState==="hidden")return;
 AGENT120.busy=true;
 try{
  const d=await db(),closed=await txRead(d);
  const latest=["L","C","R"].map(id=>closed.filter(x=>x.registry===id&&x.door==="CLOSED").sort((a,b)=>b.sourceTick-a.sourceTick)[0]).filter(Boolean);
  if(!latest.length)return;
  const current=latest.map(x=>({registry:x.registry,id:x.id,tick:x.sourceTick,residual:Number(x.residual)||0,spikes:Number(x.spikes)||0}));
  const result=await new Promise((ok,fail)=>{
   const tx=d.transaction(["inheritance117","self121"],"readwrite");
   const inheritance=tx.objectStore("inheritance117"),witness=tx.objectStore("self121");
   const req=inheritance.getAll(),wr=witness.getAll();
   let records=null,history=null,outcome=null;
   function decide(){
    if(!records||!history)return;
    const previous=records.filter(x=>x.type==="AGENT_NOVELTY120").sort((a,b)=>a.generation-b.generation).at(-1);
    const old=previous?.observations||[];
    const differences=current.map(x=>{const p=old.find(y=>y.registry===x.registry);return {registry:x.registry,newSource:!p,deltaResidual:p?Math.abs(x.residual-p.residual):null,deltaSpikes:p?Math.abs(x.spikes-p.spikes):null}});
    const novel=!previous||differences.some(x=>x.newSource||x.deltaResidual>=NOVELTY120.residual||x.deltaSpikes>=NOVELTY120.spikes);
    const seq=(history.at(-1)?.seq||0)+1,prior=history.at(-1);
    outcome={status:novel?"NOVEL":"STABLE",differences};
    if(novel){
     const generation=(previous?.generation||0)+1;
     const item={id:"agent120:"+generation,type:"AGENT_NOVELTY120",generation,parents:previous?[previous.id]:current.map(x=>x.id),sourceIds:current.map(x=>x.id),observations:current,differences,createdAt:Date.now(),door:"CLOSED",thresholds:NOVELTY120,rule:"model novelty only; no quorum"};
     inheritance.add(item);outcome.id=item.id;outcome.generation=generation;
    }
    witness.add({id:"self121:"+seq,seq,parent:prior?.id||null,decision:outcome.status,decisionId:outcome.id||null,sourceIds:current.map(x=>x.id),reason:differences,policy:{...NOVELTY120},observedAt:Date.now(),door:"CLOSED",atomic122:true});
   }
   req.onsuccess=()=>{records=req.result;decide()};
   wr.onsuccess=()=>{history=wr.result.sort((x,y)=>x.seq-y.seq);decide()};
   tx.oncomplete=()=>ok(outcome);tx.onerror=()=>fail(tx.error);tx.onabort=()=>fail(tx.error||Error("atomic decision rejected"));
  });
  AGENT120.cycles++;AGENT120[result.status==="NOVEL"?"novel":"stable"]++;AGENT120.last=result;AGENT120.error=null;
 }catch(e){AGENT120.error=e.message;AGENT120.active=false;document.getElementById("cortexAgent120").textContent="Resume cortex agent"}
 finally{AGENT120.busy=false}
}
document.getElementById("cortexAgent120").onclick=()=>{AGENT120.active=!AGENT120.active;document.getElementById("cortexAgent120").textContent=AGENT120.active?"Pause cortex agent":"Resume cortex agent";show(AGENT120)};
document.getElementById("cortexAgentAudit120").onclick=()=>show({...AGENT120,thresholds:NOVELTY120,meaning:"Model-only novelty; observations preserved, no voting"});
async function cycle120(){await agent120();setTimeout(cycle120,1500)}
setTimeout(cycle120,1500);
// CUBI 123: read-only causal path audit. Missing parents are faults, never guessed.
async function causal123(){
 const d=await db();
 const records=await new Promise((resolve,reject)=>{
  const tx=d.transaction(["cortex","inheritance117","self121"],"readonly");
  const names=["cortex","inheritance117","self121"],result={};
  for(const name of names){const r=tx.objectStore(name).getAll();r.onsuccess=()=>{result[name]=r.result}}
  tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);
 });
 const roots=new Map(records.cortex.map(x=>[x.id,x]));
 const derived=new Map(records.inheritance117.map(x=>[x.id,x]));
 const errors=[],paths=[],visiting=new Set(),memo=new Map();
 function trace(id){
  if(memo.has(id))return memo.get(id);
  if(visiting.has(id)){errors.push({id,error:"CYCLE"});return []}
  const root=roots.get(id);
  if(root){if(root.door!=="CLOSED"||!["L","C","R"].includes(root.registry))errors.push({id,error:"INVALID_ROOT"});return [id]}
  const node=derived.get(id);
  if(!node){errors.push({id,error:"MISSING_PARENT"});return []}
  visiting.add(id);
  const parents=Array.isArray(node.parents)?node.parents:[];
  if(!parents.length)errors.push({id,error:"EMPTY_PARENTS"});
  const result=[...new Set(parents.flatMap(trace))];
  visiting.delete(id);memo.set(id,result);return result;
 }
 for(const node of records.inheritance117){const ancestry=trace(node.id);paths.push({id:node.id,roots:ancestry,depth:node.generation||1})}
 for(const w of records.self121)if(w.decisionId&&!derived.has(w.decisionId))errors.push({id:w.id,error:"ORPHAN_DECISION",parent:w.decisionId});
 return {status:errors.length?"HOLD":"PASS",closedRoots:roots.size,derived:derived.size,selfWitnesses:records.self121.length,errors:errors.slice(0,30),latestPaths:paths.slice(-8),rule:"Trace only. Never rewrite parents. No checkpoints, consensus, or quorum"};
}
document.getElementById("cortexTrace123").onclick=async()=>{try{show(await causal123())}catch(e){show({hold:e.message})}};
document.getElementById("cortexObserve115").onclick=pass;
const autoButton116=document.getElementById("cortexAuto116");
autoButton116.onclick=()=>{continuous116=!continuous116;autoButton116.textContent=continuous116?"Pause continuous observation":"Resume continuous observation";show({continuous:continuous116,closedDoors:closed116,last:last116})};
async function cycle116(){if(continuous116&&document.visibilityState!=="hidden")await pass();setTimeout(cycle116,1000)}
setTimeout(cycle116,1000);
document.getElementById("cortexHistory115").onclick=async()=>{try{const all=await txRead(await db());show({reports:all.length,last:all.slice(-6),note:"historical reports read only; no consensus"})}catch(e){show({hold:e.message})}};
document.getElementById("cortexExport115").onclick=async()=>{try{const all=await txRead(await db());const url=URL.createObjectURL(new Blob([JSON.stringify({schema:"CUBI115",reports:all},null,2)],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download="cubi-cortex115.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}catch(e){show({hold:e.message})}};
draw();window.addEventListener("resize",draw);
})();