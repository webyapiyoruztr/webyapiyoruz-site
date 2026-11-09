(function(){
var $=function(i){return document.getElementById(i)};
function el(t,tx,cl){var e=document.createElement(t);if(tx!=null)e.textContent=tx;if(cl)e.className=cl;return e}
if(!window.SB_URL||window.SB_URL.indexOf('BURAYA')===0||!window.supabase)return;
var c=window.supabase.createClient(window.SB_URL,window.SB_KEY),U=null,AY={},T=[],cur=null;
var tl=function(n){return Number(n||0).toLocaleString('tr-TR')+' ₺'};
var TUR={bu_site:'Bu site',benzer:'Buna benzer site',sektor:'Sektöre özel sistem',program:'Program',elle:'Özel çalışma'};
function zt(s){var d=new Date(s);return isNaN(d)?'':d.toLocaleDateString('tr-TR')+' '+d.toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})}
c.auth.getSession().then(function(r){if(!r.data.session){location.href='giris.html?git=panelim.html';return}U=r.data.session.user;$('who').textContent=U.email;
 var y=new URLSearchParams(location.search).get('yeni');if(y){$('yeni').hidden=false;$('yk').textContent=y}
 yukle()});
$('cik').onclick=function(){c.auth.signOut().then(function(){location.href='index.html'})};
function yukle(){Promise.all([c.from('teklifler').select('*').eq('user_id',U.id).order('olusturma',{ascending:false}),c.from('ayarlar').select('*')]).then(function(a){
 T=a[0].data||[];AY={};(a[1].data||[]).forEach(function(x){AY[x.anahtar]=x.deger});
 $('s1').textContent=T.length;
 $('s2').textContent=T.filter(function(t){return t.durum==='Teklif verildi'}).length;
 $('s3').textContent=T.filter(function(t){return t.durum==='Kabul edildi'&&!t.odendi}).length;
 $('s4').textContent=T.filter(function(t){return t.odendi}).length;
 var box=$('tq');box.textContent='';
 if(!T.length){box.appendChild(el('p','Henüz teklif istemediniz. Şablonlar sayfasından bir şablon seçip "Teklif al" diyebilirsiniz.'));var l=el('a','Şablonlara git','mb p');l.href='sablonlar.html';l.style.marginTop='10px';box.appendChild(l)}
 T.forEach(function(t){box.appendChild(kart(t))})})}
function kart(t){var k=el('div',null,'tq'),h=el('div',null,'th');h.appendChild(el('b',t.kod||'—'));h.appendChild(el('small',zt(t.olusturma)));h.appendChild(el('span',null,'sp'));
 var d=t.durum==='Yeni'?'Teklif hazırlanıyor':t.durum==='Teklif verildi'?'Teklifiniz hazır':t.durum==='Kabul edildi'?'Ödeme bekleniyor':t.durum==='Ödendi'?'Aktif':'Vazgeçildi';
 h.appendChild(el('span',d,'mtg '+(t.odendi?'ok':t.durum==='Vazgeçildi'?'no':'wt')));k.appendChild(h);
 k.appendChild(el('div',(TUR[t.tur]||'Teklif')+(t.sablon?'  ·  Şablon: '+t.sablon.toUpperCase():'')+(t.sektor?'  ·  '+t.sektor:''),'ky'));
 if(t.durum==='Teklif verildi'){k.appendChild(el('div',tl(t.fiyat),'fy'));if(t.yanit)k.appendChild(el('div',t.yanit,'ky'));
  var b=el('div',null,'bt'),ok=el('button','Teklifi kabul et','mb p'),no=el('button','Vazgeç','mb');ok.type=no.type='button';
  ok.onclick=function(){durum(t,'Kabul edildi')};no.onclick=function(){durum(t,'Vazgeçildi')};b.appendChild(ok);b.appendChild(no);k.appendChild(b)}
 if(t.durum==='Kabul edildi'&&!t.odendi){k.appendChild(el('div',tl(t.fiyat),'fy'));var b2=el('div',null,'bt'),o=el('button','Ödeme bilgileri','mb p');o.type='button';o.onclick=function(){banka(t)};b2.appendChild(o);k.appendChild(b2)}
 if(t.odendi){k.appendChild(el('div',tl(t.fiyat)+' ödendi','ky'));var b3=el('div',null,'bt'),f=el('button',t.bilgi?'Site bilgilerimi düzenle':'Site bilgilerimi yaz','mb p');f.type='button';f.onclick=function(){bilgi(t)};b3.appendChild(f);k.appendChild(b3);k.appendChild(el('div','Sitenizi hazırlıyoruz. Bilgilerinizi yazın, logo ve fotoğrafları WhatsApp’tan gönderin.','ky'))}
 return k}
function durum(t,d){c.from('teklifler').update({durum:d}).eq('id',t.id).then(function(r){if(r.error){alert('İşlem yapılamadı. Sayfayı yenileyip tekrar deneyin.');return}yukle();if(d==='Kabul edildi')setTimeout(function(){banka(Object.assign({},t,{durum:d}))},400)})}
function banka(t){$('od').hidden=false;$('oh').textContent=t.kod+' için ödeme';var b=$('ob');b.textContent='';
 [['Tutar',tl(t.fiyat)],['Banka',AY.banka_adi],['Hesap sahibi',AY.hesap_sahibi],['IBAN',AY.iban],['Havale açıklaması',t.kod]].forEach(function(r){var d=el('div');d.appendChild(el('span',r[0]));d.appendChild(el('b',r[1]||'—'));b.appendChild(d)});
 $('on').textContent=AY.odeme_notu||'Havale/EFT açıklamasına teklif kodunuzu yazın. Ödemeyi gördüğümüzde durumunuz Aktif olur.';
 $('oc').onclick=function(){try{navigator.clipboard.writeText((AY.iban||'').replace(/\s/g,'')).then(function(){$('oc').textContent='Kopyalandı'})}catch(e){}};
 if(AY.whatsapp){var w=$('ow');w.hidden=false;w.href='https://wa.me/'+AY.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent('Merhaba, '+t.kod+' kodlu teklifin havalesini yaptım.')}
 $('od').scrollIntoView({behavior:'smooth'})}
$('ox').onclick=function(){$('od').hidden=true};
var BK=['b1','b2','b3','b4','b5','b6','b7'],BA=['firma','telefon','eposta','adres','saat','sosyal','hizmet'];
function bilgi(t){cur=t;var b=t.bilgi||{};$('bf').hidden=false;$('bh').textContent=t.kod+' · site bilgilerim';BK.forEach(function(k,i){$(k).value=b[BA[i]]||''});$('bm').textContent='';
 if(AY.whatsapp){var w=$('bw');w.hidden=false;w.href='https://wa.me/'+AY.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent(t.kod+' kodlu siteme ait logo ve fotoğrafları gönderiyorum.')}
 $('bf').scrollIntoView({behavior:'smooth'})}
$('bc').onclick=function(){$('bf').hidden=true};
$('bk').onclick=function(){if(!cur)return;var o={};BK.forEach(function(k,i){o[BA[i]]=$(k).value.trim()});
 c.from('teklifler').update({bilgi:o}).eq('id',cur.id).then(function(r){$('bm').textContent=r.error?'Kaydedilemedi.':'Kaydedildi. Teşekkürler.';if(!r.error)yukle()})};
})();
