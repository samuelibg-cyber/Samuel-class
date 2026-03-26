const CACHE = 'samuel-class-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        console.log('Deletando cache:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // sempre buscar da rede, sem cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
