// Self-unregistering service worker.
// Deployed to heal visitors who still have a stale service worker from a
// previous deployment. When an installed worker updates (browser re-fetches
// /sw.js on navigation), this script activates, removes itself, and clears
// any caches it left behind. No new registrations are ever made.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();

      const clientList = await self.clients.matchAll({ type: "window" });
      for (const client of clientList) {
        if ("navigate" in client) {
          client.navigate(client.url);
        }
      }
    })()
  );
});
