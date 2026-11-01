// CUBI180: open-system 1D wave pulse, lossy sponge walls, empty-stack control.
(()=>{"use strict";const root=document.getElementById("open180");if(!root)return;
const pattern="..||..|...||"+"||"+"||...|..||..";
function simulate(withStack){const N=900,dt=.25,steps=3000,begin=280,w=12,src=120,off=190;
const eps=new Float64Array(N).fill(1),damp=new Float64Array(N);
if(withStack)for(let k=0;k<26;k++)for(let j=0;j<w;j++)eps[begin+k*w+j]=pattern[k]==="|"?2.25:1;
for(let i=0;i<N;i++){const dist=Math.min(i,N-1-i);if(dist<110)damp[i]=.085*((110-dist)/110)**2}
let old=new Float64Array(N),now=new Float64Array(N),next=new Float64Array(N),samples=[];
const mid=begin+12*w,centralEnd=mid+2*w;
function energy(a,b,lo,hi){let e=0;for(let i=Math.max(1,lo);i<Math.min(N-1,hi);i++){const v=(a[i]-b[i])/dt,gr=a[i+1]-a[i];e+=.5*(eps[i]*v*v+gr*gr)}return e}
for(let t=0;t<steps;t++){for(let i=1;i<N-1;i++){const d=damp[i]*dt,n=(2*now[i]-(1-d/2)*old[i]+dt*dt/eps[i]*(now[i+1]-2*now[i]+now[i-1]))/(1+d/2);next[i]=n}
if(t<off){const drive=Math.sin(2*Math.PI*t/24)*Math.exp(-.5*((t-95)/39)**2);next[src]+=dt*dt*drive}next[0]=next[1];next[N-1]=next[N-2];
[old,now,next]=[now,next,old];
if(t%60===0||t===steps-1)samples.push({step:t,central:energy(now,old,mid,centralEnd),structure:energy(now,old,begin,begin+26*w),total:energy(now,old,1,N-1)})}
return {samples,sourceOff:off,withStack}}
function test(){const stack=simulate(true),control=simulate(false),pairs=stack.samples.map((s,i)=>({step:s.step,stackCentral:s.central,controlCentral:control.samples[i].central,stackStructure:s.structure,controlStructure:control.samples[i].structure,stackTotal:s.total,controlTotal:control.samples[i].total}));let tail=pairs.filter(p=>p.step>900),retention=tail.reduce((v,p)=>v+p.stackCentral,0),reference=tail.reduce((v,p)=>v+p.controlCentral,0);return {status:"NUMERICAL_EXPERIMENT_UNVALIDATED",sourceOff:190,absorbingWalls:"GRADUATED_SPONGE_WITH_PARTIAL_REFLECTION_NOT_PERFECT_PML",centralLateEnergyIntegral:retention,emptyLateEnergyIntegral:reference,enhancementRatio:reference>1e-20?retention/reference:null,lateEnergyComparison:retention>reference?"STRUCTURE_LARGER":"CONTROL_LARGER_OR_EQUAL",causalDwellTime:"NOT_ESTABLISHED",samples:pairs,warning:"Finite buffer, sponge quality, convergence and dependence on observation window must be tested before any confinement claim."}}
root.innerHTML='<h2>CUBI 180 · OPEN BOUNDARY / EMPTY CONTROL</h2><p>Two identical finite-pulse simulations: with 26 cells vs empty; damped outer sponge replaces reflective outer walls.</p><button id="run180">Execute dual 3000-step runs</button><pre id="out180"></pre>';function go(){try{const r=test();document.getElementById("out180").textContent=JSON.stringify({...r,samples:r.samples.filter((x,i)=>i%5===0)},null,2)}catch(e){document.getElementById("out180").textContent="HOLD: "+e.message}}document.getElementById("run180").onclick=go;go();window.CUBI180=Object.freeze({test});
})();