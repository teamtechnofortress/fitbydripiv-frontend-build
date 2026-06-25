self.addEventListener('install', event => {
  self.skipWaiting()

  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))),
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    self.registration.unregister()
      .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then(clients => {
        clients.forEach(client => client.navigate(client.url))
      }),
  )
})

self.addEventListener('fetch', () => {
  // Network-only cleanup worker. Do not intercept or cache requests.
})
