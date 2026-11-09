(function(){
var $=function(i){return document.getElementById(i)};
function el(t,tx,cl){var e=document.createElement(t);if(tx!=null)e.textContent=tx;if(cl)e.className=cl;return e}
if(!window.SB_URL||window.SB_URL.indexOf('BURAYA')===0)return;
var c=window.supabase.createClient(window.SB_URL,window.SB_KEY),U=null,AY={},FR={},SP={},cur=null;
var tl=function(n){return Number(n||0).toLocaleString('tr-TR')+' ₺'};
function zt(s){var d=new Date(s);return isNaN(d)?'':d.toLocaleDateString('tr-TR')+' '+d.toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})}
c.auth.getSession().then(function(r){if(!r.data.session){location.href='giris.html?git=panelim.html';return}U=r.data.session.user;$('who').textContent=U.email;yukle()});
$('cik').onclick=function(){c.auth.signOut().then(function(){location.href='index.html'})};
function yukle(){Promise.all([c.from('siparisler').select('*').eq('user_id',U.id).order('olusturma',{ascending:false}),c.from('ayarlar').select('*'),c.from('fiyatlar').select('anahtar,ad,grup'),c.from('sayfalar').select('*').eq('user_id',U.id)]).then(function(a){
 var S=a[0].data||[];AY={};(a[1].data||[]).forEach(function(x){AY[x.anahtar]=x.deger});FR={};(a[2].data||[]).forEach(function(x){FR[x.anahtar]=x});SP={};(a[3].data||[]).forEach(function(x){SP[x.siparis_id]=x});
 var od=S.filter(function(s){return s.odendi}),tp=0;S.forEach(function(s){tp+=Number(s.tutar||0)});
 $('s1').textContent=S.length;$('s2').textContent=od.length;$('s3').textContent=S.length-od.length;$('s4').textContent=tl(tp);
 var tb=$('tb');tb.textContent='';
 if(!S.length){var tr=el('tr'),td=el('td','Henüz siparişiniz yok. Paketler sayfasından sipariş verebilirsiniz.');td.colSpan=7;tr.appendChild(td);tb.appendChild(tr)}
 S.forEach(function(s){var tr=el('tr');[zt(s.olusturma||s.tarih),s.kod||'—',s.paket,s.sablon||'—',tl(s.tutar)].forEach(function(v){tr.appendChild(el('td',v))});
  var d=el('td'),g=el('span',s.odendi?'Aktif':'Ödeme bekleniyor','mtg '+(s.odendi?'ok':'wt'));d.appendChild(g);tr.appendChild(d);
  var i=el('td');
  if(s.odendi){var f=FR[s.urun];if(f&&f.grup==='dijital'){var b=el('button',SP[s.id]?'Sayfamı düzenle':'Sayfamı oluştur','mb p');b.type='button';b.onclick=function(){ac(s)};i.appendChild(b)}else{i.appendChild(el('span','Sitenizi hazırlıyoruz. Bilgilerinizi WhatsApp’tan iletin.'))}}
  else{var b2=el('button','Ödeme bilgileri','mb');b2.type='button';b2.onclick=function(){banka(s)};i.appendChild(b2)}
  tr.appendChild(i);tb.appendChild(tr)});
 var y=new URLSearchParams(location.search).get('yeni');if(y){var s2=S.filter(function(x){return x.kod===y})[0];if(s2)banka(s2)}})}
function banka(s){$('yeni').hidden=false;$('yh').textContent=s.paket+' için ödeme';var b=$('yb');b.textContent='';
 [['Tutar',tl(s.tutar)],['Banka',AY.banka_adi],['Hesap sahibi',AY.hesap_sahibi],['IBAN',AY.iban],['Havale açıklaması',s.kod]].forEach(function(r){var d=el('div');d.appendChild(el('span',r[0]));d.appendChild(el('b',r[1]||'—'));b.appendChild(d)});
 $('yc').onclick=function(){try{navigator.clipboard.writeText((AY.iban||'').replace(/\s/g,'')).then(function(){$('yc').textContent='Kopyalandı'})}catch(e){}};
 if(AY.whatsapp){var w=$('yw');w.hidden=false;w.href='https://wa.me/'+AY.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent('Merhaba, '+s.kod+' kodlu siparişimin havalesini yaptım.')}
 $('yeni').scrollIntoView({behavior:'smooth'})}
function ac(s){cur=s;var p=SP[s.id]||{};$('ed').hidden=false;$('eh').textContent=s.paket+' sayfamı düzenle';$('e1').value=p.baslik||'';$('e2').value=p.alt||'';$('e3').value=p.metin||'';$('e4').checked=!!p.yayinda;$('em').textContent='';$('el').textContent=p.id&&p.yayinda?location.href.replace(/panelim\.html.*/,'')+'sayfa.html?id='+p.id:'';$('ed').scrollIntoView({behavior:'smooth'})}
$('ec').onclick=function(){$('ed').hidden=true};
$('ek').onclick=function(){if(!cur)return;var row={siparis_id:cur.id,user_id:U.id,urun:cur.urun,baslik:$('e1').value.trim(),alt:$('e2').value.trim(),metin:$('e3').value.trim(),yayinda:$('e4').checked};
 c.from('sayfalar').upsert(row,{onConflict:'siparis_id'}).select('id,yayinda').single().then(function(r){if(r.error){$('em').textContent='Kaydedilemedi.';return}$('em').textContent='Kaydedildi.';$('el').textContent=r.data.yayinda?'Sayfa adresiniz: '+location.href.replace(/panelim\.html.*/,'')+'sayfa.html?id='+r.data.id:'Yayında olsun kutusunu işaretlerseniz adresiniz görünür.';yukle()})};
})();
