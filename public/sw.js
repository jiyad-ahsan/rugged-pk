const GUIDE_CACHE = "rugged-guides-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("message", async (event) => {
  if (event.data.type === "CACHE_GUIDE") {
    const cache = await caches.open(GUIDE_CACHE);
    const url = event.data.url;
    try {
      const response = await fetch(url);
      await cache.put(url, response);
      event.ports[0].postMessage({ status: "cached" });
    } catch (err) {
      event.ports[0].postMessage({ status: "error" });
    }
  }

  if (event.data.type === "UNCACHE_GUIDE") {
    const cache = await caches.open(GUIDE_CACHE);
    await cache.delete(event.data.url);
    event.ports[0].postMessage({ status: "removed" });
  }

  if (event.data.type === "IS_CACHED") {
    const cache = await caches.open(GUIDE_CACHE);
    const response = await cache.match(event.data.url);
    event.ports[0].postMessage({ cached: !!response });
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(GUIDE_CACHE);
        const cached = await cache.match(event.request);
        return cached || new Response("You are offline and this page is not saved.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      })
    );
  }
});
