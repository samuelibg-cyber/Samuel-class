const CACHE = 'samuel-class-v2';
const ASSETS = [
  'https://samuelibg-cyber.github.io/Samuel-class/',
  'https://samuelibg-cyber.github.io/Samuel-class/index.html',
  'https://samuelibg-cyber.github.io/Samuel-class/manifest.json'
];

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(response => {
      const clone = response.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return response;
    }).catch(() => caches.match(e.request))
  );
});
