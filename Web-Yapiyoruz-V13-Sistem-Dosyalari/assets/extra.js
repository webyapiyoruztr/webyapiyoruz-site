(function(){
var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
/* modal */
var wm=document.createElement("div");wm.className="wm";
wm.innerHTML='<div class="box"><div class="tb"><i></i><i></i><i></i><b id="wmT"></b><a id="wmL" target="_blank" rel="noopener">Yeni sekmede aç</a><button id="wmX" type="button" aria-label="Kapat">✕</button></div><iframe id="wmF" title="Önizleme"></iframe></div>';
document.body.appendChild(wm);
function openM(t,u){document.getElementById("wmT").textContent=t||"";document.getElementById("wmL").href=u;document.getElementById("wmF").src=u;wm.classList.add("on");document.body.style.overflow="hidden"}
function closeM(){wm.classList.remove("on");document.getElementById("wmF").src="about:blank";document.body.style.overflow=""}
window.WYModal=openM;
document.getElementById("wmX").onclick=closeM;
wm.addEventListener("click",function(e){if(e.target===wm)closeM()});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeM()});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a");if(!a)return;var h=a.getAttribute("href")||"";
if((a.target==="_blank"&&/^https?:/.test(h)&&!a.closest(".wm"))||/^demo\//.test(h)){e.preventDefault();
var c=a.closest(".it,.wk,.cap-wrap,.gg>div,.tc,.sxt");var t=c&&c.querySelector("h3,h4")?c.querySelector("h3,h4").textContent:(document.getElementById("cap")?document.getElementById("cap").textContent:"Önizleme");openM(t,h)}});
/* hero peek */
var pk=document.getElementById("peek");
if(pk){var hp=[].slice.call(pk.querySelectorAll(".hp")),hc=0,n=hp.length;
function hset(){hp.forEach(function(e,i){var o=((i-hc)%n+n)%n;if(o>n/2)o-=n;e.className="hp h"+(Math.abs(o)<=2?o:"x")})}
hset();if(!rm)setInterval(function(){hc=(hc+1)%n;hset()},3400)}
/* sector stage + slider */
var chips=[].slice.call(document.querySelectorAll("#sxtrack .chip")),ps=[].slice.call(document.querySelectorAll("#stage .p"));
if(chips.length){
var track=document.getElementById("sxtrack"),vp=track.parentNode,sxt=document.getElementById("sxt"),cur=0,tm,busy=false;
ps[0]&&ps[0].classList.add("on");
function tr(s){var D2=window.D;return(document.documentElement.lang==="en"&&D2&&D2[s]!==undefined)?D2[s]:s}
function pk(){ps.forEach(function(p){p.classList.remove("pk")});var n=ps[(cur+1)%ps.length];if(n&&n!==ps[cur])n.classList.add("pk")}
function info(i){var c=chips[i];document.getElementById("sxn").textContent=tr(c.dataset.n);document.getElementById("sxd").textContent=tr(c.dataset.d);var a=document.getElementById("sxa");a.href=c.dataset.u;document.getElementById("sxl").href="sablonlar.html#"+c.dataset.s}
function center(i){vp.scrollLeft=0;var c=chips[i];var x=c.offsetLeft+c.offsetWidth/2-vp.clientWidth/2;track.style.transform="translateX("+(-x)+"px)"}
function show(i,first){i=(i+chips.length)%chips.length;if(i===cur&&!first)return;var o=ps[cur],nw=ps[i];
chips[cur].classList.remove("on");chips[i].classList.add("on");
if(o&&o!==nw){o.classList.remove("on");o.classList.add("out")}
if(nw){nw.classList.remove("out","pk");void nw.offsetWidth;nw.classList.add("on")}
var old=o;setTimeout(function(){if(old&&old!==ps[cur]){old.classList.add("nt");old.classList.remove("out");void old.offsetWidth;old.classList.remove("nt")}},900);
sxt.classList.add("chg");setTimeout(function(){info(i);sxt.classList.remove("chg")},230);
cur=i;pk();center(i)}
chips.forEach(function(c,i){c.addEventListener("click",function(){show(i);rs()})});
document.getElementById("sxp").onclick=function(){show(cur-1);rs()};document.getElementById("sxn2").onclick=function(){show(cur+1);rs()};
function rs(){clearInterval(tm);if(!rm)tm=setInterval(function(){show(cur+1)},3200)}
[].slice.call(document.querySelectorAll("#tr,#en")).forEach(function(b){b.addEventListener("click",function(){setTimeout(function(){info(cur)},60)})});
info(0);pk();center(0);window.addEventListener("resize",function(){center(cur)});window.addEventListener("load",function(){center(cur)});rs()}
/* panel cycle */
var sm=[].slice.call(document.querySelectorAll("#dash .sm")),pn=[].slice.call(document.querySelectorAll("#dash .pane"));
if(sm.length){var pc=0,pt,stopped=false,ph=false;
function pshow(i){sm[pc].classList.remove("on");pn[pc].classList.remove("on");pc=i;sm[pc].classList.add("on");pn[pc].classList.add("on")}
sm.forEach(function(e,i){e.addEventListener("click",function(){stopped=true;clearInterval(pt);pshow(i)})});
var dh=document.getElementById("dash");dh.addEventListener("mouseenter",function(){ph=true});dh.addEventListener("mouseleave",function(){ph=false});
if(!rm)pt=setInterval(function(){if(!stopped&&!ph)pshow((pc+1)%sm.length)},4500)}

/* phones: real sites scaled to phone width */
function fitPh(){[].slice.call(document.querySelectorAll(".phones iframe")).forEach(function(f){var s=f.parentNode,w=s.clientWidth,k=w/390;f.style.width="390px";f.style.height=(s.clientHeight/k)+"px";f.style.transform="scale("+k+")"})}
function fitLv(){[].slice.call(document.querySelectorAll(".live iframe,.lv iframe")).forEach(function(f){var k=f.parentNode.clientWidth/1280;f.style.transform="scale("+k+")"})}fitLv();window.addEventListener("resize",fitLv);window.addEventListener("load",fitLv);fitPh();window.addEventListener("resize",fitPh);window.addEventListener("load",fitPh);
})();
