(()=>{var n=(Math.random()*1e4).toString().substr(0,4),c=new Peer(n),d=document.getElementById("localVideo"),a=document.getElementById("remoteVideo"),r=document.getElementById("callButton"),l=document.getElementById("input"),i=document.getElementById("number"),s=document.createTextNode(n);i.appendChild(s);r.onclick=()=>{navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then(e=>{d.srcObject=e;let t=c.call(l.value,e);video.onloadedmetadata=function(o){video.play()},t.on("stream",o=>{a.srcObject=o})},e=>{console.error("Failed to get local stream",e)})};c.on("call",e=>{navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then(t=>{e.answer(t),d.srcObject=t,e.on("stream",o=>{a.srcObject=o})},t=>{console.error("Failed to get local stream",t)})});})();
