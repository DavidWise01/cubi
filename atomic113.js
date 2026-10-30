// CUBI 113: atomic queue-to-silo delivery, separate from legacy localStorage histories.
(()=>{"use strict";
const host=document.getElementById("silo113");if(!host)return;
host.innerHTML='<h2>CUBI 113 · ATOMIC DIODIC DELIVERY</h2><div class="controls"><button id="queue113">Queue RGB</button><button id="deliver113">Deliver next</button><button id="reverse113">Deliver reverse RGB</button><button id="audit113">Audit transactional silo</button><button id="export113">Export ledger</button><button id="fault114">Run fault tests</button></div><pre id="status113">Initializing IndexedDB</pre>';
const out=document.getElementById("status113"),DB="cubi.atomic113.v1",REG=["L","C","R"],PHASE=["C1","C2","C3","C1","C2","C3","C1","C2","C3","C1"];
let dbPromise=null,busy=false;
function request(r){return new Promise((resolve,reject)=>{r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function openDB(){if(dbPromise)return dbPromise;dbPromise=new Promise((resolve,reject)=>{if(!window.indexedDB){reject(Error("IndexedDB unavailable"));return}const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{const db=r.result;db.createObjectStore("queue",{keyPath:"id"});db.createObjectStore("ledger",{keyPath:"id"});db.createObjectStore("meta",{keyPath:"id"})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});return dbPromise}
function transaction(db,stores,mode,action){return new Promise((resolve,reject)=>{const tx=db.transaction(stores,mode);let value;tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error("transaction aborted"));try{action(tx,v=>{value=v})}catch(e){tx.abort();reject(e)}})}
const digest=async obj=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(JSON.stringify(obj))))).map(n=>n.toString(16).padStart(2,"0")).join("");
async function snapshot(){const data=window.CUBI108?.observe();if(!Array.isArray(data)||data.length!==3||data.some(x=>!REG.includes(x.registry)||!Number.isFinite(x.sourceTick)||!Number.isFinite(x.residual)))throw Error("RGB fields unavailable");return data}
async function queue(){const db=await openDB(),samples=await snapshot();let created=0;await transaction(db,["queue","ledger"],"readwrite",(tx)=>{for(const s of samples){const id=s.registry+"@"+s.sourceTick;const q=tx.objectStore("queue"),l=tx.objectStore("ledger");const existing=l.get(id);existing.onsuccess=()=>{if(existing.result)return;const x=q.get(id);x.onsuccess=()=>{if(!x.result){q.add({id,...s,queuedAt:Date.now()});created++}}}}});return {queued:created,observed:samples.map(x=>x.registry+"@"+x.sourceTick)}}
async function deliver(reverse=false){if(busy)throw Error("DELIVERY BUSY");busy=true;try{const db=await openDB();const queued=await transaction(db,["queue"],"readonly",(tx,done)=>{const r=tx.objectStore("queue").getAll();r.onsuccess=()=>done(r.result)});if(!queued.length)throw Error("QUEUE EMPTY");const selection=(reverse?[...REG].reverse():REG).map(id=>queued.filter(x=>x.registry===id).sort((a,b)=>a.sourceTick-b.sourceTick)[0]).filter(Boolean);const ledger=await transaction(db,["ledger"],"readonly",(tx,done)=>{const r=tx.objectStore("ledger").getAll();r.onsuccess=()=>done(r.result)});const prepared=[];for(const sample of selection){const stream=ledger.filter(e=>e.registry===sample.registry).sort((a,b)=>a.localSeq-b.localSeq);const last=stream.at(-1);if(last&&sample.sourceTick<last.sourceTick)throw Error("STALE SOURCE TICK "+sample.registry);const {queuedAt,...base}=sample;const entry={...base,queuedAt,localSeq:(last?.localSeq||0)+1,prevHash:last?.hash||"GENESIS",phase:PHASE[(last?.localSeq||0)%10]};entry.hash=await digest(entry);prepared.push(entry)}
await transaction(db,["queue","ledger"],"readwrite",(tx)=>{const q=tx.objectStore("queue"),l=tx.objectStore("ledger");for(const entry of prepared){const r=l.get(entry.id);r.onsuccess=()=>{if(!r.result)l.add(entry);q.delete(entry.id)}}});return prepared.map(e=>({id:e.id,hash:e.hash,localSeq:e.localSeq}))}finally{busy=false}}
async function audit(){const db=await openDB();const all=await transaction(db,["ledger","queue"],"readonly",(tx,done)=>{const a=tx.objectStore("ledger").getAll(),b=tx.objectStore("queue").getAll();let ledger,queue;const combine=()=>{if(ledger&&queue)done({ledger,queue})};a.onsuccess=()=>{ledger=a.result;combine()};b.onsuccess=()=>{queue=b.result;combine()}});const streams={};for(const id of REG){const line=all.ledger.filter(x=>x.registry===id).sort((a,b)=>a.localSeq-b.localSeq);let prev="GENESIS",tick=-1;for(let i=0;i<line.length;i++){const e=line[i],{hash,...payload}=e;if(e.localSeq!==i+1||e.prevHash!==prev||e.sourceTick<tick||await digest(payload)!==hash)throw Error("INTEGRITY HOLD "+id+" #"+(i+1));prev=e.hash;tick=e.sourceTick}streams[id]={count:line.length,lastTick:tick,head:prev}}return {status:"PASS",pending:all.queue.length,committed:all.ledger.length,streams,legacy:"CUBI112 localStorage retained, not migrated automatically"}}
// CUBI 114: isolated transactional fault tests; never mutate the production ledger.
async function faultTests114(){
 const db=await openDB(),results=[];
 const before=await audit();
 const testDB="cubi.test114.v1";
 const temp=await new Promise((resolve,reject)=>{const r=indexedDB.open(testDB,1);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains("events"))d.createObjectStore("events",{keyPath:"id"})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});
 try{
  await transaction(temp,["events"],"readwrite",tx=>tx.objectStore("events").put({id:"witness",seq:1}));
  try{await transaction(temp,["events"],"readwrite",tx=>{tx.objectStore("events").put({id:"witness",seq:2});tx.abort()})}catch(e){}
  const persisted=await transaction(temp,["events"],"readonly",(tx,done)=>{const q=tx.objectStore("events").get("witness");q.onsuccess=()=>done(q.result)});
  results.push({test:"transaction abort preserves original",pass:persisted?.seq===1});
  try{await transaction(temp,["events"],"readwrite",tx=>tx.objectStore("events").add({id:"witness",seq:3}))}catch(e){}
  const noDuplicate=await transaction(temp,["events"],"readonly",(tx,done)=>{const q=tx.objectStore("events").getAll();q.onsuccess=()=>done(q.result)});
  results.push({test:"duplicate key rejected",pass:noDuplicate.length===1&&noDuplicate[0].seq===1});
  temp.close();
  const reopen=await new Promise((resolve,reject)=>{const q=indexedDB.open(testDB,1);q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error)});
  const reloaded=await transaction(reopen,["events"],"readonly",(tx,done)=>{const q=tx.objectStore("events").get("witness");q.onsuccess=()=>done(q.result)});
  results.push({test:"closed and reopened persistence",pass:reloaded?.seq===1});reopen.close();
  const after=await audit();
  results.push({test:"production silo unchanged",pass:before.committed===after.committed&&before.pending===after.pending&&REG.every(id=>before.streams[id].head===after.streams[id].head)});
 }finally{try{temp.close()}catch(e){}}
 return {status:results.every(x=>x.pass)?"PASS":"FAIL",results,production:"untouched",crossTab:"not exercised",crashPowerLoss:"not exercised"};
}
function download(data){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));a.download="cubi-atomic113.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
async function click(work){try{out.textContent=JSON.stringify(await work(),null,2)}catch(e){out.textContent="HOLD: "+e.message}}
document.getElementById("queue113").onclick=()=>click(queue);
document.getElementById("deliver113").onclick=()=>click(()=>deliver(false));
document.getElementById("reverse113").onclick=()=>click(()=>deliver(true));
document.getElementById("audit113").onclick=()=>click(audit);
document.getElementById("fault114").onclick=()=>click(faultTests114);
document.getElementById("export113").onclick=()=>click(async()=>{const db=await openDB();const data=await transaction(db,["ledger","queue"],"readonly",(tx,done)=>{const l=tx.objectStore("ledger").getAll(),q=tx.objectStore("queue").getAll();let a,b;l.onsuccess=()=>{a=l.result;if(b)done({schema:"CUBI113",ledger:a,queue:b})};q.onsuccess=()=>{b=q.result;if(a)done({schema:"CUBI113",ledger:a,queue:b})}});download(data);return {exported:data.ledger.length}});
click(audit);
})();