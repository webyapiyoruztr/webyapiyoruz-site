/* Web Yapıyoruz: basit servis çalışanı. Önbellek tutmaz, her zaman güncel dosyayı getirir.
   Telefona "uygulama gibi eklenebilmesi" için gereklidir. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () { /* ağdan olduğu gibi geçer */ });
