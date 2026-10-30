// CUBI 108 — independently evolved left/center/right RGB neural fields.
(()=>{"use strict";
const NODES=9,PER=125,REG=[{id:"L",hemisphere:"LH",color:"blue"},{id:"C",hemisphere:"CH",color:"green"},{id:"R",hemisphere:"RH",color:"red"}];
const fields=REG.map((r,k)=>({ ...r,tick:0,voltage:Float32Array.from({length:NODES*PER},(_,i)=>.08*Math.sin((i+1)*(k+3)*.61)),next:new Float32Array(NODES*PER),last:{residual:0,spikes:0,A:0,B:0},stimulus:0}));
function update(f,k){
 const a=Number(document.getElementById("gapA")?.value??40)/100,b=Number(document.getElementById("gapB")?.value??25)/100;
 let sumA=0,sumB=0,spikes=0;
 for(let n=0;n<NODES;n++)for(let z=0;z<5;z++)for(let y=0;y<5;y++)for(let x=0;x<5;x++){
 const i=n*PER+z*25+y*5+x,base=n*PER+z*25;
 const right=f.voltage[base+y*5+(x+1)%5],down=f.voltage[base+((y+1)%5)*5+x];
 const left=f.voltage[base+y*5+(x+4)%5],up=f.voltage[base+((y+4)%5)*5+x];
 const other=f.voltage[n*PER+((z+1)%5)*25+y*5+x];
 const A=(right+down+other)/3,B=(left+up)/2;
 sumA+=Math.abs(a*A*.33);sumB+=Math.abs(b*B*.30);
 const drive=.87*f.voltage[i]+a*.33*A-b*.30*B+.01*Math.sin(f.tick*.19+i*.04+k*1.7)+(f.stimulus&&n===4&&z===0&&x===2&&y===2?1.1:0);
 const fire=drive>.72;spikes+=Number(fire);f.next[i]=fire?-.25:Math.max(-1,Math.min(1,drive));
 }
 f.voltage.set(f.next);f.tick++;f.stimulus=0;f.last={residual:(sumA-sumB)/(NODES*PER),spikes,A:sumA/(NODES*PER),B:sumB/(NODES*PER)};
}
// CUBI 111: frame-budgeted hot loop; browsers JIT-compile hot update() naturally.
let running=true,lastFrame=0,frames=0,lastStepMs=0,loopFault=null;
function frame(now){
 if(running&&now-lastFrame>=50){
  const start=performance.now();
  try{fields.forEach(update);frames++}catch(e){loopFault=e.message;running=false}
  lastStepMs=performance.now()-start;lastFrame=now;
 }
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.CUBI108={
 observe(){return fields.map(f=>({registry:f.id,hemisphere:f.hemisphere,color:f.color,laneIn:"ff",laneOut:"rr",residual:f.last.residual,sourceTick:f.tick,source:"Independent RGB neural field CUBI108",spikes:f.last.spikes,contributionA:f.last.A,contributionB:f.last.B,interpretation:"Distinct simulation buffer and dynamics per registry; shared A/B controls; no biological inference"}))},
 status(){return {running,frames,lastStepMs,loopFault,fields:fields.map(f=>({registry:f.id,tick:f.tick,neurons:f.voltage.length,...f.last}))}},
 stimulate(id){const f=fields.find(x=>x.id===id);if(!f)throw Error("invalid registry");f.stimulus=1},
 pause(){running=!running;return running}
};
})();