const cacheName = "AruanaEstudio-Petisquinho-1.0";
const contentToCache = [
    "Build/331c2daebf49a03641a72a899463e6dc.loader.js",
    "Build/026168fe77b55a1a49b838afa17cb5e6.framework.js",
    "Build/110b84b0cd5289c170bd9478114a7ed2.data",
    "Build/504ec242e5ba5e4ee2278aeb7595feaa.wasm",
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
