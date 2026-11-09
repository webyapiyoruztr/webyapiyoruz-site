(function(){if(window.top!==window)return;
var f=location.pathname.split('/').filter(Boolean);var n=f.pop()||'';if(n==='index.html')n=f.pop()||'kurs';n=n.replace('.html','');if(!n)return;
var a=document.createElement('a');a.href=(location.pathname.indexOf('/demo/kurs/')>-1?'../../':'../')+'paketler.html?sablon='+encodeURIComponent(n);
a.textContent='Şablon kodu: '+n.toUpperCase()+' · Sipariş ver';
a.style.cssText='position:fixed;left:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:50;padding:10px 16px;border-radius:999px;background:#f6c24a;color:#1b1500;font:700 13px system-ui,sans-serif;text-decoration:none;box-shadow:0 6px 20px rgba(0,0,0,.35)';
document.body.appendChild(a)})();