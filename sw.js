const CACHE = 'princess-order-v1'
const URLS = [
  '/',
  '/index.html',
  '/src/main.js',
  '/images/meat.jpg',
  '/images/veggie.jpg',
  '/images/soup.jpg',
  '/images/carbs.jpg',
  '/images/cold.jpg',
  '/images/seafood.jpg'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(URLS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  )
  self.clients.claim()
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request)
    )
  )
})