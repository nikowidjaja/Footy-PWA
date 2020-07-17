var dbPromised = idb.open("my-team", 1, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("team_name", "team_name", { unique: true });
});


function saveForLater(team) {

  dbPromised
    .then(function (db) {

      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Tim berhasil di simpan.");
    });
}

function deleteFromDb(key) {
  dbPromised.then(function (db) {
    var tx = db.transaction("teams", "readwrite");
    var store = tx.objectStore("teams");
    store.delete(key);
    return tx.complete;
  }).then(function () {
    location.reload();
    console.log('Item deleted');
  });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}
