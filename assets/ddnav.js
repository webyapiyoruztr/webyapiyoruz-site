(function(){
var B=document.getElementById('ddchips');if(!B)return;
var C=[].slice.call(document.querySelectorAll('.ddc'));
function sel(k,scroll){
[].forEach.call(B.children,function(b){b.classList.toggle('on',b.getAttribute('data-k')===k)});
C.forEach(function(c){c.hidden=!(k==='all'||c.id===k);c.classList.remove('hl')});
if(k!=='all'){var c=document.getElementById(k);if(c){c.classList.add('hl');if(scroll)setTimeout(function(){B.scrollIntoView({behavior:'smooth',block:'start'})},60)}}
}
B.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var k=b.getAttribute('data-k');sel(k,false);try{history.replaceState(null,'',k==='all'?location.pathname:'#'+k)}catch(x){}});
function fromHash(){var k=(location.hash||'').slice(1);if(k&&document.getElementById(k)&&document.getElementById(k).classList.contains('ddc'))sel(k,true);else if(!k)sel('all',false)}
window.addEventListener('hashchange',fromHash);fromHash();
})();