/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope

// Install event
self.addEventListener('install', () => {
  console.log('[Service Worker] Installed')
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated')
  event.waitUntil(self.clients.claim())
})

// Fetch event - Network first for API, cache first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }

  // API calls: network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response.ok) throw new Error('API error')
          return caches.open('api-v1').then((cache) => {
            cache.put(request, response.clone())
            return response
          })
        })
        .catch(() => caches.match(request))
    )
    return
  }

  // Assets: cache first with network fallback
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((response) => {
        if (!response.ok) return response
        return caches.open('assets-v1').then((cache) => {
          cache.put(request, response.clone())
          return response
        })
      })
    })
  )
})

export {}
