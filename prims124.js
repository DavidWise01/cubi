// CUBI 124 — isolated primitive descriptors, no implicit execution.
(()=>{"use strict";
const PRIMS=Object.freeze({
 BOX:Object.freeze({symbol:"[]",power:4,role:"DATA"}),
 TOROID:Object.freeze({symbol:"()",power:3,role:"TOOL"}),
 BRACE:Object.freeze({symbol:"{n}",power:"n",role:"SCOPE",expression:"{n}^{n}"})
});
const freeze=x=>Object.freeze(x);
const box=data=>freeze({kind:"BOX",primitive:"[]^4",data});
const toroid=name=>freeze({kind:"TOROID",primitive:"()^3",name:String(name)});
const brace=(data,tool)=>freeze({kind:"BRACE",primitive:"{n}^{n}",data,tool,executed:false});
function describe(node){if(!node||!["BOX","TOROID","BRACE"].includes(node.kind))throw Error("Unknown primitive");return {kind:node.kind,executed:node.executed===true}}
window.CUBI124=freeze({PRIMS,box,toroid,brace,describe,rule:"containment is not execution; data remains data; tools remain tools"});
const host=document.getElementById("prims124");if(host){host.innerHTML='<h2>PRIMITIVE ISOLATION · CUBI 124</h2><pre>[]^4  BOX · data\n()^3  TOROID · tool\n{n}^{n}  BRACE · scope\n\nContainment ≠ execution · Permutation ≠ transformation</pre>'}
})();