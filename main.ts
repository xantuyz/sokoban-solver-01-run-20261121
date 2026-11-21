import{readdirSync as A,readFileSync as B,writeFileSync as C,mkdirSync as D}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',U='udlr',Y='UDLR';
function F(t){const w=t.indexOf('\n')+1,W=new Uint8Array(t.length).fill(1),G=[],X=[];let q=-1;
for(let i=0;i<t.length;i++){const c=t[i];if(c=='#'||c=='\n')continue;W[i]=0;if('.*+'.includes(c))G.push(i);if('$*'.includes(c))X.push(i);if('@+'.includes(c))q=i;}
return{w,W,G,B:X.sort((a,b)=>a-b),p:q,o:[-w,w,-1,1]};}
function G(L){const{W,G}=L,v=new Uint8Array(W.length),q=[...G];G.forEach(g=>v[g]=1);
for(let i=0;i<q.length;i++)for(const d of L.o){const y=q[i]-d;if(!W[y]&&!W[y-d]&&!v[y]){v[y]=1;q.push(y);}}return v;}
function H(L,oc,from,seen,st,stk){let lo=from,n=0;stk[n++]=from;seen[from]=st;
while(n){const p=stk[--n];if(p<lo)lo=p;for(const d of L.o){const q=p+d;if(!L.W[q]&&!oc[q]&&seen[q]!=st){seen[q]=st;stk[n++]=q;}}}return lo;}
function J(L,oc,gl,t){const{W}=L;for(const a of[t,t-1,t-L.w,t-L.w-1]){const C=[a,a+1,a+L.w,a+L.w+1];
if(C.every(x=>W[x]||oc[x])&&C.some(x=>oc[x]&&!gl[x]))return 1;}return 0;}
function K(L,oc,from,to){if(from==to)return'';const{W}=L,pv=new Int32Array(W.length).fill(-1),q=[from];pv[from]=from;
for(let i=0;i<q.length;i++){const p=q[i];if(p==to)break;for(const d of L.o){const x=p+d;if(W[x]||oc[x]||pv[x]!=-1)continue;pv[x]=p;q.push(x);}}
if(pv[to]==-1)throw'w';let s='';for(let p=to;p!=from;p=pv[p])s=U[L.o.indexOf(p-pv[p])]+s;return s;}
function S(L,M=250000){const{W}=L,n=W.length,gl=new Uint8Array(n),lv=G(L),oc=new Uint8Array(n);for(const g of L.G)gl[g]=1;
const seen=new Int32Array(n),mk=new Int32Array(n),stk=[];
let st=0,B=L.B;const BX=[L.B],PL=[L.p],PA=[-1],PJ=[0],PD=[0],ix=new Map(),dn=b=>b.every(x=>gl[x]),T=v=>{for(const b of B)oc[b]=v};
T(1);ix.set(B.reduce((k,e)=>k*n+e,H(L,oc,L.p,seen,++st,stk)),0);T(0);let f=dn(B)?0:-1;
for(let h=0;f<0&&h<BX.length;h++){B=BX[h];T(1);H(L,oc,PL[h],seen,++st,stk);const hr=st;
for(let j=0;j<B.length&&f<0;j++){const b=B[j];
for(const d of L.o){const t=b+d;if(seen[b-d]!=hr||W[t]||oc[t]||!lv[t])continue;oc[b]=0;oc[t]=1;
let Z=-1,Nx=null;if(!J(L,oc,gl,t)){Nx=B.slice();Nx[j]=t;Nx.sort((a,c)=>a-c);Z=Nx.reduce((k,e)=>k*n+e,H(L,oc,b,mk,++st,stk));}
oc[t]=0;oc[b]=1;if(!Nx||ix.has(Z))continue;if(BX.length>=M)return null;
ix.set(Z,BX.length);BX.push(Nx);PL.push(b);PA.push(h);PJ.push(j);PD.push(d);if(dn(Nx)){f=BX.length-1;break;}}}
T(0);}
if(f<0)return null;const pth=[];for(let s=f;s>0;s=PA[s])pth.unshift(s);
let mv='',pl=L.p;B=L.B;
for(const s of pth){const d=PD[s],from=B[PJ[s]];T(1);mv+=K(L,oc,pl,from-d);T(0);mv+=Y[L.o.indexOf(d)];pl=from;B=BX[s];}
return{mv,pl};}
function R(L){const Q=[],z=i=>2*(((i%L.w)-1)/7|0)+((i/L.w|0)>8);
for(const b of L.B)(Q[z(b)]??={B:[],G:[]}).B.push(b);
for(const g of L.G)(Q[z(g)]??={B:[],G:[]}).G.push(g);
if(Q.some(x=>!x||x.B.length!=x.G.length))return null;return Q.filter(x=>x&&x.B.length>0);}
function T(L){const Q=R(L);if(!Q){const s=S(L);return s&&s.mv;}let pl=L.p,mv='';
for(const r of Q){const W=[...L.W];for(const o of Q)if(o!==r)for(const b of o.dn?o.G:o.B)W[b]=1;
const s=S({w:L.w,W,G:r.G,B:r.B,p:pl,o:L.o});
if(!s)return null;mv+=s.mv;pl=s.pl;r.dn=1;}
return mv;}
for(const id of A(I)){let mv='';try{mv=T(F(B(`${I}/${id}/level.txt`,'utf8')))||'';}catch(e){}
D(`${O}/${id}`,{recursive:true});C(`${O}/${id}/solution.txt`,mv+'\n');}
