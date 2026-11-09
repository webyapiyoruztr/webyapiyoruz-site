(function(){
var $=function(i){return document.getElementById(i)};
function el(t,tx,cl){var e=document.createElement(t);if(tx!=null)e.textContent=tx;if(cl)e.className=cl;return e}
if(!window.SB_URL||window.SB_URL.indexOf('BURAYA')===0||!window.supabase)return;
var c=window.supabase.createClient(window.SB_URL,window.SB_KEY),U=null,AY={},T=[],cur=null;
var tl=function(n){return Number(n||0).toLocaleString('tr-TR')+' ₺'};
var TUR={bu_site:'Bu site',benzer:'Buna benzer site',sektor:'Sektöre özel sistem',program:'Program yazılımı',elle:'Özel çalışma'};
function zt(s){var d=new Date(s);return isNaN(d)?'':d.toLocaleDateString('tr-TR')+' '+d.toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})}
c.auth.getSession().then(function(r){if(!r.data.session){location.href='giris.html?git=panelim.html';return}U=r.data.session.user;$('who').textContent=U.email;
 var y=new URLSearchParams(location.search).get('yeni');if(y){$('yeni').hidden=false;$('yk').textContent=y;if(new URLSearchParams(location.search).get('gorusme'))$('yg').hidden=false}
 yukle()});
$('cik').onclick=function(){c.auth.signOut().then(function(){location.href='index.html'})};
var MS={},CHAT=false;function zf(x){var d=new Date(x);return isNaN(d)?'':d.toLocaleString('tr-TR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})}
function yukle(){Promise.all([c.from('teklifler').select('*').eq('user_id',U.id).order('olusturma',{ascending:false}),c.from('ayarlar').select('*'),c.from('gorusme_mesaj').select('*').order('olusturma',{ascending:true})]).then(function(a){
 CHAT=!a[2].error;MS={};(a[2].data||[]).forEach(function(m){(MS[m.teklif_id]=MS[m.teklif_id]||[]).push(m)});T=a[0].data||[];AY={};(a[1].data||[]).forEach(function(x){AY[x.anahtar]=x.deger});
 $('s1').textContent=T.length;
 $('s2').textContent=T.filter(function(t){return t.durum==='Teklif verildi'||t.durum==='Kabul edildi'||t.durum==='Ödendi'}).length;
 $('s3').textContent=T.filter(function(t){return t.durum==='Kabul edildi'&&!t.odendi}).length;
 $('s4').textContent=T.filter(function(t){return t.odendi}).length;
 var box=$('tq');box.textContent='';
 if(!T.length){box.appendChild(el('p','Henüz teklif istemediniz. Şablonlar sayfasından bir şablon seçip "Teklif al" diyebilirsiniz.'));var l=el('a','Şablonlara git','mb p');l.href='sablonlar.html';l.style.marginTop='10px';box.appendChild(l)}
 T.forEach(function(t){box.appendChild(kart(t))})})}
function kart(t){var k=el('div',null,'tq'),h=el('div',null,'th');h.appendChild(el('b',t.kod||'—'));h.appendChild(el('small',zt(t.olusturma)));h.appendChild(el('span',null,'sp'));
 var d=t.durum==='Yeni'?'Teklif hazırlanıyor':t.durum==='Teklif verildi'?'Teklifiniz hazır':t.durum==='Kabul edildi'?'Ödeme bekleniyor':t.durum==='Ödendi'?'Aktif':'Vazgeçildi';
 h.appendChild(el('span',d,'mtg '+(t.odendi?'ok':t.durum==='Vazgeçildi'?'no':'wt')));k.appendChild(h);
 k.appendChild(el('div',(TUR[t.tur]||'Teklif')+(t.sablon?'  ·  Şablon: '+t.sablon.toUpperCase():'')+(t.sektor?'  ·  '+t.sektor:''),'ky'));
 if(t.sablon){var im=el('img',null,'sth');im.src='assets/th/'+t.sablon.toLowerCase()+'.jpg';im.alt='';im.onerror=function(){im.remove()};k.appendChild(im)}
 if(t.durum==='Teklif verildi'){k.appendChild(el('div',tl(t.fiyat),'fy'));if(t.yanit)k.appendChild(el('div',t.yanit,'ky'));
  var b=el('div',null,'bt'),ok=el('button','Teklifi kabul ediyorum','mb p'),no=el('button','Vazgeç','mb');ok.type=no.type='button';
  ok.onclick=function(){durum(t,'Kabul edildi')};no.onclick=function(){durum(t,'Vazgeçildi')};b.appendChild(ok);
  [['Kabul ediyorum, ödemeden önce yüz yüze görüşmek istiyorum',KN[1],1],['Önce yüz yüze görüşmek istiyorum',KN[0]],['Fiyat ve kapsamı konuşmak istiyorum',KN[2]],['Teklifte değişiklik istiyorum',KN[3]]].forEach(function(o){
   if(t.gorusme)return;var x=el('button',o[0],'mb');x.type='button';x.onclick=function(){if(o[2]){durum(t,'Kabul edildi',function(){gorus(Object.assign({},t,{durum:'Kabul edildi'}),o[1])})}else gorus(t,o[1])};b.appendChild(x)});
  b.appendChild(no);k.appendChild(b)}
 if(t.durum==='Kabul edildi'&&!t.odendi){k.appendChild(el('div',tl(t.fiyat),'fy'));var b2=el('div',null,'bt'),o=el('button','Ödeme bilgileri','mb p');o.type='button';o.onclick=function(){banka(t)};b2.appendChild(o);k.appendChild(b2)}
 if(t.odendi){k.appendChild(el('div',tl(t.fiyat)+' ödendi','ky'));var b3=el('div',null,'bt'),f=el('button',t.bilgi?'Site bilgilerimi düzenle':'Site bilgilerimi yaz','mb p');f.type='button';f.onclick=function(){bilgi(t)};b3.appendChild(f);k.appendChild(b3);k.appendChild(el('div','Sitenizi hazırlıyoruz. Bilgilerinizi yazın, logo ve fotoğrafları WhatsApp’tan gönderin.','ky'))}
 if(!t.odendi&&t.durum!=='Vazgeçildi'){var g=t.gorusme,bx=el('div',null,'bt');
  if(!g){if(t.durum!=='Teklif verildi'){var gb=el('button','Ödemeden önce yüz yüze görüşmek istiyorum','mb');gb.type='button';gb.onclick=function(){gorus(t,t.durum==='Kabul edildi'?KN[1]:KN[0])};bx.appendChild(gb);k.appendChild(bx)}}
  else{var gd=t.gorusme_durum||'Talep edildi',cb=el('div',null,'cx'),ml=MS[t.id]||[],last=ml.length?ml[ml.length-1]:null;
   var hd=el('div',null,'cxh');hd.appendChild(el('b','Görüşme talebin'));hd.appendChild(el('span',gd,'cxs'));cb.appendChild(hd);
   if(last?last.gonderen==='yonetim':!!t.gorusme_yanit)cb.appendChild(el('div','Web Yapıyoruz sana yazdı. Aşağıda.','cxn'));
   var ms=el('div',null,'cxm'),mine=el('div',null,'cb me');
   mine.appendChild(el('div',[g.sekil,g.konu,g.sehir,g.zaman?'Uygun zaman: '+g.zaman:''].filter(Boolean).join(' · ')));
   if(g.tarih)mine.appendChild(el('small',zf(g.tarih),'cbt'));
   ms.appendChild(mine);
   if(t.gorusme_yanit){var us0=el('div',null,'cb us');us0.appendChild(el('small','Web Yapıyoruz','cbw'));us0.appendChild(el('div',t.gorusme_yanit));ms.appendChild(us0)}
   ml.forEach(function(m){var me=m.gonderen==='musteri',bb=el('div',null,'cb '+(me?'me':'us'));if(!me)bb.appendChild(el('small','Web Yapıyoruz','cbw'));bb.appendChild(el('div',m.metin));bb.appendChild(el('small',zf(m.olusturma),'cbt'));ms.appendChild(bb)});
   if(!t.gorusme_yanit&&!ml.length)ms.appendChild(el('div','Talebin bize ulaştı. Sana buradan ve telefonla dönüş yapacağız.','cb us dim'));
   cb.appendChild(ms);
   if(CHAT){var rw=el('div',null,'cxr'),inp=el('input');inp.placeholder='Mesajını yaz...';inp.maxLength=1000;inp.setAttribute('data-cm','1');var sb=el('button','Gönder','mb p');sb.type='button';
    sb.onclick=function(){var v=inp.value.trim();if(!v)return;sb.disabled=true;c.from('gorusme_mesaj').insert({teklif_id:t.id,gonderen:'musteri',metin:v}).then(function(r){if(r.error){sb.disabled=false;alert('Mesaj gönderilemedi. Biraz sonra tekrar dene.');return}yukle()})};
    var wb=null,wn=String(AY.whatsapp||'').replace(/\D/g,'');if(wn.length===10&&wn[0]==='5')wn='90'+wn;if(wn.length===11&&wn[0]==='0')wn='90'+wn.slice(1);
    if(wn.length>=11){wb=el('button','WhatsApp’tan da gönder','mb');wb.type='button';wb.onclick=function(){var v=inp.value.trim();if(!v){alert('Önce mesajı yaz.');return}window.open('https://wa.me/'+wn+'?text='+encodeURIComponent(v),'_blank');wb.disabled=sb.disabled=true;c.from('gorusme_mesaj').insert({teklif_id:t.id,gonderen:'musteri',metin:v}).then(function(r){if(r.error){wb.disabled=sb.disabled=false;alert('Mesaj sohbete kaydedilemedi.');return}yukle()})}}
    inp.onkeydown=function(e){if(e.key==='Enter'){e.preventDefault();sb.click()}};rw.appendChild(inp);rw.appendChild(sb);cb.appendChild(rw);if(wb){var wr=el('div',null,'cxw');wr.appendChild(wb);wr.appendChild(el('small','İstersen mesajı WhatsApp’tan da gönderebilirsin. Göndermek için orada bir kez basman yeterli.'));cb.appendChild(wr)}}
   k.appendChild(cb);
   if(gd==='Talep edildi'){var ge=el('button','Görüşme bilgilerimi değiştir','mb');ge.type='button';ge.onclick=function(){gorus(t)};bx.appendChild(ge);k.appendChild(bx)}}}
 return k}
var gcur=null,KN=['Ödemeden önce tanışıp görüşmek istiyorum','Teklifi kabul ettim, ödemeden önce yüz yüze görüşmek istiyorum','Fiyat ve kapsamı konuşmak istiyorum','Teklifte değişiklik istiyorum','Başka bir konu'];
function gorus(t,konu){gcur=t;var g=t.gorusme||{};$('g5').value=g.sekil||'Yüz yüze';$('g6').value=g.konu||konu||KN[0];$('gf').hidden=false;$('gh').textContent=t.kod+' · yüz yüze görüşme talebi';var an=(t.ad&&t.ad.indexOf('@')<0)?t.ad:'',nm=an.trim().split(/\s+/).filter(Boolean),sy=nm.length>1?nm.pop():'';$('g0').value=g.ad||nm.join(' ');$('g00').value=g.soyad||sy;$('g1').value=g.telefon||t.telefon||'';$('g2').value=g.eposta||t.eposta||U.email||'';$('g3').value=g.sehir||'';$('g4').value=g.zaman||'';$('gm').textContent='';$('gf').scrollIntoView({behavior:'smooth'})}
$('gx').onclick=function(){$('gf').hidden=true};
$('gk').onclick=function(){if(!gcur)return;var ad=$('g0').value.trim(),sy=$('g00').value.trim(),a=$('g1').value.trim(),b=$('g2').value.trim();if(!ad||!sy){$('gm').textContent='Adınızı ve soyadınızı yazın.';return}if(!a&&!b){$('gm').textContent='Telefon veya e-posta yazın.';return}
 var o={sekil:$('g5').value,konu:$('g6').value,ad:ad,soyad:sy,telefon:a,eposta:b,sehir:$('g3').value.trim(),zaman:$('g4').value.trim(),tarih:(gcur.gorusme&&gcur.gorusme.tarih)||new Date().toISOString()};
 c.from('teklifler').update({gorusme:o}).eq('id',gcur.id).then(function(r){$('gm').textContent=r.error?'Gönderilemedi. Biraz sonra tekrar deneyin.':'Talebiniz bize ulaştı. Sizinle iletişime geçeceğiz.';if(!r.error)yukle()})};
function durum(t,d,cb){c.from('teklifler').update({durum:d}).eq('id',t.id).then(function(r){if(r.error){alert('İşlem yapılamadı. Sayfayı yenileyip tekrar deneyin.');return}yukle();if(cb){cb();return}if(d==='Kabul edildi')setTimeout(function(){banka(Object.assign({},t,{durum:d}))},400)})}
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

setInterval(function(){if(document.hidden||!U)return;var a=document.activeElement;if(a&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA'||a.tagName==='SELECT'))return;var f=document.querySelectorAll('[data-cm]'),dolu=false;f.forEach(function(x){if(x.value)dolu=true});if(dolu)return;var gf=document.getElementById('gf');if(gf&&!gf.hidden)return;yukle()},30000);
