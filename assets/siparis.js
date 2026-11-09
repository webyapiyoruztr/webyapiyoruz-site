(function(){
if(!window.WY)return;
var c=window.WY.c;
c.from('fiyatlar').select('anahtar,ad,fiyat,grup').then(function(r){var FY={};(r.data||[]).forEach(function(f){FY[f.anahtar]=f});
 [].forEach.call(document.querySelectorAll('.ddc'),function(card){var f=FY[card.id];if(!f||f.fiyat==null)return;var box=card.querySelector('.ddc-f');if(!box)return;
  var b=document.createElement('button');b.type='button';b.className='sip';b.textContent='Sipariş ver';b.onclick=function(){window.WY.siparisVer(f.anahtar,f.ad,f.fiyat)};box.appendChild(b)})});
})();
