(()=>{var K=new WeakMap;function C(t){return K.has(t)||K.set(t,{activeTransforms:[],activeAnimations:{}}),K.get(t)}function Q(t,e){t.indexOf(e)===-1&&t.push(e)}var w=()=>{},j=t=>t;var Ot=["","X","Y","Z"],It=["translate","scale","rotate","skew"],W={x:"translateX",y:"translateY",z:"translateZ"},Y={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Pt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:Y,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:j},skew:Y},x=new Map,B=t=>`--motion-${t}`,L=["x","y","z"];It.forEach(t=>{Ot.forEach(e=>{L.push(t+e),x.set(B(t+e),Pt[t])})});var Ft=(t,e)=>L.indexOf(t)-L.indexOf(e),Dt=new Set(L),tt=t=>Dt.has(t),et=(t,e)=>{let{activeTransforms:s}=C(t);Q(s,e),t.style.transform=Mt(s)},Mt=t=>t.sort(Ft).reduce(Vt,"").trim(),Vt=(t,e)=>`${t} ${e}(var(${B(e)}))`;var U=t=>t.startsWith("--"),st=new Set;function rt(t){if(!st.has(t)){st.add(t);try{let{syntax:e,initialValue:s}=x.has(t)?x.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:s})}catch(e){}}}var O=t=>t*1e3;function k(t){try{t.playState!=="finished"&&t.commitStyles(),t.cancel()}catch(e){}}var Rt=t=>Array.isArray(t)&&typeof t[0]=="number",T=t=>Array.isArray(t)&&typeof t[0]!="number",_=t=>Rt(t)?Ct(t):t,Ct=([t,e,s,r])=>`cubic-bezier(${t}, ${e}, ${s}, ${r})`;var it=t=>document.createElement("div").animate(t,{duration:.001}),nt={cssRegisterProperty:()=>typeof CSS!="undefined"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{it({opacity:[1]})}catch(t){return!1}return!0},finished:()=>Boolean(it({opacity:[0,1]}).finished)},X={},z=Object.keys(nt).reduce((t,e)=>(t[e]=()=>(X[e]===void 0&&(X[e]=nt[e]()),X[e]),t),{});var ot=(t,e)=>s=>t.style.setProperty(e,s),at=(t,e)=>s=>t.style[e]=s;var u={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"};var ct=(t,e,s)=>(((1-3*s+3*e)*t+(3*s-6*e))*t+3*e)*t,Bt=1e-7,Lt=12;function Ut(t,e,s,r,o){let n,i,p=0;do i=e+(s-e)/2,n=ct(i,r,o)-t,n>0?s=i:e=i;while(Math.abs(n)>Bt&&++p<Lt);return i}function I(t,e,s,r){if(t===e&&s===r)return j;let o=n=>Ut(n,0,1,t,s);return n=>n===0||n===1?n:ct(o(n),e,r)}var lt=(t,e,s)=>Math.min(Math.max(s,t),e);var ut=(t,e="end")=>s=>{s=e==="end"?Math.min(s,.999):Math.max(s,.001);let r=s*t,o=e==="end"?Math.floor(r):Math.ceil(r);return lt(0,1,o/t)};var mt={ease:I(.25,.1,.25,1),"ease-in":I(.42,0,1,1),"ease-in-out":I(.42,0,.58,1),"ease-out":I(0,0,.58,1)},kt=/\((.*?)\)/;function Z(t){if(typeof t=="function")return t;if(Array.isArray(t))return I(...t);if(mt[t])return mt[t];if(t.startsWith("steps")){let e=kt.exec(t);if(e){let s=e[1].split(",");return ut(parseFloat(s[0]),s[1].trim())}}return j}var $=(t,e,s)=>-s*t+s*e+t;var q=(t,e,s)=>e-t==0?1:(s-t)/(e-t);var ft=(t,e,s)=>{let r=e-t;return((s-t)%r+r)%r+t};function pt(t,e){return T(t)?t[ft(0,t.length,e)]:t}function G(t,e){let s=t[t.length-1];for(let r=1;r<=e;r++){let o=q(0,e,r);t.push($(s,1,o))}}function dt(t){let e=[0];return G(e,t-1),e}var zt=t=>Math.min(1,Math.max(t,0));function ht(t,e=dt(t.length),s=j){let r=t.length,o=r-e.length;return o>0&&G(e,o),n=>{let i=0;for(;i<r-2&&!(n<e[i+1]);i++);let p=zt(q(e[i],e[i+1],n));return p=pt(s,i)(p),$(t[i],t[i+1],p)}}var gt=class{constructor(e,s,{easing:r=u.easing,duration:o=u.duration,delay:n=u.delay,endDelay:i=u.endDelay,offset:p,repeat:d=u.repeat,direction:g="normal"}){this.startTime=0,this.rate=1,this.t=0,this.cancelT=0,this.playState="idle",this.finished=new Promise((y,f)=>{this.resolve=y,this.reject=f});let v=o*(d+1),V=ht(s,p,T(r)?r.map(Z):Z(r));this.tick=y=>{if(this.playState==="finished"){let R=V(1);e(R),this.resolve(R);return}this.pauseTime&&(y=this.pauseTime);let f=(y-this.startTime)*this.rate;this.t=f,f/=1e3,f=Math.max(f-n,0);let h=f/o,F=Math.floor(h),c=h%1;!c&&h>=1&&(c=1),c===1&&F--;let a=F%2;(g==="reverse"||g==="alternate"&&a||g==="alternate-reverse"&&!a)&&(c=1-c);let m=f>=v?1:Math.min(c,1),S=V(m);e(S),f>=v+i?(this.playState="finished",this.resolve(S)):this.playState!=="idle"&&requestAnimationFrame(this.tick)},this.play()}play(){let e=performance.now();this.playState="running",this.pauseTime?this.startTime=e-(this.pauseTime-this.startTime):this.startTime||(this.startTime=e),this.pauseTime=void 0,requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=performance.now()}finish(){this.playState="finished",this.tick(0)}cancel(){this.playState="idle",this.tick(this.cancelT),this.reject(!1)}reverse(){this.rate*=-1}commitStyles(){this.cancelT=this.t}get currentTime(){return this.t}set currentTime(e){this.pauseTime||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}};function yt(t,e=[0,1],s={}){return new gt(t,e,s)}var D={get:(t,e)=>{let s=U(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!s&&s!==0){let r=x.get(e);r&&(s=r.initialValue)}return s}};function jt(t,e,s){for(let r=0;r<t.length;r++)t[r]===null&&(t[r]=r?t[r-1]:D.get(e,s));return t}var xt=t=>Array.isArray(t)?t:[t];function bt(t,e,s,r={}){let{duration:o=u.duration,delay:n=u.delay,endDelay:i=u.endDelay,repeat:p=u.repeat,easing:d=u.easing,direction:g,offset:v,allowWebkitAcceleration:V=!1}=r,y=C(t),f=z.waapi(),h=w,F=tt(e);F&&(W[e]&&(e=W[e]),et(t,e),e=B(e));let c=x.get(e),a=jt(xt(s),t,e);$t(y,e),U(e)?(h=ot(t,e),z.cssRegisterProperty()?rt(e):f=!1):h=at(t,e);let l;if(f){c&&(a=a.map(A=>typeof A=="number"?c.toDefaultUnit(A):A)),!z.partialKeyframes()&&a.length===1&&a.unshift(D.get(t,e));let m={delay:O(n),duration:O(o),endDelay:O(i),easing:T(d)?void 0:_(d),direction:g,iterations:p+1,fill:"forwards"};l=t.animate({[e]:a,offset:v,easing:T(d)?d.map(_):void 0},m),l.finished||(l.finished=new Promise((A,R)=>{l.onfinish=A,l.oncancel=R}));let S=a[a.length-1];l.finished.then(()=>h(S)).catch(w),V||(l.playbackRate=1.000001)}else if(F&&a.every(qt)){if(a.length===1&&a.unshift(D.get(t,e)||(c==null?void 0:c.initialValue)||0),a=a.map(m=>typeof m=="string"?parseFloat(m):m),c){let m=h;h=S=>m(c.toDefaultUnit(S))}l=yt(h,a,r)}else{let m=a[a.length-1];h(c&&typeof m=="number"?c.toDefaultUnit(m):m)}return y.activeAnimations[e]=l,l==null||l.finished.then(()=>y.activeAnimations[e]=void 0).catch(w),l}function $t(t,e){t.activeAnimations[e]&&(k(t.activeAnimations[e]),t.activeAnimations[e]=void 0)}var qt=t=>typeof t=="number";var vt=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function Tt(t,e){var s;return typeof t=="string"?e?((s=e[t])!==null&&s!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t)}var Et=(t,e)=>new Proxy({animations:t,duration:e},Nt),St=t=>t.animations[0],Nt={get:(t,e)=>{var s,r;switch(e){case"duration":return t.duration;case"currentTime":let o=((s=St(t))===null||s===void 0?void 0:s[e])||0;return o?o/1e3:0;case"playbackRate":return(r=St(t))===null||r===void 0?void 0:r[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(Kt)).catch(w)),t.finished;case"stop":return()=>t.animations.forEach(k);default:return()=>t.animations.forEach(n=>n[e]())}},set:(t,e,s)=>{switch(e){case"currentTime":s=O(s);case"currentTime":case"playbackRate":for(let r=0;r<t.animations.length;r++)t.animations[r][e]=s;return!0}return!1}},Kt=t=>t.finished;function At(t,e,s){return typeof t=="function"?t(e,s):t}function N(t,e,s={}){var r;t=Tt(t);let o=[],n=t.length;for(let i=0;i<n;i++){let p=t[i];for(let d in e){let g=vt(s,d);g.delay=At(g.delay,i,n);let v=bt(p,d,e[d],g);v&&o.push(v)}}return Et(o,(r=s.duration)!==null&&r!==void 0?r:u.duration)}var wt=(Math.random()*1e4).toString().substr(0,4),E,H,J=!0,M=new Peer(wt),b=document.getElementById("localVideo"),P=document.getElementById("remoteVideo"),Wt=document.getElementById("callButton"),_t=document.getElementById("camSwitch"),Xt=document.getElementById("hangUp"),Zt=document.getElementById("toggleFullScreen"),Gt=document.getElementById("input"),Ht=document.getElementById("number");window.onload=async()=>{E=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0})};var Jt=document.createTextNode(wt);Ht.appendChild(Jt);_t.addEventListener("click",async()=>{J=!J,b.srcObject.getTracks().forEach(t=>{t.stop()}),E=await navigator.mediaDevices.getUserMedia({audio:!0,video:{facingMode:J?"user":"environment"}}),b.srcObject=E});Zt.addEventListener("click",()=>Qt());function Qt(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}Wt.onclick=()=>{b.srcObject=E,H=M.call(Gt.value,E),H.on("stream",t=>{N(b,{x:100,y:100,scale:.5},{duration:.5}),P.classList.add("active"),P.srcObject=t})};M.on("call",t=>{setTimeout(()=>{t.answer(E),b.srcObject=E,t.on("stream",e=>{N(b,{x:100,y:100,scale:.5},{duration:.5}),P.classList.add("active"),P.srcObject=e})},2e3)});Xt.addEventListener("click",()=>{H.close(),M.disconnect(),b.srcObject=null,P.srcObject=null});M.on("close",()=>{M.disconnect(),b.srcObject=null,P.srcObject=null});})();
