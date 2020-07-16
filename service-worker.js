const CACHE_NAME = "footy-app-v11";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/league.html",
  "/team.html",
  "/pages/leagues.html",
  "/pages/match.html",
  "/pages/myteam.html",
  "/css/materialize.min.css",
  "/css/materialize.css",
  "/css/index.css",
  "/css/index.css.map",
  "/fonts/Montserrat-Medium.ttf",
  "/js/materialize.min.js",
  "/js/materialize.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/match.js",
  "/js/team.js",
  "/js/push.js",
  "/js/db.js",
  "js/idb-2.1.3/lib/idb.js",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/logos/logo-2000.png",
  "/images/logos/logo-2002.png",
  "/images/logos/logo-2003.png",
  "/images/logos/logo-2001.png",
  "/images/logos/logo-2013.png",
  "/images/logos/logo-2014.png",
  "/images/logos/logo-2015.png",
  "/images/logos/logo-2016.png",
  "/images/logos/logo-2017.png",
  "/images/logos/logo-2018.png",
  "/images/logos/logo-2019.png",
  "/images/logos/logo-2021.png",
  "/images/Menu 1.png",
  "/images/Menu 2.png",
  "/images/Menu.png",
  "/images/cr7.png",
  "/images/cr7juga.png",
  "/images/ronaldo.png",
  "/images/Add.svg",
  "/images/neymar-mini.jpg",
  "/images/neymar.jpg",
  "/images/barca.png",
  "/images/messi.jpg",
  "/images/messips.png",
  "/manifest.json",
  "/package.json"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    console.log(event.request.url);


    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {

    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});


self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/images/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});