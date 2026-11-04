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
var c=a.closest(".it,.wk,.cap-wrap,.gg>div");var t=c&&c.querySelector("h3")?c.querySelector("h3").textContent:(document.getElementById("cap")?document.getElementById("cap").textContent:"Önizleme");openM(t,h)}});
/* hero peek */
var pk=document.getElementById("peek");
if(pk){var hp=[].slice.call(pk.querySelectorAll(".hp")),hc=0,n=hp.length;
function hset(){hp.forEach(function(e,i){var o=((i-hc)%n+n)%n;if(o>n/2)o-=n;e.className="hp h"+(Math.abs(o)<=2?o:"x")})}
hset();if(!rm)setInterval(function(){hc=(hc+1)%n;hset()},3400)}
/* sector stage + accordion */
var it=[].slice.call(document.querySelectorAll("#acc .it")),ps=[].slice.call(document.querySelectorAll("#stage .p"));
if(it.length){
var icons=['M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5','M12 7a2 2 0 1 1 2 2l-2 1v1M3 18l9-7 9 7z','M3 16v-3l2-5h14l2 5v3M3 16h18M7 16v2M17 16v2','M4 21V8l8-5 8 5v13M9 21v-6h6v6','M3 18V7M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6','M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z','M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z','M5 17a3 3 0 1 0 .01 0M19 17a3 3 0 1 0 .01 0M5 17l4-7h5l5 7M9 10L8 7H6','M10 15a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM22 15a4 4 0 1 0-8 0 4 4 0 0 0 8 0z','M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12h.01','M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2'];
it.forEach(function(e,i){var h=e.querySelector("h3");var s=document.createElement("i");s.className="si";s.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="'+(icons[i]||icons[0])+'"/></svg>';h.insertBefore(s,h.firstChild)});
var cur=0,tm;ps[0]&&ps[0].classList.add("on");function pk(){ps.forEach(function(p){p.classList.remove("pk")});var n=ps[(cur+1)%ps.length];if(n&&n!==ps[cur])n.classList.add("pk")}pk();
function show(i){if(i===cur)return;var o=ps[cur],nw=ps[i];
it[cur].classList.remove("on");it[i].classList.add("on");
if(o){o.classList.remove("on");o.classList.add("out")}
if(nw){nw.classList.remove("out");void nw.offsetWidth;nw.classList.add("on")}
var old=o;setTimeout(function(){if(old&&old!==ps[cur]){old.classList.add("nt");old.classList.remove("out");void old.offsetWidth;old.classList.remove("nt")}},900);
cur=i;pk()}
it.forEach(function(e,i){e.addEventListener("click",function(ev){if(ev.target.closest("a"))return;show(i);rs()})});
var hov=false,sek=document.querySelector(".sek");
if(sek){sek.addEventListener("mouseenter",function(){hov=true});sek.addEventListener("mouseleave",function(){hov=false})}
function rs(){clearInterval(tm);if(!rm)tm=setInterval(function(){if(!hov)show((cur+1)%it.length)},3000)}
rs()}
/* panel cycle */
var sm=[].slice.call(document.querySelectorAll("#dash .sm")),pn=[].slice.call(document.querySelectorAll("#dash .pane"));
if(sm.length){var pc=0,pt,stopped=false,ph=false;
function pshow(i){sm[pc].classList.remove("on");pn[pc].classList.remove("on");pc=i;sm[pc].classList.add("on");pn[pc].classList.add("on")}
sm.forEach(function(e,i){e.addEventListener("click",function(){stopped=true;clearInterval(pt);pshow(i)})});
var dh=document.getElementById("dash");dh.addEventListener("mouseenter",function(){ph=true});dh.addEventListener("mouseleave",function(){ph=false});
if(!rm)pt=setInterval(function(){if(!stopped&&!ph)pshow((pc+1)%sm.length)},4500)}

/* phones: real sites scaled to phone width */
function fitPh(){[].slice.call(document.querySelectorAll(".phones iframe")).forEach(function(f){var s=f.parentNode,w=s.clientWidth,k=w/390;f.style.width="390px";f.style.height=(s.clientHeight/k)+"px";f.style.transform="scale("+k+")"})}
function fitLv(){[].slice.call(document.querySelectorAll(".live iframe")).forEach(function(f){var k=f.parentNode.clientWidth/1280;f.style.transform="scale("+k+")"})}fitLv();window.addEventListener("resize",fitLv);window.addEventListener("load",fitLv);fitPh();window.addEventListener("resize",fitPh);window.addEventListener("load",fitPh);
})();
