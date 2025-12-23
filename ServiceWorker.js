const cacheName = "AruanaEstudio-Petisquinho-1.0.8";
const contentToCache = [
    "Build/54e339c1565c32a31a76133dfa7a4bdf.loader.js",
    "Build/a8e9b85afdcd722a6c2b2f21fc417856.framework.js",
    "Build/64f2fadeddd071d65171b17899a2c274.data",
    "Build/8f128f7ff4deef3eb0a5f4d04f1870fe.wasm",
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
