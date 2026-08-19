/* Shared scene builder for the DELTA 2 Max enclosure, Rev E.1
   Used by index.html (interactive) and render.html (still capture)
   so the two can never drift apart. */
export function build(THREE, scene, renderer){
const G=new THREE.Group();scene.add(G);
const M=o=>new THREE.MeshStandardMaterial(o);
const ply=M({color:0xC69C6D,roughness:.85,transparent:true,opacity:.22,side:THREE.DoubleSide});
const plyEd=M({color:0xB08654,roughness:.9,transparent:true,opacity:.5});
const dl=M({color:0x2B2F36,roughness:.55,metalness:.25});
const foamM=M({color:0x2E8B84,roughness:1,transparent:true,opacity:.9});
const foamM2=M({color:0x46B3AA,roughness:1,transparent:true,opacity:.9});
const gasketM=M({color:0xE24B4A,roughness:.7,emissive:0x2a0806});
const epoxyM=M({color:0xC98A2E,roughness:.35,metalness:.15,emissive:0x2a1c05});
const fanM=M({color:0x24262B,roughness:.6,metalness:.3});
const fanHub=M({color:0x8B6F47,roughness:.5});
const ventM=M({color:0x5A6068,roughness:.5,metalness:.5});
const capM=M({color:0x6E757E,roughness:.45,metalness:.55,side:THREE.DoubleSide});
const acrylM=M({color:0xAEE4F5,roughness:.06,metalness:.05,transparent:true,opacity:.3});
const bootM=M({color:0x1E2228,roughness:.95});
const shutM=M({color:0xD8DDE3,roughness:.4,transparent:true,opacity:.88});
const hwM=M({color:0x9AA3AD,roughness:.35,metalness:.7});
const latchM=M({color:0xB9C2CC,roughness:.28,metalness:.85});
const goreM=M({color:0x3E8E7E,roughness:.5,metalness:.3,emissive:0x0d211d});
const goldM=M({color:0xC9A227,roughness:.4,metalness:.7,emissive:0x2a2205});
function box(w,h,d,mat,x,y,z,rx,ry,rz){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);
 m.position.set(x,y,z);if(rx)m.rotation.x=rx;if(ry)m.rotation.y=ry;if(rz)m.rotation.z=rz;G.add(m);return m;}
function cyl(rr,h,mat,x,y,z,ax,seg,open){const m=new THREE.Mesh(new THREE.CylinderGeometry(rr,rr,h,seg||32,1,!!open),mat);
 m.position.set(x,y,z);if(ax==='z')m.rotation.x=Math.PI/2;if(ax==='x')m.rotation.z=Math.PI/2;G.add(m);return m;}
function edge(m,c){const e=new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),
 new THREE.LineBasicMaterial({color:c||0,transparent:true,opacity:.5}));
 e.position.copy(m.position);e.rotation.copy(m.rotation);G.add(e);}
const PPU=76,WRAP=740;
const TF='bold 56px -apple-system,"Segoe UI",Helvetica,Arial',BF='42px -apple-system,"Segoe UI",Helvetica,Arial';
const PAD=30,TLH=70,BLH=54;
const meas=document.createElement('canvas').getContext('2d');
function wrapText(s,font,max){meas.font=font;const w=s.split(' ');const o=[];let l='';
 for(const x of w){const t=l?l+' '+x:x;if(meas.measureText(t).width>max&&l){o.push(l);l=x;}else l=t;}
 if(l)o.push(l);return o;}
function rr(c,x,y,w,h,rad){c.beginPath();c.moveTo(x+rad,y);c.arcTo(x+w,y,x+w,y+h,rad);
 c.arcTo(x+w,y+h,x,y+h,rad);c.arcTo(x,y+h,x,y,rad);c.arcTo(x,y,x+w,y,rad);c.closePath();}
function makeLabel(t,b,color,pos){
 const tL=wrapText(t,TF,WRAP+120),bL=b?wrapText(b,BF,WRAP):[];
 meas.font=TF;let mw=0;tL.forEach(l=>mw=Math.max(mw,meas.measureText(l).width));
 meas.font=BF;bL.forEach(l=>mw=Math.max(mw,meas.measureText(l).width));
 const W=Math.ceil(mw+PAD*2),H=Math.ceil(tL.length*TLH+bL.length*BLH+PAD*2);
 const cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d');
 c.fillStyle='rgba(12,15,20,0.84)';rr(c,1,1,W-2,H-2,18);c.fill();
 c.strokeStyle=color;c.globalAlpha=.55;c.lineWidth=3;c.stroke();c.globalAlpha=1;
 let y=PAD;c.textAlign='left';c.textBaseline='top';
 c.font=TF;c.fillStyle=color;tL.forEach(l=>{c.fillText(l,PAD,y);y+=TLH;});
 c.font=BF;c.fillStyle='#C3CCD6';bL.forEach(l=>{c.fillText(l,PAD,y);y+=BLH;});
 const tex=new THREE.CanvasTexture(cv);tex.minFilter=THREE.LinearFilter;tex.magFilter=THREE.LinearFilter;
 if(renderer)tex.anisotropy=renderer.capabilities.getMaxAnisotropy();
 const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));
 s.position.set(pos[0],pos[1],pos[2]);s.scale.set(W/PPU,H/PPU,1);s.renderOrder=999;G.add(s);}
function leader(a,b,c){G.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(
 [new THREE.Vector3(a[0],a[1],a[2]),new THREE.Vector3(b[0],b[1],b[2])]),
 new THREE.LineBasicMaterial({color:c,transparent:true,opacity:.8})));
 const d=new THREE.Mesh(new THREE.SphereGeometry(.22,12,12),new THREE.MeshBasicMaterial({color:c}));
 d.position.set(a[0],a[1],a[2]);G.add(d);}
function callout(t,b,c,a,at){leader(a,at,c);makeLabel(t,b,c,at);}
function flow(x,y,z,dx,dy,dz,len){const d=new THREE.Vector3(dx,dy,dz).normalize();
 G.add(new THREE.ArrowHelper(d,new THREE.Vector3(x,y,z),len,0x35C7E8,len*.3,len*.2));}

/* geometry — interior 25.125 x 13.5 x 15.5 | exterior 25.875 x 14.25 x 16.375 */
const T=.375,B=.5,LY=16.1875+7,DX=0.75;
edge(box(25.875,B,14.25,plyEd,0,B/2,0),0x4a3520);
edge(box(25.875,15.5,T,ply,0,8.25,-6.9375),0x4a3520);
edge(box(25.875,15.5,T,ply,0,8.25,6.9375),0x4a3520);
edge(box(T,15.5,13.5,ply,-12.75,8.25,0),0x4a3520);
edge(box(T,15.5,13.5,ply,12.75,8.25,0),0x4a3520);
edge(box(25.875,T,14.25,plyEd,0,LY,0),0x4a3520);
const fs=.55;
box(25.125,fs,fs,epoxyM,0,.62,-6.63,Math.PI/4,0,0);
box(25.125,fs,fs,epoxyM,0,.62,6.63,Math.PI/4,0,0);
box(fs,fs,13.5,epoxyM,-12.32,.62,0,0,0,Math.PI/4);
box(fs,fs,13.5,epoxyM,12.32,.62,0,0,0,Math.PI/4);
[[-12.32,-6.63],[-12.32,6.63],[12.32,-6.63],[12.32,6.63]].forEach(p=>box(fs,15.5,fs,epoxyM,p[0],8.25,p[1],0,Math.PI/4,0));
box(21,1,11,foamM,DX,1,0);
[[-7,-5.75],[8.5,-5.75],[-7,5.75],[8.5,5.75]].forEach(p=>box(3,10,2,foamM2,p[0],8.5,p[1]));
box(4,2.5,9.5,foamM2,-7,LY-1.44,0);box(4,2.5,9.5,foamM2,8.5,LY-1.44,0);
edge(box(19.6,12,9.5,dl,DX,7.5,0),0x11141a);
box(19.6,.35,9.5,M({color:0x3A4049,roughness:.5,metalness:.3}),DX,13.65,0);
const SX=DX+9.8,PX=DX-9.8;
box(.12,9.6,7.6,M({color:0x1F2329}),SX+.02,8.2,0);
box(.14,2.6,6.2,M({color:0x0B2A38,emissive:0x0d3a4e,roughness:.3}),SX+.09,11.0,0);
for(let i=0;i<4;i++)box(.14,.5,.9,M({color:0x11151A}),SX+.09,8.1,-2.4+i*1.6);
for(let i=0;i<2;i++)box(.14,.42,.95,M({color:0x11151A}),SX+.09,6.9,-2.2+i*4.4);
box(.14,.4,.85,M({color:0x8C949D}),SX+.09,6.9,0);
cyl(.52,.16,goldM,SX+.09,4.3,0,'x');
box(.12,9.8,7.6,M({color:0x1F2329}),PX-.02,8.2,0);
box(.14,1.9,6.4,M({color:0x14181D}),PX-.09,12.0,0);
for(let i=0;i<6;i++)box(.14,1.45,1.45,M({color:0x121519}),PX-.09,i<3?9.4:7.6,-2.1+((i%3)*2.1));
box(.14,.42,.85,M({color:0x8C949D}),PX-.09,6.4,0);
box(.14,2.0,6.4,M({color:0x14181D}),PX-.09,4.6,0);
[-4.78,4.78].forEach(vz=>{for(let i=0;i<14;i++)box(1.1,7.6,.1,M({color:0x1A1D22}),DX-7.2+i*1.1,7.5,vz);});
const WX=12.75;
box(.5,5.4,8.2,M({color:0x8A6A44}),WX-.12,11.0,0);
box(.26,4.6,7.4,acrylM,WX+.02,11.0,0);
box(.14,5.4,8.2,gasketM,WX-.3,11.0,0);
cyl(.62,.55,bootM,WX+.15,4.3,0,'x');cyl(.44,.5,bootM,WX+.42,4.3,0,'x');
cyl(.3,2.4,hwM,WX-1.0,4.3,0,'x');
cyl(.5,.5,bootM,WX+.15,6.9,0,'x');cyl(.26,2.2,hwM,WX-.9,6.9,0,'x');
box(.3,6.4,9.6,shutM,WX+.62,11.0,-2.2);
box(.55,.34,9.6,hwM,WX+.62,14.3,0);box(.55,.34,9.6,hwM,WX+.62,7.7,0);
function intake(zw,dir){[-6.5,0,6.5].forEach(sx=>{
 box(6,.875,.4,M({color:0x0A0C0F}),sx,2.44,zw);
 box(7.4,.35,1.6,ventM,sx,3.5,zw+dir*.75);
 box(7.4,1.5,.3,ventM,sx,2.9,zw+dir*1.5);});}
intake(-6.9375,-1);intake(6.9375,1);
cyl(2.362,1,fanM,0,15,0,'y');cyl(.9,1.15,fanHub,0,15,0,'y');
for(let i=0;i<7;i++){const a=i*Math.PI*2/7;box(2.5,.14,.5,fanHub,Math.cos(a)*1.55,15,Math.sin(a)*1.55,0,-a,0);}
cyl(2.6,.75,ventM,0,LY+.56,0,'y');cyl(2.25,.4,M({color:0x0A0C0F}),0,LY+.2,0,'y');
cyl(3.5,.22,capM,0,LY+2.6,0,'y');
const sk=new THREE.Mesh(new THREE.CylinderGeometry(3.5,3.5,.7,32,1,true),capM);sk.position.set(0,LY+2.24,0);G.add(sk);
[0,1,2].forEach(i=>{const a=i*Math.PI*2/3;box(.35,2.2,.35,hwM,Math.cos(a)*2.9,LY+1.5,Math.sin(a)*2.9);});
cyl(.6,1.3,hwM,-13.1,6.0,-2.6,'x');cyl(.6,1.3,hwM,-13.1,6.0,2.6,'x');
box(25.875,.28,T,gasketM,0,16.14,-6.9375);box(25.875,.28,T,gasketM,0,16.14,6.9375);
box(T,.28,13.5,gasketM,-12.75,16.14,0);box(T,.28,13.5,gasketM,12.75,16.14,0);
/* rim hardware — 4 draw latches. NO piano hinge: lid is fully removable. */
[[-9,-7.25],[9,-7.25],[-9,7.25],[9,7.25]].forEach(p=>{
  box(1.5,1.8,.5,latchM,p[0],14.3,p[1]);
  box(1.1,.35,.75,latchM,p[0],15.05,p[1]+(p[1]>0?.28:-.28));
  box(.9,.9,.28,latchM,p[0],13.7,p[1]+(p[1]>0?.3:-.3));});
cyl(.44,1.0,goreM,-4,14.3,7.4,'z');cyl(.5,.16,goreM,-4,14.3,7.85,'z');
flow(-6.5,2.44,-9.2,0,0,1,2.6);flow(6.5,2.44,9.2,0,0,-1,2.6);
flow(DX,4,-5.9,0,1,0,6.5);flow(DX,4,5.9,0,1,0,6.5);
flow(0,LY+.9,0,0,1,0,2.2);flow(0,LY+3.1,0,.85,.35,0,3.2);flow(0,LY+3.1,0,-.85,.35,0,3.2);
callout('LID — fully removable','No hinge. Four latches clamp it onto the gasket; lift it straight off','#E0C39A',[0,LY,0],[8,LY+9,-12]);
callout('DRAW LATCHES x4','Stainless over-centre, one per corner. These supply the clamping force that makes the gasket seal','#B9C2CC',[9,14.3,7.25],[27,24,13]);
callout('GORE POLYVENT','Passes air and water vapour, blocks liquid water. Stops the box pumping moist air past its own seals','#5FBFAB',[-4,14.3,7.9],[-16,25,17]);
callout('SCREEN END — 2.0 in gap','Nothing plugs in here. Tight gap means a shorter plunger and closer viewing','#AEE4F5',[SX,11,0],[31,15,-11]);
callout('FIXED ACRYLIC WINDOW','1/4 in cast acrylic over the LCD, rabbeted from inside so water pressure seats it','#AEE4F5',[WX,11,0],[30,2,11]);
callout('BOOT-PLUNGER — main power','Silicone boot over a delrin plunger, 3 mm rest gap so it can never hold the button down','#E8EDF2',[WX,4.3,0],[27,-9,3]);
callout('POWER END — 3.5 in gap','Six AC sockets, X-Stream input, DC outputs. Room for plug bodies and cable bend radius','#FFB4A2',[PX,9,0],[-31,6,-9]);
callout('LONG FACES = DELTA fans','Its own intake and exhaust. No penetrations above the slot band','#FF8A87',[DX,7.5,-4.9],[-6,-13,-20]);
callout('EXHAUST FAN + RAIN CAP','120 mm axial flat in the plenum, air exits radially under the skirt','#9AD6FF',[0,LY+2.6,0],[-21,LY+6,10]);
callout('PASSIVE INTAKE','Three slots per long wall with drip hoods, feeding the fan plenums','#35C7E8',[-6.5,2.44,-7.1],[-25,-6,-16]);
G.position.y=-5;
return G;
}
