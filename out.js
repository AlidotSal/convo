(()=>{var u=(Math.random()*1e4).toString().substr(0,4),n,a,l,r,i=!0,t=new Peer(u),c=document.getElementById("localVideo"),s=document.getElementById("remoteVideo"),y=document.getElementById("callButton"),B=document.getElementById("answer"),b=document.getElementById("camera"),h=document.getElementById("mic"),I=document.getElementById("camSwitch"),f=document.getElementById("hangUp"),k=document.getElementById("toggleFullScreen"),g=document.getElementById("input"),T=document.getElementById("number"),p=document.getElementById("text"),w=document.getElementById("send"),E=document.getElementById("chat");function v(e){c.classList.add("small"),s.classList.add("active"),s.srcObject=e}window.onload=async()=>{n=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0})};var L=document.createTextNode(u);T.appendChild(L);I.addEventListener("click",async()=>{i=!i,c.srcObject.getTracks().forEach(e=>{e.stop()}),n=await navigator.mediaDevices.getUserMedia({audio:!0,video:{facingMode:i?"user":"environment"}}),c.srcObject=n});b.addEventListener("click",()=>{a.getVideoTracks()[0].enabled=!a.getVideoTracks()[0].enabled});h.addEventListener("click",async()=>{a.getAuduiTracks()[0].enabled=!a.getAudioTracks()[0].enabled});k.addEventListener("click",()=>j());function j(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}w.addEventListener("click",()=>{let e=document.createElement("P");e.classList.add("sent");let d=document.createTextNode(p.value);e.appendChild(d),E.appendChild(e),r.send(p.value)});f.addEventListener("click",()=>{l.close(),t.disconnect(),t.destroy(),c.srcObject=null,s.srcObject=null});y.onclick=()=>{c.srcObject=n,l=t.call(g.value,n,{sdpTransform:e=>{}}),l.on("stream",v),r=t.connect(g.value)};t.on("call",e=>{let d=document.createElement("H2"),o=document.createTextNode(`The ID ${e.peer} is calling...`);d.appendChild(o),document.body.appendChild(d),B.addEventListener("click",()=>{e.answer(n,{sdpTransform:m=>{}}),c.srcObject=n,e.on("stream",v),r=t.connect(e.peer)})});t.on("connection",function(e){e.on("open",function(){e.on("data",function(d){let o=document.createElement("P");o.classList.add("received");let m=document.createTextNode(d);o.appendChild(m),E.appendChild(o)})})});t.on("disconnected",()=>{t.destroy(),c.srcObject=null,s.srcObject=null});})();
