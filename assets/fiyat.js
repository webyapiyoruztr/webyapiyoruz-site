(function(){
if(!window.supabase||!window.SB_URL||window.SB_URL.indexOf('BURAYA')===0)return;
try{var c=window.supabase.createClient(window.SB_URL,window.SB_KEY);
c.from('fiyatlar').select('anahtar,fiyat,aciklama').then(function(r){if(!r.data)return;
r.data.forEach(function(f){var k=document.getElementById(f.anahtar);if(!k||f.fiyat==null)return;var p=k.querySelector('.pr');if(!p)return;
p.textContent='';var b=document.createElement('b');b.textContent=Number(f.fiyat).toLocaleString('tr-TR')+' ₺';var s=document.createElement('small');s.textContent=f.aciklama||'Tek seferlik';p.appendChild(b);p.appendChild(s)})})}catch(e){}
})();
