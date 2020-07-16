var webPush = require('web-push');
const vapidKeys = {
   "publicKey": "BDCwC_iJU-L4wP91uQVeEOTYERAp-fAlzh2nu5co1BsgOFmsWStmnDPiHRGbumeJOhHcl_45yWI0TsyXqYVxUuA",
   "privateKey": "CxFTlEROOGAJ5u_tFmkHnk_6pvyicgts0hnlHqsjMi8"
};



var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fx0qrpVE_pk:APA91bGShfi-ZaO101My9RDvHo8ZfKT4T2Z6n2nrwt1V5Uzm276ZD74_tk3rsLjcx8-TAnDhGXIgFb-3H5XOvE9_pY-zHlPykWrI52VS21_GhU8dCd6zV2nhq-9amTQ4suirtvZU0Zlx",
   "keys": {
      "p256dh": "BAl51CMC45coP+jWMHgf6OWCpoEpGkAGnrx0wkWsWRgmzsgtA++j4sOLkCHQdRC/Dh9BEA0NBcGyCDHJI7cmqCI=",
      "auth": "wyzlWFxxFOd43DrqRpUHcQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '274441504207',
   TTL: 60
};



   webPush.setVapidDetails(
      'mailto:example@yourdomain.org',
      vapidKeys.publicKey,
      vapidKeys.privateKey
   )
   webPush.sendNotification(
      pushSubscription,
      payload,
      options
   );
