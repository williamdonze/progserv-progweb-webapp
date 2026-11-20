// Service worker : met toute l'application en cache pour qu'elle marche hors ligne.
// Changez VERSION à chaque mise à jour du contenu pour forcer le rafraîchissement.
const VERSION = 'revisions-v1';
const FILES = ['./', 'index.html', 'style.css', 'app.js', 'data.js', 'manifest.webmanifest',
  'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// D'abord le cache (rapide et hors ligne), puis mise à jour en arrière-plan quand le réseau est là
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request, { ignoreSearch: true }).then(cached => {
    const network = fetch(event.request).then(res => {
      if (res && res.ok && new URL(event.request.url).origin === location.origin) {
        const copy = res.clone();
        caches.open(VERSION).then(cache => cache.put(event.request, copy));
      }
      return res;
    }).catch(() => cached);
    return cached || network;
  }));
});
