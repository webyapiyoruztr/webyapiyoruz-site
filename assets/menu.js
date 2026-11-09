/* Web Yapıyoruz — sağ üst üç çubuklu menü: açılınca şeffaf dijital dünya menüsü */
(function(){
var head=document.querySelector('header .nav');if(!head)return;
var nav=head.querySelector('nav');if(!nav)return;
var host=head.querySelector('.rt')||head;
var btn=document.createElement('button');btn.className='hb';btn.type='button';btn.setAttribute('aria-label','Menü');btn.setAttribute('aria-expanded','false');
btn.innerHTML='<i></i><i></i><i></i>';host.appendChild(btn);
var m=document.createElement('div');m.id='dmenu';m.setAttribute('aria-hidden','true');
function ic(p){return '<svg class="mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}
var I={'sablonlar.html':'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
'dijital-dunyam.html':'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M8 14h4"/>',
'sektorler.html':'<path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M8 10h.01M12 10h.01M16 10h.01"/>',
'panel.html':'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
'nasil-calisir.html':'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15a3 3 0 010 6H9a3 3 0 000 6h6.5"/>',
'sss.html':'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.7-2.5 2-2.5 4M12 17h.01"/>'};
var SUB=[['dijital-dunyam.html#davetiye','Davetiye','Düğün, nişan, kına','<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.6-7 10-7 10z"/>'],
['dijital-dunyam.html#surpriz','Sürpriz','Doğum günü, özel gün','<rect x="3" y="9" width="18" height="11" rx="2"/><path d="M12 9v11M3 13h18M12 9C9 9 8 5.5 10 5s2 4 2 4zM12 9c3 0 4-3.5 2-4s-2 4-2 4z"/>'],
['dijital-dunyam.html#cv','CV','CV ve portfolyo','<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'],
['dijital-dunyam.html#odev','Ödev','Okul ve ödev sunumu','<path d="M5 4h13v16H7a2 2 0 01-2-2zM5 18a2 2 0 012-2h11"/>'],
['dijital-dunyam.html#sunum','Sunum','İş ve tanıtım sunumu','<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/>'],
['dijital-dunyam.html#menu','Menü','Esnaf menü ve kampanya','<path d="M6 3v8M9 3v8M6 7h3M7.5 11v10M17 3c-2 2-2 6 0 8v10"/>'],
['dijital-dunyam.html#oncesonra','Önce / Sonra','Güzellik ve kuaför vitrini','<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/>'],
['dijital-dunyam.html#ilan','İlan','Emlak ilan panosu','<path d="M3 11l9-8 9 8v9H3zM10 20v-6h4v6"/>'],
['dijital-dunyam.html#ajanda','Ajanda','Hatıra ve ajanda','<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>']];
var list='';[].forEach.call(nav.querySelectorAll('a'),function(a){var h=a.getAttribute('href');
list+='<a href="'+h+'"'+(a.classList.contains('cur-p')?' class="on"':'')+'>'+ic(I[h]||'<circle cx="12" cy="12" r="4"/>')+'<span>'+a.textContent+'</span></a>';
if(h==='dijital-dunyam.html'){list+='<div class="dm-sub">';SUB.forEach(function(x){list+='<a href="'+x[0]+'">'+ic(x[3])+'<span>'+x[1]+'<small>'+x[2]+'</small></span></a>'});list+='</div>'}});
m.innerHTML='<div class="dm-bg"></div><aside class="dm-p"><div class="dm-h">Menü</div>'+list+'<a href="panelim.html">'+ic('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>')+'<span>Panelim / Giriş</span></a><a class="dm-cta" href="iletisim.html">'+ic('<path d="M4 5h16v11H9l-5 4z"/>')+'<span>Ücretsiz görüşme</span></a><div class="dm-f">Dijital dünyaya hazır mısınız?</div></aside>';
document.body.appendChild(m);
function set(o){m.classList.toggle('on',o);btn.setAttribute('aria-expanded',o?'true':'false');m.setAttribute('aria-hidden',o?'false':'true');document.documentElement.style.overflow=o?'hidden':''}
btn.addEventListener('click',function(){set(!m.classList.contains('on'))});
m.querySelector('.dm-bg').addEventListener('click',function(){set(false)});
var hd=document.querySelector('header');function sc(){if(hd)hd.classList.toggle('sc',(window.scrollY||document.documentElement.scrollTop)>60)}sc();window.addEventListener('scroll',sc,{passive:true});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
[].forEach.call(m.querySelectorAll('a'),function(a){a.addEventListener('click',function(){set(false)})});
})();
