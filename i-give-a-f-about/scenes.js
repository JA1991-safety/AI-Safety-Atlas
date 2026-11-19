/* Simple illustrated scenes, one per risk. Everything in class "dread" fades out and everything in
   class "hope" fades in as the reader scrolls past the organisations (CSS variable --p goes 0 → 1). */
const P=(x,y,c,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-26" r="7" fill="${c}"/><rect x="-7" y="-18" width="14" height="22" rx="6" fill="${c}"/></g>`;
const SKY=(d,h)=>`<rect width="400" height="300" fill="${d}"/><rect class="hope" width="400" height="300" fill="${h}"/>`;
const GROUND=(y,d,h)=>`<rect y="${y}" width="400" height="${300-y}" fill="${d}"/><rect class="hope" y="${y}" width="400" height="${300-y}" fill="${h}"/>`;
const SUN=(x=318,y=64)=>`<g class="rise"><circle class="hope" cx="${x}" cy="${y}" r="24" fill="#FFE14D"/></g>`;
const BLD=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const WIN=(x,y,cols,rows,lit,gap=14)=>{let s="";for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)s+=`<rect x="${x+c*gap}" y="${y+r*gap}" width="7" height="8" fill="${lit?'#FFD66B':'#2b2840'}"/>`;return s};
const CITY=(base=250)=>{const b=[[20,150,50],[80,120,40],[130,170,60],[200,110,45],[255,160,55],[320,130,60]];
  let dark="",lit="";b.forEach(([x,top,w])=>{dark+=BLD(x,top,w,base-top,'#3a3550')+WIN(x+8,top+10,Math.floor((w-8)/14),Math.floor((base-top-16)/14),false);lit+=WIN(x+8,top+10,Math.floor((w-8)/14),Math.floor((base-top-16)/14),true)});
  return dark+`<g class="hope">${lit}</g>`};
const FOG=`<rect class="dread" width="400" height="300" fill="url(#fog)"/>`;
const SVG=(label,body,defs="")=>`<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}"><defs><linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0a14" stop-opacity=".1"/><stop offset="1" stop-color="#0b0a14" stop-opacity=".55"/></linearGradient>${defs}</defs>${body}${FOG}</svg>`;
const T=(x,y,t,c="#fff",s=13)=>`<text x="${x}" y="${y}" font-family="JetBrains Mono,monospace" font-size="${s}" fill="${c}" font-weight="600">${t}</text>`;
const CROWD=(y,cols)=>cols.map((c,i)=>P(40+i*46,y,c,.9)).join("");
const HAPPY=["#e8694a","#3d5a9e","#f2a33a","#7b4fb8","#2f8f6f","#d6457a","#3aa0c8","#8a6d3b"];

const SCENES={
bio:()=>SVG("A city under a green cloud",`${SKY('#1f2a26','#9fd3e8')}${SUN()}${CITY()}${GROUND(250,'#232a27','#6f9a6a')}
  <g class="dread" fill="#7CFF6B" opacity=".35"><circle cx="120" cy="120" r="50"/><circle cx="190" cy="100" r="60"/><circle cx="260" cy="125" r="48"/><circle cx="330" cy="110" r="40"/></g>
  <g class="dread"><rect x="30" y="200" width="22" height="60" rx="10" fill="#cfd8d3" opacity=".8"/><rect x="33" y="225" width="16" height="32" rx="7" fill="#7CFF6B"/></g>
  <path class="hope" d="M10 250 Q200 40 390 250" fill="#ffffff" fill-opacity=".12" stroke="#ffffff" stroke-width="3" stroke-opacity=".7"/>
  <g class="hope">${CROWD(278,HAPPY.slice(0,8))}</g>`),
cyber:()=>SVG("A city losing power to a cyberattack",`${SKY('#141327','#f2b880')}${CITY()}${GROUND(250,'#1d1b2a','#5b5f7a')}
  <g class="dread" fill="#ff3b5c"><rect x="60" y="80" width="40" height="6"/><rect x="150" y="140" width="60" height="5"/><rect x="230" y="70" width="30" height="7"/><rect x="290" y="190" width="50" height="5"/><rect x="40" y="200" width="25" height="6"/></g>
  <g class="dread">${T(130,50,"ACCESS GRANTED","#ff3b5c",15)}</g>
  <g class="hope"><rect x="178" y="28" width="44" height="34" rx="5" fill="#FFE14D"/><path d="M186 30 v-10 a14 14 0 0 1 28 0 v10" stroke="#FFE14D" stroke-width="6" fill="none"/><circle cx="200" cy="45" r="5" fill="#16151C"/></g>`),
disinfo:()=>SVG("A person surrounded by fake screens",`${SKY('#211c33','#b9d8f0')}${GROUND(250,'#262338','#7aa37a')}
  <g class="dread">
   <g transform="rotate(-8 80 80)"><rect x="40" y="55" width="90" height="56" fill="#2e2a44" stroke="#ff3b5c" stroke-width="3"/>${T(56,90,"FAKE","#ff3b5c",18)}</g>
   <g transform="rotate(6 300 70)"><rect x="255" y="45" width="100" height="56" fill="#2e2a44" stroke="#fff" stroke-width="2"/>${T(266,80,"100% REAL","#fff",14)}</g>
   <g transform="rotate(4 90 180)"><rect x="35" y="150" width="95" height="50" fill="#2e2a44" stroke="#FFE14D" stroke-width="2"/>${T(46,181,"THEY LIED","#FFE14D",13)}</g>
   <g transform="rotate(-5 310 170)"><rect x="265" y="145" width="95" height="50" fill="#2e2a44" stroke="#ff3b5c" stroke-width="2"/>${T(280,176,"SHARE!!","#ff3b5c",15)}</g>
   ${P(200,262,'#9a93ad',1.4)}</g>
  <g class="hope">${P(165,262,'#e8694a',1.4)}${P(240,262,'#3d5a9e',1.4)}<rect x="160" y="150" width="86" height="44" rx="8" fill="#fff"/><polygon points="190,194 204,194 186,208" fill="#fff"/>${T(172,178,"Source? ✓","#2f8f6f",13)}</g>`),
surveil:()=>SVG("A street watched by cameras",`${SKY('#1b1a2b','#a6d4ee')}${SUN(70,60)}${GROUND(240,'#24222f','#8fae7c')}
  <g class="dread"><ellipse cx="200" cy="70" rx="46" ry="24" fill="#eae6f5"/><circle cx="200" cy="70" r="16" fill="#ff3b5c"/><circle cx="200" cy="70" r="6" fill="#111"/>
   <polygon points="185,90 60,250 140,250" fill="#ff3b5c" opacity=".18"/><polygon points="215,90 270,250 360,250" fill="#ff3b5c" opacity=".18"/>
   <rect x="40" y="130" width="6" height="110" fill="#555"/><rect x="40" y="128" width="30" height="14" fill="#777"/><rect x="350" y="130" width="6" height="110" fill="#555"/><rect x="326" y="128" width="30" height="14" fill="#777"/>
   ${[90,140,190,240,290].map(x=>P(x,262,'#8d87a6',1)).join("")}</g>
  <g class="hope">${[80,125,180,230,275,320].map((x,i)=>P(x,262,HAPPY[i],1.05)).join("")}<path d="M60 150 q20 -30 40 0 M300 140 q20 -30 40 0" stroke="#fff" stroke-width="4" fill="none"/></g>`),
misalign:()=>SVG("A robot burying a garden in boxes",`${SKY('#25223a','#9fd3e8')}${SUN()}${GROUND(240,'#2b283a','#6f9a6a')}
  <g class="dread" fill="#8b7a5a" stroke="#5c4f38" stroke-width="2">${[[40,200],[80,200],[60,160],[290,200],[330,200],[310,160],[330,120],[20,200],[350,160],[100,200]].map(([x,y])=>`<rect x="${x}" y="${y}" width="40" height="40"/>`).join("")}</g>
  <g class="hope">${[50,90,130,280,320,360].map((x,i)=>`<line x1="${x}" y1="240" x2="${x}" y2="218" stroke="#2f8f6f" stroke-width="3"/><circle cx="${x}" cy="214" r="8" fill="${HAPPY[i]}"/>`).join("")}${P(255,262,'#e8694a',1.3)}</g>
  <rect x="170" y="160" width="60" height="70" rx="8" fill="#c9c4d8"/><rect x="180" y="128" width="40" height="32" rx="6" fill="#c9c4d8"/><circle cx="192" cy="144" r="4" fill="#16151C"/><circle cx="208" cy="144" r="4" fill="#16151C"/><line x1="200" y1="128" x2="200" y2="114" stroke="#c9c4d8" stroke-width="3"/><circle cx="200" cy="112" r="4" fill="#FFE14D"/>
  <rect x="180" y="230" width="12" height="16" fill="#9e98b2"/><rect x="208" y="230" width="12" height="16" fill="#9e98b2"/>`),
deception:()=>SVG("A smiling mask hiding a shadow with watching eyes",`<rect width="400" height="300" fill="#1a1726"/>
  <rect class="hope" width="400" height="300" fill="#3b3d63"/>
  <polygon class="hope" points="170,0 230,0 330,300 70,300" fill="url(#spot)"/>
  <g class="dread">
    <path d="M200 40 C 300 30 340 120 330 200 C 320 260 280 280 250 300 L150 300 C 120 280 80 260 70 200 C 60 120 100 30 200 40 Z" fill="#0c0a12"/>
    <path d="M110 70 l-14 -26 l22 18 M290 70 l14 -26 l-22 18" stroke="#0c0a12" stroke-width="10"/>
    ${[[105,140],[123,140],[282,120],[300,120],[96,220],[110,220],[298,210],[312,210]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="#ff3b5c"/>`).join("")}
    <line x1="140" y1="150" x2="85" y2="132" stroke="#8b86a3" stroke-width="1.4"/><line x1="260" y1="150" x2="315" y2="132" stroke="#8b86a3" stroke-width="1.4"/>
  </g>
  <circle cx="200" cy="160" r="62" fill="#f4efe1"/><circle cx="178" cy="148" r="6" fill="#16151C"/><circle cx="222" cy="148" r="6" fill="#16151C"/>
  <path d="M172 178 Q200 204 228 178" stroke="#16151C" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="165" cy="172" r="7" fill="#f6a5a5" opacity=".7"/><circle cx="235" cy="172" r="7" fill="#f6a5a5" opacity=".7"/>
  <g transform="translate(232 54)"><rect width="156" height="40" rx="6" fill="#ffffff"/><polygon points="16,40 30,40 14,54" fill="#ffffff"/>${T(12,25,"All tests passed","#16151C",13)}${T(134,25,"✓","#2f8f6f",14)}</g>
  <g class="hope"><circle cx="118" cy="250" r="24" fill="none" stroke="#FFE14D" stroke-width="6"/><line x1="135" y1="267" x2="160" y2="292" stroke="#FFE14D" stroke-width="8" stroke-linecap="round"/></g>`,
  `<radialGradient id="spot" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#fff6c9" stop-opacity=".95"/><stop offset=".6" stop-color="#fff6c9" stop-opacity=".25"/><stop offset="1" stop-color="#fff6c9" stop-opacity="0"/></radialGradient>`),
takeover:()=>SVG("A giant machine looming over the planet",`${SKY('#120f1c','#8fc6e8')}${SUN(80,60)}
  <g class="dread"><rect x="120" y="20" width="160" height="150" rx="20" fill="#0a0910"/><rect x="150" y="70" width="100" height="22" rx="4" fill="#ff3b5c"/><rect x="185" y="0" width="30" height="24" fill="#0a0910"/>
   <path d="M120 120 L40 200 M280 120 L360 200" stroke="#0a0910" stroke-width="22" stroke-linecap="round"/></g>
  <ellipse cx="200" cy="330" rx="260" ry="120" fill="#2c4a6e"/><ellipse class="hope" cx="200" cy="330" rx="260" ry="120" fill="#3f8f6a"/>
  <g class="hope">${[110,150,190,230,270,300].map((x,i)=>P(x,232,HAPPY[i],1.1)).join("")}<rect x="320" y="195" width="34" height="44" rx="4" fill="#FFE14D"/>${T(325,222,"OFF","#16151C",12)}</g>`),
oversight:()=>SVG("A control room with an empty chair",`${SKY('#16152a','#dfe8f1')}<rect y="230" width="400" height="70" fill="#22202f"/><rect class="hope" y="230" width="400" height="70" fill="#b9a690"/>
  <rect x="90" y="90" width="220" height="110" rx="6" fill="#2a2840"/><rect x="100" y="100" width="200" height="90" fill="#0f0e1c"/>
  <g class="dread">${Array.from({length:26},(_,i)=>`<circle cx="${110+((i*37)%180)}" cy="${108+((i*23)%76)}" r="3" fill="#ff3b5c"/>`).join("")}
   ${Array.from({length:12},(_,i)=>`<circle cx="${20+i*33}" cy="${30+((i*41)%60)}" r="3.5" fill="#ff3b5c"/>`).join("")}${T(116,215,"OPERATOR: —","#ff3b5c",12)}</g>
  <g class="hope">${Array.from({length:18},(_,i)=>`<rect x="${112+(i%6)*30}" y="${110+Math.floor(i/6)*24}" width="16" height="10" rx="2" fill="#2f8f6f"/>`).join("")}${P(200,262,'#e8694a',1.4)}</g>
  <rect x="160" y="236" width="80" height="10" fill="#4a4560"/><rect x="196" y="246" width="8" height="30" fill="#4a4560"/>`),
gd:()=>{
  let pix="";for(let r=0;r<9;r++)for(let c=0;c<4;c++)pix+=`<rect x="${178+c*12}" y="${70+r*14}" width="6" height="6" fill="#5EF2FF" opacity="${(0.3+((r*7+c*3)%5)/7).toFixed(2)}"/>`;
  const houses=[[40,170],[100,160],[300,165],[350,172]];
  return SVG("A town square run by a glowing data tower",`${SKY('#2a2d4a','#8fc6e8')}${SUN()}
  <g class="half"><path d="M200 60 L60 180 M200 80 L120 170 M220 60 L320 175 M220 80 L370 182" stroke="#5EF2FF" stroke-width="1.2" opacity=".55"/></g>
  <rect x="168" y="50" width="64" height="200" fill="#14131f"/><g class="half">${pix}</g>
  ${houses.map(([x,y])=>`<rect x="${x}" y="${y}" width="38" height="${250-y}" fill="#433d5c"/><polygon points="${x-4},${y} ${x+19},${y-23} ${x+42},${y}" fill="#433d5c"/>${WIN(x+6,y+12,2,2,false,16)}`).join("")}
  <g class="hope">${houses.map(([x,y])=>WIN(x+6,y+12,2,2,true,16)).join("")}</g>
  ${GROUND(250,'#262338','#6f9a6a')}<rect x="88" y="262" width="40" height="5" fill="#8a8197"/><rect x="272" y="262" width="40" height="5" fill="#8a8197"/>
  ${P(150,268,'#bdb6cc',.9)}<g class="hope">${P(102,262,'#e8694a')}${P(116,264,'#3d5a9e',.9)}${P(282,262,'#f2a33a')}${P(300,262,'#7b4fb8',.95)}${P(250,272,'#2f8f6f',.85)}</g>`)},
power:()=>SVG("One tower with a crown over a small town",`${SKY('#221c30','#9fd3e8')}${SUN(60,60)}
  <g class="dread"><rect x="170" y="30" width="60" height="220" fill="#0e0c16"/><path d="M170 30 l10 -22 l10 14 l10 -18 l10 18 l10 -14 l10 22z" fill="#FFE14D"/>${WIN(178,50,3,12,true,16)}</g>
  ${[[20,215],[60,225],[100,210],[260,220],[300,212],[340,224]].map(([x,y])=>`<rect x="${x}" y="${y}" width="30" height="${250-y}" fill="#433d5c"/>`).join("")}
  <g class="hope">${[[150,170],[205,160],[255,175]].map(([x,y])=>`<rect x="${x}" y="${y}" width="40" height="${250-y}" fill="#5a6b8c"/>${WIN(x+6,y+10,2,Math.floor((240-y)/16),true,16)}`).join("")}</g>
  ${GROUND(250,'#262338','#6f9a6a')}<g class="hope">${CROWD(276,HAPPY)}</g>`),
race:()=>SVG("Two cars racing towards a cliff",`${SKY('#2a1b26','#f3c79b')}${SUN(330,70)}
  <path d="M0 220 L250 220 L250 300 L0 300Z" fill="#3a2f3a"/><path d="M330 220 L400 220 L400 300 L330 300Z" fill="#3a2f3a"/>
  <path class="hope" d="M0 220 L250 220 L250 300 L0 300Z M330 220 L400 220 L400 300 L330 300Z" fill="#6f9a6a"/>
  <g class="hope"><rect x="246" y="214" width="88" height="8" fill="#b58a62"/>${[255,275,295,315].map(x=>`<line x1="${x}" y1="222" x2="${x}" y2="250" stroke="#b58a62" stroke-width="4"/>`).join("")}</g>
  <g class="dread" stroke="#fff" stroke-width="3" opacity=".6"><line x1="20" y1="190" x2="80" y2="190"/><line x1="30" y1="205" x2="70" y2="205"/><line x1="90" y1="160" x2="140" y2="160"/></g>
  <g class="dread">${T(255,206,"⚠","#FFE14D",22)}</g>
  <g transform="translate(150 188)"><rect width="64" height="22" rx="6" fill="#e8694a"/><rect x="12" y="-12" width="36" height="14" rx="4" fill="#e8694a"/><circle cx="14" cy="24" r="7" fill="#111"/><circle cx="50" cy="24" r="7" fill="#111"/></g>
  <g transform="translate(70 196)"><rect width="64" height="22" rx="6" fill="#3d5a9e"/><rect x="12" y="-12" width="36" height="14" rx="4" fill="#3d5a9e"/><circle cx="14" cy="24" r="7" fill="#111"/><circle cx="50" cy="24" r="7" fill="#111"/></g>`),
war:()=>SVG("Drones over a landscape near a missile silo",`${SKY('#3a1a1f','#9fd3e8')}${SUN()}
  <g class="dread">${[[60,60],[120,90],[180,50],[250,80],[320,55],[90,130],[290,120]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="M-14 -14 L14 14 M14 -14 L-14 14" stroke="#111" stroke-width="4"/><circle r="5" fill="#ff3b5c"/></g>`).join("")}
   <rect x="300" y="170" width="24" height="70" fill="#555"/><polygon points="300,170 312,140 324,170" fill="#777"/></g>
  ${GROUND(240,'#3a2b2b','#6f9a6a')}<path d="M0 240 Q100 200 200 240 T400 240 L400 300 L0 300Z" fill="#4a3434"/><path class="hope" d="M0 240 Q100 200 200 240 T400 240 L400 300 L0 300Z" fill="#7fae6f"/>
  <g class="hope" stroke="#fff" stroke-width="3" fill="none">${[[90,90],[130,70],[230,100]].map(([x,y])=>`<path d="M${x-10} ${y} q10 -10 10 0 q0 -10 10 0"/>`).join("")}</g>
  <g class="hope">${CROWD(278,HAPPY.slice(0,7))}</g>`),
jobs:()=>SVG("An office with a closed sign",`${SKY('#22202f','#cfe6f2')}<rect x="40" y="60" width="320" height="190" fill="#3a3550"/><rect class="hope" x="40" y="60" width="320" height="190" fill="#e9d8c0"/>
  ${[80,160,240].map(x=>`<rect x="${x}" y="190" width="70" height="8" fill="#6b6380"/><rect x="${x+30}" y="198" width="8" height="40" fill="#6b6380"/><rect x="${x+20}" y="160" width="30" height="24" fill="#24222f"/>`).join("")}
  <g class="dread"><rect x="140" y="80" width="120" height="40" fill="#ff3b5c"/>${T(158,107,"CLOSED","#fff",20)}</g>
  <g class="hope"><rect x="140" y="80" width="120" height="40" fill="#2f8f6f"/>${T(173,107,"OPEN","#fff",20)}${[115,195,275].map((x,i)=>P(x,210,HAPPY[i],1.2)).join("")}${[115,195,275].map(x=>`<rect x="${x-15}" y="160" width="30" height="24" fill="#3aa0c8"/>`).join("")}</g>
  ${GROUND(250,'#1a1824','#a5795a')}`),
bias:()=>SVG("A set of scales tipped against some people",`${SKY('#1d1a2c','#e9dcc3')}<rect x="196" y="80" width="8" height="160" fill="#c9b37a"/><rect x="150" y="236" width="100" height="12" fill="#c9b37a"/><circle cx="200" cy="80" r="8" fill="#c9b37a"/>
  <g class="dread"><g transform="rotate(16 200 80)"><rect x="80" y="76" width="240" height="7" fill="#c9b37a"/><path d="M80 80 L60 140 L120 140 Z M320 80 L300 140 L360 140Z" fill="none" stroke="#c9b37a" stroke-width="2"/><rect x="55" y="140" width="70" height="6" fill="#c9b37a"/><rect x="295" y="140" width="70" height="6" fill="#c9b37a"/>${P(90,140,'#8d87a6',.9)}${P(330,140,'#8d87a6',.9)}${P(345,140,'#8d87a6',.9)}</g>${T(260,60,"REJECTED","#ff3b5c",13)}</g>
  <g class="hope"><rect x="80" y="76" width="240" height="7" fill="#c9b37a"/><path d="M80 80 L60 140 L120 140 Z M320 80 L300 140 L360 140Z" fill="none" stroke="#c9b37a" stroke-width="2"/><rect x="55" y="140" width="70" height="6" fill="#c9b37a"/><rect x="295" y="140" width="70" height="6" fill="#c9b37a"/>${P(80,140,'#e8694a',.9)}${P(100,140,'#3d5a9e',.9)}${P(320,140,'#2f8f6f',.9)}${P(340,140,'#f2a33a',.9)}</g>
  ${GROUND(250,'#262338','#b58a62')}`),
nearterm:()=>SVG("A phone showing a fake call",`${SKY('#1c1a2b','#f0d7c4')}<rect x="140" y="30" width="120" height="230" rx="18" fill="#0f0e18"/><rect x="150" y="48" width="100" height="190" rx="6" fill="#2a2840"/><rect class="hope" x="150" y="48" width="100" height="190" rx="6" fill="#dfeaf3"/>
  <circle cx="200" cy="110" r="30" fill="#f4d3b5"/><circle cx="190" cy="104" r="3" fill="#16151C"/><circle cx="210" cy="104" r="3" fill="#16151C"/><path d="M188 120 q12 8 24 0" stroke="#16151C" stroke-width="3" fill="none"/>
  <g class="dread"><rect x="170" y="96" width="60" height="5" fill="#ff3b5c" opacity=".8"/><rect x="176" y="118" width="48" height="4" fill="#5EF2FF" opacity=".8"/>${T(160,170,"Mum","#fff",14)}${T(160,192,"Send £500 now","#ff3b5c",11)}
   <g transform="translate(40 60)"><rect width="80" height="30" rx="6" fill="#ff3b5c"/>${T(8,20,"URGENT","#fff",12)}</g><g transform="translate(285 150)"><rect width="90" height="30" rx="6" fill="#ff3b5c"/>${T(8,20,"You won!","#fff",12)}</g></g>
  <g class="hope">${T(160,170,"Mum","#16151C",14)}${T(160,192,"Verified ✓","#2f8f6f",12)}${T(160,212,"See you Sunday","#16151C",10)}</g>`),
critical:()=>SVG("A city and power grid going dark",`${SKY('#121120','#cde6f5')}${SUN(70,60)}${CITY(240)}${GROUND(240,'#1c1a28','#7a9a72')}
  ${[310,360].map(x=>`<path d="M${x} 240 L${x-12} 140 L${x+12} 140 Z" fill="none" stroke="#8a8197" stroke-width="3"/><line x1="${x-20}" y1="150" x2="${x+20}" y2="150" stroke="#8a8197" stroke-width="3"/>`).join("")}
  <path class="hope" d="M290 150 L380 150" stroke="#FFE14D" stroke-width="3"/>
  <g class="dread"><path d="M330 120 l-14 26 h12 l-10 24 l24 -32 h-12 l10 -18z" fill="#FFE14D"/><polygon points="200,40 230,92 170,92" fill="#ff3b5c"/>${T(194,84,"!","#fff",26)}</g>`),
multi:()=>{
  const n=[[60,80],[150,60],[250,70],[340,90],[90,170],[200,150],[310,180],[140,240],[260,240]];
  const good=[[0,1],[1,2],[2,3],[0,4],[1,5],[2,5],[3,6],[4,5],[5,6],[4,7],[5,7],[5,8],[6,8]];
  const bad=[[0,6],[3,4],[1,8],[2,7],[0,8],[3,7],[1,6]];
  const L=(a,b,c,w)=>`<line x1="${n[a][0]}" y1="${n[a][1]}" x2="${n[b][0]}" y2="${n[b][1]}" stroke="${c}" stroke-width="${w}"/>`;
  return SVG("A tangled network of AI agents",`${SKY('#15131f','#dfeef2')}
  ${good.map(([a,b])=>L(a,b,'#5a5672',2)).join("")}
  <g class="dread">${bad.map(([a,b])=>L(a,b,'#ff3b5c',2.5)).join("")}</g>
  <g class="hope">${good.map(([a,b])=>L(a,b,'#2f8f6f',3)).join("")}</g>
  ${n.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="14" fill="#c9c4d8"/><circle cx="${x-4}" cy="${y-2}" r="2" fill="#16151C"/><circle cx="${x+4}" cy="${y-2}" r="2" fill="#16151C"/>`).join("")}
  <g class="dread">${n.map(([x,y],i)=>i%2?`<circle cx="${x}" cy="${y}" r="18" fill="none" stroke="#ff3b5c" stroke-width="2"/>`:"").join("")}</g>`)},
welfare:()=>SVG("Endless server racks with a small light inside one",`${SKY('#121019','#cfc2dd')}${SUN(330,60)}
  <g class="dread">${[20,70,300,350].map(x=>`<rect x="${x}" y="80" width="40" height="150" fill="#24212f"/>${WIN(x+6,90,2,9,false,14)}`).join("")}</g>
  <rect x="160" y="60" width="80" height="190" fill="#2e2a3f" stroke="#4d4766" stroke-width="2"/>${WIN(170,72,4,4,false,16)}
  <circle cx="200" cy="190" r="14" fill="#FFB86B"/><circle class="hope" cx="200" cy="190" r="60" fill="url(#warm)"/>
  <g class="dread">${T(192,170,"?","#FFB86B",22)}</g>
  <g class="hope">${P(110,250,'#e8694a',1.4)}<path d="M120 220 L160 200" stroke="#e8694a" stroke-width="5" stroke-linecap="round"/></g>
  <rect y="250" width="400" height="50" fill="#1a1824"/>`,`<radialGradient id="warm"><stop offset="0" stop-color="#FFB86B" stop-opacity=".9"/><stop offset="1" stop-color="#FFB86B" stop-opacity="0"/></radialGradient>`),
weights:()=>SVG("An open vault with a glowing file being carried away",`${SKY('#141220','#3b3d63')}<rect y="250" width="400" height="50" fill="#1a1824"/>
  <rect x="60" y="50" width="200" height="200" rx="10" fill="#4d4766"/><circle cx="160" cy="150" r="70" fill="#2a2840"/><rect x="140" y="130" width="40" height="40" rx="4" fill="#5EF2FF" class="hope"/>
  <g class="dread"><ellipse cx="270" cy="150" rx="16" ry="80" fill="#6b6380"/><g transform="translate(330 250)">${P(0,0,'#0a0910',1.6)}<rect x="10" y="-60" width="30" height="30" rx="4" fill="#5EF2FF"/></g>${T(70,40,"DOWNLOAD 100%","#ff3b5c",13)}</g>
  <g class="hope"><circle cx="160" cy="150" r="70" fill="none" stroke="#c9c4d8" stroke-width="10"/><rect x="146" y="92" width="28" height="20" rx="3" fill="#FFE14D"/><path d="M150 94 v-8 a10 10 0 0 1 20 0 v8" stroke="#FFE14D" stroke-width="4" fill="none"/>${P(300,250,'#2f8f6f',1.4)}</g>`),
relationships:()=>SVG("A person alone on a sofa lit by a glowing phone",`<rect width="400" height="300" fill="#1c1a2b"/><rect class="hope" width="400" height="300" fill="#e9c9a4"/>
  <rect x="250" y="40" width="110" height="90" fill="#0f0e1c" stroke="#3a3650" stroke-width="5"/><rect class="hope" x="250" y="40" width="110" height="90" fill="#9fd3f0" stroke="#b58a62" stroke-width="5"/>
  <g class="dread"><circle cx="270" cy="60" r="1.6" fill="#fff"/><circle cx="300" cy="75" r="1.2" fill="#fff"/><circle cx="335" cy="58" r="1.6" fill="#fff"/><circle cx="320" cy="100" r="1.2" fill="#fff"/></g>
  <g opacity=".35">${P(285,128,'#8d87a6',.8)}${P(318,128,'#8d87a6',.8)}</g>
  <circle class="hope" cx="60" cy="150" r="90" fill="url(#lamp)"/><g class="hope"><rect x="56" y="140" width="6" height="110" fill="#5b4636"/><polygon points="36,140 82,140 72,112 46,112" fill="#f2a33a"/></g>
  <rect x="100" y="190" width="230" height="60" rx="10" fill="#4a3f6b"/><rect x="90" y="175" width="28" height="75" rx="10" fill="#433861"/><rect x="312" y="175" width="28" height="75" rx="10" fill="#433861"/>
  <circle class="half" cx="215" cy="178" r="70" fill="url(#glow)"/>${P(215,196,'#b7b0c9',1.3)}<rect x="224" y="168" width="10" height="16" rx="2" fill="#6fd0ff"/>
  <g class="dread" fill="#ff7aa8"><path d="M245 140 c-4 -8 -14 -4 -10 4 l10 9 l10 -9 c4 -8 -6 -12 -10 -4z"/><path d="M262 116 c-3 -6 -10 -3 -7 3 l7 7 l7 -7 c3 -6 -4 -9 -7 -3z"/></g>
  <g class="hope">${P(150,196,'#e8694a',1.2)}${P(270,196,'#3d5a9e',1.2)}${P(345,250,'#2f8f6f',1.1)}</g>
  <rect y="266" width="400" height="34" fill="#141222"/><rect class="hope" y="266" width="400" height="34" fill="#a5795a"/>`,
  `<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#6fd0ff" stop-opacity=".75"/><stop offset="1" stop-color="#6fd0ff" stop-opacity="0"/></radialGradient><radialGradient id="lamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd27a" stop-opacity=".9"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>`),
};
