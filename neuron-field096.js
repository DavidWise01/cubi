// CUBI 096 · 9 tensor × (5 layers × 5 × 5) active representative neurons.
(()=>{"use strict";
const host=document.getElementById("neuron096");if(!host)return;
host.innerHTML='<h2>ACTIVE CORTEX · {{5×5}}^5</h2><div class="controls"><button id="neuronRun">Pause neural field</button><button id="neuronPulse">Stimulate Gap A</button><button id="neuronReset">Reset field</button></div><label>Gap A excitation <input id="gapA" type="range" min="0" max="100" value="40"></label><label>Gap B inhibition <input id="gapB" type="range" min="0" max="100" value="25"></label><label>Gap C why observer · 0.2 nm symbolic reference <input id="gapC" type="range" min="0" max="100" value="50"></label><canvas id="neuronFloor" style="width:100%;height:530px;background:#050d1a;border:1px solid #2d536b;border-radius:12px;display:block"></canvas><pre id="neuronStatus">Initializing neurons</pre><div class="controls"><button id="whyExport098">Export WHY history</button><button id="whyClear098">Reset WHY history</button><button id="bind099">Bind latest to memory</button></div><pre id="whyHistory098">WHY history empty</pre><small>125 active neurons per tensor: 5 recursive slices of 5×5. Full 25^5 address tree is represented symbolically, not densely simulated. Gap A/B are modeled excitation/inhibition channels, not biological gap junction measurements.</small>';
const canvas=document.getElementById("neuronFloor"),ctx=canvas.getContext("2d"),stats=document.getElementById("neuronStatus");
const D=["LH","CH","RH"],L=["i","id","sid"],COUNT=125,NUM=1125;let running=true,impulse=0,tick=0;const WHY_SCALE_NM=0.2,WHY_ADDRESS="{{inf!xinf!}}^{{inf!}}";let why={A:0,B:0,delta:0,reason:"INITIAL"};
const WHY_KEY="cubi.gapc.why098.v1",MAX_HISTORY=256;
let whyHistory=[];try{const saved=JSON.parse(localStorage.getItem(WHY_KEY)||"[]");if(Array.isArray(saved))whyHistory=saved.slice(-MAX_HISTORY)}catch(e){}
let lastObservation=-1;
function observe098(){
 const record={tick,sourceNode:D[1]+"."+L[1],spikes:Array.from(spikes),totalSpikes:spikes.reduce((a,b)=>a+b,0),gapA:Number(document.getElementById("gapA").value)/100,gapB:Number(document.getElementById("gapB").value)/100,gapC:Number(document.getElementById("gapC").value)/100,A:why.A,B:why.B,delta:why.delta,interpretation:why.reason,unknown:"Model contribution contrast does not establish biological causal mechanism",scaleNm:"symbolic 0.2",address:WHY_ADDRESS};
 whyHistory.push(record);if(whyHistory.length>MAX_HISTORY)whyHistory.shift();
 try{localStorage.setItem(WHY_KEY,JSON.stringify(whyHistory))}catch(e){document.getElementById("whyHistory098").textContent="HOLD: history storage unavailable "+e.message;return}
 const view=whyHistory.slice(-7).map(v=>"t"+v.tick+" | spikes "+v.totalSpikes+" | Δ "+v.delta.toFixed(5)+" | "+v.interpretation);
 document.getElementById("whyHistory098").textContent=view.join("\n")+"\n\nNOT INFERRED: "+record.unknown;
}
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
let then=0;function frame(now){if(running&&now-then>30){step();then=now}render();requestAnimationFrame(frame)}requestAnimationFrame(frame);
document.getElementById("neuronRun").onclick=e=>{running=!running;e.target.textContent=running?"Pause neural field":"Resume neural field"};
document.getElementById("neuronPulse").onclick=()=>{impulse=7};
document.getElementById("bind099").onclick=async()=>{const r=whyHistory.at(-1);if(!r){document.getElementById("whyHistory098").textContent="HOLD: no observation";return}try{if(!window.CUBI099)throw Error("Memory binding unavailable");await window.CUBI099.bind(r,"CH");document.getElementById("whyHistory098").textContent="Bound original neuron tick "+r.tick+" to CH.L0; agent cycle may inherit it."}catch(e){document.getElementById("whyHistory098").textContent="BIND HOLD: "+e.message}};
document.getElementById("whyExport098").onclick=()=>{const blob=new Blob([JSON.stringify({schema:"CUBI098",observations:whyHistory},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="cubi-gapc-why-history.json";a.click();URL.revokeObjectURL(a.href)};
document.getElementById("whyClear098").onclick=()=>{if(!confirm("Clear only the local WHY history? Original tensor memories are unaffected."))return;whyHistory=[];lastObservation=-1;localStorage.removeItem(WHY_KEY);document.getElementById("whyHistory098").textContent="WHY history cleared"};
document.getElementById("neuronReset").onclick=()=>{v.fill(0);next.fill(0);fired.fill(0);spikes.fill(0);impulse=0;tick=0};
})();