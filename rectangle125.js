// CUBI 125 — rectangular brace { [6×4(5×3)] }.
// BOX=24 data addresses; TOROID=15 isolated tool addresses; containment never executes.
(()=>{"use strict";
const host=document.getElementById("rectangle125");if(!host)return;
const SUBSTRATE=Object.freeze({name:"{{aether}}",geometry:"{ [6x4(5x3)] }",rule:"no implicit execution; one-way closure"});
const BOX=Object.freeze({cols:6,rows:4,count:24}),TOOL=Object.freeze({cols:5,rows:3,count:15});
host.innerHTML='<h2>CUBI 126 · {{aether}} SUBSTRATE</h2><p>{ [6×4(5×3)] } · 24 BOX addresses · 15 TOROID tool addresses · one BRACE</p><canvas id="rectangleCanvas125" style="width:100%;height:560px;display:block;background:#060c18;border:1px solid #365471;border-radius:12px"></canvas><div class="controls"><button id="rectangleAudit125">Audit isolation</button><button id="rectangleBind125">Bind sample explicitly</button></div><pre id="rectangleStatus125">Contained. No tools executed.</pre>';
const canvas=document.getElementById("rectangleCanvas125"),ctx=canvas.getContext("2d"),status=document.getElementById("rectangleStatus125");
const data=Object.freeze(Array.from({length:24},(_,i)=>Object.freeze({id:"B"+(i+1),x:i%6,y:Math.floor(i/6)})));
const tools=Object.freeze(Array.from({length:15},(_,i)=>Object.freeze({id:"T"+(i+1),x:i%5,y:Math.floor(i/5)})));
let pending127=null;let observed127=null;
let generated=0;
const STORE128="cubi.aether128.proposals.v1";let events128=[];let hold128=null;
try{const raw=JSON.parse(localStorage.getItem(STORE128)||"[]");if(!Array.isArray(raw))throw Error("invalid proposal history");for(let i=0;i<raw.length;i++){const e=raw[i];if(e.seq!==i+1||e.prev!==i||!["PROPOSED","BOUND","HELD"].includes(e.kind)||e.substrate!=="{{aether}}")throw Error("proposal continuity "+i)}events128=raw}catch(e){hold128=e.message}
function append128(kind,proposal,extra={}){if(hold128)throw Error("proposal ledger HOLD "+hold128);const entry=Object.freeze({seq:events128.length+1,prev:events128.length,kind,substrate:"{{aether}}",proposal,...extra});const next=events128.concat([entry]);localStorage.setItem(STORE128,JSON.stringify(next));events128=next;return entry}
function audit128(){const items=new Map();for(const e of events128){if(e.kind==="PROPOSED")items.set(e.proposal,{id:e.proposal,state:"PENDING",source:e.source,tool:e.tool});else if(items.has(e.proposal))items.get(e.proposal).state=e.kind}return {totalEvents:events128.length,proposals:[...items.values()],recent:events128.slice(-12),hold:hold128}}

const STORE126="cubi.aether126.events.v1";let history126=[];let hold126=null;
try{const saved=JSON.parse(localStorage.getItem(STORE126)||"[]");if(!Array.isArray(saved))throw Error("invalid aether ledger");for(let i=0;i<saved.length;i++){if(saved[i].seq!==i+1||saved[i].parent!==i||saved[i].substrate!==SUBSTRATE.name||saved[i].door!=="CLOSED")throw Error("aether continuity error "+i)}history126=saved;generated=saved.length}catch(e){hold126=e.message}
function draw(){
 const rect=canvas.getBoundingClientRect(),w=Math.max(320,rect.width),h=560,dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
 ctx.clearRect(0,0,w,h);ctx.strokeStyle="#a4eec8";ctx.lineWidth=3;ctx.strokeRect(12,12,w-24,h-24);
 ctx.fillStyle="#a4eec8";ctx.font="bold 15px monospace";ctx.fillText("{  BRACE · SCOPE  }",25,38);
 const left=30,top=62,bw=(w-60)/6,bh=54;
 for(const item of data){const x=left+item.x*bw,y=top+item.y*bh;ctx.strokeStyle="#4b9cff";ctx.lineWidth=1.6;ctx.strokeRect(x+3,y+3,bw-7,bh-7);ctx.fillStyle="#b9d9ff";ctx.font="12px monospace";ctx.fillText(item.id,x+12,y+28)}
 const ty=322,tw=(w-70)/5,th=55;
 ctx.fillStyle="#ffca88";ctx.font="bold 14px monospace";ctx.fillText("( TOROID · 5 × 3 TOOLS )",left,ty-18);
 for(const item of tools){const x=left+item.x*tw,y=ty+item.y*th;ctx.strokeStyle="#ffbb65";ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(x+tw/2,y+th/2,Math.max(8,tw/2-7),th/2-7,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle="#ffe0ae";ctx.font="12px monospace";ctx.textAlign="center";ctx.fillText(item.id,x+tw/2,y+th/2+4)}
 ctx.textAlign="left";ctx.fillStyle="#a4eec8";ctx.font="12px monospace";ctx.fillText("[]⁴ DATA   ()³ TOOLS   {n}ⁿ SCOPE",left,526);
}
function audit(){return {schema:"CUBI128",substrate:SUBSTRATE.name,stored:history126.length,hold:hold126,expression:"{ [6x4(5x3)] }",brace:1,boxes:data.length,toroids:tools.length,distinctIDs:new Set([...data,...tools].map(x=>x.id)).size===39,automaticExecution:false,derived:generated,rule:"Containment is not execution; source BOX and TOOL descriptors remain unchanged"}}
document.getElementById("rectangleAudit125").onclick=()=>status.textContent=JSON.stringify(audit(),null,2);
document.getElementById("rectangleBind125").onclick=()=>{try{
 if(hold126)throw Error("DIODIC HOLD "+hold126); if(pending127&&hold128)throw Error("PROPOSAL HOLD "+hold128);
 const seq=history126.length+1,source=pending127?data.find(x=>x.id===pending127.source):data[(seq-1)%data.length],tool=pending127?tools.find(x=>x.id===pending127.tool):tools[(seq-1)%tools.length];
 const result=Object.freeze({seq,parent:seq-1,id:"AETHER-D"+seq,substrate:SUBSTRATE.name,source:source.id,tool:tool.id,operation:"explicit symbolic bind",proposal127:pending127?pending127.id:null,observation127:pending127?pending127.observation:null,door:"CLOSED"});
 const next=history126.concat([result]);localStorage.setItem(STORE126,JSON.stringify(next));history126=next;generated=seq;
 if(pending127){try{append128("BOUND",pending127.id,{result:result.id})}catch(e){hold128=e.message;status.textContent="BIND CLOSED / AUDIT HOLD: "+e.message;pending127=null;return}}pending127=null;
 status.textContent=JSON.stringify({result,audit:audit()},null,2);
 }catch(e){status.textContent="HOLD: "+e.message}};
window.CUBI126=Object.freeze({substrate:SUBSTRATE,audit:()=>audit(),history:()=>history126.slice()});

const controls=host.querySelector(".controls");
const inspect128=document.createElement("button");inspect128.textContent="Inspect proposal history";controls.append(inspect128);inspect128.onclick=()=>status.textContent=JSON.stringify(audit128(),null,2);
const holdButton128=document.createElement("button");holdButton128.textContent="Hold pending proposal";controls.append(holdButton128);
holdButton128.onclick=()=>{try{if(!pending127)throw Error("no pending proposal");append128("HELD",pending127.id,{reason:"explicit human hold"});pending127=null;status.textContent=JSON.stringify(audit128(),null,2)}catch(e){status.textContent="HOLD: "+e.message}};
window.CUBI128=Object.freeze({audit:()=>audit128(),events:()=>events128.slice()});

const proposalButton=document.createElement("button");proposalButton.textContent="Observe cortex → propose";proposalButton.id="aetherPropose127";controls.prepend(proposalButton);
const proposalStatus=document.createElement("pre");proposalStatus.id="aetherProposal127";proposalStatus.textContent="Cortex not yet sampled. Proposals cannot execute themselves.";controls.after(proposalStatus);
const proposalLog=Object.freeze({name:"CUBI127",substrate:"{{aether}}"});
function latestCortex127(){return new Promise((resolve,reject)=>{const request=indexedDB.open("cubi.cortex115.v1");request.onerror=()=>reject(request.error);request.onsuccess=()=>{const db=request.result;if(!db.objectStoreNames.contains("cortex")){db.close();return reject(Error("cortex store unavailable"))}const tx=db.transaction("cortex","readonly");const get=tx.objectStore("cortex").getAll();get.onsuccess=()=>{const arr=get.result||[];db.close();resolve(arr.length?arr[arr.length-1]:null)};get.onerror=()=>{db.close();reject(get.error)}}})}
proposalButton.onclick=async()=>{try{
 const observed=await latestCortex127();if(!observed)throw Error("No closed cortex observation yet");
 const fingerprint=String(observed.id||observed.key||observed.tick||JSON.stringify(observed).slice(0,120));
 observed127=fingerprint;
 const index=(history126.length+fingerprint.length)%data.length,toolIndex=(history126.length+fingerprint.length)%tools.length;
 if(pending127){append128("HELD",pending127.id,{reason:"superseded"});pending127=null}
 const id="P128-"+(events128.length+1);
 const proposal=Object.freeze({id,observation:fingerprint,source:data[index].id,tool:tools[toolIndex].id,executed:false});
 append128("PROPOSED",id,{source:proposal.source,tool:proposal.tool,observation:fingerprint});pending127=proposal;
 proposalStatus.textContent=JSON.stringify({proposal:pending127,rule:"Proposal is not execution. Use Bind sample explicitly to close."},null,2);
 }catch(e){pending127=null;proposalStatus.textContent="OBSERVATION HOLD: "+e.message}};
window.CUBI127=Object.freeze({schema:proposalLog,proposal:()=>pending127,observation:()=>observed127});

draw();window.addEventListener("resize",draw);
})();