export function registerSW() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
}

export function saveGuideOffline(slug) {
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = (e) => resolve(e.data);
    navigator.serviceWorker.controller?.postMessage(
      { type: "CACHE_GUIDE", url: `/guides/${slug}` },
      [channel.port2]
    );
  });
}

export function removeGuideOffline(slug) {
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = (e) => resolve(e.data);
    navigator.serviceWorker.controller?.postMessage(
      { type: "UNCACHE_GUIDE", url: `/guides/${slug}` },
      [channel.port2]
    );
  });
}

export function isGuideCached(slug) {
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = (e) => resolve(e.data.cached);
    navigator.serviceWorker.controller?.postMessage(
      { type: "IS_CACHED", url: `/guides/${slug}` },
      [channel.port2]
    );
  });
}
