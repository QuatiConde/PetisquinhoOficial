const cacheName = "AruanaEstudio-Petisquinho-1.0.8";
const contentToCache = [
    "Build/b6eaadad6881abf3a5cd112e1bf89d5c.loader.js",
    "Build/a8e9b85afdcd722a6c2b2f21fc417856.framework.js",
    "Build/3199b5909acbe83afa58a2b85bd6d300.data",
    "Build/f9a12c5b1c5e40da515e989a6aed4ced.wasm",
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
