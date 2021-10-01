(()=>{var q=new WeakMap;function k(t){return q.has(t)||q.set(t,{activeTransforms:[],activeAnimations:{}}),q.get(t)}function Q(t,e){t.indexOf(e)===-1&&t.push(e)}var O=()=>{},x=t=>t;var It=["","X","Y","Z"],Pt=["translate","scale","rotate","skew"],K={x:"translateX",y:"translateY",z:"translateZ"},Y={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Bt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:Y,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:x},skew:Y},j=new Map,C=t=>`--motion-${t}`,R=["x","y","z"];Pt.forEach(t=>{It.forEach(e=>{R.push(t+e),j.set(C(t+e),Bt[t])})});var Dt=(t,e)=>R.indexOf(t)-R.indexOf(e),Ft=new Set(R),tt=t=>Ft.has(t),et=(t,e)=>{let{activeTransforms:s}=k(t);Q(s,e),t.style.transform=Vt(s)},Vt=t=>t.sort(Dt).reduce(Mt,"").trim(),Mt=(t,e)=>`${t} ${e}(var(${C(e)}))`;var L=t=>t.startsWith("--"),st=new Set;function nt(t){if(!st.has(t)){st.add(t);try{let{syntax:e,initialValue:s}=j.has(t)?j.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:s})}catch(e){}}}var I=t=>t*1e3;function U(t){try{t.playState!=="finished"&&t.commitStyles(),t.cancel()}catch(e){}}var kt=t=>Array.isArray(t)&&typeof t[0]=="number",E=t=>Array.isArray(t)&&typeof t[0]!="number",W=t=>kt(t)?Ct(t):t,Ct=([t,e,s,n])=>`cubic-bezier(${t}, ${e}, ${s}, ${n})`;var it=t=>document.createElement("div").animate(t,{duration:.001}),rt={cssRegisterProperty:()=>typeof CSS!="undefined"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{it({opacity:[1]})}catch(t){return!1}return!0},finished:()=>Boolean(it({opacity:[0,1]}).finished)},_={},z=Object.keys(rt).reduce((t,e)=>(t[e]=()=>(_[e]===void 0&&(_[e]=rt[e]()),_[e]),t),{});var ot=(t,e)=>s=>t.style.setProperty(e,s),at=(t,e)=>s=>t.style[e]=s;var m={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"};var ct=(t,e,s)=>(((1-3*s+3*e)*t+(3*s-6*e))*t+3*e)*t,Rt=1e-7,Lt=12;function Ut(t,e,s,n,o){let r,i,d=0;do i=e+(s-e)/2,r=ct(i,n,o)-t,r>0?s=i:e=i;while(Math.abs(r)>Rt&&++d<Lt);return i}function P(t,e,s,n){if(t===e&&s===n)return x;let o=r=>Ut(r,0,1,t,s);return r=>r===0||r===1?r:ct(o(r),e,n)}var lt=(t,e,s)=>Math.min(Math.max(s,t),e);var mt=(t,e="end")=>s=>{s=e==="end"?Math.min(s,.999):Math.max(s,.001);let n=s*t,o=e==="end"?Math.floor(n):Math.ceil(n);return lt(0,1,o/t)};var ut={ease:P(.25,.1,.25,1),"ease-in":P(.42,0,1,1),"ease-in-out":P(.42,0,.58,1),"ease-out":P(0,0,.58,1)},zt=/\((.*?)\)/;function X(t){if(typeof t=="function")return t;if(Array.isArray(t))return P(...t);if(ut[t])return ut[t];if(t.startsWith("steps")){let e=zt.exec(t);if(e){let s=e[1].split(",");return mt(parseFloat(s[0]),s[1].trim())}}return x}var N=(t,e,s)=>-s*t+s*e+t;var $=(t,e,s)=>e-t==0?1:(s-t)/(e-t);var ft=(t,e,s)=>{let n=e-t;return((s-t)%n+n)%n+t};function dt(t,e){return E(t)?t[ft(0,t.length,e)]:t}function Z(t,e){let s=t[t.length-1];for(let n=1;n<=e;n++){let o=$(0,e,n);t.push(N(s,1,o))}}function pt(t){let e=[0];return Z(e,t-1),e}var Nt=t=>Math.min(1,Math.max(t,0));function ht(t,e=pt(t.length),s=x){let n=t.length,o=n-e.length;return o>0&&Z(e,o),r=>{let i=0;for(;i<n-2&&!(r<e[i+1]);i++);let d=Nt($(e[i],e[i+1],r));return d=dt(s,i)(d),N(t[i],t[i+1],d)}}var gt=class{constructor(e,s,{easing:n=m.easing,duration:o=m.duration,delay:r=m.delay,endDelay:i=m.endDelay,offset:d,repeat:p=m.repeat,direction:g="normal"}){this.startTime=0,this.rate=1,this.t=0,this.cancelT=0,this.playState="idle",this.finished=new Promise((y,f)=>{this.resolve=y,this.reject=f});let v=o*(p+1),V=ht(s,d,E(n)?n.map(X):X(n));this.tick=y=>{if(this.playState==="finished"){let M=V(1);e(M),this.resolve(M);return}this.pauseTime&&(y=this.pauseTime);let f=(y-this.startTime)*this.rate;this.t=f,f/=1e3,f=Math.max(f-r,0);let h=f/o,D=Math.floor(h),c=h%1;!c&&h>=1&&(c=1),c===1&&D--;let a=D%2;(g==="reverse"||g==="alternate"&&a||g==="alternate-reverse"&&!a)&&(c=1-c);let u=f>=v?1:Math.min(c,1),S=V(u);e(S),f>=v+i?(this.playState="finished",this.resolve(S)):this.playState!=="idle"&&requestAnimationFrame(this.tick)},this.play()}play(){let e=performance.now();this.playState="running",this.pauseTime?this.startTime=e-(this.pauseTime-this.startTime):this.startTime||(this.startTime=e),this.pauseTime=void 0,requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=performance.now()}finish(){this.playState="finished",this.tick(0)}cancel(){this.playState="idle",this.tick(this.cancelT),this.reject(!1)}reverse(){this.rate*=-1}commitStyles(){this.cancelT=this.t}get currentTime(){return this.t}set currentTime(e){this.pauseTime||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}};function yt(t,e=[0,1],s={}){return new gt(t,e,s)}var F={get:(t,e)=>{let s=L(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!s&&s!==0){let n=j.get(e);n&&(s=n.initialValue)}return s}};function xt(t,e,s){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:F.get(e,s));return t}var jt=t=>Array.isArray(t)?t:[t];function bt(t,e,s,n={}){let{duration:o=m.duration,delay:r=m.delay,endDelay:i=m.endDelay,repeat:d=m.repeat,easing:p=m.easing,direction:g,offset:v,allowWebkitAcceleration:V=!1}=n,y=k(t),f=z.waapi(),h=O,D=tt(e);D&&(K[e]&&(e=K[e]),et(t,e),e=C(e));let c=j.get(e),a=xt(jt(s),t,e);$t(y,e),L(e)?(h=ot(t,e),z.cssRegisterProperty()?nt(e):f=!1):h=at(t,e);let l;if(f){c&&(a=a.map(w=>typeof w=="number"?c.toDefaultUnit(w):w)),!z.partialKeyframes()&&a.length===1&&a.unshift(F.get(t,e));let u={delay:I(r),duration:I(o),endDelay:I(i),easing:E(p)?void 0:W(p),direction:g,iterations:d+1,fill:"forwards"};l=t.animate({[e]:a,offset:v,easing:E(p)?p.map(W):void 0},u),l.finished||(l.finished=new Promise((w,M)=>{l.onfinish=w,l.oncancel=M}));let S=a[a.length-1];l.finished.then(()=>h(S)).catch(O),V||(l.playbackRate=1.000001)}else if(D&&a.every(qt)){if(a.length===1&&a.unshift(F.get(t,e)||(c==null?void 0:c.initialValue)||0),a=a.map(u=>typeof u=="string"?parseFloat(u):u),c){let u=h;h=S=>u(c.toDefaultUnit(S))}l=yt(h,a,n)}else{let u=a[a.length-1];h(c&&typeof u=="number"?c.toDefaultUnit(u):u)}return y.activeAnimations[e]=l,l==null||l.finished.then(()=>y.activeAnimations[e]=void 0).catch(O),l}function $t(t,e){t.activeAnimations[e]&&(U(t.activeAnimations[e]),t.activeAnimations[e]=void 0)}var qt=t=>typeof t=="number";var vt=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function Et(t,e){var s;return typeof t=="string"?e?((s=e[t])!==null&&s!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t)}var Tt=(t,e)=>new Proxy({animations:t,duration:e},Kt),At=t=>t.animations[0],Kt={get:(t,e)=>{var s,n;switch(e){case"duration":return t.duration;case"currentTime":let o=((s=At(t))===null||s===void 0?void 0:s[e])||0;return o?o/1e3:0;case"playbackRate":return(n=At(t))===null||n===void 0?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(Wt)).catch(O)),t.finished;case"stop":return()=>t.animations.forEach(U);default:return()=>t.animations.forEach(r=>r[e]())}},set:(t,e,s)=>{switch(e){case"currentTime":s=I(s);case"currentTime":case"playbackRate":for(let n=0;n<t.animations.length;n++)t.animations[n][e]=s;return!0}return!1}},Wt=t=>t.finished;function St(t,e,s){return typeof t=="function"?t(e,s):t}function H(t,e,s={}){var n;t=Et(t);let o=[],r=t.length;for(let i=0;i<r;i++){let d=t[i];for(let p in e){let g=vt(s,p);g.delay=St(g.delay,i,r);let v=bt(d,p,e[p],g);v&&o.push(v)}}return Tt(o,(n=s.duration)!==null&&n!==void 0?n:m.duration)}var wt=(Math.random()*1e4).toString().substr(0,4),T,G,J=!0,B=new Peer(wt),A=document.getElementById("localVideo"),b=document.getElementById("remoteVideo"),_t=document.getElementById("callButton"),Xt=document.getElementById("answer"),Zt=document.getElementById("camera"),Ht=document.getElementById("mic"),Gt=document.getElementById("camSwitch"),Jt=document.getElementById("hangUp"),Qt=document.getElementById("toggleFullScreen"),Yt=document.getElementById("input"),te=document.getElementById("number"),ee=document.getElementById("text"),se=document.getElementById("send"),ne=document.getElementById("chat");function Ot(t){H(A,{x:-130,y:180,scale:.2},{duration:.25}),b.classList.add("active"),b.srcObject=t}window.onload=async()=>{T=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0})};var ie=document.createTextNode(wt);te.appendChild(ie);Gt.addEventListener("click",async()=>{J=!J,A.srcObject.getTracks().forEach(t=>{t.stop()}),T=await navigator.mediaDevices.getUserMedia({audio:!0,video:{facingMode:J?"user":"environment"}}),A.srcObject=T});Zt.addEventListener("click",()=>{b.getVideoTracks()[0].enabled=!b.getVideoTracks()[0].enabled});Ht.addEventListener("click",async()=>{b.getAuduiTracks()[0].enabled=!b.getAudioTracks()[0].enabled});Qt.addEventListener("click",()=>re());function re(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}_t.onclick=()=>{A.srcObject=T,G=B.call(Yt.value,T),G.on("stream",Ot)};B.on("call",t=>{let e=document.createElement("H2"),s=document.createTextNode(`The ID ${t.peer} is calling...`);e.appendChild(s),document.body.appendChild(e),Xt.addEventListener("click",()=>{t.answer(T),A.srcObject=T,t.on("stream",Ot)})});B.on("connection",function(t){t.on("data",function(e){let s=document.createElement("P"),n=document.createTextNode(e);s.appendChild(n),ne.appendChild(s)}),se.addEventListener("click",()=>{t.send(ee.value)})});Jt.addEventListener("click",()=>{G.close(),B.disconnect(),A.srcObject=null,b.srcObject=null});B.on("close",()=>{B.disconnect(),A.srcObject=null,b.srcObject=null});})();
