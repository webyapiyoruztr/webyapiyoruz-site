/* Web Yapıyoruz — sağ üst üç çubuklu menü: açılınca şeffaf dijital dünya menüsü */
(function(){
var head=document.querySelector('header .nav');if(!head)return;
var nav=head.querySelector('nav');if(!nav)return;
var host=head.querySelector('.rt')||head;
var btn=document.createElement('button');btn.className='hb';btn.type='button';btn.setAttribute('aria-label','Menü');btn.setAttribute('aria-expanded','false');
btn.innerHTML='<i></i><i></i><i></i>';host.appendChild(btn);
var m=document.createElement('div');m.id='dmenu';m.setAttribute('aria-hidden','true');
var list='';[].forEach.call(nav.querySelectorAll('a'),function(a){list+='<a href="'+a.getAttribute('href')+'"'+(a.classList.contains('cur-p')?' class="on"':'')+'>'+a.textContent+'</a>'});
m.innerHTML='<div class="dm-bg"></div><aside class="dm-p"><div class="dm-h">Menü</div>'+list+'<a class="dm-cta" href="iletisim.html">Ücretsiz görüşme</a><div class="dm-f">Dijital dünyaya hazır mısınız?</div></aside>';
document.body.appendChild(m);
function set(o){m.classList.toggle('on',o);btn.setAttribute('aria-expanded',o?'true':'false');m.setAttribute('aria-hidden',o?'false':'true');document.documentElement.style.overflow=o?'hidden':''}
btn.addEventListener('click',function(){set(!m.classList.contains('on'))});
m.querySelector('.dm-bg').addEventListener('click',function(){set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
[].forEach.call(m.querySelectorAll('a'),function(a){a.addEventListener('click',function(){set(false)})});
})();
