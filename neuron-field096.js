// CUBI 096 · 9 tensor × (5 layers × 5 × 5) active representative neurons.
(()=>{"use strict";
const host=document.getElementById("neuron096");if(!host)return;
host.innerHTML='<h2>ACTIVE CORTEX · {{5×5}}^5</h2><div class="controls"><button id="neuronRun">Pause neural field</button><button id="neuronPulse">Stimulate Gap A</button><button id="neuronReset">Reset field</button></div><label>Gap A excitation <input id="gapA" type="range" min="0" max="100" value="40"></label><label>Gap B inhibition <input id="gapB" type="range" min="0" max="100" value="25"></label><label>Gap C why observer · 0.2 nm symbolic reference <input id="gapC" type="range" min="0" max="100" value="50"></label><canvas id="neuronFloor" style="width:100%;height:530px;background:#050d1a;border:1px solid #2d536b;border-radius:12px;display:block"></canvas><pre id="neuronStatus">Initializing neurons</pre><pre id="distance105"></pre><div class="controls"><button id="whyExport098">Export WHY history</button><button id="whyClear098">Reset WHY history</button><button id="bind099">Bind latest to memory</button><button id="compare100">Compare recalled WHY</button><button id="apply100">Apply bounded adjustment</button><button id="stability101">Audit stability</button><button id="restore102">Restore prior A/B</button><button id="audit103">Audit C1/C2/C3</button><button id="export103">Export diodic ledger</button><button id="floor104">Audit floor ceiling</button></div><pre id="whyHistory098">WHY history empty</pre><small>125 active neurons per tensor: 5 recursive slices of 5×5. Full 25^5 address tree is represented symbolically, not densely simulated. Gap A/B are modeled excitation/inhibition channels, not biological gap junction measurements.</small>';
const canvas=document.getElementById("neuronFloor"),ctx=canvas.getContext("2d"),stats=document.getElementById("neuronStatus");
const D=["LH","CH","RH"],L=["i","id","sid"],COUNT=125,NUM=1125;let running=true,impulse=0,tick=0;const WHY_SCALE_NM=0.2,WHY_ADDRESS="{{inf!xinf!}}^{{inf!}}";let why={A:0,B:0,delta:0,reason:"INITIAL"};
let proposal100=null,trial101=null,recovery102=null;
function stability101(){
 if(!trial101)return {status:"INSUFFICIENT",why:"No applied feedback trial"};
 const samples=whyHistory.filter(x=>x.tick>trial101.startTick);
 if(samples.length<6)return {status:"INSUFFICIENT",why:"Need six post-adjustment observations",samples:samples.length};
 const pre=trial101.baseline,post=samples.slice(-6).map(x=>Math.abs(x.delta));
 const mean=post.reduce((a,b)=>a+b,0)/post.length;
 const epsilon=.0001,change=mean-pre;
 const status=Math.abs(change)<epsilon?"INCONCLUSIVE":change<0?"CONVERGING":"DIVERGING";
 return {status,baseline:pre,current:mean,change,samples:samples.length,trialTick:trial101.startTick,warning:"Magnitude of A/B imbalance is only a proxy; lower magnitude does not establish better brain function"};
}

function compare100(){const gate=stability101();if(trial101&&gate.status==="INSUFFICIENT")throw Error("STABILITY HOLD: collect six post-feedback observations");if(trial101&&gate.status==="DIVERGING")throw Error("STABILITY HOLD: divergence observed; inspect before any new adjustment");
 const saved=window.CUBI100?.latest();if(!saved)throw Error("No persistent Gap C memory: Bind latest to memory first");
 if(!whyHistory.length)throw Error("No current WHY observations");
 const prior=saved.observation,current=whyHistory.at(-1);
 if(!Number.isFinite(prior.delta)||!Number.isFinite(current.delta))throw Error("Invalid measurements");
 const d=current.delta-prior.delta,step=Math.max(-.05,Math.min(.05,-d*2));
 const A=Number(document.getElementById("gapA").value)/100,B=Number(document.getElementById("gapB").value)/100;
 proposal100={sourceMemory:saved.memoryId,priorTick:prior.tick,currentTick:current.tick,deltaChange:d,A:Math.max(0,Math.min(1,A+step)),B:Math.max(0,Math.min(1,B-step)),oldA:A,oldB:B};
 document.getElementById("whyHistory098").textContent="CUBI 100 PROPOSAL (not applied)\nMemory #"+saved.memoryId+" t"+prior.tick+" → t"+current.tick+"\nΔ change: "+d.toFixed(6)+"\nGap A "+A.toFixed(2)+" → "+proposal100.A.toFixed(2)+"\nGap B "+B.toFixed(2)+" → "+proposal100.B.toFixed(2)+"\nModel-only proportional response; no proven causal optimum.";
}
const WHY_KEY="cubi.gapc.why098.v1",MAX_HISTORY=256;
let whyHistory=[];try{const saved=JSON.parse(localStorage.getItem(WHY_KEY)||"[]");if(Array.isArray(saved))whyHistory=saved.slice(-MAX_HISTORY)}catch(e){}
let lastObservation=-1;
function observe098(){
 const record={tick,sourceNode:D[1]+"."+L[1],spikes:Array.from(spikes),totalSpikes:spikes.reduce((a,b)=>a+b,0),gapA:Number(document.getElementById("gapA").value)/100,gapB:Number(document.getElementById("gapB").value)/100,gapC:Number(document.getElementById("gapC").value)/100,A:why.A,B:why.B,delta:why.delta,interpretation:why.reason,unknown:"Model contribution contrast does not establish biological causal mechanism",scaleNm:"symbolic 0.2",address:WHY_ADDRESS};
 try{append103("C_OBSERVE",record)}catch(e){document.getElementById("whyHistory098").textContent=e.message;return}whyHistory.push(record);if(whyHistory.length>MAX_HISTORY)whyHistory.shift();
 try{localStorage.setItem(WHY_KEY,JSON.stringify(whyHistory))}catch(e){document.getElementById("whyHistory098").textContent="HOLD: history storage unavailable "+e.message;return}
 const view=whyHistory.slice(-7).map(v=>"t"+v.tick+" | spikes "+v.totalSpikes+" | Δ "+v.delta.toFixed(5)+" | "+v.interpretation);
 document.getElementById("whyHistory098").textContent=view.join("\n")+"\n\nNOT INFERRED: "+record.unknown;
}

// CUBI 103: diodic Gap C journal; 10-slot phase ring C1 C2 C3 ×3 then C1.
// Separate journal so no historical WHY observation is overwritten.
const C103_KEY="cubi.gapc.diodic103.v1",C103_PHASES=["C1","C2","C3","C1","C2","C3","C1","C2","C3","C1"];
let chain103=[];let chainFault103=null;
try{const loaded=JSON.parse(localStorage.getItem(C103_KEY)||"[]");if(!Array.isArray(loaded))throw Error("invalid journal");chain103=loaded;
 for(let i=0;i<chain103.length;i++){const e=chain103[i];if(e.seq!==i+1||e.phase!==C103_PHASES[i%10]||e.parent!==(i?chain103[i-1].seq:0))throw Error("diodic continuity fault at "+i)}
}catch(e){chainFault103=e.message}
function append103(kind,payload){
 if(chainFault103)throw Error("DIODIC HOLD: "+chainFault103);
 const seq=chain103.length+1,record={seq,parent:seq-1,phase:C103_PHASES[(seq-1)%10],kind,modelTick:tick,payload:JSON.parse(JSON.stringify(payload))};
 // Append and persist the entire unchanged prefix; never rotate or discard this journal.
 witness104("C_"+kind,{phase:record.phase,seq:record.seq});const extended=chain103.concat([record]);localStorage.setItem(C103_KEY,JSON.stringify(extended));chain103=extended;return record;
}
function recoveryState103(){
 const last=[...chain103].reverse().find(x=>x.kind==="RECOVERY_SAVED"||x.kind==="RECOVERY_RESTORED");
 if(last?.kind==="RECOVERY_RESTORED")return null;
 return last?.payload??null;
}
if(chain103.length)tick=Math.max(tick,chain103.at(-1).modelTick+1);
const restored103=recoveryState103();
if(restored103){recovery102=restored103.recovery;trial101=restored103.trial;document.getElementById("gapA").value=restored103.appliedA;document.getElementById("gapB").value=restored103.appliedB;}

// CUBI 104 — global diodic ceiling: symbolic layer-one boundary, not a physical length.
const FLOOR104={expression:"{{n}}^{{n}}x1.61658^10",base:1.61658,exponent:10,plane:1,scalar:0,mode:"upper-ceiling-of-layer-1"};
const FLOOR104_KEY="cubi.diodic104.events.v1";
let floor104=[];let floor104Fault=null;
try{const prior=JSON.parse(localStorage.getItem(FLOOR104_KEY)||"[]");if(!Array.isArray(prior))throw Error("invalid global journal");
 floor104=prior;for(let i=0;i<prior.length;i++)if(prior[i].seq!==i+1||prior[i].parent!==i||prior[i].floor!==FLOOR104.expression)throw Error("global sequence fault "+i);
}catch(e){floor104Fault=e.message}
function witness104(type,data){
 if(floor104Fault)throw Error("GLOBAL DIODIC HOLD: "+floor104Fault);
 const event={seq:floor104.length+1,parent:floor104.length,floor:FLOOR104.expression,phase:C103_PHASES[floor104.length%10],type,tick,payload:JSON.parse(JSON.stringify(data))};
 localStorage.setItem(FLOOR104_KEY,JSON.stringify([...floor104,event]));floor104.push(event);return event;
}

// CUBI 105: symbolic register distances; no physical units are inferred.
const DIST105={base:"1.161658",powerBands:[4,8,10],offsetBands:[3,6,9],strideBands:[12,24,36],rule:"1 every 4",raw:"[1.161658x10^-[4/8/10]-(3/6/9)-{12 , 24 , 36}"};
function register105(col,row){return {tensor:D[col]+"."+L[row],column:col,row,scalar:0,base:DIST105.base,exponent:DIST105.powerBands[row],offset:DIST105.offsetBands[col],stride:DIST105.strideBands[row],expression:"1.161658×10^(-"+DIST105.powerBands[row]+") - "+DIST105.offsetBands[col]+" - {"+DIST105.strideBands[row]+"}",interpretation:"symbolic address, not calibrated distance"}}
function renderSpacing105(){document.getElementById("distance105").textContent="SCALAR ZERO / NINE DISTANCE REGISTERS\n"+DIST105.raw+"\n"+Array.from({length:3},(_,row)=>Array.from({length:3},(_,col)=>register105(col,row).tensor+": "+register105(col,row).expression).join(" | ")).join("\n")+"\nBand indexing only. No numerical length-unit assumptions."}
window.CUBI106_SOURCE=()=>({tick,delta:why.delta,A:why.A,B:why.B,spikes:Array.from(spikes)});
const v=new Float32Array(NUM),next=new Float32Array(NUM),spikes=new Uint32Array(9),fired=new Uint8Array(NUM);
for(let n=0;n<NUM;n++)v[n]=Math.sin(n*12.9898)*.09;
const idx=(node,z,x,y)=>node*COUNT+z*25+y*5+x;
function step(){const a=Number(document.getElementById("gapA").value)/100,b=Number(document.getElementById("gapB").value)/100;
spikes.fill(0);let sumA=0,sumB=0;
for(let node=0;node<9;node++)for(let z=0;z<5;z++)for(let y=0;y<5;y++)for(let x=0;x<5;x++){
 const i=idx(node,z,x,y),self=v[i],right=v[idx(node,z,(x+1)%5,y)],left=v[idx(node,z,(x+4)%5,y)],up=v[idx(node,z,x,(y+4)%5)],down=v[idx(node,z,x,(y+1)%5)],prev=v[idx(node,(z+4)%5,x,y)],other=v[idx(node,(z+1)%5,x,y)];
 const A=(right+down+other)/3,B=(left+up+prev)/3;sumA+=Math.abs(a*.33*A);sumB+=Math.abs(b*.30*B);
 const stimulus=impulse>0&&node===4&&z===0&&x===2&&y===2?1.1:0;
 const drive=.87*self+a*.33*A-b*.30*B+stimulus+.009*Math.sin(tick*.18+node+z*3);
 const fire=drive>.72;next[i]=fire?-.25:Math.max(-1,Math.min(1,drive));fired[i]=fire?1:0;if(fire)spikes[node]++;
}v.set(next);const c=Number(document.getElementById("gapC").value)/100;const delta=(sumA-sumB)/NUM;why={A:sumA/NUM,B:sumB/NUM,delta,reason:c===0?"C DISABLED":Math.abs(delta)<.0001?"BALANCED":delta>0?"A-DOMINANT EXCITATION":"B-DOMINANT INHIBITION",confidence:c};if(impulse>0)impulse--;tick++;if(tick%10===0&&tick!==lastObservation){lastObservation=tick;observe098()}}
function render(){const r=canvas.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);if(canvas.width!==Math.round(r.width*dpr)||canvas.height!==Math.round(r.height*dpr)){canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr)}
ctx.setTransform(dpr,0,0,dpr,0,0);const w=r.width,h=r.height;ctx.clearRect(0,0,w,h);
const cw=w/3,ch=(h-28)/3,scale=Math.min(cw/8.3,ch/8.5);
for(let row=0;row<3;row++)for(let col=0;col<3;col++){
const node=col*3+row,cx=(col+.5)*cw,cy=(row+.5)*ch;
ctx.strokeStyle="#284766";ctx.strokeRect(col*cw+6,row*ch+5,cw-12,ch-10);
ctx.textAlign="center";ctx.fillStyle="#bedcf3";ctx.font="12px monospace";ctx.fillText(D[col]+"."+L[row]+"   "+spikes[node]+" spikes",cx,row*ch+18);
for(let z=0;z<5;z++){const ox=(z-2)*scale*.4,oy=(z-2)*scale*.43;for(let y=0;y<5;y++)for(let x=0;x<5;x++){
const i=idx(node,z,x,y),px=cx+(x-2)*scale+ox,py=cy+(y-2)*scale+oy+4,intensity=Math.max(0,v[i]),rN=fired[i]?scale*.24:scale*(.105+intensity*.08);
ctx.beginPath();ctx.arc(px,py,rN,0,Math.PI*2);ctx.fillStyle=fired[i]?"#fff":row===0?"#ffa96b":row===1?"#61e7f6":"#bb8aff";ctx.globalAlpha=fired[i]?1:.17+intensity*.72;ctx.fill();}}
ctx.globalAlpha=1;ctx.strokeStyle="#57bed55c";ctx.beginPath();ctx.ellipse(cx,cy,scale*3.45,scale*2.6,0,0,Math.PI*2);ctx.stroke();}
stats.textContent="GAP C WHY ["+why.reason+"] 0.2 nm reference | "+WHY_ADDRESS+" symbolic | A contribution "+why.A.toFixed(5)+" | B contribution "+why.B.toFixed(5)+" | Δ "+why.delta.toFixed(5)+" | observation weight "+why.confidence+"\nACTIVE MODEL | tick "+tick+" | 9 tensor × 125 active = "+NUM+" simulated neurons | symbolic full address capacity: 9 × 25^5 = 87,890,625 | Gap A="+document.getElementById("gapA").value+"% Gap B="+document.getElementById("gapB").value+"% | total spikes "+spikes.reduce((a,b)=>a+b,0);}
renderSpacing105();let then=0;function frame(now){if(running&&now-then>30){step();then=now}render();requestAnimationFrame(frame)}requestAnimationFrame(frame);
document.getElementById("neuronRun").onclick=e=>{running=!running;e.target.textContent=running?"Pause neural field":"Resume neural field"};
document.getElementById("neuronPulse").onclick=()=>{try{witness104("STIMULUS",{neuron:"CH.id",durationTicks:7});impulse=7}catch(e){document.getElementById("whyHistory098").textContent=e.message}};
document.getElementById("floor104").onclick=()=>{document.getElementById("whyHistory098").textContent=JSON.stringify({floor:FLOOR104,events:floor104.length,nextPhase:C103_PHASES[floor104.length%10],fault:floor104Fault||"NONE"},null,2)};
document.getElementById("audit103").onclick=()=>{document.getElementById("whyHistory098").textContent=chainFault103?"DIODIC HOLD "+chainFault103:"CUBI 103 journal "+chain103.length+" entries\nNEXT "+C103_PHASES[chain103.length%10]+"\n"+chain103.slice(-10).map(x=>x.seq+" "+x.phase+" "+x.kind+" tick "+x.modelTick).join("\n")};
document.getElementById("export103").onclick=()=>{const blob=new Blob([JSON.stringify({schema:"CUBI103",sequence:C103_PHASES,events:chain103},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="cubi-diodic-c-journal.json";a.click();URL.revokeObjectURL(a.href)};
document.getElementById("restore102").onclick=()=>{
 if(!recovery102||recovery102.restored){document.getElementById("whyHistory098").textContent="RECOVERY HOLD: no pending reversible adjustment";return}
 const audit=stability101();if(audit.status!=="DIVERGING"){document.getElementById("whyHistory098").textContent="RECOVERY HOLD: divergence not observed; "+audit.status;return}
 if(!confirm("Restore previous Gap A/B controls? Neuron state and observations are retained."))return;try{append103("RECOVERY_RESTORED",{trial:trial101,prior:recovery102,audit})}catch(e){document.getElementById("whyHistory098").textContent=e.message;return}
 document.getElementById("gapA").value=Math.round(recovery102.A*100);document.getElementById("gapB").value=Math.round(recovery102.B*100);
 recovery102.restored=true;trial101=null;proposal100=null;
 document.getElementById("whyHistory098").textContent="CUBI 102 RESTORED A="+recovery102.A.toFixed(2)+" B="+recovery102.B.toFixed(2)+" after "+audit.status+" at model tick "+tick+"; prior WHY observations preserved.";
};
document.getElementById("stability101").onclick=()=>{document.getElementById("whyHistory098").textContent=JSON.stringify(stability101(),null,2)};
document.getElementById("compare100").onclick=()=>{try{compare100()}catch(e){document.getElementById("whyHistory098").textContent="COMPARE HOLD: "+e.message}};
document.getElementById("apply100").onclick=()=>{if(!proposal100){document.getElementById("whyHistory098").textContent="HOLD: compare first";return}if(!confirm("Apply model-only Gap A/B feedback?"))return;recovery102={A:proposal100.oldA,B:proposal100.oldB,atTick:tick,sourceMemory:proposal100.sourceMemory,restored:false};trial101={startTick:tick,baseline:Math.abs(whyHistory.at(-1)?.delta??0),sourceMemory:proposal100.sourceMemory};try{append103("RECOVERY_SAVED",{recovery:recovery102,trial:trial101,appliedA:Math.round(proposal100.A*100),appliedB:Math.round(proposal100.B*100)})}catch(e){recovery102=null;trial101=null;document.getElementById("whyHistory098").textContent=e.message;return}document.getElementById("gapA").value=Math.round(proposal100.A*100);document.getElementById("gapB").value=Math.round(proposal100.B*100);document.getElementById("whyHistory098").textContent="Applied bounded feedback from memory #"+proposal100.sourceMemory+"; original memory unchanged.";proposal100=null};
document.getElementById("bind099").onclick=async()=>{const r=whyHistory.at(-1);if(!r){document.getElementById("whyHistory098").textContent="HOLD: no observation";return}try{if(!window.CUBI099)throw Error("Memory binding unavailable");await window.CUBI099.bind(r,"CH");document.getElementById("whyHistory098").textContent="Bound original neuron tick "+r.tick+" to CH.L0; agent cycle may inherit it."}catch(e){document.getElementById("whyHistory098").textContent="BIND HOLD: "+e.message}};
document.getElementById("whyExport098").onclick=()=>{const blob=new Blob([JSON.stringify({schema:"CUBI098",observations:whyHistory},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="cubi-gapc-why-history.json";a.click();URL.revokeObjectURL(a.href)};
document.getElementById("whyClear098").onclick=()=>{if(!confirm("Clear only the local WHY history? Original tensor memories are unaffected."))return;whyHistory=[];lastObservation=-1;localStorage.removeItem(WHY_KEY);document.getElementById("whyHistory098").textContent="WHY history cleared"};
document.getElementById("neuronReset").onclick=()=>{try{witness104("RESET",{reason:"user requested reset",priorTick:tick})}catch(e){document.getElementById("whyHistory098").textContent=e.message;return}v.fill(0);next.fill(0);fired.fill(0);spikes.fill(0);impulse=0;tick=0};
})();