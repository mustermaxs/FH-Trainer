var CACHE_NAME = "fhtrainer-cache-v0";
var CACHED_URLS = [
  "/fh/index.html",
  "/fh/icon/icon.png",
  "/fh/ui/estimateSum.js",
  "/fh/ui/interface.js",
  "/fh/estimatepercent.js",
  "/fh/sw.js",
  "/fh/css/main.css",
  "/fh/manifest.webmanifest",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    CACHED_URLS.forEach((url) => {
      fetch(url).then(function (response) {
        caches.open(CACHE_NAME).then(function (cache) {
          return cache.put(url, response);
        });
      });
    })
  );
});
/* self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(CACHED_URLS);
      })
      .catch(function () {
        console.log("couldn't cache files");
      })
  );
}); */
/* self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return !cacheIDs.includes(key);
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
}); */
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (cachedResponse) {
        var fetchPromise = fetch(event.request).then(function (
          networkResponse
        ) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      });
    })
  );
});
