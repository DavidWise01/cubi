// CUBI 153 — one-worldline symbolic kernel operator, NOT established particle physics.
(()=>{"use strict";
const host=document.getElementById("worldline153");if(!host)return;
host.innerHTML='<h2>CUBI 153 · ONE WORLDLINE / TEN CROSSINGS</h2><p>{{aether}} · .1.2 |34| 56 .7.8 |910| · symbolic Wheeler hypothesis</p><button id="step153">Advance one crossing</button> <button id="cycle153">Observe full ten-crossing cycle</button><pre id="out153">Awaiting observation.</pre>';
const output=document.getElementById("out153"),KEY="cubi.worldline153.observations.v1";
const cells=[{n:1,group:".1.2",dir:1},{n:2,group:".1.2",dir:1},{n:3,group:"|34|",dir:-1},{n:4,group:"|34|",dir:-1},{n:5,group:"56",dir:1},{n:6,group:"56",dir:1},{n:7,group:".7.8",dir:1},{n:8,group:".7.8",dir:1},{n:9,group:"|910|",dir:-1},{n:10,group:"|910|",dir:-1}];
function classify(x){return {crossing:x.n,cluster:x.group,worldline:"W153:ONE",timeOrientation:x.dir,appearance:x.dir===1?"electron_analogy":"positron_analogy",center:x.n===5||x.n===6?"HEART_CROSSING":null,substrate:"{{aether}}",modelStatus:"HYPOTHESIS_ONLY"}}
function load(){try{const value=JSON.parse(localStorage.getItem(KEY)||"[]");if(!Array.isArray(value)||value.some((x,i)=>x.index!==i+1||x.crossing!==((i%10)+1)))throw Error("History discontinuity");return value}catch(e){throw Error("HOLD: stored continuity cannot be verified")}}
function append(count){const existing=load(),next=existing.slice();for(let i=0;i<count;i++){const record=classify(cells[next.length%10]);next.push({...record,index:next.length+1,parent:next.at(-1)?.index||null,door:"CLOSED"})}localStorage.setItem(KEY,JSON.stringify(next));const verified=load();return {status:verified.length===next.length?"RECORDED":"HOLD",total:verified.length,latest:verified.slice(-Math.min(count,10)),note:"Software simulation only. No claim that all real electrons are one particle."}}
for(const [id,n] of [["step153",1],["cycle153",10]])document.getElementById(id).onclick=()=>{try{output.textContent=JSON.stringify(append(n),null,2)}catch(e){output.textContent=e.message}};
window.CUBI153=Object.freeze({cells:cells.map(classify),classify});
})();