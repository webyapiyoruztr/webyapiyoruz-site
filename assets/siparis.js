(function(){
if(!window.supabase||!window.SB_URL||window.SB_URL.indexOf('BURAYA')===0)return;
var c=window.supabase.createClient(window.SB_URL,window.SB_KEY),FY={},AY={};
function el(t,cl,tx){var e=document.createElement(t);if(cl)e.className=cl;if(tx!=null)e.textContent=tx;return e}
function tl(n){return Number(n||0).toLocaleString('tr-TR')+' ₺'}
function kod(){var s='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',r='WY-';for(var i=0;i<6;i++)r+=s.charAt(Math.floor(Math.random()*s.length));return r}
Promise.all([c.from('fiyatlar').select('anahtar,ad,fiyat'),c.from('ayarlar').select('anahtar,deger')]).then(function(a){
 (a[0].data||[]).forEach(function(f){FY[f.anahtar]=f});(a[1].data||[]).forEach(function(x){AY[x.anahtar]=x.deger});
 [].forEach.call(document.querySelectorAll('.ddc'),function(card){var f=FY[card.id];if(!f||f.fiyat==null)return;var box=card.querySelector('.ddc-f');if(!box)return;
  var b=el('button','sip','Sipariş ver');b.type='button';b.onclick=function(){ac(f)};box.appendChild(b)})});
function ac(f){
 var ov=el('div','sov'),bx=el('div','sbx');ov.appendChild(bx);
 function kapat(){ov.remove()}ov.addEventListener('click',function(e){if(e.target===ov)kapat()});
 var h=el('h3',null,f.ad+' siparişi');bx.appendChild(h);
 bx.appendChild(el('p','sm','Tutar: '+tl(f.fiyat)));
 var i1=el('input');i1.placeholder='Ad soyad';var i2=el('input');i2.placeholder='Telefon';i2.type='tel';var i3=el('input');i3.placeholder='E-posta';i3.type='email';
 [i1,i2,i3].forEach(function(i){bx.appendChild(i)});
 var msg=el('p','sm','');var go=el('button','sip','Siparişi tamamla');go.type='button';var cl=el('button','sip g','Kapat');cl.type='button';cl.onclick=kapat;
 var row=el('div','srow');row.appendChild(go);row.appendChild(cl);bx.appendChild(row);bx.appendChild(msg);
 go.onclick=function(){var ad=i1.value.trim(),tel=i2.value.trim();if(!ad||!tel){msg.textContent='Ad ve telefon yazın.';return}
  go.disabled=true;var k=kod();
  c.from('siparisler').insert({ad:ad,telefon:tel,eposta:i3.value.trim()||null,paket:f.ad,tutar:f.fiyat,kod:k}).then(function(r){
   if(r.error){go.disabled=false;msg.textContent='Sipariş alınamadı. Lütfen tekrar deneyin.';return}
   bx.textContent='';bx.appendChild(el('h3',null,'Siparişiniz alındı'));
   bx.appendChild(el('p','sm','Kodunuz: '+k));
   var t=el('div','stb');function satir(a,b){var r=el('div','sr');r.appendChild(el('span',null,a));r.appendChild(el('b',null,b||'—'));t.appendChild(r)}
   satir('Tutar',tl(f.fiyat));satir('Banka',AY.banka_adi);satir('Hesap sahibi',AY.hesap_sahibi);satir('IBAN',AY.iban);satir('Havale açıklaması',k);bx.appendChild(t);
   if(AY.odeme_notu)bx.appendChild(el('p','sm',AY.odeme_notu));
   bx.appendChild(el('p','sm','Havale/EFT açıklamasına yukarıdaki kodu yazın. Ödemeyi gördüğümüzde sizinle iletişime geçeriz.'));
   var r2=el('div','srow');
   if(AY.iban){var cp=el('button','sip','IBAN kopyala');cp.type='button';cp.onclick=function(){try{navigator.clipboard.writeText(AY.iban.replace(/\s/g,'')).then(function(){cp.textContent='Kopyalandı'})}catch(e){}};r2.appendChild(cp)}
   if(AY.whatsapp){var w=el('a','sip g','WhatsApp’tan haber ver');w.href='https://wa.me/'+AY.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent('Merhaba, '+k+' kodlu siparişimin havalesini yaptım.');w.target='_blank';w.rel='noopener';r2.appendChild(w)}
   var k2=el('button','sip g','Kapat');k2.type='button';k2.onclick=kapat;r2.appendChild(k2);bx.appendChild(r2)})};
 document.body.appendChild(ov)}
})();
