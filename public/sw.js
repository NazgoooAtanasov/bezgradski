const CACHE_NAME = "my-pwa-cache-v1";
const ASSETS_TO_CACHE = [
  "/manifest.webmanifest",
  "/pwa-logox192.png",
  "/pwa-logox512.png",
];

// Install event: cache assets
self.addEventListener("install", (event) => {
  // @ts-ignore
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
});

// Activate event: clean up old caches if needed
self.addEventListener("activate", (event) => {
  // @ts-ignore
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        ),
      ),
  );
});

// Fetch event: try cache first, then fallback to network
self.addEventListener("fetch", (event) => {
  // @ts-ignore
  event.respondWith(
    // @ts-ignore
    caches.match(event.request).then((cachedResponse) => {
      // @ts-ignore
      return cachedResponse || fetch(event.request);
    }),
  );
});
