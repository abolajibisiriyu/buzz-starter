var newCacheName = 'buzzy-v3';

self.addEventListener('install', function(event) {
    console.log('Hello World!!');
    event.waitUntil(
        caches.open(newCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                'css/bootstrap_paper.min.css',
                'css/style.css',
                'js/jquery.js',
                'js/sw-register.js',
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
            ]);
        })
    )
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            cacheNames.filter(function(cacheName) {
                return cacheName.startsWith('buzzy') && cacheName !== newCacheName
            }).map(function(cacheName) {
                return caches.delete(cacheName);
            });
        })
    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    )
});

self.addEventListener('message', function(event) {
    if (event.data.action === 'skip') {
        self.skipWaiting();
    }
});