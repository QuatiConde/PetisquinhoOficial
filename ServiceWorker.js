const cacheName = "AruanaEstudio-Petisquinho-1.0.8";
const contentToCache = [
    "Build/4fb718db7f720749946a4839a54f424a.loader.js",
    "Build/a8e9b85afdcd722a6c2b2f21fc417856.framework.js",
    "Build/fc26047cbda8d5ce98c36b651c441ef5.data",
    "Build/15ce269a9994e3fe3b1e217354d36903.wasm",
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
