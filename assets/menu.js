/* Web Yapıyoruz — sağ üst üç çubuklu menü: açılınca şeffaf dijital dünya menüsü */
(function(){
var head=document.querySelector('header .nav');if(!head)return;
var nav=head.querySelector('nav');if(!nav)return;
var host=head.querySelector('.rt')||head;
var btn=document.createElement('button');btn.className='hb';btn.type='button';btn.setAttribute('aria-label','Menü');btn.setAttribute('aria-expanded','false');
btn.innerHTML='<i></i><i></i><i></i>';host.appendChild(btn);

/* Görünür giriş düğmesi: oturum açıksa "Panelim" olur */
(function(){var lg=document.createElement('a');lg.className='pill sm gir';lg.href='giris.html';lg.textContent='Giriş yap';
try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(/^sb-.*-auth-token$/.test(k)&&localStorage.getItem(k)){lg.textContent='Panelim';lg.href='panelim.html';break}}}catch(e){}
var cta=host.querySelector('.pill');host.insertBefore(lg,cta||btn)})();
var m=document.createElement('div');m.id='dmenu';m.setAttribute('aria-hidden','true');
function ic(p){return '<svg class="mi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}
var I={'sablonlar.html':'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
'programlar.html':'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 9h10M7 12h6"/>',
'teklif.html':'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
'sektorler.html':'<path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M8 10h.01M12 10h.01M16 10h.01"/>',
'panel.html':'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
'nasil-calisir.html':'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15a3 3 0 010 6H9a3 3 0 000 6h6.5"/>',
'seo.html':'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>','sosyal-medya.html':'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>','sss.html':'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.7-2.5 2-2.5 4M12 17h.01"/>'};
var list='';[].forEach.call(nav.querySelectorAll('a'),function(a){var h=a.getAttribute('href');
list+='<a href="'+h+'"'+(a.classList.contains('cur-p')?' class="on"':'')+'>'+ic(I[h]||'<circle cx="12" cy="12" r="4"/>')+'<span>'+a.textContent+'</span></a>';});
m.innerHTML='<div class="dm-bg"></div><aside class="dm-p"><div class="dm-h">Menü</div>'+list+'<a href="panelim.html">'+ic('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>')+'<span>Panelim / Giriş</span></a><a class="dm-cta" href="iletisim.html">'+ic('<path d="M4 5h16v11H9l-5 4z"/>')+'<span>Bize ulaşın</span></a><div class="dm-f">Dijital dünyaya hazır mısınız?</div></aside>';
document.body.appendChild(m);
function set(o){m.classList.toggle('on',o);btn.setAttribute('aria-expanded',o?'true':'false');m.setAttribute('aria-hidden',o?'false':'true');document.documentElement.style.overflow=o?'hidden':''}
btn.addEventListener('click',function(){set(!m.classList.contains('on'))});
m.querySelector('.dm-bg').addEventListener('click',function(){set(false)});
var hd=document.querySelector('header');function sc(){if(hd)hd.classList.toggle('sc',(window.scrollY||document.documentElement.scrollTop)>60)}sc();window.addEventListener('scroll',sc,{passive:true});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
[].forEach.call(m.querySelectorAll('a'),function(a){a.addEventListener('click',function(){set(false)})});
})();
