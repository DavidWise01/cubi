// CUBI179: 1D acoustic-equivalent lossless wave FDTD, pulse then observe leakage.
// This is a numerical surrogate; it does not instantiate physical gravity manifolds.
(()=>{"use strict";const root=document.getElementById("pulse179");if(!root)return;
const pattern="..||..|...||"+"||"+"||...|..||..";
function test(){const N=800,dx=1,dt=.25,steps=2400,begin=270,width=8,layerWidth=12,epsilon=new Float64Array(N).fill(1);for(let k=0;k<26;k++)for(let j=0;j<layerWidth;j++){let x=begin+k*layerWidth+j;epsilon[x]=(pattern[k]==="|"?1.5:1)**2}
let prev=new Float64Array(N),curr=new Float64Array(N),next=new Float64Array(N);const source=100,pulseEnd=180;let energyAtOff=0,energyAtEnd=0,maxCentral=0,samples=[],lastPulse=false;const centralLo=begin+12*layerWidth,centralHi=centralLo+2*layerWidth;
function totalEnergy(a,b){let sum=0;for(let i=1;i<N-1;i++){let velocity=(a[i]-b[i])/dt,grad=a[i+1]-a[i];sum+=.5*(epsilon[i]*velocity*velocity+grad*grad)}return sum}
function centerEnergy(a,b){let sum=0;for(let i=centralLo;i<centralHi;i++){let v=(a[i]-b[i])/dt,g=a[i+1]-a[i];sum+=.5*(epsilon[i]*v*v+g*g)}return sum}
for(let t=0;t<steps;t++){let input=t<pulseEnd?Math.sin(2*Math.PI*t/22)*Math.exp(-.5*((t-90)/35)**2):0;
for(let i=1;i<N-1;i++)next[i]=2*curr[i]-prev[i]+dt*dt/epsilon[i]*(curr[i+1]-2*curr[i]+curr[i-1]);next[source]+=input*dt*dt;
next[0]=next[1];next[N-1]=next[N-2];[prev,curr,next]=[curr,next,prev];
if(t===pulseEnd)energyAtOff=totalEnergy(curr,prev);
if(t%100===0||t===steps-1){const center=centerEnergy(curr,prev),energy=totalEnergy(curr,prev);maxCentral=Math.max(maxCentral,center);samples.push({step:t,totalEnergy:energy,centralEnergy:center,centralFraction:energy>0?center/energy:0})}
if(t===steps-1)energyAtEnd=totalEnergy(curr,prev)}
return {structure:pattern,steps,sourceOffStep:pulseEnd,pulseWasFinite:true,centralMaxObserved:maxCentral,energyAtOff,energyAtEnd,remainingFraction:energyAtOff>0?energyAtEnd/energyAtOff:null,samples,method:"FDTD scalar wave with reflecting outer walls",interpretation:"Outer boundaries reflect; persistent global energy is a box artifact, NOT light trapping. Center behavior must be read from samples. No physical time units.",confinement:"NOT_VERIFIED"}}
root.innerHTML='<h2>CUBI 179 · FINITE PULSE / SOURCE OFF</h2><p>Time-domain scalar wave simulation. Reflecting simulation-box boundaries are disclosed.</p><button id="run179">Execute 2400 steps</button><pre id="out179"></pre>';function go(){try{const r=test();document.getElementById("out179").textContent=JSON.stringify(r,null,2)}catch(e){document.getElementById("out179").textContent="HOLD "+e.message}}document.getElementById("run179").onclick=go;go();window.CUBI179=Object.freeze({test});
})();