// Service Worker — caches core assets for offline viewing (Task 9)
const CACHE_NAME = "dc-portfolio-v3"
const ASSETS_TO_PRECACHE = ["/", "/manifest.json", "/icon.svg"]

// Install — pre-cache home page + manifest
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_PRECACHE))
  )
  self.skipWaiting()
})

// Activate — remove stale caches from previous versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
  )
  self.clients.claim()
})

// Fetch — Network First strategy
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache the latest response for offline use
        if (response.status === 200) {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache if network fails (offline)
        return caches.match(event.request)
      })
  )
})
