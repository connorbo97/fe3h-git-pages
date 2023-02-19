import{S as pt,i as ht,s as mt,a as _t,e as M,c as gt,b as W,g as _e,t as B,d as ge,f as K,h as G,j as wt,o as je,k as yt,l as bt,m as vt,n as Re,p as $,q as Et,r as kt,u as St,v as Ie,w as Z,x as Q,y as De,z as x,A as ee,B as he}from"./chunks/index-dd83a328.js";import{S as it,a as lt,I as F,g as Qe,f as xe,b as Le,c as me,s as H,i as et,d as se,P as tt,e as Rt,h as It}from"./chunks/singletons-3e8daa77.js";import{_ as Ae}from"./chunks/preload-helper-41c905a7.js";import{b as X,s as Lt}from"./chunks/paths-76ddbbff.js";function At(a,e){return a==="/"||e==="ignore"?a:e==="never"?a.endsWith("/")?a.slice(0,-1):a:e==="always"&&!a.endsWith("/")?a+"/":a}function Ot(a){return a.split("%25").map(decodeURI).join("%25")}function Pt(a){for(const e in a)a[e]=decodeURIComponent(a[e]);return a}const Ut=["href","pathname","search","searchParams","toString","toJSON"];function Nt(a,e){const n=new URL(a);for(const s of Ut){let i=n[s];Object.defineProperty(n,s,{get(){return e(),i},enumerable:!0,configurable:!0})}return jt(n),n}function jt(a){Object.defineProperty(a,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const Tt="/__data.json";function Dt(a){return a.replace(/\/$/,"")+Tt}function ct(a){try{return JSON.parse(sessionStorage[a])}catch{}}function nt(a,e){const n=JSON.stringify(e);try{sessionStorage[a]=n}catch{}}function Ct(...a){let e=5381;for(const n of a)if(typeof n=="string"){let s=n.length;for(;s;)e=e*33^n.charCodeAt(--s)}else if(ArrayBuffer.isView(n)){const s=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let i=s.length;for(;i;)e=e*33^s[--i]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const we=window.fetch;window.fetch=(a,e)=>((a instanceof Request?a.method:(e==null?void 0:e.method)||"GET")!=="GET"&&ie.delete(Ce(a)),we(a,e));const ie=new Map;function qt(a,e){const n=Ce(a,e),s=document.querySelector(n);if(s!=null&&s.textContent){const{body:i,...u}=JSON.parse(s.textContent),t=s.getAttribute("data-ttl");return t&&ie.set(n,{body:i,init:u,ttl:1e3*Number(t)}),Promise.resolve(new Response(i,u))}return we(a,e)}function Vt(a,e,n){if(ie.size>0){const s=Ce(a,n),i=ie.get(s);if(i){if(performance.now()<i.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(i.body,i.init);ie.delete(s)}}return we(e,n)}function Ce(a,e){let s=`script[data-sveltekit-fetched][data-url=${JSON.stringify(a instanceof Request?a.url:a)}]`;if(e!=null&&e.headers||e!=null&&e.body){const i=[];e.headers&&i.push([...new Headers(e.headers)].join(",")),e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&i.push(e.body),s+=`[data-hash="${Ct(...i)}"]`}return s}const Ft=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function $t(a){const e=[];return{pattern:a==="/"?/^\/$/:new RegExp(`^${Mt(a).map(s=>{const i=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(s);if(i)return e.push({name:i[1],matcher:i[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const u=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(s);if(u)return e.push({name:u[1],matcher:u[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!s)return;const t=s.split(/\[(.+?)\](?!\])/);return"/"+t.map((m,_)=>{if(_%2){if(m.startsWith("x+"))return Oe(String.fromCharCode(parseInt(m.slice(2),16)));if(m.startsWith("u+"))return Oe(String.fromCharCode(...m.slice(2).split("-").map(O=>parseInt(O,16))));const g=Ft.exec(m);if(!g)throw new Error(`Invalid param: ${m}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,A,P,I,C]=g;return e.push({name:I,matcher:C,optional:!!A,rest:!!P,chained:P?_===1&&t[0]==="":!1}),P?"(.*?)":A?"([^/]*)?":"([^/]+?)"}return Oe(m)}).join("")}).join("")}/?$`),params:e}}function Ht(a){return!/^\([^)]+\)$/.test(a)}function Mt(a){return a.slice(1).split("/").filter(Ht)}function Bt(a,e,n){const s={},i=a.slice(1);let u=0;for(let t=0;t<e.length;t+=1){const f=e[t],m=i[t-u];if(f.chained&&f.rest&&u){s[f.name]=i.slice(t-u,t+1).filter(_=>_).join("/"),u=0;continue}if(m===void 0){f.rest&&(s[f.name]="");continue}if(!f.matcher||n[f.matcher](m)){s[f.name]=m;continue}if(f.optional&&f.chained){u++;continue}return}if(!u)return s}function Oe(a){return a.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Kt(a,e,n,s){const i=new Set(e);return Object.entries(n).map(([f,[m,_,g]])=>{const{pattern:A,params:P}=$t(f),I={id:f,exec:C=>{const O=A.exec(C);if(O)return Bt(O,P,s)},errors:[1,...g||[]].map(C=>a[C]),layouts:[0,..._||[]].map(t),leaf:u(m)};return I.errors.length=I.layouts.length=Math.max(I.errors.length,I.layouts.length),I});function u(f){const m=f<0;return m&&(f=~f),[m,a[f]]}function t(f){return f===void 0?f:[i.has(f),a[f]]}}function Gt(a){let e,n,s;var i=a[1][0];function u(t){return{props:{data:t[3],form:t[2]}}}return i&&(e=Z(i,u(a)),a[12](e)),{c(){e&&Q(e.$$.fragment),n=M()},l(t){e&&De(e.$$.fragment,t),n=M()},m(t,f){e&&x(e,t,f),W(t,n,f),s=!0},p(t,f){const m={};if(f&8&&(m.data=t[3]),f&4&&(m.form=t[2]),i!==(i=t[1][0])){if(e){_e();const _=e;B(_.$$.fragment,1,0,()=>{ee(_,1)}),ge()}i?(e=Z(i,u(t)),t[12](e),Q(e.$$.fragment),K(e.$$.fragment,1),x(e,n.parentNode,n)):e=null}else i&&e.$set(m)},i(t){s||(e&&K(e.$$.fragment,t),s=!0)},o(t){e&&B(e.$$.fragment,t),s=!1},d(t){a[12](null),t&&G(n),e&&ee(e,t)}}}function Jt(a){let e,n,s;var i=a[1][0];function u(t){return{props:{data:t[3],$$slots:{default:[zt]},$$scope:{ctx:t}}}}return i&&(e=Z(i,u(a)),a[11](e)),{c(){e&&Q(e.$$.fragment),n=M()},l(t){e&&De(e.$$.fragment,t),n=M()},m(t,f){e&&x(e,t,f),W(t,n,f),s=!0},p(t,f){const m={};if(f&8&&(m.data=t[3]),f&8215&&(m.$$scope={dirty:f,ctx:t}),i!==(i=t[1][0])){if(e){_e();const _=e;B(_.$$.fragment,1,0,()=>{ee(_,1)}),ge()}i?(e=Z(i,u(t)),t[11](e),Q(e.$$.fragment),K(e.$$.fragment,1),x(e,n.parentNode,n)):e=null}else i&&e.$set(m)},i(t){s||(e&&K(e.$$.fragment,t),s=!0)},o(t){e&&B(e.$$.fragment,t),s=!1},d(t){a[11](null),t&&G(n),e&&ee(e,t)}}}function zt(a){let e,n,s;var i=a[1][1];function u(t){return{props:{data:t[4],form:t[2]}}}return i&&(e=Z(i,u(a)),a[10](e)),{c(){e&&Q(e.$$.fragment),n=M()},l(t){e&&De(e.$$.fragment,t),n=M()},m(t,f){e&&x(e,t,f),W(t,n,f),s=!0},p(t,f){const m={};if(f&16&&(m.data=t[4]),f&4&&(m.form=t[2]),i!==(i=t[1][1])){if(e){_e();const _=e;B(_.$$.fragment,1,0,()=>{ee(_,1)}),ge()}i?(e=Z(i,u(t)),t[10](e),Q(e.$$.fragment),K(e.$$.fragment,1),x(e,n.parentNode,n)):e=null}else i&&e.$set(m)},i(t){s||(e&&K(e.$$.fragment,t),s=!0)},o(t){e&&B(e.$$.fragment,t),s=!1},d(t){a[10](null),t&&G(n),e&&ee(e,t)}}}function at(a){let e,n=a[6]&&rt(a);return{c(){e=yt("div"),n&&n.c(),this.h()},l(s){e=bt(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var i=vt(e);n&&n.l(i),i.forEach(G),this.h()},h(){Re(e,"id","svelte-announcer"),Re(e,"aria-live","assertive"),Re(e,"aria-atomic","true"),$(e,"position","absolute"),$(e,"left","0"),$(e,"top","0"),$(e,"clip","rect(0 0 0 0)"),$(e,"clip-path","inset(50%)"),$(e,"overflow","hidden"),$(e,"white-space","nowrap"),$(e,"width","1px"),$(e,"height","1px")},m(s,i){W(s,e,i),n&&n.m(e,null)},p(s,i){s[6]?n?n.p(s,i):(n=rt(s),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(s){s&&G(e),n&&n.d()}}}function rt(a){let e;return{c(){e=Et(a[7])},l(n){e=kt(n,a[7])},m(n,s){W(n,e,s)},p(n,s){s&128&&St(e,n[7])},d(n){n&&G(e)}}}function Yt(a){let e,n,s,i,u;const t=[Jt,Gt],f=[];function m(g,A){return g[1][1]?0:1}e=m(a),n=f[e]=t[e](a);let _=a[5]&&at(a);return{c(){n.c(),s=_t(),_&&_.c(),i=M()},l(g){n.l(g),s=gt(g),_&&_.l(g),i=M()},m(g,A){f[e].m(g,A),W(g,s,A),_&&_.m(g,A),W(g,i,A),u=!0},p(g,[A]){let P=e;e=m(g),e===P?f[e].p(g,A):(_e(),B(f[P],1,1,()=>{f[P]=null}),ge(),n=f[e],n?n.p(g,A):(n=f[e]=t[e](g),n.c()),K(n,1),n.m(s.parentNode,s)),g[5]?_?_.p(g,A):(_=at(g),_.c(),_.m(i.parentNode,i)):_&&(_.d(1),_=null)},i(g){u||(K(n),u=!0)},o(g){B(n),u=!1},d(g){f[e].d(g),g&&G(s),_&&_.d(g),g&&G(i)}}}function Wt(a,e,n){let{stores:s}=e,{page:i}=e,{constructors:u}=e,{components:t=[]}=e,{form:f}=e,{data_0:m=null}=e,{data_1:_=null}=e;wt(s.page.notify);let g=!1,A=!1,P=null;je(()=>{const k=s.page.subscribe(()=>{g&&(n(6,A=!0),n(7,P=document.title||"untitled page"))});return n(5,g=!0),k});function I(k){Ie[k?"unshift":"push"](()=>{t[1]=k,n(0,t)})}function C(k){Ie[k?"unshift":"push"](()=>{t[0]=k,n(0,t)})}function O(k){Ie[k?"unshift":"push"](()=>{t[0]=k,n(0,t)})}return a.$$set=k=>{"stores"in k&&n(8,s=k.stores),"page"in k&&n(9,i=k.page),"constructors"in k&&n(1,u=k.constructors),"components"in k&&n(0,t=k.components),"form"in k&&n(2,f=k.form),"data_0"in k&&n(3,m=k.data_0),"data_1"in k&&n(4,_=k.data_1)},a.$$.update=()=>{a.$$.dirty&768&&s.page.set(i)},[t,u,f,m,_,g,A,P,s,i,I,C,O]}class Xt extends pt{constructor(e){super(),ht(this,e,Wt,Yt,mt,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const Zt={},ye=[()=>Ae(()=>import("./chunks/0-aa10c413.js"),["./chunks/0-aa10c413.js","./chunks/_layout-da46b06b.js","./components/layout.svelte-59eb18f3.js","./chunks/index-dd83a328.js"],import.meta.url),()=>Ae(()=>import("./chunks/1-9c5d512a.js"),["./chunks/1-9c5d512a.js","./components/error.svelte-cd7ebe11.js","./chunks/index-dd83a328.js","./chunks/singletons-3e8daa77.js","./chunks/paths-76ddbbff.js"],import.meta.url),()=>Ae(()=>import("./chunks/2-0c8ca27e.js"),["./chunks/2-0c8ca27e.js","./components/pages/_page.svelte-ce5da80a.js","./chunks/preload-helper-41c905a7.js","./chunks/index-dd83a328.js","./chunks/paths-76ddbbff.js","./assets/_page-a483ffd1.css"],import.meta.url)],ft=[],Qt={"/":[2]},xt={handleError:({error:a})=>{console.error(a)}};let le=class{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}},ot=class{constructor(e,n){this.status=e,this.location=n}};async function en(a){var e;for(const n in a)if(typeof((e=a[n])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(a).map(async([s,i])=>[s,await i])));return a}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const tn=-1,nn=-2,an=-3,rn=-4,on=-5,sn=-6;function ln(a,e){if(typeof a=="number")return i(a,!0);if(!Array.isArray(a)||a.length===0)throw new Error("Invalid input");const n=a,s=Array(n.length);function i(u,t=!1){if(u===tn)return;if(u===an)return NaN;if(u===rn)return 1/0;if(u===on)return-1/0;if(u===sn)return-0;if(t)throw new Error("Invalid input");if(u in s)return s[u];const f=n[u];if(!f||typeof f!="object")s[u]=f;else if(Array.isArray(f))if(typeof f[0]=="string"){const m=f[0],_=e==null?void 0:e[m];if(_)return s[u]=_(i(f[1]));switch(m){case"Date":s[u]=new Date(f[1]);break;case"Set":const g=new Set;s[u]=g;for(let I=1;I<f.length;I+=1)g.add(i(f[I]));break;case"Map":const A=new Map;s[u]=A;for(let I=1;I<f.length;I+=2)A.set(i(f[I]),i(f[I+1]));break;case"RegExp":s[u]=new RegExp(f[1],f[2]);break;case"Object":s[u]=Object(f[1]);break;case"BigInt":s[u]=BigInt(f[1]);break;case"null":const P=Object.create(null);s[u]=P;for(let I=1;I<f.length;I+=2)P[f[I]]=i(f[I+1]);break;default:throw new Error(`Unknown type ${m}`)}}else{const m=new Array(f.length);s[u]=m;for(let _=0;_<f.length;_+=1){const g=f[_];g!==nn&&(m[_]=i(g))}}else{const m={};s[u]=m;for(const _ in f){const g=f[_];m[_]=i(g)}}return s[u]}return i(0)}function cn(a){return a.filter(e=>e!=null)}const Pe=Kt(ye,ft,Qt,Zt),ut=ye[0],Te=ye[1];ut();Te();const Y=ct(it)??{},re=ct(lt)??{};function Ue(a){Y[a]=se()}function fn({target:a}){var We;const e=document.documentElement,n=[],s=[];let i=null;const u={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},f=!1,m=!1,_=!0,g=!1,A=!1,P=!1,I=!1,C,O=(We=history.state)==null?void 0:We[F];O||(O=Date.now(),history.replaceState({...history.state,[F]:O},"",location.href));const k=Y[O];k&&(history.scrollRestoration="manual",scrollTo(k.x,k.y));let J,qe,ce;async function Ve(){ce=ce||Promise.resolve(),await ce,ce=null;const o=new URL(location.href),r=ne(o,!0);i=null,await Me(r,o,[])}function Fe(o){s.some(r=>r==null?void 0:r.snapshot)&&(re[o]=s.map(r=>{var c;return(c=r==null?void 0:r.snapshot)==null?void 0:c.capture()}))}function $e(o){var r;(r=re[o])==null||r.forEach((c,l)=>{var p,d;(d=(p=s[l])==null?void 0:p.snapshot)==null||d.restore(c)})}async function be(o,{noScroll:r=!1,replaceState:c=!1,keepFocus:l=!1,state:p={},invalidateAll:d=!1},w,h){return typeof o=="string"&&(o=new URL(o,Qe(document))),pe({url:o,scroll:r?se():null,keepfocus:l,redirect_chain:w,details:{state:p,replaceState:c},nav_token:h,accepted:()=>{d&&(I=!0)},blocked:()=>{},type:"goto"})}async function He(o){return i={id:o.id,promise:Ge(o).then(r=>(r.type==="loaded"&&r.state.error&&(i=null),r))},i.promise}async function fe(...o){const c=Pe.filter(l=>o.some(p=>l.exec(p))).map(l=>Promise.all([...l.layouts,l.leaf].map(p=>p==null?void 0:p[1]())));await Promise.all(c)}async function Me(o,r,c,l,p,d={},w){var b,y,L;qe=d;let h=o&&await Ge(o);if(h||(h=await Ye(r,{id:null},await oe(new Error(`Not found: ${r.pathname}`),{url:r,params:{},route:{id:null}}),404)),r=(o==null?void 0:o.url)||r,qe!==d)return!1;if(h.type==="redirect")if(c.length>10||c.includes(r.pathname))h=await ue({status:500,error:await oe(new Error("Redirect loop"),{url:r,params:{},route:{id:null}}),url:r,route:{id:null}});else return be(new URL(h.location,r).href,{},[...c,r.pathname],d),!1;else((b=h.props.page)==null?void 0:b.status)>=400&&await H.updated.check()&&await ae(r);if(n.length=0,I=!1,g=!0,l&&(Ue(l),Fe(l)),(y=h.props.page)!=null&&y.url&&h.props.page.url.pathname!==r.pathname&&(r.pathname=(L=h.props.page)==null?void 0:L.url.pathname),p&&p.details){const{details:S}=p,D=S.replaceState?0:1;if(S.state[F]=O+=D,history[S.replaceState?"replaceState":"pushState"](S.state,"",r),!S.replaceState){let R=O+1;for(;re[R]||Y[R];)delete re[R],delete Y[R],R+=1}}if(i=null,m?(t=h.state,h.props.page&&(h.props.page.url=r),C.$set(h.props)):Be(h),p){const{scroll:S,keepfocus:D}=p,{activeElement:R}=document;await he();const v=document.activeElement!==R&&document.activeElement!==document.body;if(!D&&!v&&await Ne(),_){const U=r.hash&&document.getElementById(decodeURIComponent(r.hash.slice(1)));S?scrollTo(S.x,S.y):U?U.scrollIntoView():scrollTo(0,0)}}else await he();_=!0,h.props.page&&(J=h.props.page),w&&w(),g=!1}function Be(o){var l;t=o.state;const r=document.querySelector("style[data-sveltekit]");r&&r.remove(),J=o.props.page,C=new Xt({target:a,props:{...o.props,stores:H,components:s},hydrate:!0}),$e(O);const c={from:null,to:{params:t.params,route:{id:((l=t.route)==null?void 0:l.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};u.after_navigate.forEach(p=>p(c)),m=!0}async function te({url:o,params:r,branch:c,status:l,error:p,route:d,form:w}){let h="never";for(const R of c)(R==null?void 0:R.slash)!==void 0&&(h=R.slash);o.pathname=At(o.pathname,h),o.search=o.search;const b={type:"loaded",state:{url:o,params:r,branch:c,error:p,route:d},props:{constructors:cn(c).map(R=>R.node.component)}};w!==void 0&&(b.props.form=w);let y={},L=!J,S=0;for(let R=0;R<Math.max(c.length,t.branch.length);R+=1){const v=c[R],U=t.branch[R];(v==null?void 0:v.data)!==(U==null?void 0:U.data)&&(L=!0),v&&(y={...y,...v.data},L&&(b.props[`data_${S}`]=y),S+=1)}return(!t.url||o.href!==t.url.href||t.error!==p||w!==void 0&&w!==J.form||L)&&(b.props.page={error:p,params:r,route:{id:(d==null?void 0:d.id)??null},status:l,url:new URL(o),form:w??null,data:L?y:J.data}),b}async function ve({loader:o,parent:r,url:c,params:l,route:p,server_data_node:d}){var y,L,S;let w=null;const h={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},b=await o();if((y=b.universal)!=null&&y.load){let D=function(...v){for(const U of v){const{href:q}=new URL(U,c);h.dependencies.add(q)}};const R={route:{get id(){return h.route=!0,p.id}},params:new Proxy(l,{get:(v,U)=>(h.params.add(U),v[U])}),data:(d==null?void 0:d.data)??null,url:Nt(c,()=>{h.url=!0}),async fetch(v,U){let q;v instanceof Request?(q=v.url,U={body:v.method==="GET"||v.method==="HEAD"?void 0:await v.blob(),cache:v.cache,credentials:v.credentials,headers:v.headers,integrity:v.integrity,keepalive:v.keepalive,method:v.method,mode:v.mode,redirect:v.redirect,referrer:v.referrer,referrerPolicy:v.referrerPolicy,signal:v.signal,...U}):q=v;const V=new URL(q,c);return D(V.href),V.origin===c.origin&&(q=V.href.slice(c.origin.length)),m?Vt(q,V.href,U):qt(q,U)},setHeaders:()=>{},depends:D,parent(){return h.parent=!0,r()}};w=await b.universal.load.call(null,R)??null,w=w?await en(w):null}return{node:b,loader:o,server:d,universal:(L=b.universal)!=null&&L.load?{type:"data",data:w,uses:h}:null,data:w??(d==null?void 0:d.data)??null,slash:((S=b.universal)==null?void 0:S.trailingSlash)??(d==null?void 0:d.slash)}}function Ke(o,r,c,l,p){if(I)return!0;if(!l)return!1;if(l.parent&&o||l.route&&r||l.url&&c)return!0;for(const d of l.params)if(p[d]!==t.params[d])return!0;for(const d of l.dependencies)if(n.some(w=>w(new URL(d))))return!0;return!1}function Ee(o,r){return(o==null?void 0:o.type)==="data"?{type:"data",data:o.data,uses:{dependencies:new Set(o.uses.dependencies??[]),params:new Set(o.uses.params??[]),parent:!!o.uses.parent,route:!!o.uses.route,url:!!o.uses.url},slash:o.slash}:(o==null?void 0:o.type)==="skip"?r??null:null}async function Ge({id:o,invalidating:r,url:c,params:l,route:p}){if((i==null?void 0:i.id)===o)return i.promise;const{errors:d,layouts:w,leaf:h}=p,b=[...w,h];d.forEach(E=>E==null?void 0:E().catch(()=>{})),b.forEach(E=>E==null?void 0:E[1]().catch(()=>{}));let y=null;const L=t.url?o!==t.url.pathname+t.url.search:!1,S=t.route?p.id!==t.route.id:!1;let D=!1;const R=b.map((E,T)=>{var z;const N=t.branch[T],j=!!(E!=null&&E[0])&&((N==null?void 0:N.loader)!==E[1]||Ke(D,S,L,(z=N.server)==null?void 0:z.uses,l));return j&&(D=!0),j});if(R.some(Boolean)){try{y=await st(c,R)}catch(E){return ue({status:E instanceof le?E.status:500,error:await oe(E,{url:c,params:l,route:{id:p.id}}),url:c,route:p})}if(y.type==="redirect")return y}const v=y==null?void 0:y.nodes;let U=!1;const q=b.map(async(E,T)=>{var ke;if(!E)return;const N=t.branch[T],j=v==null?void 0:v[T];if((!j||j.type==="skip")&&E[1]===(N==null?void 0:N.loader)&&!Ke(U,S,L,(ke=N.universal)==null?void 0:ke.uses,l))return N;if(U=!0,(j==null?void 0:j.type)==="error")throw j;return ve({loader:E[1],url:c,params:l,route:p,parent:async()=>{var Ze;const Xe={};for(let Se=0;Se<T;Se+=1)Object.assign(Xe,(Ze=await q[Se])==null?void 0:Ze.data);return Xe},server_data_node:Ee(j===void 0&&E[0]?{type:"skip"}:j??null,E[0]?N==null?void 0:N.server:void 0)})});for(const E of q)E.catch(()=>{});const V=[];for(let E=0;E<b.length;E+=1)if(b[E])try{V.push(await q[E])}catch(T){if(T instanceof ot)return{type:"redirect",location:T.location};let N=500,j;if(v!=null&&v.includes(T))N=T.status??N,j=T.error;else if(T instanceof le)N=T.status,j=T.body;else{if(await H.updated.check())return await ae(c);j=await oe(T,{params:l,url:c,route:{id:p.id}})}const z=await Je(E,V,d);return z?await te({url:c,params:l,branch:V.slice(0,z.idx).concat(z.node),status:N,error:j,route:p}):await Ye(c,{id:p.id},j,N)}else V.push(void 0);return await te({url:c,params:l,branch:V,status:200,error:null,route:p,form:r?void 0:null})}async function Je(o,r,c){for(;o--;)if(c[o]){let l=o;for(;!r[l];)l-=1;try{return{idx:l+1,node:{node:await c[o](),loader:c[o],data:{},server:null,universal:null}}}catch{continue}}}async function ue({status:o,error:r,url:c,route:l}){const p={};let d=null;if(ft[0]===0)try{const y=await st(c,[!0]);if(y.type!=="data"||y.nodes[0]&&y.nodes[0].type!=="data")throw 0;d=y.nodes[0]??null}catch{(c.origin!==location.origin||c.pathname!==location.pathname||f)&&await ae(c)}const h=await ve({loader:ut,url:c,params:p,route:l,parent:()=>Promise.resolve({}),server_data_node:Ee(d)}),b={node:await Te(),loader:Te,universal:null,server:null,data:null};return await te({url:c,params:p,branch:[h,b],status:o,error:r,route:null})}function ne(o,r){if(et(o,X))return;const c=de(o);for(const l of Pe){const p=l.exec(c);if(p)return{id:o.pathname+o.search,invalidating:r,route:l,params:Pt(p),url:o}}}function de(o){return Ot(o.pathname.slice(X.length)||"/")}function ze({url:o,type:r,intent:c,delta:l}){var h,b;let p=!1;const d={from:{params:t.params,route:{id:((h=t.route)==null?void 0:h.id)??null},url:t.url},to:{params:(c==null?void 0:c.params)??null,route:{id:((b=c==null?void 0:c.route)==null?void 0:b.id)??null},url:o},willUnload:!c,type:r};l!==void 0&&(d.delta=l);const w={...d,cancel:()=>{p=!0}};return A||u.before_navigate.forEach(y=>y(w)),p?null:d}async function pe({url:o,scroll:r,keepfocus:c,redirect_chain:l,details:p,type:d,delta:w,nav_token:h,accepted:b,blocked:y}){const L=ne(o,!1),S=ze({url:o,type:d,delta:w,intent:L});if(!S){y();return}const D=O;b(),A=!0,m&&H.navigating.set(S),await Me(L,o,l,D,{scroll:r,keepfocus:c,details:p},h,()=>{A=!1,u.after_navigate.forEach(R=>R(S)),H.navigating.set(null)})}async function Ye(o,r,c,l){return o.origin===location.origin&&o.pathname===location.pathname&&!f?await ue({status:l,error:c,url:o,route:r}):await ae(o)}function ae(o){return location.href=o.href,new Promise(()=>{})}function dt(){let o;e.addEventListener("mousemove",d=>{const w=d.target;clearTimeout(o),o=setTimeout(()=>{l(w,2)},20)});function r(d){l(d.composedPath()[0],1)}e.addEventListener("mousedown",r),e.addEventListener("touchstart",r,{passive:!0});const c=new IntersectionObserver(d=>{for(const w of d)w.isIntersecting&&(fe(de(new URL(w.target.href))),c.unobserve(w.target))},{threshold:0});function l(d,w){const h=xe(d,e);if(!h)return;const{url:b,external:y}=Le(h,X);if(y)return;const L=me(h);if(!L.reload)if(w<=L.preload_data){const S=ne(b,!1);S&&He(S)}else w<=L.preload_code&&fe(de(b))}function p(){c.disconnect();for(const d of e.querySelectorAll("a")){const{url:w,external:h}=Le(d,X);if(h)continue;const b=me(d);b.reload||(b.preload_code===tt.viewport&&c.observe(d),b.preload_code===tt.eager&&fe(de(w)))}}u.after_navigate.push(p),p()}return{after_navigate:o=>{je(()=>(u.after_navigate.push(o),()=>{const r=u.after_navigate.indexOf(o);u.after_navigate.splice(r,1)}))},before_navigate:o=>{je(()=>(u.before_navigate.push(o),()=>{const r=u.before_navigate.indexOf(o);u.before_navigate.splice(r,1)}))},disable_scroll_handling:()=>{(g||!m)&&(_=!1)},goto:(o,r={})=>be(o,r,[]),invalidate:o=>{if(typeof o=="function")n.push(o);else{const{href:r}=new URL(o,location.href);n.push(c=>c.href===r)}return Ve()},invalidateAll:()=>(I=!0,Ve()),preload_data:async o=>{const r=new URL(o,Qe(document)),c=ne(r,!1);if(!c)throw new Error(`Attempted to preload a URL that does not belong to this app: ${r}`);await He(c)},preload_code:fe,apply_action:async o=>{if(o.type==="error"){const r=new URL(location.href),{branch:c,route:l}=t;if(!l)return;const p=await Je(t.branch.length,c,l.errors);if(p){const d=await te({url:r,params:t.params,branch:c.slice(0,p.idx).concat(p.node),status:o.status??500,error:o.error,route:l});t=d.state,C.$set(d.props),he().then(Ne)}}else if(o.type==="redirect")be(o.location,{invalidateAll:!0},[]);else{const r={form:o.data,page:{...J,form:o.data,status:o.status}};C.$set(r),o.type==="success"&&he().then(Ne)}},_start_router:()=>{var o;history.scrollRestoration="manual",addEventListener("beforeunload",r=>{var l;let c=!1;if(!A){const p={from:{params:t.params,route:{id:((l=t.route)==null?void 0:l.id)??null},url:t.url},to:null,willUnload:!0,type:"leave",cancel:()=>c=!0};u.before_navigate.forEach(d=>d(p))}c?(r.preventDefault(),r.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&(Ue(O),nt(it,Y),Fe(O),nt(lt,re))}),(o=navigator.connection)!=null&&o.saveData||dt(),e.addEventListener("click",r=>{if(r.button||r.which!==1||r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.defaultPrevented)return;const c=xe(r.composedPath()[0],e);if(!c)return;const{url:l,external:p,target:d}=Le(c,X);if(!l)return;if(d==="_parent"||d==="_top"){if(window.parent!==window)return}else if(d&&d!=="_self")return;const w=me(c);if(!(c instanceof SVGAElement)&&l.protocol!==location.protocol&&!(l.protocol==="https:"||l.protocol==="http:"))return;if(p||w.reload){ze({url:l,type:"link"})||r.preventDefault(),A=!0;return}const[b,y]=l.href.split("#");if(y!==void 0&&b===location.href.split("#")[0]){P=!0,Ue(O),t.url=l,H.page.set({...J,url:l}),H.page.notify();return}pe({url:l,scroll:w.noscroll?se():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:l.href===location.href},accepted:()=>r.preventDefault(),blocked:()=>r.preventDefault(),type:"link"})}),e.addEventListener("submit",r=>{if(r.defaultPrevented)return;const c=HTMLFormElement.prototype.cloneNode.call(r.target),l=r.submitter;if(((l==null?void 0:l.formMethod)||c.method)!=="get")return;const d=new URL((l==null?void 0:l.hasAttribute("formaction"))&&(l==null?void 0:l.formAction)||c.action);if(et(d,X))return;const w=r.target,{noscroll:h,reload:b}=me(w);if(b)return;r.preventDefault(),r.stopPropagation();const y=new FormData(w),L=l==null?void 0:l.getAttribute("name");L&&y.append(L,(l==null?void 0:l.getAttribute("value"))??""),d.search=new URLSearchParams(y).toString(),pe({url:d,scroll:h?se():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",async r=>{var c;if((c=r.state)!=null&&c[F]){if(r.state[F]===O)return;const l=Y[r.state[F]];if(t.url.href.split("#")[0]===location.href.split("#")[0]){Y[O]=se(),O=r.state[F],scrollTo(l.x,l.y);return}const p=r.state[F]-O;let d=!1;await pe({url:new URL(location.href),scroll:l,keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{O=r.state[F]},blocked:()=>{history.go(-p),d=!0},type:"popstate",delta:p}),d||$e(O)}}),addEventListener("hashchange",()=>{P&&(P=!1,history.replaceState({...history.state,[F]:++O},"",location.href))});for(const r of document.querySelectorAll("link"))r.rel==="icon"&&(r.href=r.href);addEventListener("pageshow",r=>{r.persisted&&H.navigating.set(null)})},_hydrate:async({status:o=200,error:r,node_ids:c,params:l,route:p,data:d,form:w})=>{f=!0;const h=new URL(location.href);({params:l={},route:p={id:null}}=ne(h,!1)||{});let b;try{const y=c.map(async(L,S)=>{const D=d[S];return ve({loader:ye[L],url:h,params:l,route:p,parent:async()=>{const R={};for(let v=0;v<S;v+=1)Object.assign(R,(await y[v]).data);return R},server_data_node:Ee(D)})});b=await te({url:h,params:l,branch:await Promise.all(y),status:o,error:r,form:w,route:Pe.find(({id:L})=>L===p.id)??null})}catch(y){if(y instanceof ot){await ae(new URL(y.location,location.href));return}b=await ue({status:y instanceof le?y.status:500,error:await oe(y,{url:h,params:l,route:p}),url:h,route:p})}Be(b)}}}async function st(a,e){var u;const n=new URL(a);n.pathname=Dt(a.pathname),n.searchParams.append("x-sveltekit-invalidated",e.map(t=>t?"1":"").join("_"));const s=await we(n.href),i=await s.json();if(!s.ok)throw new le(s.status,i);return(u=i.nodes)==null||u.forEach(t=>{(t==null?void 0:t.type)==="data"&&(t.data=ln(t.data),t.uses={dependencies:new Set(t.uses.dependencies??[]),params:new Set(t.uses.params??[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url})}),i}function oe(a,e){return a instanceof le?a.body:xt.handleError({error:a,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}function Ne(){const a=document.querySelector("[autofocus]");if(a)a.focus();else{const e=document.body,n=e.getAttribute("tabindex");return e.tabIndex=-1,e.focus({preventScroll:!0}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex"),new Promise(s=>{setTimeout(()=>{var i;s((i=getSelection())==null?void 0:i.removeAllRanges())})})}}async function gn({assets:a,env:e,hydrate:n,target:s,version:i}){Lt(a),It(i);const u=fn({target:s});Rt({client:u}),n?await u._hydrate(n):u.goto(location.href,{replaceState:!0}),u._start_router()}export{gn as start};
