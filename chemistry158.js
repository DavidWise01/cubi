// CUBI 158: hydrogen through oganesson, idealized Aufbau/Pauli baseline.
// Does NOT derive real electron structure from toroidal address geometry.
(()=>{"use strict";const root=document.getElementById("chem158");if(!root)return;
root.innerHTML='<h2>CUBI 158 · H → Og (Z=118)</h2><p>24 geometry addresses ≠ 118 orbital states. Idealized Aufbau filling; known configuration exceptions and relativistic effects are not resolved.</p><label>Atomic number <input id="z158" type="range" min="1" max="118" value="118"></label> <button id="run158">Audit all 118</button><pre id="out158"></pre>';
const symbols="H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(" ");
const letters="spdf";const subs=[];for(let n=1;n<=7;n++)for(let l=0;l<Math.min(n,4);l++)subs.push({n,l,capacity:2*(2*l+1)});
subs.sort((a,b)=>(a.n+a.l)-(b.n+b.l)||a.n-b.n);
const ORBS=[];for(const o of subs){for(let m=-o.l;m<=o.l;m++)for(const spin of [1,-1])ORBS.push({n:o.n,l:o.l,m,spin,key:[o.n,o.l,m,spin].join(":")})}
const total=ORBS.length; // enough to cover Z=118
const exceptions=new Set([24,29,41,42,44,45,46,47,57,58,64,78,79,89,90,91,92,93,96,103]);
function configuration(z){let rem=z;const parts=[];for(const s of subs){if(!rem)break;const k=Math.min(s.capacity,rem);if(k)parts.push(s.n+letters[s.l]+k);rem-=k}return parts.join(" ")}
function inspect(z){const occupied=ORBS.slice(0,z),unique=new Set(occupied.map(x=>x.key)).size===z;return {Z:z,symbol:symbols[z-1],states:occupied.length,pauli:unique,configuration_Aufbau:configuration(z),configurationStatus:exceptions.has(z)?"KNOWN_OR_POTENTIAL_EXCEPTION":"IDEALIZED_NOT_VALIDATED",toroidAddresses:24,proposedMapping:"UNDERDETERMINED",conclusion:"NO_DERIVATION_OF_PARTICLE_IDENTITY"}}
function audit(){const rows=Array.from({length:118},(_,i)=>inspect(i+1));return {status:rows.every(x=>x.pauli&&x.states===x.Z)&&symbols.length===118?"PASS_IDEALIZED_OCCUPANCY":"HOLD",elements:rows.length,availableSpinOrbitals:total,flaggedExceptions:rows.filter(x=>exceptions.has(x.Z)).map(x=>x.symbol),note:"This checks distinct labels and nominal capacities, not measured atomic spectra, Hund's rule ordering, detailed relativistic chemistry or the one-electron conjecture."}}
const input=document.getElementById("z158"),out=document.getElementById("out158");input.oninput=()=>out.textContent=JSON.stringify(inspect(Number(input.value)),null,2);document.getElementById("run158").onclick=()=>out.textContent=JSON.stringify(audit(),null,2);input.oninput();
window.CUBI158=Object.freeze({inspect,audit});
})();