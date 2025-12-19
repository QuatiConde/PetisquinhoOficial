const cacheName = "AruanaEstudio-Petisquinho-1.0.8";
const contentToCache = [
    "Build/77e37a9850d818b80e79a26e6960a66a.loader.js",
    "Build/a8e9b85afdcd722a6c2b2f21fc417856.framework.js",
    "Build/77ee2614f69db4aed49354507dac369c.data",
    "Build/48316fd5e3db33294670113de33d0f42.wasm",
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
