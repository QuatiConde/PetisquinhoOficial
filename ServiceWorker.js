const cacheName = "AruanaEstudio-Petisquinho-1.0.8";
const contentToCache = [
    "Build/4addd073a8a3edb64e75dd94c48d835e.loader.js",
    "Build/a8e9b85afdcd722a6c2b2f21fc417856.framework.js",
    "Build/ef750768a89e79a7a8025ddabdc54d93.data",
    "Build/265a38f01f9ab7326b8ea6353a3341fa.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
