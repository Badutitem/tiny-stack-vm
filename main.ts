import{mkdirSync as M,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs';
import{join as J}from'node:path';
let K=[(a,b)=>a+b|0,(a,b)=>a-b|0,(a,b)=>Math.imul(a,b),(a,b)=>a==-2147483648&&b==-1?a:a/b|0,(a,b)=>b==-1?0:a%b|0,(a,b)=>Math.floor((a>>>0)/(b>>>0))|0,(a,b)=>(a>>>0)%(b>>>0)|0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31)|0,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)?1:0];
function run(p,q){
let D=new Int32Array(256),C=new Int32Array(64),N=new Int32Array(256),O=new Uint8Array(65536),s=0,c=0,l=0,i=0,P=0,t=0,n=p.length,a=0,b=0,r=0,u=0;
let E=e=>({o:O.slice(0,l),c:e});
for(;;){
if(t==1e6)return E(10);
if(P<0||P>=n)return E(9);
let op=p[P];
if(!(op<8||op>15&&op<35&&op!=31||op>47&&op<53||op>63&&op<66||op>79&&op<84))return E(5);
let im=op==1?1:op==2?4:op>47&&op<52?2:0;
if(P+im>=n)return E(9);
t++;
let B=op>15&&op<35&&op!=23&&op!=27,po=op==7?3:op==5||op==6||op==65||B?2:op==3||op==4||op==23||op==27||op==49||op==50||op==64||op>79&&op!=82?1:0;
if(s<po)return E(2);
let dl=op==1||op==2||op==4||op==6||op==82?1:op==65?-2:op==3||op==49||op==50||op>79||B?-1:0;
if(s+dl>256)return E(3);
let x=P+1+im;P=x;
switch(op){
case 0:return E(0);
case 1:D[s++]=(p[x-1]<<24)>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:u=D[s-1];D[s-1]=D[s-2];D[s-2]=u;break;
case 6:D[s]=D[s-2];s++;break;
case 7:a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:
b=D[s-1];a=D[s-2];
if(op>18&&op<23&&!b)return E(4);
D[s-2]=K[op-16-(op>22)-(op>26)-(op>30)](a,b);s--;break;
case 48:case 49:case 50:
r=(p[x-2]|p[x-1]<<8)<<16>>16;
if(op==48)P=x+r;
else{u=D[--s];if((op==49)==(u==0))P=x+r}
break;
case 51:if(c==64)return E(7);C[c++]=x;P=p[x-2]|p[x-1]<<8;break;
case 52:if(!c)return E(8);P=C[--c];break;
case 64:a=D[s-1];if(a<0||a>255)return E(6);D[s-1]=N[a];break;
case 65:a=D[s-1];if(a<0||a>255)return E(6);N[a]=D[s-2];s-=2;break;
case 80:{let S=String(D[s-1]);if(l+S.length>65536)return E(11);for(let j=0;j<S.length;j++)O[l++]=S.charCodeAt(j);s--;break}
case 81:if(l>65535)return E(11);O[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:return E(D[--s]&255);
}}}
let I=process.env.MAKEFUN_INPUT_DIR??'/input',Y=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(let d of R(I).sort()){
if(!/^i\d{3}$/.test(d))continue;
let r;
try{r=run(new Uint8Array(F(J(I,d,'program.bin'))),new Uint8Array(F(J(I,d,'input.bin'))))}catch{r={o:new Uint8Array(0),c:0}}
M(J(Y,d),{recursive:true});
W(J(Y,d,'stdout.bin'),r.o);
W(J(Y,d,'exit.txt'),r.c+'\n');
}
