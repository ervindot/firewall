self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        './index.html',
        './main.js',
        './index.css',
        './scripts/AudioManager.js',
        './scripts/gamecontroller.js',
        './scripts/gameObstacle.js',
        './scripts/gameinfo.js',
        './scripts/hackerscreen.js',
        './scripts/sampleText.txt',
        './scripts/hackerText.js',
        './scripts/playerController.js',
        './scripts/progressTracker.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        let responseClone = response.clone();
        caches.open('v1').then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;
      });
    }).catch(() => {
      return caches.match('./sw-test/gallery/myLittleVader.jpg');
    })
  );
});