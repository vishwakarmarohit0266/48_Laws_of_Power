const CACHE_NAME = "48-laws-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./main.css",
  "./my.js",
  "./offline.html"

];

/* Install */

self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(

    caches.open(CACHE_NAME).then(cache => {

      return cache.addAll(FILES_TO_CACHE);

    })

  );

});

/* Activate */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if(key !== CACHE_NAME){

            return caches.delete(key);

          }

        })

      );

    })

  );

});

/* Fetch */

self.addEventListener("fetch", event => {

  event.respondWith(

    fetch(event.request)

    .then(response => {

      return response;

    })

    .catch(() => {

      return caches.match(event.request)

      .then(response => {

        return response || caches.match("./offline.html");

      });

    })

  );

});
