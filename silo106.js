// CUBI 106 — three independent 3×3 registries converge residual observations on one append-only silo.
(()=>{"use strict";
const root=document.getElementById("silo106");if(!root)return;
const KEY="cubi.silo106.v1",REG=["L","C","R"],BRAIN=[{registry:"L",hemisphere:"LH",color:"blue",hex:"#418bff",lanes:["ff","rr"]},{registry:"C",hemisphere:"CH",color:"green",hex:"#42f49b",lanes:["ff","rr"]},{registry:"R",hemisphere:"RH",color:"red",hex:"#ff586c",lanes:["ff","rr"]}],PHASE=["C1","C2","C3","C1","C2","C3","C1","C2","C3","C1"];
root.innerHTML='<h2>MAIN SILO · THREE DIODIC REGISTRIES</h2><p class="muted">{{ [(lh,ff,rr)L] [(ch,ff,rr)C] [(rh,ff,rr)R] }} · BLUE / GREEN / RED · 27 logical registers · no quorum</p><canvas id="siloCanvas106" style="width:100%;height:360px;display:block;border:1px solid #284663;border-radius:10px;background:#060d1b"></canvas><div class="controls"><button id="siloSample106">Observe residuals</button><button id="siloAudit106">Audit silo</button><button id="siloExport106">Export silo</button><button id="siloAuto111">Start paced intake</button><button id="siloHealth111">Runtime health</button><button id="siloQueue112">Queue RGB snapshot</button><button id="siloDeliver112">Deliver next</button><button id="siloReverse112">Reverse delivery test</button></div><pre id="siloReport106">Silo initializes without rewriting its sources.</pre>';
let events=[],fault=null;try{const saved=JSON.parse(localStorage.getItem(KEY)||"[]");if(!Array.isArray(saved))throw Error("invalid journal");for(let i=0;i<saved.length;i++){const e=saved[i];if(e.seq!==i+1||e.parent!==i||e.phase!==PHASE[i%10]||!(REG.includes(e.registry)||["R1","R2","R3"].includes(e.registry))||!Number.isFinite(e.residual))throw Error("sequence invalid at "+(i+1))}events=saved}catch(e){fault=e.message}
const canvas=document.getElementById("siloCanvas106"),ctx=canvas.getContext("2d");
const positions=[[.18,.28],[.5,.18],[.82,.28]],center=[.5,.69];
function residuals(){const samples=window.CUBI108?.observe();if(!samples||samples.length!==3||samples.some(x=>!Number.isFinite(x.residual)))throw Error("SILO HOLD: independent RGB fields unavailable");return samples}
function streamHistory(id){return events.filter(e=>e.registry===id&&e.witness109)}
function validate109(){
 for(const id of REG){const stream=streamHistory(id);for(let i=0;i<stream.length;i++){const r=stream[i];if(r.localSeq!==i+1||r.localParent!==i||r.hemisphere!==BRAIN.find(x=>x.registry===id).hemisphere||r.color!==BRAIN.find(x=>x.registry===id).color||r.laneIn!=="ff"||r.laneOut!=="rr")throw Error("WITNESS HOLD "+id+" #"+(i+1));if(i&&r.sourceTick<stream[i-1].sourceTick)throw Error("TICK REGRESSION "+id)}}return true
}
const SHA110=async data=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(JSON.stringify(data))))).map(x=>x.toString(16).padStart(2,"0")).join("");
async function validate110(){for(const id of REG){let previous="GENESIS";for(const e of streamHistory(id).filter(x=>x.witness110)){if(e.prevHash!==previous)throw Error("CHAIN110 PARENT "+id);const {hash,...payload}=e;if(await SHA110(payload)!==hash)throw Error("CHAIN110 DIGEST "+id);previous=hash}}return true}
let writing111=false;async function observe(){
 if(writing111)throw Error("INTAKE BUSY: a previous batch is pending");writing111=true;
 try{
 if(fault)throw Error("SILO HOLD "+fault);
 validate109();await validate110();const batch=residuals();
 const appended=[];for(const b of batch){const previous=streamHistory(b.registry).filter(x=>x.witness110).at(-1)?.hash||"GENESIS";const entry={seq:events.length+appended.length+1,parent:events.length+appended.length,phase:PHASE[(events.length+appended.length)%10],...b,witness109:true,witness110:true,localSeq:streamHistory(b.registry).length+1,localParent:streamHistory(b.registry).length,prevHash:previous};entry.hash=await SHA110(entry);appended.push(entry)}
 if((localStorage.getItem(KEY)||"[]")!==JSON.stringify(events))throw Error("SILO HOLD: external concurrent change");localStorage.setItem(KEY,JSON.stringify(events.concat(appended)));events.push(...appended);return appended
 }finally{writing111=false}
}
// CUBI 112 — queue intent is persistent, arrival order is independent of model source tick.
const QUEUE112_KEY="cubi.queue112.v1";
let queue112=[],queueFault112=null,delivering112=false;
try{const q=JSON.parse(localStorage.getItem(QUEUE112_KEY)||"[]");if(!Array.isArray(q)||q.some(e=>!REG.includes(e.registry)||!Number.isFinite(e.residual)||!Number.isInteger(e.sourceTick)))throw Error("invalid queued observations");queue112=q}catch(e){queueFault112=e.message}
function saveQueue112(q){localStorage.setItem(QUEUE112_KEY,JSON.stringify(q));queue112=q}
function enqueue112(){if(queueFault112)throw Error("QUEUE HOLD "+queueFault112);const samples=residuals();saveQueue112(queue112.concat(samples.map((s,i)=>({...s,queuedAt:Date.now(),queueId:Date.now()+"-"+i}))));return samples}
async function deliver112(reverse=false){
 if(delivering112||writing111)throw Error("DELIVERY BUSY");if(fault||queueFault112)throw Error("DELIVERY HOLD "+(fault||queueFault112));
 if(!queue112.length)throw Error("QUEUE EMPTY");delivering112=true;
 try{
  validate109();await validate110();
  // Select the earliest valid tick per registry. Reverse mode selects from the
  // reverse registry order but never reverses a single registry's chronology.
  const candidates=REG.slice();if(reverse)candidates.reverse();
  const selected=candidates.map(id=>queue112.filter(e=>e.registry===id).sort((a,b)=>a.sourceTick-b.sourceTick)[0]).filter(Boolean);
  const appended=[];
  for(const b of selected){
   const previous=streamHistory(b.registry).filter(x=>x.witness110).at(-1)?.hash||"GENESIS";
   const current=streamHistory(b.registry).at(-1);
   if(current&&b.sourceTick<current.sourceTick)throw Error("QUEUE HOLD: stale "+b.registry+" source tick");
   const {queuedAt,queueId,...observed}=b;
   const entry={seq:events.length+appended.length+1,parent:events.length+appended.length,phase:PHASE[(events.length+appended.length)%10],...observed,queuedAt,queueId,witness109:true,witness110:true,witness112:true,localSeq:streamHistory(b.registry).length+1,localParent:streamHistory(b.registry).length,prevHash:previous};
   entry.hash=await SHA110(entry);appended.push(entry);
  }
  if((localStorage.getItem(KEY)||"[]")!==JSON.stringify(events))throw Error("SILO HOLD: concurrent history change");
  localStorage.setItem(KEY,JSON.stringify(events.concat(appended)));events.push(...appended);
  const selectedIds=new Set(selected.map(e=>e.queueId));saveQueue112(queue112.filter(e=>!selectedIds.has(e.queueId)));return appended;
 }finally{delivering112=false}
}
async function audit(){
 let integrity="PASS";try{validate109();await validate110()}catch(e){integrity=e.message}
 const latest=REG.map(id=>streamHistory(id).at(-1));
 const deltas=latest.every(Boolean)?{blueMinusGreen:latest[0].residual-latest[1].residual,greenMinusRed:latest[1].residual-latest[2].residual,redMinusBlue:latest[2].residual-latest[0].residual}:null;
 return {status:fault?"HOLD":integrity,fault,streams:BRAIN.map(x=>({id:x.registry,hemisphere:x.hemisphere,color:x.color,lanes:x.lanes,legacyEntries:events.filter(e=>e.registry===x.registry&&!e.witness109).length,witnesses:streamHistory(x.registry).length,last:streamHistory(x.registry).at(-1)||null})),differences:deltas,mainSilo:{entries:events.length,nextPhase:PHASE[events.length%10]},queue112:{pending:queue112.length,fault:queueFault112},rule:"independent reports; compare differences; no quorum or forced agreement"}
}
function draw(){const r=canvas.getBoundingClientRect(),dp=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(r.width*dp)||canvas.height!==Math.round(r.height*dp)){canvas.width=Math.round(r.width*dp);canvas.height=Math.round(r.height*dp)}ctx.setTransform(dp,0,0,dp,0,0);const w=r.width,h=r.height;ctx.clearRect(0,0,w,h);const c=[w*center[0],h*center[1]];positions.forEach(([x,y],i)=>{const p=[x*w,y*h],color=BRAIN[i].hex;ctx.strokeStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(...p);ctx.lineTo(...c);ctx.stroke();for(let row=0;row<3;row++)for(let col=0;col<3;col++){const xx=p[0]+(col-1)*19,yy=p[1]+(row-1)*19;ctx.beginPath();ctx.arc(xx,yy,5,0,Math.PI*2);ctx.fillStyle=color;ctx.globalAlpha=.55;ctx.fill()}ctx.globalAlpha=1;ctx.font="12px monospace";ctx.textAlign="center";ctx.fillStyle="#e4f6ff";ctx.fillText(BRAIN[i].hemisphere+" · "+REG[i]+" · "+BRAIN[i].color.toUpperCase()+" · ff → rr",p[0],p[1]-43)});ctx.strokeStyle="#86ffbc";ctx.lineWidth=3;ctx.strokeRect(c[0]-37,c[1]-26,74,52);ctx.fillStyle="#a6ffda";ctx.font="bold 12px monospace";ctx.textAlign="center";ctx.fillText("SILO",...c);ctx.font="11px monospace";ctx.fillText(events.length+" residuals",c[0],c[1]+16)}
let intake111=false,arrivals111=0,lastError111=null;
function paced111(){if(!intake111)return;observe().then(()=>{arrivals111+=3;draw()}).catch(e=>{lastError111=e.message;intake111=false;document.getElementById("siloAuto111").textContent="Start paced intake";document.getElementById("siloReport106").textContent="INTAKE HOLD: "+e.message}).finally(()=>{if(intake111)setTimeout(paced111,1200)})}
document.getElementById("siloAuto111").onclick=()=>{intake111=!intake111;document.getElementById("siloAuto111").textContent=intake111?"Pause paced intake":"Start paced intake";if(intake111)paced111()};
document.getElementById("siloHealth111").onclick=async()=>{document.getElementById("siloReport106").textContent=JSON.stringify({runtime:window.CUBI108?.status()||"UNAVAILABLE",intake111,arrivals111,lastError111,witness:await audit()},null,2)};
document.getElementById("siloQueue112").onclick=()=>{try{const samples=enqueue112();document.getElementById("siloReport106").textContent="QUEUED "+samples.map(x=>x.registry+"@"+x.sourceTick).join(", ")+" · Pending "+queue112.length}catch(e){document.getElementById("siloReport106").textContent=e.message}};
for(const [id,reverse] of [["siloDeliver112",false],["siloReverse112",true]])document.getElementById(id).onclick=async()=>{try{const rows=await deliver112(reverse);draw();document.getElementById("siloReport106").textContent=JSON.stringify({delivery:rows.map(x=>({registry:x.registry,sourceTick:x.sourceTick,seq:x.seq,hash:x.hash})),pending:queue112.length},null,2)}catch(e){document.getElementById("siloReport106").textContent=e.message}};
document.getElementById("siloSample106").onclick=async()=>{try{const rows=await observe();document.getElementById("siloReport106").textContent=JSON.stringify(rows,null,2);draw()}catch(e){document.getElementById("siloReport106").textContent=e.message}};
document.getElementById("siloAudit106").onclick=async()=>{document.getElementById("siloReport106").textContent=JSON.stringify(await audit(),null,2)};
document.getElementById("siloExport106").onclick=()=>{const blob=new Blob([JSON.stringify({schema:"CUBI111",events},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="cubi-main-silo.json";a.click();URL.revokeObjectURL(a.href)};
draw();audit().then(x=>document.getElementById("siloReport106").textContent=JSON.stringify(x,null,2));
})();