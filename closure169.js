// CUBI 169 — mathematics transcribed from user-provided React HTML.
(()=>{"use strict";
const root=document.getElementById("closure169");if(!root)return;
const HALOS=[184,268,368,488,632,800,1000];
const BASE=[179,263,363,483,627,795,995];
const GAPS=[8,8,18,18,32,32,66,84,100,120,144,168,200];
const radius=n=>250+1.35*n;
const simplex=d=>({dimension:d,vertices:d+1,edges:d*(d+1)/2});
function audit(){return {closure:995+5===1000,halos:HALOS.every((n,i)=>BASE[i]+5===n),haloRadii:HALOS.map(radius),gaps:GAPS,gapSum:GAPS.reduce((a,b)=>a+b,0),simplex:Array.from({length:8},(_,i)=>simplex(i+3)),spiralSamples:13930,physicalClaim:"UNVERIFIED"}}
root.innerHTML='<h2>CUBI 169 · MILLENNIUM CLOSURE</h2><p>995+5=1000 · nested halos · 3D–10D simplex</p><label>Dimension <input id="dim169" type="range" min="3" max="10" value="10"></label><button id="audit169">Audit imported mathematics</button><canvas id="cv169" width="640" height="320" style="max-width:100%;background:#070e1c"></canvas><pre id="out169"></pre>';
const ctx=document.getElementById("cv169").getContext("2d");
function draw(){let d=+document.getElementById("dim169").value,n=d+1;ctx.clearRect(0,0,640,320);ctx.strokeStyle="#a68c58";for(const h of HALOS){ctx.beginPath();ctx.ellipse(320,160,radius(h)*.15,radius(h)*.085,0,0,Math.PI*2);ctx.stroke()}const points=Array.from({length:n},(_,i)=>{let t=i*2*Math.PI/n;return [320+60*Math.cos(t),160+60*Math.sin(t)]});ctx.strokeStyle="#61c9e8";for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){ctx.beginPath();ctx.moveTo(...points[i]);ctx.lineTo(...points[j]);ctx.stroke()}document.getElementById("out169").textContent=JSON.stringify(simplex(d),null,2)}
document.getElementById("dim169").oninput=draw;document.getElementById("audit169").onclick=()=>document.getElementById("out169").textContent=JSON.stringify(audit(),null,2);draw();
window.CUBI169=Object.freeze({audit,simplex,radius});
})();