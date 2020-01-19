self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v3').then((cache) => {
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
        '//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'
      ]);
    })
  );
});
self.addEventListener('activate', (event) => {
  var cacheKeeplist = ['v3'];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        let responseClone = response.clone();
        caches.open('v3').then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;
      });
    }).catch(() => {
      return caches.match('./sw-test/gallery/myLittleVader.jpg');
    })
  );
});