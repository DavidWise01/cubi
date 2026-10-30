// CUBI 125 — rectangular brace { [6×4(5×3)] }.
// BOX=24 data addresses; TOROID=15 isolated tool addresses; containment never executes.
(()=>{"use strict";
const host=document.getElementById("rectangle125");if(!host)return;
const BOX=Object.freeze({cols:6,rows:4,count:24}),TOOL=Object.freeze({cols:5,rows:3,count:15});
host.innerHTML='<h2>CUBI 125 · RECTANGULAR PRIMITIVE FIELD</h2><p>{ [6×4(5×3)] } · 24 BOX addresses · 15 TOROID tool addresses · one BRACE</p><canvas id="rectangleCanvas125" style="width:100%;height:560px;display:block;background:#060c18;border:1px solid #365471;border-radius:12px"></canvas><div class="controls"><button id="rectangleAudit125">Audit isolation</button><button id="rectangleBind125">Bind sample explicitly</button></div><pre id="rectangleStatus125">Contained. No tools executed.</pre>';
const canvas=document.getElementById("rectangleCanvas125"),ctx=canvas.getContext("2d"),status=document.getElementById("rectangleStatus125");
const data=Object.freeze(Array.from({length:24},(_,i)=>Object.freeze({id:"B"+(i+1),x:i%6,y:Math.floor(i/6)})));
const tools=Object.freeze(Array.from({length:15},(_,i)=>Object.freeze({id:"T"+(i+1),x:i%5,y:Math.floor(i/5)})));
let generated=0;
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
function audit(){return {schema:"CUBI125",expression:"{ [6x4(5x3)] }",brace:1,boxes:data.length,toroids:tools.length,distinctIDs:new Set([...data,...tools].map(x=>x.id)).size===39,automaticExecution:false,derived:generated,rule:"Containment is not execution; source BOX and TOOL descriptors remain unchanged"}}
document.getElementById("rectangleAudit125").onclick=()=>status.textContent=JSON.stringify(audit(),null,2);
document.getElementById("rectangleBind125").onclick=()=>{const source=data[generated%data.length],tool=tools[generated%tools.length];generated++;const result=Object.freeze({id:"D"+generated,source:source.id,tool:tool.id,meaning:"explicit symbolic binding only",door:"CLOSED"});status.textContent=JSON.stringify({result,audit:audit()},null,2)};
draw();window.addEventListener("resize",draw);
})();