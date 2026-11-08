(function(){
var T=document.getElementById('toast'),tt;
function toast(m){T.textContent=m;T.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){T.classList.remove('on')},2600)}
window.toast=toast;
var els=document.querySelectorAll('.gp,.hero');
els.forEach(function(e,i){setTimeout(function(){e.classList.add('in')},120+i*110)});
setTimeout(function(){document.querySelectorAll('.bars u').forEach(function(u){u.style.width=u.getAttribute('data-w')})},600);
document.addEventListener('click',function(e){
var c=e.target.closest('[data-chip]');
if(c){var g=c.parentNode;if(g.hasAttribute('data-single')){[].forEach.call(g.children,function(x){x.classList.remove('on')});c.classList.add('on');var s=c.getAttribute('data-show');if(s){document.querySelectorAll('[data-pane]').forEach(function(p){p.hidden=p.getAttribute('data-pane')!==s})}}else{c.classList.toggle('on')}
var m=c.getAttribute('data-toast');if(m)toast(m);return}
var t=e.target.closest('[data-toast]');if(t&&!t.hasAttribute('data-chip')){e.preventDefault();toast(t.getAttribute('data-toast'))}
});
document.querySelectorAll('form[data-form]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();toast(f.getAttribute('data-form'));f.reset()})});
var r=document.getElementById('ba');if(r){var box=document.querySelector('.ba'),af=box.querySelector('.af');r.addEventListener('input',function(){var v=r.value;box.style.setProperty('--p',v+'%');af.style.clipPath='inset(0 0 0 '+v+'%)'})}
var sl=document.getElementById('slides');if(sl){var items=JSON.parse(sl.getAttribute('data-s')),n=0,h=sl.querySelector('h2'),p=sl.querySelector('p'),d=document.querySelectorAll('.dots i');function show(){h.textContent=items[n][0];p.textContent=items[n][1];d.forEach(function(x,i){x.classList.toggle('on',i===n)})}
document.getElementById('nx').addEventListener('click',function(){n=(n+1)%items.length;show()});document.getElementById('pv').addEventListener('click',function(){n=(n-1+items.length)%items.length;show()});show()}
var mf=document.getElementById('msgf');if(mf){mf.addEventListener('submit',function(e){e.preventDefault();var n=mf.querySelector('[name=n]').value.trim()||'Misafir',m=mf.querySelector('[name=m]').value.trim();if(!m)return;var d=document.createElement('div');d.className='msg';var b=document.createElement('b');b.textContent=n;d.appendChild(b);d.appendChild(document.createTextNode(m));document.getElementById('msgs').insertBefore(d,document.getElementById('msgs').firstChild);mf.reset();toast('Mesajınız eklendi (örnek).')})}
document.querySelectorAll('.cal button:not(.off)').forEach(function(b){b.addEventListener('click',function(){document.querySelectorAll('.cal button.on').forEach(function(x){x.classList.remove('on')});b.classList.add('on');var s=document.getElementById('seld');if(s)s.textContent=b.getAttribute('data-d')})});
})();
