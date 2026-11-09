(function(){
if(!window.supabase||!window.SB_URL||window.SB_URL.indexOf('BURAYA')===0)return;
var c=window.supabase.createClient(window.SB_URL,window.SB_KEY);
var st=document.createElement('style');st.textContent='.sov{position:fixed;inset:0;background:rgba(2,8,24,.7);z-index:99;display:flex;align-items:center;justify-content:center;padding:16px}.sbx{background:#0f2350;border:1px solid rgba(210,232,255,.4);border-radius:18px;padding:20px;max-width:420px;width:100%;color:#fff;display:grid;gap:12px;font:15px/1.5 system-ui,sans-serif}.sbx h3{margin:0;font-size:18px}.sbx p{margin:0;opacity:.9}.sbx .r{display:flex;gap:8px;flex-wrap:wrap}.sbx button{padding:10px 18px;border-radius:999px;border:1px solid #f6c24a;background:#f6c24a;color:#1b1500;font:700 14px inherit;cursor:pointer}.sbx button.g{background:none;color:#fff;border-color:rgba(255,255,255,.5)}';document.head.appendChild(st);
function el(t,tx,cl){var e=document.createElement(t);if(tx!=null)e.textContent=tx;if(cl)e.className=cl;return e}
function tl(n){return Number(n||0).toLocaleString('tr-TR')+' ₺'}
window.WY={c:c,tl:tl,
 siparisVer:function(urun,ad,fiyat,sablon){
  c.auth.getSession().then(function(r){var s=r.data.session;
   if(!s){location.href=(location.pathname.indexOf('/demo/')>-1?'../':'')+'giris.html?git='+encodeURIComponent(location.pathname.split('/').pop()+(sablon?'?sablon='+sablon:''));return}
   var ov=el('div',null,'sov'),bx=el('div',null,'sbx');ov.appendChild(bx);
   bx.appendChild(el('h3',ad+' siparişi'));bx.appendChild(el('p','Tutar: '+tl(fiyat)+(sablon?'  ·  Şablon: '+sablon:'')));
   bx.appendChild(el('p','Siparişiniz Panelim sayfanızda görünür. Havale/EFT bilgileri bir sonraki ekranda.'));
   var msg=el('p','');var ok=el('button','Siparişi onayla'),cl=el('button','Vazgeç','g');var row=el('div',null,'r');row.appendChild(ok);row.appendChild(cl);bx.appendChild(row);bx.appendChild(msg);
   cl.onclick=function(){ov.remove()};
   ok.onclick=function(){ok.disabled=true;var m=s.user.user_metadata||{};
    c.from('siparisler').insert({user_id:s.user.id,urun:urun,paket:ad,tutar:fiyat,sablon:sablon||null,ad:m.ad||s.user.email,telefon:m.telefon||null,eposta:s.user.email}).select('kod').single().then(function(x){
     if(x.error){ok.disabled=false;msg.textContent='Sipariş alınamadı. Fiyat belirlenmemiş olabilir.';return}
     location.href=(location.pathname.indexOf('/demo/')>-1?'../':'')+'panelim.html?yeni='+encodeURIComponent(x.data.kod)})};
   document.body.appendChild(ov)})}};
})();
